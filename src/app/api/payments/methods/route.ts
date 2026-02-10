/**
 * EdIntel EdIntel - Payment Methods API
 * Get all available payment methods with capabilities
 */

import { NextResponse } from 'next/server';
import { initUnifiedPayments } from '@/lib/payments/unified';

export async function GET() {
    try {
        // Initialize payment service
        const paymentService = initUnifiedPayments();

        // Get available payment methods
        const methods = paymentService.getAvailablePaymentMethods();

        return NextResponse.json({ methods });
    } catch (error) {
        console.error('Payment methods fetch error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch payment methods' },
            { status: 500 }
        );
    }
}
