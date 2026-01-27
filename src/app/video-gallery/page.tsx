import { cookies } from 'next/headers';
import VideoGalleryClient from './VideoGalleryClient';

export const dynamic = 'force-dynamic';

export default async function VideoGalleryPage() {
    await cookies(); // Force dynamic rendering
    return <VideoGalleryClient />;
}
