import { cookies } from 'next/headers';
import TheRoomClient from './TheRoomClient';

export const dynamic = 'force-dynamic';

export default async function TheRoomPage() {
    await cookies(); // Force dynamic rendering
    return <TheRoomClient />;
}
