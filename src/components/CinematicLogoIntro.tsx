'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface LogoIntroProps {
  onComplete?: () => void
  autoClose?: boolean
  autoCloseDuration?: number
}

export function CinematicLogoIntro({ 
  onComplete, 
  autoClose = true, 
  autoCloseDuration = 5000 
}: LogoIntroProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onComplete?.()
      }, autoCloseDuration)
      return () => clearTimeout(timer)
    }
  }, [autoClose, autoCloseDuration, isVisible, onComplete])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Background with light rays */}
      <div className="absolute inset-0 bg-gradient-radial from-[#D4AF37]/5 via-black to-black" />

      {/* Animated light rays */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-full bg-gradient-to-b from-[#D4AF37]/20 to-transparent"
            style={{ left: `${(i / 8) * 100}%` }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: [0, 0.5, 0], scaleY: 1 }}
            transition={{
              duration: 3,
              delay: i * 0.1,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
        ))}
      </div>

      {/* Left Gear - Opening */}
      <motion.div
        className="absolute left-12 w-48 h-48"
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '100px 100px' }}
          >
            <circle cx="100" cy="100" r="80" fill="none" stroke="#D4AF37" strokeWidth="2" opacity="0.6" />
            {[...Array(12)].map((_, i) => {
              const angle = (i / 12) * Math.PI * 2
              const x1 = 100 + 75 * Math.cos(angle)
              const y1 = 100 + 75 * Math.sin(angle)
              const x2 = 100 + 95 * Math.cos(angle)
              const y2 = 100 + 95 * Math.sin(angle)
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#D4AF37"
                  strokeWidth="3"
                  opacity="0.7"
                />
              )
            })}
            <circle cx="100" cy="100" r="20" fill="#D4AF37" opacity="0.8" />
          </motion.g>
        </svg>
      </motion.div>

      {/* Right Gear - Opening */}
      <motion.div
        className="absolute right-12 w-48 h-48"
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <motion.g
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '100px 100px' }}
          >
            <circle cx="100" cy="100" r="70" fill="none" stroke="#D4AF37" strokeWidth="2" opacity="0.5" />
            {[...Array(10)].map((_, i) => {
              const angle = (i / 10) * Math.PI * 2
              const x1 = 100 + 60 * Math.cos(angle)
              const y1 = 100 + 60 * Math.sin(angle)
              const x2 = 100 + 80 * Math.cos(angle)
              const y2 = 100 + 80 * Math.sin(angle)
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#D4AF37"
                  strokeWidth="2.5"
                  opacity="0.6"
                />
              )
            })}
            <circle cx="100" cy="100" r="15" fill="#D4AF37" opacity="0.6" />
          </motion.g>
        </svg>
      </motion.div>

      {/* Center Logo Container */}
      <motion.div
        className="relative z-20 flex flex-col items-center gap-8"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
      >
        {/* Shield Backdrop */}
        <motion.div
          className="absolute inset-0 w-96 h-96 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.2, 0] }}
          transition={{ duration: 2, delay: 0.8 }}
          style={{
            boxShadow: '0 0 100px rgba(212, 175, 55, 0.4)',
          }}
        />

        {/* Main Logo */}
        <motion.div
          className="relative w-64 h-64 flex items-center justify-center"
          animate={{
            y: [0, -10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            delay: 0.5,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        >
          <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.4)] ring-2 ring-[#D4AF37]/50">
            <Image
              src="/logo-main.png"
              alt="EdIntel Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Text - EdIntel */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.h1
            className="text-6xl md:text-7xl font-black tracking-[0.4em] text-[#D4AF37] text-shadow mb-4"
            style={{
              textShadow: '0 0 30px rgba(212, 175, 55, 0.6)',
            }}
            initial={{ opacity: 0, letterSpacing: '0.8em' }}
            animate={{ opacity: 1, letterSpacing: '0.4em' }}
            transition={{ duration: 1.5, delay: 1.4 }}
          >
            EDINTEL
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-sm md:text-base tracking-[0.3em] text-[#D4AF37]/70 uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
          >
            Intelligence in Education
          </motion.p>

          {/* Closing line animation */}
          <motion.div
            className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 2 }}
          />
        </motion.div>
      </motion.div>

      {/* Close button */}
      <motion.button
        onClick={() => setIsVisible(false)}
        className="absolute top-6 right-6 z-30 text-[#D4AF37]/60 hover:text-[#D4AF37] transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </motion.button>
    </motion.div>
  )
}
