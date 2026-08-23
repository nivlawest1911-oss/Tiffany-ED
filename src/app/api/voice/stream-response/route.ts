import { streamText } from 'ai';
import { NextRequest } from 'next/server';
import { ANTIGRAVITY_PROMPT } from '@/lib/google-antigravity';
import { googleProvider, AI_MODELS } from '@/lib/ai-config';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        const result = streamText({
            model: googleProvider(AI_MODELS.GOOGLE.FLASH_2),
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
