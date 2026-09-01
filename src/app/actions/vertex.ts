'use server'

import { VertexAI } from '@google-cloud/vertexai';
import { recordLlmUsage } from '@/lib/ai/token-meter';

const project = process.env.GCP_PROJECT_ID || 'edintel-EdIntel';
const location = 'us-central1';

export async function generateGrantDraft(prompt: string) {
    const start = Date.now();
    const modelId = 'gemini-1.5-pro';

    try {
        if (!process.env.GCP_PRIVATE_KEY) {
            console.warn('VertexAI: Missing credentials, returning mock response.');
            return {
                success: true,
                draft: `Drafting grant for: ${prompt}\n\n[EdIntel Protocol - EdIntel Version 1.0]\n\nBased on Mobile County district priorities, this proposal outlines a strategic implementation of AI-driven instructional OS to bridge achievement gaps...`,
                mock: true
            };
        }

        const vertexAI = new VertexAI({ project: project, location: location });
        const generativeModel = vertexAI.getGenerativeModel({
            model: modelId,
        });

        const request = {
            contents: [{ role: 'user', parts: [{ text: `You are a professional educational grant writer for the Mobile County school district. Respond as a "EdIntel OS Intelligence". Prompt: ${prompt}` }] }],
        };

        const result = await generativeModel.generateContent(request);
        const response = result.response;
        const text = response.candidates?.[0]?.content?.parts?.[0]?.text || '';

        const usageMeta = (response as any)?.usageMetadata;
        const inputTokens = usageMeta?.promptTokenCount || 0;
        const outputTokens = usageMeta?.candidatesTokenCount || 0;
        const totalTokens = usageMeta?.totalTokenCount || (inputTokens + outputTokens);

        void recordLlmUsage({
            modelId,
            provider: 'vertex',
            operation: 'generateGrantDraft',
            route: 'actions/vertex',
            inputTokens,
            outputTokens,
            totalTokens,
            latencyMs: Date.now() - start,
            success: true,
        });

        return { success: true, draft: text };
    } catch (error: any) {
        console.error('Vertex AI Error:', error);
        void recordLlmUsage({
            modelId,
            provider: 'vertex',
            operation: 'generateGrantDraft',
            route: 'actions/vertex',
            latencyMs: Date.now() - start,
            success: false,
            errorCode: error?.name || 'VERTEX_GENERATE_ERROR',
        });
        return { success: false, error: 'Failed to generate grant draft' };
    }
}
