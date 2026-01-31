'use server';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-01-27.acacia' as any,
});

export type StripeHandshake = {
    starter: { monthly: number; annual: number; id: string | null; annualId: string | null };
    pro: { monthly: number; annual: number; id: string; annualId: string };
    campus: { monthly: number; annual: number; id: string; annualId: string };
    credits: { price: number; id: string };
};

/**
 * Handshakes with Stripe to get real-time pricing and ensure alignment.
 * Falls back to hardcoded values if API key is missing.
 */
export async function getStripeHandshake(): Promise<StripeHandshake> {
    if (!process.env.STRIPE_SECRET_KEY) {
        console.warn("[SOVEREIGN] No STRIPE_SECRET_KEY found. Falling back to actual Stripe configurations.");
        return {
            starter: {
                monthly: 0,
                annual: 0,
                id: null,
                annualId: null
            },
            pro: {
                monthly: 39.99,
                annual: 383.88,
                id: process.env.STRIPE_PRO_PRICE_ID || 'price_pro_tier_39',
                annualId: process.env.STRIPE_PRO_ANNUAL_ID || 'price_pro_tier_annual_383'
            },
            campus: {
                monthly: 0, // Custom
                annual: 0,
                id: process.env.STRIPE_CAMPUS_PRICE_ID || 'price_campus_custom',
                annualId: process.env.STRIPE_CAMPUS_ANNUAL_ID || 'price_campus_custom_annual'
            },
            credits: {
                price: 5.00,
                id: process.env.STRIPE_CREDITS_PRICE_ID || 'price_credit_pack_5'
            }
        };
    }

    try {
        const prices = await stripe.prices.list({
            active: true,
            limit: 100,
            expand: ['data.product'],
        });

        // Helper to find price by product name and interval
        const findPrice = (name: string, interval: 'month' | 'year' | null) => {
            return prices.data.find(p => {
                const product = p.product as Stripe.Product;
                const matchesName = product.name.toLowerCase().includes(name.toLowerCase());
                const matchesInterval = interval ? p.recurring?.interval === interval : !p.recurring;
                return matchesName && matchesInterval;
            });
        };

        const proMonthly = findPrice('Pro', 'month');
        const proAnnual = findPrice('Pro', 'year');
        const credits = findPrice('Credits', null);

        return {
            starter: {
                monthly: 0,
                annual: 0,
                id: null,
                annualId: null
            },
            pro: {
                monthly: proMonthly?.unit_amount ? proMonthly.unit_amount / 100 : 19.00,
                annual: proAnnual?.unit_amount ? proAnnual.unit_amount / 100 : 190.00,
                id: proMonthly?.id || 'price_pro_m',
                annualId: proAnnual?.id || 'price_pro_a'
            },
            campus: {
                monthly: 0,
                annual: 0,
                id: 'price_campus_custom',
                annualId: 'price_campus_custom'
            },
            credits: {
                price: credits?.unit_amount ? credits.unit_amount / 100 : 5.00,
                id: credits?.id || 'price_credits_5'
            }
        };
    } catch (error) {
        console.error("[SOVEREIGN] Stripe handshake failed:", error);
        throw error;
    }
}

/**
 * Creates a direct Stripe Checkout session for a specific plan.
 * Used for high-stakes administrative procurement.
 */
export async function createSovereignCheckout(priceId: string, planName: string, userId?: string) {
    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("STRIPE_SECRET_KEY is not configured on this node.");
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL || ''}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || ''}/pricing`,
            subscription_data: {
                trial_period_days: 30,
            },
            metadata: {
                userId: userId || 'anonymous',
                planName: planName,
                protocol: 'SOVEREIGN_DIRECT_INITIATION'
            }
        });

        return { url: session.url };
    } catch (error) {
        console.error("[SOVEREIGN] Failed to create checkout session:", error);
        throw error;
    }
}
