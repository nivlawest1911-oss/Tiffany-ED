import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sql } from '@vercel/postgres';

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2023-10-16' as any,
    })
    : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

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

        if (!stripe || !webhookSecret) {
            return NextResponse.json(
                { error: 'Stripe not configured' },
                { status: 500 }
            );
        }

        // Verify webhook signature
        let event: Stripe.Event;
        try {
            event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        } catch (err: any) {
            console.error('[STRIPE] Webhook signature verification failed:', err.message);
            return NextResponse.json(
                { error: `Webhook Error: ${err.message}` },
                { status: 400 }
            );
        }

        console.log(`[STRIPE] Webhook received: ${event.type}`);

        // Handle different event types
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                console.log(`[STRIPE] Checkout completed: ${session.id}`);

                const userEmail = session.customer_email || session.metadata?.user_email;
                const userId = session.client_reference_id;
                const customerId = session.customer as string;
                const plan = session.metadata?.plan || 'unknown';
                const tier = session.metadata?.tier || 'free';

                if (userEmail) {
                    try {
                        // Update user subscription in database
                        await sql`
                            UPDATE users 
                            SET 
                                stripe_customer_id = ${customerId},
                                subscriptionTier = ${tier},
                                subscription_status = 'active',
                                updated_at = NOW()
                            WHERE email = ${userEmail}
                        `;

                        console.log(`[STRIPE] User updated: ${userEmail} -> ${tier}`);

                        // Initialize token balance for new subscribers
                        if (tier !== 'free') {
                            const tokenAmount = tier === 'site_command' ? 10000 :
                                tier === 'director' ? 5000 : 2000;

                            await sql`
                                INSERT INTO user_balances (user_id, current_tokens, lifetime_tokens)
                                SELECT id, ${tokenAmount}, ${tokenAmount}
                                FROM users WHERE email = ${userEmail}
                                ON CONFLICT (user_id) DO UPDATE
                                SET current_tokens = user_balances.current_tokens + ${tokenAmount},
                                    lifetime_tokens = user_balances.lifetime_tokens + ${tokenAmount}
                            `;

                            console.log(`[STRIPE] Tokens granted: ${tokenAmount} to ${userEmail}`);
                        }
                    } catch (dbError) {
                        console.error('[STRIPE] Database update failed:', dbError);
                    }
                }
                break;
            }

            case 'customer.subscription.created':
            case 'customer.subscription.updated': {
                const subscription = event.data.object as Stripe.Subscription;
                console.log(`[STRIPE] Subscription ${event.type}: ${subscription.id}`);

                const customerId = subscription.customer as string;
                const status = subscription.status;
                const tier = subscription.metadata?.tier || 'free';

                try {
                    // Sync subscription status
                    await sql`
                        UPDATE users 
                        SET 
                            subscriptionTier = ${tier},
                            subscription_status = ${status},
                            subscription_id = ${subscription.id},
                            updated_at = NOW()
                        WHERE stripe_customer_id = ${customerId}
                    `;

                    console.log(`[STRIPE] Subscription synced: ${customerId} -> ${status}`);
                } catch (dbError) {
                    console.error('[STRIPE] Subscription sync failed:', dbError);
                }
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription;
                console.log(`[STRIPE] Subscription cancelled: ${subscription.id}`);

                const customerId = subscription.customer as string;

                try {
                    // Revert to free tier
                    await sql`
                        UPDATE users 
                        SET 
                            subscriptionTier = 'free',
                            subscription_status = 'canceled',
                            updated_at = NOW()
                        WHERE stripe_customer_id = ${customerId}
                    `;

                    console.log(`[STRIPE] User downgraded to free: ${customerId}`);
                } catch (dbError) {
                    console.error('[STRIPE] Downgrade failed:', dbError);
                }
                break;
            }

            case 'invoice.payment_succeeded': {
                const invoice = event.data.object as Stripe.Invoice;
                console.log(`[STRIPE] Payment succeeded: ${invoice.id}`);

                const customerId = invoice.customer as string;

                try {
                    // Update payment status
                    await sql`
                        UPDATE users 
                        SET 
                            subscription_status = 'active',
                            last_payment_at = NOW(),
                            updated_at = NOW()
                        WHERE stripe_customer_id = ${customerId}
                    `;

                    console.log(`[STRIPE] Payment recorded: ${customerId}`);
                } catch (dbError) {
                    console.error('[STRIPE] Payment update failed:', dbError);
                }
                break;
            }

            case 'invoice.payment_failed': {
                const invoice = event.data.object as Stripe.Invoice;
                console.log(`[STRIPE] Payment failed: ${invoice.id}`);

                const customerId = invoice.customer as string;

                try {
                    // Mark subscription as past_due
                    await sql`
                        UPDATE users 
                        SET 
                            subscription_status = 'past_due',
                            updated_at = NOW()
                        WHERE stripe_customer_id = ${customerId}
                    `;

                    console.warn(`[STRIPE] Payment failure recorded: ${customerId}`);
                } catch (dbError) {
                    console.error('[STRIPE] Payment failure update failed:', dbError);
                }
                break;
            }

            case 'customer.created': {
                const customer = event.data.object as Stripe.Customer;
                console.log(`[STRIPE] Customer created: ${customer.id}`);
                break;
            }

            case 'customer.updated': {
                const customer = event.data.object as Stripe.Customer;
                console.log(`[STRIPE] Customer updated: ${customer.id}`);
                break;
            }

            default:
                console.log(`[STRIPE] Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true, event: event.type });

    } catch (error: any) {
        console.error('[STRIPE] Webhook error:', error);
        return NextResponse.json(
            {
                error: error.message || 'Webhook handler failed',
                details: process.env.NODE_ENV === 'development' ? error.stack : undefined
            },
            { status: 400 }
        );
    }
}
