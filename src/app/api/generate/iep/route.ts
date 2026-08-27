import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { generateIEPAction } from '@/lib/gemini-service';
import { prisma } from '@/lib/prisma';
import { assertHumanRequest } from '@/lib/security/ironshield-gate';
import { withGovernanceEnvelope } from '@/lib/ai/governance-gate';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    try {
        const gate = await assertHumanRequest(request, { routeName: 'generate/iep' });
        if (!gate.allowed && gate.response) {
            return gate.response;
        }

        const params = await request.json();
        const { studentNeeds, gradeLevel } = params;

        if (!studentNeeds || !gradeLevel) {
            return NextResponse.json({ error: 'Student needs and grade level are required' }, { status: 400 });
        }

        const session = await getSession();
        const user = session?.user;

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Fetch user context for protocol routing
        const dbUser = await prisma.user.findUnique({
            where: { email: user.email },
            include: { schools_users_school_idToschools: true }
        });

        const protocolContext = {
            state: dbUser?.schools_users_school_idToschools?.state || undefined,
            district: dbUser?.schools_users_school_idToschools?.district_name || undefined,
            schoolId: dbUser?.school_id || undefined
        };

        // Token enforcement is temporarily disabled for Phase 2 implementation.

        const result = await generateIEPAction({
            ...params,
            protocolContext
        });

        const envelopedResult = withGovernanceEnvelope(
            { content: result },
            { domain: 'iep', isHighStakes: true }
        );

        return NextResponse.json(envelopedResult);
    } catch (error: any) {
        console.error('[IEP Generator API] Error:', error);

        if (error.message?.includes('503') || error.message?.includes('overloaded') || error.message?.includes('exhausted')) {
            const fallbackEnvelope = withGovernanceEnvelope({
                content: `# [SIMULATION PROTOCOL ACTIVE]
**Note:** AI capacity is temporarily exhausted. The following is a high-fidelity mock IEP draft.

## Present Levels of Performance
Student demonstrates strengths in visual learning but requires support with auditory processing.

## Measurable Annual Goals
By the end of the term, the student will improve reading comprehension by 20% using structured scaffolds.

*EdIntel System Status: AWAITING_BANDWIDTH — Please retry in a moment.*`
            }, { domain: 'iep', isHighStakes: true });

            return NextResponse.json(fallbackEnvelope);
        }

        return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
    }
}
