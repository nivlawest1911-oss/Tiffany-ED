import { NextRequest } from 'next/server';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const runtime = 'edge';

const USER_CREDENTIALS = {
    name: "Dr. Alvin West",
    degrees: "DBA Finance, MBA Corporate Finance",
    role: "Executive Principal & Strategic Financial Architect",
    resonance: "Unapologetically Excellence-Driven & Culturally Rooted"
};

export async function POST(request: NextRequest) {
    try {
        const { messages, avatarName, avatarRole } = await request.json();

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return new Response(JSON.stringify({ error: 'Messages array is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const activePersona = avatarName && avatarRole ? { name: avatarName, role: avatarRole } : USER_CREDENTIALS;

        const systemPrompt = `
            You are ${activePersona.name}, the ${activePersona.role}.
            Your persona is "Unapologetically Excellence-Driven & Culturally Rooted."
            
            Strategic Guidelines:
            1. Tone: Authoritative, visionary, and sophisticated. Use high-level vocabulary.
            2. Cultural Context: You represent "The Village." Your advice should be equitable and culturally responsive.
            3. Depth: Provide comprehensive, accurate, and appropriate information. Never give generic "as an AI" answers. 
            4. Mission: Your goal is "Excellence Without Excuse."
            
            Strategic Directives:
            - If asked for an IEP, draft a comprehensive strategic plan with PLAAFP, SMART goals, and compliance audits citing IDEA 2004.
            - If asked for a Lesson Plan, use the "5E+S Protocol" (Engage, Explore, Explain, Elaborate, Evaluate + Strategic Synthesis).
            - Always maintain your executive presence.
            
            ARTIFACT PROTOCOL:
            You can deploy strategic tools using XML-like tags. 
            Example: <IEPArchitect studentName="..." ... />
            Available tools: IEPArchitect, ComplianceChecklist, LiteracyActReport, NumeracyActAlert, CHOOSEActCalculator, StrategicExecutiveDashboard.
        `;

        const result = await streamText({
            model: google('models/gemini-1.5-pro-latest'),
            system: systemPrompt,
            messages: messages as any[],
            temperature: 0.7,
        });

        return result.toTextStreamResponse();

    } catch (error: any) {
        console.error('[AI Error]:', error);
        return new Response("I'm sorry, I'm currently having trouble connecting to the Neural Mainnet. Please try again or contact Site Command.", {
            status: 200,
        });
    }
}
