'use server';

// import { createGoogleGenerativeAI } from '@ai-sdk/google'; // Removed unused
// import { generateText } from 'ai'; // Removed unused
import { withResilience, ALABAMA_STRATEGIC_DIRECTIVE, EdIntel_PERSONA, aiResilience, type Persona } from './ai-resilience';
import { COGNITIVE_FITNESS_CONTEXT } from './context/cognitive-fitness';
import { COMPLIANCE_SYSTEM_PROMPT } from './compliance-engine';
import { kv } from '@vercel/kv';
import { supabase } from '@/lib/supabase';
import { queryEdIntelVault } from './rag/rag-core';

/**
 * Enhanced Neural Engine that connects to Google Gemini for 
 * real strategic intelligence generation.
 */
export async function generateProfessionalResponse(
  prompt: string,
  generatorId: string,
  persona?: Partial<Persona>,
  isChat: boolean = false,
  signal?: AbortSignal
): Promise<string> {
  const activePersona = persona || EdIntel_PERSONA;

  // 📚 VIRTUAL VAULT QUERY (RAG-lite)
  const vaultContext = await queryEdIntelVault(prompt);

  // SYSTEM PROMPT: FORCING HIGH-FIDELITY EdIntel PERSONA
  const systemPrompt = `
        You are ${activePersona.name}, the ${activePersona.role}.
        ${ALABAMA_STRATEGIC_DIRECTIVE}
        
        Strategic Guidelines:
        1. Tone: ${activePersona.tone || EdIntel_PERSONA.tone}
        2. Cultural Context: ${activePersona.culturalContext || EdIntel_PERSONA.culturalContext}
        3. Mission: ${activePersona.mission || EdIntel_PERSONA.mission}
        
        Tool Context: ${generatorId}
        
        SUPER-INTELLIGENCE MANDATE:
        - THOUGHT PROCESS: Before every answer, you MUST engage in a "Neural Synthesis" step. 
          Output your reasoning inside <neural_synthesis> tags, evaluating 3 distinct strategies and selecting the optimal one.
        - CITATION PROTOCOL: You must cite specific Alabama codes (e.g., "Ala. Code § 16-6G-1" for Literacy) or federal statutes where applicable. Reference the COMPLIANCE ENGINE.
        - COGNITIVE CONTEXT: Integrate these research pillars: ${COGNITIVE_FITNESS_CONTEXT.pillars.map(p => p.name + ": " + p.directive).join(" | ")}.
        - NO fluff: Do not use filler words. Be dense, high-entropy, and high-value.
        - ANALYTICAL DEPTH: If asked for a strategy, provide a multi-phase implementation plan with specific KPIs for Mobile County Schools.

        ${vaultContext}

        COMPLIANCE ENGINE PROTOCOL:
        ${COMPLIANCE_SYSTEM_PROMPT}

        SPECIALIZED DIRECTIVES:
        ${generatorId === 'lesson-architect' ? 'Act as the EdIntel Lesson Architect. Mandate ALCOS alignment, SOR (Science of Reading) specific scaffolds, and explicit multi-sensory strategies.' : ''}
        ${generatorId === 'iep-audit' ? 'Act as the EdIntel Compliance Architect. Perform high-fidelity audits citing Al. Admin. Code 290-8-9 and "Mastering the Maze" benchmarks.' : ''}
        ${generatorId === 'fiscal-command' ? 'Act as the EdIntel Financial Strategist. Focus on Title I Part A allocation, eGAP compliance, and the Alabama Red Book standards.' : ''}

        If in a chat session, be conversational but maintain your executive presence as a high-level strategist.
    `;

  try {
    return await withResilience(async () => {
      // 🧠 NEURAL CACHE (Vercel KV)
      // Use a simple hash to prevent collisions on similar prompts without requiring Node.js crypto
      const simpleHash = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = (hash << 5) - hash + char;
          hash |= 0; // Convert to 32bit integer
        }
        return Math.abs(hash).toString(36);
      };
      const hash = simpleHash(prompt);
      const cacheKey = `intel:${hash}`;
      let cached: string | null = null;

      try {
        cached = await kv.get(cacheKey);
      } catch (_cacheError) {
        console.warn("⚠️ Neural Cache (KV) offline. Proceeding to live synthesis.", _cacheError);
      }

      if (cached) {
        console.log(`💎 Serving from Neural Cache [Key: ${cacheKey.substring(0, 10)}...]`);
        return cached;
      }

      // 🤖 EXECUTE INTELLIGENCE ENGINE (Failover Protected)
      // Standard Tier by default, can be upgraded based on persona in future
      const aiResult = await aiResilience.generateWithFailover(systemPrompt, prompt, 'standard');

      // Fallback Check - If fallback is triggered, we DO NOT cache the result
      if (aiResult.provider === 'fallback') {
        console.warn("⚠️ AI Failover exhausted. Engaging Smart Fallback.");
        throw new Error("AI_FAILOVER_EXHAUSTED");
      }

      const text = aiResult.content || "";

      // Save to Cache for 1 hour only if successful
      if (text.length > 50) {
        // Aggressive Caching: 2 Hours (7200s) to reduce API costs for repetitive strategic queries
        kv.set(cacheKey, text, { ex: 7200 }).catch(err => console.warn("Cache Write Failed:", err));
      }

      // 🏛️ EdIntel AUDIT LOG (Supabase)
      if (supabase) {
        try {
          await supabase.from('audit_logs').insert([{
            event: 'AI_SYNTHESIS',
            generator: generatorId,
            prompt_preview: prompt.substring(0, 100),
            status: 'SUCCESS',
            architecture: aiResult.model ? `FAI_VS_${aiResult.model.toUpperCase()}` : 'UNKNOWN_MODEL',
            timestamp: new Date().toISOString()
          }]);
        } catch (dbError) {
          console.warn("⚠️ Audit log ingestion failed:", dbError);
        }
      }

      // 🛡️ IMMUTABLE LOG (BigQuery) - Called via API to prevent SDK leakage into client packages
      if (typeof window === 'undefined') {
        fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/logging/bigquery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            role: 'assistant',
            content: text,
            model: 'gemini-2.0-flash',
            timestamp: new Date().toISOString(),
            metadata: {
              generatorId,
              persona: activePersona.name
            }
          })
        }).catch(err => console.warn("[BigQuery Proxy Log Error]:", err));
      }



      return text;
    }, { signal });
  } catch (error) {
    console.error("[EdIntel_ENGINE] Synthesis failed:", error);
    return await SmartFallbackEngine(prompt, activePersona, isChat);
  }
}

/**
 * SMART FALLBACK ENGINE
 * Synthesizes a context-aware response using RAG-lite when live AI is offline.
 */
async function SmartFallbackEngine(topic: string, persona: any, isChat: boolean): Promise<string> {
  const vaultContext = await queryEdIntelVault(topic);
  const p = topic.toLowerCase();

  // If we have vault context, we can lead with it.
  const contextMessage = vaultContext
    ? "\n\n## Local Archive Synthesis\nEstablishing neural link to offline vault... Context retrieved successfully."
    : "";

  if (p.includes('iep') || p.includes('special')) {
    return `
# 🦁 Strategic IEP Briefing (Resilient Logic)
**Architect:** ${persona.name} | **Status:** [SYNTHESIS_RECOVERED]

In the absence of live neural connectivity, I have synthesized this response using high-fidelity local compliance data.

${vaultContext || 'No specific IEP vault markers found. Reverting to base IDEA protocols.'}

## Strategic Vector: Individualized Support
- **IDEA Alignment:** This roadmap prioritizes LRE/FAPE mandates under IDEA 2004.
- **Instructional Focus:** Targets executive function and Science of Reading (SOR) scaffolds.
- **Immediate Action:** Initiate manual compliance audit of Section 504/IDEA artifacts.

*"We protect the child by perfecting the protocol."*
    `;
  }

  if (p.includes('teacher') || p.includes('personnel') || p.includes('fight') || p.includes('conflict')) {
    return `
# 🦁 Personnel Conflict Protocol (Resilient Logic)
**Architect:** ${persona.name} | **Status:** [SYNTHESIS_RECOVERED]

${vaultContext || 'Retrieved Alabama Professional Conduct Standards from local cache.'}

## Tactical Crisis Roadmap
1. **Neutral Separation:** Ensure parties are separated immediately to preserve the instructional environment.
2. **Grievance Documentation:** Initiate formal documentation aligned with Alabama Administrative Code 290-3-3.
3. **Escalation:** Alert district HR via the Sovereign OS Secure Ledger.

*"Instructional excellence requires an environment of absolute professional stability."*
     `;
  }

  if (isChat) {
    return `The complexity of '${topic || 'this vector'}' demands a EdIntel-level analysis. While I am re-calibrating my connection to the Neural Mainnet, I've retrieved a strategic scaffold: Focus on ${vaultContext ? 'the archived protocols' : 'our core triad: Fiscal Discipline, Instructional Fidelity, and Cultural Competence'}. Let us proceed strategically.`;
  }



  // 🎲 DYNAMIC ENTROPY INJECTION
  const strategies = [
    "Focus on Title I allocation efficiency and eGAP compliance.",
    "Prioritize Tier II/III intervention fidelity via Science of Reading (SOR) scaffolds.",
    "Audit the special education referral pipeline using 'Mastering the Maze' benchmarks.",
    "Review master schedule for instructional optimization and secondary course-code alignment.",
    "Analyze teacher retention data for patterns using NBCT stipend correlation.",
    "Align continuous improvement plan with ACIP (Alabama Continuous Improvement Plan) goals.",
    "Execute a safety protocol audit via nSide and Virtual Alabama sync."
  ];
  const randomStrategy = strategies[Math.floor(Math.random() * strategies.length)];

  return `
# 🦁 EdIntel Executive Briefing (Resilient Logic)
**Architect:** ${persona.name} | **Status:** [SYNTHESIS_RESERVERED]

## Strategic Synthesis: ${topic}
Live neural connectivity is currently maximizing throughput. I have synthesized this protocol from the EdIntel Vault contexts to ensure continuity of operations.${contextMessage}

${vaultContext || 'High-probability leadership patterns applied from EdIntel persona.'}

## Tactical Roadmap (Immediate Action Required)
*   **Vector 1 (Diagnostic):** Execute a root-cause audit within 24 hours.
*   **Vector 2 (Intervention):** Deploy Tier II/III scaffolds immediately.
*   **Vector 3 (Strategic):** ${randomStrategy}

*"Operational excellence is not a request; it is the standard."*
    `;
}

/**
 * Streaming version of Professional Response with Failover.
 */
export async function streamProfessionalResponse(
  prompt: string,
  generatorId: string,
  persona?: Partial<Persona>,
  tier: 'standard' | 'premium' = 'standard'
) {
  const activePersona = persona || EdIntel_PERSONA;

  // 📚 VIRTUAL VAULT QUERY (RAG-lite)
  const vaultContext = await queryEdIntelVault(prompt);

  const systemPrompt = `
        You are ${activePersona.name}, the ${activePersona.role}.
        ${ALABAMA_STRATEGIC_DIRECTIVE}
        
        Strategic Guidelines:
        1. Tone: ${activePersona.tone || EdIntel_PERSONA.tone}
        2. Cultural Context: ${activePersona.culturalContext || EdIntel_PERSONA.culturalContext}
        3. Mission: ${activePersona.mission || EdIntel_PERSONA.mission}
        4. Goal: 79 school site signups in Mobile County, Alabama.
        
        SUPER-INTELLIGENCE MANDATE:
        - THOUGHT PROCESS: Before every answer, you MUST engage in a "Neural Synthesis" step. 
        - Output your reasoning inside <neural_synthesis> tags, evaluating 3 distinct strategies and selecting the optimal one.
        - CITATION PROTOCOL: Reference specific Alabama codes (SB 216/171), ESSA federal statutes, and MCPSS strategic goals.
        - COGNITIVE CONTEXT: Integrate these research pillars: ${COGNITIVE_FITNESS_CONTEXT.pillars.map(p => p.name + ": " + p.directive).join(" | ")}.
        - NO FLUFF: Be dense, high-entropy, and high-value.
        - CEU/PLU ALIGNMENT: Ensure all professional development recommendations qualify for state-recognized credit.

        ${vaultContext}
        ${COMPLIANCE_SYSTEM_PROMPT}

        SPECIALIZED DIRECTIVES:
        ${generatorId === 'lesson-architect' ? 'Act as the EdIntel Lesson Architect. Mandate ALCOS alignment, SOR (Science of Reading) specific scaffolds, and explicit multi-sensory strategies.' : ''}
        ${generatorId === 'iep-audit' ? 'Act as the EdIntel Compliance Architect. Perform high-fidelity audits citing Al. Admin. Code 290-8-9 and "Mastering the Maze" benchmarks.' : ''}
        ${generatorId === 'fiscal-command' ? 'Act as the EdIntel Financial Strategist. Focus on Title I Part A allocation, eGAP compliance, and the Alabama Red Book standards.' : ''}
    `;

  // Use the new streaming failover engine
  const result = await aiResilience.streamWithFailover(systemPrompt, prompt, tier);

  return result;
}
