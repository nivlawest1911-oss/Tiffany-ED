import { NextRequest, NextResponse } from 'next/server';
import { vigiAppService } from '@/lib/VIGIAppService';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { monitorId, metrics } = body;

    if (!monitorId || !metrics) {
      return NextResponse.json(
        { error: 'Missing monitorId or metrics payload' },
        { status: 400 }
      );
    }

    console.info(`[VIGIApp Webhook] Heartbeat received for device: ${monitorId}`);
    
    // Ingest telemetry reading
    const statusResult = await vigiAppService.ingestHeartbeat(monitorId, metrics);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      status: statusResult.status,
      alertTriggered: statusResult.alertTriggered
    });
  } catch (error: any) {
    console.error('[API VIGIApp Webhook] Ingest failed:', error);
    return NextResponse.json(
      { error: error.message || 'Telemetry heartbeat ingestion crashed' },
      { status: 500 }
    );
  }
}
