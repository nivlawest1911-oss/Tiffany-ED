import { cookies } from 'next/headers';
import AIHubClient from './AIHubClient';

export const dynamic = 'force-dynamic';

export default async function AIHubPage() {
    await cookies(); // Force dynamic rendering
    return <AIHubClient />;
}
