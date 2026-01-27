import { cookies } from 'next/headers';
import MissionClient from './MissionClient';

export const dynamic = 'force-dynamic';

export default async function MissionPage() {
    await cookies(); // Force dynamic rendering
    return <MissionClient />;
}
