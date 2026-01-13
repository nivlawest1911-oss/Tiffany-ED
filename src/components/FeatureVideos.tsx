'use client';

import { motion } from 'framer-motion';
import { Brain, Sparkles, BarChart3, Zap, Play } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import Link from 'next/link';

export default function FeatureVideos() {
    const features = [
        {
            icon: Brain,
            title: 'IEP Architect',
            description: 'Watch the Sovereign Engine generate legally defensible, data-driven IEP goals in milliseconds.',
            video: '/videos/features/iep-architect-demo.mp4',
            thumbnail: '/images/features/sovereign_iep_architect.png',
            color: 'from-violet-500 to-purple-600',
            link: '/generators/iep-architect',
            stats: { time: '5 min', saved: '2 hours', accuracy: '99%' }
        },
        {
            icon: Sparkles,
            title: 'Lesson Planner',
            description: 'Experience identifying standards-aligned curriculum protocols created via neural synthesis.',
            video: '/videos/features/lesson-planner-demo.mp4',
            thumbnail: '/images/features/sovereign_educator_planner.png',
            color: 'from-fuchsia-500 to-pink-600',
            link: '/generators/lesson-planner',
            stats: { time: '3 min', saved: '1.5 hours', accuracy: '98%' }
        },
        {
            icon: BarChart3,
            title: 'Data Intelligence',
            description: 'Transform raw assessment signals into actionable executive intelligence grids.',
            video: '/videos/features/data-analysis-demo.mp4',
            thumbnail: '/images/features/collaborative_intelligence_team.png',
            color: 'from-indigo-500 to-blue-600',
            link: '/generators/data-analyzer',
            stats: { time: '2 min', saved: '3 hours', accuracy: '100%' }
        }
    ];

    return (
        <section className="relative py-32 bg-zinc-950 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-[0.2em] mb-8 hover:bg-indigo-500/20 transition-colors cursor-default">
                        <Zap size={14} />
                        <span>Sovereign Intelligence Protocols</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">
                        See the{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
                            Future
                        </span>
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                        Witness the EdIntel Sovereign Neural Engine in active deployment.
                    </p>
                </motion.div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
                            className="group relative"
                        >
                            {/* Card Container */}
                            <div className="relative bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden hover:border-indigo-500/30 transition-all duration-500 flex flex-col h-full hover:shadow-2xl hover:shadow-indigo-500/10">

                                {/* Video Player Container */}
                                <div className="relative aspect-video bg-zinc-950 border-b border-white/5 group-hover:border-indigo-500/20 transition-colors">
                                    <VideoPlayer
                                        src={feature.video}
                                        poster={feature.thumbnail}
                                        title={feature.title}
                                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                    />
                                    {/* Overlay Gradient (when not playing, handled by player but added here for depth) */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60 pointer-events-none" />
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-grow">
                                    {/* Title Header */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg">
                                            <feature.icon className="w-6 h-6 text-indigo-400" />
                                        </div>
                                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] uppercase tracking-wider text-zinc-500 font-bold group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-colors">
                                            Demo
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                                        {feature.title}
                                    </h3>

                                    <p className="text-zinc-400 mb-8 leading-relaxed text-sm flex-grow">
                                        {feature.description}
                                    </p>

                                    {/* Action */}
                                    <Link href={feature.link} className="mt-auto">
                                        <button className="w-full py-4 rounded-xl bg-white/5 hover:bg-indigo-600 border border-white/10 hover:border-indigo-500 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                                            <span>Initialize Protocol</span>
                                            <Play size={16} className="fill-current opacity-60 group-hover/btn:opacity-100 transition-opacity" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
