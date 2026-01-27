import { cookies } from 'next/headers';
import SovereignClient from './SovereignClient';

export const dynamic = 'force-dynamic';

export default async function SovereignPage() {
    await cookies(); // Force dynamic rendering
    return <SovereignClient />;
}
