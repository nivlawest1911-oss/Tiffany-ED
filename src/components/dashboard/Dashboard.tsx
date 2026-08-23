'use client';

import React, { useEffect } from "react"
import { motion } from "framer-motion"
import {
    Activity,
    Brain,
    MoreHorizontal,
    Zap,
    Shield,
    Terminal
} from "lucide-react"
import Link from 'next/link';

/* --- CORE COMPONENTS --- */
import { ExecutiveBrief } from './zone1-executive-brief'
import { EdIntelDelegate } from '@/components/edintel-core/EdIntelDelegate'
import { GrantArchitect } from './zone3-grant-architect'
import { BoardRoom } from './zone3-board-room'
import { EdIntelIdentity } from '@/components/dashboard/EdIntelIdentity'
import DistrictIntelligenceScore from '@/components/landing/DistrictIntelligenceScore'
import PlatformActivity from '@/components/landing/PlatformActivity'
import { useIntelligence } from '@/context/IntelligenceContext'
import { AIHubCard } from './AIHubCard'
import { TokenMeter } from './TokenMeter'
import { StrategicLogs } from './StrategicLogs'
import { HolographicCard } from "@/components/ui/HolographicCard"
import SovereignButton from "@/components/ui/SovereignButton"

export default function Dashboard() {
    const { triggerBriefing } = useIntelligence();

    // Auto-Welcome Trigger
    useEffect(() => {
        const welcomePlayed = sessionStorage.getItem('edintel_welcome_played');
        if (!welcomePlayed) {
            const timer = setTimeout(() => {
                triggerBriefing('Legacy Profile');
                sessionStorage.setItem('edintel_welcome_played', 'true');
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [triggerBriefing]);

    return (
        <div className="relative min-h-screen pb-16 font-sans">
            <div className="relative z-10 max-w-[1600px] mx-auto p-4 md:p-6 space-y-6 md:space-y-8">
                {/* Header Surface */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
                    <div className="space-y-1.5">
                        <motion.div
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-2.5"
                        >
                            <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.5)]" />
                            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-amber-400 uppercase">
                                System Nominal • EdIntel v4.0 Active
                            </span>
                        </motion.div>
                        <h1 className="text-3xl md:text-6xl font-black uppercase tracking-tight text-white leading-none italic">
                            Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">Center</span>
                        </h1>
                        <p className="text-zinc-400 text-xs font-mono max-w-xl">
                            Directing administrative intelligence through biometrically verified neural protocols.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <SovereignButton variant="glass" size="md" className="rounded-xl px-6 border-white/10 text-xs font-mono uppercase">
                            Export Intelligence
                        </SovereignButton>
                        <Link href="/dashboard/command">
                            <SovereignButton glow variant="primary" size="md" className="rounded-xl px-6 bg-amber-400 text-black hover:bg-amber-300 text-xs font-mono font-black uppercase">
                                Live Command
                            </SovereignButton>
                        </Link>
                    </div>
                </header>

                {/* Identity Hub */}
                <EdIntelIdentity />

                {/* Executive Briefing Zone */}
                <section className="animate-in fade-in slide-in-from-bottom-3 duration-500">
                    <ExecutiveBrief />
                </section>

                {/* Integrated Intelligence Matrix Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pb-8">

                    {/* Primary Row Controls */}
                    <AIHubCard />
                    <TokenMeter tokens={10} />
                    <StrategicLogs />

                    {/* Secondary Row Pulse & Advisor */}
                    <div className="md:col-span-8 space-y-3">
                        <div className="flex items-center gap-2 font-mono font-bold text-[10px] tracking-[0.25em] text-zinc-400 uppercase">
                            <Activity className="w-3.5 h-3.5 text-amber-400" />
                            District Intelligence Protocol
                        </div>
                        <HolographicCard className="p-0 overflow-hidden min-h-[380px] border-white/10">
                            <DistrictIntelligenceScore />
                        </HolographicCard>
                    </div>

                    <div className="md:col-span-4 space-y-3">
                        <div className="flex items-center gap-2 font-mono font-bold text-[10px] tracking-[0.25em] text-zinc-400 uppercase">
                            <Brain className="w-3.5 h-3.5 text-indigo-400" />
                            Delegate Interface
                        </div>
                        <EdIntelDelegate />
                    </div>

                    {/* Tertiary Row Ops & Vault */}
                    <div className="md:col-span-12 lg:col-span-4">
                        <div className="flex items-center gap-2 mb-3 font-mono font-bold text-[10px] tracking-[0.25em] text-zinc-400 uppercase">
                            <Zap className="w-3.5 h-3.5 text-emerald-400" />
                            Grant Architect
                        </div>
                        <GrantArchitect />
                    </div>

                    <div className="md:col-span-12 lg:col-span-8">
                        <div className="flex items-center gap-2 mb-3 font-mono font-bold text-[10px] tracking-[0.25em] text-zinc-400 uppercase">
                            <MoreHorizontal className="w-3.5 h-3.5 text-amber-400" />
                            Sovereign Board Room
                        </div>
                        <BoardRoom />
                    </div>

                    {/* Quaternary Row Platform Activity */}
                    <div className="md:col-span-12">
                        <div className="flex items-center gap-2 mb-3 font-mono font-bold text-[10px] tracking-[0.25em] text-cyan-400 uppercase">
                            <Terminal className="w-3.5 h-3.5" />
                            Platform Activity Matrix
                        </div>
                        <PlatformActivity />
                    </div>

                </div>
            </div>
        </div>
    );
}
