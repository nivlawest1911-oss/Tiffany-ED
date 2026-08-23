import { generateObject } from 'ai';
import { googleProvider, AI_MODELS } from '@/lib/ai-config';
import { ToneAnalysisSchema } from '@/lib/ai/signatures';
import { z } from 'zod';

export type ToneAnalysis = z.infer<typeof ToneAnalysisSchema>;

export async function analyzeTone(text: string, context?: string): Promise<ToneAnalysis> {
    try {
        const { object } = await generateObject({
            model: googleProvider(AI_MODELS.GOOGLE.PRO),
            schema: ToneAnalysisSchema,
            system: `You are the Tiffany-ED Emotional Intelligence Analyzer. 
      Analyze the teacher's log for emotional tone and signs of "Decision Fatigue".
      Return a structured evaluation with:
      - sentiment: 'positive' | 'neutral' | 'negative' | 'critical'
      - fatigueLevel: 'low' | 'moderate' | 'high' | 'severe'
      - suggestion: A brief, restorative suggestion (max 1 sentence).`,
            prompt: `Teacher Log: "${text}"\nContext: ${context || 'General interaction'}`,
        });

        return object;
    } catch (error) {
        console.error("Tone analysis failed:", error);
        return {
            sentiment: 'neutral',
            fatigueLevel: 'moderate',
            suggestion: "Unable to analyze tone at this moment. Take a deep breath."
        };
    }
}
