import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Film } from 'lucide-react';
import VideoGallery from '@/components/VideoGallery';
import { getAllVideos, getCategories } from '@/lib/videos';

export const metadata: Metadata = {
  title: 'Video Library | EdIntel',
  description: 'Explore tutorials, demos, and educational content from EdIntel.',
};

export default function VideosPage() {
  const videos = getAllVideos();
  const categories = getCategories();

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FFB300]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-[#FFB300] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>

          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-xl bg-[#FFB300]/10 border border-[#FFB300]/20">
              <Film className="w-8 h-8 text-[#FFB300]" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Video Library</h1>
              <p className="text-zinc-400 mt-1">
                Explore tutorials, demos, and educational content
              </p>
            </div>
          </div>
        </div>

        {/* Video Gallery */}
        <VideoGallery videos={videos} categories={categories} />

        {/* Upload CTA (if authenticated) */}
        <div className="mt-16 glass-panel rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold text-white mb-2">
            Have videos to share?
          </h3>
          <p className="text-zinc-400 mb-6">
            Add your educational videos to the public/videos directory to display them here.
          </p>
          <div className="text-sm text-zinc-500 font-mono bg-zinc-900/50 rounded-lg p-4 inline-block">
            /public/videos/your-video.mp4
          </div>
        </div>
      </div>
    </div>
  );
}
