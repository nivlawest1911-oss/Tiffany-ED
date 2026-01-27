import { cookies } from 'next/headers';
import IdentityClient from './IdentityClient';

export const dynamic = 'force-dynamic';

export default async function IdentityPage() {
    await cookies(); // Force dynamic rendering
    return <IdentityClient />;
}
