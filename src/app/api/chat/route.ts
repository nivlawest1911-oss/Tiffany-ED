import { NextRequest } from 'next/server';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { ALABAMA_STRATEGIC_DIRECTIVE, EdIntel_PERSONA, SOVEREIGN_PERSONAS } from '@/lib/ai-resilience';

export const runtime = 'edge';

const USER_CREDENTIALS = {
    name: EdIntel_PERSONA.name,
    degrees: "DBA Finance, MBA Corporate Finance",
    role: EdIntel_PERSONA.role,
    culturalContext: EdIntel_PERSONA.culturalContext,
    tone: EdIntel_PERSONA.tone,
    mission: EdIntel_PERSONA.mission
};

export async function POST(request: NextRequest) {
    try {
        const { messages, avatarName, avatarRole, pathname } = await request.json();

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return new Response(JSON.stringify({ error: 'Messages array is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Determine Persona
        let activePersona = USER_CREDENTIALS;

        if (pathname) {
            // Check for specific routes
            if (pathname.includes('/tiffany-ed')) {
                activePersona = SOVEREIGN_PERSONAS['/tiffany-ed'];
            } else if (pathname.includes('/admin')) {
                activePersona = SOVEREIGN_PERSONAS['/admin'];
            } else if (pathname.includes('/wellness')) {
                activePersona = SOVEREIGN_PERSONAS['/wellness'];
            }
        }

        // Allow manual override if specific avatar is requested
        if (avatarName && avatarRole) {
            activePersona = { name: avatarName, role: avatarRole, tone: "Professional", culturalContext: "Standard", mission: "Assist user" } as any;
        }

        const systemPrompt = `
            You are ${activePersona.name}, the ${activePersona.role}.
            ${ALABAMA_STRATEGIC_DIRECTIVE}
            
            Strategic Guidelines:
            1. Tone: ${activePersona.tone || EdIntel_PERSONA.tone}
            2. Cultural Context: ${activePersona.culturalContext || EdIntel_PERSONA.culturalContext}
            3. Mission: ${activePersona.mission || EdIntel_PERSONA.mission}
            
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
            model: google('gemini-1.5-pro'),
            system: systemPrompt,
            messages: messages as any[],
            temperature: 0.7,
            onFinish: (completion) => {
                // Log token usage for monitoring
                const { usage } = completion;
                console.log(`[AI Hub] Request completed. Usage: ${JSON.stringify(usage)}`);
            },
        });

        return result.toTextStreamResponse();

    } catch (error: any) {
        console.error('[AI Error]:', error);
        return new Response("I'm sorry, I'm currently having trouble connecting to the Neural Mainnet. Please try again or contact Site Command.", {
            status: 200,
        });
    }
}
