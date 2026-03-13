'use client';

import { ShieldCheck, Lock, FileKey, Check, Server, EyeOff, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import HolographicBriefing from '@/components/intelligence/HolographicBriefing';
import { useState } from 'react';
import Link from 'next/link';
import { GlassPanel, HolographicText, NeonBadge, AuroraBackground, ParticleField, LaserLine } from '@/components/ui/HolographicUI';

export default function FERPAComplianceClient() {
    const [showBriefing, setShowBriefing] = useState(false);
    const protocols = [
        {
            icon: Lock,
            title: "Encryption at Rest",
            content: "All databases are secured with AES-256 encryption. Your data is mathematically indecipherable without the unique keys generated for your district node.",
            color: "gold"
        },
        {
            icon: EyeOff,
            title: "Zero-Training Policy",
            content: "We have stringent legal agreements with our AI providers. Your student data is processed in a stateless environment and NEVER used to train public models.",
            color: "cyan"
        },
        {
            icon: Server,
            title: "Professional Isolation",
            content: "Tenant data is logically isolated. A breach in one node (theoretically impossible) cannot laterally move to access your data.",
            color: "gold"
        },
        {
            icon: FileKey,
            title: "Cryptographic Deletion",
            content: "When you hit delete, we don't just hide the file. We execute a cryptographic shredding process that makes recovery impossible.",
            color: "cyan"
        }
    ];

    return (
        <main className="content-stage relative min-h-screen">
            <AuroraBackground variant="mixed" intensity="low" />
            <ParticleField count={20} colors={['#10B981', '#00E5FF', '#FFB300']} />

            {/* Hero Section */}
            <div className="relative z-10 pt-16 pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-zinc-500 hover:text-[#FFB300] transition-colors mb-12 group">
                            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" /> Return to Command Deck
                        </Link>
                    </motion.div>

                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <NeonBadge variant="emerald" pulse className="mb-6">
                                <ShieldCheck size={12} /> FERPA Compliance Architecture
                            </NeonBadge>
                        </motion.div>

                        <HolographicBriefing
                            isOpen={showBriefing}
                            onClose={() => setShowBriefing(false)}
                            agentId="strategic"
                            title="Compliance Protocol"
                            description="Initializing security handshake. We have verified all institutional data identity layers. The EdIntel system matches the FERPA Ironclad standard."
                            briefingSteps={[
                                "Sync AES-256 encryption handshake.",
                                "Verify Zero-Training data isolation.",
                                "Establish 'School Official' legal residency.",
                                "Map building-level purge protocols."
                            ]}
                        />

                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            onClick={() => setShowBriefing(true)}
                            className="inline-flex items-center gap-2 mb-8 px-6 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase tracking-[0.3em] hover:bg-emerald-500/20 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] transition-all"
                        >
                            <Lock size={12} />
                            Initialize Compliance Briefing
                        </motion.button>

                        <motion.h1
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-[0.9]"
                        >
                            <span className="text-white">FERPA</span>{' '}
                            <HolographicText variant="gradient" as="span">Ironclad.</HolographicText>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
                        >
                            Your legal safety is not a feature; it is the foundation.
                            We operate under the &quot;School Official&quot; exception, providing a fortress for your data.
                        </motion.p>

                        <LaserLine color="#10B981" className="max-w-xs mx-auto mt-8" />
                    </div>
                </div>
            </div>

            {/* 2. Compliance Status Banner */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <GlassPanel variant="emerald" glow className="p-8">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                                <Check size={40} className="text-emerald-400" />
                            </div>

                            <div className="flex-1 text-center md:text-left">
                                <HolographicText variant="cyan" as="h3" className="text-2xl font-bold mb-2">
                                    Verified Compliant: 20 U.S.C. 1232g
                                </HolographicText>
                                <p className="text-zinc-400">
                                    EdIntel Professional fully adheres to the Family Educational Rights and Privacy Act (FERPA).
                                    We function as an institutional agent, subject to the direct control of the district.
                                </p>
                            </div>

                            <div className="flex-shrink-0">
                                <div className="px-6 py-3 rounded-xl bg-emerald-500 text-black font-black uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                                    Status: Secure
                                </div>
                            </div>
                        </div>
                    </GlassPanel>
                </motion.div>
            </div>

            {/* 3. Security Protocols Grid */}
            <section className="px-4 sm:px-6 lg:px-8 pb-16 max-w-5xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {protocols.map((protocol, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <GlassPanel
                                variant={protocol.color as 'gold' | 'cyan'}
                                glow
                                className="p-8 h-full"
                            >
                                <div className={`w-12 h-12 rounded-xl ${protocol.color === 'gold' ? 'bg-[#FFB300]/20' : 'bg-[#00E5FF]/20'} flex items-center justify-center mb-6`}>
                                    <protocol.icon size={24} className={protocol.color === 'gold' ? 'text-[#FFB300]' : 'text-[#00E5FF]'} />
                                </div>

                                <HolographicText
                                    variant={protocol.color as 'gold' | 'cyan'}
                                    as="h3"
                                    className="text-xl font-bold mb-3"
                                >
                                    {protocol.title}
                                </HolographicText>
                                <p className="text-zinc-400 leading-relaxed text-sm">
                                    {protocol.content}
                                </p>
                            </GlassPanel>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 4. The School Official Exception Explained */}
            <section className="py-16 relative z-10">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <GlassPanel variant="gold" glow className="p-10 text-center">
                        <HolographicText variant="gold" as="h2" className="text-2xl font-bold mb-8">
                            The School Official Exception
                        </HolographicText>
                        <p className="text-zinc-400 mb-8">
                            Under FERPA&apos;s <strong className="text-white">&quot;School Official&quot;</strong> exception (34 CFR 99.31(a)(1)(i)(B)), EdIntel functions as a vendor performing an institutional service.
                        </p>
                        <div className="space-y-4 text-left max-w-2xl mx-auto">
                            {[
                                'We perform a service for which the school would otherwise use its own employees.',
                                'We are under the direct control of the agency or institution with respect to the use and maintenance of education records.',
                                'We are subject to the requirements of 34 CFR 99.33(a) governing the use and redisclosure of personally identifiable information from education records.',
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-black/30 border border-[#FFB300]/20">
                                    <Check className="w-5 h-5 text-[#FFB300] flex-shrink-0 mt-0.5" />
                                    <span className="text-zinc-300 text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                        
                        <div className="flex justify-center gap-4 mt-10">
                            <Link href="/privacy" className="text-[#00E5FF] text-[10px] font-bold uppercase tracking-widest hover:underline">
                                Privacy Policy
                            </Link>
                            <span className="text-zinc-700">|</span>
                            <Link href="/terms" className="text-[#00E5FF] text-[10px] font-bold uppercase tracking-widest hover:underline">
                                Terms of Service
                            </Link>
                            <span className="text-zinc-700">|</span>
                            <Link href="/contact" className="text-[#00E5FF] text-[10px] font-bold uppercase tracking-widest hover:underline">
                                Contact
                            </Link>
                        </div>
                    </GlassPanel>
                </div>
            </section>

        </main>
    );
}
