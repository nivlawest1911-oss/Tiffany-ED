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
import { UnifiedProtocol } from '@/data/unifiedRegistry';
import { cn } from "@/lib/utils";

interface NeuralLinkChatProps {
    protocol: UnifiedProtocol;
    className?: string;
}

export function NeuralLinkChat({ protocol, className }: NeuralLinkChatProps) {
    const { celebrate } = useCelebrate();
    const [prompt, setPrompt] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)
    const [response, setResponse] = useState("")
    const [copied, setCopied] = useState(false)
    const [isListening, setIsListening] = useState(false)

    // Reset chat when protocol changes
    useEffect(() => {
        setPrompt("");
        setResponse("");
    }, [protocol.id]);

    const handleGenerate = async () => {
        if (!prompt.trim()) return
        setIsGenerating(true)
        setResponse("")

        try {
            const res = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt,
                    generatorId: protocol.id,
                    systemInstruction: `
            ${(protocol as any).detailedPrompt || protocol.description}
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
        <div className={cn("flex flex-col h-full min-h-[500px] bg-black/40 border border-white/10 rounded-[2rem] overflow-hidden relative shadow-2xl", className)}>
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20 pointer-events-none" />

            {/* Interface Header */}
            <div className="p-6 border-b border-white/5 relative z-10 bg-white/[0.01]">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-noble-gold/10 flex items-center justify-center border border-noble-gold/20 shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                        <Icon className="w-6 h-6 text-noble-gold" strokeWidth={1.5} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black italic text-white uppercase tracking-tight">{protocol.name}</h3>
                        <div className="flex items-center gap-3">
                            <div className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-black text-emerald-500 uppercase tracking-widest">v4.2-Stable</div>
                            <span className="text-[9px] font-bold text-white/30 uppercase tracking-wider">Sync Active</span>
                        </div>
                    </div>
                </div>
                <p className="text-xs font-medium text-white/60 leading-relaxed border-l-2 border-noble-gold/30 pl-4">{protocol.description}</p>
            </div>

            {/* Interaction Zone */}
            <div className="p-6 flex-1 flex flex-col gap-6 relative z-10 overflow-hidden">
                {!response ? (
                    <>
                        <div className="space-y-3">
                            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Quick Directives</span>
                            <div className="flex flex-wrap gap-2">
                                {((protocol as any).prompts || ["Initial Draft", "Review Compliance", "Optimization Strategy"]).map((p: string, i: number) => (
                                    <button
                                        key={i}
                                        onClick={() => setPrompt(p)}
                                        className="px-3 py-2 rounded-lg bg-white/5 border border-white/5 hover:border-noble-gold/30 hover:bg-noble-gold/5 text-[10px] font-bold text-zinc-400 hover:text-white transition-all text-left uppercase tracking-wide"
                                    >
                                        <span className="text-noble-gold mr-2">➜</span> {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex-1 relative mt-2">
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder={`INITIATE ${protocol.name.toUpperCase()} PROTOCOL...`}
                                className="w-full h-full min-h-[150px] bg-black/50 border border-white/10 rounded-2xl p-6 text-white placeholder:text-zinc-700 font-mono text-sm resize-none focus:outline-none focus:border-noble-gold/50 transition-all shadow-inner relative z-10"
                            />
                            <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                                <button
                                    onClick={handleVoiceToggle}
                                    title={isListening ? "Stop listening" : "Start voice input"}
                                    className={`p-2.5 rounded-xl border border-white/5 transition-all ${isListening ? 'bg-red-500/20 text-red-400 border-red-500/50 animate-pulse' : 'bg-white/5 text-white/40 hover:text-white'}`}
                                >
                                    <Mic size={16} />
                                </button>
                                <button
                                    onClick={handleGenerate}
                                    disabled={!prompt.trim() || isGenerating}
                                    className="px-6 py-2.5 rounded-xl bg-noble-gold text-black font-black uppercase text-[10px] tracking-[0.2em] shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center gap-2"
                                >
                                    {isGenerating ? <Loader2 className="animate-spin" size={14} /> : <Zap size={14} fill="currentColor" />}
                                    {isGenerating ? "Synthesizing..." : "Execute"}
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em] flex items-center gap-2">
                                <Check size={12} strokeWidth={4} /> Synchronization Complete
                            </span>
                            <div className="flex gap-2">
                                <button onClick={() => setResponse("")} className="px-3 py-1.5 rounded-lg bg-white/5 text-[9px] font-black uppercase text-white/40 hover:text-white tracking-widest transition-all inline-flex items-center gap-2">
                                    <RefreshCw size={12} /> New Task
                                </button>
                                <button onClick={handleCopy} className="px-3 py-1.5 rounded-lg bg-noble-gold/10 text-[9px] font-black uppercase text-noble-gold hover:bg-noble-gold/20 tracking-widest transition-all inline-flex items-center gap-2">
                                    {copied ? <Check size={12} /> : <Copy size={12} />}
                                    {copied ? 'Copied' : 'Copy'}
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 bg-black/40 border border-white/10 rounded-2xl p-6 overflow-y-auto custom-scrollbar shadow-inner relative">
                            <div className="prose prose-invert prose-sm max-w-none">
                                <div className="text-zinc-300 font-medium leading-relaxed whitespace-pre-wrap font-sans text-sm">
                                    {response}
                                </div>
                            </div>
                            <div className="absolute bottom-6 right-6 opacity-5 pointer-events-none">
                                <Shield size={80} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
