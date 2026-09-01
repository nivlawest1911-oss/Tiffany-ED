import { generateObject } from 'ai';
import { googleProvider, AI_MODELS } from '@/lib/ai-config';
import { ToneAnalysisSchema } from '@/lib/ai/signatures';
import { z } from 'zod';
import { recordLlmUsage, extractUsageFromResult } from '@/lib/ai/token-meter';

export type ToneAnalysis = z.infer<typeof ToneAnalysisSchema>;

export async function analyzeTone(text: string, context?: string): Promise<ToneAnalysis> {
    const start = Date.now();
    const modelId = AI_MODELS.GOOGLE.PRO;

    try {
        const result = await generateObject({
            model: googleProvider(modelId),
            schema: ToneAnalysisSchema,
            system: `You are the Tiffany-ED Emotional Intelligence Analyzer. 
      Analyze the teacher's log for emotional tone and signs of "Decision Fatigue".
      Return a structured evaluation with:
      - sentiment: 'positive' | 'neutral' | 'negative' | 'critical'
      - fatigueLevel: 'low' | 'moderate' | 'high' | 'severe'
      - suggestion: A brief, restorative suggestion (max 1 sentence).`,
            prompt: `Teacher Log: "${text}"\nContext: ${context || 'General interaction'}`,
        });

        const usage = extractUsageFromResult(result);
        void recordLlmUsage({
            modelId,
            provider: 'google',
            operation: 'analyzeTone',
            route: 'ai/tone-check',
            inputTokens: usage.inputTokens,
            outputTokens: usage.outputTokens,
            totalTokens: usage.totalTokens,
            isEstimated: usage.isEstimated,
            latencyMs: Date.now() - start,
            success: true,
        });

        return result.object;
    } catch (error: any) {
        console.error("Tone analysis failed:", error);
        void recordLlmUsage({
            modelId,
            provider: 'google',
            operation: 'analyzeTone',
            route: 'ai/tone-check',
            latencyMs: Date.now() - start,
            success: false,
            errorCode: error?.name || 'TONE_ANALYSIS_ERROR',
        });
        return {
            sentiment: 'neutral',
            fatigueLevel: 'moderate',
            suggestion: "Unable to analyze tone at this moment. Take a deep breath."
        };
    }
}
