import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, value, timestamp } = body;

        console.log(`[EdgeTelemetry] Received ${type} calibration: ${value}`);

        // Edge-compatible response with fast cache-control
        return NextResponse.json(
            {
                status: 'synced',
                latency_ms: Date.now() - new Date(timestamp).getTime(),
                location: 'edge-global'
            },
            {
                headers: {
                    'Cache-Control': 'no-store, must-revalidate',
                    'X-Edge-Runtime': 'true'
                }
            }
        );
    } catch (_error) {
        return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
    }
}
