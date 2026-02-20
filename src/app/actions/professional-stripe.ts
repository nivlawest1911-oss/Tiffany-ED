'use server';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-01-27.acacia' as any,
});

import { EDINTEL_TIERS } from '@/config/tiers';

export type StripeHandshake = {
    [key: string]: {
        name: string;
        price: number;
        stripeLink: string;
        id?: string | null;
    } | number | string; // To accommodate things like 'credits' if needed
} & {
    credits: { price: number; id: string };
};

/**
 * Handshakes with Stripe to get real-time pricing and ensure alignment.
 * Falls back to hardcoded values from tiers.ts if API key is missing.
 */
export async function getStripeHandshake(): Promise<any> {
    const baseHandshake: any = {};

    // Initialize with tiers.ts values
    Object.keys(EDINTEL_TIERS).forEach(key => {
        const tier = EDINTEL_TIERS[key];
        baseHandshake[key.toLowerCase().replace(/\s+/g, '_')] = {
            name: tier.name,
            price: tier.price,
            stripeLink: tier.stripeLink,
            id: null
        };
    });

    baseHandshake.credits = {
        price: 5.00,
        id: process.env.STRIPE_CREDITS_PRICE_ID || 'price_credit_pack_5'
    };

    if (!process.env.STRIPE_SECRET_KEY) {
        console.warn("[EdIntel] No STRIPE_SECRET_KEY found. Falling back to local configurations.");
        return baseHandshake;
    }

    try {
        const prices = await stripe.prices.list({
            active: true,
            limit: 100,
            expand: ['data.product'],
        });

        // Attempt to sync IDs from Stripe for all tiers
        Object.keys(EDINTEL_TIERS).forEach(key => {
            const tier = EDINTEL_TIERS[key];
            const normalizedKey = key.toLowerCase().replace(/\s+/g, '_');
            const stripePrice = prices.data.find(p => {
                const product = p.product as Stripe.Product;
                return product.name.toLowerCase().includes(tier.name.toLowerCase());
            });

            if (stripePrice) {
                baseHandshake[normalizedKey].id = stripePrice.id;
                baseHandshake[normalizedKey].price = stripePrice.unit_amount ? stripePrice.unit_amount / 100 : tier.price;
            }
        });

        const creditsPrice = prices.data.find(p => {
            const product = p.product as Stripe.Product;
            return product.name.toLowerCase().includes('credits');
        });

        if (creditsPrice) {
            baseHandshake.credits.id = creditsPrice.id;
            baseHandshake.credits.price = creditsPrice.unit_amount ? creditsPrice.unit_amount / 100 : 5.00;
        }

        return baseHandshake;
    } catch (error) {
        console.error("[EdIntel] Stripe handshake failed:", error);
        return baseHandshake; // Return base on error
    }
}

/**
 * Creates a direct Stripe Checkout session for a specific plan.
 * Used for high-stakes administrative procurement.
 */
export async function createEdIntelCheckout(priceId: string, planName: string, userId?: string) {
    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error("STRIPE_SECRET_KEY is not configured on this node.");
    }

    try {
        const successUrl = userId
            ? `${process.env.NEXT_PUBLIC_APP_URL || ''}/the-room?success=true&session_id={CHECKOUT_SESSION_ID}`
            : `${process.env.NEXT_PUBLIC_APP_URL || ''}/signup?checkout_success=true&session_id={CHECKOUT_SESSION_ID}`;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: successUrl,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || ''}/pricing`,
            subscription_data: {
                trial_period_days: 30,
            },
            metadata: {
                userId: userId || 'anonymous',
                plan_name: planName,
                protocol: 'EdIntel_DIRECT_INITIATION'
            }
        });

        return { url: session.url };
    } catch (error) {
        console.error("[EdIntel] Failed to create checkout session:", error);
        throw error;
    }
}
