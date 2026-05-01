import { Ratelimit } from "@upstash/ratelimit";

/**
 * Sovereign Rate Limit Orchestrator
 * 
 * Performance-optimized rate limiting using Upstash KV.
 * Gracefully degrades when KV is not configured.
 */

// Check if KV is configured
const isKvConfigured = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

// Lazy-load KV only when configured to avoid throwing errors
const getKv = () => {
  if (!isKvConfigured) return null;
  // Dynamic import to avoid the @vercel/kv module throwing on import
  const { kv } = require("@vercel/kv");
  return kv;
};

// No-op rate limiter for when KV is not configured
const noOpRateLimiter = {
  limit: async (_identifier: string) => ({
    success: true,
    limit: 0,
    remaining: 0,
    reset: 0,
    pending: Promise.resolve(),
  }),
};

// Create rate limiters only if KV is available
export const authRateLimit = isKvConfigured
  ? new Ratelimit({
      redis: getKv(),
      limiter: Ratelimit.slidingWindow(
        parseInt(process.env.RATE_LIMIT_AUTH || "5"),
        "60 s"
      ),
      analytics: true,
      prefix: "edintel_ratelimit_auth",
    })
  : noOpRateLimiter;

export const apiRateLimit = isKvConfigured
  ? new Ratelimit({
      redis: getKv(),
      limiter: Ratelimit.slidingWindow(
        parseInt(process.env.RATE_LIMIT_API || "10"),
        "10 s"
      ),
      analytics: true,
      prefix: "edintel_ratelimit_api",
    })
  : noOpRateLimiter;
