'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield as LucideShield, Brain, Zap, Target, Users, Key, Clock, Award, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import FloatingNavbar from '@/components/FloatingNavbar';
import CircadianFilter from '@/components/graphics/CircadianFilter';
import HolographicBriefing from '@/components/HolographicBriefing';
import { FounderDossier } from '@/components/founder-dossier';

export default function AboutPage() {
    const [showBriefing, setShowBriefing] = useState(false);
    return (
        <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30 overflow-x-hidden">
            <CircadianFilter />
            <FloatingNavbar />

            {/* 1. Hero: The Manifesto - Enhanced Background */}
            <div className="relative pt-40 pb-32 px-6 overflow-hidden">
                {/* Dynamic Background */}
                <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-indigo-950/20 via-purple-950/10 to-black pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 blur-[150px] rounded-full mix-blend-screen pointer-events-none animate-pulse-slow" />
                <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-black uppercase tracking-[0.2em] mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.2)]"
                    >
                        <LucideShield size={12} /> Our Mission
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95, letterSpacing: "-0.02em" }}
                        animate={{ opacity: 1, scale: 1, letterSpacing: "0em" }}
                        className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase mb-8 leading-[0.9]"
                    >
                        We Do Not Just <span className="text-zinc-500">Build Software.</span><br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-400 animate-gradient-x">We Empower Educators.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light"
                    >
                        The modern educational system is designed to consume time, energy, and cognitive bandwidth.
                        <strong className="text-white font-medium"> EdIntel Professional</strong> exists to reclaim it—giving educators the power to lead with logic, precision, and absolute authority.
                    </motion.p>
                </div>
            </div>

            {/* 2. The Architect: Dr. Alvin West - Enhanced Layout */}
            <FounderDossier />

            {/* 3. The Philosophy: Professional Pillars - Glass Cards */}
            <section className="py-32 px-6 relative bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">The 4 Pillars of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Leadership</span></h2>
                        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                            Our platform is strictly engineered upon these non-negotiable principles.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: Brain,
                                title: "Cognitive Offload",
                                desc: "We automate low-level logic (forms, scheduling) so you can focus on high-level strategy.",
                                color: "from-indigo-500 to-blue-500"
                            },
                            {
                                icon: LucideShield,
                                title: "Legal Ironclad",
                                desc: "Every output is FERPA-compliant and audit-ready. We protect you from liability.",
                                color: "from-emerald-500 to-cyan-500"
                            },
                            {
                                icon: Key,
                                title: "Data Ownership",
                                desc: "You are not a product. Your data belongs to you, encrypted and sovereign.",
                                color: "from-purple-500 to-pink-500"
                            },
                            {
                                icon: Zap,
                                title: "Efficiency & Speed",
                                desc: "What took days now takes seconds. Reclaim your time to focus on student outcomes.",
                                color: "from-orange-500 to-red-500"
                            }
                        ].map((pillar, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-8 rounded-[2rem] bg-zinc-900/40 border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.color} p-0.5 mb-8 shadow-lg group-hover:shadow-indigo-500/20 transition-all`}>
                                    <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center">
                                        <pillar.icon size={24} className="text-white" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all">
                                    {pillar.title}
                                </h3>
                                <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">
                                    {pillar.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Timeline / Mission Stats - Data Stream */}
            <section className="py-32 bg-zinc-950 px-6 border-y border-white/5 overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
                        <div className="text-center p-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-800 mb-4"
                            >
                                47K
                            </motion.div>
                            <div className="text-indigo-400 uppercase text-xs tracking-[0.3em] font-bold">Educators Empowered</div>
                        </div>
                        <div className="text-center p-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                                className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-800 mb-4"
                            >
                                98%
                            </motion.div>
                            <div className="text-purple-400 uppercase text-xs tracking-[0.3em] font-bold">Time Reclaimed</div>
                        </div>
                        <div className="text-center p-8">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-800 mb-4"
                            >
                                142
                            </motion.div>
                            <div className="text-pink-400 uppercase text-xs tracking-[0.3em] font-bold">Districts Secured</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. CTA: Join the Movement */}
            <section className="py-40 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-tight">
                        Stop Managing.<br /> Start <span className="text-indigo-400">Leading.</span>
                    </h2>
                    <p className="text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto font-light">
                        The platform is ready. The community is active. Your dashboard is waiting to be initialized.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link href="/the-room" className="group">
                            <button className="px-10 py-5 bg-white text-black font-black uppercase text-sm tracking-widest rounded-2xl hover:scale-105 hover:bg-zinc-200 transition-all flex items-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                                Enter The Room
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                        <Link href="/contact">
                            <button className="px-10 py-5 bg-black/50 backdrop-blur-md border border-white/10 text-white font-black uppercase text-sm tracking-widest rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all">
                                Contact Command
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
