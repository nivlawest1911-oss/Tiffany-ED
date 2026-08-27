import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { getLlmUsageAggregates } from '@/lib/ai/token-meter';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/llm-usage
 * 
 * Secure telemetry endpoint for per-model LLM token consumption and latency metrics.
 * Returns aggregated statistics only — zero prompts, transcripts, or student PII.
 */
export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    const user = session?.user;

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized: Authentication required.' },
        { status: 401, headers: { 'Cache-Control': 'private, no-store' } }
      );
    }

    const { searchParams } = new URL(req.url);
    const modelId = searchParams.get('modelId') || undefined;
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');

    const from = fromParam ? new Date(fromParam) : undefined;
    const to = toParam ? new Date(toParam) : undefined;

    const aggregates = await getLlmUsageAggregates({
      from,
      to,
      modelId,
    });

    return NextResponse.json(
      {
        success: true,
        data: aggregates,
        generatedAt: new Date().toISOString(),
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'private, no-store, must-revalidate',
        },
      }
    );
  } catch (error: any) {
    console.error('[API /admin/llm-usage Error]', error);
    return NextResponse.json(
      { error: 'Failed to retrieve telemetry aggregates' },
      { status: 500, headers: { 'Cache-Control': 'private, no-store' } }
    );
  }
}
