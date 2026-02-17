import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
    apiVersion: '2023-10-16' as any,
});

export async function POST(req: Request) {
    try {
        const { orgId, tokenAmount, priceInCents, tierName } = await req.json();

        if (!priceInCents || priceInCents < 50) {
            throw new Error("Invalid Price: Payment amount is too low.");
        }
        if (!tokenAmount || tokenAmount <= 0) {
            throw new Error("Invalid Token Amount.");
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: tierName || 'EdIntel AI Tokens',
                            description: `Strategic refill for ${tokenAmount} Neural Sync Tokens.`,
                        },
                        unit_amount: priceInCents,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            metadata: {
                orgId: orgId,
                tokenAmount: tokenAmount.toString(),
                tierName: tierName || 'SCHOOL_SITE',
            },
            success_url: `${req.headers.get('origin')}/dashboard?payment=success&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.get('origin')}/dashboard?payment=cancelled`,
        });

        return NextResponse.json({ id: session.id });
    } catch (err: any) {
        console.error("Stripe Session Creation Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
