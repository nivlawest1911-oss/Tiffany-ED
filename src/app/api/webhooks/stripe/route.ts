
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

// Initialize the Stripe client strictly
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16', // Always lock your Stripe API version to prevent unrequested changes
    typescript: true,
});

export async function POST(req: Request) {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
        // 1. Verify the message is actually from Stripe and not a malicious bot
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
                // 4. Safely create or update the user in Prisma
                await prisma.user.upsert({
                    where: { email: customerEmail },
                    update: {
                        tierId: tier.id,
                        isActive: true, // Reactivate if they were inactive
                        // You can optionally reset or add tokens upon subscription start
                    },
                    create: {
                        email: customerEmail,
                        name: session.customer_details?.name || 'Authorized Personnel',
                        tierId: tier.id,
                        usageTokens: 50, // Initialize their token economy securely
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
