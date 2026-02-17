import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'sonner';

export async function createTokenCheckout(orgId: string, tokenAmount: number, priceInCents: number, signal?: AbortSignal) {
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
            signal
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Stripe checkout failed (${response.status}): ${text.substring(0, 100)}`);
        }

        const session = await response.json() as { id: string };

        if (!session?.id) {
            throw new Error("Invalid checkout session created (No Session ID)");
        }

        // Redirect to Stripe Checkout
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
        if (stripe) {
            const { error } = await (stripe as any).redirectToCheckout({ sessionId: session.id });
            if (error) {
                console.error("Stripe Redirect Error:", error);
            }
        }
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            console.log('Stripe checkout cancelled');
            return;
        }
        console.error("Stripe Checkout Session Error:", error);
        toast.error("Checkout initialization failed. Please try again or support@edintel.io");
    }
}
