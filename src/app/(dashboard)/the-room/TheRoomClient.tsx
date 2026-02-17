'use client';

import { useState } from 'react'; // Added useState
import { motion, AnimatePresence } from 'framer-motion';
import {
    Brain, HandCoins, Flame,
    ArrowRight, Globe, Cpu, Network,
    Zap, X
} from 'lucide-react';
import Link from 'next/link';
import { default as NextImage } from 'next/image';
import { THE_ROOM_HERO } from '@/lib/assets';
import { GlassCard } from '@/components/ui/Cinematic'; // Importing GlassCard for consistent UI

// Extended Command Center Data with Metrics & Actions
const commandCenters = [
    {
        id: "wisdom-archive",
        title: "Wisdom Archive",
        subtitle: "Specialized AI Advisors",
        description: "Access deep-knowledge advisors focused on Philosophy, History, and Future Trends.",
        icon: Brain,
        color: "from-indigo-900 to-purple-900",
        accent: "text-indigo-400",
        link: "/generators?category=wisdom",
        metrics: { activeAgents: 12, queries: "1.2k", load: "Optimal" },
        quickActions: [
            { label: "Consult Historian", action: "consult_history" },
            { label: "Future Scenario", action: "future_cast" }
        ]
    },
    {
        id: "leadership-forge",
        title: "The Leadership Forge",
        subtitle: "Strategy & Economic Growth",
        description: "Tools for district fiscal strategy, capital optimization, and operational excellence.",
        icon: HandCoins,
        color: "from-emerald-900 to-teal-900",
        accent: "text-emerald-400",
        link: "/generators?category=forge",
        metrics: { activeFrameworks: 8, reportGen: "Fast", efficiency: "+15%" },
        quickActions: [
            { label: "Draft Fiscal Strategy", action: "fiscal_draft" },
            { label: "Optimize Capital", action: "cap_opt" }
        ]
    },
    {
        id: "healing-nexus",
        title: "Healing Nexus",
        subtitle: "Wellness & Identity",
        description: "Trauma-informed protocols and identity restoration nodes.",
        icon: Flame,
        color: "from-red-900 to-orange-950",
        accent: "text-rose-400",
        link: "/generators?category=healing",
        metrics: { facilitators: 5, sessions: "Active", sentiment: "Positive" },
        quickActions: [
            { label: "Launch Restoration", action: "restore_protocol" },
            { label: "Staff Wellness Check", action: "wellness_check" }
        ]
    },
    {
        id: "global-academy",
        title: "Global Academy",
        subtitle: "Visual Knowledge explains",
        description: "Original series and story-based curricula. Any topic becomes a high-fidelity video lesson.",
        icon: Globe,
        color: "from-blue-900 to-indigo-950",
        accent: "text-blue-400",
        link: "/generators?category=global",
        metrics: { channels: 8, streaming: "Live", bandwidth: "Ultra" },
        quickActions: [
            { label: "Create Lesson", action: "create_lesson" },
            { label: "Browse Catalog", action: "browse_catalog" }
        ]
    }
];

export default function TheRoomClient() {
    const [activeNode, setActiveNode] = useState<string | null>(null);
    const [quickActionModal, setQuickActionModal] = useState<{ title: string, action: string } | null>(null);

    return (
        <main className="content-stage relative min-h-screen">

            {/* Context Modal for Quick Actions */}
            <AnimatePresence>
                {quickActionModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="w-full max-w-lg"
                        >
                            <GlassCard className="p-8 relative">
                                <button
                                    title="Close Modal"
                                    onClick={() => setQuickActionModal(null)}
                                    className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 rounded-full bg-indigo-500/20 text-indigo-400">
                                        <Zap size={24} />
                                    </div>
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                                        Initialize: {quickActionModal.title}
                                    </h3>
                                </div>
                                <p className="text-zinc-400 mb-8">
                                    Confirm initialization of this executive protocol. This will deploy specialized agents to draft your request.
                                </p>
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setQuickActionModal(null)}
                                        className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold uppercase tracking-widest transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button className="flex-1 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold uppercase tracking-widest shadow-lg shadow-indigo-500/20 transition-all">
                                        Execute
                                    </button>
                                </div>
                            </GlassCard>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Strategic Header */}
            <div className="relative py-20 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-full bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15),transparent_70%)] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex items-center justify-between mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-xs font-black uppercase tracking-[0.2em]"
                        >
                            <Network size={14} /> Executive Insight Interface
                        </motion.div>

                        {/* Live Ticker */}
                        <div className="hidden md:flex items-center gap-6 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                System Optimal
                            </div>
                            <div>Active Threads: 42</div>
                            <div>Latency: 12ms</div>
                        </div>
                    </div>

                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-6 leading-[0.8] text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600">
                        The EdIntel<br />
                        <span className="text-indigo-500">Room.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl font-light leading-relaxed">
                        Thought becoming form. You are inside the next-generation learning network where strategic intelligence generates its own systems.
                    </p>
                </div>
            </div>

            {/* Divine Strategic Map - Interactive Grid */}
            <section className="py-12 px-6 relative">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {commandCenters.map((node, i) => (
                        <motion.div
                            key={node.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative"
                            onMouseEnter={() => setActiveNode(node.id)}
                            onMouseLeave={() => setActiveNode(null)}
                        >
                            {/* Card Container */}
                            <div className={`glass-panel-premium relative h-full p-10 rounded-[3rem] transition-all duration-500 overflow-hidden ${activeNode === node.id ? 'border-indigo-500/50 shadow-[0_0_50px_rgba(99,102,241,0.1)]' : 'hover:border-white/20'
                                }`}>
                                <div className={`absolute inset-0 bg-gradient-to-br ${node.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                {/* Node Header */}
                                <div className="flex justify-between items-start mb-8">
                                    <div className={`p-4 rounded-2xl bg-white/5 border border-white/5 text-white transition-transform duration-500 ${activeNode === node.id ? 'scale-110 rotate-3' : ''}`}>
                                        <node.icon size={32} className={activeNode === node.id ? node.accent : 'text-white'} />
                                    </div>

                                    {/* Real-time Metrics on Hover */}
                                    <div className={`flex flex-col items-end gap-1 text-[10px] font-mono tracking-widest uppercase transition-all duration-500 ${activeNode === node.id ? 'opacity-100 translate-x-0' : 'opacity-50 translate-x-2'}`}>
                                        {Object.entries(node.metrics).map(([key, value]) => (
                                            <div key={key} className="flex gap-2 text-zinc-400">
                                                <span>{key}:</span>
                                                <span className={node.accent}>{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Node Content */}
                                <div>
                                    <h3 className={`text-xs font-bold uppercase tracking-widest mb-2 transition-colors ${activeNode === node.id ? node.accent : 'text-zinc-500'}`}>{node.subtitle}</h3>
                                    <h2 className="text-4xl font-black text-white mb-6 tracking-tight uppercase group-hover:text-white transition-colors">
                                        {node.title}
                                    </h2>
                                    <p className="text-zinc-400 text-lg leading-relaxed group-hover:text-zinc-300 transition-colors mb-8">
                                        {node.description}
                                    </p>
                                </div>

                                {/* Quick Actions Overlay */}
                                <div className={`grid grid-cols-2 gap-3 transition-all duration-500 ${activeNode === node.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                                    {node.quickActions.map((action, idx) => (
                                        <button
                                            key={idx}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setQuickActionModal({ title: action.label, action: action.action });
                                            }}
                                            className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/5 text-xs font-bold text-white uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-105 transition-all"
                                        >
                                            <Zap size={12} className={node.accent} /> {action.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Navigate Action */}
                                <Link href={node.link} className={`absolute bottom-10 right-10 flex items-center gap-2 font-bold uppercase text-xs tracking-widest transition-all ${activeNode === node.id ? 'opacity-0 translate-y-4' : 'opacity-100 text-white'}`}>
                                    Enter Node <ArrowRight size={14} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Creation Engine Section */}
            <section className="py-32 px-6 border-y border-white/5 bg-zinc-950/50">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-black uppercase tracking-widest mb-8">
                            <Cpu size={14} /> Media Synthesis Studio
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
                            Thought becoming <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-500">Form.</span>
                        </h2>
                        <p className="text-xl text-zinc-400 font-light leading-relaxed mb-10">
                            Our Synthesis Studio transforms abstract strategy into high-fidelity visual media. Every advisor and system is synthesized to ensure your district's vision and identity are amplified.
                        </p>
                        <div className="grid grid-cols-2 gap-8 mb-12">
                            <div>
                                <div className="text-3xl font-black text-white mb-1">∞</div>
                                <div className="text-xs text-zinc-500 uppercase tracking-widest font-black">Capacity</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-white mb-1">ZERO</div>
                                <div className="text-xs text-zinc-500 uppercase tracking-widest font-black">Stock Media</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full aspect-square relative rounded-[3rem] overflow-hidden border border-white/5 group">
                        <NextImage
                            src={THE_ROOM_HERO}
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                            alt="Strategic Creation"
                            fill
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        <div className="absolute bottom-10 left-10">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-full bg-emerald-500 animate-pulse" />
                                <div className="text-xs font-mono text-white tracking-widest uppercase">Engine Operational</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    );
}
