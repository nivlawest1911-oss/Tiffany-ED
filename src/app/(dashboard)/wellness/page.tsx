'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Sparkles,
    Activity,
    Users,
    Heart,
    ChevronRight,
    Lock,
    Gem
} from 'lucide-react';
import { ParticleBackground, GlassCard } from '@/components/ui/Cinematic';
import EdIntelSovereignLogo from '@/components/EdIntelSovereignLogo';

const WELLNESS_MODULES = [
    {
        title: "Transcend Guide",
        description: "AI-powered wellness strategies and daily affirmations.",
        href: "/ai-hub",
        icon: Sparkles,
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        tier: "Free / Initiate"
    },
    {
        title: "Holistic Insights",
        description: "Deep analytics on professional wellbeing and cognitive load.",
        href: "/professional",
        icon: Activity,
        color: "text-emerald-400",
        bg: "bg-emerald-500/10",
        tier: "Practitioner+"
    },
    {
        title: "Director Portal",
        description: "Executive oversight for organizational health and staff wellness.",
        href: "/the-room",
        icon: Users,
        color: "text-amber-400",
        bg: "bg-amber-500/10",
        tier: "Director Pack"
    },
    {
        title: "Vitality Vault",
        description: "Curated resources for mental, physical, and emotional growth.",
        href: "/resources",
        icon: Heart,
        color: "text-rose-400",
        bg: "bg-rose-500/10",
        tier: "Sovereign Pack+"
    }
];

export default function WellnessHubPage() {
    return (
        <div className="relative min-h-screen bg-black overflow-hidden flex flex-col">
            {/* Cinematic Background - Transcend Theme */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/30 via-purple-950/20 to-black" />
                <ParticleBackground count={40} />
                <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full opacity-40 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 blur-[100px] rounded-full opacity-30 pointer-events-none" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto w-full p-6 md:p-12">
                {/* Header */}
                <header className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 mb-16 text-center md:text-left">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-center md:justify-start gap-3"
                        >
                            <span className="text-xs font-black tracking-[0.3em] text-purple-400 uppercase">Transcend Wellness</span>
                            <div className="h-1 w-1 rounded-full bg-purple-400" />
                            <Gem size={12} className="text-purple-400" />
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black text-white tracking-tight uppercase"
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-amber-200 to-purple-400">Transcend</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-purple-200/60 max-w-xl font-medium mx-auto md:mx-0 font-serif italic"
                        >
                            "Elevating the human spirit through sovereign intelligence."
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="hidden md:block"
                    >
                        <EdIntelSovereignLogo size={100} showText={false} />
                    </motion.div>
                </header>

                {/* Modules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {WELLNESS_MODULES.map((module, index) => (
                        <Link href={module.href} key={module.title}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                                className="group relative"
                            >
                                <GlassCard className="h-full p-8 transition-all duration-500 hover:bg-white/5 border-purple-500/10 hover:border-purple-500/40 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`p-4 rounded-full ${module.bg} border border-white/5 group-hover:rotate-12 transition-transform duration-500`}>
                                            <module.icon className={`w-8 h-8 ${module.color}`} />
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                                            <Lock size={10} className="text-zinc-500" />
                                            <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">
                                                {module.tier}
                                            </span>
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-black text-white mb-3 group-hover:text-purple-300 transition-colors uppercase tracking-wide font-serif">
                                        {module.title}
                                    </h3>
                                    <p className="text-purple-100/40 text-sm leading-relaxed mb-6 font-medium">
                                        {module.description}
                                    </p>

                                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-purple-500/50 group-hover:text-purple-400 transition-colors">
                                        Enter Portal <ChevronRight size={14} />
                                    </div>
                                </GlassCard>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-auto pt-12 flex items-center justify-between border-t border-purple-500/10"
                >
                    <div className="flex items-center gap-2 text-[10px] text-purple-500/40 uppercase tracking-widest">
                        <Gem size={12} />
                        Vitality Index: Optimal
                    </div>
                    <Link href="/dashboard" className="text-xs font-bold text-purple-500/40 hover:text-white transition-colors">
                        Return to Command Center
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
