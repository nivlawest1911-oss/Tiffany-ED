'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, Languages, PenTool, ArrowRight, Brain, Lightbulb, GraduationCap } from 'lucide-react';

export default function LiteracyCoachAI() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 overflow-hidden hover:border-violet-500/30 transition-all duration-500 h-[400px] flex flex-col justify-between"
        >
            {/* Background Glow */}
            <div className={`absolute -top-24 -right-24 w-64 h-64 bg-violet-500/10 blur-[80px] rounded-full transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="p-4 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
                        <BookOpen size={24} />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[8px] font-black uppercase tracking-widest">
                        <Sparkles size={10} />
                        <span>Science of Reading</span>
                    </div>
                </div>

                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 group-hover:text-violet-400 transition-colors">
                    Literacy Coach <br /> <span className="text-zinc-600 group-hover:text-violet-500 transition-colors">Neural Node</span>
                </h3>

                <p className="text-sm text-zinc-500 leading-relaxed font-medium mb-6">
                    Advanced phonics and comprehension synthesis engine. Transform raw reading scores into culturally responsive literacy protocols for every student tier.
                </p>

                <div className="space-y-3">
                    {[
                        { icon: Languages, text: "Phonological Processing Map" },
                        { icon: PenTool, text: "Narrative Synthesis Engine" },
                        { icon: GraduationCap, text: "Tier 2/3 Intervention Matrix" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                            <item.icon size={12} className="text-violet-500/50" />
                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/5">
                <button className="w-full h-12 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-105 transition-all">
                    <span>Analyze Literacy Data</span>
                    <ArrowRight size={14} />
                </button>
            </div>

            {/* Neural Pattern Ornament */}
            <div className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                <Brain size={120} className="text-violet-500/10 -rotate-12" />
            </div>
        </motion.div>
    );
}
