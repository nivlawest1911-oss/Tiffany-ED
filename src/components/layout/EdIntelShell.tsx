'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    BrainCircuit,
    Network,
    CircleDollarSign,
    Search,
    Home,
    Zap,
    ChevronLeft,
    PanelLeft,
    ShieldCheck,
    Lock,
    User,
    Award,
    Activity
} from 'lucide-react';
import Link from 'next/link';
import EdIntelInteractionAgent from '@/components/intelligence/EdIntelInteractionAgent';
import { NeuralHUD } from '@/components/intelligence/NeuralHUD';
import { useIntelligence } from '@/context/IntelligenceContext';
import { usePathname } from 'next/navigation';
import { EdIntelCommandCenter } from './EdIntelCommandCenter';
import NeuralBackground from '../ui/NeuralBackground';
import { useAuth } from '@/context/AuthContext';
import { initiateBioAuth } from '@/app/auth/actions';

interface CoreTool {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string; size?: number }>;
    href: string;
    desc: string;
}

export default function EdIntelShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { isHudExpanded, setIsHudExpanded } = useIntelligence();
    const { user } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(false);

    const isMarketingRoute = ['/', '/signup', '/login', '/about', '/pricing', '/contact', '/whats-edintel', '/enterprise'].includes(pathname);

    const tools: CoreTool[] = [
        {
            id: 'home',
            label: 'Home Command',
            icon: Home,
            href: '/',
            desc: 'The EdIntel Grid entry point. Strategic overview of EDINTEL systems.'
        },
        {
            id: 'init',
            label: 'Initialize Center',
            icon: LayoutDashboard,
            href: '/admin/analytics',
            desc: 'System launchpad. Orchestrates executive automation and district snapshots.'
        },
        {
            id: 'intel',
            label: 'Intelligence Tools',
            icon: BrainCircuit,
            href: '/admin/tools',
            desc: 'Autonomous agents for executive protocols and compliance synthesis.'
        },
        {
            id: 'hub',
            label: 'Connector Hub',
            icon: Network,
            href: '/admin/vault',
            desc: 'Neural synchronization. Bridges school sites with the EdIntel Vault.'
        },
        {
            id: 'pricing',
            label: 'Professional Pricing',
            icon: CircleDollarSign,
            href: '/pricing',
            desc: 'Professional pricing tiers and enterprise upgrade paths.'
        }
    ];

    const getUserInitials = (name?: string) => {
        if (!name) return 'KR';
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="flex h-screen bg-[#030712] text-zinc-100 font-sans overflow-hidden selection:bg-amber-400/30 selection:text-amber-200">
            <NeuralBackground />
            <NeuralHUD />

            {!isMarketingRoute && (
                <aside
                    className={`hidden md:flex flex-col bg-[#050814]/90 backdrop-blur-2xl border-r border-white/10 transition-all duration-300 ease-in-out z-50 relative ${
                        isCollapsed ? 'w-20' : 'w-64'
                    }`}
                >
                    {/* Retractable Sidebar Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.03] via-transparent to-indigo-500/[0.03] pointer-events-none" />

                    {/* Header Logo & Collapse Toggle Button */}
                    <div className="p-4 flex items-center justify-between border-b border-white/5 relative z-10">
                        <Link href="/" aria-label="EdIntel Home" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 border border-amber-400/40 rounded-xl flex items-center justify-center text-amber-400 font-black bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.15)] group-hover:scale-105 transition-transform italic shrink-0">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            {!isCollapsed && (
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-sm font-black uppercase tracking-[0.25em] text-white italic truncate">EdIntel</span>
                                    <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400/80">Sovereign OS</span>
                                </div>
                            )}
                        </Link>

                        <button
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors border border-white/5"
                            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                            aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                        >
                            {isCollapsed ? <PanelLeft className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                        </button>
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex-1 w-full p-3 space-y-2 relative z-10 overflow-y-auto custom-scrollbar">
                        {tools.map((tool) => {
                            const active = pathname === tool.href;
                            const IconComponent = tool.icon;
                            return (
                                <div key={tool.id} className="relative">
                                    <EdIntelInteractionAgent
                                        title={tool.label}
                                        description={tool.desc}
                                        agentId={tool.id === 'intel' ? 'tactical' : 'visionary'}
                                        position="right"
                                        className="w-full"
                                    >
                                        <Link href={tool.href}>
                                            <div
                                                className={`flex items-center p-3 rounded-xl cursor-pointer border transition-all duration-300 group/item ${
                                                    active
                                                        ? 'bg-amber-400/10 border-amber-400/30 text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.12)]'
                                                        : 'border-transparent hover:bg-white/[0.04] hover:border-white/10 text-zinc-400 hover:text-white'
                                                }`}
                                            >
                                                <IconComponent className={`w-5 h-5 shrink-0 transition-transform duration-300 ${active ? 'scale-110 text-amber-400' : 'group-hover/item:scale-110 group-hover/item:text-amber-400'}`} />
                                                {!isCollapsed && (
                                                    <span className={`ml-3 text-[11px] font-bold uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-300 italic ${active ? 'text-amber-300' : 'text-zinc-300'}`}>
                                                        {tool.label}
                                                    </span>
                                                )}
                                            </div>
                                        </Link>
                                    </EdIntelInteractionAgent>
                                </div>
                            );
                        })}
                    </nav>

                    {/* User Profile & Vector Avatar Badge Footer */}
                    <div className="p-3 border-t border-white/5 mt-auto relative z-10">
                        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-2 rounded-xl bg-white/[0.02] border border-white/5`}>
                            <div className="flex items-center gap-3">
                                {/* SVG Vector Avatar Badge (Zero Raster Dependencies) */}
                                <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500/20 via-indigo-500/20 to-emerald-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold text-xs shadow-[0_0_15px_rgba(245,158,11,0.15)] shrink-0">
                                    <span>{getUserInitials(user?.name)}</span>
                                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#050814]" />
                                </div>
                                {!isCollapsed && (
                                    <div className="flex flex-col overflow-hidden">
                                        <span className="text-xs font-bold text-white truncate">{user?.name || "Keisha Reynolds"}</span>
                                        <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider truncate">District Admin</span>
                                    </div>
                                )}
                            </div>

                            {!isCollapsed && (
                                <button
                                    onClick={() => setIsHudExpanded(!isHudExpanded)}
                                    title={isHudExpanded ? "Collapse Neural HUD" : "Expand Neural HUD"}
                                    aria-label={isHudExpanded ? "Collapse Neural HUD" : "Expand Neural HUD"}
                                    className={`p-2 rounded-lg border transition-all ${
                                        isHudExpanded
                                            ? 'bg-amber-400 text-black border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                                            : 'bg-black/50 border-white/10 text-amber-400 hover:border-amber-400/40'
                                    }`}
                                >
                                    <BrainCircuit className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </aside>
            )}

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col relative overflow-hidden">

                {/* Header Control Surface */}
                <header className="h-16 md:h-20 border-b border-white/10 flex items-center justify-between px-6 md:px-10 bg-[#050814]/80 backdrop-blur-2xl relative z-40">
                    <div className="flex items-center gap-6">
                        <Link href="/" aria-label="EdIntel Home" className={`${isMarketingRoute ? '' : 'md:hidden'}`}>
                            <div className="w-9 h-9 border border-amber-400/40 rounded-xl flex items-center justify-center text-amber-400 font-black bg-amber-500/10 italic text-sm">
                                EI
                            </div>
                        </Link>

                        {!isMarketingRoute && (
                            <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.6)]" />
                                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-[0.25em] italic font-semibold">
                                    Due Process Shield: Active
                                </span>
                            </div>
                        )}

                        <div className="hidden xl:flex items-center gap-2.5 px-4 py-1.5 bg-white/[0.03] border border-white/5 rounded-full">
                            <Activity size={12} className="text-amber-400" />
                            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.2em]">
                                Tokens: <span className="text-white font-bold ml-1">951.4k</span>
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/5 text-[10px] font-mono text-amber-400 uppercase tracking-[0.3em] italic">
                            AL Code 290-8-9
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => {
                                    new Audio('/sounds/click_engage.mp3').play().catch(() => { });
                                    initiateBioAuth('facebook');
                                }}
                                className="bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/30 p-2.5 rounded-xl hover:bg-[#1877F2] hover:text-white transition-all text-xs font-bold"
                                title="Login with Facebook"
                                aria-label="Login with Facebook"
                            >
                                FB Auth
                            </button>

                            <button
                                onClick={() => {
                                    new Audio('/sounds/click_engage.mp3').play().catch(() => { });
                                    initiateBioAuth('google');
                                }}
                                className="bg-amber-400 text-black px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.25em] hover:bg-amber-300 transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] flex items-center gap-2"
                            >
                                <Lock className="w-3.5 h-3.5" />
                                <span>Bio-Auth</span>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Viewport Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar relative flex flex-col">
                    <div className="flex-1">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-amber-500/[0.02] blur-[140px] -z-10 pointer-events-none" />

                        <div className="max-w-[1500px] mx-auto px-4 md:px-10 pt-8 pb-28">
                            {pathname === '/admin/analytics' && (
                                <section className="text-center mb-12 relative">
                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                    >
                                        <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 uppercase leading-[0.95]">
                                            District Intelligence
                                        </h1>
                                        <p className="mt-4 text-sm md:text-base text-zinc-400 max-w-2xl mx-auto font-mono uppercase tracking-widest leading-relaxed">
                                            Strategic architectures & autonomous compliance for institutional leadership.
                                        </p>
                                    </motion.div>
                                </section>
                            )}

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                {children}
                            </motion.div>
                        </div>
                    </div>

                    <EdIntelCommandCenter />

                    {/* Quick Search FAB */}
                    <button
                        className="fixed bottom-24 sm:bottom-10 right-6 sm:right-10 w-12 h-12 sm:w-14 sm:h-14 bg-amber-400 text-black rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:scale-110 hover:rotate-6 transition-all z-50"
                        title="Quick Search Terminal"
                        aria-label="Quick Search Terminal"
                    >
                        <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    {/* High Density Minimalist Footer */}
                    <footer className="mt-auto border-t border-white/10 bg-[#050814]/90 backdrop-blur-xl relative z-30 pb-24 md:pb-8">
                        <div className="max-w-[1500px] mx-auto px-6 md:px-10 py-8">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                                {/* Branding */}
                                <div className="col-span-1 md:col-span-4 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 border border-amber-400/40 rounded-xl flex items-center justify-center text-amber-400 font-black bg-amber-500/10 italic text-xs">
                                            EI
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-black italic text-white uppercase tracking-tight">EdIntel OS</h4>
                                            <span className="text-[9px] text-zinc-400 uppercase tracking-[0.25em] font-mono">v4.0 Sovereign</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-zinc-400 leading-relaxed font-sans max-w-sm">
                                        High fidelity educational intelligence grid with biometrically verified compliance logs & autonomous workflow synthesis.
                                    </p>
                                </div>

                                {/* Founder Vector Badge Anchor */}
                                <div className="col-span-1 md:col-span-5 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-px bg-amber-400/20 flex-1" />
                                        <span className="text-[9px] font-mono text-amber-400 uppercase tracking-[0.3em]">Architect & Founder</span>
                                        <div className="h-px bg-amber-400/20 flex-1" />
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {/* Vector Profile Badge (Zero Raster Image) */}
                                        <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-indigo-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold text-sm shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                                            <span>AW</span>
                                            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-400 text-black flex items-center justify-center">
                                                <Award size={9} />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <h5 className="text-xs font-bold text-white uppercase tracking-wider">Dr. Alvin West</h5>
                                            <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">
                                                Transcend Academic Business & Cognitive Solutions
                                            </p>
                                            <div className="flex items-center gap-3 pt-0.5">
                                                <a href="mailto:contact@edintel.io" className="text-[10px] font-mono text-amber-400 hover:text-amber-300 uppercase tracking-wider transition-colors">Neural Uplink</a>
                                                <span className="text-white/10">|</span>
                                                <Link href="/about" className="text-[10px] font-mono text-amber-400 hover:text-amber-300 uppercase tracking-wider transition-colors">Legacy Profile</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* System Nodes Links */}
                                <div className="col-span-1 md:col-span-3 space-y-2">
                                    <h5 className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.3em]">System Nodes</h5>
                                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                                        <Link href="/identity" className="text-zinc-400 hover:text-amber-400 transition-colors">Identity</Link>
                                        <Link href="/ferpa" className="text-zinc-400 hover:text-amber-400 transition-colors">FERPA</Link>
                                        <Link href="/admin/status" className="text-zinc-400 hover:text-amber-400 transition-colors">Grid Status</Link>
                                        <Link href="/privacy" className="text-zinc-400 hover:text-amber-400 transition-colors">Privacy</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                                <p className="text-[9px] text-zinc-400 uppercase tracking-[0.2em] font-mono">
                                    © 2026 EDINTEL OS. ZERO RASTER DEPENDENCIES. ALL RIGHTS RESERVED.
                                </p>
                                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest">GRID OPTIMAL</span>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#050814]/95 backdrop-blur-2xl border-t border-white/10 flex items-center justify-around px-4 z-50">
                {tools.slice(0, 4).map((tool) => {
                    const active = pathname === tool.href;
                    const IconComponent = tool.icon;
                    return (
                        <Link key={tool.id} href={tool.href}>
                            <div className={`p-2.5 rounded-xl transition-all ${active ? 'bg-amber-400/20 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'text-zinc-400'}`}>
                                <IconComponent size={18} />
                            </div>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
