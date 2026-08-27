import { streamText } from 'ai';
import { NextRequest } from 'next/server';
import { 
    googleProvider, 
    anthropicProvider, 
    openaiProvider, 
    xaiProvider, 
    AI_MODELS 
} from '@/lib/ai-config';

// Resolve model using canonical providers
function getModel(provider: string = 'google') {
    switch (provider) {
        case 'anthropic': {
            return anthropicProvider(AI_MODELS.ANTHROPIC.SONNET);
        }
        case 'openai': {
            return openaiProvider(AI_MODELS.OPENAI.PRIMARY);
        }
        case 'xai': {
            return xaiProvider(AI_MODELS.XAI.GROK);
        }
        case 'google':
        default: {
            return googleProvider(AI_MODELS.GOOGLE.FLASH_2);
        }
    }
}

import { assertHumanRequest } from '@/lib/security/ironshield-gate';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
    try {
        const gate = await assertHumanRequest(req, { routeName: 'iep-stream' });
        if (!gate.allowed && gate.response) {
            return gate.response;
        }

        const { messages, gradeLevel, subject, specialNeeds, provider = 'google' } = await req.json();
        const { ALABAMA_STRATEGIC_DIRECTIVE } = await import('@/lib/ai-resilience');

        // Build system prompt based on context
        const systemPrompt = `
            ${ALABAMA_STRATEGIC_DIRECTIVE}

            You are an expert IEP (Individualized Education Program) architect specializing in IDEA-compliant documentation for Alabama educators.
            
            Context:
            - Grade Level: ${gradeLevel || 'Not specified'}
            - Subject Area: ${subject || 'Not specified'}
            - Special Needs: ${specialNeeds?.join(', ') || 'Not specified'}

            Your responses should:
            1. Be IDEA-compliant and FERPA-secure.
            2. MANDATE SMART goals using Webb's DOK 3/4 reasoning.
            3. Integrate Science of Reading (SOR) principles for any literacy-related goals.
            4. Cite Alabama Administrative Code (AAC) requirements for IEP development.
            5. Provide specific, data-driven accommodations.
            6. All goals must be research-based (Hattie/Marzano alignment).

            Always structure IEPs with:
            - Present Levels of Performance (PLOP)
            - Annual Goals (SMART format)
            - Accommodations & Modifications
            - Services & Support
            - Progress Monitoring Plan
        `;

        // Stream the response with selected model
        const result = streamText({
            model: getModel(provider),
            system: systemPrompt,
            messages,
            temperature: 0.7,
            maxOutputTokens: 2000,
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('IEP Generation Error:', error);
        return new Response(
            JSON.stringify({
                error: 'Failed to generate IEP',
                details: error instanceof Error ? error.message : 'Unknown error'
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}
