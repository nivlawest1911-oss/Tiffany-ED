'use client';
import React from 'react';
import Link from 'next/link';
import FeatureCard from '@/components/bento/FeatureCard';
import { FEATURES } from '@/app/whats-edintel/features';
import { ArrowRight } from 'lucide-react';


export default function WhatsEdIntelClient() {
    return (
        <main className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
            {/* Hero Section */}
            <section className="max-w-5xl mx-auto py-20 px-6 text-center">
                <h1 className="text-5xl font-black tracking-tighter uppercase">
                    What <span className="text-amber-600">is EdIntel?</span>
                </h1>
                <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto">
                    EdIntel delivers a strategic-AI platform for educators, administrators, and districts. It combines neural‑sync coaching, custom avatar delegates, and a transparent token economy—all wrapped in a clinical, glass‑morphic UI.
                </p>
                <Link href="/" className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-black uppercase tracking-widest transition-colors">
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
                    <h2 className="text-sm font-black text-amber-600 uppercase tracking-widest mb-2">Capabilities</h2>
                    <h3 className="text-3xl font-black text-white">The Professional Suite</h3>
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
                        <div className="p-8 rounded-[2rem] bg-zinc-950 border border-zinc-800 hover:border-amber-600 transition-all group">
                            <h3 className="text-2xl font-black text-white mb-4">For Educators</h3>
                            <p className="text-zinc-400 mb-6 leading-relaxed">
                                Automate legislative burden. Draft IEPs, behavior plans, and lesson units with a Professional Aide that learns your voice.
                            </p>
                            <Link href="/" className="text-amber-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
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
            <section className="bg-amber-900/30 py-12 mb-20 rounded-3xl mx-6">
                <div className="max-w-5xl mx-auto text-center px-6">
                    <h2 className="text-3xl font-black uppercase tracking-tighter text-amber-200">
                        Ready to Transform Your District?
                    </h2>
                    <p className="mt-4 text-zinc-200 max-w-xl mx-auto">
                        Join the professional education revolution. Book a demo or start a 14‑day pilot directly from your dashboard.
                    </p>
                    <Link href="/pricing" className="mt-8 inline-block px-10 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-black uppercase tracking-widest transition-colors shadow-lg shadow-amber-900/20">
                        Get Started
                    </Link>
                </div>
            </section>
        </main>
    );
}
