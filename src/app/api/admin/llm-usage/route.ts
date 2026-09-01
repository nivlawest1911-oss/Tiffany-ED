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
    const orgId = searchParams.get('orgId') || undefined;
    const route = searchParams.get('route') || undefined;
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');
    const quotaCheck = searchParams.get('quotaCheck') === 'true';

    const from = fromParam ? new Date(fromParam) : undefined;
    const to = toParam ? new Date(toParam) : undefined;

    // Check administrative privilege to prevent IDOR on telemetry ownership
    const isAdmin = (user as any).role === 'admin' || (user as any).role === 'director' || (user as any).position === 'Superintendent';
    const effectiveUserId = isAdmin ? (targetUserId || user.id) : user.id;
    const effectiveOrgId = isAdmin ? orgId : ((user as any).district || undefined);

    // Optional Soft Quota Check
    if (quotaCheck) {
      const quotaResult = await checkSoftQuota({
        userId: effectiveUserId,
        orgId: effectiveOrgId,
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
    if (groupBy === 'user') {
      const userData = await getUserUsageAggregates(effectiveUserId, { from, to });
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
      userId: isAdmin ? targetUserId : user.id,
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
