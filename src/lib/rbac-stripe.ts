/**
 * RBAC backed by Stripe subscriptions + EdIntel tier ranks.
 * Missing tier data always resolves to sovereign-initiate (never throws).
 */
import { stripe } from '@/lib/stripe';
import type { BlobPrincipal } from '@/lib/blob-acl';
import { tierRank } from '@/lib/blob-acl';
import { checkAccess, EdIntelFeature } from '@/lib/sovereign-access';

export type EdIntelTierId =
  | 'sovereign-initiate'
  | 'standard-pack'
  | 'sovereign-pack'
  | 'practitioner'
  | 'director-pack'
  | 'site-command';

export type TierRank = 'initiate' | 'sovereign-pack' | 'practitioner' | 'director-pack' | 'site-command' | 'sovereign-district';

export interface TierEntitlement {
    rank: number;
    name: string;
    maxTokens: number;
    canAccessBlobVault: boolean;
    canExportDistrict: boolean;
    canAccessMediaSynthesis: boolean;
    canAccessDirectorPack: boolean;
}

export const TIER_RANKS: Record<string, { rank: number; entitlement: TierEntitlement }> = {
    'Initiate': {
        rank: 1,
        entitlement: {
            rank: 1,
            name: 'Initiate',
            maxTokens: 50,
            canAccessBlobVault: false,
            canExportDistrict: false,
            canAccessMediaSynthesis: false,
            canAccessDirectorPack: false,
        }
    },
    'Standard Pack': {
        rank: 1,
        entitlement: {
            rank: 1,
            name: 'Standard Pack',
            maxTokens: 50,
            canAccessBlobVault: false,
            canExportDistrict: false,
            canAccessMediaSynthesis: false,
            canAccessDirectorPack: false,
        }
    },
    'Sovereign Pack': {
        rank: 2,
        entitlement: {
            rank: 2,
            name: 'Sovereign Pack',
            maxTokens: 1500,
            canAccessBlobVault: true,
            canExportDistrict: false,
            canAccessMediaSynthesis: true,
            canAccessDirectorPack: false,
        }
    },
    'Practitioner': {
        rank: 3,
        entitlement: {
            rank: 3,
            name: 'Practitioner',
            maxTokens: 3000,
            canAccessBlobVault: true,
            canExportDistrict: false,
            canAccessMediaSynthesis: true,
            canAccessDirectorPack: false,
        }
    },
    'Director Pack': {
        rank: 4,
        entitlement: {
            rank: 4,
            name: 'Director Pack',
            maxTokens: 5000,
            canAccessBlobVault: true,
            canExportDistrict: true,
            canAccessMediaSynthesis: true,
            canAccessDirectorPack: true,
        }
    },
    'Site Command': {
        rank: 5,
        entitlement: {
            rank: 5,
            name: 'Site Command',
            maxTokens: 10000,
            canAccessBlobVault: true,
            canExportDistrict: true,
            canAccessMediaSynthesis: true,
            canAccessDirectorPack: true,
        }
    }
};

export const DEFAULT_INITIATE_TIER: TierEntitlement = TIER_RANKS['Initiate'].entitlement;

export function resolveUserEntitlement(tierName?: string | null): {
    entitlement: TierEntitlement;
    tierMissing: boolean;
    tierWarning?: string;
} {
    if (!tierName) {
        return {
            entitlement: DEFAULT_INITIATE_TIER,
            tierMissing: true,
            tierWarning: 'Missing subscription tier record; downgraded to Initiate safety default.'
        };
    }

    const found = TIER_RANKS[tierName] || TIER_RANKS[tierName.trim()];
    if (!found) {
        return {
            entitlement: DEFAULT_INITIATE_TIER,
            tierMissing: true,
            tierWarning: `Unrecognized tier '${tierName}'; downgraded to Initiate safety default.`
        };
    }

    return {
        entitlement: found.entitlement,
        tierMissing: false
    };
}

const KNOWN_IDS = new Set<string>([
  'sovereign-initiate',
  'standard-pack',
  'sovereign-pack',
  'practitioner',
  'director-pack',
  'site-command',
]);

const TIER_ALIASES: Record<string, EdIntelTierId> = {
  'sovereign-initiate': 'sovereign-initiate',
  'edintel-initiate': 'sovereign-initiate',
  initiate: 'sovereign-initiate',
  free: 'sovereign-initiate',
  none: 'sovereign-initiate',
  null: 'sovereign-initiate',
  inactive: 'sovereign-initiate',
  'standard-pack': 'standard-pack',
  standard: 'standard-pack',
  'sovereign-pack': 'sovereign-pack',
  'edintel-pack': 'sovereign-pack',
  practitioner: 'practitioner',
  'director-pack': 'director-pack',
  director: 'director-pack',
  'site-command': 'site-command',
  'site-command-pack': 'site-command',
  pro: 'director-pack',
  campus: 'site-command',
  'school-site-pro': 'director-pack',
};

export function priceIdToTier(
  priceId: string | null | undefined
): EdIntelTierId | null {
  if (!priceId || typeof priceId !== 'string') return null;
  const map: Record<string, EdIntelTierId> = {
    [process.env.STRIPE_STANDARD_PRICE_ID || '']: 'standard-pack',
    [process.env.STRIPE_SOVEREIGN_PRICE_ID || '']: 'sovereign-pack',
    [process.env.STRIPE_PRACTITIONER_PRICE_ID || '']: 'practitioner',
    [process.env.STRIPE_DIRECTOR_PRICE_ID || '']: 'director-pack',
    [process.env.STRIPE_SITE_COMMAND_PRICE_ID || '']: 'site-command',
    [process.env.STRIPE_PRO_PRICE_ID || '']: 'director-pack',
    [process.env.STRIPE_CAMPUS_PRICE_ID || '']: 'site-command',
    price_school_site_pro_79: 'director-pack',
    price_campus_custom: 'site-command',
  };
  return map[priceId] || null;
}

export function isKnownTierLabel(raw?: string | null): boolean {
  if (!raw || typeof raw !== 'string') return false;
  const t = raw.toLowerCase().trim().replace(/\s+/g, '-');
  if (KNOWN_IDS.has(t)) return true;
  if (TIER_ALIASES[t]) return true;
  if (/site.?command/i.test(raw)) return true;
  if (/director/i.test(raw)) return true;
  if (/practitioner/i.test(raw)) return true;
  if (/sovereign.?pack/i.test(raw)) return true;
  if (/standard/i.test(raw)) return true;
  if (/initiate|free/i.test(raw)) return true;
  return false;
}

export function normalizeTierId(raw?: string | null): EdIntelTierId {
  try {
    if (raw == null || raw === '') return 'sovereign-initiate';
    if (typeof raw !== 'string') return 'sovereign-initiate';
    const t = raw.toLowerCase().trim().replace(/\s+/g, '-');
    if (!t) return 'sovereign-initiate';
    if (TIER_ALIASES[t]) return TIER_ALIASES[t];
    if (KNOWN_IDS.has(t)) return t as EdIntelTierId;
    if (/site.?command/i.test(raw)) return 'site-command';
    if (/director/i.test(raw)) return 'director-pack';
    if (/practitioner/i.test(raw)) return 'practitioner';
    if (/sovereign.?pack/i.test(raw)) return 'sovereign-pack';
    if (/standard/i.test(raw)) return 'standard-pack';
    console.warn('[rbac-stripe] normalizeTierId unknown label → initiate', raw);
    return 'sovereign-initiate';
  } catch {
    return 'sovereign-initiate';
  }
}

export type ResolvedEntitlement = {
  tierId: EdIntelTierId;
  rank: number;
  source: 'session' | 'stripe' | 'trial' | 'default' | 'error';
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  stripePriceId?: string | null;
  status?: string | null;
  warning?: string | null;
};

type SessionUserLike = {
  id: string;
  email?: string | null;
  tier?: string | null;
  plan?: string | null;
  stripeCustomerId?: string | null;
  stripe_customer_id?: string | null;
  subscriptionTier?: string | null;
  subscriptionStatus?: string | null;
  district?: string | null;
  school_site?: string | null;
  position?: string | null;
  role?: string | null;
  isAdmin?: boolean;
  trial_ends_at?: Date | string | null;
  trialEndsAt?: string | null;
  is_trial_converted?: boolean;
  isTrialConverted?: boolean;
  tierMissing?: boolean;
  tierUnknown?: boolean;
  tierWarning?: string | null;
};

function safeTrialEnd(
  user: SessionUserLike
): Date | null {
  const raw = user.trial_ends_at ?? user.trialEndsAt;
  if (!raw) return null;
  try {
    const d = new Date(raw);
    return Number.isNaN(d.getTime()) ? null : d;
  } catch {
    return null;
  }
}

export async function resolveUserTier(
  user: SessionUserLike | null | undefined
): Promise<ResolvedEntitlement> {
  try {
    if (!user?.id) {
      return {
        tierId: 'sovereign-initiate',
        rank: 0,
        source: 'default',
        warning: 'No user — default tier',
      };
    }

    const enrichmentWarning =
      user.tierWarning ||
      (user.tierMissing
        ? 'Session missing tier — evaluating fallbacks'
        : user.tierUnknown
          ? 'Session tier label unknown — evaluating fallbacks'
          : null);

    const sessionTier = normalizeTierId(
      user.tier || user.plan || user.subscriptionTier || null
    );
    if (sessionTier !== 'sovereign-initiate') {
      return {
        tierId: sessionTier,
        rank: tierRank(sessionTier),
        source: 'session',
        stripeCustomerId: user.stripeCustomerId || user.stripe_customer_id,
        warning: enrichmentWarning,
      };
    }

    const trialEnd = safeTrialEnd(user);
    const converted =
      user.is_trial_converted === true || user.isTrialConverted === true;
    if (trialEnd && !converted && trialEnd.getTime() > Date.now()) {
      return {
        tierId: 'standard-pack',
        rank: tierRank('standard-pack'),
        source: 'trial',
        stripeCustomerId: user.stripeCustomerId || user.stripe_customer_id,
        warning: enrichmentWarning,
      };
    }

    const customerId = user.stripeCustomerId || user.stripe_customer_id;
    if (customerId && process.env.STRIPE_SECRET_KEY) {
      try {
        const subs = await stripe.subscriptions.list({
          customer: customerId,
          status: 'all',
          limit: 5,
          expand: ['data.items.data.price'],
        });

        const active = subs.data.find((s) =>
          ['active', 'trialing'].includes(s.status)
        );
        if (active) {
          const priceId = active.items.data[0]?.price?.id;
          const fromPrice = priceIdToTier(priceId);
          if (!fromPrice && priceId) {
            console.warn(
              '[rbac-stripe] unmapped Stripe price id',
              priceId,
              'customer',
              customerId
            );
          }
          const metaTier = normalizeTierId(
            (active.metadata?.tierId as string) ||
              (active.metadata?.tier as string) ||
              null
          );
          const tierId =
            fromPrice ||
            (metaTier !== 'sovereign-initiate' ? metaTier : 'director-pack');
          return {
            tierId,
            rank: tierRank(tierId),
            source: 'stripe',
            stripeCustomerId: customerId,
            stripeSubscriptionId: active.id,
            stripePriceId: priceId,
            status: active.status,
            warning: fromPrice
              ? enrichmentWarning
              : `Unmapped price ${priceId || 'n/a'} — inferred ${tierId}`,
          };
        }
      } catch (err) {
        console.error('[rbac-stripe] subscription lookup failed', err);
        return {
          tierId: 'sovereign-initiate',
          rank: 0,
          source: 'error',
          stripeCustomerId: customerId,
          warning:
            'Stripe subscription lookup failed — using Sovereign Initiate',
        };
      }
    }

    return {
      tierId: 'sovereign-initiate',
      rank: 0,
      source: 'default',
      stripeCustomerId: customerId,
      warning:
        enrichmentWarning ||
        'No paid tier or active trial — using Sovereign Initiate',
    };
  } catch (err) {
    console.error('[rbac-stripe] resolveUserTier fatal', err);
    return {
      tierId: 'sovereign-initiate',
      rank: 0,
      source: 'error',
      warning: 'Tier resolution error — using Sovereign Initiate',
    };
  }
}

export async function buildBlobPrincipal(
  user: SessionUserLike | null | undefined
): Promise<BlobPrincipal | null> {
  try {
    if (!user?.id) return null;
    const ent = await resolveUserTier(user);
    if (ent.warning) {
      console.warn('[rbac-stripe] principal warning', user.id, ent.warning);
    }
    const role = (user.role || '').toString().toLowerCase();
    return {
      userId: user.id,
      email: user.email,
      tier: ent.tierId,
      district: user.district,
      schoolSite: user.school_site,
      position: user.position,
      isAdmin:
        user.isAdmin === true ||
        role === 'admin' ||
        role === 'superintendent' ||
        role === 'executive',
    };
  } catch (err) {
    console.error('[rbac-stripe] buildBlobPrincipal', err);
    if (!user?.id) return null;
    return {
      userId: user.id,
      email: user.email,
      tier: 'sovereign-initiate',
      district: user.district,
      schoolSite: user.school_site,
      position: user.position,
      isAdmin: false,
    };
  }
}

export async function hasMinTier(
  user: SessionUserLike | null | undefined,
  minTierId: EdIntelTierId
): Promise<boolean> {
  try {
    const ent = await resolveUserTier(user);
    if (user?.isAdmin || (user?.role || '').toLowerCase() === 'admin') {
      return true;
    }
    return ent.rank >= tierRank(minTierId);
  } catch {
    return false;
  }
}

export async function requireFeature(
  user: SessionUserLike | null | undefined,
  feature: EdIntelFeature
): Promise<boolean> {
  try {
    const ent = await resolveUserTier(user);
    if (user?.isAdmin || (user?.role || '').toLowerCase() === 'admin') {
      return true;
    }
    return checkAccess(ent.tierId, feature);
  } catch {
    return false;
  }
}

export function checkoutTierMetadata(userId: string, tierId: EdIntelTierId) {
  return {
    userId,
    tierId,
    source: 'EdIntel RBAC',
  };
}
