import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import {
  syncCheckoutSession,
  syncSubscriptionToUser,
} from '@/lib/stripe-webhook-sync';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return new NextResponse('Webhook misconfigured', { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error: any) {
    console.error('[stripe webhook] signature', error?.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const result = await syncCheckoutSession(session);
        console.log('[stripe webhook] checkout.session.completed', result);

        // If subscription id present, pull full sub and sync (price → tier)
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
            grantTokens: false, // already granted on checkout stamp
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
        // Force status canceled for downgrade path
        const canceled = {
          ...sub,
          status: 'canceled' as const,
        };
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
        // Acknowledge other events without error
        break;
    }
  } catch (err: any) {
    console.error('[stripe webhook] handler error', event.type, err);
    // Return 500 so Stripe retries
    return new NextResponse(`Handler error: ${err?.message || 'unknown'}`, {
      status: 500,
    });
  }

  return NextResponse.json({ received: true });
}
