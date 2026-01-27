import { cookies } from 'next/headers';
import AllToolsClient from './AllToolsClient';

export const dynamic = 'force-dynamic';

export default async function AllToolsPage() {
    await cookies(); // Force dynamic rendering
    return <AllToolsClient />;
}
