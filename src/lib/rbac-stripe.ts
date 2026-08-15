/**
 * RBAC backed by Stripe subscriptions + EdIntel tier ranks.
 * Price IDs come from env; metadata.userId links Checkout to better-auth users.
 */
import { stripe } from '@/lib/stripe';
import type { BlobPrincipal } from '@/lib/blob-acl';
import { tierRank } from '@/lib/blob-acl';
import { checkAccess, EdIntelFeature } from '@/lib/sovereign-access';

/** Canonical tier ids (must match blob-acl + pricing-config) */
export type EdIntelTierId =
  | 'sovereign-initiate'
  | 'standard-pack'
  | 'sovereign-pack'
  | 'practitioner'
  | 'director-pack'
  | 'site-command';

/**
 * Stripe Price ID → tier id.
 * Set these in Vercel env to match Dashboard products.
 */
export function priceIdToTier(priceId: string | null | undefined): EdIntelTierId | null {
  if (!priceId) return null;
  const map: Record<string, EdIntelTierId> = {
    [process.env.STRIPE_STANDARD_PRICE_ID || '']: 'standard-pack',
    [process.env.STRIPE_SOVEREIGN_PRICE_ID || '']: 'sovereign-pack',
    [process.env.STRIPE_PRACTITIONER_PRICE_ID || '']: 'practitioner',
    [process.env.STRIPE_DIRECTOR_PRICE_ID || '']: 'director-pack',
    [process.env.STRIPE_SITE_COMMAND_PRICE_ID || '']: 'site-command',
    // Legacy aliases from stripe.ts
    [process.env.STRIPE_PRO_PRICE_ID || '']: 'director-pack',
    [process.env.STRIPE_CAMPUS_PRICE_ID || '']: 'site-command',
    price_school_site_pro_79: 'director-pack',
    price_campus_custom: 'site-command',
  };
  // Drop empty keys from unset env
  const hit = map[priceId];
  return hit || null;
}

export function normalizeTierId(raw?: string | null): EdIntelTierId {
  if (!raw) return 'sovereign-initiate';
  const t = raw.toLowerCase().replace(/\s+/g, '-');
  const aliases: Record<string, EdIntelTierId> = {
    'sovereign-initiate': 'sovereign-initiate',
    'edintel-initiate': 'sovereign-initiate',
    initiate: 'sovereign-initiate',
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
  };
  return aliases[t] || 'sovereign-initiate';
}

export type ResolvedEntitlement = {
  tierId: EdIntelTierId;
  rank: number;
  source: 'session' | 'stripe' | 'trial' | 'default';
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  stripePriceId?: string | null;
  status?: string | null;
};

type SessionUserLike = {
  id: string;
  email?: string | null;
  tier?: string | null;
  plan?: string | null;
  stripeCustomerId?: string | null;
  stripe_customer_id?: string | null;
  subscriptionTier?: string | null;
  district?: string | null;
  school_site?: string | null;
  position?: string | null;
  role?: string | null;
  isAdmin?: boolean;
  trial_ends_at?: Date | string | null;
  is_trial_converted?: boolean;
};

/**
 * Resolve effective tier: session fields first, then live Stripe subscription.
 * Safe to call on every request; Stripe is only hit when customer id is present
 * and session does not already carry a paid tier.
 */
export async function resolveUserTier(
  user: SessionUserLike | null | undefined
): Promise<ResolvedEntitlement> {
  if (!user?.id) {
    return { tierId: 'sovereign-initiate', rank: 0, source: 'default' };
  }

  // 1) Explicit session / DB tier
  const sessionTier = normalizeTierId(
    user.tier || user.plan || user.subscriptionTier || null
  );
  if (sessionTier !== 'sovereign-initiate') {
    return {
      tierId: sessionTier,
      rank: tierRank(sessionTier),
      source: 'session',
      stripeCustomerId: user.stripeCustomerId || user.stripe_customer_id,
    };
  }

  // 2) Active trial without conversion → treat as standard-pack floor
  if (user.trial_ends_at && !user.is_trial_converted) {
    const end = new Date(user.trial_ends_at);
    if (end.getTime() > Date.now()) {
      return {
        tierId: 'standard-pack',
        rank: tierRank('standard-pack'),
        source: 'trial',
        stripeCustomerId: user.stripeCustomerId || user.stripe_customer_id,
      };
    }
  }

  // 3) Stripe live lookup
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
        const metaTier = normalizeTierId(
          (active.metadata?.tierId as string) ||
            (active.metadata?.tier as string) ||
            null
        );
        const tierId = fromPrice || (metaTier !== 'sovereign-initiate' ? metaTier : 'director-pack');
        return {
          tierId,
          rank: tierRank(tierId),
          source: 'stripe',
          stripeCustomerId: customerId,
          stripeSubscriptionId: active.id,
          stripePriceId: priceId,
          status: active.status,
        };
      }
    } catch (err) {
      console.error('[rbac-stripe] subscription lookup failed', err);
    }
  }

  return {
    tierId: 'sovereign-initiate',
    rank: 0,
    source: 'default',
    stripeCustomerId: customerId,
  };
}

/** Build BlobPrincipal with Stripe-resolved tier */
export async function buildBlobPrincipal(
  user: SessionUserLike | null | undefined
): Promise<BlobPrincipal | null> {
  if (!user?.id) return null;
  const ent = await resolveUserTier(user);
  return {
    userId: user.id,
    email: user.email,
    tier: ent.tierId,
    district: user.district,
    schoolSite: user.school_site,
    position: user.position,
    isAdmin: user.role === 'admin' || user.isAdmin === true,
  };
}

export async function hasMinTier(
  user: SessionUserLike | null | undefined,
  minTierId: EdIntelTierId
): Promise<boolean> {
  const ent = await resolveUserTier(user);
  if (user?.role === 'admin' || user?.isAdmin) return true;
  return ent.rank >= tierRank(minTierId);
}

export async function requireFeature(
  user: SessionUserLike | null | undefined,
  feature: EdIntelFeature
): Promise<boolean> {
  const ent = await resolveUserTier(user);
  if (user?.role === 'admin' || user?.isAdmin) return true;
  return checkAccess(ent.tierId, feature);
}

/**
 * Metadata to attach on Checkout / subscription_data so webhooks can write tier back to user.
 */
export function checkoutTierMetadata(userId: string, tierId: EdIntelTierId) {
  return {
    userId,
    tierId,
    source: 'EdIntel RBAC',
  };
}
