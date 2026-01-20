'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Sparkles, BarChart3, Zap, Play, Radio } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import Link from 'next/link';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';
import HolographicBriefing from './HolographicBriefing';

export default function FeatureVideos() {
    const { playHover, playClick } = useProfessionalSounds();
    const [activeBriefing, setActiveBriefing] = useState<any>(null);

    const features = [
        {
            icon: Brain,
            title: 'IEP Architect',
            description: 'The Professional Engine instantly generates legally defensible, data-driven IEP goals. We analyze student data streams to construct compliant learning paths in milliseconds, saving hours of administrative overhead.',
            video: '/videos/features/iep-architect-demo.mp4',
            thumbnail: '/images/features/strategic_iep_architect.png',
            color: 'from-violet-500 to-purple-600',
            link: '/generators/iep-architect',
            stats: { time: '5 min', saved: '2 hours', accuracy: '99%' },
            role: "Compliance Officer",
            avatar: "/images/avatars/executive_leader.png"
        },
        {
            icon: Sparkles,
            title: 'Lesson Planner',
            description: 'Experience quantum curriculum design. Our strategic synthesis identifies standards-aligned protocols and adapts them to your specific classroom demographics instantly.',
            video: '/videos/features/lesson-planner-demo.mp4',
            thumbnail: '/images/features/strategic_educator_planner.png',
            color: 'from-fuchsia-500 to-pink-600',
            link: '/generators/lesson-planner',
            stats: { time: '3 min', saved: '1.5 hours', accuracy: '98%' },
            role: "Curriculum Strategist",
            avatar: "/images/avatars/curriculum_strategist.png"
        },
        {
            icon: BarChart3,
            title: 'Data Intelligence',
            description: 'Transform raw assessment noise into clear executive intelligence. We visualize complex data arrays into actionable leadership grids for immediate decision making.',
            video: '/videos/briefings/data_briefing.mp4',
            thumbnail: '/images/features/collaborative_intelligence_team.png',
            color: 'from-indigo-500 to-blue-600',
            link: '/generators/data-analyzer',
            stats: { time: '2 min', saved: '3 hours', accuracy: '100%' },
            role: "Chief Analyst",
            avatar: "/images/avatars/data_analyst.png"
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
                        <span>Professional Intelligence Protocols</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tight">
                        See the{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">
                            Future
                        </span>
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                        Witness the EdIntel Professional Strategic Engine in active deployment.
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
                            onMouseEnter={playHover}
                        >
                            {/* Card Container */}
                            <div className="relative bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden hover:border-indigo-500/30 transition-all duration-500 flex flex-col h-full hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-2">

                                {/* Video Player Container (Now triggers brief) */}
                                <div className="relative aspect-video bg-zinc-950 border-b border-white/5 group-hover:border-indigo-500/20 transition-colors overflow-hidden">
                                    <img
                                        src={feature.thumbnail}
                                        alt={feature.title}
                                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                                    />

                                    {/* Play Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                                        <button
                                            onClick={() => { playClick(); setActiveBriefing(feature); }}
                                            className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all duration-300 shadow-2xl shadow-black/50"
                                        >
                                            <Radio size={24} className="ml-1 animate-pulse" />
                                        </button>
                                    </div>

                                    <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-xs font-mono text-white border border-white/10">
                                        LIVE BRIEFING
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-8 flex flex-col flex-grow">
                                    {/* Title Header */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg group-hover:shadow-indigo-500/20">
                                            <feature.icon className="w-6 h-6 text-indigo-400 group-hover:text-white transition-colors" />
                                        </div>
                                        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] uppercase tracking-wider text-zinc-500 font-bold group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-colors">
                                            {feature.role}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                                        {feature.title}
                                    </h3>

                                    <p className="text-zinc-400 mb-8 leading-relaxed text-sm flex-grow line-clamp-3">
                                        {feature.description}
                                    </p>

                                    {/* Action */}
                                    <div className="flex gap-4 mt-auto">
                                        <button
                                            onClick={() => { playClick(); setActiveBriefing(feature); }}
                                            className="flex-1 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                                        >
                                            <Play size={14} className="fill-current" />
                                            Watch Briefing
                                        </button>
                                        <Link href={feature.link} className="flex-1">
                                            <button className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-lg shadow-indigo-500/20">
                                                <span>Deploy</span>
                                                <Zap size={14} />
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Holographic Briefing Modal */}
            <HolographicBriefing
                isOpen={!!activeBriefing}
                onClose={() => setActiveBriefing(null)}
                title={activeBriefing?.title || ""}
                description={activeBriefing?.description || ""}
                stats={activeBriefing?.stats}
                videoSrc={activeBriefing?.video} // Falls back to image if video fails/missing
                thumbnail={activeBriefing?.thumbnail}
                role={activeBriefing?.role}
                avatarImage={activeBriefing?.avatar}
                theme="professional"
            />
        </section>
    );
}
