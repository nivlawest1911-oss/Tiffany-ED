import { cookies } from 'next/headers';
import PaymentClient from './PaymentClient';

export const dynamic = 'force-dynamic';

export default async function PaymentPage() {
    await cookies(); // Force dynamic rendering
    return <PaymentClient />;
}
