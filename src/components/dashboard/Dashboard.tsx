'use client';

import React from "react"
import { motion } from "framer-motion"
import {
    Users,
    Brain,
    Zap,
    Activity,
    ShieldCheck,
    ArrowUpRight,
    MoreHorizontal,
    Sparkles as SparkleIcon
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts"

import { ExecutiveBrief } from './zone1-executive-brief'
import { SovereignDelegate } from '../SovereignDelegate'
import { GrantArchitect } from './zone3-grant-architect'
import { BoardRoom } from './zone3-board-room'

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
    return (
        <div className="space-y-12 pb-20">
            {/* 1. Welcome Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-3xl font-bold tracking-tight text-white flex items-center gap-3"
                    >
                        Welcome back, Dr. West <SparkleIcon className="h-6 w-6 text-cyan-400" />
                    </motion.h1>
                    <p className="text-slate-400 text-sm mt-1">Sovereign OS // Tactical Overview for Mobile County Schools</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white/10 border-0">
                        Export Report
                    </Button>
                    <Button className="bg-cyan-500 text-black hover:bg-cyan-400 font-black px-6 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-105 active:scale-95">
                        Live Command
                    </Button>
                </div>
            </div>

            {/* 2. Executive Brief (Zone 1) */}
            <section className="relative z-10">
                <ExecutiveBrief />
            </section>

            {/* 3. Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:border-white/20 transition-all group overflow-hidden">
                            <CardContent className="p-6 relative">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-2 rounded-xl bg-white/5 group-hover:scale-110 transition-transform duration-500">
                                        <stat.icon className="h-5 w-5" style={{ color: stat.color }} />
                                    </div>
                                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px]">
                                        {stat.trend}
                                    </Badge>
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">{stat.label}</p>
                                    <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                                </div>
                                <div
                                    className="absolute -bottom-4 -right-4 w-12 h-12 blur-2xl opacity-20 transition-opacity group-hover:opacity-40"
                                    style={{ backgroundColor: stat.color }}
                                />
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* 4. Sovereign Delegate (Hero Interaction) */}
            <section className="-mx-8">
                <div className="bg-slate-900/40 border-y border-white/5 py-4">
                    <SovereignDelegate />
                </div>
            </section>

            {/* 5. Tactical Grid (Grant Architect & Board Room) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card className="h-full bg-white/5 border-white/10 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-lg text-white">Learning Trajectory</CardTitle>
                                <CardDescription className="text-slate-400">District-wide performance indices</CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="sm" className="text-xs text-white/40 hover:text-white">D</Button>
                                <Button variant="ghost" size="sm" className="text-xs text-white/40 hover:text-white">W</Button>
                                <Button variant="ghost" size="sm" className="bg-white/10 text-xs text-white">M</Button>
                            </div>
                        </CardHeader>
                        <CardContent className="h-[350px] w-full p-0 py-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff05" />
                                    <XAxis
                                        dataKey="name"
                                        stroke="#ffffff20"
                                        fontSize={10}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#ffffff20"
                                        fontSize={10}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #ffffff10", borderRadius: "12px", fontSize: "12px" }}
                                        itemStyle={{ color: "#fff" }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#06b6d4"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorValue)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <GrantArchitect />
                    <BoardRoom />
                </div>
            </div>

            {/* 6. Lower Dashboard (Intel & Directives) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-lg text-white">Recent Intel</CardTitle>
                        <Button variant="ghost" size="icon" className="text-white/40"><MoreHorizontal className="h-4 w-4" /></Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                                    <div className="h-10 w-10 shrink-0 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/50 transition-colors">
                                        <Activity className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-white group-hover:text-cyan-400 transition-colors">New Compliance Synthesis Generated</p>
                                        <p className="text-[10px] text-slate-500 mt-1">Sovereign Agent #042 processed Section 504 artifacts.</p>
                                    </div>
                                    <span className="text-[10px] text-slate-700 font-mono">2m ago</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-[#06b6d4]/10 to-[#7c3aed]/10 border-white/10 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <Zap className="h-32 w-32" />
                    </div>
                    <CardHeader>
                        <CardTitle className="text-lg text-white">Priority Directives</CardTitle>
                        <CardDescription className="text-slate-400">Action required on 3 nodes</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[
                                { label: "Authorize Grant Submission", icon: ArrowUpRight },
                                { label: "Review District Neural Health", icon: Activity },
                                { label: "Approve New Sovereign Nodes", icon: ShieldCheck },
                            ].map((task) => (
                                <div key={task.label} className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:border-white/20 transition-all cursor-pointer group">
                                    <span className="text-xs font-bold text-white flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                                        {task.label}
                                    </span>
                                    <task.icon className="h-4 w-4 text-white/20 group-hover:text-cyan-400 transition-colors" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
