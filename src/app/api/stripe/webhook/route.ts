import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sql } from '@vercel/postgres';

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2023-10-16' as any,
    })
    : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

async function grantTokens(email: string, amount: number) {
    try {
        await sql`
            INSERT INTO user_balances (user_id, current_tokens, lifetime_tokens)
            SELECT id, ${amount}, ${amount}
            FROM users WHERE email = ${email}
            ON CONFLICT (user_id) DO UPDATE
            SET current_tokens = user_balances.current_tokens + ${amount},
                lifetime_tokens = user_balances.lifetime_tokens + ${amount}
        `;
        console.log(`[STRIPE] Granted ${amount} tokens to ${email}`);
    } catch (error) {
        console.error(`[STRIPE] Failed to grant tokens to ${email}:`, error);
        throw error;
    }
}

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
                const customerId = session.customer as string;
                const _tier = session.metadata?.tier || 'free';
                const _isSubscription = session.mode === 'subscription';

                if (userEmail) {
                    try {
                        // Update user identity link
                        await sql`
                            UPDATE users 
                            SET 
                                stripe_customer_id = ${customerId},
                                updated_at = NOW()
                            WHERE email = ${userEmail}
                        `;

                        // If it's a one-time token purchase, handle separately
                        if (session.mode === 'payment' && session.metadata?.plan === 'tokens') {
                            const tokenAmount = 5000; // Standard top-up
                            await grantTokens(userEmail, tokenAmount);
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
                const status = subscription.status;
                const customerId = subscription.customer as string;
                const tier = subscription.metadata?.tier || 'professional';

                console.log(`[STRIPE] Subscription Sync: ${customerId} is now ${status}`);

                try {
                    await sql`
                        UPDATE users 
                        SET 
                            subscriptionTier = ${tier},
                            subscription_status = ${status},
                            subscription_id = ${subscription.id},
                            updated_at = NOW()
                        WHERE stripe_customer_id = ${customerId}
                    `;

                    // Grant initial tokens on trial or first activation
                    if ((status === 'trialing' || status === 'active') && !subscription.metadata?.tokens_granted) {
                        const userResult = await sql`SELECT email FROM users WHERE stripe_customer_id = ${customerId}`;
                        if (userResult.rows.length > 0) {
                            const email = userResult.rows[0].email;
                            const tokenAmount = tier === 'site_command' ? 10000 : 5000;
                            await grantTokens(email, tokenAmount);

                            // Mark as granted in Stripe so we don't double-grant on subsequent updates
                            await stripe.subscriptions.update(subscription.id, {
                                metadata: { tokens_granted: 'true' }
                            });
                        }
                    }
                } catch (dbError) {
                    console.error('[STRIPE] Subscription sync error:', dbError);
                }
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription;
                const customerId = subscription.customer as string;
                console.log(`[STRIPE] Subscription terminated: ${customerId}`);

                try {
                    await sql`
                        UPDATE users 
                        SET 
                            subscriptionTier = 'free',
                            subscription_status = 'canceled',
                            updated_at = NOW()
                        WHERE stripe_customer_id = ${customerId}
                    `;
                } catch (dbError) {
                    console.error('[STRIPE] Termination sync failed:', dbError);
                }
                break;
            }

            case 'invoice.payment_succeeded': {
                const invoice = event.data.object as Stripe.Invoice;
                const customerId = invoice.customer as string;
                if (invoice.billing_reason === 'subscription_create' || invoice.billing_reason === 'subscription_cycle') {
                    console.log(`[STRIPE] Revenue generated: ${invoice.amount_paid / 100} credits`);
                    await sql`
                        UPDATE users 
                        SET 
                            subscription_status = 'active',
                            last_payment_at = NOW(),
                            updated_at = NOW()
                        WHERE stripe_customer_id = ${customerId}
                    `;
                }
                break;
            }

            case 'invoice.payment_failed': {
                const invoice = event.data.object as Stripe.Invoice;
                console.log(`[STRIPE] Collection failure: ${invoice.customer}`);
                await sql`
                    UPDATE users 
                    SET subscription_status = 'past_due' 
                    WHERE stripe_customer_id = ${invoice.customer as string}
                `;
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
