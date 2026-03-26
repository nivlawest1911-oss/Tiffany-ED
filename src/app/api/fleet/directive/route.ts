import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { recordStrategicDirective } from '@/lib/legacy-ledger';

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { nodeName, directive, action, hash } = await request.json();

        if (!directive || !nodeName) {
            return NextResponse.json({ error: 'Incomplete directive data' }, { status: 400 });
        }

        await recordStrategicDirective({
            userId: session.user.id,
            title: `FLEET DIRECTIVE: ${nodeName}`,
            strategicDirective: directive,
            decisionLogic: `Manual directive broadcast via Fleet Commander. Action: ${action || 'BROADCAST'}`,
            swarmContext: {
                goal: "Regional Fleet Synchronization",
                tasks: [{ task: "Directive Broadcast", status: "completed" }],
                finalSynthesis: `Tactical directive issued to ${nodeName}. System Hash: ${hash}`
            },
            tags: ['fleet', 'tactical', 'directive', nodeName.toLowerCase()]
        });

        return NextResponse.json({ success: true, hash });
    } catch (error) {
        console.error('[Fleet Directive API] POST Error:', error);
        return NextResponse.json({ error: 'Directive logging failed' }, { status: 500 });
    }
}
