"use client"

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Grid, Shield, BookOpen, Activity,
    Briefcase, Cpu, Sparkles, Brain, Dumbbell,
    GraduationCap, Video, X, ChevronRight, Zap
} from 'lucide-react';
import { PROTOCOL_REGISTRY as ALL_PROTOCOLS, UnifiedProtocol } from '@/data/unifiedRegistry';
import { NeuralLinkChat } from '@/components/ai/NeuralLinkChat';
import ProfessionalBackground from '@/components/dossier/ProfessionalBackground';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

export default function AIHubClient() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [selectedProtocol, setSelectedProtocol] = useState<UnifiedProtocol | null>(null);

    // Categories for the hub
    const categories = [
        { id: "All", label: "All Nodes", icon: Grid },
        { id: "Strategic", label: "Strategic Leadership", icon: Briefcase },
        { id: "Instructional", label: "Instructional Core", icon: BookOpen },
        { id: "Operational", label: "Ops & Logistics", icon: Shield },
        { id: "Wellness", label: "Wellness & Support", icon: Activity },
        { id: "Cognitive", label: "Cognitive Training", icon: Brain },
    ];

    // Cognitive and Media nodes that aren't text-based protocols
    const specializedNodes = useMemo(() => [
        {
            id: 'cognitive-gym',
            name: 'Cognitive Gym',
            description: 'Interactive mental fitness and executive function training.',
            category: 'Cognitive',
            icon: Dumbbell,
            link: '/gym',
            color: 'text-pink-400',
            border: 'border-pink-500/20'
        },
        {
            id: 'principal-academy',
            name: 'Cognitive Academy',
            description: 'Guided pathways to mastery in educational leadership.',
            category: 'Cognitive',
            icon: GraduationCap,
            link: '/academy',
            color: 'text-indigo-400',
            border: 'border-indigo-500/20'
        },
        {
            id: 'video-studio',
            name: 'Media Studio',
            description: 'Synthesize briefs into high-fidelity avatar presentations.',
            category: 'Operational',
            icon: Video,
            link: '/studio',
            color: 'text-purple-400',
            border: 'border-purple-500/20'
        }
    ], []);

    const filteredProtocols = useMemo(() => {
        const protocols = ALL_PROTOCOLS.filter(gen => {
            const matchesSearch = gen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                gen.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === "All" || gen.category === activeCategory;
            return matchesSearch && matchesCategory;
        });

        // Add specialized nodes if they match
        const extraNodes = specializedNodes.filter(node => {
            const matchesSearch = node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                node.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === "All" || node.category === activeCategory;
            return matchesSearch && matchesCategory;
        });

        return [...protocols, ...extraNodes];
    }, [searchQuery, activeCategory, specializedNodes]);

    return (
        <main className="content-stage min-h-screen bg-[#020617] text-slate-200 overflow-hidden relative">
            <ProfessionalBackground />

            {/* GRID OVERLAY */}
            <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-[0.03] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 h-full flex flex-col">
                {/* Header */}
                <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-8">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3 px-3 py-1 rounded-full bg-noble-gold/10 border border-noble-gold/20 text-noble-gold text-[10px] font-black uppercase tracking-[0.2em] w-fit">
                            <Cpu className="w-3.5 h-3.5" />
                            System Node: Neural Grid
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic">
                            The <span className="gold-gradient-text">Neural</span> Hub
                        </h1>
                        <p className="text-zinc-500 max-w-xl text-sm font-medium uppercase tracking-[0.1em]">
                            Unified tactical interface for strategic protocols & cognitive synthesis.
                        </p>
                    </div>

                    <div className="w-full md:w-96 relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-noble-gold transition-colors" />
                        <input
                            type="text"
                            placeholder="Search Agents & Tools..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-noble-gold/50 focus:ring-1 focus:ring-noble-gold/20 transition-all font-medium"
                        />
                    </div>
                </header>

                {/* Categories */}
                <nav className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={cn(
                                "flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border",
                                activeCategory === cat.id
                                    ? "bg-noble-gold text-black border-noble-gold shadow-lg shadow-noble-gold/20"
                                    : "bg-white/5 text-zinc-500 border-white/5 hover:bg-white/10 hover:text-white"
                            )}
                        >
                            <cat.icon className="w-3.5 h-3.5" />
                            {cat.label}
                        </button>
                    ))}
                </nav>

                {/* Main Grid Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-20 overflow-y-auto custom-scrollbar flex-1 max-h-[calc(100vh-350px)]">
                    <AnimatePresence mode="popLayout">
                        {filteredProtocols.map((node, i) => (
                            <motion.div
                                key={node.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2, delay: i * 0.02 }}
                                onClick={() => {
                                    if ((node as any).link) return; // Specialized nodes link away
                                    setSelectedProtocol(node as UnifiedProtocol);
                                }}
                                className={cn(
                                    "p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-noble-gold/30 hover:bg-white/[0.05] transition-all cursor-pointer group relative overflow-hidden",
                                    selectedProtocol?.id === node.id && "border-noble-gold/50 bg-noble-gold/5 ring-1 ring-noble-gold/20"
                                )}
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                                    {node.icon ? <node.icon size={80} /> : <Cpu size={80} />}
                                </div>

                                <div className="space-y-4 relative z-10">
                                    <div className={cn(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                                        selectedProtocol?.id === node.id ? "bg-noble-gold text-black" : "bg-white/5 text-zinc-400 group-hover:text-noble-gold group-hover:bg-noble-gold/10"
                                    )}>
                                        {node.icon ? <node.icon size={24} strokeWidth={1.5} /> : <Cpu size={24} strokeWidth={1.5} />}
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-black text-sm uppercase tracking-wider text-white group-hover:text-noble-gold transition-colors">
                                                {node.name}
                                            </h3>
                                            {(node as any).link && <Sparkles className="w-3 h-3 text-noble-gold animate-pulse" />}
                                        </div>
                                        <p className="text-[10px] text-zinc-500 line-clamp-2 leading-relaxed tracking-wide">
                                            {node.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-2">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">
                                            {node.category || 'Protocol'}
                                        </span>
                                        {(node as any).link ? (
                                            <Link href={(node as any).link} className="flex items-center gap-1 text-[9px] font-black uppercase text-noble-gold hover:underline">
                                                Launch <ChevronRight size={10} />
                                            </Link>
                                        ) : (
                                            <div className="flex items-center gap-1 text-[9px] font-black uppercase text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                                Initialize <Zap size={10} fill="currentColor" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Chat Interface Drawer/Overlay */}
            <AnimatePresence>
                {selectedProtocol && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 w-full lg:w-[600px] xl:w-[800px] z-[100] bg-black/95 border-l border-white/10 shadow-2xl backdrop-blur-3xl"
                    >
                        <div className="h-full flex flex-col p-6 pt-20 relative">
                            <button
                                onClick={() => setSelectedProtocol(null)}
                                title="Close AI Hub"
                                className="absolute top-6 left-6 p-3 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                            >
                                <X size={20} />
                            </button>

                            <div className="absolute top-8 right-12 flex items-center gap-2 opacity-50">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Neutral Sync Active</span>
                            </div>

                            <div className="flex-1 overflow-hidden rounded-[2.5rem] border border-white/5 shadow-2xl">
                                <NeuralLinkChat
                                    protocol={selectedProtocol}
                                    className="h-full border-0 bg-transparent"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop for open drawer */}
            {selectedProtocol && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedProtocol(null)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
                />
            )}
        </main>
    );
}
