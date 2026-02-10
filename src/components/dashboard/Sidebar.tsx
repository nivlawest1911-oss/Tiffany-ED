'use client';

import React from 'react';
import { LayoutGrid, Database, Video, Zap, LogOut, Settings, Activity, FileText, Brain } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEdIntelVibe } from '@/context/EdIntelVibeContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import EdIntelLogo from '@/components/EdIntelLogo';

export const Sidebar = () => {
    const pathname = usePathname();
    const { isSystemThinking } = useEdIntelVibe();

    const navItems = [
        { icon: LayoutGrid, label: 'Dashboard', href: '/dashboard' },
        { icon: FileText, label: 'IEP Architect', href: '/dashboard/iep-architect' },
        { icon: Brain, label: 'Cognitive Gym', href: '/dashboard/cognitive-gym' },
        { icon: Database, label: 'District Intelligence', href: '/analytics' },
        { icon: Video, label: 'EdIntel Studio', href: '/dashboard/studio' },
        { icon: Zap, label: 'The Room', href: '/the-room' },
        { icon: Zap, label: 'Antigravity Logs', href: '/admin' },
        { icon: Settings, label: 'Settings', href: '/settings' },
    ];

    return (
        <aside className={cn(
            "w-64 fixed left-0 top-0 h-full bg-zinc-950/50 backdrop-blur-xl border-r border-white/10 flex flex-col py-8 z-50 transition-all duration-1000",
            isSystemThinking && "border-r-noble-gold/30 shadow-[4px_0_24px_rgba(197,164,126,0.05)]"
        )}>
            {/* Thinking Pulse Overlay */}
            {isSystemThinking && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.02, 0.05, 0.02] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 bg-noble-gold pointer-events-none"
                />
            )}

            {/* BRAND LOGO */}
            <div className="px-6 mb-12 relative z-10">
                <Link href="/dashboard" className="flex items-center gap-3 group">
                    <EdIntelLogo className="scale-90 origin-left" />
                </Link>
            </div>

            {/* PRIMARY NAV LINKS */}
            <nav className="flex flex-col gap-2 px-4 flex-1 relative z-10">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                                isActive
                                    ? "text-white bg-white/10 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.03)]"
                                    : "text-zinc-400 hover:text-white hover:bg-white/5",
                                isActive && isSystemThinking && "border-noble-gold/40 shadow-[0_0_20px_rgba(197,164,126,0.15)] bg-noble-gold/5"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="sidebar-active-glow"
                                    className="absolute inset-0 bg-gradient-to-r from-noble-gold/5 to-transparent pointer-events-none"
                                />
                            )}
                            <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} className={cn(
                                "transition-colors duration-300",
                                isActive ? "text-noble-gold" : "text-zinc-400 group-hover:text-white"
                            )} />
                            <span className="text-sm font-bold uppercase tracking-wider">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* EXIT COMMAND & SYSTEM STATUS */}
            <div className="px-4 mt-auto space-y-4 relative z-10">
                {isSystemThinking && (
                    <div className="px-4 py-2 rounded-lg bg-noble-gold/5 border border-noble-gold/20 flex items-center gap-3 shadow-[0_0_15px_rgba(197,164,126,0.05)]">
                        <Activity className="w-3 h-3 text-noble-gold animate-pulse" />
                        <span className="text-[10px] font-mono text-noble-gold uppercase tracking-[0.2em] animate-pulse">EdIntel Link Stable</span>
                    </div>
                )}
                <button
                    title="Exit Protocol"
                    aria-label="Exit Protocol"
                    className="w-full flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-white hover:bg-red-950/20 transition-all rounded-xl group border border-transparent hover:border-red-500/20"
                >
                    <LogOut size={18} className="group-hover:-translate-x-1 transition-transform group-hover:text-red-500" />
                    <span className="text-[11px] font-black uppercase tracking-[0.2em]">Exit Protocol</span>
                </button>
            </div>
        </aside>
    );
};
