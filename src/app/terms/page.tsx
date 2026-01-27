import { cookies } from 'next/headers';
import TermsClient from './TermsClient';

export const dynamic = 'force-dynamic';

export default async function TermsPage() {
    await cookies(); // Force dynamic rendering
    return <TermsClient />;
}
