import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { 
  getLlmUsageAggregates, 
  getUserUsageAggregates, 
  getRouteUsageAggregates, 
  checkSoftQuota 
} from '@/lib/ai/token-meter';

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
    const groupBy = searchParams.get('groupBy') || 'model';
    const modelId = searchParams.get('modelId') || undefined;
    const targetUserId = searchParams.get('userId') || undefined;
    const route = searchParams.get('route') || undefined;
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');
    const quotaCheck = searchParams.get('quotaCheck') === 'true';

    const from = fromParam ? new Date(fromParam) : undefined;
    const to = toParam ? new Date(toParam) : undefined;

    // Optional Soft Quota Check
    if (quotaCheck) {
      const quotaResult = await checkSoftQuota({
        userId: targetUserId || user.id,
      });
      return NextResponse.json({
        success: true,
        quota: quotaResult,
        generatedAt: new Date().toISOString(),
      }, {
        status: 200,
        headers: { 'Cache-Control': 'private, no-store, must-revalidate' },
      });
    }

    // Group By Route / Feature
    if (groupBy === 'route') {
      const routeData = await getRouteUsageAggregates({ from, to });
      return NextResponse.json({
        success: true,
        groupBy: 'route',
        data: routeData,
        generatedAt: new Date().toISOString(),
      }, {
        status: 200,
        headers: { 'Cache-Control': 'private, no-store, must-revalidate' },
      });
    }

    // Group By User
    if (groupBy === 'user' && (targetUserId || user.id)) {
      const userData = await getUserUsageAggregates(targetUserId || user.id, { from, to });
      return NextResponse.json({
        success: true,
        groupBy: 'user',
        data: userData,
        generatedAt: new Date().toISOString(),
      }, {
        status: 200,
        headers: { 'Cache-Control': 'private, no-store, must-revalidate' },
      });
    }

    // Default: Group By Model & Provider
    const aggregates = await getLlmUsageAggregates({
      from,
      to,
      modelId,
      userId: targetUserId,
      route,
    });

    return NextResponse.json(
      {
        success: true,
        groupBy: 'model',
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
