import { cookies } from 'next/headers';
import ActivityClient from './ActivityClient';

export const dynamic = 'force-dynamic';

export default async function ActivityPage() {
    await cookies(); // Force dynamic rendering
    return <ActivityClient />;
}
