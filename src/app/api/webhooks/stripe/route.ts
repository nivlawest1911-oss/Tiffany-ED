import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import {
  verifyStripeWebhook,
  StripeWebhookVerifyError,
} from '@/lib/stripe-webhook-verify';
import {
  syncCheckoutSession,
  syncSubscriptionToUser,
} from '@/lib/stripe-webhook-sync';

export const runtime = 'nodejs';

// Prevent Next from parsing body — signature requires raw bytes/text
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  // 1) Raw body first (never req.json() before verify)
  let rawBody: string;
  try {
    rawBody = await req.text();
  } catch {
    return NextResponse.json(
      { error: 'Unable to read body', code: 'EMPTY_BODY' },
      { status: 400 }
    );
  }

  const signature = req.headers.get('stripe-signature');

  // 2) Verify HMAC signature — reject everything else
  let event: Stripe.Event;
  try {
    event = verifyStripeWebhook(rawBody, signature);
  } catch (err) {
    if (err instanceof StripeWebhookVerifyError) {
      return NextResponse.json(
        { error: err.message, code: err.code },
        { status: err.status }
      );
    }
    console.error('[stripe webhook] unexpected verify error', err);
    return NextResponse.json(
      { error: 'Signature verification failed', code: 'INVALID_SIGNATURE' },
      { status: 400 }
    );
  }

  // 3) Process only after successful verification
  try {
    console.log('[stripe webhook] verified', event.id, event.type);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const result = await syncCheckoutSession(session);
        console.log('[stripe webhook] checkout.session.completed', result);

        if (session.subscription) {
          const subId =
            typeof session.subscription === 'string'
              ? session.subscription
              : session.subscription.id;
          const sub = await stripe.subscriptions.retrieve(subId, {
            expand: ['items.data.price'],
          });
          const subResult = await syncSubscriptionToUser(sub, {
            email: session.customer_details?.email,
            grantTokens: false,
          });
          console.log('[stripe webhook] post-checkout sub sync', subResult);
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription;
        const result = await syncSubscriptionToUser(sub, {
          grantTokens: event.type === 'customer.subscription.created',
        });
        console.log(`[stripe webhook] ${event.type}`, result);
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        const canceled = { ...sub, status: 'canceled' as const };
        const result = await syncSubscriptionToUser(canceled);
        console.log('[stripe webhook] subscription.deleted', result);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        const subRef = (invoice as any).subscription;
        if (subRef) {
          const subId = typeof subRef === 'string' ? subRef : subRef.id;
          const sub = await stripe.subscriptions.retrieve(subId);
          await syncSubscriptionToUser(sub);
          console.log('[stripe webhook] payment_failed synced', subId);
        }
        break;
      }

      default:
        break;
    }
  } catch (err: any) {
    console.error('[stripe webhook] handler error', event.type, event.id, err);
    // 500 → Stripe retries
    return NextResponse.json(
      {
        error: err?.message || 'Handler error',
        code: 'HANDLER_ERROR',
        eventId: event.id,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    received: true,
    eventId: event.id,
    type: event.type,
  });
}

/** Reject non-POST explicitly */
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed', code: 'METHOD_NOT_ALLOWED' },
    { status: 405 }
  );
}
