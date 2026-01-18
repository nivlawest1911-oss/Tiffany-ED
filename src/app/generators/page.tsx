"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid, List, Zap, Shield as LucideShield, BookOpen, Users, Activity, Briefcase } from 'lucide-react';
import { GENERATORS } from '@/data/generators';
import NeuralBackground from '@/components/NeuralBackground';

export default function GeneratorsIndexPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
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
        const desc = gen.description.toLowerCase();

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
        <div className="min-h-screen bg-black text-white selection:bg-indigo-500/30 font-sans relative overflow-hidden">
            <NeuralBackground />

            <main className="relative max-w-7xl mx-auto px-6 py-12">
                {/* Header Section */}
                <header className="mb-12 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                    >
                        <div>
                            <div className="flex items-center gap-2 text-indigo-400 mb-2">
                                <Zap className="w-5 h-5" />
                                <span className="text-sm font-bold tracking-widest uppercase">Sovereign Command Deck</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
                                Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Protocols</span>
                            </h1>
                            <p className="text-zinc-400 max-w-xl text-lg">
                                Access specialized AI agents for every dimension of educational leadership.
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="w-full md:w-96 relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-20 group-hover:opacity-100 transition duration-500 blur-sm"></div>
                            <div className="relative bg-zinc-900 rounded-xl flex items-center px-4 py-3 border border-white/10 group-focus-within:border-white/20">
                                <Search className="w-5 h-5 text-zinc-500 mr-3" />
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

                    {/* Category Tabs */}
                    <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4 overflow-x-auto no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap border ${activeCategory === cat.id
                                    ? 'bg-white text-black border-white'
                                    : 'bg-zinc-900 text-zinc-400 border-white/5 hover:bg-zinc-800 hover:text-white'
                                    }`}
                            >
                                <cat.icon className="w-4 h-4" />
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
                                <Link href={`/generators/${gen.id}`} className="block h-full">
                                    <div className="group h-full bg-zinc-900/40 hover:bg-zinc-900/80 backdrop-blur-md border border-white/5 hover:border-indigo-500/30 rounded-3xl p-6 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col relative overflow-hidden">

                                        {/* Hover Gradient */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${gen.color || "from-indigo-500 to-purple-600"} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                                        <div className="flex items-start justify-between mb-4 relative z-10">
                                            <div className="p-3 bg-zinc-950 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                                <gen.icon className="w-6 h-6 text-indigo-400 group-hover:text-white transition-colors" />
                                            </div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-600 bg-zinc-950/50 px-2 py-1 rounded-md border border-white/5 group-hover:border-indigo-500/20 group-hover:text-indigo-400 transition-colors">
                                                Active
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors relative z-10">
                                            {gen.name}
                                        </h3>

                                        <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow relative z-10">
                                            {gen.description}
                                        </p>

                                        <div className="flex items-center text-xs font-bold text-zinc-500 group-hover:text-white transition-colors relative z-10">
                                            <div className="w-full h-px bg-white/5 group-hover:bg-indigo-500/30 mr-3 transition-colors" />
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
                            className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-sm font-bold transition-colors"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
