'use client';

import React, { useState } from 'react';
import { FileText, Zap, Scale, Clock, ArrowLeft, Shield, Users, CreditCard, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import HolographicBriefing from '@/components/intelligence/HolographicBriefing';
import { motion } from 'framer-motion';
import { GlassPanel, HolographicText, NeonBadge, AuroraBackground, ParticleField, LaserLine } from '@/components/ui/HolographicUI';

export default function TermsClient() {
    const [showBriefing, setShowBriefing] = useState(false);

    const sections = [
        {
            icon: Clock,
            title: 'The 14-Day Pilot Protocol',
            content: 'Access is granted for a 14-day zero-cost evaluation period to authorized building administrators. Failure to cancel the pilot prior to the 15th day will initiate the $79.00/month Site License via the registered institutional payment method.',
            color: 'gold',
        },
        {
            icon: Zap,
            title: 'Liquid Energy Economy',
            content: 'Neural processing tokens ("Liquid Energy") are non-refundable and represent strategic processing power allocated from the School Vault. Misuse of the IEP Narrative Architect for non-educational or non-compliant purposes may result in building-wide node suspension.',
            color: 'cyan',
        },
        {
            icon: Scale,
            title: 'Professional Liability',
            content: 'EdIntel is a decision-support architecture. All AI-generated narratives, smart-drafts, and compliance logs must be reviewed, edited, and authenticated by a certified educator or building administrator before final submission or signature.',
            color: 'gold',
        },
        {
            icon: Users,
            title: 'User Responsibilities',
            content: 'Users must maintain accurate institutional credentials and comply with all applicable educational regulations. Account sharing is prohibited. Each building administrator receives a unique authentication key tied to their district identity.',
            color: 'cyan',
        },
        {
            icon: CreditCard,
            title: 'Billing & Cancellation',
            content: 'Subscriptions are billed monthly. Cancellation requests must be submitted 5 business days before the next billing cycle. Prorated refunds are not available for mid-cycle cancellations. Enterprise contracts follow custom terms.',
            color: 'gold',
        },
        {
            icon: AlertTriangle,
            title: 'Limitation of Liability',
            content: 'EdIntel Professional is provided "as-is" without warranty. We are not liable for decisions made using AI-generated content. Maximum liability is limited to fees paid in the preceding 12-month period.',
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
                            <FileText size={12} />
                            Service Governance Layer
                        </NeonBadge>
                    </motion.div>

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

                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        onClick={() => setShowBriefing(true)}
                        className="inline-flex items-center gap-2 mb-8 px-6 py-2 rounded-full border border-[#FFB300]/30 bg-[#FFB300]/10 text-[#FFB300] text-[9px] font-black uppercase tracking-[0.3em] hover:bg-[#FFB300]/20 hover:shadow-[0_0_30px_rgba(255,179,0,0.2)] transition-all"
                    >
                        <Shield size={12} />
                        Initialize Governance Briefing
                    </motion.button>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6"
                    >
                        <HolographicText variant="gradient" as="span">Terms of Service</HolographicText>
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
                            Service Administrator
                        </HolographicText>
                        <p className="text-zinc-400 text-sm mb-2">
                            Transcend Academic, Business & Cognitive Solutions, LLC
                        </p>
                        <p className="text-zinc-500 text-xs uppercase tracking-widest">
                            Mobile, AL 36601 // United States
                        </p>
                        <div className="flex justify-center gap-4 mt-6">
                            <Link href="/privacy" className="text-[#00E5FF] text-[10px] font-bold uppercase tracking-widest hover:underline">
                                Privacy Policy
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
                        EdIntel Terms Framework v4.2.1 Stable
                    </p>
                </motion.footer>
            </div>
        </div>
    );
}

