import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

const PRICE_IDS = {
    practitioner_monthly: process.env.STRIPE_PRACTITIONER_PRICE_ID || 'price_1SleigJZzJ2JsTizzhcHtd36',
    practitioner_annual: process.env.STRIPE_PRACTITIONER_ANNUAL_ID || 'price_1SleigJZzJ2JsTizAnnual',
    director_monthly: process.env.STRIPE_DIRECTOR_PRICE_ID || 'price_director_m',
    director_annual: process.env.STRIPE_DIRECTOR_ANNUAL_ID || 'price_director_a',
    site_command_monthly: process.env.STRIPE_SITE_COMMAND_PRICE_ID || 'price_1SleihJZzJ2JsTizmaXKM4ow',
    site_command_annual: process.env.STRIPE_SITE_COMMAND_ANNUAL_ID || 'price_1SleihJZzJ2JsTizAnnual'
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, plan, name, isAnnual } = body;

        let priceId;
        const billingType = isAnnual ? 'annual' : 'monthly';

        if (plan === 'pro' || plan === 'practitioner') {
            priceId = isAnnual ? PRICE_IDS.practitioner_annual : PRICE_IDS.practitioner_monthly;
        } else if (plan === 'director') {
            priceId = isAnnual ? PRICE_IDS.director_annual : PRICE_IDS.director_monthly;
        } else if (plan === 'enterprise' || plan === 'site_command') {
            priceId = isAnnual ? PRICE_IDS.site_command_annual : PRICE_IDS.site_command_monthly;
        } else {
            return NextResponse.json({ error: 'Invalid plan configuration selected.' }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/signup`,
            customer_email: email,
            metadata: {
                name: name, //Store name to create user later if needed
                plan: plan
            }
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
