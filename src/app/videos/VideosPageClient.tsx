'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Film, Play, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import VideoGallery from '@/components/VideoGallery';
import type { VideoMeta } from '@/lib/videos';
import { GlassPanel, HolographicText, NeonBadge, AuroraBackground, ParticleField, LaserLine } from '@/components/ui/HolographicUI';

interface VideosPageClientProps {
  videos: VideoMeta[];
  categories: string[];
}

export default function VideosPageClient({ videos, categories }: VideosPageClientProps) {
  return (
    <div className="min-h-screen bg-[#050505] relative">
      {/* Background Effects */}
      <AuroraBackground variant="mixed" intensity="low" />
      <ParticleField count={20} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-4"
        >
          <Link
            href="/"
            aria-label="Return to Command Deck"
            className="inline-flex items-center gap-2 text-zinc-300 hover:text-[#FFB300] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Return to Command Deck</span>
          </Link>
        </motion.div>

        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <NeonBadge variant="gold" pulse className="mb-6">
              <Film size={12} aria-hidden="true" />
              Media Archive
            </NeonBadge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4"
          >
            <HolographicText variant="gradient" as="span">Video Library</HolographicText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-300 text-lg max-w-2xl mx-auto"
          >
            Explore tutorials, strategic briefings, demos, and educational content
          </motion.p>

          <LaserLine color="#FFB300" className="max-w-xs mx-auto mt-6" />
        </div>

        {/* Featured Video Banner */}
        {videos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <GlassPanel variant="gold" glow className="p-1 overflow-hidden">
              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 to-black">
                {videos[0]?.thumbnail ? (
                  <Image
                    src={videos[0].thumbnail}
                    alt={videos[0].title}
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover opacity-60"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FFB300]/10 to-[#00E5FF]/10" />
                )}
                
                {/* Overlay Content */}
                <div className="absolute inset-0 flex items-center justify-between p-8 md:p-12">
                  <div className="max-w-xl">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-4 h-4 text-[#FFB300]" aria-hidden="true" />
                      <span className="text-[#FFB300] text-[10px] font-black uppercase tracking-widest">Featured Content</span>
                    </div>
                    <HolographicText variant="gold" as="h2" className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-3">
                      {videos[0]?.title || 'Strategic Briefings'}
                    </HolographicText>
                    <p className="text-zinc-300 text-sm md:text-base line-clamp-2">
                      {videos[0]?.description || 'Explore our collection of professional development videos, tutorials, and strategic briefings.'}
                    </p>
                  </div>
                  
                  {videos[0] && (
                    <Link href={`/videos/${videos[0].id}`} aria-label={`Watch featured video: ${videos[0].title}`}>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#FFB300] flex items-center justify-center shadow-[0_0_60px_rgba(255,179,0,0.5)] cursor-pointer border-4 border-white/20"
                      >
                        <Play className="w-8 h-8 md:w-10 md:h-10 text-black ml-1" fill="black" aria-hidden="true" />
                      </motion.div>
                    </Link>
                  )}
                </div>

                {/* Holographic Grid */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <svg className="w-full h-full">
                    <pattern id="featured-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFB300" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#featured-grid)" />
                  </svg>
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        )}

        {/* Video Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <VideoGallery videos={videos} categories={categories} />
        </motion.div>

        {/* Upload CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <GlassPanel variant="cyan" className="p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#00E5FF]/20 flex items-center justify-center mx-auto mb-6 border border-[#00E5FF]/30">
              <Film className="w-8 h-8 text-[#00E5FF]" aria-hidden="true" />
            </div>
            <HolographicText variant="cyan" as="h3" className="text-xl font-bold mb-3">
              Request Custom Content
            </HolographicText>
            <p className="text-zinc-300 mb-6 max-w-md mx-auto">
              Need specific training videos or briefings for your district? Contact our media team to request custom content.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 rounded-xl bg-[#00E5FF] text-black font-black uppercase tracking-widest text-sm shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:shadow-[0_0_40px_rgba(0,229,255,0.5)] transition-all"
              >
                Contact Media Team
              </motion.button>
            </Link>
          </GlassPanel>
        </motion.div>
      </div>
    </div>
  );
}
