import { cookies } from 'next/headers';
import ConnectorHubClient from './ConnectorHubClient';

export const dynamic = 'force-dynamic';

export default async function ConnectorHubPage() {
    await cookies(); // Force dynamic rendering
    return <ConnectorHubClient />;
}
