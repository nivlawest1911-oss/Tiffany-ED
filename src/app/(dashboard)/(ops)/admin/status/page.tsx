import { cookies } from 'next/headers';
import StatusClient from './StatusClient';

export const dynamic = 'force-dynamic';

export default async function StatusPage() {
    await cookies(); // Force dynamic rendering
    return <StatusClient />;
}
