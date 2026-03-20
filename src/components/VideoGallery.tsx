'use client';

import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { Play, Clock, Filter, Film, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { VideoMeta } from '@/lib/videos';
import { GlassPanel, HolographicText, NeonBadge } from '@/components/ui/HolographicUI';

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
        <GlassPanel variant="default" className="p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-zinc-400">
              <Filter className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Filter</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${
                selectedCategory === null
                  ? 'bg-[#FFB300] text-black shadow-[0_0_20px_rgba(255,179,0,0.3)]'
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              All Videos
            </motion.button>
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${
                  selectedCategory === category
                    ? 'bg-[#00E5FF] text-black shadow-[0_0_20px_rgba(0,229,255,0.3)]'
                    : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </GlassPanel>
      )}

      {/* Video Count */}
      <div className="flex items-center justify-between">
        <NeonBadge variant="gold">
          <Film size={12} />
          {filteredVideos.length} Videos Available
        </NeonBadge>
      </div>

      {/* Video Grid */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredVideos.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.05 }}
              layout
            >
              <VideoCard video={video} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredVideos.length === 0 && (
        <GlassPanel variant="gold" className="text-center py-16">
          <div className="w-20 h-20 rounded-2xl bg-[#FFB300]/20 flex items-center justify-center mx-auto mb-6 border border-[#FFB300]/30">
            <Play className="w-10 h-10 text-[#FFB300]" />
          </div>
          <HolographicText variant="gold" as="h3" className="text-xl font-bold mb-2">
            No Videos Found
          </HolographicText>
          <p className="text-zinc-400">No videos found in this category. Try selecting a different filter.</p>
        </GlassPanel>
      )}
    </div>
  );
}

function VideoCard({ video }: { video: VideoMeta }) {
  return (
    <Link href={`/videos/${video.id}`} className="block group">
      <GlassPanel 
        variant="default" 
        hover 
        className="overflow-hidden h-full"
      >
        {/* Thumbnail */}
        <div className="relative aspect-video bg-zinc-900/50 overflow-hidden">
          {video.thumbnail ? (
            <Image
              src={video.thumbnail}
              alt={video.title}
              width={640}
              height={360}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
              <Film className="w-12 h-12 text-zinc-600" />
            </div>
          )}

          {/* Holographic Play Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.1 }}
              className="w-16 h-16 rounded-full bg-[#FFB300] flex items-center justify-center shadow-[0_0_40px_rgba(255,179,0,0.5)] border-2 border-white/20 group-hover:scale-100 group-hover:opacity-100 transition-all"
            >
              <Play className="w-7 h-7 text-black ml-1" fill="black" />
            </motion.div>
          </div>

          {/* Scan Line Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00E5FF]/10 to-transparent animate-scan" />
          </div>

          {/* Duration Badge */}
          {video.duration && (
            <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-black/80 backdrop-blur-sm text-white text-xs font-mono flex items-center gap-1 border border-white/10">
              <Clock className="w-3 h-3 text-[#00E5FF]" />
              {video.duration}
            </div>
          )}

          {/* Category Badge */}
          {video.category && (
            <div className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-[#FFB300] text-black text-[10px] font-black uppercase tracking-wider shadow-[0_0_15px_rgba(255,179,0,0.4)] flex items-center gap-1">
              <Sparkles size={10} />
              {video.category}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-white font-bold text-lg group-hover:text-[#FFB300] transition-colors line-clamp-1 mb-2">
            {video.title}
          </h3>
          {video.description && (
            <p className="text-zinc-500 text-sm line-clamp-2 leading-relaxed">{video.description}</p>
          )}
          
          {/* Watch Now Indicator */}
          <div className="mt-4 flex items-center gap-2 text-[#00E5FF] text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Watch Now</span>
            <Play size={10} fill="currentColor" />
          </div>
        </div>
      </GlassPanel>
    </Link>
  );
}
