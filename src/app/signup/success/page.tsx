import React from 'react';
import { cookies } from 'next/headers';
import PaymentSuccessClient from '@/app/payment/success/PaymentSuccessClient';

export const dynamic = 'force-dynamic';

export default async function SignupSuccessPage() {
    await cookies(); // Force dynamic to ensure lambda tracing
    return <PaymentSuccessClient />;
}
