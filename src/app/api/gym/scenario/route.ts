import { NextResponse } from 'next/server';
import { generateObject } from 'ai';
import { googleProvider, AI_MODELS } from '@/lib/ai-config';
import { GymScenarioSchema } from '@/lib/ai/signatures';
import { assertHumanRequest } from '@/lib/security/bot-gate';
import { recordLlmUsage, extractUsageFromResult } from '@/lib/ai/token-meter';

export const runtime = 'nodejs';

export async function GET(req: Request) {
    const startTime = Date.now();
    const modelId = AI_MODELS.GOOGLE.FLASH;

    try {
        const gate = await assertHumanRequest(req, { routeName: 'gym/scenario' });
        if (!gate.allowed && gate.response) {
            return gate.response;
        }

        const { searchParams } = new URL(req.url);
        const zone = searchParams.get('zone') || 'General';

        const prompt = `Generate a high-stakes, realistic cognitive and strategic scenario for a school principal or district administrator.
The scenario should be related to the zone: ${zone}.

Examples:
- Focus Crucible: A situation requiring intense prioritization amidst chaos (e.g., multiple concurrent crises).
- Logic Lab: A complex scheduling, budget, or policy conflict requiring a procedural or algorithmic solution.
- Resilience Zone: A scenario testing emotional endurance dealing with hostile stakeholders or a severe public relations issue.
- Memory Vault: A situation requiring the recall and application of specific compliance codes (IDEA, FERPA) to a nuanced case.`;

        const result = await generateObject({
            model: googleProvider(modelId),
            schema: GymScenarioSchema,
            prompt,
        });

        const usage = extractUsageFromResult(result);
        void recordLlmUsage({
            modelId,
            provider: 'google',
            operation: 'generateGymScenario',
            route: 'gym/scenario',
            inputTokens: usage.inputTokens,
            outputTokens: usage.outputTokens,
            totalTokens: usage.totalTokens,
            isEstimated: usage.isEstimated,
            latencyMs: Date.now() - startTime,
            success: true,
            metadata: { zone },
        });

        return NextResponse.json(result.object);

    } catch (error: any) {
        console.error("Gym Scenario API Error:", error);
        void recordLlmUsage({
            modelId,
            provider: 'google',
            operation: 'generateGymScenario',
            route: 'gym/scenario',
            latencyMs: Date.now() - startTime,
            success: false,
            errorCode: error?.name || 'GYM_SCENARIO_ERROR',
        });

        return NextResponse.json(
            { error: error.message || 'Failed to generate scenario' },
            { status: 500 }
        );
    }
}
