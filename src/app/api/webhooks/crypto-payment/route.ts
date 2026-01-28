/**
 * EdIntel SOVEREIGN - Crypto Payment Webhook Handler
 * Processes cryptocurrency payment confirmations
 */

import { NextRequest, NextResponse } from 'next/server';
import { initCryptoPayments } from '@/lib/payments/crypto';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const signature = request.headers.get('x-nowpayments-sig') || '';
        const body = await request.text();

        // Initialize crypto payment service
        const cryptoService = initCryptoPayments();

        // Verify webhook signature for security
        const isValid = cryptoService.verifyWebhookSignature(body, signature);

        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid signature' },
                { status: 401 }
            );
        }

        // Parse webhook payload
        const payload = JSON.parse(body);

        // Handle different payment statuses
        switch (payload.payment_status) {
            case 'finished':
                // Payment completed successfully
                await handlePaymentSuccess(payload);
                break;

            case 'confirmed':
                // Payment confirmed on blockchain
                await handlePaymentConfirmed(payload);
                break;

            case 'failed':
            case 'expired':
            case 'refunded':
                // Payment failed or cancelled
                await handlePaymentFailed(payload);
                break;

            default:
                // Payment in progress
                console.log('Payment status update:', payload.payment_status);
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Webhook processing error:', error);
        return NextResponse.json(
            { error: 'Webhook processing failed' },
            { status: 500 }
        );
    }
}

async function handlePaymentSuccess(payload: any) {
    console.log('Payment successful:', payload);

    try {
        // 1. Recover userId from order_id
        // Format: EDINTEL:{userId}:{timestamp}
        const orderIdParts = payload.order_id?.split(':');

        if (!orderIdParts || orderIdParts.length < 2) {
            console.error('Invalid order_id format:', payload.order_id);
            return;
        }

        const userId = orderIdParts[1];
        const amount = parseFloat(payload.price_amount || payload.pay_amount || '0');
        const description = payload.order_description?.toLowerCase() || '';

        // 2. Determine Subscription Tier
        let tier = 'professional'; // Default fallback

        if (description.includes('director') || amount >= 69) {
            tier = 'director';
        } else if (description.includes('site') || description.includes('command') || amount >= 79) {
            tier = 'site_command';
        } else if (description.includes('initiate')) {
            tier = 'initiate';
        } else {
            tier = 'practitioner';
        }

        console.log(`Activating ${tier} subscription for user ${userId}`);

        // 3. Update User Subscription in Database
        // @ts-ignore
        const user = await prisma.user.update({
            where: { id: userId },
            data: {
                subscriptionTier: tier,
                subscriptionStatus: 'active',
                // Add bonus tokens for crypto payment
                tokensRemaining: {
                    increment: 50
                },
                // Award XP for "Early Adopter" behavior
                xpPoints: {
                    increment: 500
                }
            }
        });

        console.log('User subscription updated successfully:', user.id);

        // 4. Send confirmation email (placeholder)
        // await sendEmail({ to: user.email, subject: 'Payment Confirmed', ... })

    } catch (error) {
        console.error('Error handling payment success:', error);
        // Don't throw, so we still return 200 to webhook sender
    }
}

async function handlePaymentConfirmed(payload: any) {
    console.log('Payment confirmed on blockchain:', payload);
    // This is often a secondary confirmation after 'finished'
    // We can use this to double-verify or unlock higher-value features
    // For now, treat same as success but idempotent
    await handlePaymentSuccess(payload);
}

async function handlePaymentFailed(payload: any) {
    console.log('Payment failed:', payload);
    // We could log this to an analytics service or notify the user
    // if we had a realtime channel open
}
