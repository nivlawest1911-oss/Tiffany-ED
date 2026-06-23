# EdIntel Sovereign — Integration & Alignment Instructions
**Track 1: Educator AI Interaction Auditing & Track 2: LTI 1.3 Advantage Integration**

This document serves as the implementation record and developer reference for integrating traceable AI interactions and cryptographic LTI 1.3 launch handshakes.

---

## 1. Database Schema Specifications

The following database models have been appended to `prisma/schema.prisma` and successfully synchronized with the Supabase PostgreSQL production database instance.

### 1.1 `EducatorAIInteraction` Model
Used for logging every teacher-driven AI interaction (Multiplier grading drafts, lesson scaffolds, rubric feedback) with strict linkage to curriculum standards and student profiles without capturing student PII.

```prisma
model EducatorAIInteraction {
  id                String            @id @default(cuid())
  teacherId         String
  teacher           User              @relation("EducatorAIInteractions", fields: [teacherId], references: [id], onDelete: Cascade)
  studentId         String?
  student           student_profiles? @relation("StudentAIInteractions", fields: [studentId], references: [id], onDelete: SetNull)
  classId           String?

  interactionType   String   // "grading_draft" | "lesson_scaffold" | "rubric_feedback" | "progress_insight" | "differentiation_planner"
  prompt            String   @db.Text
  aiResponse        String   @db.Text
  standardsAligned  String[] // e.g. ["ALCOS.ELA.3.RI.1", "Science of Reading - Phonics"]
  rubricCriteria    Json?    // Store the rubric the teacher provided
  modelUsed         String?  // "gpt-4o" | "gemini-1.5-pro" etc.
  tokensUsed        Int?
  sessionId         String?

  timestamp         DateTime @default(now())

  @@index([teacherId, timestamp])
  @@index([studentId, timestamp])
  @@index([classId, timestamp])
  @@map("educator_ai_interactions")
}
```

### 1.2 `LtiPlatform` Model
Used to register external district LMS instances (e.g. Canvas, Clever, Google Classroom) to enable cryptographically signed OIDC launches.

```prisma
model LtiPlatform {
  id              String   @id @default(cuid())
  issuer          String   @unique
  clientId        String
  deploymentId    String?
  platformName    String?  // "Canvas", "Clever", "Google Classroom"
  jwksUrl         String
  authTokenUrl    String
  authLoginUrl    String
  registeredAt    DateTime @default(now())
  isActive        Boolean  @default(true)

  @@map("lti_platforms")
}
```

---

## 2. Track 1: AI Auditing Wiring

### 2.1 Standard Synthesis Streams (`src/app/api/generate/route.ts`)
Intercepts response streams to clone and parse the generated text for standards (e.g., matching `ALCOS.[A-Z0-9\.]+`) and logs them asynchronously.

```typescript
function auditLogResponse(response: Response, user: any, prompt: string, generatorId: string) {
    if (user && user.id !== 'guest-user' && response) {
        try {
            const clone = response.clone();
            clone.text().then(async (text) => {
                try {
                    const { logEducatorAIInteraction } = await import('@/lib/ai/log-educator-interaction');
                    const standardsAligned: string[] = [];
                    // Extract standards
                    const matches = (prompt + ' ' + text).match(/ALCOS\.[A-Z0-9\.]+/g);
                    if (matches) {
                        matches.forEach(m => {
                            if (!standardsAligned.includes(m)) standardsAligned.push(m);
                        });
                    }
                    await logEducatorAIInteraction({
                        teacherId: user.id,
                        interactionType: generatorId || 'general_synthesis',
                        prompt: prompt,
                        aiResponse: text,
                        standardsAligned,
                        modelUsed: generatorId.includes('llama') ? 'llama-3.3' : 'gemini-1.5-pro',
                    });
                } catch (logErr) {
                    console.error("[AuditLog] Failed inside async logging resolution:", logErr);
                }
            }).catch(cloneErr => {
                console.error("[AuditLog] Failed to read clone text:", cloneErr);
            });
        } catch (cloneSetupErr) {
            console.error("[AuditLog] Failed to setup clone:", cloneSetupErr);
        }
    }
    return response;
}
```

### 2.2 Differentiation Engine Route (`src/app/api/differentiate/route.ts`)
Logs structured differentiation requests containing Lexile adjustments, DOK levels, and student profile identifiers.

```typescript
if (user && user.id !== 'guest-user') {
  try {
    const { logEducatorAIInteraction } = await import('@/lib/ai/log-educator-interaction');
    logEducatorAIInteraction({
      teacherId: user.id,
      interactionType: 'differentiation_planner',
      prompt: `Source: ${sourceInput.substring(0, 100)}...\nTarget Lexile: ${targetLexile}\nDOK Level: ${dokLevel}\nStandard: ${academicStandard || 'N/A'}`,
      aiResponse: JSON.stringify(result),
      standardsAligned: academicStandard ? [academicStandard] : [],
      studentId: studentProfileId || undefined,
      modelUsed: 'gemini-1.5-pro',
    }).catch(err => console.error("[AuditLog] Differentiation logging failed:", err));
  } catch (importErr) {
    console.error("[AuditLog] Failed to import interaction logger:", importErr);
  }
}
```

---

## 3. Track 2: LTI 1.3 Launch Handler

### 3.1 Main Launch Endpoint (`src/app/api/lti/launch/route.ts`)
Receives `POST` launch payloads from Canvas/Clever, cryptographically validates the token against the registered platform's JWKS, provisions or maps the user, and starts a Better Auth session.

- **Route**: `POST /api/lti/launch`
- **Validation**: Cryptographic signature validation with remote JWKS lookup.
- **SSO Cookies**: Set `better-auth.session_token` and `__Secure-better-auth.session_token` (in production) to seamlessly authenticate the user.
