import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

export type ToneAnalysis = {
    sentiment: 'positive' | 'neutral' | 'negative' | 'critical';
    fatigueLevel: 'low' | 'moderate' | 'high' | 'severe';
    suggestion: string;
};

export async function analyzeTone(text: string, context?: string): Promise<ToneAnalysis> {
    try {
        const { text: result } = await generateText({
            model: google('gemini-1.5-pro'),
            system: `You are the Tiffany-ED Emotional Intelligence Analyzer. 
      Analyze the teacher's log for emotional tone and signs of "Decision Fatigue".
      Return a JSON object with:
      - sentiment: 'positive' | 'neutral' | 'negative' | 'critical'
      - fatigueLevel: 'low' | 'moderate' | 'high' | 'severe'
      - suggestion: A brief, restorative suggestion (max 1 sentence).`,
            prompt: `Teacher Log: "${text}"\nContext: ${context || 'General interaction'}`,
        });

        // Attempt to parse JSON from the response if it's wrapped in code blocks or purely raw
        const cleaned = result.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleaned) as ToneAnalysis;
    } catch (error) {
        console.error("Tone analysis failed:", error);
        return {
            sentiment: 'neutral',
            fatigueLevel: 'unknown' as any,
            suggestion: "Unable to analyze tone at this moment. Take a deep breath."
        };
    }
}
