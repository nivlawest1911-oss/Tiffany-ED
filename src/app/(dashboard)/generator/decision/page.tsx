"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Zap,
    Sparkles,
    BrainCircuit,
    Target,
    Clock,
    Download,
    ArrowRight,
    X
} from "lucide-react";
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from 'sonner';
import { HolographicBackground } from "@/components/holographic/HolographicBackground";
import { useIntelligence } from '@/context/IntelligenceContext';

export default function DecisionGeneratorPage() {
    const [scenario, setScenario] = useState("");
    const [context, setContext] = useState("");
    const [stakeholderList, setStakeholderList] = useState<string[]>([]);
    const [customStakeholder, setCustomStakeholder] = useState("");
    const [riskTolerance, setRiskTolerance] = useState("Moderate");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
    const { addAction, isRescueOneActive, toggleRescueOne: toggleGlobalRescueOne } = useIntelligence();

    const stakeholderPresets = ["Teachers", "Union", "Parents", "Admin Board", "Superintendent", "Students"];

    const toggleStakeholder = (name: string) => {
        setStakeholderList(prev =>
            prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
        );
    };

    const addCustomStakeholder = () => {
        if (customStakeholder && !stakeholderList.includes(customStakeholder)) {
            setStakeholderList(prev => [...prev, customStakeholder]);
            setCustomStakeholder("");
        }
    };

    const handleGenerateDecision = async () => {
        if (!scenario) {
            toast.error("Please provide the core scenario or issue.");
            return;
        }

        setIsGenerating(true);
        setGeneratedPlan(null);

        try {
            const response = await fetch('/api/generate/decision', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    scenario,
                    context: isRescueOneActive ? `[RESCUE ONE PROTOCOL ACTIVE] ${context}` : context,
                    stakeholders: isRescueOneActive ? [...stakeholderList, "Rescue One Command"].join(", ") : stakeholderList.join(", "),
                    riskTolerance: isRescueOneActive ? "Extreme" : riskTolerance
                })
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Failed to synthesize decision');
            }

            const data = await response.json();
            setGeneratedPlan(data.content);
            addAction(isRescueOneActive ? `Rescue One Recovery Matrix Generated` : `Decision Matrix Generated`);
            toast.success(isRescueOneActive ? "Rescue One Tactical Matrix Ready." : "Strategic Decision Matrix ready.");
        } catch (err: any) {
            console.error("Decision Gen Error:", err);
            toast.error(err.message || "Synthesis failed.");
        } finally {
            setIsGenerating(false);
        }
    };

    const toggleRescueOne = () => {
        const newMode = !isRescueOneActive;
        toggleGlobalRescueOne();
        if (newMode) {
            setRiskTolerance("High");
            if (!scenario) setScenario("Emergency System Recovery & Institutional Stabilization");
            if (!stakeholderList.includes("Admin Board")) toggleStakeholder("Admin Board");
            toast.warning("RESCUE ONE PROTOCOL INITIALIZED", {
                description: "Overriding standard risk parameters.",
                duration: 5000
            });
        } else {
            setRiskTolerance("Moderate");
            toast.info("Standard Protocols Restored");
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
                        <div className="flex items-center gap-3 text-emerald-400 mb-2">
                            <div className="p-2 bg-emerald-950/50 rounded-lg border border-emerald-500/30">
                                <BrainCircuit className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.3em]">Administrative AI Support</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">
                            Decision <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isRescueOneActive ? 'from-rose-500 to-orange-600' : 'from-emerald-400 to-teal-500'} italic`}>Engine</span>
                        </h1>
                        <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
                            Analyze complex scenarios, evaluate risk, and eliminate decision fatigue with clear action matrices.
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
                                    <Target className="w-4 h-4 text-emerald-400" />
                                    Core Issue Setup
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                                        Scenario / Core Decision
                                    </label>
                                    <textarea
                                        placeholder="e.g. Budget reallocation, scheduling conflicts, policy implementation..."
                                        value={scenario}
                                        onChange={(e) => setScenario(e.target.value)}
                                        className="w-full bg-zinc-950 border border-white/5 rounded-xl p-3 text-white text-sm focus:ring-1 focus:ring-emerald-500 outline-none transition-all min-h-[80px]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                                        Context & Constraints (Optional)
                                    </label>
                                    <textarea
                                        placeholder="Timeline constraints, resource limitations, or historical context..."
                                        value={context}
                                        onChange={(e) => setContext(e.target.value)}
                                        className="w-full bg-zinc-950 border border-white/5 rounded-xl p-3 text-white text-xs focus:ring-1 focus:ring-emerald-500 outline-none min-h-[80px]"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                                        Primary Stakeholders
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {stakeholderPresets.map((preset) => (
                                            <button
                                                key={preset}
                                                onClick={() => toggleStakeholder(preset)}
                                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-tight transition-all border ${stakeholderList.includes(preset)
                                                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                                                    : 'bg-zinc-950 text-zinc-600 border-white/5 hover:border-white/10'
                                                    }`}
                                            >
                                                {preset}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Add custom..."
                                            value={customStakeholder}
                                            onChange={(e) => setCustomStakeholder(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && addCustomStakeholder()}
                                            className="flex-1 bg-zinc-950 border border-white/5 rounded-xl px-3 py-2 text-[10px] text-white focus:ring-1 focus:ring-emerald-500 outline-none"
                                        />
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={addCustomStakeholder}
                                            className="text-zinc-500 hover:text-white text-[10px] font-black uppercase"
                                        >
                                            Add
                                        </Button>
                                    </div>

                                    {stakeholderList.length > 0 && (
                                        <div className="flex flex-wrap gap-2 pt-2 pb-4 border-b border-white/5">
                                            {stakeholderList.map((s) => (
                                                <div
                                                    key={s}
                                                    className="flex items-center gap-2 px-2 py-1 rounded-md bg-zinc-800 border border-white/10 text-[9px] text-zinc-300 font-mono uppercase"
                                                >
                                                    {s}
                                                    <button 
                                                        onClick={() => toggleStakeholder(s)} 
                                                        className="hover:text-rose-400"
                                                        title="Remove Stakeholder"
                                                        aria-label={`Remove ${s}`}
                                                    >
                                                        <X className="w-2 h-2" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                                        Risk Tolerance Profile
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['Low', 'Moderate', 'High'].map((risk) => (
                                            <button
                                                key={risk}
                                                onClick={() => setRiskTolerance(risk)}
                                                className={`py-2 rounded-lg text-[10px] font-black uppercase tracking-tighter transition-all border ${riskTolerance === risk
                                                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                                                    : 'bg-zinc-950 text-zinc-500 border-white/5 hover:border-white/10'
                                                    }`}
                                            >
                                                {risk}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 p-3 bg-teal-500/5 rounded-xl border border-teal-500/10">
                                    <Clock className="w-4 h-4 text-teal-400" />
                                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Estimated Synthesis: 30 Seconds</span>
                                </div>

                                <Button
                                    className={`w-full h-12 ${isRescueOneActive ? 'bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-500 hover:to-orange-500' : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500'} text-white font-black uppercase tracking-widest rounded-xl shadow-lg transition-all group`}
                                    onClick={handleGenerateDecision}
                                    disabled={isGenerating}
                                >
                                    {isGenerating ? (
                                        <Zap className="w-5 h-5 animate-spin mr-2" />
                                    ) : (
                                        <Sparkles className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                    )}
                                    {isGenerating ? 'Analyzing Matrices...' : isRescueOneActive ? 'Initialize Rescue One' : 'Generate Action Matrix'}
                                </Button>

                                {/* Rescue One Override Toggle */}
                                <div className="pt-4 border-t border-white/5">
                                    <button
                                        onClick={toggleRescueOne}
                                        className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all ${isRescueOneActive 
                                            ? 'bg-rose-500/10 border-rose-500/50 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.1)]' 
                                            : 'bg-zinc-950/50 border-white/5 text-zinc-500 hover:border-white/20'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-lg ${isRescueOneActive ? 'bg-rose-500 text-white' : 'bg-zinc-800'}`}>
                                                <Zap className="w-4 h-4" />
                                            </div>
                                            <div className="text-left">
                                                <div className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Rescue One Override</div>
                                                <div className={`text-[8px] font-bold uppercase tracking-tight ${isRescueOneActive ? 'text-rose-400/70' : 'text-zinc-600'}`}>
                                                    System Recovery Protocol
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`w-10 h-5 rounded-full relative transition-colors ${isRescueOneActive ? 'bg-rose-500' : 'bg-zinc-800'}`}>
                                            <motion.div 
                                                animate={{ x: isRescueOneActive ? 20 : 0 }}
                                                className="absolute top-1 left-1 w-3 h-3 rounded-full bg-white shadow-sm" 
                                            />
                                        </div>
                                    </button>
                                </div>
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
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <CardTitle className="text-white text-sm uppercase tracking-widest">Strategic Matrix</CardTitle>
                                </div>
                                <div className="flex gap-2">
                                    <Button 
                                        size="icon" 
                                        variant="ghost" 
                                        className="text-zinc-500 hover:text-white"
                                        onClick={() => toast.info("Exporting Decision Matrix...")}
                                        aria-label="Download Decision Matrix"
                                        title="Download Matrix"
                                    >
                                        <Download className="w-4 h-4" />
                                    </Button>
                                    <Button 
                                        size="icon" 
                                        variant="ghost" 
                                        className="text-zinc-500 hover:text-white"
                                        onClick={() => toast.info("Navigating to Executive Summary...")}
                                        aria-label="Continue to Summary"
                                        title="Continue to Summary"
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
                                            <div className="prose prose-invert prose-emerald max-w-none">
                                                {generatedPlan.split('\n').map((line, i) => {
                                                    if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-black text-white uppercase tracking-tight mb-4">{line.replace('# ', '')}</h1>;
                                                    if (line.startsWith('## ')) return <h2 key={i} className="text-lg font-bold text-emerald-400 uppercase tracking-wide mt-6 mb-2">{line.replace('## ', '')}</h2>;
                                                    if (line.startsWith('### ')) return <h3 key={i} className="text-md font-semibold text-teal-400 uppercase tracking-wider mt-4 mb-2">{line.replace('### ', '')}</h3>;
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
                                                <BrainCircuit className="w-16 h-16 text-zinc-500" />
                                            </div>
                                            <div className="text-center space-y-2">
                                                <h3 className="text-white font-bold text-lg uppercase tracking-widest">Awaiting Parameters</h3>
                                                <p className="text-zinc-500 text-sm max-w-xs mx-auto">
                                                    Input scenario parameters to receive a comprehensive decision matrix and risk analysis.
                                                </p>
                                            </div>

                                            {isGenerating && (
                                                <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 rounded-2xl">
                                                    <div className="text-center space-y-8 max-w-md px-6">
                                                        <div className="relative">
                                                            <div className="w-24 h-24 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto" />
                                                            <motion.div
                                                                animate={{
                                                                    scale: [1, 1.2, 1],
                                                                    opacity: [0.3, 0.7, 0.3]
                                                                }}
                                                                transition={{ duration: 2, repeat: Infinity }}
                                                                className="absolute inset-0 bg-emerald-500/10 blur-2xl rounded-full"
                                                            />
                                                        </div>

                                                        <div className="space-y-4">
                                                            <motion.p
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                className="text-emerald-400 font-black uppercase tracking-[0.3em] text-xs"
                                                            >
                                                                Decision Logic Synchronized
                                                            </motion.p>

                                                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                                <motion.div
                                                                    initial={{ width: "0%" }}
                                                                    animate={{ width: "100%" }}
                                                                    transition={{ duration: 25, ease: "linear" }}
                                                                    className="h-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600"
                                                                />
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-4 pt-4">
                                                                {[
                                                                    { label: "Risk", val: riskTolerance },
                                                                    { label: "Variables", val: "Assessed" },
                                                                    { label: "Stakeholders", val: stakeholderList.length.toString() },
                                                                    { label: "Matrix", val: "Projected" }
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
                                                                Analyzing variables for risk-adjusted action protocol...
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
