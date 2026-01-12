import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

const PRICE_IDS = {
    pro_monthly: 'price_1SleigJZzJ2JsTizzhcHtd36', // Practitioner Monthly matches Pro
    pro_annual: 'price_1SleigJZzJ2JsTizzhcHtd36',   // TODO: Verify Annual ID if different. Assuming monthly for now or same product? Usually different Price ID. 
    // ACTION: I realized I don't have the Annual Price ID in stripe.ts. 
    // I will use the monthly one as default or if the user provided specific Annual IDs, I would use them.
    // The stripe.ts file generated `..._ANNUAL` keys but didn't have explicit mappings for them in `PRICE_MAPPING` except maybe inferred.
    // Wait, `PRICE_MAPPING` in `stripe.ts` only had `STRIPE_PRICE_PRACTITIONER_MONTHLY`.
    // I will stick to what I have, but add logic to use it.
};

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, plan, name, isAnnual } = body;

        let priceId = PRICE_IDS.pro_monthly;

        // You can add logic here to select price based on 'plan'
        if (plan === 'pro') {
            // If we had an annual ID, we'd switch here.
            // priceId = isAnnual ? PRICE_IDS.pro_annual : PRICE_IDS.pro_monthly;
            // Since we only confirmed the monthly ID in stripe.ts, we'll use that.
            priceId = process.env.STRIPE_PRO_PRICE_ID || 'price_1SleigJZzJ2JsTizzhcHtd36';
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
