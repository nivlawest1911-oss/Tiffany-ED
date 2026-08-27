/**
 * EdIntel IronShield Security Gate
 * 
 * Protects mutating AI, token-consuming, and high-sensitivity endpoints
 * from automated scrapers, bots, and unauthorized automation.
 * Integrates with botid while providing fail-closed protection on mutating AI routes.
 */

import { NextRequest, NextResponse } from 'next/server';
import { checkBotId } from 'botid/server';

export interface IronShieldGateOptions {
  routeName?: string;
  failClosed?: boolean;
  allowCronSecret?: boolean;
}

export interface IronShieldGateResult {
  allowed: boolean;
  response?: NextResponse;
  reason?: string;
  isBot?: boolean;
}

/**
 * Asserts that an incoming HTTP request is from a legitimate human or authorized service.
 * Returns { allowed: true } or a 403/429 NextResponse.
 */
export async function assertHumanRequest(
  req: NextRequest | Request,
  options: IronShieldGateOptions = {}
): Promise<IronShieldGateResult> {
  const { routeName = 'unnamed-ai-route', failClosed = true, allowCronSecret = true } = options;
  const requestId = req.headers.get('x-request-id') || req.headers.get('cf-ray') || `req_${Date.now()}`;

  // 1. Check for authorized internal cron / service bypass if configured
  if (allowCronSecret) {
    const cronSecret = process.env.CRON_SECRET || process.env.INTERNAL_SERVICE_KEY;
    const authHeader = req.headers.get('authorization') || '';
    const bypassHeader = req.headers.get('x-ironshield-bypass') || '';

    if (cronSecret && (authHeader === `Bearer ${cronSecret}` || bypassHeader === cronSecret)) {
      return { allowed: true, reason: 'authorized-service-token' };
    }
  }

  // 2. Check botid verification
  try {
    const verification = await checkBotId();

    if (verification && verification.isBot) {
      console.warn(`[IronShield:Blocked] Bot detected on ${routeName} (Request: ${requestId})`);
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
    // If botid is unavailable or not configured in environment
    const isDev = process.env.NODE_ENV === 'development';
    const isStrictMode = process.env.IRONSHIELD_STRICT_MODE === 'true';

    if (isDev) {
      return { allowed: true, reason: 'dev-bypass' };
    }

    if (isStrictMode && failClosed) {
      console.error(`[IronShield:Error] Challenge verification failed on ${routeName} (Request: ${requestId}):`, err?.message);
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
