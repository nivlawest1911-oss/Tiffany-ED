import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { getVideoById } from '@/lib/videos';
import VideoDetailClient from './VideoDetailClient';

interface Props {
  params: Promise<{ id: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const video = getVideoById(id);

  if (!video) {
    return { title: 'Video Not Found | EdIntel' };
  }

  return {
    title: `${video.title} | EdIntel Videos`,
    description: video.description || `Watch ${video.title} on EdIntel.`,
  };
}

export default async function VideoPage({ params }: Props) {
  await cookies();
  const { id } = await params;
  return <VideoDetailClient id={id} />;
}
