import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { generateLessonPlanAction } from '@/lib/gemini-service';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    try {
        const params = await request.json();
        const { topic, subject, gradeLevel, includePresentation, includeProblems } = params;

        if (!topic || !subject || !gradeLevel) {
            return NextResponse.json({ error: 'Topic, subject, and grade level are required' }, { status: 400 });
        }

        const session = await getSession();
        const user = session?.user;

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Fetch user context for protocol routing
        const dbUser = await prisma.user.findUnique({
            where: { email: user.email },
            include: { schoolRelation: true }
        });

        const protocolContext = {
            state: dbUser?.schoolRelation?.state || undefined,
            district: dbUser?.schoolRelation?.districtName || undefined,
            schoolId: dbUser?.schoolId || undefined
        };

        // Token enforcement is temporarily disabled for Phase 2 implementation.
        // Users have unlimited access to Lesson Plan synthesis.

        const result = await generateLessonPlanAction({
            topic,
            subject,
            gradeLevel,
            includePresentation,
            includeProblems,
            protocolContext,
            ...params // include other options if any
        });

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
