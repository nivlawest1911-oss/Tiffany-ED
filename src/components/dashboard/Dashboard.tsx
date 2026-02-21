'use client';

import React, { useEffect } from "react"
import { motion } from "framer-motion"
import {
    Activity,
    Brain,
    MoreHorizontal,
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
import HolographicCard from "@/components/ui/HolographicCard"
import SovereignButton from "@/components/ui/SovereignButton"

export default function Dashboard() {
    const { triggerBriefing } = useIntelligence();

    // AUTO-WELCOME TRIGGER: SURFACING FOUNDER HUB BRIEFING
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
        <div className="relative min-h-screen pb-20">
            {/* Background is handled globally by GenerativeBackground */}

            <div className="relative z-10 max-w-[1600px] mx-auto p-4 md:p-8 space-y-8 md:space-y-12">
                {/* 2. Welcome Protocol Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                    <div className="space-y-2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3"
                        >
                            <div className="h-2 w-2 rounded-full bg-primary-500 animate-pulse shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                            <span className="text-[10px] font-black tracking-[0.4em] text-white/40 uppercase">System Nominal • EdIntel v2.0 Active</span>
                        </motion.div>
                        <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none">
                            Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-white/60">Center</span>
                        </h1>
                        <p className="text-white/30 text-sm font-medium max-w-lg">
                            Directing administrative intelligence through high-fidelity neural protocols.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <SovereignButton variant="glass" size="md" className="rounded-full px-8">
                            Export Intelligence
                        </SovereignButton>
                        <Link href="/dashboard/command">
                            <SovereignButton glow variant="primary" size="md" className="rounded-full px-10">
                                Live Command
                            </SovereignButton>
                        </Link>
                    </div>
                </header>

                {/* 3. Identity Hub */}
                <EdIntelIdentity />

                {/* 4. Strategic Briefing Zone */}
                <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <ExecutiveBrief />
                </section>

                {/* 5. Integrated Intelligence Matrix (12-Column Bento Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-12">

                    {/* PRIMARY ROW: STRATEGIC CONTROLS */}
                    <AIHubCard />
                    <TokenMeter tokens={10} />
                    <StrategicLogs />

                    {/* SECONDARY ROW: PULSE & ADVISOR */}
                    <div className="md:col-span-8 space-y-6">
                        <div className="flex items-center gap-2 mb-2 font-black text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                            <Activity className="w-3 h-3 text-primary-400" />
                            District Intelligence Protocol
                        </div>
                        <HolographicCard className="p-0 overflow-hidden min-h-[400px]">
                            <DistrictIntelligenceScore />
                        </HolographicCard>
                    </div>

                    <div className="md:col-span-4 space-y-6">
                        <div className="flex items-center gap-2 mb-2 font-black text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                            <Brain className="w-3 h-3 text-indigo-400" />
                            Delegate Interface
                        </div>
                        <EdIntelDelegate />
                    </div>

                    {/* TERTIARY ROW: OPS & VAULT */}
                    <div className="md:col-span-12 lg:col-span-4">
                        <div className="flex items-center gap-2 mb-4 font-black text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                            <Activity className="w-3 h-3 text-emerald-400" />
                            Grant Architect
                        </div>
                        <GrantArchitect />
                    </div>

                    <div className="md:col-span-12 lg:col-span-8">
                        <div className="flex items-center gap-2 mb-4 font-black text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                            <MoreHorizontal className="w-3 h-3 text-amber-400" />
                            Sovereign Board Room
                        </div>
                        <BoardRoom />
                    </div>

                    {/* QUATERNARY ROW: RECENT ACTIVITY */}
                    <div className="md:col-span-12">
                        <div className="flex items-center gap-2 mb-4 font-black text-[10px] tracking-[0.2em] text-cyan-500/50 uppercase">
                            <Activity className="w-3 h-3" />
                            Platform Activity Matrix
                        </div>
                        <PlatformActivity />
                    </div>

                </div>
            </div>
        </div>
    );
}
