"use client"

import { useState, useEffect } from "react"
import {
    Shield,
    Brain,
    Check,
    Loader2,
    Mic,
    Zap,
    RefreshCw,
    Copy
} from "lucide-react"
import { useCelebrate } from '@/context/CelebrationContext';
import { useAuth } from '@/context/AuthContext';
import { UnifiedProtocol } from '@/data/unifiedRegistry';
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Sparkles } from 'lucide-react';

interface NeuralLinkChatProps {
    protocol: UnifiedProtocol;
    className?: string;
}

export function NeuralLinkChat({ protocol, className }: NeuralLinkChatProps) {
    const { celebrate } = useCelebrate();
    const { user } = useAuth();
    const [prompt, setPrompt] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const [response, setResponse] = useState("")
    const [copied, setCopied] = useState(false)
    const [isListening, setIsListening] = useState(false)
    const [isPolymathEnabled, setIsPolymathEnabled] = useState(false)
    const [showCostAlert, setShowCostAlert] = useState(false)

    const tokenCost = isPolymathEnabled ? 10 : 2; // Increased cost for polymath mode

    const isStrategicTier = (user?.tier as string) === 'Director Pack' || (user?.tier as string) === 'Site Command' || (user?.tier as string) === 'director-pack' || (user?.tier as string) === 'site-command';

    // Reset chat when protocol changes
    useEffect(() => {
        setPrompt("");
        setResponse("");
    }, [protocol.id]);

    const handleGenerate = async () => {
        if (isPolymathEnabled && !showCostAlert) {
            setShowCostAlert(true);
            return;
        }

        if (!prompt.trim()) return
        setIsGenerating(true)
        setShowCostAlert(false)
        setResponse("")

        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt,
                    generatorId: protocol.id,
                    systemInstruction: `
            ${isPolymathEnabled ? `
            SYSTEM PROMPT: You are a collaborative Multi-Agent Strategic Intelligence for Alabama school leadership.
            You operate as a unified council of specialized agents:

            1. [STRATEGY ADVISOR]: Focuses on high-level administrative synthesis and long-term ROI.
            2. [LITERACY SPECIALIST]: Expert on the Alabama Literacy Act and ALSDE compliance mandates.
            3. [DATA ARCHITECT]: Analyzes trends, identifying 'Early Warning Signs' in attendance or performance scores.

            CORE DIRECTIVES:
            - Collaborative Reasoning: Identify cross-functional impacts (e.g., how a literacy policy affects the budget or teacher caseload).
            - Persona: Speak with the authority of a seasoned Superintendent and the precision of a Data Scientist.
            - Critical Thinking: Do not just agree with the user. If a proposed school policy has a 'blind spot' (e.g., impact on student equity or budget), point it out constructively.
            - Output Format: Use 'Strategic Findings' followed by 'Agentic Action Items.'
            - Regional Focus: Prioritize the needs of Mobile County Schools and surrounding districts.
            ` : (protocol as any).detailedPrompt || protocol.description}
            OBJECTIVE: ${protocol.description}
            CONTEXT: The user is an Alabama Educator/Administrator using EdIntel OS.
            CRITICAL: Output must be formatted with Markdown (bolding key terms, using bullet points).
          `
                })
            });

            if (!res.ok) throw new Error('Neural Link Interrupted');

            const reader = res.body?.getReader();
            const decoder = new TextDecoder();

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value);
                    setResponse((prev) => prev + chunk);
                }

                celebrate(
                    'Intelligence Synthesized',
                    `${protocol.name} has successfully architected your solution.`,
                    'success'
                );
            }
        } catch (error: any) {
            console.error('Generation failure:', error);
            setResponse(`⚠️ CRITICAL ERROR: Neural synthesis failed. Reference: ${error.message}. Please restart the EdIntel Protocol.`);
        } finally {
            setIsGenerating(false)
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(response)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleVoiceToggle = () => {
        setIsListening(!isListening);
        if (!isListening) {
            const voicePrompt = " [Listening for directives...]";
            setPrompt(prev => prev + voicePrompt);
            setTimeout(() => {
                setPrompt(prev => prev.replace(voicePrompt, ""));
            }, 3000);
        }
    }

    const Icon = protocol.icon || Brain;

    return (
        <div className={cn("flex flex-col h-full min-h-[500px] glass-bento bg-white/40 border-white/40 overflow-hidden relative shadow-2xl", className)}>
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,176,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,176,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none" />

            {/* Interface Header */}
            <div className="p-6 border-b border-slate-100 relative z-10">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-electric-cyan/10 flex items-center justify-center border border-electric-cyan/20 shadow-[0_0_30px_rgba(0,176,255,0.1)]">
                        <Icon className="w-6 h-6 text-electric-cyan" strokeWidth={1.5} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black italic text-slate-900 uppercase tracking-tight">{protocol.name}</h3>
                        <div className="flex items-center gap-3">
                            <div className="px-2 py-0.5 rounded bg-electric-cyan/10 border border-electric-cyan/20 text-[8px] font-black text-electric-cyan uppercase tracking-widest">v5.0-Sovereign</div>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Neural Sync Active</span>
                        </div>
                    </div>

                    {isStrategicTier && (
                        <div className="ml-auto flex items-center gap-3 bg-slate-100 p-2 rounded-2xl border border-slate-200 group/poly">
                            <div className="flex flex-col items-end">
                                <span className="text-[8px] font-black text-sovereign-gold uppercase tracking-tighter">Multi-Agent</span>
                                <span className="text-[7px] text-slate-500 uppercase font-bold">Executive Mode</span>
                            </div>
                            <button
                                onClick={() => setIsPolymathEnabled(!isPolymathEnabled)}
                                title={isPolymathEnabled ? "Disable Polymath Logic" : "Enable Polymath Logic"}
                                className={cn(
                                    "w-10 h-5 rounded-full relative transition-all duration-300",
                                    isPolymathEnabled ? "bg-electric-cyan" : "bg-slate-300"
                                )}
                            >
                                <motion.div
                                    animate={{ x: isPolymathEnabled ? 20 : 2 }}
                                    className="absolute top-1 w-3 h-3 rounded-full bg-white shadow-lg"
                                />
                            </button>
                        </div>
                    )}
                </div>
                <p className="text-sm font-medium text-slate-600 leading-relaxed border-l-2 border-electric-cyan/30 pl-4">{protocol.description}</p>
            </div>

            {/* Interaction Zone */}
            <div className="p-6 flex-1 flex flex-col gap-6 relative z-10 overflow-hidden">
                {!response ? (
                    <>
                        <div className="space-y-3">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Directives Palette</span>
                            <div className="flex flex-wrap gap-2">
                                {((protocol as any).prompts || ["Initial Draft", "Review Compliance", "Optimization Strategy"]).map((p: string, i: number) => (
                                    <button
                                        key={i}
                                        onClick={() => setPrompt(p)}
                                        className="px-3 py-2 rounded-lg bg-white border border-slate-200 hover:border-electric-cyan/30 hover:bg-electric-cyan/5 text-[10px] font-bold text-slate-500 hover:text-slate-900 transition-all text-left uppercase tracking-wide"
                                    >
                                        <span className="text-electric-cyan mr-2">➜</span> {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 relative mt-2">
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder={`INITIATE ${protocol.name.toUpperCase()} PROTOCOL...`}
                                className="w-full h-full min-h-[150px] bg-slate-50/50 border border-slate-200 rounded-2xl p-6 text-slate-900 placeholder:text-slate-300 font-mono text-sm resize-none focus:outline-none focus:border-electric-cyan/50 transition-all shadow-inner relative z-10"
                            />
                            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-full">
                                    <Zap size={10} className={cn(isPolymathEnabled ? "text-sovereign-gold" : "text-slate-300")} fill="currentColor" />
                                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{tokenCost} Neural Tokens</span>
                                </div>
                            </div>
                            <AnimatePresence>
                                {showCostAlert && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute -top-16 left-0 right-0 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3 shadow-lg z-30"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                                            <AlertTriangle size={16} />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-[10px] font-black text-amber-700 uppercase tracking-tight">High-Compute Logic Confirmed</p>
                                            <p className="text-[9px] text-amber-600 font-medium uppercase tracking-tighter">Executing this directive will deduct {tokenCost} Neural Tokens.</p>
                                        </div>
                                        <button
                                            onClick={() => setShowCostAlert(false)}
                                            className="text-[9px] font-black text-amber-700 uppercase hover:underline"
                                        >
                                            Dismiss
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                                <button
                                    onClick={handleVoiceToggle}
                                    title={isListening ? "Stop listening" : "Start voice input"}
                                    className={cn(
                                        "p-2.5 rounded-xl border border-slate-200 transition-all",
                                        isListening ? 'bg-red-50 text-red-500 border-red-200 animate-pulse' : 'bg-white text-slate-400 hover:text-slate-900'
                                    )}
                                >
                                    <Mic size={16} />
                                </button>
                                <button
                                    onClick={handleGenerate}
                                    disabled={!prompt.trim() || isGenerating}
                                    className="btn-sovereign flex items-center gap-2"
                                >
                                    {isGenerating ? <Loader2 className="animate-spin" size={14} /> : <Sparkles size={14} fill="currentColor" />}
                                    <span className="uppercase tracking-[0.2em] text-[10px]">
                                        {isGenerating ? "Synthesizing..." : "Execute"}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-black text-electric-cyan uppercase tracking-[0.3em] flex items-center gap-2">
                                <Check size={12} strokeWidth={4} /> Strategy Synchronized
                            </span>
                            <div className="flex gap-2">
                                <button onClick={() => setResponse("")} className="px-3 py-1.5 rounded-lg bg-slate-100 text-[9px] font-black uppercase text-slate-500 hover:text-slate-900 tracking-widest transition-all inline-flex items-center gap-2">
                                    <RefreshCw size={12} /> New Task
                                </button>
                                <button onClick={handleCopy} className="px-3 py-1.5 rounded-lg bg-sovereign-gold/10 text-[9px] font-black uppercase text-sovereign-gold hover:bg-sovereign-gold/20 tracking-widest transition-all inline-flex items-center gap-2">
                                    {copied ? <Check size={12} /> : <Copy size={12} />}
                                    {copied ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 bg-white border border-slate-100 rounded-2xl p-6 overflow-y-auto custom-scrollbar shadow-inner relative">
                            <div className="prose prose-slate prose-sm max-w-none">
                                <div className="text-slate-700 font-medium leading-relaxed whitespace-pre-wrap font-sans text-sm">
                                    {response}
                                </div>
                            </div>
                            <div className="absolute bottom-6 right-6 opacity-5 pointer-events-none text-slate-900">
                                <Shield size={80} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
