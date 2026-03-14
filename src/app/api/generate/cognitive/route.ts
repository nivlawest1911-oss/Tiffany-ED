import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { generateCognitiveFitnessAction } from '@/lib/gemini-service';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';


export async function POST(request: NextRequest) {
    try {
        const params = await request.json();
        const { currentState } = params;

        if (!currentState) {
            return NextResponse.json({ error: 'Current state is required' }, { status: 400 });
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

        const result = await generateCognitiveFitnessAction({
            ...params,
            protocolContext
        });

        return NextResponse.json({ content: result });
    } catch (error: any) {
        console.error('[Cognitive Fitness API] Error:', error);

        if (error.message?.includes('503') || error.message?.includes('overloaded') || error.message?.includes('exhausted')) {
            return NextResponse.json({
                content: `# [SIMULATION PROTOCOL ACTIVE]
**Note:** AI capacity is temporarily exhausted. The following is a high-fidelity mock Cognitive Protocol.

## Immediate Cognitive Reset
Perform 4-7-8 breathing technique for 2 minutes to down-regulate the nervous system.

## Core Processing Strategy
Reframe the immediate stressor as a transient event. Establish tight boundaries on email communication for the next 4 hours.

*EdIntel System Status: AWAITING_BANDWIDTH — Please retry in a moment.*`
            });
        }

        return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
    }
}
