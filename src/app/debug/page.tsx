import { cookies } from 'next/headers';
import DebugClient from './DebugClient';

export const dynamic = 'force-dynamic';

export default async function DebugPage() {
    await cookies(); // Force dynamic rendering
    return <DebugClient />;
}
