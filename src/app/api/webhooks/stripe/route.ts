import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
        return NextResponse.json({ error: 'Stripe credentials missing' }, { status: 500 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-10-28' as any });

    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const signature = req.headers.get('Stripe-Signature')!;

    if (!signature) {
        return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }

    const bodyBuffer = await req.arrayBuffer();
    const body = Buffer.from(bodyBuffer);

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err: any) {
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // The "EdIntel" Event: When a checkout link is successfully finished
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        // We update the user profile in Supabase based on their email or client_reference_id
        const { error } = await supabaseAdmin
            .from('profiles')
            .update({
                subscription_tier: session.metadata?.plan_name || 'Standard Pack',
                stripe_customer_id: session.customer as string,
                trial_active: true,
                trial_end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
            })
            .eq('email', session.customer_details?.email);

        if (error) {
            console.error('Supabase Update Error:', error);
            return NextResponse.json({ error: 'Supabase Update Failed' }, { status: 500 });
        }
    }

    return NextResponse.json({ received: true });
}
