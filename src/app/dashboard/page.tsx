'use client';

import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Zap, Shield, Sparkles, Activity, Clock,
    Calendar, Command, Search, ArrowUpRight,
    BarChart3, Users, FileText, Bell, Globe
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Dashboard() {
    const { user, isLoading } = useAuth();
    const [currentTime, setCurrentTime] = useState<string>('');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0A0A0B] text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-t-2 border-indigo-500 rounded-full animate-spin"></div>
                    <p className="font-mono text-sm tracking-widest text-indigo-400">INITIALIZING DASHBOARD...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0A0B] text-white gap-6">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
                    <Shield className="w-8 h-8 text-red-500" />
                </div>
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold">Access Restricted</h1>
                    <p className="text-zinc-400">Sovereign Clearance Required</p>
                </div>
                <Link
                    href="/login"
                    className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors"
                >
                    Authenticate Identity
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050507] text-white selection:bg-indigo-500/30 overflow-hidden font-sans">
            {/* Background Texture */}
            <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('/grid.svg')] bg-repeat" />
            <div className="fixed inset-0 bg-gradient-to-b from-indigo-900/5 via-transparent to-black pointer-events-none" />

            <div className="relative max-w-[1600px] mx-auto p-6 pt-24 min-h-screen flex flex-col">

                {/* HUD Header */}
                <header className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12 border-b border-white/5 pb-6">
                    <div>
                        <div className="flex items-center gap-3 text-indigo-500 mb-2">
                            <Activity className="w-4 h-4 animate-pulse" />
                            <span className="text-xs font-bold tracking-[0.2em] uppercase">Operations Center</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                            COMMAND <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">DECK</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-6 text-right">
                        <div>
                            <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Local Time</div>
                            <div className="text-2xl font-mono text-white font-medium">{currentTime || '--:--:--'}</div>
                        </div>
                        <div className="hidden md:block w-px h-10 bg-white/10" />
                        <div>
                            <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Clearance</div>
                            <div className="text-xl font-bold text-amber-500 uppercase flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                {user.tier} Executive
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">

                    {/* Left Column: Quick Actions & Status (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Profile Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Command className="w-24 h-24 rotate-12" />
                            </div>

                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5">
                                    <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white">{user.name.charAt(0)}</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{user.name}</h3>
                                    <p className="text-sm text-zinc-400">{user.email}</p>
                                </div>
                            </div>

                            <div className="space-y-4 relative z-10">
                                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                                    <span className="text-sm text-zinc-400">Generations</span>
                                    <span className="font-mono text-white font-bold">{user.usage_count || 0} / {user.tier === 'free' ? '5' : '∞'}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                                    <span className="text-sm text-zinc-400">System Status</span>
                                    <span className="text-xs font-bold text-emerald-400 uppercase bg-emerald-500/10 px-2 py-1 rounded">Optimal</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Quick Launchpad */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl"
                        >
                            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Zap className="w-4 h-4" /> Priority Uplink
                            </h3>
                            <div className="grid gap-3">
                                {[
                                    { name: "Lesson Planner", icon: Sparkles, color: "text-purple-400", href: "/generators/lesson-planner" },
                                    { name: "IEP Architect", icon: FileText, color: "text-blue-400", href: "/generators/iep-architect" },
                                    { name: "Communication", icon: Users, color: "text-emerald-400", href: "/generators/email-composer" },
                                    { name: "Data Analyst", icon: BarChart3, color: "text-amber-400", href: "/generators/data-analyzer" },
                                ].map((tool, i) => (
                                    <Link key={i} href={tool.href} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all group">
                                        <div className="flex items-center gap-3">
                                            <tool.icon className={`w-5 h-5 ${tool.color}`} />
                                            <span className="font-medium text-zinc-200 group-hover:text-white">{tool.name}</span>
                                        </div>
                                        <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Middle Column: Central Intelligence (5 cols) */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* Daily Briefing Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="h-full min-h-[400px] p-8 rounded-3xl bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 flex flex-col relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 bg-repeat" />

                            <div className="relative z-10 flex-grow">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6 border border-indigo-500/20">
                                    <Globe className="w-3 h-3" />
                                    Daily Intelligence
                                </div>

                                <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                                    "Leadership is not about being in charge. It is about taking care of those in your charge."
                                </h2>
                                <p className="text-indigo-200/60 font-serif italic mb-8">— Simon Sinek</p>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Suggested Actions</h3>
                                    <div className="p-4 rounded-xl bg-black/20 border border-white/5 hover:border-indigo-500/30 transition-colors cursor-pointer group">
                                        <div className="flex items-start gap-4">
                                            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 group-hover:text-white transition-colors">
                                                <Users className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-zinc-200 group-hover:text-white mb-1">Draft Weekly Staff Memo</h4>
                                                <p className="text-xs text-zinc-400">Use the 'Communication' protocol to update your team.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-black/20 border border-white/5 hover:border-indigo-500/30 transition-colors cursor-pointer group">
                                        <div className="flex items-start gap-4">
                                            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:text-white transition-colors">
                                                <BarChart3 className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-zinc-200 group-hover:text-white mb-1">Analyze Attendance Data</h4>
                                                <p className="text-xs text-zinc-400">Identify trends with 'Data Analyzer' before the board meeting.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: System Updates (3 cols) */}
                    <div className="lg:col-span-3 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="h-full p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl"
                        >
                            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <Bell className="w-4 h-4" /> System Feed
                            </h3>

                            <div className="space-y-6 relative">
                                {/* Timeline Line */}
                                <div className="absolute left-2.5 top-2 bottom-2 w-px bg-white/10" />

                                {[
                                    { title: "New Protocol Added", desc: "Title IX Coordinator tool is now live.", time: "2h ago", color: "bg-emerald-500" },
                                    { title: "System Maintenance", desc: "Neural engine optimization complete.", time: "5h ago", color: "bg-blue-500" },
                                    { title: "Usage Alert", desc: "You have 3 free generations remaining.", time: "1d ago", color: "bg-amber-500" },
                                ].map((item, i) => (
                                    <div key={i} className="pl-8 relative">
                                        <div className={`absolute left-1.5 top-1.5 w-2 h-2 rounded-full ${item.color} ring-4 ring-black`} />
                                        <h4 className="text-sm font-bold text-zinc-200">{item.title}</h4>
                                        <p className="text-xs text-zinc-500 mt-1 mb-1">{item.desc}</p>
                                        <span className="text-[10px] font-mono text-zinc-600">{item.time}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5">
                                <Link
                                    href="/generators"
                                    className="block w-full py-3 text-center rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition-colors border border-white/5 hover:border-white/20"
                                >
                                    View All Protocols
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
}
