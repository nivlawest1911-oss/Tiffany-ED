"use client"

import { useState, useEffect, useRef } from "react"
import { Star, Link2, ExternalLink, GraduationCap, Play, Sparkles } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        cardRef.current.style.transform = `perspective(1000px) rotateY(${x / 30}deg) rotateX(${-y / 30}deg)`
      }
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative px-4 md:px-8 py-16 md:py-24 overflow-hidden perspective-1000">
      {/* Holographic background effect that follows mouse */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full pointer-events-none opacity-20 transition-all duration-700 ease-out mix-blend-screen"
        style={{
          background: "radial-gradient(circle, rgba(0,210,255,0.4) 0%, rgba(16,185,129,0.2) 30%, transparent 70%)",
          left: mousePosition.x - 400,
          top: mousePosition.y - 400,
          filter: "blur(80px)",
        }}
      />

      {/* Dynamic Video Mesh Overlay (Simulated) */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[url('/scanlines.png')] bg-repeat" />

      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full particle"
            style={{
              background: i % 3 === 0 ? "#00d2ff" : i % 3 === 1 ? "#10b981" : "#d4af37",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              opacity: 0.6,
              boxShadow: `0 0 10px ${i % 3 === 0 ? "#00d2ff" : i % 3 === 1 ? "#10b981" : "#d4af37"}`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* School Badge */}
        <div className="flex items-center justify-center gap-3 mb-8 animate-fadeIn">
          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm float-animation group hover:bg-white/10 transition-colors cursor-pointer">
            <GraduationCap className="w-6 h-6 text-[#d4af37] group-hover:scale-110 transition-transform" />
            <div className="text-left">
              <p className="text-sm font-bold text-white tracking-wide">MOBILE COUNTY PUBLIC SCHOOLS</p>
              <p className="text-xs text-gray-400 italic">Learning Today. Leading Tomorrow.</p>
            </div>
          </div>
        </div>

        {/* Main Title with holographic effect */}
        <h1 className="font-black tracking-tighter text-4xl md:text-7xl lg:text-8xl mb-6 relative z-10 drop-shadow-2xl">
          <span className="text-white">EdIntel: The Future of</span>
          <br />
          <span className="gradient-text relative inline-block">
            Cognitive Leadership
            <Sparkles className="absolute -right-12 top-0 w-12 h-12 text-[#d4af37] animate-pulse" />
          </span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          AI-powered administrative intelligence designed for Alabama educators.
          <span className="text-white font-semibold"> Save time</span>, ensure
          <span className="text-[#10b981] font-semibold"> compliance</span>, and
          <span className="text-[#d4af37] font-semibold"> protect your career</span>.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <a
            href="#pricing"
            className="px-10 py-5 bg-gradient-to-r from-[#00d2ff] via-[#10b981] to-[#d4af37] text-black font-black rounded-xl hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] transition-all flex items-center gap-3 text-xl touch-target"
          >
            <Sparkles className="w-6 h-6" />
            Start Free Trial
          </a>
          <a href="#avatar-lab" className="group px-10 py-5 bg-white/5 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 hover:border-white/40 transition-all flex items-center gap-3 text-xl touch-target backdrop-blur-md">
            <Play className="w-6 h-6 fill-white group-hover:scale-110 transition-transform" />
            Watch Demo
          </a>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-16">
          <div className="glass-card px-8 py-5 rounded-2xl pulse-glow hover:bg-white/10 transition-colors">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Hours Saved This Month</p>
            <p className="text-4xl md:text-5xl font-black tracking-tighter text-white">1.5M+</p>
          </div>
          <div className="glass-card-emerald px-8 py-5 rounded-2xl hover:scale-105 transition-transform">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Capital Recovered</p>
            <p className="text-4xl md:text-5xl font-black tracking-tighter text-[#10b981]">$38M+</p>
          </div>
        </div>

        {/* Dr. Alvin West Section - 3D Card */}
        <div className="relative flex flex-col items-center perspective-1000">
          <div
            ref={cardRef}
            className="relative transition-transform duration-100 ease-out preserve-3d"
          >
            {/* Holographic ring around avatar */}
            <div className="absolute inset-0 w-72 h-96 md:w-80 md:h-[28rem] -m-4 rounded-3xl holographic opacity-50 -z-10" />

            <div className="relative w-64 h-80 md:w-72 md:h-96 mb-6 rounded-3xl overflow-hidden border-2 border-[#00d2ff]/30 shadow-[0_0_60px_rgba(0,210,255,0.2)] bg-black">
              {/* Dynamic content if we wanted video */}
              <Image
                src="/professional-black-man-in-business-suit--executive.jpg"
                alt="Dr. Alvin West - Founder of EdIntel"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
                priority
              />
              {/* Holographic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* "Standard" Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/20 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Live Node</span>
              </div>
            </div>

            {/* Glow ring */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-56 h-6 bg-[#00d2ff]/30 blur-2xl rounded-full" />
          </div>

          <div className="glass-card max-w-lg p-8 rounded-3xl text-left relative z-10 -mt-12 backdrop-blur-xl border border-white/20 shadow-2xl transform hover:translate-y-[-5px] transition-transform">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-black tracking-tighter text-2xl text-white">Dr. Alvin West II, DBA</h3>
                <p className="text-xs text-[#d4af37] uppercase tracking-wider font-bold mt-1 flex items-center gap-2">
                  <Star className="w-3 h-3 fill-[#d4af37]" />
                  Sovereign Architect & AI Developer
                </p>
                <p className="text-xs text-gray-500 mt-1">MBA, MS, MS, BS • Walden University</p>
              </div>
              <div className="flex gap-2">
                <a
                  href="https://www.linkedin.com/in/dr-alvin-west-ii-dba-pd-m-58133519/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#00d2ff] hover:bg-white/10 transition-all hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-6 leading-relaxed">
              Welcome, Alabama Leader! Let me guide your <span className="text-[#00d2ff] font-bold">SOVEREIGN</span>{" "}
              potential. My AI agents are ready to serve your campus.
            </p>
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <a
                href="#founder"
                className="inline-flex items-center gap-2 text-sm text-[#00d2ff] hover:text-[#00d2ff]/80 transition-colors font-bold uppercase tracking-wider"
              >
                <ExternalLink className="w-4 h-4" />
                View Full Dossier
              </a>
              <span className="text-xs text-gray-500 font-mono">ID: AW-001-ALPHA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
