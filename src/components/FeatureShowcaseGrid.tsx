'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Sparkles, FileText, Brain, MessageSquare, Award, Zap, Users, Calendar,
    BookOpen, Clipboard, Target, TrendingUp, Shield, Heart, Lightbulb,
    Code, BarChart3, Megaphone, Palette, Video, GraduationCap, Trophy,
    Rocket, Search, Filter, ArrowRight, CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import SpotlightCard from './SpotlightCard';

import { generators } from '@/data/generators';

// Helper to map icon names (since generators.ts has components) or just use the component directly.
// The generators.ts already has the icon component.

const allTools = generators.map(gen => ({
    ...gen,
    link: `/generators/${gen.id}`,
    // Map generator IDs to categories for filtering
    category: getCategory(gen.id)
}));

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
    { id: 'all', name: 'All Tools', count: allTools.length },
    { id: 'iep', name: 'IEP & Special Ed', count: allTools.filter(t => t.category === 'iep').length },
    { id: 'lesson', name: 'Lesson Planning', count: allTools.filter(t => t.category === 'lesson').length },
    { id: 'communication', name: 'Communication', count: allTools.filter(t => t.category === 'communication').length },
    { id: 'behavior', name: 'Behavior & SEL', count: allTools.filter(t => t.category === 'behavior').length },
    { id: 'admin', name: 'Admin & Compliance', count: allTools.filter(t => t.category === 'admin').length },
    { id: 'teaching', name: 'Teaching & Learning', count: allTools.filter(t => t.category === 'teaching').length },
    { id: 'tech', name: 'Tech & Data', count: allTools.filter(t => t.category === 'tech').length },
];

export default function FeatureShowcaseGrid() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(12);

    const filteredTools = allTools.filter(tool => {
        const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
        const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const visibleTools = filteredTools.slice(0, visibleCount);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 text-center"
                >
                    <h1 className="text-5xl font-bold text-white mb-4">
                        41 AI-Powered Tools
                    </h1>
                    <p className="text-xl text-purple-300 max-w-2xl mx-auto">
                        Everything you need to save time and focus on what matters most
                    </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                >
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search tools..."
                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-black/40 backdrop-blur-xl border border-purple-500/20 text-white placeholder-purple-400/50 focus:border-purple-500/40 outline-none"
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
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === category.id
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                                    : 'bg-black/40 text-purple-300 hover:bg-purple-500/20 border border-purple-500/20'
                                    }`}
                            >
                                {category.name}
                                <span className="ml-2 text-xs opacity-75">({category.count})</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {visibleTools.map((tool, index) => (
                        <Link key={tool.id} href={tool.link}>
                            <SpotlightCard
                                className="h-full p-6 rounded-2xl bg-black/40 backdrop-blur-xl hover:border-purple-500/40 transition-all cursor-pointer relative group"
                                color="rgba(168, 85, 247, 0.2)"
                            >
                                {/* Delegate Avatar Badge */}
                                {tool.avatar && (
                                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full overflow-hidden border-2 border-purple-500/30 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform">
                                        <img src={tool.avatar} alt="Delegate" className="w-full h-full object-cover" />
                                    </div>
                                )}

                                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${tool.color} mb-4 group-hover:scale-110 transition-transform`}>
                                    <tool.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
                                <p className="text-purple-200 mb-4 leading-relaxed line-clamp-2">{tool.description}</p>
                                <div className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300 transition-colors">
                                    <span className="text-sm font-medium">Try it now</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                            className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/50"
                        >
                            Load More Tools ({filteredTools.length - visibleCount} remaining)
                        </motion.button>
                    </motion.div>
                )}

                {/* Results Count */}
                <div className="mt-8 text-center text-purple-300">
                    Showing {visibleTools.length} of {filteredTools.length} tools
                </div>
            </div>
        </div>
    );
}
