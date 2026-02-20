import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || '',
});

export type FrictionAnalysis = {
    frictionScore: number; // 0-100
    bottlenecks: string[];
    gymBreaks: GymBreakSuggestion[];
    scaffolding: {
        tier1: string;
        tier2: string;
        tier3: string;
    };
};

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
  Return a JSON object with:
  - frictionScore: 0-100 (High score = High risk of behavior issues)
  - bottlenecks: Array of specific strings from the text identified as risks.
  - gymBreaks: Array of { timing, activity, duration } for "Cognitive Gym" resets.
  - scaffolding: Object with { tier1, tier2, tier3 } strategies.
    - Tier 1: Universal design (e.g., "Visual Timer")
    - Tier 2: Targeted (e.g., "Sentence Starters")
    - Tier 3: Intensive (e.g., "Pre-completed graphic organizer")
  `;

    try {
        const { text } = await generateText({
            model: google('gemini-1.5-pro'),
            system: systemPrompt,
            prompt: `Analyze this lesson plan:\n"${lessonPlan}"`,
        });

        const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleaned) as FrictionAnalysis;

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
