import { cookies } from 'next/headers';
import PaymentClient from './PaymentClient';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export default async function PaymentPage() {
    await cookies(); // Force dynamic rendering
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Initializing secure payment node...</div>}>
            <PaymentClient />
        </Suspense>
    );
}
