/**
 * Per-request deduplication helpers.
 * React.cache collapses duplicate awaits within a single RSC / route render.
 * Does NOT cross requests — safe for user-specific data.
 */
import { cache } from 'react';
import { loadEnrichedUserFields } from '@/lib/session-enrichment';
import { resolveUserTier, resolveUserEntitlement, type ResolvedEntitlement } from '@/lib/rbac-stripe';
import { getSession } from './auth';
import { prisma } from './prisma';

/** One Prisma hit per userId per request for session enrichment */
export const getEnrichedUserCached = cache(async (userId: string) => {
  return loadEnrichedUserFields(userId);
});

/**
 * Resolve tier once per request even if layout + page + API helper all call it.
 */
export const resolveUserTierCached = cache(
  async (userKey: string, userJson: string): Promise<ResolvedEntitlement> => {
    void userKey;
    const user = JSON.parse(userJson);
    return resolveUserTier(user);
  }
);

export async function resolveSessionTierOnce(user: {
  id: string;
  [key: string]: unknown;
}): Promise<ResolvedEntitlement> {
  return resolveUserTierCached(user.id, JSON.stringify(user));
}

/**
 * Deduplicated server-side request context helper for Next.js App Router
 */
export const getCachedSession = cache(async () => {
    try {
        const session = await getSession();
        if (!session?.user) return null;

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: {
                id: true,
                email: true,
                name: true,
                subscription_tier: true,
                tier_id: true,
                usage_tokens: true,
                is_active: true,
            }
        });

        const entitlementInfo = resolveUserEntitlement(user?.subscription_tier);

        return {
            ...session,
            user: {
                ...session.user,
                subscription_tier: user?.subscription_tier || entitlementInfo.entitlement.name,
                tier_id: user?.tier_id,
                tierMissing: entitlementInfo.tierMissing,
                tierWarning: entitlementInfo.tierWarning,
                entitlement: entitlementInfo.entitlement,
            }
        };
    } catch (err) {
        console.error('[REQUEST_CACHE] Session dedupe retrieval error:', err);
        return null;
    }
});
