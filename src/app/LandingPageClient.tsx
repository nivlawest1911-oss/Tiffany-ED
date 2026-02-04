'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    ArrowRight, Gavel, Lock, Shield, Globe, Zap, Cpu, Terminal
} from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Correct Dynamic Imports
const ParallaxBackground = dynamic(() => import('@/components/ui/ParallaxBackground'), { ssr: false });
const ParticleField = dynamic(() => import('@/components/ui/ParticleField'), { ssr: false });
const InteractiveTerminal = dynamic(() => import('@/components/InteractiveTerminal'), { ssr: false });
const HolographicHero = dynamic(() => import('@/components/HolographicHero'), { ssr: false });
const BentoShowcase = dynamic(() => import('@/components/BentoShowcase'), { ssr: false });
const SovereignCore = dynamic(() => import('@/components/SovereignCore'), { ssr: false });
const NeuralBackground = dynamic(() => import('@/components/ui/NeuralBackground'), { ssr: false });
const SovereignInteractionAgent = dynamic(() => import('@/components/SovereignInteractionAgent'));
const SpotlightCard = dynamic(() => import('@/components/SpotlightCard'));

import { LeadIntake } from '@/components/LeadIntake';
import { ComplianceBadge } from '@/components/legal/FerpaBadge';

// Data
import { generators } from '@/data/generators';
import { CORE_AVATARS } from '@/data/avatars';

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

export default function LandingPageClient() {
    const [activeAgentIndex, setActiveAgentIndex] = useState(0);
    const [agentMessage, setAgentMessage] = useState("Sovereign OS v5.4.0 Online. Initializing high-fidelity educational protocols.");
    const { scrollYProgress } = useScroll();
    const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const scaleHero = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    const handleCommand = (cmd: string) => {
        const lowerCmd = cmd.toLowerCase();
        if (lowerCmd.includes('status')) {
            setAgentMessage("Neural Grid Status: OPTIMAL. All 41 modules reporting operational readiness.");
        } else if (lowerCmd.includes('deploy')) {
            setAgentMessage("Deployment Protocol Activated. Targeting instructional excellence across district nodes.");
        } else if (lowerCmd.includes('heritage')) {
            setAgentMessage("Ancestral Intelligence Synced. Prichard 1925 Legacy recovered and integrated.");
        } else {
            setAgentMessage(`Processing Vector: ${cmd}. Sovereign insights incoming.`);
        }
    };

    // Auto-rotate highlight agent
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveAgentIndex((prev) => (prev + 1) % CORE_AVATARS.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-sovereign-black text-white selection:bg-intel-gold/30 overflow-x-hidden font-sans">
            {/* Cinematic Layers */}
            <ParallaxBackground />
            <ParticleField />
            <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-intel-gold via-white to-intel-gold z-[100] origin-left" style={{ scaleX }} />

            {/* --- CINEMATIC HERO SECTION --- */}
            <section className="relative min-h-screen flex flex-col items-center justify-center px-4 max-w-[1700px] mx-auto pt-20">
                <motion.div
                    style={{ opacity: opacityHero, scale: scaleHero }}
                    className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
                >
                    {/* LEFT: CONTROL INTERFACE */}
                    <motion.div
                        className="lg:col-span-5 relative z-20"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div
                            variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
                            className="inline-flex items-center gap-3 px-6 py-2 border border-intel-gold/20 rounded-full bg-intel-gold/5 mb-8 backdrop-blur-md"
                        >
                            <div className="w-2 h-2 rounded-full bg-intel-gold animate-pulse shadow-[0_0_10px_rgba(197,164,126,1)]" />
                            <span className="text-[10px] uppercase tracking-[0.6em] text-intel-gold font-black italic">
                                ALABAMA SOVEREIGN // NODE-01
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                            className="text-6xl md:text-[8rem] font-black italic uppercase tracking-tighter leading-[0.8] mb-12 drop-shadow-2xl"
                        >
                            EDINTEL <br />
                            <span className="gold-gradient-text not-italic">SOVEREIGN</span>
                        </motion.h1>

                        <motion.p
                            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                            className="text-xl md:text-2xl text-zinc-400 font-bold italic uppercase tracking-tighter leading-snug max-w-xl mb-12"
                        >
                            Stop the Burnout. Reclaim Your Time. <br />
                            Sovereign intelligence designed to lift the weight of decision fatigue for Alabama's educators.
                        </motion.p>

                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            className="mb-12"
                        >
                            <InteractiveTerminal onCommand={handleCommand} />
                        </motion.div>

                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            className="flex flex-col sm:flex-row gap-6"
                        >
                            <SovereignInteractionAgent
                                title="Initialize Profile"
                                description="Start your 14-day premium trial. Access the full 41-module strategic ecosystem."
                                agentId="visionary"
                            >
                                <button className="sovereign-button px-12 py-6 text-xs group relative overflow-hidden flex items-center justify-center gap-3">
                                    <Zap size={18} className="text-black group-hover:rotate-12 transition-transform" />
                                    <span>Initialize Sovereign Profile</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                </button>
                            </SovereignInteractionAgent>

                            <button className="px-12 py-6 bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] tracking-[0.4em] rounded-2xl hover:border-intel-gold/50 hover:bg-white/10 transition-all text-center backdrop-blur-xl group flex items-center justify-center gap-3">
                                <Lock size={16} className="text-zinc-600 group-hover:text-intel-gold transition-colors" />
                                <span>Access Command Deck</span>
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* RIGHT: HOLOGRAPHIC DISPLAY */}
                    <div className="lg:col-span-7 relative flex items-center justify-center">
                        <HolographicHero
                            activeAgent={activeAgentIndex}
                            agents={CORE_AVATARS}
                            message={agentMessage}
                        />
                    </div>
                </motion.div>

                {/* SCROLL INDICATOR */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-12 flex flex-col items-center gap-4 text-white/20"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.6em] italic">Scan to Sync</span>
                    <div className="w-px h-24 bg-gradient-to-b from-intel-gold to-transparent" />
                </motion.div>
            </section>

            {/* --- TACTICAL INTELLIGENCE SUITE --- */}
            <section className="py-24 px-6 relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-grid opacity-10" />
                <div className="max-w-[1700px] mx-auto relative z-10">
                    <div className="mb-24 flex flex-col items-center text-center">
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-intel-gold/10 border border-intel-gold/20 text-intel-gold text-[10px] font-black uppercase tracking-[0.5em] mb-8 animate-pulse">
                            <Cpu size={14} />
                            Tactical Grid Active
                        </div>
                        <h2 className="text-6xl md:text-[7rem] font-black text-white italic uppercase tracking-tighter mb-8 leading-[0.8]">
                            Strategic <span className="gold-gradient-text not-italic">Intelligence.</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-zinc-500 max-w-4xl mx-auto font-black italic uppercase tracking-tighter leading-relaxed">
                            A precision-engineered suite designed to automate the heavy lifting of instruction, compliance, and governance. <br />
                            Reduce planning time by 80% with district-aligned, research-based orchestration.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {generators.slice(0, 6).map((gen, i) => (
                            <motion.div
                                key={gen.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <SpotlightCard
                                    className="liquid-glass p-12 h-full group hover:border-intel-gold/60 transition-all duration-700 cursor-pointer relative overflow-hidden"
                                    color="rgba(197, 164, 126, 0.2)"
                                >
                                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                                        <gen.icon size={120} strokeWidth={1} />
                                    </div>
                                    <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br from-zinc-800 to-black border border-white/10 flex items-center justify-center p-5 mb-10 group-hover:scale-110 group-hover:border-intel-gold/40 transition-all duration-500 shadow-2xl relative z-10`}>
                                        <gen.icon className="w-full h-full text-intel-gold" />
                                    </div>
                                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 italic group-hover:text-intel-gold transition-colors block leading-none">
                                        {gen.name}
                                    </h3>
                                    <p className="text-zinc-500 text-sm font-bold leading-relaxed uppercase tracking-widest mb-10 line-clamp-3 italic">
                                        {gen.description}
                                    </p>
                                    <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest italic">Ready to Sync</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-intel-gold/40 group-hover:text-intel-gold transition-transform duration-500 group-hover:translate-x-2">
                                            <span className="text-[10px] font-black tracking-[0.4em] uppercase italic">Execute</span>
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-24 text-center">
                        <Link href="/all-tools" className="inline-flex items-center gap-6 px-16 py-8 bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-[0.6em] rounded-3xl hover:border-intel-gold hover:text-intel-gold transition-all group backdrop-blur-2xl">
                            Open Global Repository (41 Modules)
                            <ArrowRight size={22} className="group-hover:translate-x-3 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- SOVEREIGN CORE FEATURE --- */}
            <section className="relative h-[800px] w-full overflow-hidden border-y border-white/5">
                <SovereignCore />
            </section>

            {/* --- MODULE BENTO SHOWCASE --- */}
            <BentoShowcase />

            {/* --- GOVERNANCE & COMPLIANCE --- */}
            <section className="py-48 px-10 relative overflow-hidden bg-sovereign-black">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-32">
                        <div className="max-w-3xl">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="inline-flex items-center gap-4 px-6 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-10"
                            >
                                <Shield size={16} className="text-purple-400" />
                                <span className="text-[10px] font-black uppercase tracking-[0.6em] text-purple-400 italic">Legal Architecture</span>
                            </motion.div>
                            <h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-[0.85]">
                                Compliance <br />
                                <span className="text-purple-400 not-italic">Sovereignty.</span>
                            </h2>
                        </div>
                        <div className="text-right pb-4">
                            <ComplianceBadge />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                        {[
                            {
                                id: 'IDEA',
                                title: 'AL Code 290-8-9',
                                desc: 'High-fidelity special education documentation. 100% IDEA-compliant orchestration.',
                                label: 'Due Process Grid',
                                icon: Gavel
                            },
                            {
                                id: 'FERPA',
                                title: 'FERPA SHIELD',
                                desc: 'Sovereign data encapsulation. Zero-knowledge student records architecture.',
                                label: 'Data Sovereignty',
                                icon: Lock
                            },
                            {
                                id: 'ADA',
                                title: 'ADA SYNCH',
                                desc: 'Seamless accessibility protocols. Multimodal translation and sensory routing.',
                                label: 'Inclusion Dynamics',
                                icon: Globe
                            },
                            {
                                id: 'SOP',
                                title: 'SOVEREIGN OPS',
                                desc: 'Standard operating procedures for district-scale executive leadership.',
                                label: 'Workflow Rigor',
                                icon: Terminal
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="liquid-glass p-12 border-purple-500/20 group hover:border-purple-400/50 transition-all duration-700"
                            >
                                <item.icon className="text-purple-400/30 mb-8 group-hover:text-purple-400 transition-colors" size={48} />
                                <span className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em] block mb-4 italic">
                                    {item.label}
                                </span>
                                <h4 className="text-2xl font-black italic uppercase tracking-tighter mb-6 text-white group-hover:text-purple-200">
                                    {item.title}
                                </h4>
                                <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest leading-relaxed">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- INTAKE & COMMAND --- */}
            <section id="contact" className="py-24 md:py-48 px-6 md:px-10 border-t border-white/5 bg-noble-navy relative overflow-hidden">
                <NeuralBackground />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-intel-gold/5 rounded-full blur-[150px] -z-10" />

                <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-24 items-center">
                    <div className="flex-1 space-y-12">
                        <SovereignInteractionAgent
                            title="Secure Link"
                            description="Initializing an encrypted engagement protocol. Your command will be routed directly to the Executive Architect."
                            agentId="tactical"
                        >
                            <div className="inline-flex items-center gap-3 px-6 py-2 bg-intel-gold/10 border border-intel-gold/20 rounded-full cursor-help hover:bg-intel-gold/20 transition-all">
                                <Lock className="w-3 h-3 text-intel-gold" />
                                <span className="text-[10px] uppercase font-black tracking-[0.5em] text-intel-gold italic">Request Deployment</span>
                            </div>
                        </SovereignInteractionAgent>

                        <h2 className="text-7xl md:text-[8rem] font-black italic uppercase tracking-tighter gold-gradient-text leading-[0.8]">
                            Command <br />
                            <span className="text-white not-italic">Intake.</span>
                        </h2>

                        <p className="text-xl md:text-2xl text-zinc-500 font-bold uppercase tracking-widest italic leading-snug">
                            Join the next generation of educator intelligence. <br />
                            District authorizations now open for AY 2025-26.
                        </p>

                        <div className="flex items-center gap-12 pt-8">
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] uppercase font-black tracking-widest text-zinc-600">Encrypted Channel</span>
                                <span className="text-xl font-black text-white italic">auth@edintel.sovereign</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] uppercase font-black tracking-widest text-zinc-600">Uplink Status</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-xl font-black text-white italic uppercase">Operational</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="flex-1 w-full"
                    >
                        <div className="liquid-glass p-12 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Shield size={200} />
                            </div>
                            <LeadIntake />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="py-20 px-10 border-t border-white/5 bg-black text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none" />
                <div className="max-w-[1700px] mx-auto relative z-10 flex flex-col items-center gap-12">
                    <div className="text-4xl font-black italic uppercase tracking-widest">
                        EDINTEL <span className="gold-gradient-text">SOVEREIGN</span>
                    </div>
                    <div className="flex flex-wrap justify-center gap-12">
                        {['Privacy Protocol', 'Governance Terms', 'District Solutions', 'Intelligence Grid'].map(link => (
                            <a key={link} href="#" className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 hover:text-intel-gold transition-colors italic">
                                {link}
                            </a>
                        ))}
                    </div>
                    <div className="max-w-2xl text-[10px] text-zinc-700 font-bold uppercase tracking-widest leading-loose">
                        © 2025 Transcend Academic, Business & Cognitive Solutions. All Rights Reserved. <br />
                        Sovereign OS v5.4.0 • Birmingham & Mobile, AL Hubs • Encrypted Instructional Intelligence.
                    </div>
                </div>
            </footer>
        </div>
    );
}
