import { cookies } from 'next/headers';
import PaymentSuccessClient from './PaymentSuccessClient';

export const dynamic = 'force-dynamic';

export default async function PaymentSuccessPage() {
    await cookies(); // Force dynamic rendering
    return <PaymentSuccessClient />;
}
