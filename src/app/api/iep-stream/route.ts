import { streamText } from 'ai';
import { NextRequest } from 'next/server';
import { 
    googleProvider, 
    anthropicProvider, 
    openaiProvider, 
    xaiProvider, 
    AI_MODELS 
} from '@/lib/ai-config';
import { assertHumanRequest } from '@/lib/security/bot-gate';
import { recordLlmUsage, extractUsageFromResult } from '@/lib/ai/token-meter';

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

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
    const requestId = req.headers.get('x-request-id') || `req_${Date.now()}`;
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

        const start = Date.now();
        const resolvedModelId = provider === 'anthropic' ? AI_MODELS.ANTHROPIC.SONNET : provider === 'openai' ? AI_MODELS.OPENAI.PRIMARY : provider === 'xai' ? AI_MODELS.XAI.GROK : AI_MODELS.GOOGLE.FLASH_2;

        // Stream the response with selected model
        const result = streamText({
            model: getModel(provider),
            system: systemPrompt,
            messages,
            temperature: 0.7,
            maxOutputTokens: 2000,
            headers: {
                'x-ai-assisted': 'true',
                'x-human-review-required': 'true',
            },
            onFinish: (event) => {
                const usage = extractUsageFromResult(event);
                void recordLlmUsage({
                    modelId: resolvedModelId,
                    provider: provider || 'google',
                    operation: 'iepStream',
                    route: 'api/iep-stream',
                    inputTokens: usage.inputTokens,
                    outputTokens: usage.outputTokens,
                    totalTokens: usage.totalTokens,
                    isEstimated: usage.isEstimated,
                    latencyMs: Date.now() - start,
                    requestId,
                    success: true,
                });
            },
        });

        return result.toTextStreamResponse({
            headers: {
                'x-ai-assisted': 'true',
                'x-human-review-required': 'true',
            }
        });
    } catch (error: any) {
        console.error(`[IEP Generation Error] (Request ID: ${requestId}):`, error?.message);
        void recordLlmUsage({
            modelId: 'unknown',
            provider: 'unknown',
            operation: 'iepStream',
            route: 'api/iep-stream',
            requestId,
            success: false,
            errorCode: error?.name || 'IEP_STREAM_ERROR',
        });
        return new Response(
            JSON.stringify({
                error: 'Failed to generate IEP',
                requestId
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}
