import { NextResponse } from 'next/server';
import { generateProfessionalResponse } from '@/lib/leadership-ai';

// Initialize directly with SDK to bypass Genkit configuration issues

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const PROTOCOL_PROMPTS: Record<string, string> = {
  'ef-reframing': 'You are an expert in Emotional Intelligence for school leadership. Reframe the following situation to de-escalate and build connection. Focus on validation and productive next steps.',
  'conflict': 'You are a conflict resolution specialist for educational environments. Provide a script or strategy to navigate this touchy situation, prioritizing professional relationships and clear boundaries.',
  'discipline': 'You are a legal compliance expert for school discipline (IDEA/504). Analyze the situation for compliance risks, suggest necessary documentation, and outline procedural next steps.',
  'meeting-agenda': 'You are an executive productivity coach. Create a high-impact meeting agenda for this topic, including time allocations and desired outcomes for each item.',
  'feedback': 'You are a master of constructive feedback. Draft a script for delivering this feedback effectively using the "Situation-Behavior-Impact" model.',
  'crisis': 'You are a crisis communication expert. Draft an urgent memo or statement regarding this event, ensuring clarity, reassurance, and factual accuracy.',
  'default': 'You are an expert school leadership consultant. Provide advice and a protocol for handling this situation.',
};

export async function POST(req: Request) {
  const apiKey = process.env.GOOGLE_GENAI_API_KEY;
  if (!apiKey) {
    // If no key, fallback to direct professional response immediately to avoid crash
    try {
      const body = await req.json();
      const { rawSituation, prompt, protocol } = body;
      const finalPrompt = rawSituation || prompt || "Leadership Situation";
      const text = await generateProfessionalResponse(finalPrompt, protocol || 'community');
      return NextResponse.json({ output: text, source: 'Professional Fallback (No Key)' });
    } catch (e) {
      return NextResponse.json({ error: "Configuration Error: API Key missing" }, { status: 500 });
    }
  }



  try {
    const body = await req.json();
    const { rawSituation, stakeholder, intensity, protocol, prompt } = body;
    const { ALABAMA_STRATEGIC_DIRECTIVE, EdIntel_PERSONA } = await import('@/lib/ai-resilience');

    let finalPrompt = "";

    if (rawSituation) {
      const systemInstruction = PROTOCOL_PROMPTS[protocol as string] || PROTOCOL_PROMPTS['default'];
      finalPrompt = `
        ${ALABAMA_STRATEGIC_DIRECTIVE}
        
        ACT AS: ${systemInstruction}
        PERSONA: ${EdIntel_PERSONA.name}, ${EdIntel_PERSONA.role}
        
        CONTEXT:
        - Stakeholder: ${stakeholder || 'General Staff'}
        - Urgency/Intensity: ${intensity || 'Medium'}
        
        SITUATION:
        ${rawSituation}
        
        MANDATE:
        1. Eliminate non-factual or unsubstantiated generalities.
        2. Provide specific, clinically precise next steps citing research-based peer-reviewed models (e.g. Hattie, Marzano).
        3. If legal/compliance related (Discipline/IDEA), cite specific Alabama or Federal codes.
      `;
    } else if (prompt) {
      finalPrompt = `${ALABAMA_STRATEGIC_DIRECTIVE}\n\n${prompt}`;
    } else {
      return NextResponse.json({ error: "Missing situation or prompt data." }, { status: 400 });
    }

    // ALWAYS use generateProfessionalResponse for consistent, resilient, and logged generations
    const text = await generateProfessionalResponse(finalPrompt, protocol || 'eq-node', EdIntel_PERSONA);
    return NextResponse.json({ output: text });
  } catch (error) {
    console.error("EQ NODE ERROR:", error);

    // Recovery Mode: Generate content using Professional Engine
    try {
      const body = await req.json().catch(() => ({}));
      const fallbackPrompt = body.rawSituation || body.prompt || "Leadership Situation";
      const text = await generateProfessionalResponse(fallbackPrompt, "community");
      return NextResponse.json({ output: text, source: 'Professional Recovery' });
    } catch (e) {
      return NextResponse.json({ error: "EQ Brain offline" }, { status: 500 });
    }
  }
}
