import { cookies } from 'next/headers';
import GalleryClient from './GalleryClient';

export const metadata = {
    title: 'Evidence Gallery - EdIntel Professional',
    description: 'Classroom observation logs and evidence folder for Mobile & Prichard schools',
};

export const dynamic = 'force-dynamic';

export default async function GalleryPage({
    searchParams,
}: {
    searchParams: Promise<{ query?: string }>;
}) {
    await cookies(); // Force dynamic rendering
    const params = await searchParams;
    const query = params.query || '';
    return <GalleryClient query={query} />;
}
