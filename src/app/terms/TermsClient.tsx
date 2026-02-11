'use client';

import React from 'react';
import { FileText, Zap, Scale, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import HolographicBriefing from '@/components/intelligence/HolographicBriefing';
import { useState } from 'react';

export default function TermsClient() {
    const [showBriefing, setShowBriefing] = useState(false);
    return (
        <main className="content-stage">
            <div className="max-w-4xl mx-auto py-12">
                <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-zinc-600 hover:text-emerald-400 transition-colors mb-16 group">
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Return to Command Deck
                </Link>

                <header className="mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/40 text-black">
                            <FileText className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] uppercase font-black tracking-[0.5em] text-emerald-500">Service Governance Layer</span>
                    </div>

                    <HolographicBriefing
                        isOpen={showBriefing}
                        onClose={() => setShowBriefing(false)}
                        agentId="strategic"
                        title="Governance Briefing"
                        description="I am here to outline the professional guardrails of the EdIntel ecosystem. This is a strategic partnership centered on accountability."
                        briefingSteps={[
                            "Map 14-day zero-cost pilot protocols.",
                            "Allocating Liquid Energy compute tokens.",
                            "Defining Professional Liability and review.",
                            "Establishing institutional governance."
                        ]}
                    />

                    <button
                        onClick={() => setShowBriefing(true)}
                        className="inline-flex items-center gap-2 mb-8 px-6 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[9px] font-black uppercase tracking-[0.3em] hover:bg-emerald-500/10 transition-all"
                    >
                        Initialize Governance Briefing
                    </button>
                    <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-8">
                        Terms of <span className="text-emerald-500">Identity</span>
                    </h1>
                    <p className="text-zinc-500 text-[10px] tracking-[0.4em] uppercase font-bold italic">
                        Effective Date: January 2026 // Mobile County District Node
                    </p>
                </header>

                <div className="space-y-16">
                    <section className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem]">
                        <div className="flex items-center gap-4 mb-8">
                            <Clock className="text-emerald-500 w-6 h-6" />
                            <h2 className="text-2xl font-black uppercase italic tracking-tight">The 14-Day Pilot Protocol</h2>
                        </div>
                        <p className="text-zinc-400 leading-relaxed font-medium">
                            Access is granted for a 14-day zero-cost evaluation period to authorized building administrators. Failure to cancel the pilot prior to the 15th day will initiate the $79.00/month Site License via the registered institutional payment method.
                        </p>
                    </section>

                    <section className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem]">
                        <div className="flex items-center gap-4 mb-8">
                            <Zap className="text-emerald-500 w-6 h-6" />
                            <h2 className="text-2xl font-black uppercase italic tracking-tight">Liquid Energy Economy</h2>
                        </div>
                        <p className="text-zinc-400 leading-relaxed font-medium">
                            Neural processing tokens ("Liquid Energy") are non-refundable and represent strategic processing power allocated from the School Vault. Misuse of the IEP Narrative Architect for non-educational or non-compliant purposes may result in building-wide node suspension.
                        </p>
                    </section>

                    <section className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem]">
                        <div className="flex items-center gap-4 mb-8">
                            <Scale className="text-emerald-500 w-6 h-6" />
                            <h2 className="text-2xl font-black uppercase italic tracking-tight">Professional Liability</h2>
                        </div>
                        <p className="text-zinc-400 leading-relaxed font-medium">
                            EdIntel EdIntel is a decision-support architecture. All AI-generated narratives, smart-drafts, and compliance logs must be reviewed, edited, and authenticated by a certified educator or building administrator before final submission or signature.
                        </p>
                    </section>

                    <footer className="pt-20 border-t border-white/5">
                        <div className="bg-emerald-600/[0.03] border border-emerald-500/20 p-10 rounded-[2.5rem] mb-12">
                            <h3 className="text-sm font-black uppercase text-emerald-400 tracking-[0.2em] mb-4 text-center italic">Service Administrator</h3>
                            <p className="text-center text-[10px] text-zinc-500 uppercase tracking-widest font-bold leading-loose">
                                Transcend Holistic Wellness, LLC <br />
                                Mobile, AL // United States District Code: 36601
                            </p>
                        </div>
                        <p className="text-[10px] text-center text-zinc-700 uppercase tracking-[0.5em] font-black italic">
                            EdIntel Terms Framework v4.2.1 Stable
                        </p>
                    </footer>
                </div>
            </div>
        </main>
    );
}
