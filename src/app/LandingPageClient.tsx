'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, CheckCircle2, Hexagon, Activity, Cpu, Workflow, BarChart3, Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { LeadIntake } from '@/components/LeadIntake';
import { ComplianceBadge } from '@/components/legal/FerpaBadge';

export default function LandingPageClient() {
    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30 overflow-x-hidden font-sans">
            {/* 🌌 Quantum Fabric Background Layer */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1)_0%,transparent_70%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#6366f1_1px,transparent_1px)] bg-[size:20px_20px]" />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-2xl border-b border-indigo-500/10 py-6 px-10 flex justify-between items-center">
                <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-600 flex items-center justify-center font-black italic text-white group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/20">Q</div>
                    <div className="flex flex-col">
                        <span className="text-sm font-black uppercase italic tracking-tighter leading-none">Quantum Studio</span>
                        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-cyan-500/60 mt-0.5">Mobile County Core</span>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-10 text-[9px] uppercase font-black tracking-[0.3em] text-slate-500">
                    <Link href="#tech" className="hover:text-cyan-400 transition-colors">Neural Grid</Link>
                    <Link href="#pricing" className="hover:text-cyan-400 transition-colors">Access Nodes</Link>
                    <Link href="#compliance" className="hover:text-cyan-400 transition-colors">Governance</Link>
                    <Link href="/login" className="px-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-indigo-600 hover:text-white transition-all hover:border-indigo-500 shadow-xl">Bio-Auth Login</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32">
                <div className="relative z-10 text-center space-y-12 max-w-7xl">
                    <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-forwards">
                        <div className="inline-flex items-center gap-3 px-5 py-2 border border-cyan-500/20 rounded-full bg-cyan-500/5 mb-2 backdrop-blur-md">
                            <Activity className="w-3 h-3 text-cyan-500 animate-pulse" />
                            <span className="text-[9px] uppercase tracking-[0.5em] text-cyan-400 font-black">
                                Mobile County Authorized // v5.0
                            </span>
                        </div>
                        <ComplianceBadge />
                    </div>

                    <h1 className="text-7xl md:text-[10rem] lg:text-[12rem] font-black italic uppercase tracking-tighter leading-[0.75] mb-16 drop-shadow-[0_0_50px_rgba(99,102,241,0.3)] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 fill-mode-forwards">
                        Quantum <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 leading-tight pb-4">Intelligence</span>
                    </h1>

                    <p className="text-lg md:text-3xl text-slate-400 font-medium max-w-4xl mx-auto tracking-tight leading-snug animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300 fill-mode-forwards">
                        The Operating System for the Modern Educator. <br className="hidden md:block" />
                        Reclaiming instructional time through spatial logistics & high-fidelity AI.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-8 pt-16"
                    >
                        <Link href="/signup" className="group relative w-full md:w-auto px-16 py-7 bg-indigo-600 text-white font-black uppercase text-xs tracking-[0.4em] rounded-2xl overflow-hidden shadow-2xl shadow-indigo-900/50 hover:bg-indigo-500 transition-all hover:scale-105 active:scale-95">
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                Initialize 30-Day Trial <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 rotate-12" />
                        </Link>
                        <Link href="#pricing" className="w-full md:w-auto px-16 py-7 bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-[0.4em] rounded-2xl hover:border-cyan-500/50 transition-all text-center backdrop-blur-xl">
                            View Site Licenses
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-12 flex flex-col items-center gap-2 text-slate-600 opacity-50"
                >
                    <span className="text-[8px] font-black uppercase tracking-[0.5em]">Scroll to Access</span>
                    <div className="w-px h-12 bg-gradient-to-b from-cyan-500 to-transparent" />
                </motion.div>
            </section>

            {/* Tech Grid Section */}
            <section id="tech" className="py-48 px-10 border-t border-white/5 bg-[#020617] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none">
                    <Hexagon size={600} className="text-indigo-500" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-32 border-b border-indigo-500/10 pb-20">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Cpu className="w-5 h-5 text-cyan-500" />
                                <span className="text-[9px] font-black uppercase text-cyan-500/60 tracking-[0.5em]">System Architecture</span>
                            </div>
                            <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none text-white">The Neural Grid</h2>
                            <p className="text-slate-500 uppercase tracking-[0.4em] text-[10px] mt-6 font-black max-w-md leading-relaxed">Multi-Layered Intelligence Stack authorized for Alabama Districts.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Cpu, title: 'Gemini Brain', desc: 'Superior reasoning for complex IEP narratives and state compliance audits. Next-gen contextual awareness.' },
                            { icon: Workflow, title: 'Fluid Dock', desc: 'Spatial glassmorphism interface enabling seamless transitions between instructional modules.' },
                            { icon: BarChart3, title: 'Token Economy', desc: 'Sovereign resource management with real-time depletion forecasting. Title I Optimized.' },
                            { icon: ShieldCheck, title: 'Legal Vault', desc: 'FERPA-saturated storage for all strategic narratives and sensitive data logs. AES-256 Hardened.' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="p-10 bg-indigo-900/[0.05] border border-white/5 rounded-[3rem] hover:border-cyan-500/40 transition-all group relative overflow-hidden backdrop-blur-xl"
                            >
                                <item.icon className="w-12 h-12 text-indigo-500/30 mb-8 group-hover:text-cyan-400 transition-colors group-hover:scale-110 transition-transform" />
                                <h3 className="text-2xl font-black uppercase italic tracking-tight mb-6 text-white">{item.title}</h3>
                                <p className="text-xs text-slate-500 leading-relaxed uppercase font-bold tracking-widest leading-loose">{item.desc}</p>

                                {/* Visual Flair */}
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-500/5 blur-2xl group-hover:bg-cyan-500/10 transition-colors" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-48 px-10 border-y border-white/5 relative bg-indigo-950/20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-32">
                        <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-white">Site Access</h2>
                        <p className="text-cyan-500/60 uppercase tracking-[0.5em] text-[10px] mt-6 font-black">Scalable Infrastructure for Mobile County & Beyond</p>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 items-center">
                        {/* 1. Starter / Novice Educator */}
                        <div className="p-12 bg-black/40 border border-white/10 rounded-[3rem] hover:border-white/20 transition-all relative group backdrop-blur-2xl xl:scale-90">
                            <div className="flex justify-between items-start mb-14">
                                <h3 className="text-2xl font-black uppercase italic tracking-tight text-white">Novice Node</h3>
                                <span className="text-[10px] text-zinc-600 uppercase font-black bg-white/5 px-4 py-1.5 rounded-full border border-white/5 tracking-[0.2em]">Pilot</span>
                            </div>
                            <div className="text-7xl font-black text-white italic mb-14">$0<span className="text-xl text-zinc-700 tracking-normal non-italic font-bold ml-2">/mo</span></div>
                            <ul className="space-y-8 mb-16">
                                {[
                                    'Limited Lesson Plans',
                                    'Basic Chat Agents',
                                    'Standard AI Model',
                                    'Community Support'
                                ].map((li, i) => (
                                    <li key={i} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-zinc-400">
                                        <CheckCircle2 className="w-5 h-5 text-zinc-800 group-hover:text-indigo-500/40 transition-colors" /> {li}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/signup" className="block w-full text-center py-6 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/5 transition-all hover:border-white/20 text-white">Initialize Free</Link>
                        </div>

                        {/* 2. School Site Pro (Featured) */}
                        <div className="p-12 bg-indigo-950/40 border-2 border-indigo-500 rounded-[4rem] relative shadow-[0_0_80px_rgba(99,102,241,0.2)] group backdrop-blur-3xl overflow-hidden xl:scale-110 z-10">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-[10px] font-black px-10 py-3 rounded-full uppercase tracking-[0.5em] shadow-xl shadow-indigo-900/40">
                                Standard Issue
                            </div>
                            <div className="flex justify-between items-start mb-14 mt-6">
                                <div className="flex items-center gap-3">
                                    <Zap className="w-7 h-7 text-yellow-400" />
                                    <h3 className="text-2xl font-black uppercase italic tracking-tight text-white">School Site Pro</h3>
                                </div>
                                <span className="text-[10px] text-indigo-300 uppercase font-black tracking-[0.2em]">Full Access</span>
                            </div>
                            <div className="text-7xl font-black text-white italic mb-4">$79<span className="text-xl text-indigo-500/50 tracking-normal non-italic font-bold ml-2">/license</span></div>
                            <div className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-14">+ metered token refills</div>

                            <ul className="space-y-8 mb-16">
                                {[
                                    'Unlimited Lesson Plans',
                                    'Full Agent Suite (IEP, Visual Lab)',
                                    'Advanced Models (GPT-4/Gemini)',
                                    '30-Day Full Trial',
                                    'Priority Support'
                                ].map((li, i) => (
                                    <li key={i} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-indigo-100">
                                        <CheckCircle2 className="w-5 h-5 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]" /> {li}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/signup?plan=pro" className="block w-full py-6 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-center text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl hover:brightness-110 transition-all shadow-xl shadow-indigo-900/60 hover:scale-105 active:scale-95">
                                Start 30-Day Trial
                            </Link>
                        </div>

                        {/* 3. District / Admin */}
                        <div className="p-12 bg-black/40 border border-white/10 rounded-[3rem] hover:border-white/20 transition-all relative group backdrop-blur-2xl xl:scale-90">
                            <div className="flex justify-between items-start mb-14">
                                <h3 className="text-2xl font-black uppercase italic tracking-tight text-white">District Matrix</h3>
                                <span className="text-[10px] text-slate-500 uppercase font-black bg-white/5 px-4 py-1.5 rounded-full border border-white/5 tracking-[0.2em]">Enterprise</span>
                            </div>
                            <div className="text-7xl font-black text-slate-600 italic mb-14 uppercase tracking-tighter">Custom</div>
                            <ul className="space-y-8 mb-16">
                                {[
                                    'Volume Licensing',
                                    'Admin Command Center',
                                    'SSO Integration',
                                    'FERPA/COPPA Compliance',
                                    'Dedicated Success Manager'
                                ].map((li, i) => (
                                    <li key={i} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-500">
                                        <CheckCircle2 className="w-5 h-5 text-slate-700" /> {li}
                                    </li>
                                ))}
                            </ul>
                            <Link href="#request" className="block w-full text-center py-6 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/5 transition-all text-slate-400 hover:text-white">Contact HQ</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Intake Section */}
            <section id="request" className="py-64 px-10 relative overflow-hidden bg-black">
                <div className="absolute inset-0 bg-indigo-500/5 blur-[120px] -z-10" />
                <div className="max-w-4xl mx-auto text-center mb-32">
                    <div className="flex items-center justify-center gap-3 text-cyan-500 mb-8">
                        <Sparkles className="w-6 h-6" />
                        <span className="text-[10px] font-black uppercase tracking-[0.8em]">Neural Pilot Initiation</span>
                    </div>
                    <h2 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-none mb-10 text-white">Initiate Your <br /> <span className="text-indigo-500">Pilot</span></h2>
                    <p className="text-slate-500 uppercase tracking-[0.5em] text-[10px] font-black max-w-2xl mx-auto leading-loose">Mobile County School Board Approved Deployment Path for 2027 Strategic Alignment.</p>
                </div>
                <LeadIntake />
            </section>

            {/* Footer */}
            {/* Founder Vision */}
            <section className="py-48 px-10 border-t border-white/5 bg-[#020617] relative overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
                    <div className="md:w-1/2 space-y-12">
                        <div className="flex items-center gap-3 mb-4">
                            <Activity className="w-5 h-5 text-indigo-500" />
                            <span className="text-[9px] font-black uppercase text-indigo-500/60 tracking-[0.5em]">Visionary Architecture</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-white">
                            Propelling Humanity <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Forward</span>
                        </h2>
                        <blockquote className="text-xl md:text-2xl text-slate-300 font-serif italic leading-relaxed border-l-4 border-indigo-500 pl-8 py-2">
                            "We are not just building software for Mobile County; we are constructing a cognitive exoskeleton for the modern educator. By compressing logistical time, we expand the human capacity for mentorship."
                        </blockquote>
                        <div className="pt-8">
                            <h4 className="text-2xl font-black uppercase italic tracking-tight text-white mb-2">Dr. Alvin West, Jr.</h4>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-[0.3em] mb-8">Founder | Transcend Holistic Wellness, LLC</p>
                            <div className="flex gap-4">
                                {['EdD', 'Technology Visionary', 'Mobile Native'].map((tag, i) => (
                                    <span key={i} className="px-4 py-2 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2 relative h-[600px] w-full bg-indigo-950/20 rounded-[4rem] border border-white/5 overflow-hidden group">
                        {/* Placeholder for Dr. West Image - Use your generate_image tool if needed, currently using gradient representation */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-cyan-900/40 backdrop-blur-sm" />
                        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-500/20 blur-[100px]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                            <div className="w-48 h-48 border border-cyan-500/20 rounded-full" />
                        </div>
                        <div className="absolute bottom-10 left-10 right-10 p-8 bg-black/60 backdrop-blur-xl rounded-3xl border border-white/10">
                            <div className="flex items-center gap-4 text-white">
                                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                                <span className="text-[10px] uppercase tracking-widest font-black">System Status: Optimal</span>
                            </div>
                            <p className="text-slate-400 text-xs mt-4 leading-relaxed line-clamp-3">
                                Leading the charge in redefining educational logistics through applied artificial intelligence and holistic systems thinking.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="py-24 px-10 border-t border-white/5 bg-[#010410]">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black uppercase tracking-[0.5em] text-slate-600">
                    <span>© 2026 Quantum Studio</span>
                    <span>Mobile County Core</span>
                    <span>Transcend Holistic Wellness</span>
                </div>
            </footer>
        </div>
    );
}
