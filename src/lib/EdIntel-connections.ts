import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { Deepgram } from '@deepgram/sdk';
import { OpenAI } from 'openai';

// --- EdIntel Memory (Upstash Redis) ---
// Used for session persistence, rate limiting, and ephemeral state for agents.
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || 'https://mock-redis-url.upstash.io',
    token: process.env.UPSTASH_REDIS_REST_TOKEN || 'mock_token',
});

// --- EdIntel Gatekeeper (Rate Limiting) ---
// Prevents API abuse and manages the token economy for schools.
export const rateLimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, "10 s"), // 10 requests per 10 seconds
    analytics: true,
    prefix: "@EdIntel/ratelimit",
});

// --- EdIntel Ear (Deepgram) ---
// High-fidelity voice transcription for the "Zero-Download" mission.
export const deepgramClient = (apiKey: string) => new Deepgram(apiKey);

// --- EdIntel Intel (OpenAI) ---
// Direct interface for high-level reasoning tasks.
export const openaiClient = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'mock_openai_key',
});

/**
 * Checks the connectivity of all EdIntel Extensions.
 * Returns a readiness report.
 */
export async function checkEdIntelSystemHealth() {
    const report = {
        memory: 'offline',
        voice: 'offline',
        intel: 'offline'
    };

    try {
        await redis.ping();
        report.memory = 'online';
    } catch (e) {
        console.warn('EdIntel Memory (Redi) unreachable:', e);
    }

    if (process.env.DEEPGRAM_API_KEY) {
        report.voice = 'ready'; // Client instantiated on demand
    }

    if (process.env.OPENAI_API_KEY) {
        report.intel = 'online';
    }

    return report;
}

export { redis };
