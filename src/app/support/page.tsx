import { cookies } from 'next/headers';
import SupportClient from './SupportClient';

export const dynamic = 'force-dynamic';

export default async function SupportPage() {
    await cookies(); // Force dynamic rendering
    return <SupportClient />;
}
