"use client"

import { useState, useEffect } from "react"
import { Star, Link2, ExternalLink, GraduationCap, Play, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative px-4 md:px-8 py-16 md:py-24 overflow-hidden">
      {/* Holographic background effect that follows mouse */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none opacity-30 transition-all duration-1000"
        style={{
          background: "radial-gradient(circle, rgba(0,210,255,0.3) 0%, rgba(16,185,129,0.1) 50%, transparent 70%)",
          left: mousePosition.x - 300,
          top: mousePosition.y - 300,
          filter: "blur(60px)",
        }}
      />

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => {
          // Use deterministic values to prevent hydration mismatch
          const seed = i * 11.37;
          const colorIndex = i % 3;
          const left = ((seed * 7.919) % 100);
          const top = ((seed * 13.7) % 100);
          const delay = ((seed * 2.718) % 8);

          return (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full particle"
              style={{
                background: colorIndex === 0 ? "#00d2ff" : colorIndex === 1 ? "#10b981" : "#d4af37",
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${delay}s`,
                opacity: 0.5,
              }}
            />
          );
        })}
      </div>

      <div className="max-w-7xl mx-auto text-center relative">
        {/* School Badge */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm float-animation">
            <GraduationCap className="w-6 h-6 text-[#d4af37]" />
            <div className="text-left">
              <p className="text-sm font-bold text-white tracking-wide">MOBILE COUNTY PUBLIC SCHOOLS</p>
              <p className="text-xs text-gray-400 italic">Learning Today. Leading Tomorrow.</p>
            </div>
          </div>
        </div>

        {/* Main Title with holographic effect */}
        <h1 className="font-black tracking-tighter text-5xl md:text-7xl lg:text-8xl mb-6 relative">
          <span className="text-white">EdIntel: The Future of</span>
          <br />
          <span className="gradient-text relative">
            Cognitive Leadership
            <Sparkles className="absolute -right-8 top-0 w-8 h-8 text-[#d4af37] animate-pulse" />
          </span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          AI-powered administrative intelligence designed for Alabama educators. Save time, ensure compliance, and
          protect your career.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/pricing"
            className="px-8 py-4 bg-gradient-to-r from-[#00d2ff] to-[#10b981] text-black font-bold rounded-xl hover:opacity-90 transition-all flex items-center gap-2 text-lg touch-target shadow-[0_0_30px_rgba(0,210,255,0.3)]"
          >
            <Sparkles className="w-5 h-5" />
            Start Free Trial
          </Link>
          <button className="px-8 py-4 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/5 transition-all flex items-center gap-2 text-lg touch-target">
            <Play className="w-5 h-5" />
            Watch Demo
          </button>
        </div>

        {/* Stats Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
          <div className="glass-card px-8 py-5 rounded-2xl pulse-glow">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Hours Saved This Month</p>
            <p className="text-4xl md:text-5xl font-black tracking-tighter text-white">1.5M+</p>
          </div>
          <div className="glass-card-emerald px-8 py-5 rounded-2xl">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Capital Recovered</p>
            <p className="text-4xl md:text-5xl font-black tracking-tighter text-[#10b981]">$38M+</p>
          </div>
        </div>

        {/* Trial Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#d4af37] text-sm font-medium">
            <Star className="w-4 h-4 fill-[#d4af37]" />
            30 DAY PROFESSIONAL TRIAL ACTIVE
          </div>
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00d2ff]/10 border border-[#00d2ff]/30 text-[#00d2ff] text-sm font-medium">
            <Link2 className="w-4 h-4" />
            ROI CAPTURE PROTOCOL
          </div>
        </div>

        {/* Dr. Alvin West Section */}
        <div className="relative flex flex-col items-center">
          <div className="relative">
            {/* Holographic ring around avatar */}
            <div className="absolute inset-0 w-72 h-96 md:w-80 md:h-[28rem] -m-4 rounded-3xl holographic opacity-50" />

            <div className="relative w-64 h-80 md:w-72 md:h-96 mb-6 rounded-3xl overflow-hidden border-2 border-[#00d2ff]/30 shadow-[0_0_40px_rgba(0,210,255,0.2)]">
              <Image
                src="/professional-black-man-in-business-suit--executive.jpg"
                alt="Dr. Alvin West - Founder of EdIntel"
                fill
                className="object-cover"
                priority
              />
              {/* Holographic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Glow ring */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-56 h-6 bg-[#00d2ff]/30 blur-2xl rounded-full" />
          </div>

          <div className="glass-card max-w-lg p-6 rounded-2xl text-left relative z-10 -mt-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-black tracking-tighter text-xl text-white">Dr. Alvin West II, DBA</h3>
                <p className="text-xs text-[#d4af37] uppercase tracking-wider font-semibold">
                  Professional Architect & AI Developer
                </p>
                <p className="text-xs text-gray-500 mt-1">MBA, MS, MS, BS • Walden University</p>
              </div>
              <div className="flex gap-2">
                <a
                  href="https://www.linkedin.com/in/dr-alvin-west-ii-dba-pd-m-58133519/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:text-[#00d2ff] transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">
              Welcome, Alabama Leader! As a fellow educator and technology innovator, I built EdIntel to solve the
              problems I faced daily. Let me guide your <span className="text-[#00d2ff] font-semibold">STRATEGIC</span>{" "}
              potential and help you reclaim your time.
            </p>
            <a
              href="#founder"
              className="inline-flex items-center gap-2 text-sm text-[#00d2ff] hover:text-[#00d2ff]/80 transition-colors font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              View Full Dossier
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
