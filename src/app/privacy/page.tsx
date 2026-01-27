import { cookies } from 'next/headers';
import PrivacyClient from './PrivacyClient';

export const dynamic = 'force-dynamic';

export default async function PrivacyPage() {
    await cookies(); // Force dynamic rendering
    return <PrivacyClient />;
}
