import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { generateDecisionAction } from '@/lib/gemini-service';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    try {
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
            include: { schoolRelation: true }
        });

        const protocolContext = {
            state: dbUser?.schoolRelation?.state || undefined,
            district: dbUser?.schoolRelation?.districtName || undefined,
            schoolId: dbUser?.schoolId || undefined
        };

        // Token enforcement is temporarily disabled for Phase 2 implementation.

        const result = await generateDecisionAction({
            ...params,
            protocolContext
        });

        return NextResponse.json({ content: result });
    } catch (error: any) {
        console.error('[Decision Engine API] Error:', error);

        if (error.message?.includes('503') || error.message?.includes('overloaded') || error.message?.includes('exhausted')) {
            return NextResponse.json({
                content: `# [SIMULATION PROTOCOL ACTIVE]
**Note:** AI capacity is temporarily exhausted. The following is a high-fidelity mock Decision Matrix.

## Executive Summary
The proposed changes impact core scheduling and budgeting constraints.

## Primary Options
1. Immediate Rollout (High Risk, Quick Win)
2. Phased Rollout (Moderate Risk, Slower Adoption)
3. Maintain Status Quo (Low Risk, Missed Opportunity)

*EdIntel System Status: AWAITING_BANDWIDTH â€” Please retry in a moment.*`
            });
        }

        return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
    }
}
