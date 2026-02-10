import { cookies } from 'next/headers';
import EdIntelCommandDeck from '@/components/dashboard/EdIntelCommandDeck';

export const dynamic = 'force-dynamic';

export default async function EdIntelCommandPage() {
    await cookies(); // Force dynamic rendering
    return <EdIntelCommandDeck />;
}
