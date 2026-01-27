import { cookies } from 'next/headers';
import EnterpriseClient from './EnterpriseClient';

export const dynamic = 'force-dynamic';

export default async function EnterprisePage() {
    await cookies(); // Force dynamic rendering
    return <EnterpriseClient />;
}
