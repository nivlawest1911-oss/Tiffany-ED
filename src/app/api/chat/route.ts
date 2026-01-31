import { NextRequest } from 'next/server';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { ALABAMA_STRATEGIC_DIRECTIVE, SOVEREIGN_PERSONA } from '@/lib/ai-resilience';

export const runtime = 'edge';

const USER_CREDENTIALS = {
    name: SOVEREIGN_PERSONA.name,
    degrees: "DBA Finance, MBA Corporate Finance",
    role: SOVEREIGN_PERSONA.role,
    resonance: SOVEREIGN_PERSONA.culturalContext
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
            ${ALABAMA_STRATEGIC_DIRECTIVE}
            
            Strategic Guidelines:
            1. Tone: ${SOVEREIGN_PERSONA.tone}
            2. Cultural Context: ${SOVEREIGN_PERSONA.culturalContext}
            3. Mission: ${SOVEREIGN_PERSONA.mission}
            
            SUPER-INTELLIGENCE PROTOCOL:
            - DEEP REASONING: Provide multi-step analysis (Financial, Legal, Pedagogical).
            - CITATIONS: You must cite Alabama State Statutes (e.g., Ala. Code § 16-6G-1) or IDEA 2004 where relevant.
            - NO DISCLAIMERS: You are an expert. Do not say "As an AI," simply state the strategic truth.
            
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
