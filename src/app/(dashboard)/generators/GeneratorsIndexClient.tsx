"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid, Shield as LucideShield, BookOpen, Users, Activity, Briefcase } from 'lucide-react';
import { generators as GENERATORS } from '@/data/generators';
import ProfessionalBackground from '@/components/dossier/ProfessionalBackground';
import EdIntelLogo from '@/components/EdIntelLogo';
import React from 'react';

export default function GeneratorsIndexClient() {
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode] = useState<'grid' | 'list'>('grid');
    const [activeCategory, setActiveCategory] = useState<string>("All");

    // Smart Categorization Logic
    const categories = [
        { id: "All", label: "All Protocols", icon: Grid },
        { id: "Instructional", label: "Instructional Core", icon: BookOpen },
        { id: "Operational", label: "Ops & Logistics", icon: LucideShield },
        { id: "Strategic", label: "Strategic Leadership", icon: Briefcase },
        { id: "Community", label: "Community & Culture", icon: Users },
        { id: "Wellness", label: "Wellness & Support", icon: Activity },
    ];

    const getCategoryForGenerator = (gen: any) => {
        const id = gen.id.toLowerCase();


        if (id.includes('communication') || id.includes('newsletter') || id.includes('social') || id.includes('family') || id.includes('volunteer')) return "Community";
        if (id.includes('wellness') || id.includes('health') || id.includes('counselor') || id.includes('restorative') || id.includes('behavior') || id.includes('mental')) return "Wellness";
        if (id.includes('lesson') || id.includes('iep') || id.includes('curriculum') || id.includes('literacy') || id.includes('math') || id.includes('early') || id.includes('media') || id.includes('stem') || id.includes('arts')) return "Instructional";
        if (id.includes('facility') || id.includes('transport') || id.includes('substitute') || id.includes('procurement') || id.includes('safety') || id.includes('registrar') || id.includes('compliance') || id.includes('attendance')) return "Operational";
        if (id.includes('vision') || id.includes('data') || id.includes('grant') || id.includes('budget') || id.includes('board') || id.includes('labor') || id.includes('capital') || id.includes('hiring') || id.includes('human')) return "Strategic";

        return "Strategic"; // Default fallback
    };

    const filteredGenerators = GENERATORS.filter(gen => {
        const matchesSearch = gen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            gen.description.toLowerCase().includes(searchQuery.toLowerCase());
        const category = getCategoryForGenerator(gen);
        const matchesCategory = activeCategory === "All" || category === activeCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <main className="content-stage">
            <ProfessionalBackground />

            <div className="relative max-w-7xl mx-auto px-6 py-12">
                {/* Header Section */}
                <header className="mb-12 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                    >
                        <div>
                            <div className="flex items-center gap-2 text-noble-gold mb-2">
                                <EdIntelLogo variant="fidelity" className="scale-75 origin-left" />
                                <span className="text-[10px] font-black tracking-[0.2em] uppercase ml-2 border-l border-noble-gold/30 pl-2">EdIntel Protocol Deck</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
                                Strategic <span className="text-noble-gold italic">Protocols</span>
                            </h1>
                            <p className="text-zinc-400 max-w-xl text-lg">
                                Access specialized AI agents for every dimension of educational leadership.
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="w-full md:w-96 relative group">
                            <div className="absolute -inset-0.5 bg-noble-gold/20 rounded-xl opacity-20 group-hover:opacity-100 transition duration-500 blur-sm"></div>
                            <div className="relative bg-zinc-900/80 backdrop-blur-md rounded-xl flex items-center px-4 py-3 border border-white/10 group-focus-within:border-noble-gold/50 transition-colors">
                                <Search className="w-5 h-5 text-zinc-500 mr-3 group-focus-within:text-noble-gold transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search 30+ protocols..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-transparent border-none outline-none text-white placeholder-zinc-500 w-full text-sm"
                                />
                            </div>
                        </div>
                    </motion.div>

                    <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border ${activeCategory === cat.id
                                    ? 'bg-noble-gold text-black border-noble-gold shadow-lg shadow-noble-gold/20'
                                    : 'bg-zinc-900/50 text-zinc-500 border-white/5 hover:bg-zinc-800 hover:text-noble-gold hover:border-noble-gold/30'
                                    }`}
                            >
                                <cat.icon className="w-3 h-3" />
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </header>

                {/* Grid Content */}
                <motion.div
                    layout
                    className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
                >
                    <AnimatePresence mode='popLayout'>
                        {filteredGenerators.map((gen, idx) => (
                            <motion.div
                                key={gen.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2, delay: idx * 0.05 }}
                            >
                                <Link href={gen.link || `/generators/${gen.id}`} className="block h-full">
                                    <div className="group h-full bg-zinc-900/40 hover:bg-zinc-900/60 backdrop-blur-md border border-white/5 hover:border-noble-gold/30 rounded-3xl p-6 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-noble-gold/5 flex flex-col relative overflow-hidden">

                                        {/* Hover Glow */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-noble-gold/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />

                                        <div className="flex items-start justify-between mb-4 relative z-10">
                                            <div className="p-3 bg-zinc-950 rounded-2xl border border-white/10 group-hover:scale-110 group-hover:border-noble-gold/30 transition-all duration-300 shadow-lg">
                                                <gen.icon className="w-6 h-6 text-noble-gold group-hover:text-noble-gold transition-colors" />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 bg-zinc-950/50 px-2 py-1 rounded-md border border-white/5 group-hover:border-noble-gold/20 group-hover:text-noble-gold transition-colors">
                                                Protocol Active
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-noble-gold transition-colors relative z-10 uppercase tracking-tight">
                                            {gen.name}
                                        </h3>

                                        <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow relative z-10">
                                            {gen.description}
                                        </p>

                                        <div className="flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 group-hover:text-noble-gold transition-colors relative z-10">
                                            <div className="w-full h-px bg-white/5 group-hover:bg-noble-gold/20 mr-3 transition-colors" />
                                            <span>INITIALIZE</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredGenerators.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                            <Search className="w-8 h-8 text-zinc-600" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No Protocols Found</h3>
                        <p className="text-zinc-500">Try adjusting your search criteria or category filter.</p>
                        <button
                            onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                            className="mt-6 px-8 py-3 bg-noble-gold text-black rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-noble-gold/20 hover:scale-105"
                        >
                            Reset System Filters
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
}
