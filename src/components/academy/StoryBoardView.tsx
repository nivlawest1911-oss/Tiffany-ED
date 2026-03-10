"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    Image as ImageIcon,
    Play,
    Layers,
    Zap,
    MessageSquare,
    ChevronRight
} from 'lucide-react';
import { GlassCard } from '@/components/ui/Cinematic';
import { StoryboardScene } from '@/lib/MediaSynthesisEngine';

interface StoryBoardViewProps {
    scenes: StoryboardScene[];
    moduleTitle: string;
}

export const StoryBoardView: React.FC<StoryBoardViewProps> = ({ scenes, moduleTitle }) => {
    return (
        <div className="space-y-8 py-8">
            <header className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/30">
                        <Layers className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tight italic">
                            Cinematic <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">Storyboard</span>
                        </h2>
                        <p className="text-[10px] text-zinc-500 uppercase font-black tracking-[0.2em]">Visual Curriculum Synthesis: {moduleTitle}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-full">
                    <Zap size={10} className="text-cyan-400 animate-pulse" />
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Synthesis Active</span>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {scenes.map((scene, index) => (
                    <motion.div
                        key={scene.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <GlassCard className="h-full group overflow-hidden flex flex-col">
                            <div className="relative aspect-video bg-zinc-950 flex items-center justify-center border-b border-white/5 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <ImageIcon className="w-8 h-8 text-zinc-800 group-hover:text-cyan-500/50 transition-colors duration-500" />

                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                                    <div className="px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[8px] font-black text-white uppercase tracking-widest">
                                        Scene {index + 1}
                                    </div>
                                    <div className="p-2 rounded-full bg-cyan-500 text-black">
                                        <Play size={10} fill="currentColor" />
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xs font-black text-white uppercase tracking-[0.2em] mb-3 group-hover:text-cyan-400 transition-colors">
                                    {scene.description}
                                </h3>
                                <p className="text-[11px] text-zinc-400 leading-relaxed font-medium mb-4 flex-1 italic">
                                    "{scene.narrative}"
                                </p>

                                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-[8px] font-bold text-zinc-600 uppercase tracking-widest">
                                        <MessageSquare size={10} />
                                        Prompt Meta
                                    </div>
                                    <button className="text-[8px] font-black text-cyan-400 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-1 group/btn">
                                        Inspect <ChevronRight size={10} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};
