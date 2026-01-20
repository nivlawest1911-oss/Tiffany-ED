import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2023-10-16' as any,
    })
    : null;

// Professional Pricing Structure - All Tiers
const PRICE_IDS = {
    practitioner: {
        monthly: process.env.STRIPE_PRACTITIONER_PRICE_ID || 'price_practitioner_monthly',
        annual: process.env.STRIPE_PRACTITIONER_ANNUAL_ID || 'price_practitioner_annual',
    },
    director: {
        monthly: process.env.STRIPE_DIRECTOR_PRICE_ID || 'price_director_monthly',
        annual: process.env.STRIPE_DIRECTOR_ANNUAL_ID || 'price_director_annual',
    },
    site_command: {
        monthly: process.env.STRIPE_SITE_COMMAND_PRICE_ID || 'price_site_command_monthly',
        annual: process.env.STRIPE_SITE_COMMAND_ANNUAL_ID || 'price_site_command_annual',
    },
    enterprise: {
        monthly: process.env.STRIPE_SITE_COMMAND_PRICE_ID || 'price_enterprise_monthly',
        annual: process.env.STRIPE_SITE_COMMAND_ANNUAL_ID || 'price_enterprise_annual',
    },
    tokens: process.env.STRIPE_TOKEN_PRICE_ID || 'price_tokens',
};

export async function POST(request: NextRequest) {
    try {
        const { plan, isAnnual, email, name, userId } = await request.json();

        if (!plan) {
            return NextResponse.json(
                { error: 'Plan selection required' },
                { status: 400 }
            );
        }

        if (!stripe) {
            return NextResponse.json(
                { error: 'Stripe not configured' },
                { status: 500 }
            );
        }

        // Determine price ID based on plan and billing cycle
        let priceId: string;
        const planKey = plan.toLowerCase().replace(/\s+/g, '_');

        if (planKey === 'tokens') {
            priceId = PRICE_IDS.tokens;
        } else if (PRICE_IDS[planKey as keyof typeof PRICE_IDS]) {
            const tierPrices = PRICE_IDS[planKey as keyof typeof PRICE_IDS];
            if (typeof tierPrices === 'object') {
                priceId = isAnnual ? tierPrices.annual : tierPrices.monthly;
            } else {
                priceId = tierPrices;
            }
        } else {
            return NextResponse.json(
                { error: `Invalid plan: ${plan}` },
                { status: 400 }
            );
        }

        const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'https://edintel-app.vercel.app';
        const successUrl = `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}&success=true`;
        const cancelUrl = `${origin}/pricing?canceled=true`;

        // Create Stripe checkout session with comprehensive metadata
        const session = await stripe.checkout.sessions.create({
            mode: planKey === 'tokens' ? 'payment' : 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            success_url: successUrl,
            cancel_url: cancelUrl,
            customer_email: email,
            client_reference_id: userId || email,
            metadata: {
                plan: plan,
                billing_cycle: isAnnual ? 'annual' : 'monthly',
                user_email: email,
                user_name: name || '',
                source: 'edintel_app',
                timestamp: new Date().toISOString(),
            },
            subscription_data: planKey !== 'tokens' ? {
                metadata: {
                    plan: plan,
                    tier: planKey,
                    user_email: email,
                },
            } : undefined,
            allow_promotion_codes: true,
            billing_address_collection: 'auto',
        });

        console.log(`[STRIPE] Checkout session created: ${session.id} for ${email} (${plan})`);

        return NextResponse.json({
            sessionId: session.id,
            url: session.url,
            plan: plan,
            billing: isAnnual ? 'annual' : 'monthly'
        });

    } catch (error: any) {
        console.error('[STRIPE] Checkout error:', error);
        return NextResponse.json(
            {
                error: error.message || 'Failed to create checkout session',
                details: process.env.NODE_ENV === 'development' ? error.stack : undefined
            },
            { status: 500 }
        );
    }
}
