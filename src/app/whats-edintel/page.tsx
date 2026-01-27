import { cookies } from 'next/headers';
import WhatsEdIntelClient from './WhatsEdIntelClient';

export const dynamic = 'force-dynamic';

export default async function WhatsEdIntel() {
    await cookies(); // Force dynamic rendering
    return <WhatsEdIntelClient />;
}
