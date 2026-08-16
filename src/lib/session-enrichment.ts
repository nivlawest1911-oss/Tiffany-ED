/**
 * Load RBAC / profile fields from Prisma User for better-auth session responses.
 * Missing or unknown tier data never throws — falls back to sovereign-initiate.
 */
import { prisma } from '@/lib/prisma';
import {
  normalizeTierId,
  isKnownTierLabel,
  type EdIntelTierId,
} from '@/lib/rbac-stripe';
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
  /** True when DB had no usable tier label */
  tierMissing: boolean;
  /** True when raw label could not be mapped to a known id */
  tierUnknown: boolean;
  /** Human-readable note for UI / logs */
  tierWarning: string | null;
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
  tierMissing: true,
  tierUnknown: false,
  tierWarning: 'No subscription tier on profile — using Sovereign Initiate',
};

function safeIso(d: Date | string | null | undefined): string | null {
  if (!d) return null;
  try {
    const t = new Date(d);
    if (Number.isNaN(t.getTime())) return null;
    return t.toISOString();
  } catch {
    return null;
  }
}

export async function loadEnrichedUserFields(
  userOrId: string | Record<string, any>
): Promise<EnrichedUserFields> {
  if (!userOrId) {
    console.warn('[session-enrichment] missing userOrId');
    return {
      ...DEFAULTS,
      tierWarning: 'Missing user id — using Sovereign Initiate',
    };
  }

  let row: Record<string, any> | null = null;
  let userId: string = '';

  if (typeof userOrId === 'object' && userOrId !== null) {
    userId = userOrId.id || '';
    row = userOrId;
  } else {
    userId = userOrId;
    try {
      row = await prisma.user.findUnique({
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
    } catch (err) {
      console.error('[session-enrichment] failed to load tier', userId, err);
      return {
        ...DEFAULTS,
        tierWarning:
          'Tier lookup failed — using Sovereign Initiate (safe default)',
      };
    }
  }

  if (!row) {
    console.warn('[session-enrichment] user not found', userId);
    return {
      ...DEFAULTS,
      tierWarning: 'User profile not found — using Sovereign Initiate',
    };
  }

    const raw = (row.subscription_tier || '').trim();
    const tierMissing =
      !raw ||
      raw.toLowerCase() === 'free' ||
      raw.toLowerCase() === 'none' ||
      raw.toLowerCase() === 'null';

    const tierUnknown = !tierMissing && !isKnownTierLabel(raw);
    if (tierUnknown) {
      console.warn(
        '[session-enrichment] unknown subscription_tier label',
        { userId, raw }
      );
    }

    const tier = normalizeTierId(tierMissing ? null : raw);
    const isAdmin =
      row.role === 'ADMIN' ||
      row.role === 'SUPERINTENDENT' ||
      row.role === 'EXECUTIVE';

    let tierWarning: string | null = null;
    if (tierMissing) {
      tierWarning =
        'No subscription tier on profile — using Sovereign Initiate';
    } else if (tierUnknown) {
      tierWarning = `Unrecognized tier "${raw}" — using Sovereign Initiate`;
    }

    return {
      tier,
      tierRank: tierRank(tier),
      plan: tierMissing || tierUnknown ? DEFAULTS.plan : raw,
      subscriptionTier: tierMissing || tierUnknown ? DEFAULTS.subscriptionTier : raw,
      subscriptionStatus:
        row.subscription_status?.trim() || DEFAULTS.subscriptionStatus,
      stripeCustomerId: row.stripe_customer_id ?? null,
      stripeSubscriptionId: row.stripe_subscription_id ?? null,
      district: row.district ?? null,
      school_site: row.school_site ?? null,
      position: row.position ?? null,
      role: row.role ?? null,
      isAdmin,
      isTrialConverted: Boolean(row.is_trial_converted),
      trialEndsAt: safeIso(row.trial_ends_at),
      tierMissing,
      tierUnknown,
      tierWarning,
    };
}
