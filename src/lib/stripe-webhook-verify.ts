/**
 * Stripe webhook signature verification with timestamp tolerance handling.
 * ALWAYS verify with the raw body string — never JSON.parse first.
 *
 * Default tolerance: 300s (Stripe DEFAULT_TOLERANCE).
 * Override: STRIPE_WEBHOOK_TOLERANCE_SECONDS (clamped 60–900).
 */
import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';

export class StripeWebhookVerifyError extends Error {
  code:
    | 'MISSING_SIGNATURE'
    | 'MISSING_SECRET'
    | 'EMPTY_BODY'
    | 'INVALID_SIGNATURE'
    | 'TOLERANCE';
  status: number;
  details?: Record<string, unknown>;

  constructor(
    code: StripeWebhookVerifyError['code'],
    message: string,
    status = 400,
    details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'StripeWebhookVerifyError';
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

/** Stripe default is 300 seconds (5 minutes). */
export const STRIPE_DEFAULT_TOLERANCE_SEC = 300;

/** Clamp env override to a safe range (1 min – 15 min). */
export function getWebhookToleranceSeconds(): number {
  const raw = process.env.STRIPE_WEBHOOK_TOLERANCE_SECONDS;
  if (!raw) return STRIPE_DEFAULT_TOLERANCE_SEC;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n <= 0) return STRIPE_DEFAULT_TOLERANCE_SEC;
  // Never allow unbounded tolerance (replay risk)
  return Math.min(Math.max(n, 60), 900);
}

export function getWebhookSecrets(): string[] {
  const secrets = [
    process.env.STRIPE_WEBHOOK_SECRET,
    process.env.STRIPE_WEBHOOK_SECRET_TEST,
    process.env.STRIPE_WEBHOOK_SECRET_LIVE,
  ].filter((s): s is string => Boolean(s && s.trim()));

  return [...new Set(secrets.map((s) => s.trim()))];
}

/**
 * Parse `t=` from Stripe-Signature header (unix seconds).
 * Header form: t=1492774577,v1=...,v0=...
 */
export function parseSignatureTimestamp(
  signatureHeader: string
): number | null {
  try {
    const part = signatureHeader.split(',').find((p) => p.trim().startsWith('t='));
    if (!part) return null;
    const value = part.trim().slice(2);
    const ts = Number.parseInt(value, 10);
    return Number.isFinite(ts) && ts > 0 ? ts : null;
  } catch {
    return null;
  }
}

export type ClockSkewInfo = {
  eventTimestampSec: number | null;
  serverNowSec: number;
  skewSec: number | null;
  toleranceSec: number;
  withinTolerance: boolean | null;
};

export function measureClockSkew(
  signatureHeader: string,
  toleranceSec = getWebhookToleranceSeconds()
): ClockSkewInfo {
  const eventTimestampSec = parseSignatureTimestamp(signatureHeader);
  const serverNowSec = Math.floor(Date.now() / 1000);
  if (eventTimestampSec == null) {
    return {
      eventTimestampSec: null,
      serverNowSec,
      skewSec: null,
      toleranceSec,
      withinTolerance: null,
    };
  }
  const skewSec = serverNowSec - eventTimestampSec;
  return {
    eventTimestampSec,
    serverNowSec,
    skewSec,
    toleranceSec,
    withinTolerance: Math.abs(skewSec) <= toleranceSec,
  };
}

/**
 * Verify Stripe-Signature against raw body with explicit timestamp tolerance.
 */
export function verifyStripeWebhook(
  rawBody: string | Buffer,
  signatureHeader: string | null,
  options?: { toleranceSec?: number }
): Stripe.Event {
  if (!signatureHeader || !signatureHeader.trim()) {
    throw new StripeWebhookVerifyError(
      'MISSING_SIGNATURE',
      'Missing Stripe-Signature header',
      400
    );
  }

  const body =
    typeof rawBody === 'string'
      ? rawBody
      : Buffer.isBuffer(rawBody)
        ? rawBody.toString('utf8')
        : '';

  if (!body || !body.trim()) {
    throw new StripeWebhookVerifyError(
      'EMPTY_BODY',
      'Empty webhook body',
      400
    );
  }

  const secrets = getWebhookSecrets();
  if (secrets.length === 0) {
    throw new StripeWebhookVerifyError(
      'MISSING_SECRET',
      'STRIPE_WEBHOOK_SECRET is not configured',
      500
    );
  }

  const toleranceSec =
    options?.toleranceSec != null
      ? Math.min(Math.max(options.toleranceSec, 60), 900)
      : getWebhookToleranceSeconds();

  const skew = measureClockSkew(signatureHeader, toleranceSec);

  let lastError: Error | null = null;

  for (const secret of secrets) {
    try {
      // 4th arg = tolerance in seconds (stripe-node)
      const event = stripe.webhooks.constructEvent(
        body,
        signatureHeader,
        secret,
        toleranceSec
      );
      return event;
    } catch (err: any) {
      lastError = err instanceof Error ? err : new Error(String(err));
    }
  }

  const msg = lastError?.message || 'Invalid signature';
  const isTolerance = /tolerance|timestamp/i.test(msg);

  console.error('[stripe-webhook-verify] failed', {
    message: msg,
    secretsTried: secrets.length,
    toleranceSec,
    skew,
  });

  if (isTolerance) {
    throw new StripeWebhookVerifyError(
      'TOLERANCE',
      `Webhook timestamp outside tolerance (±${toleranceSec}s). ` +
        (skew.skewSec != null
          ? `Clock skew ≈ ${skew.skewSec}s (server_now=${skew.serverNowSec}, event_t=${skew.eventTimestampSec}). ` +
            'Sync server NTP or raise STRIPE_WEBHOOK_TOLERANCE_SECONDS (max 900).'
          : 'Check server clock / NTP.'),
      400,
      { skew, toleranceSec }
    );
  }

  throw new StripeWebhookVerifyError(
    'INVALID_SIGNATURE',
    `Webhook signature verification failed: ${msg}`,
    400,
    { skew, toleranceSec }
  );
}
