'use client';

import React, { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Users,
    Brain,
    Zap,
    Activity,
    MoreHorizontal,
    Sparkles as SparkleIcon,
    Shield,
    Swords,
    ChevronRight,
    X
} from "lucide-react"
import Link from 'next/link';

import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts"

/* --- CORE COMPONENTS --- */
import { ExecutiveBrief } from './zone1-executive-brief'
import ProfessionalID from '@/components/dossier/ProfessionalID'
import { EdIntelDelegate } from '@/components/edintel-core/EdIntelDelegate'
import { GrantArchitect } from './zone3-grant-architect'
import { BoardRoom } from './zone3-board-room'
import BurnoutHeatmap from '@/components/dashboard/BurnoutHeatmap'
import { EdIntelIdentity } from '@/components/dashboard/EdIntelIdentity'
import { ParticleBackground, GlassCard } from '@/components/ui/Cinematic'
import DistrictIntelligenceScore from '@/components/landing/DistrictIntelligenceScore'
import PlatformActivity from '@/components/landing/PlatformActivity'
import { EdIntelAutomation } from '@/components/edintel-core/EdIntelAutomation'
import { useIntelligence } from '@/context/IntelligenceContext'

const stats = [
    { label: "Active Nodes", value: "48", trend: "+12%", icon: Users, color: "#3b82f6" },
    { label: "Neural Load", value: "24%", trend: "Optimal", icon: Brain, color: "#a855f7" },
    { label: "Total Artifacts", value: "1,204", trend: "+18", icon: Activity, color: "#10b981" },
    { label: "Avg Response", value: "1.2s", trend: "-150ms", icon: Zap, color: "#f59e0b" },
]

const chartData = [
    { name: 'Mon', value: 400 },
    { name: 'Tue', value: 300 },
    { name: 'Wed', value: 500 },
    { name: 'Thu', value: 280 },
    { name: 'Fri', value: 590 },
    { name: 'Sat', value: 320 },
    { name: 'Sun', value: 410 },
]

export default function Dashboard() {
    const { triggerBriefing } = useIntelligence();
    const [showBurnoutHeatmap, setShowBurnoutHeatmap] = React.useState(false);

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
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3"
                        >
                            <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
                            <span className="text-[10px] font-black tracking-[0.4em] text-cyan-400 uppercase">System Nominal • EdIntel v2.0 Active</span>
                        </motion.div>
                        <h1 className="text-3xl md:text-7xl font-black uppercase tracking-tighter text-white italic">
                            Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">Center</span>
                        </h1>
                        <p className="text-zinc-500 text-sm font-medium italic max-w-lg">
                            "Directing administrative intelligence through high-fidelity neural protocols."
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 border-0 rounded-full px-6">
                            Export Intelligence
                        </Button>
                        <Link href="/dashboard/command">
                            <Button className="bg-cyan-500 text-black hover:bg-cyan-400 font-black px-8 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all hover:scale-105 active:scale-95">
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

                {/* 5. Integrated Intelligence Matrix */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

                    {/* LEFT: DISTRICT PULSE */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="flex items-center gap-2 mb-2 font-black text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                            <Shield className="w-3 h-3 text-cyan-400" />
                            District Pulse
                        </div>
                        <GlassCard className="p-0 overflow-hidden h-full flex flex-col border-cyan-500/10">
                            <DistrictIntelligenceScore />
                        </GlassCard>
                    </div>

                    {/* MIDDLE: THE EDUCATOR'S BRAIN (Core Stats & Chart) */}
                    <div className="lg:col-span-6 space-y-6">
                        <div className="flex items-center gap-2 mb-2 font-black text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                            <Brain className="w-3 h-3 text-indigo-400" />
                            The Educator's Brain
                        </div>
                        <GlassCard className="p-6 h-full bg-gradient-to-br from-indigo-500/5 to-purple-600/5 border-indigo-500/20">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                                {stats.map((stat, _i) => (
                                    <div key={stat.label} className="space-y-1">
                                        <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">{stat.label}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl font-bold text-white">{stat.value}</span>
                                            <span className="text-[8px] text-emerald-400">{stat.trend}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <CardContent className="h-[250px] w-full p-0">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chartData}>
                                        <defs>
                                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                                        <XAxis dataKey="name" stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#ffffff20" fontSize={10} tickLine={false} axisLine={false} />
                                        <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #ffffff10", borderRadius: "12px", fontSize: "12px" }} itemStyle={{ color: "#fff" }} />
                                        <Area type="monotone" dataKey="value" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </GlassCard>
                    </div>

                    {/* RIGHT: TACTICAL ASSETS */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="flex items-center gap-2 mb-2 font-black text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
                            <Swords className="w-3 h-3 text-rose-400" />
                            Tactical Assets
                        </div>
                        <div className="space-y-4">
                            <ProfessionalID />
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setShowBurnoutHeatmap(true)}
                                className="p-6 rounded-2xl bg-gradient-to-br from-red-900/10 to-orange-900/10 border border-red-500/20 group hover:border-red-500/40 transition-all cursor-pointer relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <SparkleIcon size={60} />
                                </div>
                                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2 uppercase tracking-wider">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                    Burnout Shield
                                </h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-black text-white">84%</span>
                                    <span className="text-[10px] text-green-400 uppercase font-bold">Reduction</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* 6. EdIntel Delegate (Neural Protocol Interface) */}
                <section className="-mx-4 md:-mx-8">
                    <div className="bg-slate-900/20 border-y border-white/5 py-8 backdrop-blur-sm">
                        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
                            <EdIntelDelegate />
                        </div>
                    </div>
                </section>

                {/* 7. Operations Deck (Grant Architect & Board Room) */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2">
                        <PlatformActivity />
                    </div>
                    <div className="space-y-6">
                        <GrantArchitect />
                        <BoardRoom />
                    </div>
                </div>

                {/* 8. Recent Intel Protocol */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8">
                        <GlassCard className="h-full">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg text-white font-black uppercase tracking-widest">Recent Intel Matrix</CardTitle>
                                    <CardDescription className="text-zinc-500 font-medium italic">Analyzing localized administrative signals...</CardDescription>
                                </div>
                                <Button variant="ghost" size="icon" className="text-white/40"><MoreHorizontal className="h-4 w-4" /></Button>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((item) => (
                                        <div key={item} className="flex items-start gap-4 p-4 rounded-xl border border-white/5 hover:bg-white/5 transition-all cursor-pointer group">
                                            <div className="h-10 w-10 shrink-0 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/50 transition-colors">
                                                <Activity className="h-5 w-5" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-xs font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-wider">Protocol Alpha-{item * 12} Executed</p>
                                                    <span className="text-[9px] text-zinc-600 font-mono italic">{item * 2}m ago</span>
                                                </div>
                                                <p className="text-[11px] text-zinc-500 mt-1 italic font-medium">Strategic synthesis of Section 504 artifacts prioritized for Board review.</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <Link href="/dashboard/command">
                                        <Button variant="outline" className="w-full border-white/5 bg-white/[0.02] hover:bg-white/5 text-[10px] font-black uppercase tracking-[0.3em] py-6 rounded-xl transition-all">
                                            Open Full Operations Timeline <ChevronRight className="w-3 h-3 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </GlassCard>
                    </div>
                    <div className="lg:col-span-4">
                        <EdIntelAutomation tier="Sovereign Initiate" />
                    </div>
                </div>
            </div>

            {/* Burnout Heatmap Modal */}
            <AnimatePresence>
                {showBurnoutHeatmap && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        onClick={() => setShowBurnoutHeatmap(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="w-full max-w-5xl h-[80vh] bg-zinc-950 rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-black/40">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2 font-black uppercase tracking-widest">
                                    <SparkleIcon className="w-5 h-5 text-red-500" />
                                    Burnout Elimination Protocol
                                </h2>
                                <button
                                    onClick={() => setShowBurnoutHeatmap(false)}
                                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                                    aria-label="Close"
                                >
                                    <X className="w-6 h-6 text-zinc-400" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <BurnoutHeatmap />
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

