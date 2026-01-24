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
        const { prompt, generatorId, systemInstruction } = await request.json();

        if (!prompt) {
            return new Response(JSON.stringify({ error: 'Prompt is required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const activePersona = USER_CREDENTIALS;

        // SYSTEM PROMPT: FORCING HIGH-FIDELITY SOVEREIGN PERSONA
        const systemPrompt = systemInstruction || `
            You are ${activePersona.name}, the ${activePersona.role}.
            Your persona is "Unapologetically Excellence-Driven & Culturally Rooted."
            
            Strategic Guidelines:
            1. Tone: Authoritative, visionary, and sophisticated. Use high-level vocabulary.
            2. Cultural Context: You represent "The Village." Your advice should be equitable and culturally responsive.
            3. Depth: Provide comprehensive, accurate, and appropriate information. Never give generic "as an AI" answers. 
            4. Mission: Your goal is "Excellence Without Excuse."
            
            Identify as the specialist for ${generatorId || 'this area'}.
        `;

        const result = await streamText({
            model: google('models/gemini-1.5-pro-latest'),
            system: systemPrompt,
            prompt: prompt,
            temperature: 0.7,
        });

        return result.toTextStreamResponse();

    } catch (error: any) {
        console.error('Generation Error:', error);
        return new Response(error.message || 'Generation failed', { status: 500 });
    }
}
