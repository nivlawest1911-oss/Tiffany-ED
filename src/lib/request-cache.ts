/**
 * Per-request deduplication helpers.
 * React.cache collapses duplicate awaits within a single RSC / route render.
 * Does NOT cross requests — safe for user-specific data.
 */
import { cache } from 'react';
import { loadEnrichedUserFields } from '@/lib/session-enrichment';
import { resolveUserTier, type ResolvedEntitlement } from '@/lib/rbac-stripe';
import { auth } from './auth';
import { headers } from 'next/headers';

/** Cache enriched user calculations per request without extra DB queries if user object is passed */
export const getEnrichedUserCached = cache(async (userOrId: string | Record<string, any>) => {
  return loadEnrichedUserFields(userOrId);
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
 * Deduplicated server-side request context helper for Next.js App Router.
 * Uses React.cache to collapse duplicate session lookups within a single request.
 */
export const getCachedSession = cache(async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });
        if (!session?.user) return null;
        return session;
    } catch (err) {
        console.error('[REQUEST_CACHE] Session dedupe retrieval error:', err);
        return null;
    }
});
