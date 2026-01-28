import { loadStripe } from '@stripe/stripe-js';

export async function createTokenCheckout(orgId: string, tokenAmount: number, priceInCents: number) {
    try {
        const response = await fetch('/api/checkout_sessions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                orgId,
                tokenAmount,
                priceInCents,
                tierName: "School Site Usage Tokens"
            }),
        });

        const session = await response.json();

        // Redirect to Stripe Checkout
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
        if (stripe) {
            const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
            if (error) {
                console.error("Stripe Redirect Error:", error);
            }
        }
    } catch (error) {
        console.error("Stripe Checkout Session Error:", error);
    }
}
