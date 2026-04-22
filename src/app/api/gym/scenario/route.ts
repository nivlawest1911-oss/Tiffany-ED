import { NextResponse } from 'next/server';
import { generateSovereignResponse } from '@/lib/gemini-service';

export const runtime = 'edge';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const zone = searchParams.get('zone') || 'General';

        const prompt = `Generate a high-stakes, realistic cognitive and strategic scenario for a school principal or district administrator.
The scenario should be related to the zone: ${zone}.

Examples:
- Focus Crucible: A situation requiring intense prioritization amidst chaos (e.g., multiple concurrent crises).
- Logic Lab: A complex scheduling, budget, or policy conflict requiring a procedural or algorithmic solution.
- Resilience Zone: A scenario testing emotional endurance dealing with hostile stakeholders or a severe public relations issue.
- Memory Vault: A situation requiring the recall and application of specific compliance codes (IDEA, FERPA) to a nuanced case.

Format the output EXACTLY in JSON like this (do not include markdown codeblocks, just raw JSON text):
{
  "scenario": "Detailed description of the situation (3-4 sentences).",
  "challenge": "What is the core cognitive or strategic challenge?",
  "options": [
    "Option A: Plausible but suboptimal strategy.",
    "Option B: The optimal, sovereign strategy.",
    "Option C: A reactive, poor strategy."
  ],
  "correctOptionIndex": 1,
  "explanation": "Why the correct option is the best and what cognitive principle it demonstrates."
}`;

        // Instead of calling generateSovereignResponse, let's use the raw stream or generate logic
        // For simplicity and considering we disabled tokens, we can use the direct generateSovereignResponse
        const responseData = await generateSovereignResponse(prompt, 'gemini-1.5-flash');

        let jsonResponse;
        try {
            const cleanText = responseData.text.replace(/```json/g, '').replace(/```/g, '').trim();
            jsonResponse = JSON.parse(cleanText);
        } catch (e) {
            console.error("Failed to parse JSON from AI response:", responseData.text);
            return NextResponse.json({ error: "Failed to parse scenario generation." }, { status: 500 });
        }

        return NextResponse.json(jsonResponse);

    } catch (error: any) {
        console.error("Gym Scenario API Error:", error);
        return NextResponse.json(
            { error: error.message || 'Failed to generate scenario' },
            { status: 500 }
        );
    }
}
