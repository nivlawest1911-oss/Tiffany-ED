'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Copy, FileDown, Loader2, CheckCircle2, FileText } from 'lucide-react';
import { generateGrantDraft } from '@/app/actions/vertex';

export default function GrantWriterClient() {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [draft, setDraft] = useState<string | null>(null);

    const handleGenerate = async () => {
        if (!prompt.trim()) return;
        setIsGenerating(true);
        try {
            const result = await generateGrantDraft(prompt);
            if (result.success) {
                setDraft(result.draft ?? null);
            } else {
                alert('Generation failed: ' + (result.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Generation call failed:', error);
            alert('A network error occurred. Please verify your connection to EdIntel HQ.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = () => {
        if (!draft) return;
        navigator.clipboard.writeText(draft);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-20">
            {/* Input Section */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-3xl space-y-8 relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-intel-gold/5 blur-3xl group-hover:bg-intel-gold/10 transition-colors" />

                <div className="flex items-center gap-4 text-intel-gold relative z-10">
                    <div className="p-3 bg-intel-gold/10 rounded-2xl border border-intel-gold/20">
                        <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="font-black text-2xl uppercase tracking-tighter italic">Proposal Parameters</h3>
                        <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mt-1">Intelligence Layer 2</p>
                    </div>
                </div>

                <div className="space-y-4 relative z-10">
                    <label className="text-[10px] font-black text-zinc-500 block uppercase tracking-[0.3em] ml-2">
                        Define Objective
                    </label>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., Secure funding for 50 new AR-enabled workstations for the STEM lab at Mobile High..."
                        className="w-full h-64 bg-black/40 border border-white/5 rounded-[2rem] p-8 text-white placeholder:text-zinc-700 outline-none focus:border-intel-gold/40 transition-all resize-none text-sm leading-relaxed font-medium"
                    />
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="w-full py-6 rounded-2xl bg-intel-gold text-black font-black uppercase tracking-[0.4em] text-xs flex items-center justify-center gap-4 hover:bg-white transition-all shadow-2xl shadow-intel-gold/20 disabled:opacity-30 group relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <div className="relative z-10 flex items-center gap-4">
                        {isGenerating ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                <span>Execute Protocol</span>
                            </>
                        )}
                    </div>
                </button>
            </motion.div>

            {/* Output Section */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-3xl flex flex-col min-h-[600px] relative overflow-hidden"
            >
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-intel-gold/5 blur-[100px] -z-10" />

                <AnimatePresence mode="wait">
                    {!draft ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex-1 flex flex-col items-center justify-center text-center space-y-6"
                        >
                            <div className="w-24 h-24 rounded-[2.5rem] bg-white/[0.03] border border-dashed border-white/10 flex items-center justify-center group">
                                <FileText strokeWidth={1} className="w-10 h-10 text-zinc-800 group-hover:text-intel-gold transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <p className="font-black text-white uppercase tracking-[0.3em] italic">Output Stream Primed</p>
                                <p className="text-[10px] text-zinc-600 font-black uppercase tracking-widest leading-relaxed">Awaiting intelligence packet from neural engine...</p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex-1 flex flex-col h-full"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-intel-gold/10 border border-intel-gold/20 flex items-center justify-center">
                                        <CheckCircle2 className="w-5 h-5 text-intel-gold" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-intel-gold uppercase tracking-tighter italic">Intelligence Output</h3>
                                        <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest mt-1">Verification: Success</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleCopy}
                                        className="p-4 bg-white/5 border border-white/10 rounded-2xl text-zinc-400 hover:text-white hover:border-intel-gold/40 hove:bg-white/10 transition-all"
                                        title="Copy text"
                                    >
                                        <Copy className="w-5 h-5" />
                                    </button>
                                    <button
                                        className="p-4 bg-white/5 border border-white/10 rounded-2xl text-zinc-400 hover:text-white hover:border-intel-gold/40 hove:bg-white/10 transition-all"
                                        title="Download PDF"
                                    >
                                        <FileDown className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 bg-black/40 border border-white/5 rounded-[2rem] p-10 overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed text-zinc-300 font-medium custom-scrollbar italic shadow-inner">
                                {draft}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
