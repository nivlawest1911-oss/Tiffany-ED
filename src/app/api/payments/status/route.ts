/**
 * EdIntel SOVEREIGN - Payment Status API
 * Check payment status for any payment method
 */

import { NextRequest, NextResponse } from 'next/server';
import { initUnifiedPayments } from '@/lib/payments/unified';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const paymentId = searchParams.get('paymentId');
        const method = searchParams.get('method');

        if (!paymentId || !method) {
            return NextResponse.json(
                { error: 'Missing paymentId or method' },
                { status: 400 }
            );
        }

        // Initialize payment service
        const paymentService = initUnifiedPayments();

        // Get payment status
        const status = await paymentService.getPaymentStatus(paymentId, method as any);

        return NextResponse.json(status);
    } catch (error) {
        console.error('Payment status check error:', error);
        return NextResponse.json(
            { error: 'Failed to check payment status' },
            { status: 500 }
        );
    }
}
