'use client';

import React, { useState } from 'react';
import { Shield, Lock, EyeOff, Trash2, ArrowLeft, Database, UserCheck, Globe } from 'lucide-react';
import Link from 'next/link';
import HolographicBriefing from '@/components/intelligence/HolographicBriefing';
import { motion } from 'framer-motion';
import { GlassPanel, HolographicText, NeonBadge, AuroraBackground, ParticleField, LaserLine } from '@/components/ui/HolographicUI';

export default function PrivacyClient() {
    const [showBriefing, setShowBriefing] = useState(false);

    const sections = [
        {
            icon: Lock,
            title: 'Institutional Ownership',
            content: 'EdIntel acts strictly as a "School Official" under FERPA guidelines. All student data ingested into the system remains the sole property of the Local Educational Agency (LEA). EdIntel does not own, sell, or monetize student information in any form.',
            color: 'gold',
        },
        {
            icon: EyeOff,
            title: 'Zero-Training Directive',
            content: 'We maintain a rigorous isolation protocol with our neural layers. Student data provided for IEP drafting or sentiment analysis is never used to train generalized AI models. Every request is processed in an isolated context and purged post-synthesis.',
            color: 'cyan',
        },
        {
            icon: Trash2,
            title: 'Executive Deletion Authority',
            content: 'District Administrators maintain absolute authority over their Site Node. Every building principal has the unilateral right to purge their site\'s data at any time via the Admin Command Center, ensuring compliance with local data retention laws.',
            color: 'gold',
        },
        {
            icon: Database,
            title: 'Data Collection Scope',
            content: 'We collect only essential professional data: educator credentials, building identifiers, and student IEP components necessary for narrative synthesis. No biometric data, social media profiles, or personal communications are ever collected.',
            color: 'cyan',
        },
        {
            icon: UserCheck,
            title: 'Third-Party Sharing',
            content: 'Student data is NEVER shared with third parties for marketing, advertising, or commercial purposes. Data may only be disclosed to authorized district personnel or as required by law enforcement with proper legal documentation.',
            color: 'gold',
        },
        {
            icon: Globe,
            title: 'Data Residency',
            content: 'All data is processed and stored within SOC 2 Type II certified infrastructure in the United States. We do not transfer student data across international borders under any circumstances.',
            color: 'cyan',
        },
    ];

    return (
        <div className="content-stage relative min-h-screen">
            <AuroraBackground variant="mixed" intensity="low" />
            <ParticleField count={20} />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-zinc-500 hover:text-[#FFB300] transition-colors mb-12 group">
                        <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Return to Command Deck
                    </Link>
                </motion.div>

                <header className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <NeonBadge variant="gold" pulse className="mb-6">
                            <Shield size={12} />
                            Data Identity Protocol
                        </NeonBadge>
                    </motion.div>

                    <HolographicBriefing
                        isOpen={showBriefing}
                        onClose={() => setShowBriefing(false)}
                        agentId="strategic"
                        title="Identity Briefing"
                        description="Data Identity is the pillar of the EdIntel system. I am here to detail our transparency and ownership protocols."
                        briefingSteps={[
                            "LEAs retain full institutional ownership.",
                            "NEVER train generalized models on student data.",
                            "Stateless processing for all narrative synthesis.",
                            "Admin purge authority is absolute."
                        ]}
                    />

                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        onClick={() => setShowBriefing(true)}
                        className="inline-flex items-center gap-2 mb-8 px-6 py-2 rounded-full border border-[#FFB300]/30 bg-[#FFB300]/10 text-[#FFB300] text-[9px] font-black uppercase tracking-[0.3em] hover:bg-[#FFB300]/20 hover:shadow-[0_0_30px_rgba(255,179,0,0.2)] transition-all"
                    >
                        <Shield size={12} />
                        Initialize Identity Briefing
                    </motion.button>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6"
                    >
                        <HolographicText variant="gradient" as="span">Privacy Policy</HolographicText>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-zinc-500 text-[10px] tracking-[0.4em] uppercase font-bold"
                    >
                        Effective Date: January 2026 // Transcend Academic Solutions
                    </motion.p>

                    <LaserLine color="#FFB300" className="max-w-xs mx-auto mt-8" />
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    {sections.map((section, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + idx * 0.1 }}
                        >
                            <GlassPanel
                                variant={section.color as 'gold' | 'cyan'}
                                glow
                                className="p-8 h-full"
                            >
                                <div className={`w-12 h-12 rounded-xl ${section.color === 'gold' ? 'bg-[#FFB300]/20' : 'bg-[#00E5FF]/20'} flex items-center justify-center mb-6`}>
                                    <section.icon className={`w-6 h-6 ${section.color === 'gold' ? 'text-[#FFB300]' : 'text-[#00E5FF]'}`} />
                                </div>
                                <HolographicText
                                    variant={section.color as 'gold' | 'cyan'}
                                    as="h2"
                                    className="text-xl font-black uppercase tracking-tight mb-4"
                                >
                                    {section.title}
                                </HolographicText>
                                <p className="text-zinc-400 leading-relaxed text-sm">
                                    {section.content}
                                </p>
                            </GlassPanel>
                        </motion.div>
                    ))}
                </div>

                <motion.footer
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="pt-12 border-t border-white/5"
                >
                    <GlassPanel variant="gold" className="p-8 text-center">
                        <HolographicText variant="gold" as="h3" className="text-sm font-black uppercase tracking-[0.2em] mb-4">
                            Data Protection Officer
                        </HolographicText>
                        <p className="text-zinc-400 text-sm mb-2">
                            Dr. Alvin West, II // Owner, Transcend Academic Solutions, LLC
                        </p>
                        <p className="text-zinc-500 text-xs uppercase tracking-widest">
                            Mobile, AL 36601 // District Liaison
                        </p>
                        <div className="flex justify-center gap-4 mt-6">
                            <Link href="/terms" className="text-[#00E5FF] text-[10px] font-bold uppercase tracking-widest hover:underline">
                                Terms of Service
                            </Link>
                            <span className="text-zinc-700">|</span>
                            <Link href="/ferpa" className="text-[#00E5FF] text-[10px] font-bold uppercase tracking-widest hover:underline">
                                FERPA Compliance
                            </Link>
                            <span className="text-zinc-700">|</span>
                            <Link href="/contact" className="text-[#00E5FF] text-[10px] font-bold uppercase tracking-widest hover:underline">
                                Contact
                            </Link>
                        </div>
                    </GlassPanel>
                    <p className="text-[10px] text-center text-zinc-700 uppercase tracking-[0.5em] font-black mt-8">
                        EdIntel Privacy Framework v4.2.1 Stable
                    </p>
                </motion.footer>
            </div>
        </div>
    );
}

