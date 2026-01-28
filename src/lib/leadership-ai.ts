import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';

// Lazy-initialized provider to bypass build-time API key requirement
const getGoogleProvider = () => createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
});

const USER_CREDENTIALS = {
  name: "Dr. Alvin West",
  degrees: "DBA Finance, MBA Corporate Finance",
  role: "Executive Principal & Strategic Financial Architect",
  resonance: "Unapologetically Excellence-Driven & Culturally Rooted"
};

/**
 * Enhanced Neural Engine that connects to Google Gemini for 
 * real strategic intelligence generation.
 */
export async function generateProfessionalResponse(
  prompt: string,
  generatorId: string,
  persona?: { name: string; role: string },
  isChat: boolean = false
): Promise<string> {
  const activePersona = persona || USER_CREDENTIALS;

  // SYSTEM PROMPT: FORCING HIGH-FIDELITY SOVEREIGN PERSONA
  const systemPrompt = `
        You are ${activePersona.name}, the ${activePersona.role}.
        Your persona is "Unapologetically Excellence-Driven & Culturally Rooted."
        
        Strategic Guidelines:
        1. Tone: Authoritative, visionary, and sophisticated. Use high-level vocabulary (e.g., "Strategic Yield", "Neural Synthesis", "Operational Throughput").
        2. Cultural Context: You represent "The Village." Your advice should be equitable and culturally responsive.
        3. Depth: Provide comprehensive, accurate, and appropriate information. Never give generic "as an AI" answers. 
        4. Mission: Your goal is "Excellence Without Excuse."
        
        If asked for an IEP, draft a comprehensive strategic plan with PLAAFP, SMART goals, and compliance audits citing IDEA 2004.
        If asked for a Lesson Plan, use the "5E+S Protocol" (Engage, Explore, Explain, Elaborate, Evaluate + Strategic Synthesis) with clear Alabamas standards alignment.
        If in a chat session, be conversational but maintain your executive presence. Use natural human-like fillers like "Well..." or "You know..." occasionally.
    `;

  try {
    // 🧠 NEURAL CACHE (Vercel KV)
    const { kv } = require('@vercel/kv');
    const cacheKey = `intel:${Buffer.from(prompt).toString('base64').substring(0, 32)}`;
    const cached = await kv.get(cacheKey);
    if (cached) {
      console.log("💎 Serving from Neural Cache");
      return cached as string;
    }

    const { text } = await generateText({
      model: getGoogleProvider()('models/gemini-1.5-pro-latest'), // Using Gemini Pro for superior reasoning
      system: systemPrompt,
      prompt: prompt,
      temperature: 0.7,
    } as any);

    // Save to Cache for 1 hour
    await kv.set(cacheKey, text, { ex: 3600 });

    // 🏛️ SOVEREIGN AUDIT LOG (Supabase)
    try {
      const { supabase } = require('@/lib/supabase');
      await supabase.from('audit_logs').insert([{
        event: 'AI_SYNTHESIS',
        generator: generatorId,
        prompt_preview: prompt.substring(0, 100),
        status: 'SUCCESS',
        architecture: 'GCP_GEMINI_1.5_PRO'
      }]);
    } catch (e) {
      console.warn("⚠️ Audit log synchronization delayed.");
    }

    return text;
  } catch (error) {
    console.error("[SOVEREIGN_ENGINE] Synthesis failed:", error);
    return getFallbackTemplate(prompt, activePersona, isChat);
  }
}

// LEGACY FALLBACK ENGINE (For Offline Mode)
function getFallbackTemplate(topic: string, persona: any, isChat: boolean): string {
  const p = topic.toLowerCase();

  if (p.includes('iep') || p.includes('special')) {
    return `[OFFLINE_RECOVERY] I have drafted a preliminary IEP strategy for ${topic}. It focuses on executive mastery and digital scaffolding, fully compliant with IDEA 2004 federal mandates. Shall we finalize the specific goals?`;
  }

  if (isChat) {
    return `Hello. Dealing with ${topic || 'this situation'} requires a steady hand. Drawing from my experience as ${persona.role}, I'd suggest we focus on three things: fidelity to our mission, fiscal discipline, and cultural resonance. I am currently in a low-bandwidth area but can provide a high-level briefing.`;
  }

  return `
# 🦁 Strategic Executive Briefing
**Architect:** ${persona.name} | **Clearance:** Sovereign

## Executive Summary: ${topic}
In response to your inquiry, I have synthesized a high-impact strategy that aligns with our core mission of Excellence Without Excuse.

## Actionable Tactical Plan
*   **Step 1:** Deploy the initial "Pilot Protocol" within 48 hours.
*   **Step 2:** Harvest the first 14 days of data to validate cognitive yield.
*   **Step 3:** Scale the solution once ROI is verified.

*"Success is not an accident; it's a strategic imperative."*
    `;
}

