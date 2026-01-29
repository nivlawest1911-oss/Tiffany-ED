import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

const PRICE_IDS = {
    pro_monthly: process.env.STRIPE_PRO_PRICE_ID || 'price_pro_tier_19',
    pro_annual: process.env.STRIPE_PRO_ANNUAL_ID || 'price_pro_tier_annual_190',
    credits: process.env.STRIPE_CREDITS_PRICE_ID || 'price_credit_pack_5'
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, plan, name, isAnnual } = body;

        let priceId;
        let mode: 'subscription' | 'payment' = 'subscription';

        if (plan === 'pro' || plan === 'master_teacher') {
            priceId = isAnnual ? PRICE_IDS.pro_annual : PRICE_IDS.pro_monthly;
            mode = 'subscription';
        } else if (plan === 'credits' || plan === 'tokens') {
            priceId = PRICE_IDS.credits;
            mode = 'payment';
        } else {
            return NextResponse.json({ error: 'Invalid or custom plan selected. Please contact sales for Campus plans.' }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: mode,
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
            customer_email: email,
            metadata: {
                name: name,
                plan: plan,
                env: process.env.NODE_ENV
            }
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
