import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';

export async function POST(request: NextRequest) {
    try {
        const { priceId, userId } = await request.json();

        if (!priceId || !userId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const origin = request.headers.get('origin') || 'http://localhost:3000';
        const successUrl = `${origin}/dashboard?session_id={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${origin}/pricing`;

        const session = await createCheckoutSession(
            priceId,
            userId,
            successUrl,
            cancelUrl
        );

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (error: any) {
        console.error('Stripe checkout error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
