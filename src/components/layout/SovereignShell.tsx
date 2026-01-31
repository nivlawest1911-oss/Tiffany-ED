'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    BrainCircuit,
    Network,
    CircleDollarSign,
    Fingerprint,
    Coins,
    Search,
    Home
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { initiateBioAuth } from '@/app/auth/actions';
import { DueProcessShield, StatutoryDisclaimer } from '../SovereignRegulatory';
import SovereignInteractionAgent from '../SovereignInteractionAgent';
import { SovereignCommandCenter } from './SovereignCommandCenter';

interface CoreTool {
    id: string;
    label: string;
    icon: React.ElementType;
    href: string;
    desc: string;
}

export default function SovereignShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const tools: CoreTool[] = [
        {
            id: 'home',
            label: 'Home Command',
            icon: Home,
            href: '/',
            desc: 'The Sovereign Grid entry point. Strategic overview of EDINTEL systems.'
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
            desc: 'Neural synchronization. Bridges school sites with the Sovereign Vault.'
        },
        {
            id: 'pricing',
            label: 'Professional Pricing',
            icon: CircleDollarSign,
            href: '/admin/status',
            desc: 'Managing the $79/site model and usage token allocations.'
        }
    ];

    return (
        <div className="flex h-screen bg-sovereign-black text-white font-sans overflow-hidden selection:bg-intel-gold selection:text-black">

            <aside className="hidden md:flex w-24 hover:w-72 bg-black border-r border-intel-gold/10 transition-all duration-500 ease-in-out group z-50 flex-col items-center py-8 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-intel-gold/[0.02] to-transparent pointer-events-none" />

                <Link href="/" className="mb-16 relative group/logo px-4">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-14 h-14 border-2 border-intel-gold/40 rounded-3xl flex items-center justify-center text-intel-gold font-black bg-white/[0.02] shadow-[0_0_40px_rgba(197,164,126,0.2)] group-hover/logo:scale-110 group-hover/logo:border-intel-gold transition-all duration-700 italic relative overflow-hidden">
                            <div className="absolute inset-0 bg-gold-gradient opacity-10" />
                            <span className="text-2xl relative z-10">EI</span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-intel-gold mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 italic">EdIntel</span>
                    </div>
                </Link>

                <nav className="flex-1 w-full px-4 space-y-4 relative z-10">
                    {tools.map((tool) => {
                        const active = pathname === tool.href;
                        return (
                            <div key={tool.id} className="relative">
                                <SovereignInteractionAgent
                                    title={tool.label}
                                    description={tool.desc}
                                    agentId={tool.id === 'intel' ? 'tactical' : 'visionary'}
                                    position="right"
                                    className="w-full"
                                >
                                    <Link href={tool.href}>
                                        <div className={`flex items-center p-4 rounded-2xl cursor-pointer border transition-all duration-500 group/item
                                            ${active
                                                ? 'bg-intel-gold/10 border-intel-gold/30 text-intel-gold shadow-[0_0_30px_rgba(197,164,126,0.1)]'
                                                : 'border-transparent hover:bg-white/[0.03] hover:border-white/10 text-zinc-600 hover:text-white'}`}>
                                            <tool.icon className={`w-6 h-6 shrink-0 transition-transform duration-500 ${active ? 'scale-110' : 'group-hover/item:scale-110 group-hover/item:text-intel-gold'}`} />
                                            <span className={`ml-6 text-[11px] font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap italic
                                                ${active ? 'translate-x-0' : '-translate-x-4 group-hover:translate-x-0'}`}>
                                                {tool.label}
                                            </span>
                                        </div>
                                    </Link>
                                </SovereignInteractionAgent>
                            </div>
                        );
                    })}
                </nav>

                <div className="w-full px-6 pt-8 border-t border-white/5 mt-auto">
                    <div className="flex flex-col items-center gap-6 opacity-40 group-hover:opacity-100 transition-opacity pb-8">
                        <div className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 overflow-hidden group-hover:border-intel-gold/40 transition-colors relative">
                            <Image
                                src="/images/keisha_reynolds_avatar_1768666809673.png"
                                alt="District Administrator Avatar"
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col relative overflow-hidden">

                {/* 2. THE SOVEREIGN BAR (Header) */}
                <header className="h-20 md:h-24 border-b border-white/[0.04] flex items-center justify-between px-6 md:px-12 bg-black/40 backdrop-blur-3xl relative z-40">
                    <div className="flex items-center gap-12">
                        <Link href="/" className="md:hidden">
                            <div className="w-10 h-10 border border-intel-gold/40 rounded-xl flex items-center justify-center text-intel-gold font-black bg-white/[0.02] italic text-lg">
                                Ei
                            </div>
                        </Link>

                        <div className="hidden sm:flex items-center gap-4 group cursor-default">
                            <div className="w-2.5 h-2.5 rounded-full bg-shield-green animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                            <span className="text-[10px] font-black font-mono text-zinc-500 uppercase tracking-[0.5em] italic">Due Process Shield: Active</span>
                        </div>

                        <div className="hidden xl:flex items-center gap-3 px-6 py-2.5 bg-white/[0.02] border border-white/5 rounded-full">
                            <Coins size={12} className="text-intel-gold" />
                            <span className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.4em] italic">Usage Tokens: <span className="text-white ml-2">951.4k</span></span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-8">
                        <div className="hidden sm:block px-6 py-2.5 rounded-full border border-intel-gold/20 bg-intel-gold/5 text-[10px] font-black text-intel-gold uppercase tracking-[0.4em] italic shadow-[0_0_20px_rgba(197,164,126,0.05)]">
                            AL Code 290-8-9
                        </div>

                        <button
                            onClick={() => initiateBioAuth('google')}
                            className="bg-white text-black px-6 md:px-10 py-3 md:py-3.5 rounded-2xl text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] hover:bg-intel-gold transition-all duration-500 shadow-2xl relative overflow-hidden group/btn"
                        >
                            <div className="absolute inset-0 bg-black/5 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                            <div className="relative z-10 flex items-center gap-3 italic">
                                <Fingerprint className="w-4 h-4" />
                                <span className="hidden xs:inline">Bio-Auth Access</span>
                                <span className="xs:hidden">Auth</span>
                            </div>
                        </button>
                    </div>
                </header>

                {/* 3. NEURAL GRID (Viewport) */}
                <main className="flex-1 overflow-y-auto custom-scrollbar relative flex flex-col">
                    <div className="flex-1">
                        {/* Hero Background Glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-intel-gold/[0.03] blur-[150px] -z-10 pointer-events-none" />

                        <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-10 md:pt-20 pb-32">
                            {pathname === '/admin/analytics' && (
                                <section className="text-center mb-16 md:mb-24 relative">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8 }}
                                    >
                                        <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter text-gold-gradient uppercase leading-[0.9]">
                                            District Intelligence
                                        </h1>
                                        <p className="mt-6 md:mt-10 text-lg md:text-xl text-zinc-500 max-w-3xl mx-auto font-black italic leading-relaxed uppercase tracking-tight opacity-80">
                                            Strategic architectures for the modern educator. Empowering leadership through superior intelligence and executive automation.
                                        </p>
                                    </motion.div>
                                </section>
                            )}

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                {children}
                            </motion.div>
                        </div>
                    </div>

                    <SovereignCommandCenter />
                    <StatutoryDisclaimer />

                    {/* Quick Search FAB */}
                    <button
                        className="fixed bottom-32 sm:bottom-12 right-6 sm:right-12 w-14 h-14 sm:w-16 sm:h-16 bg-intel-gold text-black rounded-2xl flex items-center justify-center shadow-3xl hover:scale-110 hover:rotate-6 transition-all duration-500 group/fab z-50"
                        title="Quick Search Terminal"
                    >
                        <Search className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform" />
                    </button>

                    {/* Floating Regulatory Status on Desktop */}
                    <div className="fixed bottom-12 left-32 z-50 hidden xl:block">
                        <DueProcessShield />
                    </div>
                </main>
            </div>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-black/90 backdrop-blur-2xl border-t border-white/5 flex items-center justify-around px-6 z-50">
                {tools.slice(0, 4).map((tool) => {
                    const active = pathname === tool.href;
                    return (
                        <Link key={tool.id} href={tool.href}>
                            <div className={`p-3 rounded-xl transition-all ${active ? 'bg-intel-gold/20 text-intel-gold shadow-[0_0_20px_rgba(197,164,126,0.1)]' : 'text-zinc-600'}`}>
                                <tool.icon size={20} className={active ? 'scale-110' : ''} />
                            </div>
                        </Link>
                    )
                })}
            </nav>
        </div>
    );
}
