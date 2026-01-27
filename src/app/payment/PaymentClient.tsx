'use client';

/**
 * EdIntel SOVEREIGN - Payment Page
 * Universal payment processing for all subscription tiers
 */

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import UniversalPaymentHub from '@/components/UniversalPaymentHub';
import { useAuth } from '@/context/AuthContext';

function PaymentContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user, isLoading } = useAuth();

    // Protect route - require authentication
    useEffect(() => {
        if (!isLoading && !user) {
            // Encode current params to return here after login
            const params = new URLSearchParams(searchParams.toString());
            router.push(`/login?redirect=${encodeURIComponent(`/payment?${params.toString()}`)}`);
        }
    }, [user, isLoading, router, searchParams]);

    // Show loading state while checking auth
    if (isLoading || !user) {
        return <div className="flex justify-center items-center h-screen bg-transparent"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>;
    }

    // Get parameters from URL
    const amountParam = searchParams.get('amount');
    const descriptionParam = searchParams.get('description');
    const planParam = searchParams.get('plan');

    // Determine defaults based on plan
    let defaultAmount = 49.99;
    let defaultDesc = 'Professional Practitioner';

    if (planParam === 'director') {
        defaultAmount = 69.99;
        defaultDesc = 'Director Pack';
    } else if (planParam === 'site_command') {
        defaultAmount = 79.99;
        defaultDesc = 'Site Command';
    } else if (planParam === 'sovereign') {
        defaultAmount = 39.99;
        defaultDesc = 'Sovereign Professional';
    }

    const amount = amountParam ? parseFloat(amountParam) : defaultAmount;
    const description = descriptionParam || defaultDesc;
    const userId = user?.id || searchParams.get('userId') || 'guest_user';
    const email = user?.email || searchParams.get('email') || 'guest@example.com';

    return (
        <UniversalPaymentHub
            amount={amount}
            description={description}
            userId={userId}
            customerEmail={email}
            onSuccess={(paymentId) => {
                console.log('Payment successful:', paymentId);
                router.push('/payment/success');
            }}
            onCancel={() => {
                router.push('/pricing');
            }}
        />
    );
}

export default function PaymentClient() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-12">
            <Suspense fallback={<div className="flex justify-center items-center h-64">Loading payment gateway...</div>}>
                <PaymentContent />
            </Suspense>
        </div>
    );
}
