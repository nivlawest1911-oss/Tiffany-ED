import Stripe from 'stripe';

// Initialize Stripe with your secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key_for_build', {
    // @ts-ignore - Stripe types might be ahead/behind
    apiVersion: '2023-10-16',
    typescript: true,
});

// Pricing plans configuration
export const PRICING_PLANS = {
    free: {
        name: 'Free',
        price: 0,
        priceId: null,
        features: [
            '5 AI generations per month',
            'Basic templates',
            'Community support',
            'Email support',
        ],
    },
    professional: {
        name: 'Professional',
        price: 39.99,
        priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID,
        features: [
            'Unlimited AI generations',
            'All 70+ specialized tools',
            'Priority email support',
            'Advanced templates',
            'Export to PDF/Word',
            'FERPA-compliant storage',
        ],
    },
    enterprise: {
        name: 'Enterprise',
        price: null, // Custom pricing
        priceId: null,
        features: [
            'Everything in Professional',
            'Dedicated account manager',
            'Custom training sessions',
            'White-glove onboarding',
            'Priority phone support',
            'Custom integrations',
            'SSO integration',
            'Advanced analytics',
        ],
    },
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
            source: 'EdIntel Sovereign App'
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
