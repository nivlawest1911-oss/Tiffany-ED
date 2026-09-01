import { generateObject } from 'ai';
import { googleProvider, AI_MODELS } from '@/lib/ai-config';
import { RestorativeScriptSchema } from '@/lib/ai/signatures';
import { z } from 'zod';
import { recordLlmUsage, extractUsageFromResult } from '@/lib/ai/token-meter';

export interface RestorativeContext {
    studentName: string;
    incidentType: string;
    severity: 'low' | 'medium' | 'high';
    relationshipHistory: 'positive' | 'neutral' | 'strained';
}

export type RestorativeScript = z.infer<typeof RestorativeScriptSchema>;

export async function generateRestorativeScript(context: RestorativeContext): Promise<RestorativeScript> {
    const startTime = Date.now();
    const modelId = AI_MODELS.GOOGLE.PRO;

    try {
        const prompt = `
      Act as a master Restorative Justice facilitator and veteran educator (Tiffany).
      Create a "Restorative Reset" script for a teacher to use with a student.
      
      Context:
      - Student Name: ${context.studentName}
      - Incident: ${context.incidentType}
      - Severity: ${context.severity}
      - Relationship History: ${context.relationshipHistory}
      
      Goal: De-escalate, reconnect, and problem-solve. Avoid shaming. Use "I" statements and open-ended questions.
    `;

        const result = await generateObject({
            model: googleProvider(modelId),
            schema: RestorativeScriptSchema,
            prompt: prompt,
        });

        const usage = extractUsageFromResult(result);
        void recordLlmUsage({
            modelId,
            provider: 'google',
            operation: 'generateRestorativeScript',
            route: 'tiffany/restorative-reset',
            inputTokens: usage.inputTokens,
            outputTokens: usage.outputTokens,
            totalTokens: usage.totalTokens,
            isEstimated: usage.isEstimated,
            latencyMs: Date.now() - startTime,
            success: true,
        });

        return result.object;
    } catch (error: any) {
        console.error('Error generating restorative script:', error);
        void recordLlmUsage({
            modelId,
            provider: 'google',
            operation: 'generateRestorativeScript',
            route: 'tiffany/restorative-reset',
            latencyMs: Date.now() - startTime,
            success: false,
            errorCode: error?.name || 'RESTORATIVE_SCRIPT_ERROR',
        });

        // Fallback script
        return {
            opener: `I notice things are a bit off, ${context.studentName}. Let's reset.`,
            questions: [
                "What's happening for you right now?",
                "Who has been affected by this?",
                "What do we need to do to fix this?"
            ],
            closing: "I believe in you. Let's try again."
        };
    }
}
