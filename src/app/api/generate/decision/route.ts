import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { generateDecisionAction } from '@/lib/gemini-service';
import { prisma } from '@/lib/prisma';
import { assertHumanRequest } from '@/lib/security/bot-gate';
import { withGovernanceEnvelope } from '@/lib/ai/governance-gate';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    try {
        const gate = await assertHumanRequest(request, { routeName: 'generate/decision' });
        if (!gate.allowed && gate.response) {
            return gate.response;
        }

        const params = await request.json();
        const { scenario } = params;

        if (!scenario) {
            return NextResponse.json({ error: 'Scenario is required' }, { status: 400 });
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

        const result = await generateDecisionAction({
            ...params,
            protocolContext
        });

        const enveloped = withGovernanceEnvelope(
            { content: result },
            { domain: 'fiscal_determination', isHighStakes: true }
        );

        return NextResponse.json(enveloped);
    } catch (error: any) {
        console.error('[Decision Engine API] Error:', error);

        if (error.message?.includes('503') || error.message?.includes('overloaded') || error.message?.includes('exhausted')) {
            const fallbackEnveloped = withGovernanceEnvelope({
                content: `# [SIMULATION PROTOCOL ACTIVE]
**Note:** AI capacity is temporarily exhausted. The following is a high-fidelity mock Decision Matrix.

## Executive Summary
The proposed changes impact core scheduling and budgeting constraints.

## Primary Options
1. Immediate Rollout (High Risk, Quick Win)
2. Phased Rollout (Moderate Risk, Slower Adoption)
3. Maintain Status Quo (Low Risk, Missed Opportunity)

*EdIntel System Status: AWAITING_BANDWIDTH — Please retry in a moment.*`
            }, { domain: 'fiscal_determination', isHighStakes: true });

            return NextResponse.json(fallbackEnveloped);
        }

        return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
    }
}
