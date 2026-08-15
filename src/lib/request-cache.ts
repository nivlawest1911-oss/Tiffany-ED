/**
 * Per-request deduplication helpers.
 * React.cache collapses duplicate awaits within a single RSC / route render.
 * Does NOT cross requests — safe for user-specific data.
 */
import { cache } from 'react';
import { loadEnrichedUserFields } from '@/lib/session-enrichment';
import { resolveUserTier, type ResolvedEntitlement } from '@/lib/rbac-stripe';

/** One Prisma hit per userId per request for session enrichment */
export const getEnrichedUserCached = cache(async (userId: string) => {
  return loadEnrichedUserFields(userId);
});

/**
 * Resolve tier once per request even if layout + page + API helper all call it.
 * Pass a stable user snapshot (id + tier fields from session).
 */
export const resolveUserTierCached = cache(
  async (userKey: string, userJson: string): Promise<ResolvedEntitlement> => {
    // userKey is part of the cache key; userJson carries fields
    void userKey;
    const user = JSON.parse(userJson);
    return resolveUserTier(user);
  }
);

/** Convenience for session.user objects */
export async function resolveSessionTierOnce(user: {
  id: string;
  [key: string]: unknown;
}): Promise<ResolvedEntitlement> {
  return resolveUserTierCached(user.id, JSON.stringify(user));
}
