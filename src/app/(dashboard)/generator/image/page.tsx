"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Image as ImageIcon,
    Sparkles,
    Download,
    Share2,
    Loader2,
    Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { HolographicBackground } from '@/components/holographic/HolographicBackground';
import { generateImageFromPrompt } from '@/lib/gemini-service';
import { useIntelligence } from '@/context/IntelligenceContext';

export default function ImageGeneratorPage() {
    const [prompt, setPrompt] = useState("");
    const [subject, setSubject] = useState("STEM");
    const [gradeLevel] = useState("Middle School");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
    const { addAction } = useIntelligence();

    const handleGenerate = async () => {
        if (!prompt) {
            toast.error("Please enter a prompt first.");
            return;
        }

        setIsGenerating(true);
        setGeneratedImage(null);

        try {
            const result = await generateImageFromPrompt({ prompt, subject, gradeLevel });
            setGeneratedImage(result);
            addAction(`Holographic Visual Synthesized: ${subject}`);
            toast.success("Educational visual generated successfully!");
        } catch (error) {
            console.error("Image Gen Error:", error);
            toast.error("Generation failed. Please check your API configuration.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
            <HolographicBackground />

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
                <header className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3 text-cyan-400 mb-2">
                            <div className="p-2 bg-cyan-950/50 rounded-lg border border-cyan-500/30">
                                <ImageIcon className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.3em]">Advanced Media Engine</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">
                            Holographic <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 italic">Visualizer</span>
                        </h1>
                        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
                            Generate high-fidelity, instructional graphics and diagrams tailored to your curriculum.
                            Our AI understands educational context and regal aesthetics.
                        </p>
                    </motion.div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Controls */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-5 space-y-6"
                    >
                        <Card className="bg-zinc-900/40 backdrop-blur-xl border-white/5 overflow-hidden">
                            <CardHeader className="border-b border-white/5 bg-white/[0.02]">
                                <CardTitle className="text-white text-lg flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-cyan-400" />
                                    Creative Parameters
                                </CardTitle>
                                <CardDescription className="text-zinc-500">
                                    Define the scope and style of your instructional asset.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest pl-1">
                                        Subject Area
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {["STEM", "Humanities", "Arts", "Social"].map(s => (
                                            <button
                                                key={s}
                                                onClick={() => setSubject(s)}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${subject === s
                                                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                                                    : 'bg-zinc-950 border-white/5 text-zinc-500 hover:border-white/10'
                                                    }`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest pl-1">
                                        Prompt Strategy
                                    </label>
                                    <textarea
                                        placeholder="Describe the educational visual, e.g., 'A cross-section of a futuristic solar cell showing electron flow'..."
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                        className="w-full bg-zinc-950 border border-white/5 rounded-2xl p-4 text-white text-sm focus:ring-1 focus:ring-cyan-500 outline-none min-h-[120px] transition-all"
                                    />
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-purple-500/5 rounded-2xl border border-purple-500/10">
                                    <Info className="w-5 h-5 text-purple-400 mt-0.5" />
                                    <p className="text-[11px] text-zinc-500 leading-relaxed">
                                        The AI automatically applies a <span className="text-purple-400 font-bold">Holographic Aesthetic</span> to ensure consistency with the EdIntel Sovereign design system.
                                    </p>
                                </div>

                                <Button
                                    className="w-full h-14 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-black uppercase tracking-widest rounded-2xl shadow-lg transition-all group"
                                    onClick={handleGenerate}
                                    disabled={isGenerating}
                                >
                                    {isGenerating ? (
                                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                    ) : (
                                        <Sparkles className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                    )}
                                    {isGenerating ? 'Synthesizing...' : 'Initialize Generation'}
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Preview Area */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-7"
                    >
                        <div className="relative aspect-video rounded-3xl border border-white/5 bg-zinc-900/40 backdrop-blur-xl overflow-hidden group shadow-2xl">
                            <AnimatePresence mode="wait">
                                {generatedImage ? (
                                    <motion.div
                                        key="image"
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="relative w-full h-full"
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={generatedImage}
                                            alt="Generated visual"
                                            className="w-full h-full object-cover"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-8 flex items-end justify-between">
                                            <div className="space-y-1">
                                                <h3 className="text-white font-bold tracking-tight">Render Complete</h3>
                                                <p className="text-zinc-400 text-xs">Generated for {subject} Curriculum</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button size="icon" variant="secondary" className="bg-white/10 hover:bg-white/20 border-white/10">
                                                    <Download className="w-4 h-4" />
                                                </Button>
                                                <Button size="icon" variant="secondary" className="bg-white/10 hover:bg-white/20 border-white/10">
                                                    <Share2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="placeholder"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="w-full h-full flex flex-col items-center justify-center space-y-4 p-12 text-center"
                                    >
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full" />
                                            <div className="relative p-6 bg-zinc-950 rounded-full border border-white/10">
                                                <ImageIcon className="w-12 h-12 text-zinc-600" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-xl uppercase tracking-widest">Awaiting Signal</h3>
                                            <p className="text-zinc-500 max-w-sm mx-auto mt-2">
                                                Define parameters and initialize the media engine to view the holographic render.
                                            </p>
                                        </div>

                                        {isGenerating && (
                                            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center space-y-6">
                                                <div className="relative w-24 h-24">
                                                    <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full" />
                                                    <div className="absolute inset-0 border-t-2 border-cyan-500 rounded-full animate-spin" />
                                                </div>
                                                <div className="text-center">
                                                    <span className="text-cyan-400 font-black uppercase tracking-[0.3em] animate-pulse">
                                                        Rendering Neural Asset
                                                    </span>
                                                    <p className="text-zinc-500 text-xs mt-2">Connecting to Sovereign Cloud...</p>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Style Chips */}
                        <div className="flex flex-wrap gap-3 mt-6">
                            {["Regal Aesthetic", "8K Resolution", "Educator-Safe", "Optimized WebP"].map(chip => (
                                <div key={chip} className="px-3 py-1 flex items-center gap-2 bg-white/5 border border-white/5 rounded-full">
                                    <div className="w-1 h-1 bg-cyan-400 rounded-full" />
                                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{chip}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
