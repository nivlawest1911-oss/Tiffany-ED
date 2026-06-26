'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-20 pb-24">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
          <div className="w-2 h-2 rounded-full bg-[#C5A46E]" />
          <span className="text-sm tracking-[3px] text-white/60">NOW USED IN 87+ SCHOOLS</span>
        </div>

        <h1 className="text-6xl md:text-7xl font-semibold tracking-[-3.5px] max-w-5xl leading-none mb-6">
          Institutional-grade AI<br />for K-12 education.
        </h1>
        
        <p className="max-w-2xl text-xl text-white/70 mb-10">
          EdIntel Sovereign helps districts reduce teacher workload, improve literacy outcomes, 
          and maintain full compliance — all inside the tools you already use.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/register">
            <Button className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold px-10 py-6 text-lg">
              Request a Demo
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" className="border-white/30 px-10 py-6 text-lg">
              Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="border-y border-white/10 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap justify-center items-center gap-x-12 gap-y-4 text-white/50 text-sm tracking-[2px]">
          <div>MOBILE COUNTY</div>
          <div>ALABAMA LITERACY ACT</div>
          <div>SCIENCE OF READING</div>
          <div>FERPA & COPPA COMPLIANT</div>
        </div>
      </div>

      {/* Value Props */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Traceable AI",
              desc: "Every lesson scaffold, grading draft, and rubric feedback is logged with exact ALCOS and Science of Reading alignment.",
            },
            {
              title: "Workload Reduction",
              desc: "Teachers save 5–8 hours per week on grading and planning through the AI Multiplier workflow.",
            },
            {
              title: "Seamless Integration",
              desc: "Works inside Canvas, Clever, and Google Classroom via LTI 1.3 with Deep Linking and grade passback.",
            },
          ].map((item, index) => (
            <div key={index} className="rounded-3xl border border-white/10 bg-white/[0.015] p-8">
              <h3 className="text-2xl font-semibold tracking-[-1px] mb-4">{item.title}</h3>
              <p className="text-white/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-white/10 py-16 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-5xl tracking-[-2px] font-semibold mb-4">
            Ready to give teachers time back?
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Join forward-thinking districts using EdIntel Sovereign.
          </p>
          <Link href="/register">
            <Button className="bg-[#C5A46E] hover:bg-[#A67C52] text-[#0A0F1C] font-semibold px-12 py-6 text-lg">
              Request a Demo
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
