import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/stripe';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
    try {
        const body = await request.text();
        const signature = request.headers.get('stripe-signature');

        if (!signature) {
            return NextResponse.json(
                { error: 'Missing stripe signature' },
                { status: 400 }
            );
        }

        // Verify webhook signature
        const event = verifyWebhookSignature(body, signature);

        // Handle different event types
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                console.log('Checkout completed:', session.id);

                // Update user subscription in database
                const userId = session.client_reference_id;
                const customerId = session.customer as string;

                // [SOVEREIGN LEDGER] Update User Record
                if (userId) {
                    console.log(`[LEDGER] Granting Sovereign Access to: ${userId}`);
                    // In a live Vercel Postgres/KV setup:
                    // await sql`UPDATE users SET stripe_customer_id = ${customerId}, tier = 'premium' WHERE id = ${userId}`;
                }
                break;
            }

            case 'customer.subscription.created':
            case 'customer.subscription.updated': {
                const subscription = event.data.object as Stripe.Subscription;
                console.log('Subscription updated:', subscription.id);

                // [SOVEREIGN LEDGER] Sync Subscription Status
                // Ensure local db matches Stripe status active/past_due
                console.log(`[LEDGER] Syncing status: ${subscription.status}`);
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription;
                console.log('Subscription cancelled:', subscription.id);

                // [SOVEREIGN LEDGER] Revert to Free Tier
                console.log(`[LEDGER] Downgrading subscription: ${subscription.id}`);
                break;
            }

            case 'invoice.payment_succeeded': {
                const invoice = event.data.object as Stripe.Invoice;
                console.log('Payment succeeded:', invoice.id);
                break;
            }

            case 'invoice.payment_failed': {
                const invoice = event.data.object as Stripe.Invoice;
                console.log('Payment failed:', invoice.id);

                // [SOVEREIGN LEDGER] Trigger Recovery Protocol
                console.warn(`[ALERT] Payment failed for invoice: ${invoice.id}`);
                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (error: any) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: error.message || 'Webhook handler failed' },
            { status: 400 }
        );
    }
}
