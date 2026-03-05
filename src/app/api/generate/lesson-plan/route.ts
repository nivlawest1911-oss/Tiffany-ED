import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { TokenService } from '@/lib/services/token-service';
import { generateLessonPlanAction } from '@/lib/gemini-service';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    try {
        const params = await request.json();
        const { topic, subject, gradeLevel } = params;

        if (!topic || !subject || !gradeLevel) {
            return NextResponse.json({ error: 'Topic, subject, and grade level are required' }, { status: 400 });
        }

        const session = await getSession();
        const user = session?.user;

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Deduct tokens (Lesson plans are high-value, cost 100)
        const tokenCost = 100;
        const hasFunds = await TokenService.deductTokens(user.id, tokenCost, {
            transactionType: 'GENERATION',
            description: `Lesson Plan: ${topic}`
        }, user.tier);

        if (!hasFunds) {
            return NextResponse.json(
                {
                    error: 'Insufficient Tokens',
                    message: 'Strategic reserves insufficient for high-fidelity lesson synthesis.'
                },
                { status: 402 }
            );
        }

        const result = await generateLessonPlanAction(params);

        return NextResponse.json({ content: result });
    } catch (error: any) {
        console.error('[Lesson Plan API] Error:', error);

        if (error.message?.includes('503') || error.message?.includes('overloaded') || error.message?.includes('exhausted')) {
            return NextResponse.json({
                content: `# [SIMULATION PROTOCOL ACTIVE]
**Note:** AI capacity is temporarily exhausted. The following is a high-fidelity mock lesson plan.

## Operational Objective
Students will engage in collaborative inquiry to master the requested topic.

## Strategic Materials
- Chromebooks / Tablets
- Student notebooks

## Direct Instruction
1. **Activate Prior Knowledge** (10 min): Pose an essential question to spark discussion.
2. **Input / Modeling** (20 min): Present core concept with visual aids.

## Guided Practice
Small group activities aligned with tiered scaffolds.

## Independent Practice
Student-led project or formative assessment.

*EdIntel System Status: AWAITING_BANDWIDTH — Please retry in a moment.*`
            });
        }

        return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
    }
}
