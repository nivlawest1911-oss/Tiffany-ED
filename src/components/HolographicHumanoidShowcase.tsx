'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, Maximize2, Brain, Cpu, Sparkles, Shield, Globe, Zap } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// Video showcase data
const SHOWCASE_VIDEOS = [
  {
    id: 'architecting-holographic-ai',
    title: 'Architecting Holographic AI',
    description: 'Deploy sovereign AI architectures with cognitive holographic interfaces',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Architecting_and_Deploying_Holographic_AI-Y6cQQr86BgK8Iu0jotsAk8QivmdU24.mp4',
    category: 'Architecture',
    icon: Brain,
  },
  {
    id: 'sovereign-global-delivery',
    title: 'Global Information Delivery',
    description: 'Sovereign architect systems for worldwide intelligence distribution',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sovereign_Architect_s_Global_Information_Delivery-xu4TaRXEO6Q36VTsvGKSjO5Y54WpLt.mp4',
    category: 'Intelligence',
    icon: Globe,
  },
  {
    id: 'video-ready-access',
    title: 'Video Ready For Access',
    description: 'Instant access protocols for holographic content delivery',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Video_Ready_For_Access-bMsd9QKYCgPVLTtTQPFYbblgaMfbgT.mp4',
    category: 'Access',
    icon: Shield,
  },
  {
    id: 'os-enhancements',
    title: 'OS Enhancements & AI Layout',
    description: 'Next-generation operating system with embedded AI capabilities',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OS_Enhancements_AI_and_Layout-Lnm6GNW62VasbzwySVssAB8PqHncit.mp4',
    category: 'System',
    icon: Cpu,
  },
  {
    id: 'video-integration',
    title: 'Video Integration Enhancements',
    description: 'Advanced video processing with holographic overlays',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/EdIntel_Video_Integration_Enhancements-GaUwhANPrd5n931qj0U5SQIgV2Ht4N.mp4',
    category: 'Integration',
    icon: Zap,
  },
  {
    id: 'video-generation',
    title: 'Video Generation with EdIntel',
    description: 'AI-powered video generation for educational content',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Video_Generation_with_EdIntel-N3G9euwaZ77RqzP8tSnudAjQX9LxI2.mp4',
    category: 'Generation',
    icon: Sparkles,
  },
  {
    id: 'sovereign-os-layout',
    title: 'Sovereign OS Layout',
    description: 'Complete system architecture with fluid holographic interfaces',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/EdIntel_Sovereign_OS_Layout_Enhancements-cEcWNf3o5gmIV6n20yDMWhSk2yB3L2.mp4',
    category: 'Layout',
    icon: Brain,
  },
  {
    id: 'holographic-deployment',
    title: 'Holographic AI Deployment Showcase',
    description: 'Real-time holographic deployment with moving humanoid integration',
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20260313-0123-12.0224646-JyVbtYyeXfgOJRUyu8NNXEHkTYAY9S.mp4',
    category: 'Humanoid',
    icon: Sparkles,
  },
];

// Floating holographic particles
function HolographicParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 
              ? 'rgba(255, 179, 0, 0.6)' 
              : i % 3 === 1 
              ? 'rgba(0, 229, 255, 0.6)' 
              : 'rgba(255, 255, 255, 0.4)',
            boxShadow: i % 3 === 0 
              ? '0 0 10px rgba(255, 179, 0, 0.8)' 
              : i % 3 === 1 
              ? '0 0 10px rgba(0, 229, 255, 0.8)' 
              : '0 0 6px rgba(255, 255, 255, 0.5)',
          }}
          animate={{
            y: [0, -30 - Math.random() * 50, 0],
            x: [0, (Math.random() - 0.5) * 40, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}

// Cognitive hologram grid
function CognitiveHologramGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <defs>
          <pattern id="holo-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path 
              d="M 60 0 L 0 0 0 60" 
              fill="none" 
              stroke="url(#grid-gradient)" 
              strokeWidth="0.5" 
            />
          </pattern>
          <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB300" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFB300" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#holo-grid)" />
      </svg>
      
      {/* Scanning line effect */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent"
        animate={{
          top: ['0%', '100%', '0%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          boxShadow: '0 0 20px rgba(0, 229, 255, 0.5), 0 0 40px rgba(0, 229, 255, 0.3)',
        }}
      />
    </div>
  );
}

// Humanoid silhouette component with fluid animation
function HumanoidHologram({ isActive }: { isActive: boolean }) {
  return (
    <motion.div
      className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[500px] pointer-events-none"
      initial={{ opacity: 0, x: 100 }}
      animate={{ 
        opacity: isActive ? 0.6 : 0.3, 
        x: 0,
        scale: isActive ? 1.05 : 1,
      }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      {/* Humanoid wireframe silhouette */}
      <svg viewBox="0 0 200 400" className="w-full h-full">
        <defs>
          <linearGradient id="humanoid-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#FFB300" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.4" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Head */}
        <motion.ellipse
          cx="100"
          cy="40"
          rx="25"
          ry="30"
          fill="none"
          stroke="url(#humanoid-gradient)"
          strokeWidth="1.5"
          filter="url(#glow)"
          animate={{ 
            opacity: [0.5, 1, 0.5],
            strokeWidth: [1.5, 2, 1.5],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Neck */}
        <motion.line
          x1="100" y1="70" x2="100" y2="90"
          stroke="url(#humanoid-gradient)"
          strokeWidth="1.5"
          filter="url(#glow)"
        />
        
        {/* Shoulders */}
        <motion.path
          d="M 60 95 Q 100 85 140 95"
          fill="none"
          stroke="url(#humanoid-gradient)"
          strokeWidth="1.5"
          filter="url(#glow)"
        />
        
        {/* Torso */}
        <motion.path
          d="M 70 95 L 80 200 L 120 200 L 130 95"
          fill="none"
          stroke="url(#humanoid-gradient)"
          strokeWidth="1.5"
          filter="url(#glow)"
          animate={{ 
            pathLength: [0.8, 1, 0.8],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        {/* Arms */}
        <motion.path
          d="M 60 95 L 40 150 L 35 200"
          fill="none"
          stroke="url(#humanoid-gradient)"
          strokeWidth="1.5"
          filter="url(#glow)"
          animate={{ 
            d: [
              "M 60 95 L 40 150 L 35 200",
              "M 60 95 L 45 145 L 50 195",
              "M 60 95 L 40 150 L 35 200",
            ],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.path
          d="M 140 95 L 160 150 L 165 200"
          fill="none"
          stroke="url(#humanoid-gradient)"
          strokeWidth="1.5"
          filter="url(#glow)"
          animate={{ 
            d: [
              "M 140 95 L 160 150 L 165 200",
              "M 140 95 L 155 145 L 150 195",
              "M 140 95 L 160 150 L 165 200",
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        />
        
        {/* Legs */}
        <motion.path
          d="M 85 200 L 75 300 L 70 380"
          fill="none"
          stroke="url(#humanoid-gradient)"
          strokeWidth="1.5"
          filter="url(#glow)"
        />
        <motion.path
          d="M 115 200 L 125 300 L 130 380"
          fill="none"
          stroke="url(#humanoid-gradient)"
          strokeWidth="1.5"
          filter="url(#glow)"
        />
        
        {/* Core energy */}
        <motion.circle
          cx="100"
          cy="140"
          r="15"
          fill="none"
          stroke="#FFB300"
          strokeWidth="2"
          filter="url(#glow)"
          animate={{ 
            r: [15, 20, 15],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Data streams */}
        {[0, 1, 2, 3].map((i) => (
          <motion.circle
            key={i}
            cx="100"
            cy="140"
            r="5"
            fill="#00E5FF"
            filter="url(#glow)"
            animate={{
              cy: [140, 40 + i * 20, 140],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
}

// Main component
export default function HolographicHumanoidShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });

  const activeVideo = SHOWCASE_VIDEOS[activeIndex];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, isMuted, activeIndex]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    }
  };

  const nextVideo = () => {
    setActiveIndex((prev) => (prev + 1) % SHOWCASE_VIDEOS.length);
  };

  const prevVideo = () => {
    setActiveIndex((prev) => (prev - 1 + SHOWCASE_VIDEOS.length) % SHOWCASE_VIDEOS.length);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Auto-advance videos
  useEffect(() => {
    if (!isHovering && isPlaying) {
      const timer = setInterval(() => {
        nextVideo();
      }, 15000);
      return () => clearInterval(timer);
    }
  }, [isHovering, isPlaying]);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#050a18] to-[#020617]" />
      <CognitiveHologramGrid />
      <HolographicParticles />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFB300]/10 border border-[#FFB300]/30 mb-6">
            <Brain className="w-4 h-4 text-[#FFB300]" />
            <span className="text-[#FFB300] text-xs font-bold uppercase tracking-widest">Cognitive Holography</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
            <span className="bg-gradient-to-r from-[#FFB300] via-white to-[#00E5FF] bg-clip-text text-transparent">
              Humanoid AI Integration
            </span>
          </h2>
          
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Experience fluid holographic interfaces powered by sovereign AI architectures. 
            EdIntel: Educator Intelligence reimagined.
          </p>
        </motion.div>

        {/* Main Video Showcase */}
        <motion.div
          ref={containerRef}
          className="relative"
          style={{
            perspective: 1000,
            rotateX: springRotateX,
            rotateY: springRotateY,
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            mouseX.set(0);
            mouseY.set(0);
          }}
        >
          {/* Glassmorphic container */}
          <div className="relative rounded-3xl overflow-hidden bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_0_100px_rgba(255,179,0,0.1)]">
            {/* Video display */}
            <div className="relative aspect-video">
              <AnimatePresence mode="wait">
                <motion.video
                  key={activeVideo.id}
                  ref={videoRef}
                  src={activeVideo.src}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7 }}
                />
              </AnimatePresence>

              {/* Holographic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />
              
              {/* Scanline effect */}
              <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]" />
              </div>

              {/* Humanoid hologram */}
              <HumanoidHologram isActive={isHovering} />

              {/* EdIntel Logo watermark */}
              <div className="absolute top-6 left-6 flex items-center gap-3">
                <Image
                  src="/images/edintel-logo.jpg"
                  alt="EdIntel"
                  width={48}
                  height={48}
                  className="rounded-lg shadow-lg"
                />
                <div>
                  <h3 className="text-white font-black text-lg tracking-tight">EdIntel</h3>
                  <p className="text-[#FFB300] text-[10px] font-bold uppercase tracking-widest">Intelligence in Education</p>
                </div>
              </div>

              {/* Video info overlay */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <activeVideo.icon className="w-5 h-5 text-[#FFB300]" />
                      <span className="text-[#FFB300] text-xs font-bold uppercase tracking-widest">
                        {activeVideo.category}
                      </span>
                    </div>
                    <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">
                      {activeVideo.title}
                    </h3>
                    <p className="text-zinc-400 max-w-xl">
                      {activeVideo.description}
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-14 h-14 rounded-full bg-[#FFB300] flex items-center justify-center text-black hover:scale-110 transition-transform shadow-[0_0_30px_rgba(255,179,0,0.5)]"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                    </button>
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/20"
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={toggleFullscreen}
                      className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all border border-white/20"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Navigation arrows */}
              <button
                onClick={prevVideo}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#FFB300] hover:text-black transition-all border border-white/20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextVideo}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#FFB300] hover:text-black transition-all border border-white/20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Video thumbnails */}
            <div className="p-6 bg-black/60 backdrop-blur-xl border-t border-white/10">
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {SHOWCASE_VIDEOS.map((video, index) => (
                  <motion.button
                    key={video.id}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "relative flex-shrink-0 w-48 rounded-xl overflow-hidden transition-all duration-300",
                      index === activeIndex
                        ? "ring-2 ring-[#FFB300] shadow-[0_0_20px_rgba(255,179,0,0.3)]"
                        : "opacity-60 hover:opacity-100"
                    )}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="aspect-video bg-zinc-900 relative">
                      <video
                        src={video.src}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="flex items-center gap-1 mb-1">
                          <video.icon className="w-3 h-3 text-[#FFB300]" />
                          <span className="text-[8px] text-[#FFB300] font-bold uppercase tracking-wider">
                            {video.category}
                          </span>
                        </div>
                        <p className="text-white text-[10px] font-bold line-clamp-1">
                          {video.title}
                        </p>
                      </div>
                      {index === activeIndex && (
                        <motion.div
                          className="absolute inset-0 border-2 border-[#FFB300] rounded-xl"
                          layoutId="active-border"
                        />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Corner accents */}
          <div className="absolute -top-2 -left-2 w-16 h-16 border-t-2 border-l-2 border-[#FFB300] rounded-tl-xl" />
          <div className="absolute -top-2 -right-2 w-16 h-16 border-t-2 border-r-2 border-[#00E5FF] rounded-tr-xl" />
          <div className="absolute -bottom-2 -left-2 w-16 h-16 border-b-2 border-l-2 border-[#00E5FF] rounded-bl-xl" />
          <div className="absolute -bottom-2 -right-2 w-16 h-16 border-b-2 border-r-2 border-[#FFB300] rounded-br-xl" />
        </motion.div>

        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {SHOWCASE_VIDEOS.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "h-1 rounded-full transition-all duration-500",
                index === activeIndex
                  ? "w-12 bg-[#FFB300]"
                  : "w-4 bg-white/20 hover:bg-white/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
