/**
 * Apply Stripe subscription lifecycle to Prisma User for RBAC.
 * Used by /api/webhooks/stripe.
 */
import type Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { priceIdToTier, normalizeTierId, type EdIntelTierId } from '@/lib/rbac-stripe';

const TOKEN_GRANT: Record<EdIntelTierId, number> = {
  'sovereign-initiate': 50,
  'standard-pack': 500,
  'sovereign-pack': 1500,
  practitioner: 3000,
  'director-pack': 5000,
  'site-command': 10000,
};

/** Display name stored on subscription_tier (human-readable) */
export function tierIdToDisplayName(tierId: EdIntelTierId): string {
  const names: Record<EdIntelTierId, string> = {
    'sovereign-initiate': 'Sovereign Initiate',
    'standard-pack': 'Standard Pack',
    'sovereign-pack': 'Sovereign Pack',
    practitioner: 'Practitioner',
    'director-pack': 'Director Pack',
    'site-command': 'Site Command',
  };
  return names[tierId];
}

export function resolveTierFromSubscription(
  sub: Stripe.Subscription
): EdIntelTierId {
  const priceId = sub.items?.data?.[0]?.price?.id;
  const fromPrice = priceIdToTier(priceId);
  if (fromPrice) return fromPrice;

  const meta =
    (sub.metadata?.tierId as string) ||
    (sub.metadata?.tier as string) ||
    (sub.metadata?.tierName as string);
  if (meta) return normalizeTierId(meta);

  // Paid sub without mapped price → director-pack floor
  if (['active', 'trialing'].includes(sub.status)) return 'director-pack';
  return 'sovereign-initiate';
}

async function findUserId(opts: {
  userId?: string | null;
  email?: string | null;
  customerId?: string | null;
}): Promise<string | null> {
  if (opts.userId) {
    const byId = await prisma.user.findUnique({ where: { id: opts.userId } });
    if (byId) return byId.id;
  }
  if (opts.customerId) {
    const byCust = await prisma.user.findFirst({
      where: { stripe_customer_id: opts.customerId },
    });
    if (byCust) return byCust.id;
  }
  if (opts.email) {
    const byEmail = await prisma.user.findUnique({
      where: { email: opts.email },
    });
    if (byEmail) return byEmail.id;
  }
  return null;
}

export type SyncResult = {
  userId: string | null;
  tierId: EdIntelTierId;
  action: string;
};

/**
 * Upsert User.subscription_* and optional subscriptions row from a Stripe Subscription.
 */
export async function syncSubscriptionToUser(
  sub: Stripe.Subscription,
  opts?: { email?: string | null; grantTokens?: boolean }
): Promise<SyncResult> {
  const customerId =
    typeof sub.customer === 'string' ? sub.customer : sub.customer?.id;
  const userIdMeta = sub.metadata?.userId || null;

  const userId = await findUserId({
    userId: userIdMeta,
    email: opts?.email,
    customerId,
  });

  const tierId = resolveTierFromSubscription(sub);
  const display = tierIdToDisplayName(tierId);
  const active = ['active', 'trialing'].includes(sub.status);
  const priceId = sub.items?.data?.[0]?.price?.id || '';

  if (!userId) {
    console.warn('[stripe-sync] No user for subscription', sub.id, customerId);
    return { userId: null, tierId, action: 'skipped_no_user' };
  }

  const periodStart = (sub as any).current_period_start
    ? new Date((sub as any).current_period_start * 1000)
    : new Date();
  const periodEnd = (sub as any).current_period_end
    ? new Date((sub as any).current_period_end * 1000)
    : new Date();

  const updateData: Record<string, unknown> = {
    stripe_customer_id: customerId || undefined,
    stripe_subscription_id: sub.id,
    subscription_status: sub.status,
    updated_at: new Date(),
  };

  if (active) {
    updateData.subscription_tier = display;
    updateData.is_active = true;
    if (sub.status === 'trialing') {
      updateData.is_trial_converted = false;
      if ((sub as any).trial_end) {
        updateData.trial_ends_at = new Date((sub as any).trial_end * 1000);
      }
    } else if (sub.status === 'active') {
      updateData.is_trial_converted = true;
    }
    if (opts?.grantTokens) {
      updateData.usage_tokens = { increment: TOKEN_GRANT[tierId] };
    }
  } else if (['canceled', 'unpaid', 'incomplete_expired'].includes(sub.status)) {
    updateData.subscription_tier = tierIdToDisplayName('sovereign-initiate');
    updateData.subscription_status = sub.status;
  }

  await prisma.user.update({
    where: { id: userId },
    data: updateData as any,
  });

  // Mirror into subscriptions table when possible
  try {
    await prisma.subscriptions.upsert({
      where: { stripe_subscription_id: sub.id },
      create: {
        id: `sub_${sub.id}`,
        user_id: userId,
        stripe_subscription_id: sub.id,
        stripe_price_id: priceId || 'unknown',
        status: sub.status,
        current_period_start: periodStart,
        current_period_end: periodEnd,
        cancel_at_period_end: !!(sub as any).cancel_at_period_end,
        trial_ends_at: (sub as any).trial_end
          ? new Date((sub as any).trial_end * 1000)
          : null,
        updated_at: new Date(),
      },
      update: {
        status: sub.status,
        stripe_price_id: priceId || undefined,
        current_period_start: periodStart,
        current_period_end: periodEnd,
        cancel_at_period_end: !!(sub as any).cancel_at_period_end,
        updated_at: new Date(),
      },
    });
  } catch (e) {
    console.warn('[stripe-sync] subscriptions table upsert skipped', e);
  }

  // Resolve tiers table FK if name matches
  try {
    const tierRow = await prisma.tiers.findUnique({ where: { name: display } });
    if (tierRow) {
      await prisma.user.update({
        where: { id: userId },
        data: { tier_id: tierRow.id },
      });
    }
  } catch {
    /* optional */
  }

  return { userId, tierId, action: active ? 'activated' : 'deactivated' };
}

/** checkout.session.completed — link customer + initial tier */
export async function syncCheckoutSession(
  session: Stripe.Checkout.Session
): Promise<SyncResult> {
  const userId =
    session.metadata?.userId ||
    session.client_reference_id ||
    null;
  const email = session.customer_details?.email || session.customer_email;
  const customerId =
    typeof session.customer === 'string'
      ? session.customer
      : session.customer?.id;

  const tierFromMeta = normalizeTierId(
    session.metadata?.tierId ||
      session.metadata?.tier ||
      session.metadata?.tierName ||
      null
  );

  const resolvedUserId = await findUserId({
    userId,
    email,
    customerId,
  });

  if (!resolvedUserId) {
    return { userId: null, tierId: tierFromMeta, action: 'skipped_no_user' };
  }

  if (customerId) {
    await prisma.user.update({
      where: { id: resolvedUserId },
      data: {
        stripe_customer_id: customerId,
        updated_at: new Date(),
      },
    });
  }

  // Subscription mode: full sync happens on customer.subscription.* events;
  // still stamp tier from metadata for immediate RBAC.
  if (session.mode === 'subscription' || session.subscription) {
    const display = tierIdToDisplayName(tierFromMeta);
    await prisma.user.update({
      where: { id: resolvedUserId },
      data: {
        subscription_tier: display,
        subscription_status: 'trialing',
        is_active: true,
        usage_tokens: { increment: TOKEN_GRANT[tierFromMeta] },
        updated_at: new Date(),
      } as any,
    });
    return {
      userId: resolvedUserId,
      tierId: tierFromMeta,
      action: 'checkout_stamped',
    };
  }

  // One-time token top-up — no tier change
  if (session.mode === 'payment' && session.metadata?.type === 'token_topup') {
    return {
      userId: resolvedUserId,
      tierId: tierFromMeta,
      action: 'token_topup_only',
    };
  }

  return {
    userId: resolvedUserId,
    tierId: tierFromMeta,
    action: 'checkout_customer_linked',
  };
}
