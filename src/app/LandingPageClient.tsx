'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Activity, Cpu, Globe, Lock, Gavel, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { LeadIntake } from '@/components/LeadIntake';
import { ComplianceBadge } from '@/components/legal/FerpaBadge';
import SovereignInteractionAgent from '@/components/SovereignInteractionAgent';

export default function LandingPageClient() {
    return (
        <div className="min-h-screen transition-all duration-500 selection:bg-intel-gold/30 overflow-x-hidden font-sans">
            {/* 🌌 Sovereign Liquid Background */}
            <div className="bg-liquid" />

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-intel-gold/[0.02] blur-[150px] -z-10 pointer-events-none" />

                <div className="relative z-10 text-center space-y-12 max-w-7xl">
                    <div className="flex flex-col items-center gap-6">
                        <SovereignInteractionAgent
                            title="District Authorization"
                            description="Official District Authentication. v5.4 Sovereign integration successfully deployed across Alabama instructional grids."
                            agentId="visionary"
                            position="bottom"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-3 px-5 py-2 border border-intel-gold/20 rounded-full bg-intel-gold/5 mb-2 backdrop-blur-md cursor-help group hover:border-intel-gold/40 transition-colors"
                            >
                                <Activity className="w-3 h-3 text-intel-gold animate-pulse" />
                                <span className="text-[9px] uppercase tracking-[0.5em] text-intel-gold font-black">
                                    Mobile County Authorized // v5.4 Sovereign
                                </span>
                            </motion.div>
                        </SovereignInteractionAgent>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <ComplianceBadge />
                        </motion.div>
                    </div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-7xl md:text-[10rem] lg:text-[12rem] font-black italic uppercase tracking-tighter leading-[0.75] mb-16 drop-shadow-[0_0_50px_rgba(197,164,126,0.2)]"
                    >
                        EDINTEL <br /> <span className="gold-gradient-text leading-tight pb-4">Intelligence</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg md:text-3xl text-zinc-500 font-black italic uppercase tracking-tighter leading-snug max-w-5xl mx-auto"
                    >
                        The Operating System for the Modern Educator. <br className="hidden md:block" />
                        Empowering leadership through superior intelligence and executive automation.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-8 pt-16"
                    >
                        <SovereignInteractionAgent
                            title="Profile Initialization"
                            description="Begin your journey into the Sovereign ecosystem. Start your 14-day premium trial today. Unlock the full power of EdIntel."
                            agentId="visionary"
                        >
                            <Link href="/signup" className="sovereign-button w-full md:w-auto px-20 py-8 text-sm group relative overflow-hidden">
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    Initialize Sovereign Profile <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-20 transition-opacity" />
                            </Link>
                        </SovereignInteractionAgent>

                        <SovereignInteractionAgent
                            title="Command Deck Access"
                            description="Direct access to your analytical tools and delegate roster. Secure biometric authorization required for entry."
                            agentId="strategic"
                        >
                            <Link href="/admin/analytics" className="w-full md:w-auto px-16 py-7 bg-white/5 border border-white/10 text-white font-black uppercase text-xs tracking-[0.4em] rounded-2xl hover:border-intel-gold/50 transition-all text-center backdrop-blur-xl group">
                                <span className="group-hover:text-intel-gold transition-colors">Enter Dashboard</span>
                            </Link>
                        </SovereignInteractionAgent>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-12 flex flex-col items-center gap-2 text-white/20"
                >
                    <span className="text-[8px] font-black uppercase tracking-[0.5em]">Scan to Continue</span>
                    <div className="w-px h-12 bg-gradient-to-b from-intel-gold to-transparent" />
                </motion.div>
            </section>

            {/* Feature Grid Section */}
            <section id="grid" className="py-48 px-10 relative overflow-hidden bg-black/40 border-y border-white/5">
                <div className="absolute inset-0 bg-gradient-to-b from-intel-gold/[0.02] to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: Cpu,
                                title: "Neural Analytics",
                                desc: "Real-time district visualization powered by Google BigQuery and Vertex AI.",
                                color: "text-intel-gold",
                                info: "Access the tactical visualization matrix. Powered by BigQuery clusters for real-time district snapshots."
                            },
                            {
                                icon: Shield,
                                title: "Sovereign Security",
                                desc: "Biometric identity verification and end-to-end encrypted academic data lakes.",
                                color: "text-emerald-400",
                                id: "vault",
                                info: "Biometric data vault protocols. End-to-end encryption for FERPA-compliant academic shielding."
                            },
                            {
                                icon: Globe,
                                title: "Spatial Logistics",
                                desc: "Seamless orchestration of instructional modules across digital and physical domains.",
                                color: "text-blue-400",
                                info: "Orchestrate instructional domains across digital sites. Optimize resource allocation through neural scheduling."
                            }
                        ].map((feat, i) => (
                            <SovereignInteractionAgent
                                key={i}
                                title={feat.title}
                                description={feat.info}
                                agentId={i === 0 ? "strategic" : i === 1 ? "tactical" : "visionary"}
                            >
                                <motion.div
                                    id={feat.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="liquid-glass p-12 group hover:border-intel-gold/50 transition-all duration-700 cursor-help relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <feat.icon className={`w-14 h-14 ${feat.color} mb-10 group-hover:scale-110 transition-transform duration-500`} />
                                    <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 group-hover:text-white transition-colors">{feat.title}</h3>
                                    <p className="text-white/30 leading-relaxed text-sm uppercase tracking-widest font-bold group-hover:text-white/50 transition-colors">{feat.desc}</p>

                                    {feat.id === 'vault' && (
                                        <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                                            <div className="text-[8px] font-black tracking-[0.4em] text-zinc-700 uppercase italic">Latency Synced // 905_2367_222</div>
                                            <div className="w-2 h-2 rounded-full bg-emerald-500/40 animate-pulse" />
                                        </div>
                                    )}
                                </motion.div>
                            </SovereignInteractionAgent>
                        ))}
                    </div>
                </div>
            </section>

            {/* Governance Section */}
            <section id="governance" className="py-48 px-10 relative overflow-hidden border-t border-white/5 bg-black/10">
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-12">
                        <Gavel size={16} className="text-purple-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-purple-400">Governance & Compliance</span>
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-12">
                        Sovereign <span className="text-purple-400 italic">Protocols</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: 'AL Code 290-8-9', label: 'Due Process Compliance' },
                            { title: 'FERPA SHIELD', label: 'Data Sovereignty' },
                            { title: 'ADA SYNCH', label: 'Inclusion Logistics' },
                            { title: 'IEP ARCHITECT', label: 'Legal Orchestration' }
                        ].map((item, i) => (
                            <div key={i} className="liquid-glass p-8 border-purple-500/20">
                                <span className="text-[8px] font-black text-purple-400/60 uppercase tracking-widest block mb-2">{item.label}</span>
                                <h4 className="text-xl font-black italic uppercase tracking-tighter">{item.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Intake Section */}
            <section id="contact" className="py-24 md:py-48 px-6 md:px-10 border-t border-white/5 bg-noble-navy relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-intel-gold/5 rounded-full blur-[120px] -z-10" />
                <div className="max-w-4xl mx-auto">
                    <div className="text-center space-y-8 mb-20">
                        <SovereignInteractionAgent
                            title="Secure Channel"
                            description="Initiate an encrypted engagement protocol. Your request will be routed directly to the EdIntel Architect."
                            agentId="tactical"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1 bg-intel-gold/10 border border-intel-gold/20 rounded-full cursor-help">
                                <Lock className="w-3 h-3 text-intel-gold" />
                                <span className="text-[10px] uppercase font-black tracking-widest text-intel-gold">Request Deployment</span>
                            </div>
                        </SovereignInteractionAgent>
                        <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter gold-gradient-text leading-none py-2">
                            Contact <br /> Command
                        </h2>
                        <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">
                            Join the next generation of educator intelligence.
                        </p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="liquid-glass p-1 overflow-hidden"
                    >
                        <LeadIntake />
                    </motion.div>
                </div>
            </section>
        </div >
    );
}
