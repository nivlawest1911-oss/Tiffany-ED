import { cookies } from 'next/headers';
import AIHubClient from './AIHubClient';
import { AI } from './actions';

export const dynamic = 'force-dynamic';

export default async function AIHubPage() {
    await cookies(); // Force dynamic rendering
    return (
        <AI>
            <AIHubClient />
        </AI>
    );
}
