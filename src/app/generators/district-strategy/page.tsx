import { cookies } from 'next/headers';
import DistrictStrategyClient from './DistrictStrategyClient';

export const dynamic = 'force-dynamic';

export default async function DistrictStrategyPage() {
    await cookies(); // Force dynamic rendering
    return <DistrictStrategyClient />;
}
