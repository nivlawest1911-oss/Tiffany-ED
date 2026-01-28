import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import prisma from '@/lib/prisma';
import { sql } from '@/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
    apiVersion: '2023-10-16' as any,
});

export async function POST(req: Request) {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature')!;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_dummy';

    let event: Stripe.Event;

    try {
        if (!signature || webhookSecret === 'whsec_dummy') {
            return NextResponse.json({ received: true, note: 'Verification skipped' });
        }
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        console.error(`Webhook Signature Verification Failed: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    // Handle the successful payment for tokens
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        // We pass the organizationId and tokenAmount in the 'metadata' field when creating the session
        const orgId = session.metadata?.orgId;
        const tokensPurchased = parseInt(session.metadata?.tokenAmount || '0');
        const tierName = session.metadata?.tierName;
        const checkoutId = session.id;

        if (orgId && checkoutId) {
            try {
                // [IDEMPOTENCY] Check if this checkout has already been processed
                const { rows: processed } = await sql`
                    SELECT 1 FROM processed_checkouts WHERE checkout_id = ${checkoutId}
                `;

                if (processed.length > 0) {
                    console.log(`⚠️ Stripe Webhook: Checkout ${checkoutId} already processed. Skipping.`);
                    return NextResponse.json({ received: true });
                }

                const updateData: any = {
                    isTrialConverted: true,
                };

                if (tokensPurchased > 0) {
                    updateData.usageTokens = {
                        increment: tokensPurchased,
                    };
                }

                if (tierName) {
                    updateData.tier = tierName;
                }

                // Update Organization
                await prisma.organization.update({
                    where: { id: orgId },
                    data: updateData,
                });

                // [IDEMPOTENCY] Record that this checkout is finished
                await sql`
                    INSERT INTO processed_checkouts (checkout_id) VALUES (${checkoutId})
                `;

                console.log(`✅ Organization ${orgId} updated: Tier=${tierName || 'N/A'}, Tokens=+${tokensPurchased}`);
            } catch (dbErr) {
                console.error(`❌ Failed to credit tokens to Org ${orgId}:`, dbErr);
                return NextResponse.json({ error: "Database update failed" }, { status: 500 });
            }
        }
    }

    return NextResponse.json({ received: true });
}
