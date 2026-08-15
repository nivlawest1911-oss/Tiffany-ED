import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { resolveUserEntitlement } from '@/lib/rbac-stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const NO_STORE = {
  'Cache-Control': 'private, no-store, max-age=0, must-revalidate',
};

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized', code: 'UNAUTHENTICATED', entitlement: resolveUserEntitlement(null) },
        { status: 401, headers: NO_STORE }
      );
    }

    const user = session.user as any;
    const entitlementInfo = resolveUserEntitlement(user.subscription_tier || user.tier);

    return NextResponse.json(
      {
        userId: user.id,
        email: user.email,
        tier: entitlementInfo.entitlement.name,
        tierId: user.tier_id || entitlementInfo.entitlement.name.toLowerCase().replace(/\s+/g, '-'),
        rank: entitlementInfo.entitlement.rank,
        tierMissing: entitlementInfo.tierMissing,
        tierWarning: entitlementInfo.tierWarning || user.tierWarning || null,
        entitlement: entitlementInfo.entitlement,
        subscriptionStatus: user.subscription_status || 'active',
        stripeCustomerId: user.stripe_customer_id || user.stripeCustomerId || null,
        isAdmin: Boolean(user.isAdmin || user.role === 'admin'),
      },
      { headers: NO_STORE }
    );
  } catch (err: any) {
    console.error('[entitlements]', err);
    return NextResponse.json(
      {
        tierId: 'sovereign-initiate',
        rank: 1,
        source: 'error',
        warning: err?.message || 'Entitlements unavailable',
        entitlement: resolveUserEntitlement(null).entitlement,
        code: 'ENTITLEMENTS_ERROR',
      },
      { status: 200, headers: NO_STORE }
    );
  }
}
