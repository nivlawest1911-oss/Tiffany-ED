import { NextRequest, NextResponse } from 'next/server';
import { swarmOrchestrator } from '@/lib/swarm-orchestrator';

export async function POST(req: NextRequest) {
    try {
        const { scenario } = await req.json();

        if (!scenario) {
            return NextResponse.json({ error: 'Scenario is required' }, { status: 400 });
        }

        console.log(`[API/Simulate] Initializing Swarm for scenario: ${scenario}`);

        const result = await swarmOrchestrator.simulate(scenario);

        return NextResponse.json({ result });
    } catch (error: any) {
        console.error('[API/Simulate] Execution Error:', error);
        return NextResponse.json({
            error: 'Simulation failed',
            details: error.message
        }, { status: 500 });
    }
}
