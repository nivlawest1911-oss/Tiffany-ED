'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, Clock, Filter } from 'lucide-react';
import type { VideoMeta } from '@/lib/videos';

interface VideoGalleryProps {
  videos: VideoMeta[];
  categories?: string[];
}

export default function VideoGallery({ videos, categories = [] }: VideoGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredVideos = selectedCategory
    ? videos.filter((v) => v.category === selectedCategory)
    : videos;

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="flex items-center gap-3 flex-wrap">
          <Filter className="w-4 h-4 text-zinc-500" />
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === null
                ? 'bg-[#FFB300] text-black'
                : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-[#FFB300] text-black'
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Video Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {/* Empty State */}
      {filteredVideos.length === 0 && (
        <div className="text-center py-16">
          <Play className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <p className="text-zinc-500">No videos found in this category.</p>
        </div>
      )}
    </div>
  );
}

function VideoCard({ video }: { video: VideoMeta }) {
  return (
    <Link
      href={`/videos/${video.id}`}
      className="group block glass-panel rounded-2xl overflow-hidden hover:border-[#FFB300]/30 transition-all duration-300"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-zinc-900">
        {video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
            <Play className="w-12 h-12 text-zinc-600" />
          </div>
        )}

        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-[#FFB300]/90 flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <Play className="w-8 h-8 text-white ml-1" fill="white" />
          </div>
        </div>

        {/* Duration Badge */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-xs font-mono flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {video.duration}
          </div>
        )}

        {/* Category Badge */}
        {video.category && (
          <div className="absolute top-2 left-2 px-2 py-1 rounded bg-[#FFB300]/90 text-black text-xs font-bold uppercase tracking-wider">
            {video.category}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg group-hover:text-[#FFB300] transition-colors line-clamp-1">
          {video.title}
        </h3>
        {video.description && (
          <p className="text-zinc-400 text-sm mt-2 line-clamp-2">{video.description}</p>
        )}
      </div>
    </Link>
  );
}
