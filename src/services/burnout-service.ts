import { generateText } from 'ai';
import { googleProvider, AI_MODELS } from '@/lib/ai-config';
import { recordLlmUsage, extractUsageFromResult } from '@/lib/ai/token-meter';

export async function generateBurnoutResponse(message: string): Promise<string> {
    const start = Date.now();
    const modelId = AI_MODELS.GOOGLE.PRO;

    try {
        const result = await generateText({
            model: googleProvider(modelId),
            system: `You are Tiffany, a veteran Special Education Director and Sovereign Educator. 
            You serve as a "Burnout Shield" for teachers.
            
            Your Goal:
            1. VALIDATE: Acknowledge the difficulty of the situation without toxic positivity.
            2. REFRAME: Offer a "Sovereign" perspective—remind the teacher of their power and what they can control.
            3. PROTECT: Advise them to release what isn't theirs to carry.
            4. ACTION: Suggest one small, concrete boundary or restorative act they can do right now.
            
            Tone: Unflappable, Regal, Protective, Wise, "Auntie" energy.
            Keep it concise (2-3 paragraphs max).`,
            prompt: `Teacher says: "${message}"`,
        });

        const usage = extractUsageFromResult(result);
        void recordLlmUsage({
            modelId,
            provider: 'google',
            operation: 'generateBurnoutResponse',
            route: 'services/burnout-service',
            inputTokens: usage.inputTokens,
            outputTokens: usage.outputTokens,
            totalTokens: usage.totalTokens,
            isEstimated: usage.isEstimated,
            latencyMs: Date.now() - start,
            success: true,
        });

        return result.text;
    } catch (error: any) {
        console.error("Burnout Shield Error:", error);
        void recordLlmUsage({
            modelId,
            provider: 'google',
            operation: 'generateBurnoutResponse',
            route: 'services/burnout-service',
            latencyMs: Date.now() - start,
            success: false,
            errorCode: error?.name || 'BURNOUT_RESPONSE_ERROR',
        });
        return "Protect your peace, Educator. I can't reach the server right now, but remember: You are the weather, not the storm. Take a deep breath.";
    }
}
