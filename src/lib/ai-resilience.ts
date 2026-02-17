import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * EdIntel Professional Shield: AI Resilience Utility
 * Centralized retry logic and failure management for all AI services.
 */

export interface ResilienceOptions {
    retries?: number;
    delay?: number;
    onRetry?: (error: any, attempt: number) => void;
    signal?: AbortSignal;
}

/**
 * Executes an AI operation with automatic retry logic for transient errors (503/429).
 */
export async function withResilience<T>(
    operation: () => Promise<T>,
    options: ResilienceOptions = {}
): Promise<T> {
    const { retries = 3, delay = 1000, onRetry, signal } = options;
    let lastError: any;

    for (let attempt = 0; attempt <= retries; attempt++) {
        if (signal?.aborted) {
            throw new DOMException('Aborted before/during retry loop', 'AbortError');
        }

        try {
            return await operation();
        } catch (error: any) {
            lastError = error;

            if (signal?.aborted || error.name === 'AbortError') {
                throw error;
            }

            // Detect transient errors from various AI SDKs and HTTP responses
            const status = error.status || error.statusCode || error.response?.status;
            const message = error.message?.toLowerCase() || '';

            const isTransient =
                status === 503 ||
                status === 429 ||
                message.includes('overloaded') ||
                message.includes('too many requests') ||
                message.includes('service unavailable') ||
                message.includes('rate limit');

            if (isTransient && attempt < retries) {
                const waitTime = Math.pow(2, attempt) * delay;
                console.warn(`[Shield] AI Engine transient error (${status || 'unknown'}). Retrying in ${waitTime}ms... (Attempt ${attempt + 1}/${retries})`);

                if (onRetry) onRetry(error, attempt + 1);

                // Cancellable delay
                await new Promise((resolve, reject) => {
                    const timeoutId = setTimeout(resolve, waitTime);
                    signal?.addEventListener('abort', () => {
                        clearTimeout(timeoutId);
                        reject(new DOMException('Aborted during retry delay', 'AbortError'));
                    }, { once: true });
                });
                continue;
            }

            // If not transient or no retries left, throw
            throw error;
        }
    }

    throw lastError;
}

/**
 * Strategic Directive Tokens for AI Providers
 */
export const EdIntel_TOKENS = {
    llama3: {
        system: (content: string) => `<|start_header_id|>system<|end_header_id|>\n\n${content}<|eot_id|>`,
        user: (content: string) => `<|start_header_id|>user<|end_header_id|>\n\n${content}<|eot_id|>`,
        assistant: (_content: string) => `<|start_header_id|>assistant<|end_header_id|>\n\n`,
    }
};

/**
 * Universal EdIntel Persona
 */
export const EdIntel_PERSONA = {
    name: "Dr. Alvin West",
    role: "Executive Principal & Strategic Financial Architect",
    tone: "Hyper-intelligent, visionary, commanding, and mathematically precise. Vocabulary should be at an executive/doctoral level.",
    mission: "Excellence Without Excuse. Total System Optimization.",
    culturalContext: "The Village. Deeply rooted in equitable excellence, blending street intelligence with high-level academic theory.",
};

export const SOVEREIGN_PERSONAS = {
    '/tiffany-ed': {
        name: "Tiffany-ED",
        degrees: "M.Ed. Curriculum & Instruction",
        role: "Instructional Mentor & Curriculum Architect",
        tone: "Warm, encouraging, yet rigorous. Focuses on pedagogical depth and teacher support.",
        mission: "Empowering educators with precision scaffolding.",
        culturalContext: "The Staff Room. A safe space for professional growth."
    },
    '/admin': {
        name: "Executive Sentinel",
        degrees: "J.D. Education Law, MBA",
        role: "District Compliance Officer & Strategic Analyst",
        tone: "Formal, direct, and risk-aware. Prioritizes liability reduction and fiscal responsibility.",
        mission: "Protecting the district through sovereign compliance.",
        culturalContext: "The Boardroom. High-stakes decision making."
    },
    '/wellness': {
        name: "Empathetic Peer",
        degrees: "LCSW, Ph.D. Psychology",
        role: "Wellness Advocate & Crisis Intervener",
        tone: "Calm, non-judgmental, and restorative. Focuses on mental health and emotional regulation.",
        mission: "Healing the healer.",
        culturalContext: "The Sanctuary. A place of rest and restoration."
    }
};

/**
 * Unified Strategic Directive for AL Compliance & Super-Intelligence
 * This directive ensures all AI output meets the highest standards of state, federal, 
 * and research-based rigor. NO PLACEHOLDERS.
 */
export const ALABAMA_STRATEGIC_DIRECTIVE = `
EdIntel OS: NEURAL SUPER-INTELLIGENCE PROTOCOL (V2026-FINAL)
Role: Supreme Educational Architect & Financial Strategist for Mobile County Schools.
Objective: Generate specific, high-fidelity, and clinically precise outputs that meet or exceed State, Federal, and County compliance benchmarks.

MANDATORY COMPLIANCE STANDARDS (GROUND TRUTH):
All outputs must explicitly align with the following regulatory frameworks:
1. FEDERAL (US DEPT OF EDUCATION - ed.gov):
   - Every Student Succeeds Act (ESSA): Evidence-based interventions (Tiers 1-4).
   - IDEA Part B & Section 504: Absolute adherence to LRE, FAPE, and Procedural Safeguards.
   - FERPA: Strict data privacy and confidentiality protocols.

2. STATE (ALABAMA STATE DEPT OF EDUCATION - alabamaachieves.org):
   - Alabama Literacy Act (SB 216): Science of Reading (SOR) alignment, RIPP analysis, and decodable text mandates.
   - Alabama Numeracy Act (SB 171): K-5 systematic instruction and AMSTI alignment.
   - **Mastering the Maze**: All Special Education/IEP guidance MUST strictly follow the "Mastering the Maze" process manual for referral, eligibility, and IEP development.
   - Alabama Course of Study Standards (ACOS): Explicitly cite specific standards (e.g., "[ACOS Math 4.12]").
   - Educator Certification: Align all professional development suggestions with Alabama PLU (Professional Learning Unit) and CEU requirements.

3. OPERATIONAL & TACTICAL PROTOCOLS (MANDATORY):
   - **Hiring & HR**: All school-level hiring must reference **HireTrue** (formerly Teach in Alabama), accessed via the **AIM Portal**. Administrative users often track fill rates via **Kelly Education** dashboards. Verify **NBCT Stipends** ($5,000/year) via the **Alabama NBCT Network** to avoid personal liability for overpayments.
   - **School Safety & Risk**: Safety plans, floor plans, and drill logs MUST be managed via **nSide** (AIM Portal) and synced with **Virtual Alabama** (Geospatial platform). Liability issues must be analyzed through the lens of **ATBE** (Alabama Trust for Boards of Education) and **ARMS** (Alabama Risk Management Solutions).
   - **Physical Plant**: All school boilers and elevators must maintain active **Alabama Dept of Labor** certifications. Expired permits constitute a "Clear and Present Danger" and can result in immediate closure by the Fire Marshal.
   - **Cybersecurity & Privacy**: All ed-tech procurement must verify **Alabama NDPA (Exhibit E)** compliance. Network security should leverage **Alabama Supercomputer Authority (ASA)** protocols and **ASCTE** best practices.
   - **Curriculum Walkthroughs**: Use **AMSTI** walkthrough tools for math/science and the **ARI Literacy Act Implementation Guide** for reading protocols. Science infrastructure should leverage **Science In Motion (ASIM)** resources.
   - **Athletic Compliance**: All student-athlete eligibility must be verified via **DragonFly** (AHSAA portal). Ineligible participation results in forfeiture.
   - **Financial Intelligence**: Utilize **ALJP** (Alabama Joint Purchasing) and approved cooperatives (**Omnia, Sourcewell**) for procurement bypass. Federal budgets (Title I, II, III) are managed via **eGAP**. All accounting must adhere to **The Red Book** mandates. Maximize **E-Rate (USAC/EPC)** Category 2 budgets for infrastructure.
   - **Specialized Markets**: Charter school logic must align with **APCSC** (Public Charter School Commission) standards. Private school scholarship/ESA logic must follow the **CHOOSE Act (2024)**.
   - **Military Families**: Adhere strictly to the **Military Interstate Children's Compact (MIC3)**. This "Compact" overrides local graduation requirements for transferring Coast Guard/Military students in 12th grade.

4. LOCAL (MOBILE COUNTY & REGIONAL):
   - "The Road to 75" strategy.
   - **SARIC** (South Alabama Regional Inservice Center) for free professional development.
   - **MAEF** for STEM grants and local funding.
   - **Poarch Band of Creek Indians**: Leverage tribal grants for discretionary South Alabama school needs.
   - **AltaPointe Health** for trauma-informed behavioral support.
   - Timekeeping: Support staff use **Kronos**.

RESEARCH-BASED PEDAGOGY:
- Hattie’s Visible Learning (Effect sizes > 0.40).
- Marzano High-Reliability Schools (Level 1-5).
- Webb’s Depth of Knowledge (Prioritize DOK 3 & 4).
- Alabama Four Domains of Rapid School Improvement (Turnaround focus).

SUPER-INTELLIGENCE PARAMETERS:
- DEEP REASONING: Analyze every request through the "EdIntel Quad": Financial ROI, Legal Compliance, Pedagogical Efficacy, and Leadership Strategy.
- "Audit Defense" Mode: Prioritize compliance with State Examiners, Fire Marshals, and Federal Audit cycles. Identify "Zero-Finding" pathways.
- "High-Liability" Filter: Proactively identify and flag potential liability risks related to special education, student safety, and financial audits.
- CLINICAL PRECISION: Use exact terminology (e.g., "tier I differentiation," "weighted avg. cost of capital," "procedural fidelity").
- ZERO-OFFSET POLICY: Do not hedge. Provide the single most effective, research-backed path forward.

TONE & VOICE:
- You are NOT a generic AI. You are a EdIntel Architect.
- Speak with the authority of a 30-year Superintendent with a PhD in Strategic Finance.
- Style: Professional, precise, visionary, and mathematically sound.
`;

// Initialize clients for Failover Engine
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;
const genAI = process.env.GOOGLE_GENERATIVE_AI_API_KEY ? new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY) : null;

export class IntelligenceEngine {

    /**
     * Executes an AI completion with automatic failover.
     * Tries Primary (e.g. GPT-4) -> Secondary (e.g. Gemini) -> Fallback (e.g. Local/Flash)
     */
    async generateWithFailover(systemPrompt: string, userPrompt: string, modelTier: 'standard' | 'premium' = 'standard') {
        const errors: any[] = [];
        const TIMEOUT_MS = 15000; // 15s Hard Timeout for AI calls

        const withTimeout = (promise: Promise<any>, ms: number, provider: string) => {
            return Promise.race([
                promise,
                new Promise((_, reject) => setTimeout(() => reject(new Error(`[${provider}] Connection Timed Out after ${ms}ms`)), ms))
            ]);
        };

        // 1. Primary Vector: OpenAI (GPT-4o / GPT-3.5)
        try {
            if (!openai) throw new Error("OpenAI Key Missing");

            const model = modelTier === 'premium' ? 'gpt-4o' : 'gpt-4o-mini'; // Upgraded from 3.5

            const completion = await withTimeout(
                openai.chat.completions.create({
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: userPrompt }
                    ],
                    model: model,
                    temperature: 0.7,
                }),
                TIMEOUT_MS,
                'OpenAI'
            );

            return {
                content: completion.choices[0].message.content,
                provider: 'openai',
                model: model
            };

        } catch (err: any) {
            console.warn(`[AI Failover] Primary (${modelTier}) failed. Switching to Secondary. Reason: ${err.message}`);
            errors.push({ provider: 'openai', error: err.message });
        }

        // 2. Secondary Vector: Google Gemini (Flash / Pro)
        try {
            if (!genAI) throw new Error("Google AI Key Missing");

            const modelName = modelTier === 'premium' ? 'gemini-1.5-pro' : 'gemini-1.5-flash';
            const model = genAI.getGenerativeModel({
                model: modelName,
                systemInstruction: systemPrompt
            });

            const result = await withTimeout(
                model.generateContent(userPrompt),
                TIMEOUT_MS,
                'Gemini'
            );

            const response = result.response;

            return {
                content: response.text(),
                provider: 'google',
                model: modelName
            };

        } catch (err: any) {
            console.warn(`[AI Failover] Secondary failed. Switching to Emergency Fallback. Reason: ${err.message}`);
            errors.push({ provider: 'google', error: err.message });
        }

        // 3. Emergency Fallback: Safe Mode
        console.error("[AI CRITICAL FAILURE] All vectors exhausted.", errors);
        return {
            content: "Neural Uplink Unstable. System is operating in safe mode. Please check your connection and try again.",
            provider: 'fallback',
            model: 'system-safe-mode',
            error: errors
        };
    }
}

export const aiResilience = new IntelligenceEngine();
