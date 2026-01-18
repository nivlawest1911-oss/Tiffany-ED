'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Activity, Clock, TrendingUp, Users, FileText, Brain,
    Sparkles, Award, Target, Zap, Calendar, Filter
} from 'lucide-react';
import Link from 'next/link';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';

export default function ActivityPage() {
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
        <div className="min-h-screen bg-black text-white">
            <FloatingNavbar />

            {/* Header */}
            <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-zinc-950 to-black">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
                            <Activity size={14} />
                            <span>Activity Feed</span>
                        </div>
                        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4">
                            Your Activity
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                            Track your AI-powered productivity and achievements
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
                                className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:border-white/20 transition-all"
                            >
                                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-sm text-zinc-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Activity Feed */}
            <div className="py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    {/* Filters */}
                    <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${filter === 'all'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                                }`}
                        >
                            All Activity
                        </button>
                        <button
                            onClick={() => setFilter('generation')}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${filter === 'generation'
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                                }`}
                        >
                            Generations
                        </button>
                        <button
                            onClick={() => setFilter('achievement')}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${filter === 'achievement'
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                                }`}
                        >
                            Achievements
                        </button>
                        <button
                            onClick={() => setFilter('milestone')}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${filter === 'milestone'
                                    ? 'bg-orange-600 text-white'
                                    : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                                }`}
                        >
                            Milestones
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
                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${activity.color} flex-shrink-0`}>
                                        <activity.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                                            {activity.title}
                                        </h3>
                                        <p className="text-zinc-400 text-sm mb-2">
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
                        <button className="px-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all">
                            Load More Activity
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
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Ready to Create More?
                        </h2>
                        <p className="text-xl text-zinc-400 mb-8">
                            Access all 70+ AI-powered tools to boost your productivity
                        </p>
                        <Link href="/generators">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70 transition-all inline-flex items-center gap-2"
                            >
                                <Sparkles className="w-5 h-5" />
                                Explore AI Tools
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
