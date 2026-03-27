'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'

interface LogoIntroProps {
  onComplete?: () => void
  autoClose?: boolean
  autoCloseDuration?: number
}

// Gear Component with glassmorphic styling
function GlassGear({ 
  size, 
  teeth, 
  rotation, 
  delay, 
  position,
  color = '#D4AF37'
}: { 
  size: number
  teeth: number
  rotation: number
  delay: number
  position: { x: string, y: string }
  color?: string
}) {
  return (
    <motion.div
      className="absolute"
      style={{ left: position.x, top: position.y, transform: 'translate(-50%, -50%)' }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg width={size} height={size} viewBox="0 0 200 200" className="drop-shadow-2xl">
        <defs>
          <linearGradient id={`gearGrad-${teeth}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="50%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
          <filter id={`glow-${teeth}`}>
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <motion.g
          animate={{ rotate: rotation }}
          transition={{ duration: 20 + teeth, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '100px 100px' }}
          filter={`url(#glow-${teeth})`}
        >
          {/* Outer ring with glass effect */}
          <circle cx="100" cy="100" r="85" fill="none" stroke={`url(#gearGrad-${teeth})`} strokeWidth="1" opacity="0.6" />
          <circle cx="100" cy="100" r="75" fill="none" stroke={color} strokeWidth="0.5" opacity="0.3" />
          
          {/* Gear teeth */}
          {[...Array(teeth)].map((_, i) => {
            const angle = (i / teeth) * Math.PI * 2
            const innerR = 70
            const outerR = 90
            const x1 = 100 + innerR * Math.cos(angle)
            const y1 = 100 + innerR * Math.sin(angle)
            const x2 = 100 + outerR * Math.cos(angle)
            const y2 = 100 + outerR * Math.sin(angle)
            return (
              <motion.line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: delay + i * 0.02 }}
              />
            )
          })}
          
          {/* Inner circles with holographic effect */}
          <circle cx="100" cy="100" r="50" fill="none" stroke={color} strokeWidth="1" opacity="0.4" strokeDasharray="8 4" />
          <circle cx="100" cy="100" r="30" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />
          
          {/* Core with glass effect */}
          <circle cx="100" cy="100" r="15" fill={color} opacity="0.3" />
          <circle cx="100" cy="100" r="8" fill={color} opacity="0.8" />
          <circle cx="100" cy="100" r="4" fill="white" opacity="0.9" />
        </motion.g>
      </svg>
    </motion.div>
  )
}

// Laser beam component
function LaserBeam({ 
  startX, startY, endX, endY, delay, color = '#00E5FF' 
}: { 
  startX: string, startY: string, endX: string, endY: string, delay: number, color?: string 
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: startX, top: startY, width: '100%', height: '100%' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 2, delay, times: [0, 0.1, 0.9, 1] }}
    >
      <svg className="absolute inset-0 w-full h-full overflow-visible">
        <defs>
          <linearGradient id={`laser-${delay}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0" />
            <stop offset="50%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
          <filter id={`laserGlow-${delay}`}>
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <motion.line
          x1={startX} y1={startY} x2={endX} y2={endY}
          stroke={`url(#laser-${delay})`}
          strokeWidth="2"
          filter={`url(#laserGlow-${delay})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay, ease: 'easeOut' }}
        />
      </svg>
    </motion.div>
  )
}

// Holographic grid background
function HolographicGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00E5FF" strokeWidth="0.5" opacity="0.3"/>
          </pattern>
          <linearGradient id="gridFade" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0"/>
            <stop offset="50%" stopColor="white" stopOpacity="1"/>
            <stop offset="100%" stopColor="white" stopOpacity="0"/>
          </linearGradient>
          <mask id="gridMask">
            <rect width="100%" height="100%" fill="url(#gridFade)"/>
          </mask>
        </defs>
        <motion.rect 
          width="100%" 
          height="100%" 
          fill="url(#grid)" 
          mask="url(#gridMask)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
        />
      </svg>
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(0,229,255,0.05) 50%, transparent 100%)',
        }}
        animate={{ y: ['0%', '100%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

// Floating particles
function FloatingParticles({ isMobile }: { isMobile: boolean }) {
  // OPTIMIZED PERFORMANCE: Reduced particle count for LCP/FCP (Phase 14)
  const particles = Array.from({ length: isMobile ? 8 : 24 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.id % 3 === 0 ? '#D4AF37' : p.id % 3 === 1 ? '#00E5FF' : 'white',
            boxShadow: `0 0 ${p.size * 2}px ${p.id % 3 === 0 ? '#D4AF37' : '#00E5FF'}`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// Glass panel component
function GlassPanel({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-[#00E5FF]/5 rounded-3xl" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Animated rings around logo
function OrbitalRings() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {/* Outer ring */}
      <motion.div
        className="absolute w-[500px] h-[500px] border border-[#D4AF37]/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#D4AF37] rounded-full shadow-[0_0_20px_#D4AF37]" />
      </motion.div>
      
      {/* Middle ring */}
      <motion.div
        className="absolute w-[400px] h-[400px] border border-[#00E5FF]/20 rounded-full"
        style={{ borderStyle: 'dashed' }}
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-[#00E5FF] rounded-full shadow-[0_0_15px_#00E5FF]" />
      </motion.div>
      
      {/* Inner ring */}
      <motion.div
        className="absolute w-[320px] h-[320px] border-2 border-[#D4AF37]/30 rounded-full"
        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
        transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, scale: { duration: 3, repeat: Infinity } }}
      />
    </div>
  )
}

export function CinematicLogoIntro({ 
  onComplete, 
  autoClose = true, 
  autoCloseDuration = 4000 // REDUCED FROM 8000 FOR LCP (Phase 14)
}: LogoIntroProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [_phase, setPhase] = useState<'gears' | 'logo' | 'text' | 'complete'>('gears')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  // Phase timing
  useEffect(() => {
    const isMob = window.innerWidth < 768;
    const timers = [
      setTimeout(() => setPhase('logo'), isMob ? 400 : 800),  // Faster on mobile
      setTimeout(() => setPhase('text'), isMob ? 1000 : 1800), 
      setTimeout(() => setPhase('complete'), isMob ? 2000 : 3000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onComplete?.()
      }, autoCloseDuration)
      return () => clearTimeout(timer)
    }
  }, [autoClose, autoCloseDuration, isVisible, onComplete])

  const handleSkip = useCallback(() => {
    setIsVisible(false)
    onComplete?.()
  }, [onComplete])

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[100] bg-[#030712] flex items-center justify-center overflow-hidden"
      >
        {/* Deep space background */}
        <div className="absolute inset-0 bg-gradient-radial from-[#0a1628] via-[#030712] to-black" />
        
        {/* Holographic grid */}
        <HolographicGrid />
        
        {/* Floating particles */}
        <FloatingParticles isMobile={isMobile} />
        
        {/* Animated aurora background */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
        >
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#D4AF37]/20 rounded-full blur-[150px] animate-aurora-1" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#00E5FF]/20 rounded-full blur-[120px] animate-aurora-2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-[100px] animate-aurora-3" />
        </motion.div>

        {/* Glass gears - Lionsgate style mechanical opening - DISABLED ON MOBILE (Phase 14) */}
        {!isMobile && (
          <div className="hidden sm:block absolute inset-0">
            <GlassGear size={180} teeth={16} rotation={360} delay={0} position={{ x: '10%', y: '20%' }} />
            <GlassGear size={140} teeth={12} rotation={-360} delay={0.2} position={{ x: '85%', y: '25%' }} />
            <GlassGear size={100} teeth={10} rotation={360} delay={0.3} position={{ x: '15%', y: '75%' }} />
            <GlassGear size={120} teeth={14} rotation={-360} delay={0.4} position={{ x: '88%', y: '70%' }} color="#00E5FF" />
            <GlassGear size={80} teeth={8} rotation={360} delay={0.5} position={{ x: '5%', y: '50%' }} color="#00E5FF" />
            <GlassGear size={90} teeth={9} rotation={-360} delay={0.6} position={{ x: '95%', y: '50%' }} />
          </div>
        )}

        {/* Laser beams - DISABLED ON MOBILE (Phase 14) */}
        {!isMobile && (
          <motion.div
            className="hidden sm:block absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <LaserBeam startX="0%" startY="30%" endX="100%" endY="70%" delay={1.5} />
            <LaserBeam startX="100%" startY="20%" endX="0%" endY="80%" delay={1.8} color="#D4AF37" />
            <LaserBeam startX="50%" startY="0%" endX="50%" endY="100%" delay={2} />
          </motion.div>
        )}

        {/* Orbital rings - DISABLED ON MOBILE (Phase 14) */}
        {!isMobile && (
          <div className="hidden sm:block absolute inset-0">
            <OrbitalRings />
          </div>
        )}

        {/* Center content with glass panel */}
        <motion.div
          className="relative z-20 flex flex-col items-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Glassmorphic logo container */}
          <GlassPanel className="p-8 md:p-12">
            {/* Logo */}
            <motion.div
              className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center"
              animate={{
                y: [0, -8, 0],
                rotateY: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Holographic glow behind logo */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                animate={{
                  boxShadow: [
                    '0 0 60px rgba(255,179,0,0.3), 0 0 120px rgba(255,179,0,0.1)',
                    '0 0 80px rgba(255,179,0,0.5), 0 0 160px rgba(255,179,0,0.2)',
                    '0 0 60px rgba(255,179,0,0.3), 0 0 120px rgba(255,179,0,0.1)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              <div className="relative w-full h-full rounded-3xl overflow-hidden ring-2 ring-[#D4AF37]/50 shadow-2xl">
                <Image
                  src="/images/edintel-logo.png"
                  alt="EdIntel Logo"
                  fill
                  className="object-contain p-4"
                  priority
                />
                
                {/* Holographic shimmer overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-200%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
              </div>
            </motion.div>
          </GlassPanel>

          {/* Brand text */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.5 }}
          >
            {/* Main title with holographic effect */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[0.3em] md:tracking-[0.4em] uppercase"
              style={{
                background: 'linear-gradient(180deg, #D4AF37 0%, #C5A02E 30%, #B68F25 70%, #8A6B0E 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 30px rgba(212,175,55,0.5))',
              }}
              initial={{ letterSpacing: '0.6em', opacity: 0 }}
              animate={{ letterSpacing: '0.4em', opacity: 1 }}
              transition={{ duration: 1.5, delay: 2.8 }}
            >
              EDINTEL
            </motion.h1>

            {/* Subtitle with typing effect */}
            <motion.div
              className="mt-4 flex items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5 }}
            >
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#00E5FF]" />
              <p className="text-sm md:text-base tracking-[0.4em] text-[#00E5FF] uppercase font-light">
                Intelligence in Education
              </p>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#00E5FF]" />
            </motion.div>

            {/* Mission statement */}
            <motion.p
              className="mt-6 text-xs md:text-sm tracking-[0.2em] text-white/50 uppercase max-w-lg mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4 }}
            >
              Cognitive Holograms | Humanoid Integration | Glassmorphic Architecture
            </motion.p>

            {/* Animated progress line */}
            <motion.div
              className="mt-8 h-1 w-64 md:w-96 mx-auto rounded-full overflow-hidden bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[#D4AF37] via-[#00E5FF] to-[#D4AF37]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, delay: 4.5, ease: 'easeInOut' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Skip button */}
        <motion.button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 z-30 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          Skip Intro
        </motion.button>

        {/* Version tag */}
        <motion.div
          className="absolute bottom-8 left-8 text-white/20 text-xs tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          Sovereign OS v2.0
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
