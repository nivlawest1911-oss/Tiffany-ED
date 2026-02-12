'use client';

import React from 'react';
import { Shield as LucideShield, BarChart3, Users, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import HolographicBriefing from '@/components/intelligence/HolographicBriefing';

export default function EnterpriseClient() {
    const [showBriefing, setShowBriefing] = React.useState(false);
    const features = [
        {
            icon: LucideShield,
            title: "District Intelligence Shield",
            desc: "Custom AI deployment with strict regional compliance and Data Identity."
        },
        {
            icon: BarChart3,
            title: "Executive Analytics",
            desc: "District-wide performance metrics and predictive administrative insights."
        },
        {
            icon: Users,
            title: "Neural Synergy",
            desc: "Collaborative AI protocols for massive educator-student clusters."
        },
        {
            icon: Zap,
            title: "Rapid Deployment",
            desc: "Zero-config district infrastructure on the EdIntel Grid."
        }
    ];

    const benefits = [
        "Unprecedented Administrative Vitality",
        "Automated Compliance Archiving",
        "Predictive Resource Allocation",
        "EdIntel Data Governance"
    ];

    return (
        <main className="content-stage">
            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
                {/* Cinematic Video Background */}
                <div className="absolute inset-0 z-0">
                    <video
                        src="/videos/AI_Agents_Eliminate_Administrator_Fatigue%20(1).mp4"
                        className="w-full h-full object-cover opacity-15"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/90" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-transparent to-transparent pointer-events-none z-[1]" />

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
                            <LucideShield size={14} />
                            Enterprise Protocol
                        </div>

                        <HolographicBriefing
                            isOpen={showBriefing}
                            onClose={() => setShowBriefing(false)}
                            agentId="strategic"
                            title="District Command Briefing"
                            description="Initializing enterprise-grade handshake. We are scaling the EdIntel ecosystem to meet your regional requirements. Protocol: Maximum Identity."
                            briefingSteps={[
                                "Map district neural architecture requirements.",
                                "Initialize regional data residency shielding.",
                                "Sync executive analytics for real-time visibility.",
                                "Establish 24/7 dedicated engineering uplink."
                            ]}
                        />

                        <button
                            onClick={() => setShowBriefing(true)}
                            className="block mx-auto mb-8 px-6 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-[9px] font-black uppercase tracking-[0.3em] hover:bg-blue-500/10 transition-all"
                        >
                            Initialize District Briefing
                        </button>

                        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter">
                            District-Wide <span className="text-blue-500 italic">Identity</span>
                        </h1>

                        <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                            Deploy EdIntel at scale with custom regional controls, unified analytics, and guaranteed data governance for large educational networks.
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 pt-4">
                            <button className="px-8 py-4 bg-white text-black font-black uppercase text-sm tracking-widest hover:bg-blue-500 hover:text-white transition-all rounded-xl">
                                Request Access
                            </button>
                            <button className="px-8 py-4 bg-zinc-900 text-white font-black uppercase text-sm tracking-widest border border-white/10 hover:border-blue-500/50 transition-all rounded-xl">
                                System Overview
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-4 bg-zinc-950/50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 rounded-2xl bg-zinc-900 border border-white/5 hover:border-blue-500/30 transition-all group"
                            >
                                <div className="p-3 rounded-xl bg-blue-500/5 w-fit mb-6 group-hover:bg-blue-500/20 transition-colors">
                                    <feature.icon className="text-blue-500" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <h2 className="text-4xl font-black text-white">The Professional Standard for <span className="text-blue-500">Scale</span></h2>
                        <div className="space-y-4">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-center gap-4">
                                    <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/30">
                                        <CheckCircle className="text-blue-500" size={14} />
                                    </div>
                                    <span className="text-zinc-300 font-medium">{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                        <div className="absolute inset-0 bg-blue-500/20 blur-[120px] rounded-full -z-10" />
                        <video
                            src="/videos/The_Ultimate_Solution_for_Mode_Fixed.mp4"
                            className="w-full h-full object-cover"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                            <p className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Live Platform Demo</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-zinc-900 border border-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent pointer-events-none" />
                    <h2 className="text-4xl font-black text-white mb-6 relative z-10">Initialize District Protocol</h2>
                    <p className="text-zinc-400 mb-8 relative z-10">Schedule a secure consultation with our engineering directors to customize your EdIntel Grid deployment.</p>
                    <button className="relative z-10 px-12 py-5 bg-blue-600 text-white font-black uppercase text-sm tracking-widest hover:bg-blue-500 transition-all rounded-xl inline-flex items-center gap-3">
                        Contact Sales <ArrowRight size={18} />
                    </button>
                </div>
            </section>
        </main>
    );
}
