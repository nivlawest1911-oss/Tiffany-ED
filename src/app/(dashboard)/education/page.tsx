'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Shield,
    FileText,
    Brain,
    Building,
    ChevronRight,
    Lock,
    Zap
} from 'lucide-react';
import { ParticleBackground, GlassCard } from '@/components/ui/Cinematic';
import EdIntelLogo from '@/components/EdIntelLogo';
import { SmartHover } from '@/components/ui/SmartHover';

const EDUCATION_MODULES = [
    {
        title: "Sovereign Vault",
        description: "Secure institutional data storage with localized compliance protocols.",
        href: "/vault",
        icon: Shield,
        color: "text-indigo-400",
        bg: "bg-indigo-500/10",
        tier: "Sovereign Pack+"
    },
    {
        title: "IEP Architect",
        description: "Clinical-grade narrative generation for individualized education plans.",
        href: "/generators",
        icon: FileText,
        color: "text-cyan-400",
        bg: "bg-cyan-500/10",
        tier: "Standard Pack+"
    },
    {
        title: "Cognitive Gym",
        description: "Interactive neuro-cognitive training and logic puzzles.",
        href: "/cognitive",
        icon: Brain,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        tier: "Free / Initiate"
    },
    {
        title: "Site Command",
        description: "District-wide analytics and administrative oversight console.",
        href: "/admin",
        icon: Building,
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        tier: "Site Command"
    }
];

export default function EducationHubPage() {
    return (
        <div className="relative min-h-screen bg-black overflow-hidden flex flex-col">
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950" />
                <ParticleBackground count={30} />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full opacity-50 pointer-events-none" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto w-full p-6 md:p-12">
                {/* Header */}
                <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3"
                        >
                            <EdIntelLogo variant="fidelity" className="w-8 h-8" />
                            <div className="h-1 w-1 rounded-full bg-cyan-400" />
                            <span className="text-xs font-black tracking-[0.3em] text-cyan-400 uppercase">Education Suite</span>
                        </motion.div>
                        <SmartHover message="Education Core: Access advanced pedagogical intelligence and administrative compliance tools designed for the modern sovereign educator.">
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase italic"
                            >
                                EdIntel <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Core</span>
                            </motion.h1>
                        </SmartHover>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-zinc-400 max-w-xl font-medium"
                        >
                            Advanced pedagogical intelligence and administrative compliance tools designed for the modern educator.
                        </motion.p>
                    </div>
                </header>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {EDUCATION_MODULES.map((module, index) => (
                        <Link href={module.href} key={module.title}>
                            <SmartHover message={`Sovereign Module: ${module.title}. Tier: ${module.tier}. ${module.description}`}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * index }}
                                    className="group relative"
                                >
                                    <GlassCard className="h-full p-8 transition-all duration-300 hover:bg-white/5 border-white/5 hover:border-cyan-500/30 group-hover:scale-[1.01]">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className={`p-4 rounded-2xl ${module.bg} border border-white/5 group-hover:scale-110 transition-transform duration-500`}>
                                                <module.icon className={`w-8 h-8 ${module.color}`} />
                                            </div>
                                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                                                <Lock size={10} className="text-zinc-500" />
                                                <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">
                                                    {module.tier}
                                                </span>
                                            </div>
                                        </div>

                                        <h3 className="text-2xl font-black text-white mb-3 group-hover:text-cyan-400 transition-colors uppercase tracking-wide">
                                            {module.title}
                                        </h3>
                                        <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                                            {module.description}
                                        </p>

                                        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyan-500/50 group-hover:text-cyan-400 transition-colors">
                                            Launch Module <ChevronRight size={14} />
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            </SmartHover>
                        </Link>
                    ))}
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-auto pt-12 flex items-center justify-between border-t border-white/5"
                >
                    <div className="flex items-center gap-2 text-[10px] text-zinc-600 uppercase tracking-widest">
                        <Zap size={12} />
                        System Status: Nominal
                    </div>
                    <Link href="/dashboard" className="text-xs font-bold text-zinc-500 hover:text-white transition-colors">
                        Return to Command Center
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
