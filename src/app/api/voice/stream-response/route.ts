import { streamText } from 'ai';
import { NextRequest } from 'next/server';
import { ANTIGRAVITY_PROMPT } from '@/lib/google-antigravity';
import { googleProvider, AI_MODELS } from '@/lib/ai-config';
import { recordLlmUsage, extractUsageFromResult } from '@/lib/ai/token-meter';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
    const start = Date.now();
    const modelId = AI_MODELS.GOOGLE.FLASH_2;

    try {
        const session = await getSession();
        const authenticatedUserId = session?.user?.id;
        const districtId = (session?.user as any)?.district || undefined;

        const { messages } = await req.json();

        const result = streamText({
            model: googleProvider(modelId),
            system: ANTIGRAVITY_PROMPT,
            messages,
            temperature: 0.7,
            onFinish: (event) => {
                const usage = extractUsageFromResult(event);
                void recordLlmUsage({
                    modelId,
                    provider: 'google',
                    operation: 'voiceStreamResponse',
                    route: 'api/voice/stream-response',
                    inputTokens: usage.inputTokens,
                    outputTokens: usage.outputTokens,
                    totalTokens: usage.totalTokens,
                    isEstimated: usage.isEstimated,
                    latencyMs: Date.now() - start,
                    userId: authenticatedUserId || undefined,
                    districtId,
                    success: true,
                });
            },
        });

        return result.toTextStreamResponse();
    } catch (error: any) {
        console.error('Voice Streaming Error:', error);
        void recordLlmUsage({
            modelId,
            provider: 'google',
            operation: 'voiceStreamResponse',
            route: 'api/voice/stream-response',
            latencyMs: Date.now() - start,
            success: false,
            errorCode: error?.name || 'VOICE_STREAM_ERROR',
        });
        return new Response(
            JSON.stringify({ error: 'Voice session failed' }),
            { status: 500 }
        );
    }
}
