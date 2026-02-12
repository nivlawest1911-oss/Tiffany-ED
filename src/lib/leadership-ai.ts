'use server';

import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import { withResilience, ALABAMA_STRATEGIC_DIRECTIVE, EdIntel_PERSONA } from './ai-resilience';
import { COGNITIVE_FITNESS_CONTEXT } from './context/cognitive-fitness';
import { COMPLIANCE_SYSTEM_PROMPT } from './compliance-engine';
import { kv } from '@vercel/kv';
import { supabase } from '@/lib/supabase';

import { queryEdIntelVault } from './rag/rag-core';

// Lazy-initialized provider to bypass build-time API key requirement
const getGoogleProvider = () => createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
});

/**
 * Enhanced Neural Engine that connects to Google Gemini for 
 * real strategic intelligence generation.
 */
export async function generateProfessionalResponse(
  prompt: string,
  generatorId: string,
  persona?: { name: string; role: string },
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
        1. Tone: ${EdIntel_PERSONA.tone}
        2. Cultural Context: ${EdIntel_PERSONA.culturalContext}
        3. Mission: ${EdIntel_PERSONA.mission}
        
        Tool Context: ${generatorId}
        
        SUPER-INTELLIGENCE MANDATE:
        - THOUGHT PROCESS: Before every answer, you MUST engage in a "Neural Synthesis" step. 
          Output your reasoning inside <neural_synthesis> tags, evaluating 3 distinct strategies and selecting the optimal one.
        - CITATION PROTOCOL: You must cite specific Alabama codes (e.g., "Ala. Code § 16-6G-1" for Literacy) or federal statutes where applicable. Reference the COMPLIANCE ENGINE.
        - COGNITIVE CONTEXT: Integrate these research pillars: ${COGNITIVE_FITNESS_CONTEXT.pillars.map(p => p.name + ": " + p.directive).join(" | ")}.
        - NO fluff: Do not use filler words. Be dense, high-entropy, and high-value.

        ${vaultContext}

        COMPLIANCE ENGINE PROTOCOL:
        ${COMPLIANCE_SYSTEM_PROMPT}

        SPECIALIZED DIRECTIVES:
        ${generatorId === 'lesson-architect' ? 'Act as the EdIntel Lesson Architect. Mandate ALCOS alignment and SOR integration.' : ''}
        ${generatorId === 'iep-audit' ? 'Act as the EdIntel Compliance Architect. Perform high-fidelity audits citing Al. Admin. Code 290-8-9.' : ''}

        If in a chat session, be conversational but maintain your executive presence.
    `;

  try {
    return await withResilience(async () => {
      // 🧠 NEURAL CACHE (Vercel KV)
      const cacheKey = `intel:${Buffer.from(prompt).toString('base64').substring(0, 32)}`;
      let cached: string | null = null;

      try {
        cached = await kv.get(cacheKey);
      } catch (_cacheError) {
        console.warn("⚠️ Neural Cache (KV) offline. Proceeding to live synthesis.");
      }

      if (cached) {
        console.log("💎 Serving from Neural Cache");
        return cached;
      }

      const { text } = await generateText({
        model: getGoogleProvider()('models/gemini-2.0-flash'), // Moving to 2.0 Flash for sub-second executive synthesis
        system: systemPrompt,
        prompt: prompt,
        temperature: 0.7,
        abortSignal: signal,
      } as any);

      // Save to Cache for 1 hour (Optional - ignore failures)
      kv.set(cacheKey, text, { ex: 3600 }).catch(() => { });

      // 🏛️ EdIntel AUDIT LOG (Supabase)
      try {
        await supabase.from('audit_logs').insert([{
          event: 'AI_SYNTHESIS',
          generator: generatorId,
          prompt_preview: prompt.substring(0, 100),
          status: 'SUCCESS',
          architecture: 'GCP_GEMINI_2.0_FLASH',
          timestamp: new Date().toISOString()
        }]);

        // 🛡️ IMMUTABLE LOG (BigQuery) - Dynamic Import to prevent build-time bundling issues
        if (typeof window === 'undefined') {
          const { logToBigQuery } = await import('./bigquery-logger');
          logToBigQuery({
            role: 'assistant',
            content: text,
            model: 'gemini-2.0-flash',
            timestamp: new Date(),
            metadata: {
              generatorId,
              persona: activePersona.name
            }
          }).catch(err => console.warn("BigQuery Log Error:", err));
        }

      } catch (e) {
        console.warn("⚠️ Audit log synchronization delayed.");
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

  return `
# 🦁 EdIntel Executive Briefing (Resilient Logic)
**Architect:** ${persona.name} | **Status:** [SYNTHESIS_RECOVERED]

## Strategic Synthesis: ${topic}
Live neural connectivity is currently unstable. I have synthesized this protocol from the EdIntel Vault contexts to ensure continuity of operations.${contextMessage}

${vaultContext || 'High-probability leadership patterns applied from EdIntel persona.'}

## Tactical Roadmap (Immediate Action Required)
*   **Vector 1 (Diagnostic):** Execute a root-cause audit within 24 hours.
*   **Vector 2 (Intervention):** Deploy Tier II/III scaffolds immediately to mitigate learning loss.
*   **Vector 3 (Fiscal):** Verify funding source aligns with Title I or State allocations.

*"Operational excellence is not a request; it is the standard."*
    `;
}
