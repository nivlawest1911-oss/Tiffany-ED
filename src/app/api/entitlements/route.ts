import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { resolveUserTier, requireFeature } from '@/lib/rbac-stripe';
import { EdIntelFeature } from '@/lib/sovereign-access';

export const runtime = 'nodejs';

/**
 * GET /api/entitlements
 * Single source for dashboard paywalls / feature gates.
 */
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHENTICATED' },
        { status: 401 }
      );
    }

    const user = session.user as any;
    const ent = await resolveUserTier(user);

    const features: Record<string, boolean> = {};
    for (const key of Object.values(EdIntelFeature)) {
      features[key] = await requireFeature(user, key as EdIntelFeature);
    }

    return NextResponse.json({
      tierId: ent.tierId,
      rank: ent.rank,
      source: ent.source,
      warning: ent.warning || user.tierWarning || null,
      tierMissing: Boolean(user.tierMissing),
      tierUnknown: Boolean(user.tierUnknown),
      subscriptionStatus: user.subscriptionStatus || ent.status || null,
      stripeCustomerId: ent.stripeCustomerId || user.stripeCustomerId || null,
      features,
      isAdmin: Boolean(user.isAdmin),
    });
  } catch (err: any) {
    console.error('[entitlements]', err);
    return NextResponse.json(
      {
        tierId: 'sovereign-initiate',
        rank: 0,
        source: 'error',
        warning: err?.message || 'Entitlements unavailable',
        features: {},
        code: 'ENTITLEMENTS_ERROR',
      },
      { status: 200 }
    );
  }
}
