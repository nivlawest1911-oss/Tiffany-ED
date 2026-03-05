'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, Headphones, Sparkles } from 'lucide-react';
import PodcastPlayer from './PodcastPlayer';
import InteractivePodcastPlayer from './InteractivePodcastPlayer';
import PodcastList from './PodcastList';
import { mockPodcasts, PodcastEpisode } from '@/lib/data/podcasts';

export default function PodcastHub() {
    // Default to the first episode
    const [currentEpisode, setCurrentEpisode] = useState<PodcastEpisode>(mockPodcasts[0]);

    return (
        <div className="w-full min-h-screen bg-black text-white relative overflow-hidden pb-24">

            {/* Cinematic Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-1/4 w-[40rem] h-[40rem] bg-noble-gold/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute top-1/2 left-0 w-[50rem] h-[50rem] bg-cyan-900/10 blur-[150px] rounded-full pointer-events-none -translate-x-1/2" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay pointer-events-none" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-12 lg:pt-20">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-12"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-noble-gold/10 border border-noble-gold/30 text-noble-gold text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-[0_0_20px_rgba(212,175,55,0.15)] animate-pulse-slow">
                        <Radio size={14} />
                        EdIntel Sovereign Broadcast
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">
                        Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-noble-gold to-yellow-500">Insights</span>
                    </h1>

                    <p className="text-white/40 text-sm md:text-base max-w-2xl uppercase tracking-widest font-medium flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-noble-gold" />
                        Curated audio intelligence for elite educators and administrators.
                    </p>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* Left Column: Player & Featured Content */}
                    <div className="lg:col-span-7 space-y-8">

                        {/* Player Container */}
                        <motion.div
                            key={currentEpisode.id} // Re-animate on change
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="bg-white/[0.02] border border-white/5 p-2 rounded-[2.5rem]"
                        >
                            {currentEpisode.isInteractive ? (
                                <InteractivePodcastPlayer episode={currentEpisode} />
                            ) : (
                                <PodcastPlayer episode={currentEpisode} />
                            )}
                        </motion.div>

                        {/* Additional Info / Transcript Placeholder */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="p-8 rounded-3xl bg-black/40 border border-white/10"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Headphones className="text-noble-gold" size={20} />
                                <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Episode Directive</h3>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed font-serif italic mb-6">
                                "{currentEpisode.description}"
                            </p>
                            <div className="flex gap-4 border-t border-white/5 pt-4">
                                <button className="px-5 py-2 rounded-xl bg-white/5 text-xs font-bold text-white hover:bg-white/10 transition-colors uppercase tracking-widest">
                                    View Show Notes
                                </button>
                                <button className="px-5 py-2 rounded-xl border border-white/10 text-xs font-bold text-zinc-400 hover:text-white transition-colors uppercase tracking-widest">
                                    Transcript
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Episode List */}
                    <div className="lg:col-span-5">
                        <div className="flex items-center justify-between mb-6 px-2">
                            <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Available Episodes</h3>
                            <span className="text-[10px] font-mono text-cyan-400 uppercase">{mockPodcasts.length} Briefings</span>
                        </div>

                        <PodcastList
                            episodes={mockPodcasts}
                            onSelectEpisode={setCurrentEpisode}
                            currentEpisodeId={currentEpisode.id}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}
