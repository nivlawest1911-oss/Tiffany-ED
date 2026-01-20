import Stripe from 'stripe';

// Initialize Stripe with your secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key_for_build', {
    // @ts-ignore - Stripe types might be ahead/behind
    apiVersion: '2023-10-16',
    typescript: true,
});

// Pricing plans configuration
export const PRICING_PLANS = {
    initiate: {
        name: 'Initiate',
        price: 0,
        priceId: null,
        features: [
            '5 AI generations per month',
            'Basic templates',
            'Community support',
        ],
    },
    practitioner: {
        name: 'Practitioner',
        price: 49.99,
        priceId: process.env.STRIPE_PRACTITIONER_PRICE_ID || 'price_1SleigJZzJ2JsTizzhcHtd36',
        features: [
            'Unlimited AI generations',
            'All 70+ specialized tools',
            'Priority email support',
            'Export to PDF/Word',
            'FERPA-compliant storage',
        ],
    },
    director: {
        name: 'Director Pack',
        price: 69.99,
        priceId: process.env.STRIPE_DIRECTOR_PRICE_ID || 'price_director_m',
        features: [
            'Everything in Practitioner',
            'Advanced Leadership Modules',
            'Staff Retention Analytics',
            'Classroom Obs Synthesizer',
            'Strategic Briefing Console',
        ],
    },
    siteCommand: {
        name: 'Site Command',
        price: 79.99,
        priceId: process.env.STRIPE_SITE_COMMAND_PRICE_ID || 'price_1SleihJZzJ2JsTizmaXKM4ow',
        features: [
            'Everything in Director Pack',
            '10 User Licenses',
            'Building ROI Dashboard',
            'Priority Implementation Support',
            'Strategic Link API Access',
        ],
    },
    tokens: {
        unitPrice: 0.50, // 50 cents per token
        priceId: process.env.STRIPE_TOKEN_PRICE_ID || 'price_1SleijJZzJ2JsTizToken1K',
    }
};

// Create checkout session
export async function createCheckoutSession(
    priceId: string,
    userId: string,
    successUrl: string,
    cancelUrl: string
) {
    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        consent_collection: {
            terms_of_service: 'required',
        },
        phone_number_collection: {
            enabled: true,
        },
        allow_promotion_codes: true,
        client_reference_id: userId,
        metadata: {
            userId,
            environment: process.env.NODE_ENV,
            source: 'EdIntel Professional App'
        },
    });

    return session;
}

/**
 * Creates a one-time checkout session for Intelligence Capital (Tokens)
 */
export async function createTopupSession(
    userId: string,
    quantity: number,
    successUrl: string,
    cancelUrl: string
) {
    const session = await stripe.checkout.sessions.create({
        mode: 'payment', // One-time payment
        payment_method_types: ['card'],
        line_items: [
            {
                price: PRICING_PLANS.tokens.priceId,
                quantity: quantity,
            },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        client_reference_id: userId,
        metadata: {
            userId,
            tokenQuantity: quantity.toString(),
            type: 'token_topup',
            source: 'Professional Delegate Console'
        },
    });

    return session;
}

// Create customer portal session
export async function createCustomerPortalSession(
    customerId: string,
    returnUrl: string
) {
    const session = await stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
    });

    return session;
}

// Verify webhook signature
export function verifyWebhookSignature(
    payload: string | Buffer,
    signature: string
): Stripe.Event {
    return stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
    );
}

// Get subscription status
export async function getSubscriptionStatus(customerId: string) {
    const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: 'active',
        limit: 1,
    });

    return subscriptions.data[0] || null;
}

// Cancel subscription
export async function cancelSubscription(subscriptionId: string) {
    return await stripe.subscriptions.cancel(subscriptionId);
}

// Update subscription
export async function updateSubscription(
    subscriptionId: string,
    newPriceId: string
) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    return await stripe.subscriptions.update(subscriptionId, {
        items: [
            {
                id: subscription.items.data[0].id,
                price: newPriceId,
            },
        ],
    });
}
