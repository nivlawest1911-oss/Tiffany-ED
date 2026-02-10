/**
 * EdIntel Professional - Stripe Webhook Handler
 * Processes payment confirmations and updates ledger
 * 
 * POST /api/tokens/webhook
 * Handles Stripe webhook events for token purchases
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { sql } from '@vercel/postgres';
import { headers } from 'next/headers';

const stripeInit = () => {
    if (!process.env.STRIPE_SECRET_KEY) {
        throw new Error('STRIPE_SECRET_KEY is missing');
    }
    return new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2025-12-15.clover' as any,
    });
};

export async function POST(request: NextRequest) {
    try {
        const stripe = stripeInit();
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

        if (!webhookSecret) {
            console.error('STRIPE_WEBHOOK_SECRET is missing');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        const body = await request.text();
        const headersList = await headers();
        const signature = headersList.get('stripe-signature');

        if (!signature) {
            return NextResponse.json(
                { error: 'No signature provided' },
                { status: 400 }
            );
        }

        // Verify webhook signature
        let event: Stripe.Event;
        try {
            event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
        } catch (err: any) {
            console.error('Webhook signature verification failed:', err.message);
            return NextResponse.json(
                { error: `Webhook Error: ${err.message}` },
                { status: 400 }
            );
        }

        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded':
                await handlePaymentSuccess(event.data.object as Stripe.PaymentIntent);
                break;

            case 'payment_intent.payment_failed':
                await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
                break;

            case 'charge.refunded':
                await handleRefund(event.data.object as Stripe.Charge);
                break;

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });
    } catch (error: any) {
        console.error('Webhook processing error:', error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}

/**
 * Handle successful payment
 * Completes purchase and adds tokens to ledger
 */
async function handlePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
    const { id: paymentIntentId } = paymentIntent;
    const chargeId = paymentIntent.latest_charge as string;

    console.log(`✅ Payment succeeded: ${paymentIntentId}`);

    try {
        // Get purchase record
        const { rows: purchases } = await sql`
      SELECT id, user_id, tokens_purchased, bonus_tokens, status
      FROM token_purchases
      WHERE stripe_payment_intent_id = ${paymentIntentId}
    `;

        if (purchases.length === 0) {
            console.error(`Purchase not found for payment intent: ${paymentIntentId}`);
            return;
        }

        const purchase = purchases[0];

        // Prevent double-processing
        if (purchase.status === 'completed') {
            console.log(`Purchase ${purchase.id} already completed`);
            return;
        }

        // Update purchase status to processing
        await sql`
      UPDATE token_purchases
      SET status = 'processing'
      WHERE id = ${purchase.id}
    `;

        // Complete the purchase using the stored procedure
        // This will update the ledger and balance automatically
        await sql`
      SELECT complete_token_purchase(${purchase.id}, ${chargeId})
    `;

        console.log(`🎉 Purchase ${purchase.id} completed successfully`);
        console.log(`💰 Added ${purchase.tokens_purchased + purchase.bonus_tokens} tokens to user ${purchase.user_id}`);

        // Optional: Send confirmation email or notification
        // await sendPurchaseConfirmationEmail(purchase.user_id, purchase.id);

    } catch (error: any) {
        console.error('Error processing payment success:', error);

        // Rollback to pending if processing failed
        await sql`
      UPDATE token_purchases
      SET status = 'pending',
          metadata = metadata || jsonb_build_object('error', ${error.message})
      WHERE stripe_payment_intent_id = ${paymentIntentId}
    `;

        throw error;
    }
}

/**
 * Handle failed payment
 */
async function handlePaymentFailed(paymentIntent: Stripe.PaymentIntent) {
    const { id: paymentIntentId } = paymentIntent;

    console.log(`❌ Payment failed: ${paymentIntentId}`);

    try {
        await sql`
      UPDATE token_purchases
      SET status = 'failed',
          metadata = metadata || jsonb_build_object(
            'failure_code', ${paymentIntent.last_payment_error?.code || 'unknown'},
            'failure_message', ${paymentIntent.last_payment_error?.message || 'Payment failed'}
          )
      WHERE stripe_payment_intent_id = ${paymentIntentId}
    `;
    } catch (error: any) {
        console.error('Error processing payment failure:', error);
    }
}

/**
 * Handle refund
 * Deducts tokens from ledger
 */
async function handleRefund(charge: Stripe.Charge) {
    const chargeId = charge.id;
    const refundReason = charge.refunds?.data[0]?.reason || 'Customer request';

    console.log(`🔄 Refund processed: ${chargeId}`);

    try {
        // Find the purchase by charge ID
        const { rows: purchases } = await sql`
      SELECT id, user_id, status
      FROM token_purchases
      WHERE stripe_charge_id = ${chargeId}
    `;

        if (purchases.length === 0) {
            console.error(`Purchase not found for charge: ${chargeId}`);
            return;
        }

        const purchase = purchases[0];

        // Only process refunds for completed purchases
        if (purchase.status !== 'completed') {
            console.log(`Purchase ${purchase.id} not completed, skipping refund`);
            return;
        }

        // Process refund using stored procedure
        await sql`
      SELECT refund_token_purchase(${purchase.id}, ${refundReason})
    `;

        console.log(`✅ Refund processed for purchase ${purchase.id}`);

    } catch (error: any) {
        console.error('Error processing refund:', error);
        throw error;
    }
}
