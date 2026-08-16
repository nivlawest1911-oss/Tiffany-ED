'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import InteractiveDemo from '@/components/landing/InteractiveDemo';
import { 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  Zap, 
  CheckCircle2, 
  ChevronRight, 
  BarChart3, 
  Users, 
  Clock, 
  GraduationCap,
  Layers,
  Lock,
  ArrowRight
} from 'lucide-react';

export default function LandingPage() {
  const { user, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white flex flex-col font-sans selection:bg-[#D4AF37]/30">
      {/* Top Glassmorphic Navigation Bar */}
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          {/* Ambient Background Radial Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="flex flex-col items-center justify-center text-center relative z-10">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-[#D4AF37]/30 mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(212,175,55,0.15)] animate-in fade-in slide-in-from-bottom-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-xs font-semibold tracking-[2px] text-[#D4AF37] uppercase">
                TRUSTED BY 87+ ALABAMA & SOUTHEAST SCHOOL DISTRICTS
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight max-w-5xl leading-[1.05] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/60">
              Institutional-grade AI<br />for K-12 education.
            </h1>

            {/* Sub-headline */}
            <p className="max-w-3xl text-lg sm:text-2xl text-white/70 mb-10 leading-relaxed font-light">
              EdIntel Sovereign helps districts reduce teacher workload, improve literacy outcomes, 
              and maintain full compliance — all inside the tools you already use.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-16">
              {!isLoading && user ? (
                <Link href="/dashboard">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-[#D4AF37] to-[#C5A46E] hover:from-[#C5A46E] hover:to-[#A67C52] text-[#0A0F1C] font-bold px-10 py-7 text-lg rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-2">
                    <span>Go to Command Center</span>
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/register">
                    <Button className="w-full sm:w-auto bg-gradient-to-r from-[#D4AF37] to-[#C5A46E] hover:from-[#C5A46E] hover:to-[#A67C52] text-[#0A0F1C] font-bold px-10 py-7 text-lg rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-2">
                      <span>Request a District Demo</span>
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 px-10 py-7 text-lg rounded-2xl font-semibold">
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Platform Feature Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/60 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>ALCOS & Science of Reading Aligned</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>FERPA & COPPA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Canvas & LTI 1.3 Ready</span>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Numbers / Stats Bar */}
        <section className="border-y border-white/10 bg-white/[0.015] py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl sm:text-5xl font-extrabold text-[#D4AF37] tracking-tight">87+</div>
              <div className="text-xs uppercase tracking-[2px] text-white/50 mt-1 font-mono">School Districts</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-extrabold text-[#D4AF37] tracking-tight">5.8 hrs</div>
              <div className="text-xs uppercase tracking-[2px] text-white/50 mt-1 font-mono">Weekly Saved per Teacher</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-extrabold text-[#D4AF37] tracking-tight">100k+</div>
              <div className="text-xs uppercase tracking-[2px] text-white/50 mt-1 font-mono">Scaffolds Generated</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-extrabold text-[#D4AF37] tracking-tight">100%</div>
              <div className="text-xs uppercase tracking-[2px] text-white/50 mt-1 font-mono">FERPA Compliant</div>
            </div>
          </div>
        </section>

        {/* Live Interactive Engine Demo */}
        <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <InteractiveDemo />
        </section>

        {/* Comprehensive Feature Grid */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold tracking-wider mb-4 border border-[#D4AF37]/20">
              BUILT FOR EDUCATOR EXCELLENCE
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Why K-12 Districts Choose EdIntel
            </h2>
            <p className="text-white/60 text-lg mt-4 font-light">
              Architected specifically to solve teacher burnout, fulfill state literacy mandates, and pass stringent IT privacy reviews.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 hover:border-[#D4AF37]/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Traceable AI Engine</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Every lesson scaffold, grading draft, and rubric feedback is logged with exact ALCOS standards and Science of Reading alignment.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 hover:border-[#D4AF37]/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Workload Reduction</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Teachers save 5–8 hours per week on grading and planning through our automated AI Multiplier workflow.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 hover:border-[#D4AF37]/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layers className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Seamless LTI 1.3</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Works inside Canvas, Clever, and Google Classroom via LTI 1.3 with Deep Linking and real-time grade passback.
              </p>
            </div>

            {/* Card 4 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 hover:border-[#D4AF37]/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">FERPA & COPPA Shield</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Zero data retention policy ensures student PII is never trained on or exposed to public LLMs.
              </p>
            </div>

            {/* Card 5 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 hover:border-[#D4AF37]/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Multi-Tier Scaffolding</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Differentiate instruction instantly for Tier 1, 2, and 3 learners with decodable text generators and IEP accommodations.
              </p>
            </div>

            {/* Card 6 */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 hover:border-[#D4AF37]/40 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">District Intelligence</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Superintendents and curriculum directors gain real-time visibility into instructional alignment across all schools.
              </p>
            </div>
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E1B4B]/40 to-[#0F172A] border border-[#D4AF37]/30 p-12 text-center relative overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.15)]">
            <div className="max-w-3xl mx-auto relative z-10">
              <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
                Ready to give teachers time back?
              </h2>
              <p className="text-white/70 text-lg mb-10 font-light">
                Join forward-thinking school districts using EdIntel Sovereign to elevate instruction and streamline administration.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button className="bg-[#D4AF37] hover:bg-[#C5A46E] text-[#0A0F1C] font-bold px-12 py-6 text-lg rounded-2xl shadow-lg">
                    Request a Demo
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-12 py-6 text-lg rounded-2xl font-semibold">
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