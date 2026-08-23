import { generateObject } from 'ai';
import { googleProvider, AI_MODELS } from '@/lib/ai-config';
import { FrictionAnalysisSchema } from '@/lib/ai/signatures';
import { z } from 'zod';

export type FrictionAnalysis = z.infer<typeof FrictionAnalysisSchema>;

export type GymBreakSuggestion = {
    timing: string; // e.g., "After 20 mins of direct instruction"
    activity: string; // e.g., "Stand & Sort Logic Sprint"
    duration: string; // "2 mins"
};

export async function analyzeLessonFriction(lessonPlan: string): Promise<FrictionAnalysis> {
    const systemPrompt = `You are the Tiffany-ED Fortress Architect.
  Your goal is to screen lesson plans for "Cognitive Bottlenecks" that cause Decision Fatigue and behavior issues.
  
  ANALYSIS LOGIC:
  1. Identify long periods of passive listening (>15 mins).
  2. Flag complex, multi-step directions without visual anchors.
  3. Detect abstract concepts that lack concrete bridging.
  
  OUTPUT:
  Return structured analysis with:
  - frictionScore: 0-100 (High score = High risk of behavior issues)
  - bottlenecks: Array of specific strings from the text identified as risks.
  - gymBreaks: Array of { timing, activity, duration } for "Cognitive Gym" resets.
  - scaffolding: Object with { tier1, tier2, tier3 } strategies.
    - Tier 1: Universal design (e.g., "Visual Timer")
    - Tier 2: Targeted (e.g., "Sentence Starters")
    - Tier 3: Intensive (e.g., "Pre-completed graphic organizer")
  `;

    try {
        const { object } = await generateObject({
            model: googleProvider(AI_MODELS.GOOGLE.PRO),
            schema: FrictionAnalysisSchema,
            system: systemPrompt,
            prompt: `Analyze this lesson plan:\n"${lessonPlan}"`,
        });

        return object;

    } catch (error) {
        console.error("Friction analysis failed:", error);
        return {
            frictionScore: 0,
            bottlenecks: ["Error analyzing lesson plan."],
            gymBreaks: [],
            scaffolding: { tier1: "N/A", tier2: "N/A", tier3: "N/A" }
        };
    }
}
