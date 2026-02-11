import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY
    ? new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2023-10-16' as any,
    })
    : null;

export async function POST(request: NextRequest) {
    try {
        if (!stripe) {
            return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
        }

        // In a real app, get the authenticated user's email or customer ID
        // For now, we'll try to find a customer by email or use a test customer
        // This should be replaced with real auth logic (e.g., Supabase or NextAuth)

        // Mocking user email for now - in production, this comes from the session
        const userEmail = 'alvin.west@edintel.ai';

        const customers = await stripe.customers.list({
            email: userEmail,
            limit: 1,
        });

        let customerId: string;

        if (customers.data.length > 0) {
            customerId = customers.data[0].id;
        } else {
            // If no customer exists, we can't open the portal easily without a subscription
            // or we create a new one. For the portal, they usually need to be a customer.
            return NextResponse.json({ error: 'No Stripe customer found for this user.' }, { status: 404 });
        }

        const host = request.headers.get('host');
        const protocol = host?.includes('localhost') ? 'http' : 'https';
        const origin = `${protocol}://${host}`;

        const session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${origin}/profile`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('[STRIPE PORTAL ERROR]', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
