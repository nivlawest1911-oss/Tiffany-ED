import { NextResponse } from 'next/server';
import { swarmOrchestrator } from '@/lib/swarm-orchestrator';

export async function GET() {
    try {
        const metrics = swarmOrchestrator.getLiveMetrics();
        const logs = swarmOrchestrator.getLiveLogs();

        return NextResponse.json({
            metrics,
            logs,
            status: 'CONNECTED',
            timestamp: Date.now()
        });
    } catch (error: any) {
        console.error('[API/Swarm/Metrics] Error:', error);
        return NextResponse.json({
            error: 'Failed to fetch swarm metrics',
            details: error.message
        }, { status: 500 });
    }
}
