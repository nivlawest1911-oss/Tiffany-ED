'use client';

import { motion } from 'framer-motion';
import { PodcastEpisode } from '@/lib/data/podcasts';
import Image from 'next/image';
import { PlayCircle, Clock } from 'lucide-react';

interface PodcastListProps {
    episodes: PodcastEpisode[];
    onSelectEpisode: (episode: PodcastEpisode) => void;
    currentEpisodeId?: string;
}

export default function PodcastList({ episodes, onSelectEpisode, currentEpisodeId }: PodcastListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            {episodes.map((ep, index) => {
                const isActive = currentEpisodeId === ep.id;
                return (
                    <motion.div
                        key={ep.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className={`group relative p-4 rounded-3xl border transition-all cursor-pointer overflow-hidden
                            ${isActive
                                ? 'bg-noble-gold/10 border-noble-gold/40 shadow-[0_0_30px_rgba(212,175,55,0.1)]'
                                : 'bg-black/40 border-white/5 hover:bg-white/[0.05] hover:border-white/10'
                            }`}
                        onClick={() => onSelectEpisode(ep)}
                    >
                        {/* Interactive Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-noble-gold/0 via-noble-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="flex gap-4 relative z-10">
                            {/* Cover Art Thumbnail */}
                            <div className="w-20 h-20 rounded-2xl overflow-hidden relative shrink-0 border border-white/10 bg-white/5 flex items-center justify-center">
                                <Image
                                    src={ep.imageUrl}
                                    alt={ep.title}
                                    width={40}
                                    height={40}
                                    className="object-contain filter drop-shadow-md opacity-80"
                                />
                                {/* Play Overlay */}
                                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300
                                    ${isActive ? 'bg-black/40 opacity-100' : 'bg-black/60 opacity-0 group-hover:opacity-100'}`}>
                                    <PlayCircle className={`w-8 h-8 ${isActive ? 'text-cyan-400' : 'text-noble-gold'} drop-shadow-lg`} />
                                </div>
                            </div>

                            {/* Details */}
                            <div className="flex-1 flex flex-col justify-center">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[9px] font-black text-noble-gold uppercase tracking-[0.2em]">{ep.category}</span>
                                    <span className="text-[9px] font-mono text-zinc-500 flex items-center gap-1">
                                        <Clock size={10} /> {ep.duration}
                                    </span>
                                </div>
                                <h4 className={`text-sm md:text-base font-black uppercase tracking-wide leading-tight mb-1 transition-colors ${isActive ? 'text-white' : 'text-white/80 group-hover:text-white'}`}>
                                    {ep.title}
                                </h4>
                                <p className="text-xs text-zinc-400 line-clamp-2">{ep.description}</p>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}
