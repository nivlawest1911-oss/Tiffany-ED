/**
 * Load RBAC / profile fields from Prisma User for better-auth session responses.
 * Keeps Stripe lookups off the hot path — webhook already wrote subscription_tier.
 */
import { prisma } from '@/lib/prisma';
import { normalizeTierId, type EdIntelTierId } from '@/lib/rbac-stripe';
import { tierRank } from '@/lib/blob-acl';

export type EnrichedUserFields = {
  tier: EdIntelTierId;
  tierRank: number;
  plan: string;
  subscriptionTier: string;
  subscriptionStatus: string;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  district: string | null;
  school_site: string | null;
  position: string | null;
  role: string | null;
  isAdmin: boolean;
  isTrialConverted: boolean;
  trialEndsAt: string | null;
};

const DEFAULTS: EnrichedUserFields = {
  tier: 'sovereign-initiate',
  tierRank: 0,
  plan: 'Sovereign Initiate',
  subscriptionTier: 'Sovereign Initiate',
  subscriptionStatus: 'inactive',
  stripeCustomerId: null,
  stripeSubscriptionId: null,
  district: null,
  school_site: null,
  position: null,
  role: null,
  isAdmin: false,
  isTrialConverted: false,
  trialEndsAt: null,
};

export async function loadEnrichedUserFields(
  userId: string
): Promise<EnrichedUserFields> {
  try {
    const row = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        subscription_tier: true,
        subscription_status: true,
        stripe_customer_id: true,
        stripe_subscription_id: true,
        district: true,
        school_site: true,
        position: true,
        role: true,
        is_trial_converted: true,
        trial_ends_at: true,
      },
    });

    if (!row) return { ...DEFAULTS };

    const tier = normalizeTierId(row.subscription_tier);
    const isAdmin =
      row.role === 'ADMIN' ||
      row.role === 'SUPERINTENDENT' ||
      row.role === 'EXECUTIVE';

    return {
      tier,
      tierRank: tierRank(tier),
      plan: row.subscription_tier || DEFAULTS.plan,
      subscriptionTier: row.subscription_tier || DEFAULTS.subscriptionTier,
      subscriptionStatus: row.subscription_status || DEFAULTS.subscriptionStatus,
      stripeCustomerId: row.stripe_customer_id,
      stripeSubscriptionId: row.stripe_subscription_id,
      district: row.district,
      school_site: row.school_site,
      position: row.position,
      role: row.role,
      isAdmin,
      isTrialConverted: row.is_trial_converted,
      trialEndsAt: row.trial_ends_at
        ? new Date(row.trial_ends_at).toISOString()
        : null,
    };
  } catch (err) {
    console.error('[session-enrichment]', err);
    return { ...DEFAULTS };
  }
}
