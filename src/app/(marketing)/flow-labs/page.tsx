'use client';

import React from 'react';
import FlowLabsWaitlist from '@/components/FlowLabsWaitlist';

export default function FlowLabsLanding() {
  return (
    <main className="bg-[#0A0F1C] text-white overflow-hidden">
      {/* ==================== HERO ==================== */}
      <section className="relative min-h-[100dvh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/assets/Flow_Labs_Hero_Keyframe.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/assets/Flow_Labs_Trimmed_9s.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </div>

        <div className="relative z-10 max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm tracking-[4px] text-white/60">EARLY ACCESS • 2026</span>
          </div>

          <h1 className="text-7xl md:text-[92px] font-semibold tracking-[-4.5px] leading-none mb-6">
            Where Work<br />Flows Beautifully
          </h1>

          <p className="max-w-2xl mx-auto text-2xl text-white/70 tracking-[-0.6px] mb-10">
            AI Workflow Intelligence that sees your team’s real momentum.<br />
            Remove friction. Protect deep work. Let good work flow.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#waitlist"
               className="px-12 py-4 rounded-2xl bg-white text-black font-semibold text-lg tracking-[-0.3px] hover:bg-white/90 active:scale-[0.985] transition-all">
              Join the Waitlist
            </a>
            <a href="#demo"
               className="px-12 py-4 rounded-2xl border border-white/30 hover:bg-white/5 font-medium text-lg tracking-[-0.3px] active:scale-[0.985] transition-all">
              Watch 2-min Demo
            </a>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40 text-xs tracking-[3px]">
          SCROLL TO EXPLORE
          <div className="w-px h-8 bg-white/20" />
        </div>
      </section>

      {/* ==================== TRUST BAR ==================== */}
      <div className="border-b border-white/10 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center items-center gap-x-12 gap-y-4 text-white/40 text-sm tracking-[2px]">
          <div>HIGH-PERFORMANCE TEAMS</div>
          <div>PRODUCTIVITY FIRST</div>
          <div>DEEP WORK PROTECTED</div>
          <div>AI THAT RESPECTS FOCUS</div>
        </div>
      </div>

      {/* ==================== FEATURES ==================== */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24">
        <div className="text-center mb-16">
          <div className="text-emerald-400 text-sm tracking-[4px] mb-3">INTELLIGENCE THAT MOVES WITH YOU</div>
          <h2 className="text-5xl tracking-[-2px]">See what actually matters.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Real-time Flow State",
              desc: "See your team’s actual momentum, not just activity. Know when flow is happening and protect it.",
              metric: "Team Flow Efficiency & Momentum"
            },
            {
              title: "Deep Work Protection",
              desc: "Automatically detect and defend focus time. Reduce context switching before it breaks deep work.",
              metric: "Focus Time & Deep Work"
            },
            {
              title: "Friction Intelligence",
              desc: "Identify bottlenecks the moment they appear. Know exactly where work slows down and why.",
              metric: "Bottleneck Detection • Optimal"
            }
          ].map((feature, i) => (
            <div key={i} className="group rounded-3xl border border-white/10 bg-white/[0.015] p-8 hover:border-white/20 transition-all">
              <div className="text-emerald-400 text-xs tracking-[3px] mb-4">0{i + 1}</div>
              <h3 className="text-3xl tracking-[-1.5px] mb-4">{feature.title}</h3>
              <p className="text-white/70 text-[15px] leading-relaxed mb-8">{feature.desc}</p>
              <div className="text-xs text-white/40 tracking-[2px]">{feature.metric}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== WAITLIST / FINAL CTA ==================== */}
      <section id="waitlist" className="border-t border-white/10 py-20 bg-black/30">
        <div className="max-w-2xl mx-auto text-center px-6">
          <h2 className="text-6xl tracking-[-2.5px] mb-6">Ready to let work flow?</h2>
          <p className="text-xl text-white/70 mb-10">Join the teams building the future of focused, high-momentum work.</p>
          <FlowLabsWaitlist />
        </div>
      </section>
    </main>
  );
}
