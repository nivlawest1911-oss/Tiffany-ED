import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";

/**
 * Sovereign Rate Limit Orchestrator
 * 
 * Performance-optimized rate limiting using Upstash KV.
 */

export const authRateLimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(
    parseInt(process.env.RATE_LIMIT_AUTH || "5"), 
    "60 s"
  ),
  analytics: true,
  prefix: "edintel_ratelimit_auth",
});

export const apiRateLimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(
    parseInt(process.env.RATE_LIMIT_API || "10"), 
    "10 s"
  ),
  analytics: true,
  prefix: "edintel_ratelimit_api",
});
