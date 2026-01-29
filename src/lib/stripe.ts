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
        name: 'School Site Pro',
        sku: 'school_site_license',
        price: 79.00,
        priceId: process.env.STRIPE_PRO_PRICE_ID || 'price_school_site_pro_79',
        description: 'Complete Site License for Mobile County Schools. Includes 30-Day Full Access Trial.',
        features: [
            'Unlimited Teacher Accounts',
            'Full Agent Access (IEP, Grader, Behavior)',
            'Unlimited AI Lesson Plans',
            'Priority District Support',
            'FERPA/COPPA Compliant',
            'Advanced Model (GPT-4/Gemini Pro)'
        ],
        metadata: {
            ai_model: "Advanced",
            license_type: "Site License",
            trial: "30 Days",
            district: "Mobile County Schools"
        }
    },
    campus: {
        name: 'EdIntel Campus',
        sku: 'district_admin',
        price: 'Custom',
        priceId: process.env.STRIPE_CAMPUS_PRICE_ID || 'price_campus_custom',
        description: 'For Multi-School Deployments. Includes Central Dashboard.',
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
    token_tiers: {
        starter: {
            name: 'Token Refill: Starter',
            price: 12.00,
            amount: 1000,
            priceId: process.env.STRIPE_TOKEN_STARTER_ID || 'price_token_1k_12',
            description: '1,000 Tokens for essential tasks.'
        },
        pro: {
            name: 'Token Refill: Growth',
            price: 49.00,
            amount: 5000,
            priceId: process.env.STRIPE_TOKEN_GROWTH_ID || 'price_token_5k_49',
            description: '5,000 Tokens for heavy media generation.'
        },
        elite: {
            name: 'Token Refill: Elite',
            price: 99.00,
            amount: 15000,
            priceId: process.env.STRIPE_TOKEN_ELITE_ID || 'price_token_15k_99',
            description: '15,000 Tokens for district-wide usage.'
        }
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
        subscription_data: {
            trial_period_days: 30,
            metadata: {
                userId,
                source: "EdIntel Site License"
            }
        },
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
            source: 'EdIntel Professional App',
            district_target: 'Mobile County Schools'
        },
    });

    return session;
}

/**
 * Creates a one-time checkout session for Intelligence Capital (Tokens)
 */
export async function createTopupSession(
    userId: string,
    priceId: string, // Changed from quantity logic to direct priceId
    successUrl: string,
    cancelUrl: string
) {
    const session = await stripe.checkout.sessions.create({
        mode: 'payment', // One-time payment
        payment_method_types: ['card'],
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        client_reference_id: userId,
        metadata: {
            userId,
            orgId: userId, // Assuming userId acts as orgId in this context if orgId is missing
            type: 'token_topup',
            source: 'Quantum Studio Token Wallet'
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
