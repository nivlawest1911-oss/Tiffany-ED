/**
 * Stripe webhook signature verification.
 * ALWAYS verify with the raw body string — never JSON.parse first.
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

  constructor(
    code: StripeWebhookVerifyError['code'],
    message: string,
    status = 400
  ) {
    super(message);
    this.name = 'StripeWebhookVerifyError';
    this.code = code;
    this.status = status;
  }
}

/**
 * Resolve webhook signing secret(s).
 * Supports primary + optional test/live fallback for dual-mode endpoints.
 */
export function getWebhookSecrets(): string[] {
  const secrets = [
    process.env.STRIPE_WEBHOOK_SECRET,
    process.env.STRIPE_WEBHOOK_SECRET_TEST,
    process.env.STRIPE_WEBHOOK_SECRET_LIVE,
  ].filter((s): s is string => Boolean(s && s.trim()));

  return [...new Set(secrets.map((s) => s.trim()))];
}

/**
 * Verify Stripe-Signature header against raw request body.
 * Tries each configured secret (useful when rotating or test+live).
 */
export function verifyStripeWebhook(
  rawBody: string | Buffer,
  signatureHeader: string | null
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

  let lastError: Error | null = null;

  for (const secret of secrets) {
    try {
      // constructEvent validates HMAC + optional timestamp tolerance (default 300s)
      const event = stripe.webhooks.constructEvent(
        body,
        signatureHeader,
        secret
      );
      return event;
    } catch (err: any) {
      lastError = err instanceof Error ? err : new Error(String(err));
      // try next secret
    }
  }

  const msg = lastError?.message || 'Invalid signature';
  const isTolerance = /tolerance|timestamp/i.test(msg);

  console.error('[stripe-webhook-verify] failed', {
    message: msg,
    secretsTried: secrets.length,
  });

  throw new StripeWebhookVerifyError(
    isTolerance ? 'TOLERANCE' : 'INVALID_SIGNATURE',
    isTolerance
      ? 'Webhook timestamp outside tolerance — check server clock'
      : `Webhook signature verification failed: ${msg}`,
    400
  );
}
