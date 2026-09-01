import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { assertHumanRequest } from '@/lib/security/bot-gate';

// Lazy initialization to avoid build-time crashes when STRIPE_SECRET_KEY is absent
function getStripe() {
    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    return new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2023-10-16' as any,
    });
}

export async function POST(req: Request) {
    try {
        const gate = await assertHumanRequest(req, { routeName: 'checkout_sessions' });
        if (!gate.allowed && gate.response) {
            return gate.response;
        }
        
        const { orgId, tokenAmount, priceInCents, tierName } = await req.json();

        if (!priceInCents || priceInCents < 50) {
            return NextResponse.json({ error: 'Invalid Price: Payment amount is too low.' }, { status: 400 });
        }
        if (!tokenAmount || tokenAmount <= 0) {
            return NextResponse.json({ error: 'Invalid Token Amount.' }, { status: 400 });
        }

        const stripe = getStripe();
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
        return NextResponse.json({ error: 'Payment initialization failed' }, { status: 500 });
    }
}
