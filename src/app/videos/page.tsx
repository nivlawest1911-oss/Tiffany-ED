import { Metadata } from 'next';
import VideoGallery from '@/components/VideoGallery';
import { getAllVideos, getCategories } from '@/lib/videos';
import VideosPageClient from './VideosPageClient';

export const metadata: Metadata = {
  title: 'Video Library | EdIntel Professional',
  description: 'Explore tutorials, demos, briefings, and educational content from EdIntel.',
};

export default function VideosPage() {
  const videos = getAllVideos();
  const categories = getCategories();

  return <VideosPageClient videos={videos} categories={categories} />;
}
