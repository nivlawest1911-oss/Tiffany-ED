'use client';

import { motion } from 'framer-motion';
import { Brain, Sparkles, BarChart3, Zap } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import Link from 'next/link';

export default function FeatureVideos() {
    const features = [
        {
            icon: Brain,
            title: 'IEP Architect',
            description: 'Watch how our AI generates legally defensible, data-driven IEP goals in minutes',
            video: '/videos/features/iep-architect-demo.mp4',
            thumbnail: '/images/avatars/iep_architect.png',
            color: 'from-violet-500 to-purple-600',
            link: '/generators/iep-architect',
            stats: { time: '5 min', saved: '2 hours', accuracy: '99%' }
        },
        {
            icon: Sparkles,
            title: 'Lesson Planner',
            description: 'See differentiated, standards-aligned lesson plans created automatically',
            video: '/videos/features/lesson-planner-demo.mp4',
            thumbnail: '/images/avatars/curriculum_strategist.png',
            color: 'from-fuchsia-500 to-pink-600',
            link: '/generators/lesson-planner',
            stats: { time: '3 min', saved: '1.5 hours', accuracy: '98%' }
        },
        {
            icon: BarChart3,
            title: 'Data Analysis',
            description: 'Transform raw assessment data into actionable insights and visualizations',
            video: '/videos/features/data-analysis-demo.mp4',
            thumbnail: '/images/avatars/data_analyst.png',
            color: 'from-indigo-500 to-blue-600',
            link: '/generators/data-analyzer',
            stats: { time: '2 min', saved: '3 hours', accuracy: '100%' }
        }
    ];

    return (
        <section className="relative py-24 bg-gradient-to-br from-zinc-950 to-purple-950/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Zap size={14} />
                        <span>Feature Demonstrations</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
                        See Our AI{' '}
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            In Action
                        </span>
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                        Watch real demonstrations of our most powerful AI tools transforming educational workflows
                    </p>
                </motion.div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-indigo-500/50 transition-all group"
                        >
                            {/* Video */}
                            <VideoPlayer
                                src={feature.video}
                                poster={feature.thumbnail}
                                title={feature.title}
                            />

                            {/* Content */}
                            <div className="p-6">
                                {/* Icon & Title */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}>
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                                        {feature.title}
                                    </h3>
                                </div>

                                {/* Description */}
                                <p className="text-zinc-400 mb-6 leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-white/10">
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-indigo-400">{feature.stats.time}</div>
                                        <div className="text-xs text-zinc-500 uppercase">To Create</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-purple-400">{feature.stats.saved}</div>
                                        <div className="text-xs text-zinc-500 uppercase">Time Saved</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-black text-pink-400">{feature.stats.accuracy}</div>
                                        <div className="text-xs text-zinc-500 uppercase">Accuracy</div>
                                    </div>
                                </div>

                                {/* CTA */}
                                <Link href={feature.link}>
                                    <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all group-hover:border-indigo-500/50">
                                        Try {feature.title}
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Note */}
                <div className="mt-12 text-center">
                    <div className="inline-block bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-6 py-3">
                        <p className="text-yellow-400 text-sm">
                            📹 <strong>Note:</strong> Feature demo videos will be added once available.
                            Component is ready for integration!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
