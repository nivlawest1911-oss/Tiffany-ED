'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wand2, BookOpen, Clock, Download } from 'lucide-react';

export function NarrativeArchitect() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setGeneratedPlan("INDIVIDUALIZED EDUCATION PROGRAM (IEP)\n\nSTUDENT: Jordan Miller\nGRADE: 5th\n\nGOAL 1: Reading Comprehension\nBy the end of the IEP period, Jordan will improve reading comprehension from a 3.2 to 4.5 grade level as measured by DIBELS.\n\nSTRATEGY (Monsha Model):\n- Utilize 'Chunking' method for multi-paragraph texts.\n- Implement 'Reciprocal Teaching' roles during guided reading.");
            setIsGenerating(false);
        }, 2000);
    };

    return (
        <div className="h-full flex flex-col gap-6 p-6 relative">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-black text-purple-400 italic uppercase tracking-tighter flex items-center gap-3">
                        <Wand2 size={24} /> Narrative Architect
                    </h2>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">IEP & Lesson Plan Synthesis</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
                {/* Input Matrix */}
                <div className="space-y-6">
                    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                        <label className="text-[10px] font-black text-noble-gold uppercase tracking-widest block mb-4">Input Parameters</label>
                        <div className="space-y-4">
                            <input type="text" placeholder="Student Name / ID" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-purple-500 outline-none" />
                            <select aria-label="Select Goal Type" className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-400 outline-none">
                                <option>Select Goal Type...</option>
                                <option>Reading Comprehension (Science of Reading)</option>
                                <option>Behavioral Regulation</option>
                                <option>Math Fluency</option>
                            </select>
                            <textarea placeholder="Paste baseline data or observation notes..." className="w-full h-32 bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-purple-500 outline-none resize-none" />
                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-black text-white uppercase tracking-[0.2em] hover:scale-[1.02] transition-transform disabled:opacity-50 flex items-center justify-center gap-3 shadow-lg shadow-purple-900/20"
                    >
                        {isGenerating ? <Clock className="animate-spin" /> : <Wand2 />}
                        {isGenerating ? "Synthesizing..." : "Generate Perfect Draft"}
                    </button>

                    <p className="text-[9px] text-center text-zinc-600 uppercase tracking-widest">Powered by Monsha Deep-Dive & Brisk Speed Engine</p>
                </div>

                {/* Output Preview */}
                <div className="bg-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/5">
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Live Draft Preview</span>
                        {generatedPlan && <Download size={16} className="text-emerald-500 cursor-pointer hover:text-emerald-400" />}
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar font-mono text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">
                        {generatedPlan ? (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                {generatedPlan}
                            </motion.div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center opacity-20">
                                <BookOpen size={40} className="mb-4" />
                                <span className="text-[10px] uppercase tracking-widest">Waiting for Input...</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
