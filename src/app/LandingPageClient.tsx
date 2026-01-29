'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, CheckCircle2, ChevronRight, Hexagon, Activity, Cpu, Workflow, BarChart3, Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { LeadIntake } from '@/components/LeadIntake';
import { ComplianceBadge } from '@/components/legal/FerpaBadge';

export default function LandingPageClient() {
    return (
        <div className="min-h-screen bg-[#050507] text-white selection:bg-emerald-500/30 overflow-x-hidden font-sans">
            {/* 🌌 Neural Fabric Background Layer - Optimized (CSS Only) */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)]" />
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '80px 80px'
                }} />
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }} />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-2xl border-b border-white/5 py-6 px-10 flex justify-between items-center">
                <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center font-black italic text-black group-hover:rotate-12 transition-transform shadow-lg shadow-emerald-900/40">E</div>
                    <div className="flex flex-col">
                        <span className="text-sm font-black uppercase italic tracking-tighter leading-none">EdIntel Sovereign</span>
                        <span className="text-[8px] font-black uppercase tracking-[0.4em] text-emerald-500/60 mt-0.5">District Command Mesh</span>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-10 text-[9px] uppercase font-black tracking-[0.3em] text-zinc-500">
                    <Link href="#tech" className="hover:text-emerald-400 transition-colors">Neural Grid</Link>
                    <Link href="#pricing" className="hover:text-emerald-400 transition-colors">Site Nodes</Link>
                    <Link href="#compliance" className="hover:text-emerald-400 transition-colors">Governance</Link>
                    <Link href="/login" className="px-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-emerald-600 hover:text-black transition-all hover:border-emerald-500 shadow-xl">Command Deck</Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32">
                <div className="relative z-10 text-center space-y-12 max-w-7xl">
                    <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-forwards">
                        <div className="inline-flex items-center gap-3 px-5 py-2 border border-emerald-500/20 rounded-full bg-emerald-500/5 mb-2 backdrop-blur-md">
                            <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
                            <span className="text-[9px] uppercase tracking-[0.5em] text-emerald-400 font-black">
                                Alabama Literacy & Numeracy Act Compliant // v4.2
                            </span>
                        </div>
                        <ComplianceBadge />
                    </div>

                    <h1 className="text-7xl md:text-[10rem] lg:text-[12rem] font-black italic uppercase tracking-tighter leading-[0.75] mb-16 drop-shadow-[0_0_50px_rgba(16,185,129,0.2)] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100 fill-mode-forwards">
                        Sovereign <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Intelligence</span>
                    </h1>

                    <p className="text-lg md:text-3xl text-zinc-400 font-medium max-w-4xl mx-auto tracking-tight leading-snug animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300 fill-mode-forwards">
                        Autonomous strategic layers for the Modern Educator. <br className="hidden md:block" />
                        Designed in Alabama to reclaim instructional time through high-fidelity AI.
                    </p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-8 pt-16"
                    >
                        <Link href="/login" className="group relative w-full md:w-auto px-16 py-7 bg-emerald-600 text-black font-black uppercase text-xs tracking-[0.4em] rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/50 hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95">
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                Initiate System <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 rotate-12" />
                        </Link>
                        <Link href="#pricing" className="w-full md:w-auto px-16 py-7 bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-[0.4em] rounded-2xl hover:border-emerald-500/50 transition-all text-center backdrop-blur-xl">
                            View Node Specs
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-12 flex flex-col items-center gap-2 text-zinc-700 opacity-50"
                >
                    <span className="text-[8px] font-black uppercase tracking-[0.5em]">Pulse Core Down</span>
                    <div className="w-px h-12 bg-gradient-to-b from-emerald-500 to-transparent" />
                </motion.div>
            </section>

            {/* Tech Grid Section */}
            <section id="tech" className="py-48 px-10 border-t border-white/5 bg-[#050507] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none">
                    <Hexagon size={600} className="text-emerald-500" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-32 border-b border-white/5 pb-20">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <Workflow className="w-5 h-5 text-emerald-500" />
                                <span className="text-[9px] font-black uppercase text-emerald-500/60 tracking-[0.5em]">System Architecture</span>
                            </div>
                            <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none">The Neural Grid</h2>
                            <p className="text-zinc-500 uppercase tracking-[0.4em] text-[10px] mt-6 font-black max-w-md leading-relaxed">Multi-Layered Intelligence Stack authorized for Alabama Districts.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: Cpu, title: 'Gemini Brain', desc: 'Superior reasoning for complex IEP narratives and state compliance audits. Next-gen contextual awareness.' },
                            { icon: Workflow, title: 'Sovereign Router', desc: 'Proprietary data pathways keeping institutional intelligence within your building. Zero-leak protocol.' },
                            { icon: BarChart3, title: 'Energy Economy', desc: 'Predictable site-based resource management with real-time depletion forecasting. Title I Optimized.' },
                            { icon: ShieldCheck, title: 'Legal Vault', desc: 'FERPA-saturated storage for all strategic narratives and sensitive data logs. AES-256 Hardened.' }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="p-10 bg-white/[0.02] border border-white/10 rounded-[3rem] hover:border-emerald-500/40 transition-all group relative overflow-hidden backdrop-blur-xl"
                            >
                                <item.icon className="w-12 h-12 text-emerald-500/30 mb-8 group-hover:text-emerald-500 transition-colors group-hover:scale-110 transition-transform" />
                                <h3 className="text-2xl font-black uppercase italic tracking-tight mb-6">{item.title}</h3>
                                <p className="text-xs text-zinc-500 leading-relaxed uppercase font-bold tracking-widest leading-loose">{item.desc}</p>

                                {/* Visual Flair */}
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald-500/5 blur-2xl group-hover:bg-emerald-500/10 transition-colors" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-48 px-10 border-y border-white/5 relative bg-emerald-950/20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-32">
                        <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter">Site Provisioning</h2>
                        <p className="text-emerald-500/60 uppercase tracking-[0.5em] text-[10px] mt-6 font-black">Scalable Infrastructure for Mobile County & Beyond</p>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                        {/* 1. Starter / Novice Educator */}
                        <div className="p-12 bg-black/40 border border-white/10 rounded-[4rem] hover:border-white/20 transition-all relative group backdrop-blur-2xl">
                            <div className="flex justify-between items-start mb-14">
                                <h3 className="text-2xl font-black uppercase italic tracking-tight">Novice Educator</h3>
                                <span className="text-[10px] text-zinc-600 uppercase font-black bg-white/5 px-4 py-1.5 rounded-full border border-white/5 tracking-[0.2em]">Tier 1 Entry</span>
                            </div>
                            <div className="text-7xl font-black text-white italic mb-14">$0<span className="text-xl text-zinc-700 tracking-normal non-italic font-bold ml-2">/mo</span></div>
                            <ul className="space-y-8 mb-16">
                                {[
                                    '5 AI Lesson Plans / mo',
                                    'Basic Chat Agents',
                                    'Standard AI Model (Flash)',
                                    '1GB Secure Storage',
                                    'Community Support'
                                ].map((li, i) => (
                                    <li key={i} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-zinc-400">
                                        <CheckCircle2 className="w-5 h-5 text-zinc-800 group-hover:text-emerald-500/40 transition-colors" /> {li}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/signup" className="block w-full text-center py-6 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/5 transition-all hover:border-white/20 text-white">Initialize Token</Link>
                        </div>

                        {/* 2. Pro / Master Teacher (Featured) */}
                        <div className="p-12 bg-emerald-600/5 border-2 border-emerald-500 rounded-[4rem] relative shadow-[0_0_80px_rgba(16,185,129,0.15)] group backdrop-blur-3xl overflow-hidden">
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-[10px] font-black px-10 py-3 rounded-full uppercase tracking-[0.5em] shadow-xl shadow-emerald-900/40">
                                Recommended
                            </div>
                            <div className="flex justify-between items-start mb-14 mt-6">
                                <div className="flex items-center gap-3">
                                    <Zap className="w-7 h-7 text-emerald-500" />
                                    <h3 className="text-2xl font-black uppercase italic tracking-tight">Master Teacher</h3>
                                </div>
                                <span className="text-[10px] text-emerald-500 uppercase font-black tracking-[0.2em]">Pro License</span>
                            </div>
                            <div className="text-7xl font-black text-white italic mb-14 text-emerald-400">$19<span className="text-xl text-emerald-500/30 tracking-normal non-italic font-bold ml-2">/mo</span></div>
                            <ul className="space-y-8 mb-16">
                                {[
                                    'Unlimited Lesson Plans',
                                    'Full Agent Access (IEP, Grader)',
                                    'Advanced Model (GPT-4/Gemini)',
                                    '50 AI Images / mo',
                                    'Export to PDF / Word / Slides'
                                ].map((li, i) => (
                                    <li key={i} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-zinc-200">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" /> {li}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/pricing?plan=pro" className="block w-full py-6 bg-emerald-600 text-black text-center text-[10px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-900/60 hover:scale-105 active:scale-95">
                                Upgrade & Deploy
                            </Link>
                        </div>

                        {/* 3. Campus / District Admin */}
                        <div className="p-12 bg-black/40 border border-white/10 rounded-[4rem] hover:border-white/20 transition-all relative group backdrop-blur-2xl">
                            <div className="flex justify-between items-start mb-14">
                                <h3 className="text-2xl font-black uppercase italic tracking-tight">EdIntel Campus</h3>
                                <span className="text-[10px] text-blue-500/50 uppercase font-black bg-white/5 px-4 py-1.5 rounded-full border border-white/5 tracking-[0.2em]">Enterprise</span>
                            </div>
                            <div className="text-7xl font-black text-zinc-600 italic mb-14 uppercase tracking-tighter">Custom</div>
                            <ul className="space-y-8 mb-16">
                                {[
                                    'Volume Pricing ($15/seat for 10+)',
                                    'Admin Analytics Dashboard',
                                    'SSO Integration',
                                    'FERPA/COPPA Compliance Signed',
                                    'Priority Support'
                                ].map((li, i) => (
                                    <li key={i} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-zinc-500">
                                        <CheckCircle2 className="w-5 h-5 text-zinc-800" /> {li}
                                    </li>
                                ))}
                            </ul>
                            <Link href="#request" className="block w-full text-center py-6 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white/5 transition-all">Contact Sales</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Intake Section */}
            <section id="request" className="py-64 px-10 relative overflow-hidden bg-black">
                <div className="absolute inset-0 bg-emerald-500/5 blur-[120px] -z-10" />
                <div className="max-w-4xl mx-auto text-center mb-32">
                    <div className="flex items-center justify-center gap-3 text-emerald-500 mb-8">
                        <Sparkles className="w-6 h-6" />
                        <span className="text-[10px] font-black uppercase tracking-[0.8em]">Neural Pilot Initiation</span>
                    </div>
                    <h2 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-none mb-10">Initiate Your <br /> <span className="text-emerald-500">Pilot</span></h2>
                    <p className="text-zinc-500 uppercase tracking-[0.5em] text-[10px] font-black max-w-2xl mx-auto leading-loose">Mobile County School Board Approved Deployment Path for 2027 Strategic Alignment.</p>
                </div>
                <LeadIntake />
            </section>

            {/* Footer */}
            <footer className="py-32 px-10 border-t border-white/5 bg-[#050507]">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-24 mb-32">
                        <div className="space-y-10">
                            <div className="flex items-center gap-4 group">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center font-black italic text-black group-hover:rotate-12 transition-transform">E</div>
                                <span className="text-3xl font-black uppercase italic tracking-tighter leading-none">EdIntel</span>
                            </div>
                            <p className="text-xs text-zinc-600 uppercase font-black tracking-widest max-w-sm leading-8">
                                Proprietary Intelligence developed by transcendence holistic wellness, LLC.<br />Calibrated for the 2027 Alabama Strategic Roadmap.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-24">
                            <div className="space-y-8">
                                <h4 className="text-[10px] font-black uppercase text-white tracking-[0.5em] border-l-2 border-emerald-500 pl-4">Protocols</h4>
                                <ul className="space-y-6 text-[10px] font-black uppercase text-zinc-500 tracking-[0.3em]">
                                    <li className="hover:text-emerald-400 cursor-pointer transition-colors">Sovereign Router</li>
                                    <li className="hover:text-emerald-400 cursor-pointer transition-colors">Legal Vault</li>
                                    <li className="hover:text-emerald-400 cursor-pointer transition-colors">Gemini Core</li>
                                </ul>
                            </div>
                            <div className="space-y-8">
                                <h4 className="text-[10px] font-black uppercase text-white tracking-[0.5em] border-l-2 border-emerald-500 pl-4">Institutional</h4>
                                <ul className="space-y-6 text-[10px] font-black uppercase text-zinc-500 tracking-[0.3em]">
                                    <li className="hover:text-emerald-400 cursor-pointer transition-colors">MCPSS Link</li>
                                    <li className="hover:text-emerald-400 cursor-pointer transition-colors">AL Literacy Act</li>
                                    <li className="hover:text-emerald-400 cursor-pointer transition-colors">AL Numeracy Act</li>
                                </ul>
                            </div>
                            <div className="space-y-8">
                                <h4 className="text-[10px] font-black uppercase text-white tracking-[0.5em] border-l-2 border-emerald-500 pl-4">Leadership</h4>
                                <ul className="space-y-6 text-[10px] font-black uppercase text-zinc-500 tracking-[0.3em]">
                                    <li className="hover:text-emerald-400 cursor-pointer transition-colors italic text-white/60">Dr. Alvin West, Jr.</li>
                                    <li className="hover:text-emerald-400 cursor-pointer transition-colors italic text-white/40 italic font-medium tracking-normal text-xs">A Tribute to Legacy & Innovation</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                        <p className="text-[9px] font-black uppercase text-zinc-800 tracking-[0.8em]">© 2026 EDINTEL SOVEREIGN // MASTER_NODE: MCPSS_CORE</p>
                        <div className="flex items-center gap-10">
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">Latency: 24ms</span>
                            <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">Uptime: 99.999%</span>
                            <ChevronRight className="w-5 h-5 text-emerald-500/20" />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
