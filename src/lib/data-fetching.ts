import { cache } from 'react';
import { sql } from '@/lib/db';
import { prisma } from '@/lib/prisma';

/**
 * React cache() wrapped data fetching functions
 * These functions are automatically deduplicated within a single render pass
 */

// ============================================
// USER DATA FETCHING
// ============================================

/**
 * Get user by email with React cache deduplication
 */
export const getUserByEmail = cache(async (email: string) => {
  try {
    const normalizedEmail = email.toLowerCase();
    const result = await sql`
      SELECT id, name, email, subscription_tier, position, bio, created_at
      FROM users 
      WHERE email = ${normalizedEmail}
      LIMIT 1
    `;
    return result.rows[0] || null;
  } catch (error) {
    console.error('[DATA_FETCH] Error fetching user by email:', error);
    return null;
  }
});

/**
 * Get user by ID with React cache deduplication
 */
export const getUserById = cache(async (userId: string) => {
  try {
    const result = await sql`
      SELECT id, name, email, subscription_tier, position, bio, created_at
      FROM users 
      WHERE id = ${userId}
      LIMIT 1
    `;
    return result.rows[0] || null;
  } catch (error) {
    console.error('[DATA_FETCH] Error fetching user by ID:', error);
    return null;
  }
});

/**
 * Get user's token balance
 */
export const getUserTokenBalance = cache(async (userId: string) => {
  try {
    const result = await sql`
      SELECT 
        current_tokens,
        lifetime_tokens_purchased,
        lifetime_tokens_used,
        updated_at
      FROM user_balances
      WHERE user_id = ${userId}
    `;
    return result.rows[0] || { current_tokens: 0, lifetime_tokens_purchased: 0, lifetime_tokens_used: 0 };
  } catch (error) {
    console.error('[DATA_FETCH] Error fetching token balance:', error);
    return { current_tokens: 0, lifetime_tokens_purchased: 0, lifetime_tokens_used: 0 };
  }
});

// ============================================
// DASHBOARD DATA FETCHING
// ============================================

/**
 * Get dashboard metrics for a user
 */
export const getDashboardMetrics = cache(async (userId: string) => {
  try {
    const [generationsResult, activityResult] = await Promise.all([
      sql`
        SELECT COUNT(*) as total_generations
        FROM generations
        WHERE user_id = ${userId}
      `,
      sql`
        SELECT COUNT(*) as recent_activity
        FROM activity_log
        WHERE user_id = ${userId}
        AND created_at > NOW() - INTERVAL '7 days'
      `
    ]);

    return {
      totalGenerations: parseInt(generationsResult.rows[0]?.total_generations || '0'),
      recentActivity: parseInt(activityResult.rows[0]?.recent_activity || '0'),
    };
  } catch (error) {
    console.error('[DATA_FETCH] Error fetching dashboard metrics:', error);
    return { totalGenerations: 0, recentActivity: 0 };
  }
});

/**
 * Get recent generations for a user
 */
export const getRecentGenerations = cache(async (userId: string, limit = 10) => {
  try {
    const result = await sql`
      SELECT id, type, title, created_at, metadata
      FROM generations
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `;
    return result.rows;
  } catch (error) {
    console.error('[DATA_FETCH] Error fetching recent generations:', error);
    return [];
  }
});

// ============================================
// PARALLEL DATA FETCHING HELPERS
// ============================================

/**
 * Fetch all user-related data in parallel
 */
export const fetchUserDashboardData = cache(async (userId: string, email: string) => {
  const [user, tokenBalance, metrics, recentGenerations] = await Promise.all([
    getUserByEmail(email),
    getUserTokenBalance(userId),
    getDashboardMetrics(userId),
    getRecentGenerations(userId, 5),
  ]);

  return {
    user,
    tokenBalance,
    metrics,
    recentGenerations,
  };
});

/**
 * Fetch initial page data with timeout protection
 */
export async function fetchWithTimeout<T>(
  fetchFn: () => Promise<T>,
  timeoutMs: number = 5000,
  fallback: T
): Promise<T> {
  try {
    const result = await Promise.race([
      fetchFn(),
      new Promise<T>((_, reject) =>
        setTimeout(() => reject(new Error('Fetch timeout')), timeoutMs)
      ),
    ]);
    return result;
  } catch (error) {
    console.error('[DATA_FETCH] Fetch timeout or error:', error);
    return fallback;
  }
}

// ============================================
// PRISMA CACHED QUERIES
// ============================================

/**
 * Get user with Prisma (cached)
 */
export const getPrismaUser = cache(async (email: string) => {
  try {
    return await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
        name: true,
        subscriptionTier: true,
        role: true,
        createdAt: true,
      },
    });
  } catch (error) {
    console.error('[DATA_FETCH] Prisma user fetch error:', error);
    return null;
  }
});

/**
 * Get user's subscription status
 */
export const getSubscriptionStatus = cache(async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        subscriptionTier: true,
        subscriptionStatus: true,
        trialEndsAt: true,
      },
    });
    
    if (!user) return { tier: 'free', status: 'inactive', isTrialing: false };
    
    const isTrialing = user.trialEndsAt ? new Date(user.trialEndsAt) > new Date() : false;
    
    return {
      tier: user.subscriptionTier || 'free',
      status: user.subscriptionStatus || 'inactive',
      isTrialing,
    };
  } catch (error) {
    console.error('[DATA_FETCH] Subscription status fetch error:', error);
    return { tier: 'free', status: 'inactive', isTrialing: false };
  }
});

// ============================================
// REVALIDATION HELPERS
// ============================================

/**
 * Standard revalidation intervals (in seconds)
 */
export const REVALIDATION_INTERVALS = {
  REAL_TIME: 0,        // No cache
  FAST: 30,            // 30 seconds
  STANDARD: 60,        // 1 minute
  SLOW: 300,           // 5 minutes
  STATIC: 3600,        // 1 hour
  DAILY: 86400,        // 24 hours
} as const;

/**
 * Create a cached fetch with revalidation
 */
export function createCachedFetch<T>(
  key: string,
  fetchFn: () => Promise<T>,
  revalidate: number = REVALIDATION_INTERVALS.STANDARD
) {
  return cache(async () => {
    try {
      const data = await fetchFn();
      return { data, error: null, timestamp: Date.now() };
    } catch (error) {
      console.error(`[CACHED_FETCH] Error for ${key}:`, error);
      return { data: null, error: error instanceof Error ? error.message : 'Unknown error', timestamp: Date.now() };
    }
  });
}
