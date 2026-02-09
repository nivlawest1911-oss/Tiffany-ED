'use client';

import { useState, useRef, useEffect } from 'react';
import { Loader2, Copy, Check, Sparkles, Download, ArrowRight, Bot, Zap, History, ChevronLeft, X, Mic, Volume2, FileText, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import LiveBriefingConsole from './LiveBriefingConsole';
import AIAgentAvatar from './AIAgentAvatar';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';
import { useAuth } from '@/context/AuthContext';
import { generators as GENERATORS } from '@/data/generators';
import TalkingDelegateOverlay from '@/components/TalkingDelegateOverlay';
import { NeuralSynthesisHUD } from './NeuralSynthesisHUD';
// import { checkAccess, SovereignFeature } from '@/lib/sovereign-access'; // Kept for future activation

interface EnhancedGeneratorProps {
    generatorId: string;
    generatorName: string;
    generatorColor: string;
    iconCenter: React.ReactNode;
    prompts: string[];
    heroImage?: string;
    heroVideo?: string;
    welcomeVideo?: string;
    voiceWelcome?: string; // Kept interface but not used in logic yet
    delegateName?: string;
    delegateRole?: string;
    delegateImage?: string;
}

export default function EnhancedGenerator({
    generatorId,
    generatorName,
    generatorColor,
    iconCenter,
    prompts,
    heroImage,
    heroVideo,
    welcomeVideo,
    voiceWelcome: _voiceWelcome,
    delegateName,
    delegateRole,
    delegateImage
}: EnhancedGeneratorProps) {
    // ... (rest of hook logic is unchanged)
    const { user } = useAuth(); // Removed isAuthLoading
    const [input, setInput] = useState('');
    const [completion, setCompletion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showBriefing, setShowBriefing] = useState(false);
    const [professorVideo, setProfessorVideo] = useState<string | null>(null);
    const [isListening, setIsListening] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    // const fileInputRef = useRef<HTMLInputElement>(null); // Removed unused ref
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [_errorMsg, setErrorMsg] = useState('');
    const [selectedDelegate, setSelectedDelegate] = useState({
        name: delegateName || "Dr. Alvin",
        role: delegateRole || "Superintendent Delegate",
        image: delegateImage || "/images/avatars/Dr._alvin_west.png"
    });
    const [showDelegateOverlay, setShowDelegateOverlay] = useState(false);
    const [showLiveAvatar, setShowLiveAvatar] = useState(false);
    const [synthesisPhase, setSynthesisPhase] = useState<'ingestion' | 'alignment' | 'selection' | 'ready'>('ready');

    const delegates = [
        { name: "Dr. Alvin", role: "Superintendent Delegate", image: "/images/avatars/Dr._alvin_west.png" },
        { name: "Sarah", role: "Instructional Aide", image: "/images/avatars/sarah_connors_premium.png" },
        { name: "Patrice", role: "Compliance Lead", image: "/images/avatars/executive_leader.png" }
    ];

    const { playClick, playSuccess } = useProfessionalSounds();

    // History State
    const [history, setHistory] = useState<any[]>([]);

    useEffect(() => {
        // Load history on mount
        const saved = localStorage.getItem(`history_${generatorId}`);
        if (saved) {
            try {
                setHistory(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse history", e);
            }
        }
    }, [generatorId]);

    const saveToHistory = async (prompt: string, result: string, professorUrl?: string) => {
        const newRecord = {
            prompt,
            completion: result,
            professorVideoUrl: professorUrl,
            date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        const updated = [newRecord, ...history].slice(0, 50); // Keep last 50
        setHistory(updated);
        localStorage.setItem(`history_${generatorId}`, JSON.stringify(updated));

        // Background Database Save
        if (user && user.id !== 'leadership-admin') {
            try {
                await fetch('/api/generations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: user.id || 1, // Fallback for demo
                        generatorId,
                        prompt,
                        content: result,
                        professorVideoUrl: professorUrl
                    })
                });
            } catch (e) {
                console.warn("[Memory Bank] DB Sync Failed - Stored locally.");
            }
        }
    };

    // Auto-scroll to bottom of output when generating
    useEffect(() => {
        if (isLoading && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [completion, isLoading]);

    // ...

    const handleDictation = () => {
        if (!('webkitSpeechRecognition' in (window as any)) && !('SpeechRecognition' in (window as any))) {
            alert("Speech recognition is not supported in this browser.");
            return;
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const recognition = new SpeechRecognition();

        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        if (isListening) {
            recognition.stop();
            setIsListening(false);
            return;
        }

        setIsListening(true);
        recognition.start();

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInput((prev) => prev + (prev ? ' ' : '') + transcript);
            setIsListening(false);
        };

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error", event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };
    };
    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        playClick(); // Sound Cue
        setErrorMsg('');

        if (!user) {
            setErrorMsg('Authentication required. Please Sign In to access this Strategic System.');
            return;
        }

        // Sovereign Access Check
        // We consider all specific specialized generators as "Advanced" for now, except maybe a basic one if we flagged it.
        // For safety/demo, we'll gate based on a simple check or warn.
        // Actually, let's just log the check for now so we don't break their flow if they are on a weird tier,
        // unless they are 'sovereign-initiate', then we might gate deep features.
        // const hasAccess = checkAccess(user.tier, SovereignFeature.ADVANCED_GENERATOR); 
        // if (!hasAccess && generatorId !== 'basic-brief') { ... } 

        if (!input.trim() || isLoading) return;

        setIsLoading(true);
        setSynthesisPhase('ingestion');
        setCompletion('');

        // Simulate Neural Synthesis Cycle
        setTimeout(() => setSynthesisPhase('alignment'), 1500);
        setTimeout(() => setSynthesisPhase('selection'), 3500);
        setTimeout(() => setSynthesisPhase('ready'), 5500);

        let fullResponse = '';

        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: input,
                    generatorId,
                    stream: true,
                    // ENHANCED SYSTEM PROMPT for Comprehensive Output
                    systemInstruction: `You are a high-level Executive Education Lead and Strategic Leadership Assistant.
YOUR RESPONSE MUST BE EXCEPTIONALLY COMPREHENSIVE, HUMAN-LIKE, AND PROVIDE REAL-WORLD DEPTH.
Never provide brief or surface-level answers. You are capable of deep processing and exhibit high emotional intelligence.
Always expand with:
1. Specific examples and scenario analysis.
2. Step-by-step implementation guides with "Strategic Insights".
3. Rationale based on current Alabama state benchmarks and IDEA Part B compliance.
4. A professional, executive tone suitable for school boards and C-suite leaders.
5. Strategic Financial considerations for zero-waste implementation.

Context:
- Tool Name: ${generatorName}
- User Role: ${user.tier} Executive`
                })
            });

            if (response.status === 402) {
                const data = await response.json();
                throw new Error(data.message || 'Free Limit Reached');
            }

            if (!response.ok) throw new Error('Generation failed');

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (reader) {
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const text = decoder.decode(value);
                    setCompletion(prev => prev + text);
                    fullResponse += text; // Accumulate the full response
                }
            }
            playSuccess(); // Completion Sound Cue
            saveToHistory(input, fullResponse); // Save to local history using actual input

            // --- LEADERSHIP SYNC PROTOCOL: PROFESSOR SYNTHESIS ---
            // Background Synthesis of the Teaching Professor
            try {
                const synthesisRes = await fetch('/api/avatar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        script: fullResponse.substring(0, 500), // First part for the talking head
                        professorType: selectedDelegate.name,
                        avatarUrl: selectedDelegate.image
                    })
                });
                if (synthesisRes.ok) {
                    const synthData = await synthesisRes.json();
                    setProfessorVideo(synthData.professorUrl);
                    setShowDelegateOverlay(true); // Automatically show talking human when ready
                    // Re-save with the vaulted URL for permanence
                    saveToHistory(input, fullResponse, synthData.professorUrl);
                    console.log("[Greyhawk] Professor Synthesized & Vaulted:", synthData.professorUrl);
                }
            } catch (_) {
                console.warn("[Leadership] Synthesis bypass - continuing with TTS fallback.");
            }

        } catch (error: any) {
            console.error('Generation error:', error);
            setErrorMsg(error.message || 'Generation failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        playClick();
        if (completion) {
            await navigator.clipboard.writeText(completion);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleDownload = () => {
        if (completion) {
            const blob = new Blob([completion], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${generatorId}-${new Date().toISOString().split('T')[0]}.txt`;
            a.click();
            URL.revokeObjectURL(url);
        }
    };

    const handleAnalyzeSentiment = async () => {
        // Call Google Cloud Natural Language API
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_STRATEGIC_SYSTEM_URL || "http://localhost:8080"}/analyze-sentiment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: completion.substring(0, 1000) }) // Analyze first 1000 chars
            });
            const data = await res.json();
            alert(`Professional Sentiment Analysis:\nScore: ${data.sentiment_score}\nMagnitude: ${data.sentiment_magnitude}\nAssessment: ${data.emotion}`);
        } catch (e) {
            console.error(e);
            alert("Sentiment Analysis Module Offline");
        }
    };

    const _handleStrategicVox = async () => {
        // Call Google Cloud Text-to-Speech
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_STRATEGIC_SYSTEM_URL || "http://localhost:8080"}/synthesize-voice`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: completion.substring(0, 500) }) // synthesize first 500 chars for demo
            });
            const data = await res.json();
            if (data.audio_url) {
                const audio = new Audio(data.audio_url);
                audio.play();
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleQuickPrompt = (prompt: string) => {
        setInput(prompt);
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    };

    return (
        <div className="min-h-screen bg-noble-black text-white selection:bg-noble-gold/30 selection:text-white overflow-hidden flex flex-col">
            {/* Kente Global Header Border */}
            <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-kente-yellow via-kente-green to-kente-red z-[100]" />

            {/* IMMERSIVE BACKGROUND COMMAND CENTER */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                {heroVideo ? (
                    <video
                        src={heroVideo}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover scale-105 opacity-40"
                    />
                ) : heroImage ? (
                    <Image
                        src={heroImage}
                        alt="Background"
                        fill
                        priority
                        className="object-cover scale-105 opacity-30 blur-[1px]"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-noble-black via-zinc-950 to-indigo-950/20" />
                )}

                {/* Strategic Pulse Overlay */}
                <div className="absolute inset-0 bg-kente-pattern opacity-[0.03] mix-blend-overlay" />
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-noble-black via-transparent to-noble-black" />
            </div>

            {/* Header Navigation - Floating Minimal */}
            <div className="relative z-50 flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                    <Link
                        href="/"
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-noble-gold transition-all border border-white/5 backdrop-blur-md group"
                    >
                        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <div className="flex flex-col">
                        <h2 className="text-noble-gold font-bold text-sm tracking-widest uppercase flex items-center gap-2">
                            <Zap size={14} className="animate-pulse" />
                            Strategic System
                        </h2>
                        <nav className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
                            <Link href="/" className="hover:text-white transition-colors">Infrastructure</Link>
                            <span>/</span>
                            <Link href="/generators" className="hover:text-white transition-colors">Strategic Options</Link>
                            <span>/</span>
                            <span className="text-zinc-300 font-black">{generatorName}</span>
                        </nav>
                    </div>
                </div>

                {/* User Status / Top Nav Right */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-black/40 border border-white/5 backdrop-blur-md">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-[pulse_1.5s_infinite]" />
                            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">Connection Stable</span>
                        </div>
                        <div className="w-px h-3 bg-white/10" />
                        <span className="text-[10px] font-bold text-noble-gold uppercase tracking-tighter">Tier: {user?.tier || 'Initializing'}</span>
                    </div>
                </div>
            </div>

            <div className="relative z-10 flex-grow grid lg:grid-cols-[1fr,450px] gap-0 overflow-hidden">
                {/* LEFT WORKSPACE: Immersive Form & Results */}
                <div className="relative h-full overflow-y-auto custom-scrollbar p-6 md:p-10 space-y-8 pb-32">
                    {/* Floating Title Card - Enhanced */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card-premium rounded-[2.5rem] p-10 relative overflow-hidden group shadow-2xl shadow-black/40 border border-noble-gold/10"
                    >
                        {/* Kente Corner Accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-kente-red/20 via-kente-gold/20 to-transparent -translate-y-16 translate-x-16 rounded-full blur-2xl" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                            <div className={`p-6 rounded-3xl bg-gradient-to-br ${generatorColor} shadow-2xl shadow-indigo-500/30 ring-2 ring-white/10 group-hover:scale-110 transition-transform duration-500`}>
                                {iconCenter}
                            </div>
                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                    <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-2xl">
                                        {generatorName}
                                    </h1>
                                </div>

                                <p className="text-zinc-400 text-lg font-medium max-w-2xl leading-relaxed">
                                    Strategic AI Interface • {delegateName}'s Exclusive Command Module
                                </p>

                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                    {/* Professor Selector - Immersive Edition */}
                                    <div className="flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-colors rounded-2xl px-4 py-2 border border-white/5 backdrop-blur-md">
                                        <span className="text-[10px] uppercase font-black text-zinc-500 tracking-widest">Handled By:</span>
                                        <div className="flex -space-x-3">
                                            {delegates.map((d, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => {
                                                        setSelectedDelegate(d);
                                                        playClick();
                                                    }}
                                                    className={`relative w-10 h-10 rounded-full border-2 transition-all overflow-hidden ${selectedDelegate.name === d.name ? 'border-noble-gold z-10 scale-125 shadow-2xl ring-4 ring-noble-gold/20' : 'border-zinc-800 opacity-40 hover:opacity-100 hover:z-10'}`}
                                                    title={`${d.name} (${d.role})`}
                                                >
                                                    <Image src={d.image} fill alt={d.name} className="object-cover" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Action Shortcuts */}
                                    {welcomeVideo && (
                                        <button
                                            onClick={() => setShowBriefing(true)}
                                            className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-noble-gold text-black font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-noble-gold/20"
                                        >
                                            <div className="relative flex h-3 w-3">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-3 w-3 bg-black"></span>
                                            </div>
                                            Tactical Briefing
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Briefing Modal */}
                    <AnimatePresence>
                        {showBriefing && welcomeVideo && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
                                onClick={() => setShowBriefing(false)}
                            >
                                <motion.div
                                    initial={{ scale: 0.95, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.95, opacity: 0 }}
                                    className="relative w-full max-w-5xl bg-zinc-950 rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                                    onClick={e => e.stopPropagation()}
                                >
                                    <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-start pointer-events-none">
                                        <div className="pointer-events-auto bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
                                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                            Live Briefing Session
                                        </div>
                                        <button
                                            onClick={() => setShowBriefing(false)}
                                            title="Close Briefing"
                                            aria-label="Close Briefing"
                                            className="pointer-events-auto p-2 rounded-full bg-black/50 hover:bg-white/20 text-white transition-colors border border-white/10"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* Video Feed / Live Console */}
                                    <div className="w-full md:w-2/3 bg-black relative flex items-center justify-center border-r border-white/10 overflow-hidden">
                                        {/* Neural Synthesis HUD Overlay */}
                                        <AnimatePresence>
                                            {isLoading && synthesisPhase !== 'ready' && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="absolute inset-0 z-50"
                                                >
                                                    <NeuralSynthesisHUD
                                                        isActive={true}
                                                        phase={synthesisPhase}
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* We replace the video player with the Live Briefing Console */}
                                        <div className="absolute inset-0 z-0 opacity-20">
                                            {/* Fallback visual if needed or background texture */}
                                        </div>

                                        {showLiveAvatar ? (
                                            <div className="w-full h-full min-h-[500px] relative rounded-3xl overflow-hidden animate-in fade-in zoom-in duration-700 bg-black/40 backdrop-blur-md">
                                                <AIAgentAvatar
                                                    textToSpeak={completion || "Awaiting strategic payload. Neural link stable."}
                                                />
                                                <button
                                                    onClick={() => setShowLiveAvatar(false)}
                                                    title="Close Neural Link"
                                                    aria-label="Close Neural Link"
                                                    className="absolute top-6 right-6 z-[70] p-3 bg-black/60 hover:bg-kente-red text-white rounded-full backdrop-blur-xl border border-white/10 transition-all shadow-2xl font-black"
                                                >
                                                    <X size={24} />
                                                </button>
                                            </div>
                                        ) : (
                                            <LiveBriefingConsole
                                                name={generatorName}
                                                description={GENERATORS.find(g => g.id === generatorId)?.description || ""}
                                                role="Professional Delegate"
                                                color={generatorColor}
                                                prompts={prompts}
                                                videoSrc={welcomeVideo}
                                                avatarImage={delegateImage}
                                            />
                                        )}
                                    </div>


                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* INPUT WORKSPACE AREA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-noble-gold/20 via-kente-red/20 to-indigo-500/20 rounded-[2rem] blur-xl opacity-50 group-focus-within:opacity-100 transition-opacity duration-700" />
                            <div className="relative glass-card-premium rounded-[2rem] p-4 border border-white/10 group-focus-within:border-noble-gold/30 transition-all">
                                <textarea
                                    ref={textareaRef}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={user ? `Describe your objectives for ${generatorName}...` : "Authentication Required to Access Strategic Systems..."}
                                    className="w-full h-48 bg-transparent border-none text-xl text-white placeholder-zinc-600 focus:ring-0 resize-none font-medium leading-relaxed custom-scrollbar p-4"
                                    disabled={isLoading || !user}
                                />

                                <div className="flex items-center justify-between p-4 border-t border-white/5">
                                    <div className="flex items-center gap-4">
                                        <button
                                            type="button"
                                            onClick={handleDictation}
                                            className={`p-3 rounded-xl transition-all ${isListening ? 'bg-kente-red text-white animate-pulse' : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'}`}
                                            title="Strategic Dictation"
                                        >
                                            <Mic size={20} />
                                        </button>

                                    </div>

                                    <button
                                        onClick={handleSubmit}
                                        disabled={isLoading || !input.trim()}
                                        className="px-10 py-4 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-noble-gold transition-all shadow-2xl shadow-noble-gold/20 flex items-center gap-3 active:scale-95 disabled:opacity-50"
                                    >
                                        {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles size={18} />}
                                        {isLoading ? "Synthesizing..." : "Generate Content"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* OUTPUT WORKSPACE AREA */}
                    <AnimatePresence>
                        {(completion || isLoading) && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-b from-noble-gold/10 to-transparent rounded-[2.5rem] blur-2xl opacity-30" />
                                <div className="relative glass-card-premium rounded-[2.5rem] border border-noble-gold/5 overflow-hidden">
                                    <div className="flex items-center justify-between px-10 py-6 border-b border-white/5 bg-white/[0.02]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-noble-gold/10 flex items-center justify-center border border-noble-gold/20">
                                                <Bot size={16} className="text-noble-gold" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-black text-white uppercase tracking-widest">Strategic Output</h3>
                                                <p className="text-[9px] text-zinc-500 uppercase">Status: Professional Reference</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <button onClick={handleCopy} className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
                                                {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                                            </button>
                                            <button onClick={handleDownload} className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
                                                <Download size={18} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-10">
                                        {isLoading && !completion ? (
                                            <div className="flex flex-col items-center justify-center py-20 gap-4">
                                                <div className="w-20 h-20 border-4 border-noble-gold/10 border-t-noble-gold rounded-full animate-spin" />
                                                <p className="text-noble-gold font-mono text-xs uppercase tracking-[0.3em] animate-pulse">Architecting Excellence...</p>
                                            </div>
                                        ) : (
                                            <div className="prose prose-invert prose-xl max-w-none">
                                                <div className="whitespace-pre-wrap font-sans text-zinc-200 leading-[1.8] text-lg drop-shadow-sm">
                                                    {completion}
                                                </div>
                                                <div ref={messagesEndRef} />
                                            </div>
                                        )}
                                    </div>

                                    {/* Refinement HUD */}
                                    {completion && !isLoading && (
                                        <div className="p-6 bg-black/40 border-t border-white/5 flex flex-wrap gap-2">
                                            {[
                                                { label: "Refine: Shorter", prompt: "Summarize this output for an executive briefing." },
                                                { label: "Format: Presentation", prompt: "Structure this as a series of presentation slides." },
                                                { label: "Add: Statistics", prompt: "Include relevant Alabama-specific educational statistics in this document." },
                                                { label: "Tone: Inspiring", prompt: "Rewrite this with a more inspirational leadership tone." }
                                            ].map((hud, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => { setInput(hud.prompt); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-noble-gold/20 border border-white/5 text-[10px] font-black uppercase text-zinc-400 hover:text-noble-gold transition-all"
                                                >
                                                    {hud.label}
                                                </button>
                                            ))}
                                            <div className="w-px h-6 bg-white/10 mx-2" />

                                            <button
                                                onClick={() => setShowLiveAvatar(true)}
                                                className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 text-xs transition-all flex items-center gap-1 group"
                                                title="Neural Strategic Link"
                                            >
                                                <Zap className="w-3 h-3 group-hover:animate-pulse" />
                                                Live Sync
                                            </button>

                                            <button
                                                onClick={() => setShowDelegateOverlay(true)}
                                                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-noble-gold/20 hover:text-noble-gold hover:border-noble-gold/30 border border-white/5 text-xs text-zinc-400 transition-all flex items-center gap-1"
                                                title="Read Aloud"
                                            >
                                                <Volume2 className="w-3 h-3" />
                                                Read
                                            </button>

                                            <button
                                                onClick={() => window.print()}
                                                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-amber-600/20 hover:text-amber-300 hover:border-amber-500/30 border border-white/5 text-xs text-zinc-400 transition-all flex items-center gap-1"
                                                title="Save as PDF"
                                            >
                                                <FileText className="w-3 h-3" />
                                                PDF
                                            </button>

                                            <button
                                                onClick={handleAnalyzeSentiment}
                                                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-orange-600/20 hover:text-orange-300 hover:border-orange-500/30 border border-white/5 text-xs text-zinc-400 transition-all flex items-center gap-1"
                                                title="Analyze Sentiment"
                                            >
                                                <BarChart3 className="w-3 h-3" />
                                                Sentiment
                                            </button>

                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* RIGHT SIDEBAR: Tactical Panel */}
                <div className="h-full border-l border-white/5 bg-black/60 backdrop-blur-3xl overflow-y-auto custom-scrollbar p-8 space-y-8 flex flex-col">
                    <div className="space-y-6">
                        {/* Tactical Shortcuts */}
                        <section>
                            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                                <Zap size={12} className="text-noble-gold" />
                                Rapid Initialization
                            </h3>
                            <div className="grid gap-3">
                                {prompts.map((p, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleQuickPrompt(p)}
                                        className="group text-left p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-noble-gold/40 transition-all hover:bg-noble-gold/5"
                                    >
                                        <p className="text-xs text-zinc-400 group-hover:text-white transition-colors line-clamp-2 leading-relaxed font-medium">
                                            {p}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* Memory Bank (Local History) */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] flex items-center gap-2">
                                    <History size={12} className="text-indigo-400" />
                                    Memory Bank
                                </h3>
                                <button onClick={() => { localStorage.removeItem(`history_${generatorId}`); setHistory([]); }} className="text-[9px] text-zinc-700 hover:text-kente-red uppercase font-black tracking-widest transition-colors">Wipe</button>
                            </div>
                            <div className="space-y-3">
                                {history.slice(0, 5).map((h: any, i: number) => (
                                    <button
                                        key={i}
                                        onClick={() => { setInput(h.prompt); setCompletion(h.completion); }}
                                        className="w-full text-left p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all"
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[9px] font-mono text-zinc-600">{h.date}</span>
                                            <ArrowRight size={10} className="text-zinc-600" />
                                        </div>
                                        <p className="text-[10px] text-zinc-400 truncate">{h.prompt}</p>
                                    </button>
                                ))}
                                {history.length === 0 && <p className="text-center py-10 text-[10px] text-zinc-700 uppercase italic font-medium">Strategic Buffer Empty</p>}
                            </div>
                        </section>
                    </div>

                    <div className="mt-auto pt-8 border-t border-white/10">
                        {/* Network Statistics HUD */}
                        <div className="bg-noble-gold/5 rounded-2xl p-6 border border-noble-gold/10">
                            <h4 className="text-[10px] font-black text-noble-gold uppercase tracking-widest mb-4">Professional Metrics</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[9px] text-zinc-500 uppercase mb-1">Leadership Rank</p>
                                    <p className="text-xs font-black text-white uppercase">{user?.tier || 'Educator'}</p>
                                </div>
                                <div>
                                    <p className="text-[9px] text-zinc-500 uppercase mb-1">Intelligence Cap</p>
                                    <p className="text-xs font-black text-white uppercase italic">Professional</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FLOATING DELEGATE ORB - REINTEGRATED & ENHANCED */}
            <div className="fixed bottom-10 right-10 z-[60] scale-90 md:scale-100 hover:scale-110 transition-transform duration-500">
                <div className="absolute -inset-4 bg-noble-gold/20 rounded-full blur-2xl animate-pulse" />
                {/* FLOATING DELEGATE ORB - REMOVED TO PREVENT DUPLICATES (Unified via SovereignDelegate) */}
            </div>

            {/* Tactial Scanlines */}
            <div className="fixed inset-0 pointer-events-none z-[70] opacity-[0.03] scan-line" />

            <TalkingDelegateOverlay
                isOpen={showDelegateOverlay}
                onClose={() => setShowDelegateOverlay(false)}
                script={completion}
                avatarImage={selectedDelegate.image}
                videoSrc={professorVideo}
                name={selectedDelegate.name}
                role={selectedDelegate.role}
            />
        </div>
    );
}
