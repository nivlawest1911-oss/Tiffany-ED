import { cookies } from 'next/headers';
import EdIntelClient from './EdIntelClient';

export const dynamic = 'force-dynamic';

export default async function EdIntelPage() {
    await cookies(); // Force dynamic rendering
    return <EdIntelClient />;
}
