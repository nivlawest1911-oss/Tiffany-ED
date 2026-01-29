'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Clapperboard, Film, Image as ImageIcon, Zap, Upload, Play, Wand2 } from 'lucide-react';
import { HeyGenStreamingAvatar } from '@/components/heygen/StreamingAvatar';
import { HeyGenVideoGenerator } from '@/components/heygen/VideoGenerator';

export default function VideoStudioClient() {
    const [activeTab, setActiveTab] = useState('sora');
    const [isGenerating, setIsGenerating] = useState(false);
    const [prompt, setPrompt] = useState('');

    const engines = [
        { id: 'sora', name: 'Sora 2.0', icon: Sparkles, desc: 'Cinematic Physics Engine', color: 'from-sky-400 to-blue-600' },
        { id: 'kling', name: 'Kling 2.6', icon: Clapperboard, desc: 'Photorealistic Actors', color: 'from-emerald-400 to-green-600' },
        { id: 'runway', name: 'Runway Gen-4.5', icon: Wand2, desc: 'Multi-Motion Brushes', color: 'from-purple-400 to-pink-600' },
        { id: 'heygen', name: 'Holographic Avatar', icon: Zap, desc: 'Live Neural Interface', color: 'from-amber-400 to-orange-600' },
    ];

    const generateVideo = () => {
        setIsGenerating(true);
        setTimeout(() => setIsGenerating(false), 3000); // Simulation
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 relative overflow-hidden font-sans selection:bg-purple-500/30">
            {/* Background Ambience */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.15)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-white/10 pb-8"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] uppercase font-black tracking-[0.3em] text-sky-400">
                                Sovereign Media Suite
                            </span>
                        </div>
                        <h1 className="text-6xl md:text-7xl font-black uppercase italic tracking-tighter bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                            Virtual <span className="text-sky-500">Film Studio</span>
                        </h1>
                    </div>
                </motion.div>

                {/* Engine Selector */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-transparent mb-12 h-auto p-0">
                        {engines.map((engine) => (
                            <TabsTrigger
                                key={engine.id}
                                value={engine.id}
                                className="relative h-32 rounded-[2rem] border border-white/5 bg-white/5 hover:bg-white/10 data-[state=active]:bg-white/10 data-[state=active]:border-white/20 transition-all group overflow-hidden flex flex-col items-center justify-center gap-3"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${engine.color} opacity-0 group-data-[state=active]:opacity-10 transition-opacity`} />
                                <engine.icon className={`w-8 h-8 text-zinc-400 group-data-[state=active]:text-white transition-colors`} />
                                <div className="text-center">
                                    <div className="text-lg font-black uppercase tracking-tight text-zinc-300 group-data-[state=active]:text-white mb-1">{engine.name}</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-data-[state=active]:text-zinc-400">{engine.desc}</div>
                                </div>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Control Deck */}
                        <div className="lg:col-span-1 space-y-6">
                            <motion.div
                                layoutId="control-panel"
                                className="p-8 rounded-[2.5rem] bg-zinc-900/50 border border-white/10 backdrop-blur-2xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-purple-500" />

                                <div className="mb-8">
                                    <h3 className="text-xl font-black uppercase tracking-tight mb-2">Director's Prompt</h3>
                                    <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Natural Language to Cinema</p>
                                </div>

                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Describe your scene: 'Cinematic drone shot of a futuristic classroom in 2050, warm lighting, 8k resolution...'"
                                    className="w-full h-40 bg-black/40 border border-white/10 rounded-2xl p-4 text-sm font-medium text-white placeholder:text-zinc-700 resize-none focus:outline-none focus:border-sky-500/50 transition-colors mb-6"
                                />

                                <div className="grid grid-cols-2 gap-3 mb-8">
                                    <button className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex flex-col items-center gap-2 group">
                                        <Upload className="w-5 h-5 text-zinc-500 group-hover:text-white" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white">Image Ref</span>
                                    </button>
                                    <button className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex flex-col items-center gap-2 group">
                                        <Film className="w-5 h-5 text-zinc-500 group-hover:text-white" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white">Motion Brush</span>
                                    </button>
                                </div>

                                <button
                                    onClick={generateVideo}
                                    disabled={isGenerating}
                                    className="w-full py-5 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 text-white font-black uppercase tracking-[0.2em] shadow-lg shadow-sky-900/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                                >
                                    {isGenerating ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Sparkles className="animate-spin w-4 h-4" /> Rendering...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            Generate Sequence <Zap className="w-4 h-4 fill-white" />
                                        </span>
                                    )}
                                </button>
                            </motion.div>

                            <div className="p-6 rounded-[2rem] bg-transparent border border-white/5">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-4">Neural Settings</h4>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-xs font-bold text-zinc-400">
                                        <span>Physics Accuracy</span>
                                        <span className="text-sky-500">0.95</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full w-[95%] bg-sky-500" />
                                    </div>
                                    <div className="flex justify-between items-center text-xs font-bold text-zinc-400">
                                        <span>Motion Smoothness</span>
                                        <span className="text-purple-500">24fps</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Viewport */}
                        <div className="lg:col-span-2">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="h-full min-h-[600px] rounded-[3rem] bg-black border border-white/10 relative overflow-hidden shadow-2xl"
                                >
                                    {activeTab === 'heygen' ? (
                                        <div className="h-full p-8 flex flex-col">
                                            <div className="flex-1 rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/50 relative">
                                                <HeyGenStreamingAvatar />
                                                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Live Feed
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {isGenerating ? (
                                                <div className="text-center">
                                                    <div className="w-24 h-24 rounded-full border-4 border-white/10 border-t-sky-500 animate-spin mx-auto mb-8" />
                                                    <div className="text-2xl font-black uppercase tracking-tight text-white mb-2">Neural Rendering</div>
                                                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">Processing {activeTab} Vector Fields...</div>
                                                </div>
                                            ) : (
                                                <div className="text-center opacity-30">
                                                    <Film className="w-32 h-32 mx-auto mb-6 text-white" />
                                                    <div className="text-4xl font-black uppercase tracking-tight text-white mb-2">Viewport Ready</div>
                                                    <div className="text-xs font-bold uppercase tracking-widest text-zinc-500">Awaiting Generation Protocol</div>
                                                </div>
                                            )}

                                            {/* UI Overlays */}
                                            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                                                <div className="px-4 py-2 rounded-xl bg-black/50 backdrop-blur border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/50">
                                                    1920x1080 // 60fps
                                                </div>
                                                <div className="flex gap-2">
                                                    <button className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                                                        <Play className="w-5 h-5 fill-black" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </Tabs>
            </div>
        </div>
    );
}
