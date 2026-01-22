import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';
import { createXai } from '@ai-sdk/xai';
import { NextRequest } from 'next/server';

// Initialize AI providers
const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY || '',
});

const anthropic = createAnthropic({
    apiKey: process.env.ANTHROPIC_API_KEY || '',
});

const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});

const xai = createXai({
    apiKey: process.env.XAI_API_KEY || '',
});

export const runtime = 'edge';

// Model selector function
function getModel(provider: string = 'google') {
    switch (provider) {
        case 'anthropic':
            return anthropic('claude-sonnet-4-20250514');
        case 'openai':
            return openai('gpt-4o');
        case 'xai':
            return xai('grok-2-1212');
        case 'google':
        default:
            return google('gemini-1.5-pro');
    }
}

export async function POST(req: NextRequest) {
    try {
        const { messages, gradeLevel, subject, specialNeeds, provider = 'google' } = await req.json();

        // Build system prompt based on context
        const systemPrompt = `You are an expert IEP (Individualized Education Program) architect specializing in IDEA-compliant documentation for Alabama educators.

Context:
- Grade Level: ${gradeLevel || 'Not specified'}
- Subject Area: ${subject || 'Not specified'}
- Special Needs: ${specialNeeds?.join(', ') || 'Not specified'}

Your responses should:
1. Be IDEA-compliant and FERPA-secure
2. Include specific, measurable goals
3. Provide appropriate accommodations
4. Use professional educational terminology
5. Be comprehensive yet concise
6. Follow Alabama state standards

Always structure IEPs with:
- Present Levels of Performance
- Annual Goals (SMART format)
- Accommodations & Modifications
- Services & Support
- Progress Monitoring Plan`;

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
