'use client';
import React from 'react';
import Link from 'next/link';
import FeatureCard from '@/components/bento/FeatureCard';
import { FEATURES } from '@/app/whats-edintel/features';
import { ArrowRight } from 'lucide-react';
import HolographicBriefing from '@/components/HolographicBriefing';


export default function WhatsEdIntelClient() {
    const [showBriefing, setShowBriefing] = React.useState(false);
    return (
        <main className="content-stage">
            {/* Hero Section */}
            <section className="max-w-5xl mx-auto py-20 px-6 text-center">
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-4">
                    What <span className="text-intel-gold italic">is EdIntel?</span>
                </h1>

                <HolographicBriefing
                    isOpen={showBriefing}
                    onClose={() => setShowBriefing(false)}
                    agentId="visionary"
                    title="Intelligence Overview"
                    description="I am here to outline the primary operational modules of the EdIntel system. We are more than an AI service; we are a professional operating environment."
                    briefingSteps={[
                        "Neural Sync Engine: Predictive educator coaching.",
                        "Professional Token Economy: Transparent compute allocation.",
                        "Avatar Laboratory: Autonomous administrative delegates.",
                        "District Command: Real-time institutional visibility."
                    ]}
                />

                <button
                    onClick={() => setShowBriefing(true)}
                    className="block mx-auto mb-10 px-6 py-2 rounded-full border border-intel-gold/20 bg-intel-gold/5 text-intel-gold text-[9px] font-black uppercase tracking-[0.3em] hover:bg-intel-gold/10 transition-all"
                >
                    Initialize Intelligence Briefing
                </button>
                <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto">
                    EdIntel delivers a strategic-AI platform for educators, administrators, and districts. It combines neural‑sync coaching, custom avatar delegates, and a transparent token economy—all wrapped in a clinical, glass‑morphic UI.
                </p>
                <Link href="/" className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-intel-gold hover:bg-intel-gold/80 text-black rounded-xl font-black uppercase tracking-widest transition-colors">
                    Explore the Suite <ArrowRight size={16} />
                </Link>
            </section>


            {/* Trust Bar */}
            <div className="w-full bg-zinc-900 border-y border-zinc-800 py-6 mb-16">
                <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 text-zinc-500 font-bold uppercase tracking-widest text-xs">
                    <span>Trusted by 500+ Districts</span>
                    <span className="hidden md:inline">•</span>
                    <span>1.2M+ Strategic Centers Active</span>
                    <span className="hidden md:inline">•</span>
                    <span>HIPAA & FERPA Professional</span>
                </div>
            </div>

            {/* Features Grid */}
            <section className="max-w-7xl mx-auto px-6 py-12 mb-20">
                <div className="text-center mb-12">
                    <h2 className="text-[10px] font-black text-intel-gold/60 uppercase tracking-[0.4em] mb-4">Core Capabilities</h2>
                    <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">The Professional Suite</h3>
                </div>
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {FEATURES.map((feature) => (
                        <FeatureCard key={feature.id} feature={feature} />
                    ))}
                </div>
            </section>

            {/* Audience Segmentation */}
            <section className="bg-zinc-900 border-y border-zinc-800 py-24 mb-20 overflow-hidden relative">
                <div
                    className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 to-transparent"
                />
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* For Educators */}
                        <div className="p-8 rounded-[2rem] bg-zinc-950 border border-zinc-800 hover:border-emerald-600/50 transition-all group">
                            <h3 className="text-2xl font-black text-white mb-4">For Educators</h3>
                            <p className="text-zinc-400 mb-6 leading-relaxed">
                                Automate legislative burden. Draft IEPs, behavior plans, and lesson units with a Professional Aide that learns your voice.
                            </p>
                            <Link href="/" className="text-emerald-500 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all">
                                View Protocols <ArrowRight size={14} />
                            </Link>
                        </div>

                        {/* For Administrators */}
                        <div className="p-8 rounded-[2rem] bg-zinc-950 border border-zinc-800 hover:border-blue-600 transition-all group">
                            <h3 className="text-2xl font-black text-white mb-4">For Administrators</h3>
                            <p className="text-zinc-400 mb-6 leading-relaxed">
                                Gain real-time compliance visibility. Monitor district-wide neural health, budget allocation, and operational efficiency.
                            </p>
                            <Link href="/" className="text-blue-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                                Access Command <ArrowRight size={14} />
                            </Link>
                        </div>

                        {/* For Researchers */}
                        <div className="p-8 rounded-[2rem] bg-zinc-950 border border-zinc-800 hover:border-purple-600 transition-all group">
                            <h3 className="text-2xl font-black text-white mb-4">For Researchers</h3>
                            <p className="text-zinc-400 mb-6 leading-relaxed">
                                Leverage anonymized, strategic data sets to study cognitive impact and educational outcomes at scale.
                            </p>
                            <Link href="/" className="text-purple-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                                Request Data Centers <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="bg-gradient-to-br from-intel-gold/20 to-black/40 py-20 mb-20 rounded-[3rem] mx-6 border border-intel-gold/10">
                <div className="max-w-5xl mx-auto text-center px-6">
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
                        Ready to Transform <span className="text-intel-gold">Your District?</span>
                    </h2>
                    <p className="text-zinc-300 max-w-xl mx-auto mb-10 text-lg">
                        Join the professional education revolution. Book a demo or start a 14‑day pilot directly from your dashboard.
                    </p>
                    <Link href="/signup" className="px-12 py-5 bg-intel-gold text-black font-black uppercase tracking-widest rounded-2xl hover:bg-white transition-all shadow-[0_0_50px_rgba(197,164,126,0.2)]">
                        Initialize Trial
                    </Link>
                </div>
            </section>
        </main>
    );
}
