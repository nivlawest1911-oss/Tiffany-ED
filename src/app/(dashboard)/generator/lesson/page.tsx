"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen,
    Sparkles,
    Target,
    Zap,
    Clock,
    CheckCircle2,
    Download,
    ArrowRight,
    FileText
} from "lucide-react";
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from 'sonner';
import { HolographicBackground } from "@/components/holographic/HolographicBackground";
import { generateImageFromPrompt } from '@/lib/gemini-service';
import { useWearable } from '@/hooks/use-wearable';
import { Activity } from 'lucide-react';
import { useIntelligence } from '@/context/IntelligenceContext';

export default function LessonGeneratorPage() {
    const [topic, setTopic] = useState("");
    const [subject, setSubject] = useState("STEM");
    const [gradeLevel, setGradeLevel] = useState("Middle School");
    const [standards, setStandards] = useState("");
    const [duration] = useState("60 Minutes");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);
    const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
    const [lessonImage, setLessonImage] = useState<string | null>(null);
    const { isConnected, lastData } = useWearable();
    const { addAction } = useIntelligence();

    const handleGeneratePlan = async () => {
        if (!topic) {
            toast.error("Please enter a lesson topic.");
            return;
        }

        setIsGenerating(true);
        setGeneratedPlan(null);
        setLessonImage(null);

        try {
            const response = await fetch('/api/generate/lesson-plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    topic,
                    subject,
                    gradeLevel,
                    standards,
                    duration,
                    stressLevel: lastData?.stressLevel
                })
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Failed to generate');
            }

            const data = await response.json();
            setGeneratedPlan(data.content);
            addAction(`Strategic Lesson Plan: ${topic}`);
            toast.success("Strategic Lesson Plan synthesized!");
        } catch (err: any) {
            console.error("Lesson Gen Error:", err);
            toast.error(err.message || "Synthesis failed.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleGenerateVisual = async () => {
        if (!topic) return;
        setIsGeneratingImage(true);
        try {
            const result = await generateImageFromPrompt({
                prompt: `Educational illustration for a lesson on ${topic}`,
                subject,
                gradeLevel
            });
            setLessonImage(result);
            addAction(`Lesson Visual Rendered: ${topic}`);
            toast.success("Lesson visual rendered!");
        } catch (err) {
            toast.error("Visual synthesis failed.");
        } finally {
            setIsGeneratingImage(false);
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
                        <div className="flex items-center gap-3 text-purple-400 mb-2">
                            <div className="p-2 bg-purple-950/50 rounded-lg border border-purple-500/30">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.3em]">Neural Curriculum Architect</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">
                            Lesson <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-500 italic">Planner Pro</span>
                        </h1>
                        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
                            Architect high-fidelity instructional protocols aligned with ALCOS and Science of Reading benchmarks.
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
                                    <Target className="w-4 h-4 text-purple-400" />
                                    Lesson Parameters
                                </CardTitle>
                                {isConnected && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-400 font-mono"
                                    >
                                        <Activity className="w-3 h-3 animate-pulse" />
                                        BIO-SYNC
                                    </motion.div>
                                )}
                            </CardHeader>
                            <CardContent className="p-6 space-y-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                                        Topic / Objective
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Photosynthesis, Civil Rights, Fractions..."
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        className="w-full bg-zinc-950 border border-white/5 rounded-xl p-3 text-white text-sm focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                                            Subject
                                        </label>
                                        <select
                                            value={subject}
                                            title="Select Subject"
                                            onChange={(e) => setSubject(e.target.value)}
                                            className="w-full bg-zinc-950 border border-white/5 rounded-xl p-3 text-white text-xs focus:ring-1 focus:ring-purple-500 outline-none"
                                        >
                                            <option>STEM</option>
                                            <option>Literacy</option>
                                            <option>Social Studies</option>
                                            <option>Arts</option>
                                            <option>Special Ed</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                                            Grade
                                        </label>
                                        <select
                                            value={gradeLevel}
                                            title="Select Grade Level"
                                            onChange={(e) => setGradeLevel(e.target.value)}
                                            className="w-full bg-zinc-950 border border-white/5 rounded-xl p-3 text-white text-xs focus:ring-1 focus:ring-purple-500 outline-none"
                                        >
                                            <option>Elementary</option>
                                            <option>Middle School</option>
                                            <option>High School</option>
                                            <option>Higher Ed</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                                        Standards / Focus (Optional)
                                    </label>
                                    <textarea
                                        placeholder="ALCOS Standards, specific IEP goals, or Science of Reading focus..."
                                        value={standards}
                                        onChange={(e) => setStandards(e.target.value)}
                                        className="w-full bg-zinc-950 border border-white/5 rounded-xl p-3 text-white text-xs focus:ring-1 focus:ring-purple-500 outline-none min-h-[80px]"
                                    />
                                </div>

                                <div className="flex items-center gap-2 p-3 bg-cyan-500/5 rounded-xl border border-cyan-500/10">
                                    <Clock className="w-4 h-4 text-cyan-400" />
                                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Estimated Synthesis: 30 Seconds</span>
                                </div>

                                <Button
                                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-black uppercase tracking-widest rounded-xl shadow-lg transition-all group"
                                    onClick={handleGeneratePlan}
                                    disabled={isGenerating}
                                >
                                    {isGenerating ? (
                                        <Zap className="w-5 h-5 animate-spin mr-2" />
                                    ) : (
                                        <Sparkles className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                    )}
                                    {isGenerating ? 'Architecting...' : 'Build Protocol'}
                                </Button>
                            </CardContent>
                        </Card>

                        {generatedPlan && !lessonImage && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <Button
                                    variant="secondary"
                                    className="w-full border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-xl py-6"
                                    onClick={handleGenerateVisual}
                                    disabled={isGeneratingImage}
                                >
                                    {isGeneratingImage ? (
                                        <Zap className="w-4 h-4 animate-spin mr-2" />
                                    ) : (
                                        <CheckCircle2 className="w-4 h-4 mr-2" />
                                    )}
                                    {isGeneratingImage ? 'Rendering...' : 'Generate Lesson Visual'}
                                </Button>
                            </motion.div>
                        )}
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
                                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                                    <CardTitle className="text-white text-sm uppercase tracking-widest">Strategic Output</CardTitle>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="icon" variant="ghost" className="text-zinc-500 hover:text-white">
                                        <Download className="w-4 h-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="text-zinc-500 hover:text-white">
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
                                            {lessonImage && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 mb-8"
                                                >
                                                    <img
                                                        src={lessonImage}
                                                        alt="Lesson Visual"
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-4">
                                                        <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">
                                                            Visual Asset: Neural Rendering
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            )}

                                            <div className="prose prose-invert prose-purple max-w-none">
                                                {generatedPlan.split('\n').map((line, i) => {
                                                    if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-black text-white uppercase tracking-tight mb-4">{line.replace('# ', '')}</h1>;
                                                    if (line.startsWith('## ')) return <h2 key={i} className="text-lg font-bold text-purple-400 uppercase tracking-wide mt-6 mb-2">{line.replace('## ', '')}</h2>;
                                                    if (line.startsWith('### ')) return <h3 key={i} className="text-md font-semibold text-cyan-400 uppercase tracking-wider mt-4 mb-2">{line.replace('### ', '')}</h3>;
                                                    if (line.startsWith('* ') || line.startsWith('- ')) return <div key={i} className="text-zinc-400 ml-4 mb-1 flex gap-2"><span>•</span><span>{line.substring(2)}</span></div>;
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
                                                <FileText className="w-16 h-16 text-zinc-500" />
                                            </div>
                                            <div className="text-center space-y-2">
                                                <h3 className="text-white font-bold text-lg uppercase tracking-widest">System Idle</h3>
                                                <p className="text-zinc-500 text-sm max-w-xs mx-auto">
                                                    Infrastructure ready. Input parameters to begin lesson synthesis.
                                                </p>
                                            </div>

                                            {isGenerating && (
                                                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                                                    <div className="text-center space-y-4">
                                                        <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mx-auto" />
                                                        <p className="text-purple-400 font-bold uppercase tracking-tighter animate-pulse">Establishing Neural Link...</p>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </CardContent>
                        </Card>

                        {/* Analysis Metrics */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { label: "AI Synthesis", val: "High", sub: "Neural Arch" },
                                { label: "ALCOS", val: "100%", sub: "Alignment" },
                                { label: "SOR", val: "Active", sub: "Protocols" }
                            ].map((stat, i) => (
                                <Card key={i} className="bg-zinc-900/40 border-white/5 p-4 text-center">
                                    <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">{stat.label}</div>
                                    <div className="text-white font-black text-xl">{stat.val}</div>
                                    <div className="text-[8px] text-zinc-500 uppercase tracking-tighter">{stat.sub}</div>
                                </Card>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
