import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { googleProvider, AI_MODELS } from '@/lib/ai-config';
import { GymScenarioSchema } from '@/lib/ai/signatures';

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
- Memory Vault: A situation requiring the recall and application of specific compliance codes (IDEA, FERPA) to a nuanced case.`;

        const { object } = await generateObject({
            model: googleProvider(AI_MODELS.GOOGLE.FLASH),
            schema: GymScenarioSchema,
            prompt,
        });

        return NextResponse.json(object);

    } catch (error: any) {
        console.error("Gym Scenario API Error:", error);
        return NextResponse.json(
            { error: error.message || 'Failed to generate scenario' },
            { status: 500 }
        );
    }
}
