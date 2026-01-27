import { cookies } from 'next/headers';
import PaymentCancelClient from './PaymentCancelClient';

export const dynamic = 'force-dynamic';

export default async function PaymentCancelPage() {
    await cookies(); // Force dynamic rendering
    return <PaymentCancelClient />;
}
