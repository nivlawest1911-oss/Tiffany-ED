import Stripe from 'stripe';

// Initialize Stripe with your secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key_for_build', {
    // @ts-ignore - Stripe types might be ahead/behind
    apiVersion: '2023-10-16',
    typescript: true,
});

// Pricing plans configuration
export const PRICING_PLANS = {
    starter: {
        name: 'EdIntel Starter',
        sku: 'novice_educator',
        price: 0,
        priceId: null,
        description: 'Basic AI tools for individual teachers exploring AI.',
        features: [
            'Basic Chat Agents',
            '5 AI Lesson Plans / mo',
            '1GB Secure Storage',
            'Standard AI Model (Flash)',
            'Community Support'
        ],
        metadata: {
            ai_model: "Standard",
            lesson_plans: "5",
            agents: "Basic"
        }
    },
    pro: {
        name: 'EdIntel Pro',
        sku: 'master_teacher',
        price: 19.00,
        priceId: process.env.STRIPE_PRO_PRICE_ID || 'price_pro_tier_19',
        description: 'Full AI suite with image generation, grading agents, and analytics.',
        features: [
            'Unlimited Lesson Plans',
            'Full Agent Access (IEP Writer, Grader)',
            '50 AI Images / mo',
            '5 mins AI Video / mo',
            'Export to PDF/Word/Slides',
            'Advanced Model (GPT-4/Gemini Pro)'
        ],
        metadata: {
            ai_model: "Advanced",
            lesson_plans: "Unlimited",
            image_generation: "50",
            video_generation: "5",
            agents: "Full"
        }
    },
    campus: {
        name: 'EdIntel Campus',
        sku: 'district_admin',
        price: 'Custom',
        priceId: process.env.STRIPE_CAMPUS_PRICE_ID || 'price_campus_custom',
        description: 'For schools/districts. Includes admin dashboard & SSO.',
        features: [
            'Volume Pricing ($15/seat for 10+)',
            'SSO Enabled',
            'Admin Analytics Dashboard',
            'FERPA/COPPA Compliance Signed',
            'Priority Support'
        ],
        metadata: {
            sso: "Enabled",
            admin_dashboard: "Enabled",
            privacy_compliance: "FERPA/COPPA"
        }
    },
    credits: {
        name: 'AI Credits Pack',
        sku: 'usage_credits',
        price: 5.00,
        unitAmount: 500,
        priceId: process.env.STRIPE_CREDITS_PRICE_ID || 'price_credit_pack_5',
        description: '500 Credits for expensive tasks (Video, 4K Images).',
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
                price: PRICING_PLANS.credits.priceId,
                quantity: quantity,
            },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        client_reference_id: userId,
        metadata: {
            userId,
            orgId: userId, // Assuming userId acts as orgId in this context if orgId is missing
            tokenAmount: quantity.toString(),
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
