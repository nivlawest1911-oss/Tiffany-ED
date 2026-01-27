import { cookies } from 'next/headers';
import ProtocolArticleDetailClient from './ProtocolArticleDetailClient';

export const dynamic = 'force-dynamic';

export default async function ProtocolArticleDetailPage() {
    await cookies(); // Force dynamic rendering
    return <ProtocolArticleDetailClient />;
}
