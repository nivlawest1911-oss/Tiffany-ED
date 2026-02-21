'use client';

import React, { useEffect } from "react"
import { motion } from "framer-motion"
import {
    Activity,
    Brain,
    MoreHorizontal,
    ChevronRight,
} from "lucide-react"
import Link from 'next/link';

import { Button } from "@/components/ui/button"

/* --- CORE COMPONENTS --- */
import { ExecutiveBrief } from './zone1-executive-brief'
import { EdIntelDelegate } from '@/components/edintel-core/EdIntelDelegate'
import { GrantArchitect } from './zone3-grant-architect'
import { BoardRoom } from './zone3-board-room'
import { EdIntelIdentity } from '@/components/dashboard/EdIntelIdentity'
import { ParticleBackground, GlassCard } from '@/components/ui/Cinematic'
import DistrictIntelligenceScore from '@/components/landing/DistrictIntelligenceScore'
import PlatformActivity from '@/components/landing/PlatformActivity'
import { useIntelligence } from '@/context/IntelligenceContext'
import { AIHubCard } from './AIHubCard'
import { TokenMeter } from './TokenMeter'
import { StrategicLogs } from './StrategicLogs'

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
        <div className="relative min-h-screen pb-20 overflow-x-hidden">
            {/* 1. CINEMATIC BACKGROUND MESH (Video-Based) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen scale-110 blur-sm"
                    src="/videos/EdIntel_OS_Layout_Enhancements.mp4"
                />
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-600/10 blur-[100px] rounded-full" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] opacity-10" />
                <ParticleBackground count={40} />
            </div>

            <div className="relative z-10 max-w-[1600px] mx-auto p-4 md:p-8 space-y-8 md:space-y-12">
                {/* 2. Welcome Protocol Header */}
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                    <div className="space-y-2">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3"
                        >
                            <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
                            <span className="text-[10px] font-black tracking-[0.4em] text-zinc-400 uppercase">System Nominal • EdIntel v2.0 Active</span>
                        </motion.div>
                        <h1 className="text-3xl md:text-7xl font-black uppercase tracking-tighter text-white italic leading-none">
                            Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">Center</span>
                        </h1>
                        <p className="text-zinc-500 text-sm font-medium italic max-w-lg mt-2">
                            "Directing administrative intelligence through high-fidelity neural protocols."
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="secondary" className="bg-white/5 border-white/10 text-white hover:bg-white/10 border-0 rounded-full px-6 transition-all">
                            Export Intelligence
                        </Button>
                        <Link href="/dashboard/command">
                            <Button className="bg-electric-cyan text-black hover:bg-cyan-400 font-black px-8 rounded-full shadow-[0_0_30px_rgba(0,245,255,0.4)] transition-all hover:scale-105 active:scale-95">
                                Live Command
                            </Button>
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
                            <Activity className="w-3 h-3 text-cyan-400" />
                            District Intelligence Protocol
                        </div>
                        <GlassCard className="p-0 overflow-hidden border-cyan-500/10 h-full min-h-[400px]">
                            <DistrictIntelligenceScore />
                        </GlassCard>
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
