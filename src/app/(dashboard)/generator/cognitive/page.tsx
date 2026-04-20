"use client";
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Brain,
    Sparkles,
    Activity,
    Zap,
    Clock,
    Download,
    ArrowRight
} from "lucide-react";
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from 'sonner';
import { HolographicBackground } from "@/components/holographic/HolographicBackground";
import { useIntelligence } from '@/context/IntelligenceContext';
import { useWearable } from '@/hooks/use-wearable';

export default function CognitiveFitnessPage() {
    const [currentState, setCurrentState] = useState("");
    const [timeAvailable, setTimeAvailable] = useState("5 Minutes");
    const [focus, setFocus] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
    const { addAction } = useIntelligence();
    const { isConnected, lastData } = useWearable();

    const handleGenerateCognitive = async () => {
        if (!currentState) {
            toast.error("Please describe your current state or symptoms.");
            return;
        }

        setIsGenerating(true);
        setGeneratedPlan(null);

        try {
            const response = await fetch('/api/generate/cognitive', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    currentState,
                    timeAvailable,
                    focus,
                    stressLevel: lastData?.stressLevel
                })
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Failed to synthesize protocol');
            }

            const data = await response.json();
            setGeneratedPlan(data.content);
            addAction(`Cognitive Protocol Activated`);
            toast.success("Resilience protocol synthesized.");
        } catch (err: any) {
            console.error("Cognitive Gen Error:", err);
            toast.error(err.message || "Synthesis failed.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
            <HolographicBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
                <header className="mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-3 text-orange-400 mb-2">
                            <div className="p-2 bg-orange-950/50 rounded-lg border border-orange-500/30">
                                <Brain className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.3em]">Wellness & Resilience</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">
                            Cognitive <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 italic">Fitness</span>
                        </h1>
                        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
                            Science-backed protocols to eliminate burnout, down-regulate the nervous system, and restore executive function.
                        </p>
                    </motion.div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Input Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-4 space-y-6"
                    >
                        <Card className="bg-zinc-900/40 backdrop-blur-xl border-white/5 overflow-hidden">
                            <CardHeader className="border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between">
                                <CardTitle className="text-white text-lg flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-orange-400" />
                                    Biometric Input
                                </CardTitle>
                                {isConnected && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[10px] text-orange-400 font-mono"
                                    >
                                        <Activity className="w-3 h-3 animate-pulse" />
                                        SYNCED: {lastData?.stressLevel || 0}% STRESS
                                    </motion.div>
                                )}
                            </CardHeader>
                            <CardContent className="p-6 space-y-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                                        Current State / Symptoms
                                    </label>
                                    <textarea
                                        placeholder="e.g. Overwhelmed by grading, decision fatigue, physical exhaustion..."
                                        value={currentState}
                                        onChange={(e) => setCurrentState(e.target.value)}
                                        className="w-full bg-zinc-950 border border-white/5 rounded-xl p-3 text-white text-sm focus:ring-1 focus:ring-orange-500 outline-none transition-all min-h-[80px]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                                        Time Available
                                    </label>
                                    <select
                                        value={timeAvailable}
                                        title="Select Time Available"
                                        onChange={(e) => setTimeAvailable(e.target.value)}
                                        className="w-full bg-zinc-950 border border-white/5 rounded-xl p-3 text-white text-xs focus:ring-1 focus:ring-orange-500 outline-none"
                                    >
                                        <option>2 Minutes (Immediate Reset)</option>
                                        <option>5 Minutes</option>
                                        <option>15 Minutes</option>
                                        <option>60 Minutes (Deep Recovery)</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                                        Primary Focus (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Energy recovery, emotional regulation, clarity..."
                                        value={focus}
                                        onChange={(e) => setFocus(e.target.value)}
                                        className="w-full bg-zinc-950 border border-white/5 rounded-xl p-3 text-white text-sm focus:ring-1 focus:ring-orange-500 outline-none transition-all"
                                    />
                                </div>

                                <div className="flex items-center gap-2 p-3 bg-red-500/5 rounded-xl border border-red-500/10">
                                    <Clock className="w-4 h-4 text-red-400" />
                                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Estimated Synthesis: 20 Seconds</span>
                                </div>

                                <Button
                                    className="w-full h-12 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-black uppercase tracking-widest rounded-xl shadow-lg transition-all group"
                                    onClick={handleGenerateCognitive}
                                    disabled={isGenerating}
                                >
                                    {isGenerating ? (
                                        <Zap className="w-5 h-5 animate-spin mr-2" />
                                    ) : (
                                        <Sparkles className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                    )}
                                    {isGenerating ? 'Synthesizing...' : 'Generate Protocol'}
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Preview / Output Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-8 space-y-6"
                    >
                        <Card className="bg-zinc-900/40 backdrop-blur-xl border-white/5 min-h-[500px] flex flex-col">
                            <CardHeader className="border-b border-white/5 bg-white/[0.02] flex flex-row items-center justify-between py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                                    <CardTitle className="text-white text-sm uppercase tracking-widest">Resilience Protocol</CardTitle>
                                </div>
                                <div className="flex gap-2">
                                    <Button 
                                        size="icon" 
                                        variant="ghost" 
                                        className="text-zinc-500 hover:text-white"
                                        onClick={() => toast.success("Protocol exported to Vault.")}
                                    >
                                        <Download className="w-4 h-4" />
                                    </Button>
                                    <Button 
                                        size="icon" 
                                        variant="ghost" 
                                        className="text-zinc-500 hover:text-white"
                                        onClick={() => toast.info("Synapse routing to Node 14 (Unity).")}
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 p-8 overflow-y-auto">
                                <AnimatePresence mode="wait">
                                    {generatedPlan ? (
                                        <motion.div
                                            key="content"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="space-y-6"
                                        >
                                            <div className="prose prose-invert prose-orange max-w-none">
                                                {generatedPlan.split('\n').map((line, i) => {
                                                    if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-black text-white uppercase tracking-tight mb-4">{line.replace('# ', '')}</h1>;
                                                    if (line.startsWith('## ')) return <h2 key={i} className="text-lg font-bold text-orange-400 uppercase tracking-wide mt-6 mb-2">{line.replace('## ', '')}</h2>;
                                                    if (line.startsWith('### ')) return <h3 key={i} className="text-md font-semibold text-red-400 uppercase tracking-wider mt-4 mb-2">{line.replace('### ', '')}</h3>;
                                                    if (line.startsWith('* ') || line.startsWith('- ')) return <div key={i} className="text-zinc-400 ml-4 mb-1 flex gap-2"><span>â€¢</span><span>{line.substring(2)}</span></div>;
                                                    if (line.trim() === '') return <br key={i} />;
                                                    return <p key={i} className="text-zinc-400 leading-relaxed mb-3">{line}</p>;
                                                })}
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="placeholder"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="h-full flex flex-col items-center justify-center space-y-6 opacity-30"
                                        >
                                            <div className="p-8 rounded-full bg-zinc-800/50 border border-white/5">
                                                <Brain className="w-16 h-16 text-zinc-500" />
                                            </div>
                                            <div className="text-center space-y-2">
                                                <h3 className="text-white font-bold text-lg uppercase tracking-widest">Awaiting Biometrics</h3>
                                                <p className="text-zinc-500 text-sm max-w-xs mx-auto">
                                                    Provide your current cognitive state to receive a personalized biological and psychological reset protocol.
                                                </p>
                                            </div>

                                            {isGenerating && (
                                                <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 rounded-2xl">
                                                    <div className="text-center space-y-8 max-w-md px-6">
                                                        <div className="relative">
                                                            <div className="w-24 h-24 border-2 border-orange-500/20 border-t-orange-500 rounded-full animate-spin mx-auto" />
                                                            <motion.div
                                                                animate={{
                                                                    scale: [1, 1.2, 1],
                                                                    opacity: [0.3, 0.7, 0.3]
                                                                }}
                                                                transition={{ duration: 2, repeat: Infinity }}
                                                                className="absolute inset-0 bg-orange-500/10 blur-2xl rounded-full"
                                                            />
                                                        </div>

                                                        <div className="space-y-4">
                                                            <motion.p
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                className="text-orange-400 font-black uppercase tracking-[0.3em] text-xs"
                                                            >
                                                                Neural Harmony Initialized
                                                            </motion.p>

                                                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                                <motion.div
                                                                    initial={{ width: "0%" }}
                                                                    animate={{ width: "100%" }}
                                                                    transition={{ duration: 25, ease: "linear" }}
                                                                    className="h-full bg-gradient-to-r from-orange-600 via-red-500 to-orange-600"
                                                                />
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-4 pt-4">
                                                                {[
                                                                    { label: "Stress", val: `${lastData?.stressLevel || 0}%` },
                                                                    { label: "Vibe", val: "Resilient" },
                                                                    { label: "Recovery", val: "Optimizing" },
                                                                    { label: "Executive", val: "Restoring" }
                                                                ].map((metric, idx) => (
                                                                    <motion.div
                                                                        key={idx}
                                                                        initial={{ opacity: 0, y: 10 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        transition={{ delay: idx * 0.2 }}
                                                                        className="p-2 rounded-lg bg-white/5 border border-white/10"
                                                                    >
                                                                        <div className="text-[8px] text-zinc-500 uppercase font-black">{metric.label}</div>
                                                                        <div className="text-[10px] text-white font-mono">{metric.val}</div>
                                                                    </motion.div>
                                                                ))}
                                                            </div>

                                                            <p className="text-[10px] text-zinc-500 font-mono animate-pulse">
                                                                Calibrating neuro-metabolic recovery protocols...
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
