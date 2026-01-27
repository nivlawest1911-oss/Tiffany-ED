import { cookies } from 'next/headers';
import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    await cookies(); // Force dynamic rendering
    return <DashboardClient />;
}
