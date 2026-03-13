import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Film, ChevronRight } from 'lucide-react';
import VideoPlayer from '@/components/VideoPlayer';
import { getVideoById, getAllVideos } from '@/lib/videos';

interface Props {
  params: Promise<{ id: string }>;
}

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

export async function generateStaticParams() {
  const videos = getAllVideos();
  return videos.map((video) => ({ id: video.id }));
}

export default async function VideoPage({ params }: Props) {
  const { id } = await params;
  const video = getVideoById(id);
  const allVideos = getAllVideos();

  if (!video) {
    notFound();
  }

  // Get related videos (same category, excluding current)
  const relatedVideos = allVideos
    .filter((v) => v.id !== video.id && v.category === video.category)
    .slice(0, 3);

  // Get other videos if not enough related
  const otherVideos =
    relatedVideos.length < 3
      ? allVideos.filter((v) => v.id !== video.id && !relatedVideos.includes(v)).slice(0, 3 - relatedVideos.length)
      : [];

  const suggestedVideos = [...relatedVideos, ...otherVideos];

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FFB300]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-zinc-400 mb-6">
          <Link href="/" className="hover:text-[#FFB300] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/videos" className="hover:text-[#FFB300] transition-colors">
            Videos
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">{video.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <VideoPlayer
              src={video.src}
              poster={video.thumbnail}
              title={video.title}
              description={video.description}
              className="aspect-video"
            />

            {/* Video Info */}
            <div className="glass-panel rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">{video.title}</h1>
                  {video.category && (
                    <span className="inline-block mt-2 px-3 py-1 rounded-full bg-[#FFB300]/10 text-[#FFB300] text-xs font-bold uppercase tracking-wider">
                      {video.category}
                    </span>
                  )}
                </div>
              </div>

              {video.description && (
                <p className="text-zinc-400 mt-4 leading-relaxed">{video.description}</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Back to Library */}
            <Link
              href="/videos"
              className="flex items-center gap-3 glass-panel rounded-xl p-4 hover:border-[#FFB300]/30 transition-all group"
            >
              <div className="p-2 rounded-lg bg-[#FFB300]/10">
                <Film className="w-5 h-5 text-[#FFB300]" />
              </div>
              <div>
                <p className="text-white font-medium group-hover:text-[#FFB300] transition-colors">
                  Video Library
                </p>
                <p className="text-zinc-500 text-sm">Browse all videos</p>
              </div>
              <ArrowLeft className="w-4 h-4 text-zinc-500 ml-auto rotate-180" />
            </Link>

            {/* Suggested Videos */}
            {suggestedVideos.length > 0 && (
              <div className="glass-panel rounded-2xl p-4">
                <h3 className="text-white font-semibold mb-4">Up Next</h3>
                <div className="space-y-3">
                  {suggestedVideos.map((v) => (
                    <Link
                      key={v.id}
                      href={`/videos/${v.id}`}
                      className="flex gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-28 h-16 rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                        {v.thumbnail ? (
                          <img
                            src={v.thumbnail}
                            alt={v.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Film className="w-6 h-6 text-zinc-600" />
                          </div>
                        )}
                      </div>
                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium line-clamp-2 group-hover:text-[#FFB300] transition-colors">
                          {v.title}
                        </p>
                        {v.category && (
                          <p className="text-zinc-500 text-xs mt-1">{v.category}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
