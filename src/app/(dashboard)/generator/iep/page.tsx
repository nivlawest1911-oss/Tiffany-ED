"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText,
    Sparkles,
    Target,
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

export default function IEPGeneratorPage() {
    const [studentNeeds, setStudentNeeds] = useState("");
    const [gradeLevel, setGradeLevel] = useState("Middle School");
    const [focusAreas, setFocusAreas] = useState("");
    const [duration, setDuration] = useState("1 Academic Year");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
    const { addAction } = useIntelligence();

    const handleGeneratePlan = async () => {
        if (!studentNeeds) {
            toast.error("Please enter student needs and profile.");
            return;
        }

        setIsGenerating(true);
        setGeneratedPlan(null);

        try {
            const response = await fetch('/api/generate/iep', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    studentNeeds,
                    gradeLevel,
                    focusAreas,
                    duration
                })
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Failed to generate');
            }

            const data = await response.json();
            setGeneratedPlan(data.content);
            addAction(`IEP Drafted: ${gradeLevel}`);
            toast.success("IEP Protocol successfully drafted!");
        } catch (err: any) {
            console.error("IEP Gen Error:", err);
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
                        <div className="flex items-center gap-3 text-cyan-400 mb-2">
                            <div className="p-2 bg-cyan-950/50 rounded-lg border border-cyan-500/30">
                                <FileText className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.3em]">Compliance & Intervention</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">
                            IEP <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 italic">Architect</span>
                        </h1>
                        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
                            Draft high-fidelity, compliant, and supportive Individualized Education Programs instantly.
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
                                    <Target className="w-4 h-4 text-cyan-400" />
                                    Student Parameters
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                                        Student Profile & Needs
                                    </label>
                                    <textarea
                                        placeholder="Describe the student's current strengths, challenges, and support needs..."
                                        value={studentNeeds}
                                        onChange={(e) => setStudentNeeds(e.target.value)}
                                        className="w-full bg-zinc-950 border border-white/5 rounded-xl p-3 text-white text-sm focus:ring-1 focus:ring-cyan-500 outline-none transition-all min-h-[100px]"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                                            Grade
                                        </label>
                                        <select
                                            value={gradeLevel}
                                            title="Select Grade Level"
                                            onChange={(e) => setGradeLevel(e.target.value)}
                                            className="w-full bg-zinc-950 border border-white/5 rounded-xl p-3 text-white text-xs focus:ring-1 focus:ring-cyan-500 outline-none"
                                        >
                                            <option>Pre-K</option>
                                            <option>Elementary</option>
                                            <option>Middle School</option>
                                            <option>High School</option>
                                            <option>Transition (18-21)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                                            Duration
                                        </label>
                                        <select
                                            value={duration}
                                            title="Select Duration"
                                            onChange={(e) => setDuration(e.target.value)}
                                            className="w-full bg-zinc-950 border border-white/5 rounded-xl p-3 text-white text-xs focus:ring-1 focus:ring-cyan-500 outline-none"
                                        >
                                            <option>1 Academic Year</option>
                                            <option>6 Months</option>
                                            <option>90 Days</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                                        Focus Areas (Optional)
                                    </label>
                                    <textarea
                                        placeholder="Reading comprehension, transitions, fine motor skills..."
                                        value={focusAreas}
                                        onChange={(e) => setFocusAreas(e.target.value)}
                                        className="w-full bg-zinc-950 border border-white/5 rounded-xl p-3 text-white text-xs focus:ring-1 focus:ring-cyan-500 outline-none min-h-[60px]"
                                    />
                                </div>

                                <div className="flex items-center gap-2 p-3 bg-blue-500/5 rounded-xl border border-blue-500/10">
                                    <Clock className="w-4 h-4 text-blue-400" />
                                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Estimated Synthesis: 45 Seconds</span>
                                </div>

                                <Button
                                    className="w-full h-12 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black uppercase tracking-widest rounded-xl shadow-lg transition-all group"
                                    onClick={handleGeneratePlan}
                                    disabled={isGenerating}
                                >
                                    {isGenerating ? (
                                        <Zap className="w-5 h-5 animate-spin mr-2" />
                                    ) : (
                                        <Sparkles className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                    )}
                                    {isGenerating ? 'Drafting Protocol...' : 'Generate IEP Draft'}
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
                                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                                    <CardTitle className="text-white text-sm uppercase tracking-widest">Strategic Output</CardTitle>
                                </div>
                                <div className="flex gap-2">
                                    <Button 
                                        size="icon" 
                                        variant="ghost" 
                                        className="text-zinc-500 hover:text-white"
                                        onClick={() => toast.info("Exporting IEP Protocol...")}
                                        aria-label="Download IEP"
                                    >
                                        <Download className="w-4 h-4" />
                                    </Button>
                                    <Button 
                                        size="icon" 
                                        variant="ghost" 
                                        className="text-zinc-500 hover:text-white"
                                        onClick={() => toast.info("Navigating to Implementation Tracking...")}
                                        aria-label="Continue to Tracking"
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
                                            <div className="prose prose-invert prose-cyan max-w-none">
                                                {generatedPlan.split('\n').map((line, i) => {
                                                    if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-black text-white uppercase tracking-tight mb-4">{line.replace('# ', '')}</h1>;
                                                    if (line.startsWith('## ')) return <h2 key={i} className="text-lg font-bold text-cyan-400 uppercase tracking-wide mt-6 mb-2">{line.replace('## ', '')}</h2>;
                                                    if (line.startsWith('### ')) return <h3 key={i} className="text-md font-semibold text-blue-400 uppercase tracking-wider mt-4 mb-2">{line.replace('### ', '')}</h3>;
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
                                                <Target className="w-16 h-16 text-zinc-500" />
                                            </div>
                                            <div className="text-center space-y-2">
                                                <h3 className="text-white font-bold text-lg uppercase tracking-widest">Protocol Staging</h3>
                                                <p className="text-zinc-500 text-sm max-w-xs mx-auto">
                                                    Infrastructure ready. Input student parameters to synthesize the IEP.
                                                </p>
                                            </div>

                                            {isGenerating && (
                                                <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 rounded-2xl">
                                                    <div className="text-center space-y-8 max-w-md px-6">
                                                        <div className="relative">
                                                            <div className="w-24 h-24 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto" />
                                                            <motion.div
                                                                animate={{
                                                                    scale: [1, 1.2, 1],
                                                                    opacity: [0.3, 0.7, 0.3]
                                                                }}
                                                                transition={{ duration: 2, repeat: Infinity }}
                                                                className="absolute inset-0 bg-cyan-500/10 blur-2xl rounded-full"
                                                            />
                                                        </div>

                                                        <div className="space-y-4">
                                                            <motion.p
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                className="text-cyan-400 font-black uppercase tracking-[0.3em] text-xs"
                                                            >
                                                                Verification Protocol Active
                                                            </motion.p>

                                                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                                <motion.div
                                                                    initial={{ width: "0%" }}
                                                                    animate={{ width: "100%" }}
                                                                    transition={{ duration: 25, ease: "linear" }}
                                                                    className="h-full bg-gradient-to-r from-cyan-600 via-blue-500 to-cyan-600"
                                                                />
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-4 pt-4">
                                                                {[
                                                                    { label: "LRE", val: "Optimized" },
                                                                    { label: "Compliance", val: "Verified" },
                                                                    { label: "Rigor", val: "High-Fidelity" },
                                                                    { label: "IEP Data", val: "Synced" }
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
                                                                Drafting compliant individualized education protocols...
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
