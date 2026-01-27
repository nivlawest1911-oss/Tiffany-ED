import { cookies } from 'next/headers';
import VideoStudioClient from './VideoStudioClient';

export const dynamic = 'force-dynamic';

export default async function VideoStudioPage() {
    await cookies(); // Force dynamic rendering
    return <VideoStudioClient />;
}
