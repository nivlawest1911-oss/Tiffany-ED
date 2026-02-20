import { NextRequest } from 'next/server';
import { streamProfessionalResponse } from '@/lib/leadership-ai';
import { EdIntel_PERSONA } from '@/lib/ai-resilience';

export const runtime = 'edge';

const PROTOCOL_PROMPTS: Record<string, string> = {
  'ef-reframing': 'You are an expert in Emotional Intelligence for school leadership. Reframe the following situation to de-escalate and build connection. Focus on validation and productive next steps.',
  'conflict': 'You are a conflict resolution specialist for educational environments. Provide a script or strategy to navigate this touchy situation, prioritizing professional relationships and clear boundaries.',
  'discipline': 'You are a legal compliance expert for school discipline (IDEA/504). Analyze the situation for compliance risks, suggest necessary documentation, and outline procedural next steps.',
  'meeting-agenda': 'You are an executive productivity coach. Create a high-impact meeting agenda for this topic, including time allocations and desired outcomes for each item.',
  'feedback': 'You are a master of constructive feedback. Draft a script for delivering this feedback effectively using the "Situation-Behavior-Impact" model.',
  'crisis': 'You are a crisis communication expert. Draft an urgent memo or statement regarding this event, ensuring clarity, reassurance, and factual accuracy.',
  'default': 'You are an expert school leadership consultant. Provide advice and a protocol for handling this situation.',
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { rawSituation, stakeholder, intensity, protocol, prompt } = body;

    let finalPrompt = "";

    if (rawSituation) {
      const systemInstruction = PROTOCOL_PROMPTS[protocol as string] || PROTOCOL_PROMPTS['default'];
      finalPrompt = `
        ACT AS: ${systemInstruction}
        CONTEXT:
        - Target Stakeholder: ${stakeholder || 'General Staff'}
        - Required Intensity: ${intensity || 'Medium'}
        - Selected Protocol: ${protocol}
        
        SITUATION TO ANALYZE:
        ${rawSituation}
        
        STRATEGIC MANDATE:
        1. Eliminate non-factual generalities. Use CLINICALLY PRECISE vocabulary.
        2. Provide specific, actionable next steps citing research-based models (e.g. Hattie's Effect Size, Marzano's High Reliability).
        3. If legal/compliance is involved (Discipline/IDEA/FERPA), cite specific Alabama (Ala. Code) or Federal statutes.
        4. STRUCTURE: Output as a formal "EdIntel Executive Briefing". Use markdown headers for 'Strategic Synthesis' and 'Tactical Roadmap'.
      `;
    } else if (prompt) {
      finalPrompt = prompt;
    } else {
      return new Response(JSON.stringify({ error: "Missing situation or prompt data." }), { status: 400 });
    }

    const result = await streamProfessionalResponse(
      finalPrompt,
      protocol || 'eq-node',
      EdIntel_PERSONA
    );

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("EQ NODE ERROR:", error);
    return new Response(JSON.stringify({ error: "EQ Brain offline", details: error.message }), { status: 500 });
  }
}
