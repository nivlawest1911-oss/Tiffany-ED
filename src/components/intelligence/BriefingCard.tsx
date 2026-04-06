'use client';

import { motion } from 'framer-motion';
import { Play, FileText, Lock, Shield, Share2, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Episode } from '@/lib/briefing-data';

interface BriefingCardProps {
    episode: Episode;
    isUnlocked?: boolean;
}

export default function BriefingCard({ episode, isUnlocked = false }: BriefingCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group relative liquid-glass border-white/10 overflow-hidden flex flex-col h-full bg-zinc-950/40 backdrop-blur-3xl"
        >
            {/* Design Elements */}
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-all pointer-events-none">
                <Shield size={64} className="text-noble-gold" />
            </div>
            
            <div className="p-8 flex-1">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-noble-gold uppercase tracking-[0.4em] px-3 py-1 border border-noble-gold/20 rounded-full bg-noble-gold/5">
                            Intelligence Briefing #{episode.number}
                        </span>
                        {episode.isPremium && !isUnlocked && (
                            <span className="flex items-center gap-1 text-[8px] font-black text-white/50 uppercase tracking-[0.2em] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                                <Lock size={8} /> Restricted
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-white/30 uppercase tracking-tighter">
                        <MapPin size={10} className="text-noble-gold" />
                        Mobile County, AL
                    </div>
                </div>

                <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none mb-4 group-hover:text-noble-gold transition-colors">
                    {episode.title}
                </h3>
                
                <p className="text-sm text-white/60 leading-relaxed font-mono line-clamp-3 mb-6">
                    <span className="text-noble-gold mr-2">{">>>"}</span>
                    {episode.summary}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                    {episode.tags.map((tag, idx) => (
                        <span key={idx} className="text-[8px] font-black text-white/40 uppercase tracking-widest px-2 py-1 bg-white/5 border border-white/5 rounded">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Actions Area */}
            <div className="p-8 pt-0 border-t border-white/5 bg-black/40 flex flex-col gap-4">
                <div className="flex items-center justify-between py-4">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em]">Duration</span>
                        <span className="text-xs font-mono text-white/70">{episode.duration} m</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em]">Published</span>
                        <span className="text-xs font-mono text-white/70">{new Date(episode.date).toLocaleDateString()}</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Link 
                        href={`/briefings/${episode.slug}`}
                        className="flex-1 EdIntel-button bg-white text-black py-4 group/btn"
                    >
                        <Play size={14} fill="currentColor" className="mr-2" />
                        Play Briefing
                    </Link>
                    
                    <button 
                        className="px-6 py-4 liquid-glass border-white/10 text-white/40 hover:text-white transition-all"
                        title="Share Briefing"
                    >
                        <Share2 size={16} />
                    </button>
                </div>
                
                {episode.isPremium && (
                    <Link 
                        href={`/briefings/${episode.slug}/data`}
                        className="flex items-center justify-center gap-2 text-[10px] font-black text-noble-gold uppercase tracking-[0.3em] hover:text-white transition-colors py-2"
                    >
                        <FileText size={12} />
                        {isUnlocked ? "Access Deep Dive Report" : "Unlock Full Strategic Data"}
                    </Link>
                )}
            </div>

            {/* Neural Scanning Line */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-noble-gold/5 to-transparent h-px w-full pointer-events-none"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />
        </motion.div>
    );
}
