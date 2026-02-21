import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { NextRequest } from 'next/server';
import { ANTIGRAVITY_PROMPT } from '@/lib/google-antigravity';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GEMINI_API_KEY || '',
});

export const runtime = 'edge';

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        const result = streamText({
            model: google('gemini-2.0-flash-exp'),
            system: ANTIGRAVITY_PROMPT,
            messages,
            temperature: 0.7,
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('Voice Streaming Error:', error);
        return new Response(
            JSON.stringify({ error: 'Voice session failed' }),
            { status: 500 }
        );
    }
}
