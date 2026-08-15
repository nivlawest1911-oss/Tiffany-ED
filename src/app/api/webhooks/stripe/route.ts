import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import {
  verifyStripeWebhook,
  StripeWebhookVerifyError,
  measureClockSkew,
  getWebhookToleranceSeconds,
} from '@/lib/stripe-webhook-verify';
import {
  syncCheckoutSession,
  syncSubscriptionToUser,
} from '@/lib/stripe-webhook-sync';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  let rawBody: string;
  try {
    rawBody = await req.text();
  } catch {
    return NextResponse.json(
      { error: 'Unable to read body', code: 'EMPTY_BODY' },
      {
        status: 400,
        headers: { 'Cache-Control': 'private, no-store, no-cache, must-revalidate' }
      }
    );
  }

  const signature = req.headers.get('stripe-signature');

  let event: Stripe.Event;
  try {
    event = verifyStripeWebhook(rawBody, signature);
  } catch (err: any) {
    if (err instanceof StripeWebhookVerifyError) {
      const skew =
        signature != null
          ? measureClockSkew(signature, getWebhookToleranceSeconds())
          : undefined;

      return NextResponse.json(
        {
          error: err.message,
          code: err.code,
          toleranceSec: getWebhookToleranceSeconds(),
          skew: err.details?.skew ?? skew,
        },
        {
          status: err.status,
          headers: { 'Cache-Control': 'private, no-store, no-cache, must-revalidate' }
        }
      );
    }
    console.error('[stripe webhook] unexpected verify error', err);
    return NextResponse.json(
      { error: 'Signature verification failed', code: 'INVALID_SIGNATURE' },
      {
        status: 400,
        headers: { 'Cache-Control': 'private, no-store, no-cache, must-revalidate' }
      }
    );
  }

  try {
    console.log('[stripe webhook] verified', event.id, event.type);

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        try {
          const result = await syncCheckoutSession(session);
          console.log('[stripe webhook] checkout.session.completed sync result', result);
        } catch (syncErr) {
          console.warn('[stripe webhook] syncCheckoutSession fallback:', syncErr);
          const customerEmail = session.customer_details?.email;
          const customerId = session.customer as string | undefined;
          const tierName = session.metadata?.tierName || session.metadata?.tier || 'Standard Pack';
          const userId = session.metadata?.userId;

          if (customerEmail || userId) {
            const tier = await prisma.tiers.findFirst({
              where: {
                OR: [
                  { name: tierName },
                  { id: session.metadata?.tierId || '' }
                ]
              }
            });

            if (tier) {
              let initialTokens = 50;
              if (tier.name === 'Site Command') initialTokens = 10000;
              else if (tier.name === 'Director Pack') initialTokens = 5000;
              else if (tier.name === 'Practitioner') initialTokens = 3000;
              else if (tier.name === 'Sovereign Pack') initialTokens = 1500;

              const fallbackClerkId = `stripe_pending_${crypto.randomUUID()}`;
              const whereClause = userId ? { id: userId } : { email: customerEmail! };

              await prisma.user.upsert({
                where: whereClause as any,
                update: {
                  tier_id: tier.id,
                  subscription_tier: tier.name,
                  stripe_customer_id: customerId || undefined,
                  is_active: true,
                  usage_tokens: { increment: initialTokens },
                  updated_at: new Date()
                },
                create: {
                  id: userId || fallbackClerkId,
                  email: customerEmail || `pending_${crypto.randomUUID()}@edintel.ai`,
                  clerk_id: fallbackClerkId,
                  name: session.customer_details?.name || 'Authorized Personnel',
                  tier_id: tier.id,
                  subscription_tier: tier.name,
                  stripe_customer_id: customerId || undefined,
                  usage_tokens: initialTokens,
                  is_active: true,
                  updated_at: new Date()
                }
              });
            }
          }
        }

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
    return NextResponse.json(
      {
        error: err?.message || 'Handler error',
        code: 'HANDLER_ERROR',
        eventId: event.id,
      },
      {
        status: 500,
        headers: { 'Cache-Control': 'private, no-store, no-cache, must-revalidate' }
      }
    );
  }

  return NextResponse.json(
    {
      received: true,
      eventId: event.id,
      type: event.type,
    },
    {
      status: 200,
      headers: { 'Cache-Control': 'private, no-store, no-cache, must-revalidate' }
    }
  );
}

export async function GET() {
  return NextResponse.json(
    {
      error: 'Method not allowed',
      code: 'METHOD_NOT_ALLOWED',
      toleranceSec: getWebhookToleranceSeconds(),
      hint: 'POST Stripe events to this endpoint. Timestamp tolerance is applied on verify.',
    },
    {
      status: 405,
      headers: { 'Cache-Control': 'private, no-store, no-cache, must-revalidate' }
    }
  );
}
