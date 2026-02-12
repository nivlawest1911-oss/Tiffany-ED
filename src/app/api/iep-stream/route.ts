import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';
import { createXai } from '@ai-sdk/xai';
import { NextRequest } from 'next/server';

// Lazy initials for AI providers
function getModel(provider: string = 'google') {
    switch (provider) {
        case 'anthropic': {
            const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY || '' });
            return anthropic('claude-sonnet-4-20250514');
        }
        case 'openai': {
            const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });
            return openai('gpt-4o');
        }
        case 'xai': {
            const xai = createXai({ apiKey: process.env.XAI_API_KEY || '' });
            return xai('grok-2-1212');
        }
        case 'google':
        default: {
            const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY || '' });
            return google('gemini-2.0-flash');
        }
    }
}

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
    try {
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
