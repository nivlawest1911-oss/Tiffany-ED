'use server';

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-01-27.acacia' as any,
});

export type StripeHandshake = {
    practitioner: { monthly: number; annual: number; id: string; annualId: string };
    siteCommand: { monthly: number; annual: number; id: string; annualId: string };
    director: { monthly: number; annual: number; id: string; annualId: string };
    sovereign: { monthly: number; annual: number; id: string; annualId: string };
    sovereignVault: { price: number; id: string };
};

/**
 * Handshakes with Stripe to get real-time pricing and ensure alignment.
 * Falls back to hardcoded values if API key is missing.
 */
export async function getStripeHandshake(): Promise<StripeHandshake> {
    if (!process.env.STRIPE_SECRET_KEY) {
        console.warn("[SOVEREIGN] No STRIPE_SECRET_KEY found. Falling back to actual Stripe configurations.");
        return {
            practitioner: {
                monthly: 49.99,
                annual: 44.99,
                id: process.env.STRIPE_PRACTITIONER_PRICE_ID || 'price_1SleigJZzJ2JsTizzhcHtd36',
                annualId: process.env.STRIPE_PRACTITIONER_ANNUAL_ID || 'price_1SleigJZzJ2JsTizAnnual'
            },
            director: {
                monthly: 69.99,
                annual: 59.99,
                id: process.env.STRIPE_DIRECTOR_PRICE_ID || 'price_director_m',
                annualId: process.env.STRIPE_DIRECTOR_ANNUAL_ID || 'price_director_a'
            },
            siteCommand: {
                monthly: 79.99,
                annual: 69.99,
                id: process.env.STRIPE_SITE_COMMAND_PRICE_ID || 'price_1SleihJZzJ2JsTizmaXKM4ow',
                annualId: process.env.STRIPE_SITE_COMMAND_ANNUAL_ID || 'price_1SleihJZzJ2JsTizAnnual'
            },
            sovereign: {
                monthly: 39.99,
                annual: 34.99,
                id: process.env.STRIPE_SOVEREIGN_PRICE_ID || 'price_sovereign_m',
                annualId: process.env.STRIPE_SOVEREIGN_ANNUAL_ID || 'price_sovereign_a'
            },
            sovereignVault: {
                price: 2997,
                id: process.env.STRIPE_VAULT_PRICE_ID || 'price_1SleiiJZzJ2JsTizVault'
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

        const practiceMonthly = findPrice('Practitioner', 'month');
        const practiceAnnual = findPrice('Practitioner', 'year');
        const directorMonthly = findPrice('Director', 'month');
        const directorAnnual = findPrice('Director', 'year');
        const siteMonthly = findPrice('Site Command', 'month');
        const siteAnnual = findPrice('Site Command', 'year');
        const sovereignMonthly = findPrice('Professional Pack', 'month');
        const sovereignAnnual = findPrice('Professional Pack', 'year');
        const vault = findPrice('Vault', null);

        return {
            practitioner: {
                monthly: practiceMonthly?.unit_amount ? practiceMonthly.unit_amount / 100 : 49.99,
                annual: practiceAnnual?.unit_amount ? practiceAnnual.unit_amount / 100 : 44.99,
                id: practiceMonthly?.id || 'price_practice_m',
                annualId: practiceAnnual?.id || 'price_practice_a'
            },
            director: {
                monthly: directorMonthly?.unit_amount ? directorMonthly.unit_amount / 100 : 69.99,
                annual: directorAnnual?.unit_amount ? directorAnnual.unit_amount / 100 : 59.99,
                id: directorMonthly?.id || 'price_director_m',
                annualId: directorAnnual?.id || 'price_director_a'
            },
            siteCommand: {
                monthly: siteMonthly?.unit_amount ? siteMonthly.unit_amount / 100 : 79.99,
                annual: siteAnnual?.unit_amount ? siteAnnual.unit_amount / 100 : 69.99,
                id: siteMonthly?.id || 'price_site_m',
                annualId: siteAnnual?.id || 'price_site_a'
            },
            sovereign: {
                monthly: sovereignMonthly?.unit_amount ? sovereignMonthly.unit_amount / 100 : 39.99,
                annual: sovereignAnnual?.unit_amount ? sovereignAnnual.unit_amount / 100 : 34.99,
                id: sovereignMonthly?.id || 'price_sovereign_m',
                annualId: sovereignAnnual?.id || 'price_sovereign_a'
            },
            sovereignVault: {
                price: vault?.unit_amount ? vault.unit_amount / 100 : 2997,
                id: vault?.id || 'price_vault'
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
            success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/pricing`,
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
