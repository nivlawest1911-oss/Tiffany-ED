'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    BrainCircuit,
    Link2,
    Database,
    ShieldCheck
} from 'lucide-react';

const tools = [
    {
        id: 'init',
        label: 'Initialize Center',
        href: '/dashboard',
        desc: 'System launchpad. Orchestrates executive automation and district-wide health snapshots.',
        icon: LayoutDashboard
    },
    {
        id: 'intel',
        label: 'Intelligence Tools',
        href: '/generators',
        desc: 'Predictive clinical analytics. Maps Mobile County stressors to prevent high-cost crisis escalation.',
        icon: BrainCircuit
    },
    {
        id: 'hub',
        label: 'Connector Hub',
        href: '/connectors',
        desc: 'Neural synchronization. Bridges real-time school site data with the Sovereign Vault.',
        icon: Link2
    },
    {
        id: 'pricing',
        label: 'Professional Pricing',
        href: '/pricing',
        desc: 'License management. Deploying the $79/site model and usage token allocations.',
        icon: Database
    }
];

export default function SovereignSidebar() {
    const pathname = usePathname();
    const [activeAgent, setActiveAgent] = useState<typeof tools[0] | null>(null);

    return (
        <aside className="fixed left-0 top-0 h-full w-20 hover:w-64 bg-sovereign-black border-r border-intel-gold/20 transition-all duration-500 group z-50 overflow-hidden flex flex-col items-center py-8 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">

            {/* Bio-Auth Indicator */}
            <div className="mb-12 flex flex-col items-center">
                <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 border border-intel-gold rounded-xl flex items-center justify-center text-intel-gold font-black text-sm shadow-[0_0_20px_rgba(197,164,126,0.3)] bg-gradient-to-br from-intel-gold/10 to-transparent"
                >
                    Ei
                </motion.div>
                <div className="mt-4 overflow-hidden">
                    <span className="text-[10px] text-intel-gold opacity-0 group-hover:opacity-100 uppercase tracking-[0.4em] font-black transition-all duration-500 block whitespace-nowrap">
                        Sovereign OS
                    </span>
                </div>
            </div>

            {/* Navigation Tools */}
            <nav className="flex-1 w-full space-y-4 px-4">
                {tools.map((tool) => {
                    const isActive = pathname === tool.href;
                    const Icon = tool.icon;

                    return (
                        <div
                            key={tool.id}
                            className="relative flex items-center"
                            onMouseEnter={() => setActiveAgent(tool)}
                            onMouseLeave={() => setActiveAgent(null)}
                        >
                            <Link href={tool.href} className="w-full">
                                <motion.div
                                    className={`flex items-center w-full p-3 rounded-xl transition-all duration-300 border border-transparent
                                        ${isActive
                                            ? 'bg-intel-gold/15 border-intel-gold/30 text-white shadow-[inset_0_0_10px_rgba(197,164,126,0.05)]'
                                            : 'text-gray-500 hover:bg-intel-gold/10 hover:border-intel-gold/20 hover:text-white'
                                        }`}
                                >
                                    <Icon size={22} className={isActive ? 'text-intel-gold' : 'text-current'} strokeWidth={isActive ? 2 : 1.5} />
                                    <span className="ml-5 text-xs font-black uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {tool.label}
                                    </span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="sidebar-indicator"
                                            className="absolute right-0 w-1 h-6 bg-intel-gold rounded-l-full shadow-[0_0_10px_#C5A47E]"
                                        />
                                    )}
                                </motion.div>
                            </Link>

                            {/* THE INTELLIGENCE AGENT (Hover Card) */}
                            <AnimatePresence>
                                {activeAgent?.id === tool.id && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20, scale: 0.95 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: -10, scale: 0.95 }}
                                        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                                        className="absolute left-64 top-0 w-80 p-[1px] bg-gradient-to-b from-intel-gold to-transparent rounded-2xl shadow-2xl z-50"
                                    >
                                        <div className="bg-[#0A0A0A]/95 backdrop-blur-3xl rounded-2xl p-6 border border-white/5">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-2 h-2 rounded-full bg-intel-gold animate-pulse shadow-[0_0_8px_#C5A47E]" />
                                                <span className="text-[10px] font-mono text-white/40 uppercase tracking-tighter">
                                                    Agent Analysis // Node: {tool.id.toUpperCase()}
                                                </span>
                                            </div>
                                            <p className="text-[11px] leading-relaxed text-white/70 font-medium italic">
                                                "{tool.desc}"
                                            </p>
                                            <div className="mt-5 pt-4 border-t border-white/5 flex justify-between items-center">
                                                <div className="flex items-center gap-2">
                                                    <ShieldCheck size={12} className="text-shield-green" />
                                                    <span className="text-[9px] font-black text-shield-green uppercase tracking-widest">Shield Active</span>
                                                </div>
                                                <span className="text-[9px] text-white/20 font-mono uppercase">AL Code 290-8-9</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </nav>

            {/* Professional Shield Status */}
            <div className="mt-auto w-full px-4 py-8 border-t border-intel-gold/10">
                <div className="flex items-center justify-center group-hover:justify-start gap-4 px-2">
                    <div className="relative">
                        <div className="w-2.5 h-2.5 rounded-full bg-shield-green shadow-[0_0_12px_#10B981] animate-pulse"></div>
                        <div className="absolute inset-0 bg-shield-green rounded-full blur-[4px] opacity-40"></div>
                    </div>
                    <div className="flex flex-col whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                        <span className="text-[9px] font-black text-white italic uppercase tracking-[0.2em]">System Status</span>
                        <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">v5.1 SOVEREIGN OS</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
