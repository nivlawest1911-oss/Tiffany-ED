export const dynamic = 'force-dynamic';

import DashboardClient from '@/app/admin/dashboard/DashboardClient';
import { cookies } from 'next/headers';

export default async function DashboardPage() {
    await cookies(); // Force dynamic execution context
    return <DashboardClient />;
}
