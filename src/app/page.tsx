'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import InteractiveDemo from '@/components/landing/InteractiveDemo';
import { 
  ShieldCheck, 
  BookOpen, 
  Zap, 
  CheckCircle2, 
  BarChart3, 
  Clock, 
  GraduationCap,
  Layers,
  Lock,
  ArrowRight,
  Cpu,
  FileCode,
  Award
} from 'lucide-react';

export default function LandingPage() {
  const { user, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-[#030712] text-zinc-100 flex flex-col font-sans selection:bg-amber-400/30 selection:text-amber-200">
      {/* Top Glassmorphic Navigation Bar */}
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-12 md:pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          {/* Ambient Background Radial Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="flex flex-col items-center justify-center text-center relative z-10">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.12)]">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-amber-300 uppercase">
                TRUSTED BY 87+ ALABAMA & SOUTHEAST SCHOOL DISTRICTS
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight max-w-5xl leading-[1.05] mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-100 to-zinc-400 uppercase italic">
              Institutional-grade AI<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                for K-12 education.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="max-w-3xl text-base sm:text-xl text-zinc-400 mb-10 leading-relaxed font-sans font-normal">
              EdIntel Sovereign helps districts reduce teacher workload, improve literacy outcomes, 
              and enforce real-time compliance with zero raster image dependencies and biometrically verified audit gates.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-14">
              {!isLoading && user ? (
                <Link href="/dashboard">
                  <Button className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-black font-black px-8 py-6 text-base rounded-xl shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all flex items-center justify-center gap-2 tracking-wider uppercase font-mono">
                    <span>Go to Command Center</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/register">
                    <Button className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-black font-black px-8 py-6 text-base rounded-xl shadow-[0_0_25px_rgba(245,158,11,0.3)] transition-all flex items-center justify-center gap-2 tracking-wider uppercase font-mono">
                      <span>Request District Demo</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 px-8 py-6 text-base rounded-xl font-bold font-mono uppercase tracking-wider">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Platform Feature Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>ALCOS & Science of Reading Aligned</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>FERPA & COPPA Shield</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Canvas & LTI 1.3 Ready</span>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Numbers Bar */}
        <section className="border-y border-white/10 bg-white/[0.015] py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 border-r border-white/5 last:border-r-0">
              <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight font-mono">87+</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-1 font-mono">School Districts</div>
            </div>
            <div className="p-4 border-r border-white/5 last:border-r-0">
              <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight font-mono">5.8 hrs</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-1 font-mono">Saved Weekly Per Educator</div>
            </div>
            <div className="p-4 border-r border-white/5 last:border-r-0">
              <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight font-mono">100k+</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-1 font-mono">Scaffolds Generated</div>
            </div>
            <div className="p-4">
              <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight font-mono">100%</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-1 font-mono">FERPA / AL SB 63 Audited</div>
            </div>
          </div>
        </section>

        {/* Live Interactive Engine Demo */}
        <section id="demo" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <InteractiveDemo />
        </section>

        {/* Comprehensive Feature Grid */}
        <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 text-amber-400 text-[10px] font-mono font-bold tracking-[0.25em] mb-3 border border-amber-400/20">
              BUILT FOR EDUCATOR EXCELLENCE
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase italic">
              Why K-12 Districts Choose EdIntel
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-3 font-sans">
              Architected specifically to resolve teacher burnout, fulfill state mandates, and pass stringent IT security audits.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-amber-400/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Traceable AI Engine</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Every lesson scaffold, grading draft, and rubric feedback is logged with exact ALCOS standards and Science of Reading alignment.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-amber-400/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Workload Reduction</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Teachers save 5–8 hours per week on grading and planning through our automated AI Multiplier workflow.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-amber-400/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Seamless LTI 1.3</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Works inside Canvas, Clever, and Google Classroom via LTI 1.3 with Deep Linking and real-time grade passback.
              </p>
            </div>

            {/* Card 4 */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-amber-400/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Lock className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">FERPA & COPPA Shield</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Zero data retention policy ensures student PII is never trained on or exposed to public LLMs.
              </p>
            </div>

            {/* Card 5 */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-amber-400/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">Multi-Tier Scaffolding</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Differentiate instruction instantly for Tier 1, 2, and 3 learners with decodable text generators and IEP accommodations.
              </p>
            </div>

            {/* Card 6 */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-amber-400/40 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <BarChart3 className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">District Intelligence</h3>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Superintendents and curriculum directors gain real-time visibility into instructional alignment across all schools.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-r from-[#050814] via-[#0d1326] to-[#050814] border border-amber-400/30 p-10 text-center relative overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.12)]">
            <div className="max-w-3xl mx-auto relative z-10">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4 uppercase italic">
                Ready to give teachers time back?
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base mb-8 font-sans">
                Join forward-thinking school districts using EdIntel Sovereign to elevate instruction and streamline administration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center font-mono">
                <Link href="/register">
                  <Button className="bg-amber-400 hover:bg-amber-300 text-black font-black px-10 py-6 text-sm rounded-xl uppercase tracking-wider">
                    Request a Demo
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-10 py-6 text-sm rounded-xl font-bold uppercase tracking-wider">
                    Explore Platform
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}