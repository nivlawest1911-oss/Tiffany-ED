'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, EyeOff, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0c] text-white p-8 md:p-24 selection:bg-emerald-500/30">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-zinc-600 hover:text-emerald-400 transition-colors mb-16 group">
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Return to Command Deck
                </Link>

                <header className="mb-20">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-900/40 text-black">
                            <Shield className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] uppercase font-black tracking-[0.5em] text-emerald-500">Security & Operational Layer</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-8">
                        Data <span className="text-emerald-500">Sovereignty</span> Protocol
                    </h1>
                    <p className="text-zinc-500 text-[10px] tracking-[0.4em] uppercase font-bold italic">
                        Effective Date: January 2026 // Mobile County District Node
                    </p>
                </header>

                <div className="space-y-16">
                    <section className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem]">
                        <div className="flex items-center gap-4 mb-8">
                            <Lock className="text-emerald-500 w-6 h-6" />
                            <h2 className="text-2xl font-black uppercase italic tracking-tight">Institutional Ownership</h2>
                        </div>
                        <p className="text-zinc-400 leading-relaxed font-medium">
                            EdIntel Sovereign acts strictly as a "School Official" under FERPA guidelines. All student data ingested into the system remains the sole property of the Local Educational Agency (LEA). EdIntel does not own, sell, or monetize student information in any form.
                        </p>
                    </section>

                    <section className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem]">
                        <div className="flex items-center gap-4 mb-8">
                            <EyeOff className="text-emerald-500 w-6 h-6" />
                            <h2 className="text-2xl font-black uppercase italic tracking-tight">Zero-Training Directive</h2>
                        </div>
                        <p className="text-zinc-400 leading-relaxed font-medium">
                            We maintain a rigorous isolation protocol with our neural layers. Student data provided for IEP drafting or sentiment analysis is never used to train generalized AI models (including Google Gemini 1.5). Every request is processed in an isolated context and purged post-synthesis.
                        </p>
                    </section>

                    <section className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem]">
                        <div className="flex items-center gap-4 mb-8">
                            <Trash2 className="text-emerald-500 w-6 h-6" />
                            <h2 className="text-2xl font-black uppercase italic tracking-tight">Executive Deletion Authority</h2>
                        </div>
                        <p className="text-zinc-400 leading-relaxed font-medium">
                            District Administrators maintain absolute authority over their Site Node. Every building principal has the unilateral right to purge their site’s 'Sovereign Node' data at any time via the Admin Command Center, ensuring compliance with local data retention laws.
                        </p>
                    </section>

                    <footer className="pt-20 border-t border-white/5">
                        <div className="bg-emerald-600/[0.03] border border-emerald-500/20 p-10 rounded-[2.5rem] mb-12">
                            <h3 className="text-sm font-black uppercase text-emerald-400 tracking-[0.2em] mb-4 text-center italic">Institutional Contact</h3>
                            <p className="text-center text-[10px] text-zinc-500 uppercase tracking-widest font-bold leading-loose">
                                Dr. Alvin West, Jr. // Owner, Transcend Holistic Wellness, LLC <br />
                                Mobile, AL 36601 // District Liaison
                            </p>
                        </div>
                        <p className="text-[10px] text-center text-zinc-700 uppercase tracking-[0.5em] font-black italic">
                            Sovereign Privacy Framework v4.2.1 Stable
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
}
