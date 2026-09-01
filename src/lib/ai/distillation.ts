import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { recordLlmUsage, extractUsageFromResult } from '@/lib/ai/token-meter';

/**
 * DistillationEngine: Bridges high-fidelity LLM insights into compact, 
 * edge-optimized fragments for the Sovereign Suite.
 */
export class DistillationEngine {
    /**
     * Distills a complex instructional directive into a 'Strategic Essence'.
     * This summary is designed to be stored locally or used as a few-shot prompt for smaller models.
     */
    static async distill(complexInsight: string): Promise<string> {
        const start = Date.now();
        const modelId = 'gemini-1.5-flash';

        try {
            const result = await generateText({
                model: google(modelId), // Flash is great for distillation tasks
                system: `
                    You are the EdIntel Distillation Core. 
                    Your mission is to condense complex institutional intelligence into its "Strategic Essence".
                    Output must be a high-density, bulleted protocol, maximum 3 lines.
                    Focus on: Action, Compliance, and Equity.
                `,
                prompt: `Distill this institutional insight: ${complexInsight}`,
            });

            const usage = extractUsageFromResult(result);
            void recordLlmUsage({
                modelId,
                provider: 'google',
                operation: 'distillInsight',
                route: 'ai/distillation',
                inputTokens: usage.inputTokens,
                outputTokens: usage.outputTokens,
                totalTokens: usage.totalTokens,
                isEstimated: usage.isEstimated,
                latencyMs: Date.now() - start,
                success: true,
            });

            return result.text.trim();
        } catch (error: any) {
            void recordLlmUsage({
                modelId,
                provider: 'google',
                operation: 'distillInsight',
                route: 'ai/distillation',
                latencyMs: Date.now() - start,
                success: false,
                errorCode: error?.name || 'DISTILLATION_ERROR',
            });
            throw error;
        }
    }

    /**
     * Generates a "Few-Shot" dataset from teacher outputs for smaller model grounding.
     */
    static async generateEdgeAITrainingFragment(teacherInput: string, teacherOutput: string) {
        // This simulates capturing teacher/student pairs for further refinement
        console.log('[Distillation] Capturing Intelligence Fragment for Model Grounding...');

        return {
            input: teacherInput.substring(0, 100),
            distilled_output: await this.distill(teacherOutput),
            teacher_fidelity: 'high',
            timestamp: new Date().toISOString()
        };
    }
}
