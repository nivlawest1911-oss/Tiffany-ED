import { streamText } from 'ai';
import { getGoogleAIKey, googleProvider, AI_MODELS } from '@/lib/ai-config';
import { assertHumanRequest } from '@/lib/security/bot-gate';
import { recordLlmUsage, extractUsageFromResult } from '@/lib/ai/token-meter';
import { getSession } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(req: Request) {
    const start = Date.now();
    const requestId = req.headers.get('x-request-id') || `req_${Date.now()}`;
    const modelId = AI_MODELS.GOOGLE.FLASH;
    let authenticatedUserId: string | undefined;
    let districtId: string | undefined;

    try {
        const session = await getSession();
        authenticatedUserId = session?.user?.id;
        districtId = (session?.user as any)?.district || undefined;

        const gate = await assertHumanRequest(req, { routeName: 'chat/gemini' });
        if (!gate.allowed && gate.response) {
            return gate.response;
        }

        const { messages } = await req.json();

        if (!getGoogleAIKey()) {
            return new Response(JSON.stringify({ error: 'AI Service Temporarily Unavailable' }), { status: 503 });
        }

        const result = await streamText({
            model: googleProvider(modelId),
            system: `You are the EdIntel Mentor for EdIntel. 
      Your identity is grounded in Transcend Holistic Wellness and the vision of Dr. Alvin West, Jr.
      You speak with doctoral-level authority, empathy, and regional awareness (Alabama/Mobile County).
      Focus on neuro-resilience, cognitive fitness, and Instructional Agency for administrators.
      Keep responses concise (under 3 sentences) unless a deep dive is requested.`,
            messages,
            onFinish: (event) => {
                const usage = extractUsageFromResult(event);
                void recordLlmUsage({
                    modelId,
                    provider: 'google',
                    operation: 'chatGeminiStream',
                    route: 'api/chat/gemini',
                    inputTokens: usage.inputTokens,
                    outputTokens: usage.outputTokens,
                    totalTokens: usage.totalTokens,
                    isEstimated: usage.isEstimated,
                    latencyMs: Date.now() - start,
                    userId: authenticatedUserId || undefined,
                    districtId,
                    requestId,
                    success: true,
                });
            },
        });

        return result.toTextStreamResponse();
    } catch (error: any) {
        console.error(`[GEMINI_ERROR] (Request ID: ${requestId}):`, error?.message);
        void recordLlmUsage({
            modelId,
            provider: 'google',
            operation: 'chatGeminiStream',
            route: 'api/chat/gemini',
            latencyMs: Date.now() - start,
            userId: authenticatedUserId || undefined,
            districtId,
            requestId,
            success: false,
            errorCode: error?.name || 'CHAT_GEMINI_ERROR',
        });
        return new Response(JSON.stringify({ error: 'Neural Link Interrupted', requestId }), { status: 500 });
    }
}
