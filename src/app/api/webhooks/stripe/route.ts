
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

// Lazily initialize the Stripe client to avoid build-time crashes
// when STRIPE_SECRET_KEY is not available during static page collection.
function getStripe() {
    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    return new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-12-15.clover' as any,
        typescript: true,
    });
}

export async function POST(req: Request) {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
        // 1. Verify the message is actually from Stripe and not a malicious bot
        const stripe = getStripe();
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    // 2. Handle the specific event when a user completes the checkout
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;

        // Retrieve the customer email and the specific tier they chose
        const customerEmail = session.customer_details?.email;

        // In Stripe, you can pass "metadata" in your payment links to identify the tier
        const tierName = session.metadata?.tierName || 'Standard Pack';

        if (customerEmail) {
            // 3. Look up the Tier ID in your database
            const tier = await prisma.tier.findUnique({
                where: { name: tierName }
            });

            if (tier) {
                // Determine initial tokens based on the 6 tiers
                let initialTokens = 50; // default for Standard Pack or Initiate
                if (tier.name === 'Site Command') initialTokens = 10000;
                else if (tier.name === 'Director Pack') initialTokens = 5000;
                else if (tier.name === 'Practitioner') initialTokens = 3000;
                else if (tier.name === 'Sovereign Pack') initialTokens = 1500;

                // Create a fallback clerkId in case user doesn't exist yet via standard auth
                const fallbackClerkId = `stripe_pending_${crypto.randomUUID()}`;

                // 4. Safely create or update the user in Prisma
                await prisma.user.upsert({
                    where: { email: customerEmail },
                    update: {
                        tierId: tier.id,
                        subscriptionTier: tier.name, // Sync the tier name for useAccess
                        isActive: true, // Reactivate if they were inactive
                        usageTokens: {
                            increment: initialTokens // Grant tokens upon subscription/upgrade
                        }
                    },
                    create: {
                        email: customerEmail,
                        clerkId: fallbackClerkId,
                        name: session.customer_details?.name || 'Authorized Personnel',
                        tierId: tier.id,
                        subscriptionTier: tier.name, // Sync the tier name
                        usageTokens: initialTokens,  // Initialize mapped tokens
                        isActive: true,
                    }
                });
            } else {
                console.error(`Webhook Warning: Tier '${tierName}' not found for user ${customerEmail}`);
            }
        }
    }

    // 5. Tell Stripe the message was received successfully
    return new NextResponse('Webhook processed', { status: 200 });
}
