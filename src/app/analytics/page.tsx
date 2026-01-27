import { cookies } from 'next/headers';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
    await cookies(); // Force dynamic rendering
    return <AnalyticsDashboard />;
}
