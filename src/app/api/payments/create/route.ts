/**
 * EdIntel SOVEREIGN - Create Payment API
 * Handles payment creation for all supported methods
 */

import { NextRequest, NextResponse } from 'next/server';
import { initUnifiedPayments } from '@/lib/payments/unified';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            amount,
            currency,
            method,
            description,
            userId,
            customerEmail,
            metadata,
            successUrl,
            cancelUrl,
        } = body;

        // Validate required fields
        if (!amount || !currency || !method || !description || !userId || !customerEmail) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Initialize payment service
        const paymentService = initUnifiedPayments();

        // Create payment
        const payment = await paymentService.createPayment({
            amount,
            currency,
            method,
            description,
            userId,
            customerEmail,
            metadata,
            successUrl,
            cancelUrl,
        });

        return NextResponse.json(payment);
    } catch (error) {
        console.error('Payment creation error:', error);
        return NextResponse.json(
            { error: 'Failed to create payment' },
            { status: 500 }
        );
    }
}
