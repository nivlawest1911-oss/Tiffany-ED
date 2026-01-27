import { cookies } from 'next/headers';
import ProtocolTopicDetailClient from './ProtocolTopicDetailClient';

export const dynamic = 'force-dynamic';

export default async function ProtocolTopicDetail() {
    await cookies(); // Force dynamic rendering
    return <ProtocolTopicDetailClient />;
}
