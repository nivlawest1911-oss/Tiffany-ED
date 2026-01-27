import { cookies } from 'next/headers';
import GettingStartedClient from './GettingStartedClient';

export const dynamic = 'force-dynamic';

export default async function GettingStartedPage() {
    await cookies(); // Force dynamic rendering
    return <GettingStartedClient />;
}
