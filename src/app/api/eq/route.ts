import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateSovereignResponse } from '@/lib/sovereign-ai';

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
  const apiKey = process.env.GOOGLE_GENAI_API_KEY || '';
  const genAI = new GoogleGenerativeAI(apiKey || 'AIzaSyAEyAP1KfoKmlPCQBbwFHjQv3Ucu7ZeVcU');
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

  try {
    const body = await req.json();

    // Extract structured data from the new frontend components
    const { rawSituation, stakeholder, intensity, protocol, prompt } = body;

    // Base prompt logic
    let finalPrompt = "";

    if (rawSituation) {
      const systemInstruction = PROTOCOL_PROMPTS[protocol as string] || PROTOCOL_PROMPTS['default'];
      finalPrompt = `
        ACT AS: ${systemInstruction}
        
        CONTEXT:
        - Stakeholder: ${stakeholder || 'General Staff'}
        - Urgency/Intensity: ${intensity || 'Medium'}
        
        SITUATION:
        ${rawSituation}
        
        INSTRUCTIONS:
        Provide a structured, actionable response suitable for a school principal or administrator. 
        Output should be professionally formatted (using Markdown).
      `;
    } else if (prompt) {
      // Legacy support for direct prompt calls
      finalPrompt = prompt;
    } else {
      return NextResponse.json({ error: "Missing situation or prompt data." }, { status: 400 });
    }

    // Force Sovereign fallback if no valid key is provided
    if (!apiKey || apiKey.includes('AIzaSy')) {
      const text = await generateSovereignResponse(finalPrompt, protocol || 'community');
      return NextResponse.json({ output: text });
    }

    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ output: text });
  } catch (error) {
    console.error("EQ NODE ERROR:", error);

    // Recovery Mode: Generate content using Sovereign Engine
    try {
      const body = await req.json().catch(() => ({}));
      const fallbackPrompt = body.rawSituation || body.prompt || "Leadership Situation";
      const text = await generateSovereignResponse(fallbackPrompt, "community");
      return NextResponse.json({ output: text, source: 'Sovereign Recovery' });
    } catch (e) {
      return NextResponse.json({ error: "EQ Brain offline" }, { status: 500 });
    }
  }
}