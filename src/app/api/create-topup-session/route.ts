
import { NextResponse } from 'next/server';
import { createTopupSession } from '@/lib/stripe';

// POST /api/create-topup-session
// Generates a Stripe checkout session for "Intelligence Injection" (Token Top-up)
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, quantity = 1 } = body;

        console.log(`[PROFESSIONAL PAYMENT] Initializing Real Capital Injection for User: ${userId}, Quantity: ${quantity}`);

        // Base URL for redirects
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

        // Create real Stripe session
        const session = await createTopupSession(
            userId || 'anonymous_professional',
            quantity,
            `${baseUrl}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
            `${baseUrl}/dashboard?canceled=true`
        );

        if (!session.url) {
            throw new Error('Failed to generate session URL');
        }

        return NextResponse.json({
            url: session.url,
            success: true,
            message: "Capital Injection Channel Opened"
        });

    } catch (error: any) {
        console.error("[PROFESSIONAL PAYMENT ERROR]", error);
        return NextResponse.json({
            error: "Failed to initialize payment channel",
            details: error.message
        }, { status: 500 });
    }
}
