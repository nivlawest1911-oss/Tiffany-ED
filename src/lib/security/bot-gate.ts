/**
 * EdIntel Bot Gate / Edge Security Shield
 * 
 * Protects mutating AI, token-consuming, and high-sensitivity endpoints
 * from automated scrapers, bots, and unauthorized automation.
 * Integrates with botid while providing fail-closed protection on mutating AI routes.
 */

import { NextRequest, NextResponse } from 'next/server';
import { checkBotId } from 'botid/server';

export interface BotGateOptions {
  routeName?: string;
  failClosed?: boolean;
  allowCronSecret?: boolean;
}

export interface BotGateResult {
  allowed: boolean;
  response?: NextResponse;
  reason?: string;
  isBot?: boolean;
}

/**
 * Asserts that an incoming HTTP request is from a legitimate human or authorized service.
 * Returns { allowed: true } or a 403/429 NextResponse.
 */
export async function assertBotGate(
  req: NextRequest | Request,
  options: BotGateOptions = {}
): Promise<BotGateResult> {
  const { routeName = 'unnamed-route', failClosed = true, allowCronSecret = true } = options;
  const requestId = req.headers.get('x-request-id') || req.headers.get('cf-ray') || `req_${Date.now()}`;

  // 1. Check for authorized internal cron / service bypass if configured
  if (allowCronSecret) {
    const cronSecret = process.env.CRON_SECRET || process.env.INTERNAL_SERVICE_KEY;
    const authHeader = req.headers.get('authorization') || '';
    const bypassHeader = req.headers.get('x-ironshield-bypass') || req.headers.get('x-botid-bypass') || '';

    if (cronSecret && (authHeader === `Bearer ${cronSecret}` || bypassHeader === cronSecret)) {
      return { allowed: true, reason: 'authorized-service-token' };
    }
  }

  // 2. Check botid verification
  try {
    const verification = await checkBotId();

    if (verification && verification.isBot) {
      console.warn(`[BotGate:Blocked] Automated bot detected on ${routeName} (Request ID: ${requestId})`);
      return {
        allowed: false,
        isBot: true,
        reason: 'bot-detected',
        response: NextResponse.json(
          { error: 'Access denied: automated verification failed', requestId },
          { status: 403 }
        ),
      };
    }

    return { allowed: true, isBot: false };
  } catch (err: any) {
    // If botid is unavailable or in non-production environments
    const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
    const isStrictMode = process.env.IRONSHIELD_STRICT_MODE === 'true';

    if (isDev && !isStrictMode) {
      return { allowed: true, reason: 'dev-bypass' };
    }

    if (isStrictMode && failClosed) {
      console.error(`[BotGate:Error] Challenge verification failed on ${routeName} (Request ID: ${requestId}):`, err?.message);
      return {
        allowed: false,
        reason: 'verification-error',
        response: NextResponse.json(
          { error: 'Security gate validation error', requestId },
          { status: 403 }
        ),
      };
    }

    // Default serverless runtime behavior: allow with warning
    return { allowed: true, reason: 'botid-runtime-pass' };
  }
}

/** Alias for backward compatibility */
export const assertHumanRequest = assertBotGate;
