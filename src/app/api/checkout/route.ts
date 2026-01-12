import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

const PRICE_IDS = {
    pro_monthly: 'price_1SleigJZzJ2JsTizzhcHtd36',
    site_command_monthly: 'price_1SleihJZzJ2JsTizmaXKM4ow'
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, plan, name, isAnnual } = body;

        let priceId;

        if (plan === 'pro') {
            priceId = PRICE_IDS.pro_monthly;
        } else if (plan === 'site_command') {
            priceId = PRICE_IDS.site_command_monthly;
        } else {
            return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
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
