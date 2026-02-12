'use client';

import React from 'react';
import { ImageIcon, Wand2, Layers, Target } from 'lucide-react';
import { useIntelligence } from '@/context/IntelligenceContext';

export default function AssetLabClient() {
    const { triggerBriefing } = useIntelligence();
    return (
        <div className="min-h-screen bg-black/90 p-8 pt-24 text-white">
            <header className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-widest mb-4">
                    <ImageIcon size={12} />
                    <span>Visual Asset Protocol</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <h1 className="text-5xl font-black uppercase italic tracking-tighter">
                            Asset <span className="text-pink-500">Lab</span>
                        </h1>
                        <p className="text-zinc-500 font-medium max-w-xl">
                            Strategic generation of high-fidelity visual assets, brand identity nodes, and neural design protocols.
                        </p>
                    </div>
                    <button
                        onClick={() => triggerBriefing('Legacy Profile')}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-all group shrink-0"
                    >
                        <Target size={14} className="group-hover:rotate-45 transition-transform" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Founder Hub</span>
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Generator */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-1 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
                        <div className="bg-black/40 rounded-xl p-8 min-h-[400px] flex flex-col items-center justify-center border border-white/5 border-dashed">
                            <Wand2 size={48} className="text-pink-500 mb-6 opacity-80" />
                            <h3 className="text-xl font-bold mb-2">AI Image Generation</h3>
                            <p className="text-slate-400 text-sm max-w-sm text-center mb-8">
                                Describe the visual asset you need. The EdIntel engine will render high-resolution variations.
                            </p>
                            <div className="w-full max-w-lg bg-black/60 border border-white/10 rounded-xl p-2 flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Describe your request (e.g., 'Futuristic classroom with holograms')..."
                                    className="flex-1 bg-transparent border-none outline-none text-sm px-4 text-white placeholder:text-slate-600"
                                />
                                <button className="px-6 py-2 bg-pink-600 hover:bg-pink-500 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
                                    <Wand2 size={12} /> Generate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Asset Library / History */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-fit">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <Layers size={16} className="text-pink-400" />
                        Recent Assets
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-square bg-black/40 rounded-lg border border-white/5 hover:border-pink-500/50 transition-colors cursor-pointer relative group overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0" />
                                <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform">
                                    <p className="text-[10px] font-mono text-white truncate">Asset_ID_{1000 + i}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-6 py-3 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors text-slate-400 hover:text-white">
                        View Full Library
                    </button>
                </div>
            </div>
        </div>
    );
}
