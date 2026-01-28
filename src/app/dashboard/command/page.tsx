import { cookies } from 'next/headers';
import SovereignCommandDeck from '@/components/dashboard/SovereignCommandDeck';

export const dynamic = 'force-dynamic';

export default async function SovereignCommandPage() {
    await cookies(); // Force dynamic rendering
    return <SovereignCommandDeck />;
}
