import { cookies } from 'next/headers';
import TestMediaClient from './TestMediaClient';

export const dynamic = 'force-dynamic';

export default async function TestMediaPage() {
    await cookies(); // Force dynamic rendering
    return <TestMediaClient />;
}
