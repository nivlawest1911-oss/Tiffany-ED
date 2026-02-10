'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Activity, Clock, Users, FileText, Brain,
    Sparkles, Award, Target, Calendar
} from 'lucide-react';
import Link from 'next/link';

export default function ActivityClient() {
    const [filter, setFilter] = useState('all');

    const activities = [
        {
            id: 1,
            type: 'generation',
            title: 'IEP Generated',
            description: 'Created comprehensive IEP for student #12345',
            time: '2 hours ago',
            icon: FileText,
            color: 'from-purple-500 to-pink-500',
            user: 'Dr. Alvin West'
        },
        {
            id: 2,
            type: 'completion',
            title: 'Lesson Plan Completed',
            description: '5th Grade Math - Fractions unit plan finalized',
            time: '5 hours ago',
            icon: Brain,
            color: 'from-blue-500 to-cyan-500',
            user: 'Sarah Chen'
        },
        {
            id: 3,
            type: 'achievement',
            title: 'Achievement Unlocked',
            description: 'Generated 100+ documents this month',
            time: '1 day ago',
            icon: Award,
            color: 'from-emerald-500 to-teal-500',
            user: 'System'
        },
        {
            id: 4,
            type: 'milestone',
            title: 'Time Saved Milestone',
            description: 'Saved 50+ hours with AI assistance',
            time: '2 days ago',
            icon: Clock,
            color: 'from-orange-500 to-red-500',
            user: 'Analytics'
        },
        {
            id: 5,
            type: 'generation',
            title: 'Grant Proposal Generated',
            description: 'STEM funding proposal for $50,000',
            time: '3 days ago',
            icon: Target,
            color: 'from-indigo-500 to-purple-500',
            user: 'Marcus Johnson'
        },
        {
            id: 6,
            type: 'collaboration',
            title: 'Team Collaboration',
            description: 'Shared lesson plan with 5 colleagues',
            time: '4 days ago',
            icon: Users,
            color: 'from-pink-500 to-rose-500',
            user: 'Dr. Alvin West'
        },
    ];

    const stats = [
        { label: 'Total Generations', value: '247', icon: Sparkles, color: 'text-purple-400' },
        { label: 'Hours Saved', value: '52.5', icon: Clock, color: 'text-blue-400' },
        { label: 'Active Days', value: '28', icon: Calendar, color: 'text-emerald-400' },
        { label: 'Achievements', value: '12', icon: Award, color: 'text-orange-400' },
    ];

    const filteredActivities = filter === 'all'
        ? activities
        : activities.filter(a => a.type === filter);

    return (
        <main className="content-stage min-h-screen bg-black relative overflow-hidden">
            {/* EdIntel Background elements */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] scale-150" />
            </div>

            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.02]">
                <div className="w-full h-px bg-white animate-scanline shadow-[0_0_10px_white]" />
            </div>

            {/* Header */}
            <div className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-noble-gold/10 border border-noble-gold/20 text-noble-gold text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                            <Activity size={14} />
                            <span>Strategic Intelligence Feed</span>
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-black text-white mb-4 tracking-tighter uppercase">
                            Your <span className="text-noble-gold italic">Activity</span>
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                            Tracking your professional evolution and operational impact.
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 text-center hover:border-noble-gold/30 transition-all group"
                            >
                                <stat.icon className={`w-8 h-8 text-noble-gold mx-auto mb-3 group-hover:scale-110 transition-transform`} />
                                <div className="text-3xl font-black text-white mb-1 tracking-tight">{stat.value}</div>
                                <div className="text-[10px] uppercase tracking-widest font-bold text-zinc-500">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Activity Feed */}
            <div className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Filters */}
                    <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2 scrollbar-none">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all whitespace-nowrap border ${filter === 'all'
                                ? 'bg-noble-gold text-black border-noble-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                                : 'bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:border-zinc-700'
                                }`}
                        >
                            All Logs
                        </button>
                        <button
                            onClick={() => setFilter('generation')}
                            className={`px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all whitespace-nowrap border ${filter === 'generation'
                                ? 'bg-noble-gold text-black border-noble-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                                : 'bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:border-zinc-700'
                                }`}
                        >
                            Deployments
                        </button>
                        <button
                            onClick={() => setFilter('achievement')}
                            className={`px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all whitespace-nowrap border ${filter === 'achievement'
                                ? 'bg-noble-gold text-black border-noble-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                                : 'bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:border-zinc-700'
                                }`}
                        >
                            Achievements
                        </button>
                        <button
                            onClick={() => setFilter('milestone')}
                            className={`px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all whitespace-nowrap border ${filter === 'milestone'
                                ? 'bg-noble-gold text-black border-noble-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                                : 'bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:border-zinc-700'
                                }`}
                        >
                            Benchmarks
                        </button>
                    </div>

                    {/* Activity List */}
                    <div className="space-y-4">
                        {filteredActivities.map((activity, index) => (
                            <motion.div
                                key={activity.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-2xl bg-zinc-800 border border-noble-gold/20 flex-shrink-0 group-hover:scale-110 transition-transform">
                                        <activity.icon className="w-6 h-6 text-noble-gold" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-noble-gold transition-colors">
                                            {activity.title}
                                        </h3>
                                        <p className="text-zinc-500 text-sm mb-2 leading-relaxed">
                                            {activity.description}
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-zinc-500">
                                            <span className="flex items-center gap-1">
                                                <Clock size={12} />
                                                {activity.time}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Users size={12} />
                                                {activity.user}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="text-center mt-12">
                        <button className="px-8 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 font-bold text-xs uppercase tracking-widest hover:border-noble-gold/30 hover:text-white transition-all">
                            Request Sync History
                        </button>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-zinc-950">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">
                            Ready to <span className="text-noble-gold italic">Scale?</span>
                        </h2>
                        <p className="text-xl text-zinc-500 mb-8 max-w-lg mx-auto leading-relaxed">
                            Unlock the full professional protocol suite with 41+ specialized modules.
                        </p>
                        <Link href="/generators">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-xl bg-noble-gold text-black font-black uppercase tracking-widest shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-noble-gold/50 transition-all inline-flex items-center gap-2"
                            >
                                <Sparkles className="w-5 h-5" />
                                Initiate Deployment
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>

        </main>
    );
}
