'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Sparkles, TrendingUp, Shield as LucideShield, Search, ArrowRight
} from "lucide-react";
import Link from 'next/link';
import NextImage from 'next/image';
import SpotlightCard from './SpotlightCard';
import HolographicBriefing from './HolographicBriefing';

import { generators } from '@/data/generators';

// Helper to map icon names (since generators.ts has components) or just use the component directly.
// The generators.ts already has the icon component.

const allTools = generators.map(gen => ({
    ...gen,
    link: `/generators/${gen.id}`,
    // Map generator IDs to categories for filtering
    category: getCategory(gen.id)
}));

// Manually inject High-Value Revenue Tools at the top
const specializedTools = [
    {
        id: 'risk-analyzer',
        name: 'Litigation Risk Audit',
        description: 'Instant legal exposure analysis. Calculate potential liability scores and get mitigation steps before you get sued.',
        icon: LucideShield,
        color: 'from-red-500 to-orange-600',
        link: '/generators/risk-analyzer',
        category: 'admin',
        avatar: '/images/avatars/dr_alvin_west_premium.png'
    },
    {
        id: 'district-strategy',
        name: 'District Strategy Command',
        description: 'Generate board-level turnaround briefs. Operational strategy diagnosis for Superintendents.',
        icon: TrendingUp,
        color: 'from-amber-500 to-orange-600',
        link: '/generators/district-strategy',
        category: 'admin',
        avatar: '/images/avatars/dr_alvin_west_premium.png'
    }
];

// Merge and dedupe if necessary (simple unshift here)
allTools.unshift(...specializedTools as any);

function getCategory(id: string) {
    if (id.includes('iep') || id.includes('behavior') || id.includes('dyslexia') || id.includes('cognitive')) return 'iep';
    if (id.includes('lesson') || id.includes('pbl') || id.includes('differentiation') || id.includes('assessment') || id.includes('rubric') || id.includes('study') || id.includes('quiz') || id.includes('video')) return 'lesson';
    if (id.includes('email') || id.includes('recommendation') || id.includes('communicator') || id.includes('newsletter') || id.includes('comms')) return 'communication';
    if (id.includes('conflict') || id.includes('icebreaker') || id.includes('goal')) return 'behavior';
    if (id.includes('grant') || id.includes('policy') || id.includes('audit') || id.includes('meeting') || id.includes('budget') || id.includes('safety') || id.includes('transport') || id.includes('athletic') || id.includes('schedule')) return 'admin';
    if (id.includes('field') || id.includes('substitute') || id.includes('idea') || id.includes('writing') || id.includes('math') || id.includes('science') || id.includes('college') || id.includes('debate')) return 'teaching';
    if (id.includes('code') || id.includes('data') || id.includes('design')) return 'tech';
    return 'other';
}

const categories = [
    { id: 'all', name: 'All Modules', count: allTools.length },
    { id: 'admin', name: 'Eliminate Admin Fatigue', count: allTools.filter(t => t.category === 'admin').length },
    { id: 'iep', name: 'Reduce Paperwork', count: allTools.filter(t => t.category === 'iep').length },
    { id: 'behavior', name: 'Eliminate Suspensions', count: allTools.filter(t => t.category === 'behavior').length },
    { id: 'lesson', name: 'Teacher Retention', count: allTools.filter(t => t.category === 'lesson').length },
    { id: 'teaching', name: 'Student Engagement', count: allTools.filter(t => t.category === 'teaching').length },
    { id: 'tech', name: 'Intelligence & Data', count: allTools.filter(t => t.category === 'tech').length },
];

export default function FeatureShowcaseGrid() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(12);
    const [showBriefing, setShowBriefing] = useState(false);

    const filteredTools = allTools.filter(tool => {
        const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
        const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const visibleTools = filteredTools.slice(0, visibleCount);

    return (
        <div className="min-h-screen bg-black relative overflow-hidden p-6">
            {/* Background Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] scale-150" />
            </div>
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-noble-gold/5 to-transparent pointer-events-none" />

            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 text-center"
                >
                    <h1 className="text-5xl font-black text-white mb-4 uppercase tracking-tighter">
                        41 Strategic <span className="text-noble-gold italic">Protocols</span>
                    </h1>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-6">
                        Access specialized AI delegates for every facet of educational leadership.
                    </p>

                    <button
                        onClick={() => setShowBriefing(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-noble-gold/10 border border-noble-gold/20 hover:bg-noble-gold/20 text-noble-gold font-black text-[10px] uppercase tracking-[0.2em] transition-all hover:scale-105"
                    >
                        <Sparkles size={14} className="animate-pulse" />
                        <span>Tactical Selection Guide</span>
                    </button>
                </motion.div>

                <HolographicBriefing
                    isOpen={showBriefing}
                    onClose={() => setShowBriefing(false)}
                    title="Tactical Tool Selection"
                    description="Strategist reporting. We have 41 specialized modules available. For IEPs, filter by 'Need'. For curriculum, select 'Lesson Planning'. Use the search command to rapidly identify specific protocols. All systems are online and ready for deployment."
                    role="Professional Strategist"
                    avatarImage="/images/avatars/curriculum_strategist.png"
                    thumbnail="/images/features/lesson-planner-demo.mp4"
                    stats={{ time: "READY", saved: "41+", accuracy: "100%" }}
                />

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                >
                    <div className="relative max-w-2xl mx-auto group">
                        <div className="absolute -inset-1 bg-noble-gold/20 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity" />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-noble-gold transition-colors" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search strategic protocols..."
                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-black border border-white/10 text-white placeholder-zinc-600 focus:border-noble-gold/50 outline-none transition-all relative z-10"
                        />
                    </div>
                </motion.div>

                {/* Category Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8 overflow-x-auto"
                >
                    <div className="flex gap-2 min-w-max pb-2">
                        {categories.map((category) => (
                            <motion.button
                                key={category.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${selectedCategory === category.id
                                    ? 'bg-noble-gold text-black border-noble-gold shadow-lg shadow-noble-gold/20'
                                    : 'bg-black/40 text-zinc-500 hover:bg-zinc-800 hover:text-noble-gold border-white/5'
                                    }`}
                            >
                                {category.name}
                                <span className={`ml-2 text-[8px] ${selectedCategory === category.id ? 'text-black/60' : 'text-zinc-600'}`}>({category.count})</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {visibleTools.map((tool, index) => (
                        <Link key={tool.id} href={tool.link}>
                            <SpotlightCard
                                className="h-full p-6 rounded-3xl bg-zinc-900/40 backdrop-blur-xl border border-white/5 hover:border-noble-gold/40 transition-all cursor-pointer relative group overflow-hidden"
                                color="rgba(212, 175, 55, 0.1)"
                            >
                                {/* Delegate Avatar Badge */}
                                {tool.avatar && (
                                    <div className="absolute top-4 right-4 w-12 h-12 rounded-full overflow-hidden border border-noble-gold/20 shadow-lg shadow-noble-gold/10 group-hover:scale-110 transition-transform">
                                        <NextImage src={tool.avatar} alt="Delegate" fill className="object-cover grayscale group-hover:grayscale-0 transition-all" />
                                    </div>
                                )}

                                <div className={`inline-flex p-3 rounded-2xl bg-zinc-950 border border-white/10 mb-4 group-hover:scale-110 group-hover:border-noble-gold/30 transition-all shadow-xl`}>
                                    <tool.icon className="w-6 h-6 text-noble-gold" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight group-hover:text-noble-gold transition-colors">{tool.name}</h3>
                                <p className="text-zinc-400 text-sm mb-6 leading-relaxed line-clamp-2">{tool.description}</p>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-noble-gold opacity-60 group-hover:opacity-100 transition-all">
                                    <span>Initialize Protocol</span>
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </SpotlightCard>
                        </Link>
                    ))}
                </div>

                {/* Load More */}
                {filteredTools.length > visibleCount && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setVisibleCount(prev => prev + 12)}
                            className="px-12 py-4 rounded-xl bg-noble-gold text-black font-black uppercase tracking-widest shadow-xl shadow-noble-gold/20 hover:bg-gold-600 transition-all ring-1 ring-gold-400/50"
                        >
                            Connect Additional Protocols ({filteredTools.length - visibleCount})
                        </motion.button>
                    </motion.div>
                )}

                {/* Results Count */}
                <div className="mt-8 text-center text-[10px] font-black uppercase tracking-widest text-zinc-600">
                    Displaying <span className="text-noble-gold">{visibleTools.length}</span> of <span className="text-noble-gold">{filteredTools.length}</span> Active Strategic Modules
                </div>
            </div>
        </div>
    );
}
