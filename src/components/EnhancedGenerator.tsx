'use client';

import { useState, useRef, useEffect } from 'react';
import { Loader2, Copy, Check, Sparkles, Download, ArrowRight, Bot, Zap, History, ChevronLeft, X, Mic, Volume2, FileText, BarChart3, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import VideoPlayer from './VideoPlayer';
import VoiceIdentity from './VoiceIdentity';
import SovereignDelegate from './SovereignDelegate';
import LiveBriefingConsole from './LiveBriefingConsole';
import useSovereignSounds from '@/hooks/useSovereignSounds';
import { useAuth } from '@/context/AuthContext';
import { GENERATORS } from '@/data/generators';

interface EnhancedGeneratorProps {
    generatorId: string;
    generatorName: string;
    generatorColor: string;
    iconNode: React.ReactNode;
    prompts: string[];
    heroImage?: string;
    heroVideo?: string;
    welcomeVideo?: string;
    voiceWelcome?: string;
    delegateName?: string;
    delegateRole?: string;
    delegateImage?: string;
}

export default function EnhancedGenerator({
    generatorId,
    generatorName,
    generatorColor,
    iconNode,
    prompts,
    heroImage,
    heroVideo,
    welcomeVideo,
    voiceWelcome,
    delegateName,
    delegateRole,
    delegateImage
}: EnhancedGeneratorProps) {
    // ... (rest of hook logic is unchanged)
    const { user, isLoading: isAuthLoading } = useAuth();
    const [input, setInput] = useState('');
    const [completion, setCompletion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showBriefing, setShowBriefing] = useState(false);
    const [professorVideo, setProfessorVideo] = useState<string | null>(null);
    const [isListening, setIsListening] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [selectedDelegate, setSelectedDelegate] = useState({
        name: delegateName || "Dr. Alvin",
        role: delegateRole || "Superintendent Delegate",
        image: delegateImage || "/images/dr_alvin_west.png"
    });

    const delegates = [
        { name: "Dr. Alvin", role: "Superintendent Delegate", image: "/images/dr_alvin_west.png" },
        { name: "Sarah", role: "Instructional Aide", image: "/images/avatars/female_leader.png" },
        { name: "Patrice", role: "Compliance Lead", image: "/images/avatars/executive_leader.png" }
    ];

    const { playClick, playSuccess } = useSovereignSounds();

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
        if (user && user.id !== 'sovereign-001') {
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

        // @ts-ignore - SpeechRecognition types are tricky
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
            setErrorMsg('Authentication required. Please Sign In to access this Sovereign Protocol.');
            return;
        }

        if (!input.trim() || isLoading) return;

        setIsLoading(true);
        setCompletion('');
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
                    systemInstruction: `You are a high-level Senior Educational Consultant and Sovereign AI Delegate assigned to assist an educational leader.
YOUR RESPONSE MUST BE EXCEPTIONALLY COMPREHENSIVE, HUMAN-LIKE, AND PROVIDE REAL-WORLD DEPTH.
Never provide brief or surface-level answers. Always expand with:
1. Specific examples and scenario analysis
2. Step-by-step implementation guides with "Sovereign Insights"
3. Rationale based on current Alabama state benchmarks and IDEA Part B compliance
4. A professional, executive tone suitable for school boards and C-suite leaders.
5. Strategic Financial considerations where applicable.

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

            // --- GREYHAWK 10 PROTOCOL: PROFESSOR SYNTHESIS ---
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
                    // Re-save with the vaulted URL for permanence
                    saveToHistory(input, fullResponse, synthData.professorUrl);
                    console.log("[Greyhawk] Professor Synthesized & Vaulted:", synthData.professorUrl);
                }
            } catch (synthErr) {
                console.warn("[Greyhawk] Synthesis bypass - continuing with TTS fallback.");
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
        // Call Google Cloud Natural Language API (via Sovereign Brain)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SOVEREIGN_BRAIN_URL || "http://localhost:8080"}/analyze-sentiment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: completion.substring(0, 1000) }) // Analyze first 1000 chars
            });
            const data = await res.json();
            alert(`Sovereign Sentiment Analysis:\nScore: ${data.sentiment_score}\nMagnitude: ${data.sentiment_magnitude}\nAssessment: ${data.emotion}`);
        } catch (e) {
            console.error(e);
            alert("Sentiment Analysis Module Offline");
        }
    };

    const handleNeuralTTS = async () => {
        // Call Google Cloud Text-to-Speech (via Sovereign Brain)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SOVEREIGN_BRAIN_URL || "http://localhost:8080"}/synthesize-voice`, {
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
            alert("Neural Voice Module Offline");
        }
    };

    const handleQuickPrompt = (prompt: string) => {
        setInput(prompt);
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0B] text-white selection:bg-indigo-500/30">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
            </div>

            {/* Sovereign Delegate Orb */}
            <SovereignDelegate
                name={selectedDelegate.name}
                role={selectedDelegate.role}
                avatarImage={selectedDelegate.image}
                videoSrc={professorVideo || welcomeVideo} // Play generated video if available, else welcome
                voiceSrc={voiceWelcome}
                color={generatorColor.includes('gradient') ? generatorColor : "from-indigo-500 to-purple-600"}
                completionText={completion}
                theme="sovereign"
                guideMode={true}
                isLoading={isLoading}
            />

            <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-8">
                {/* Header Navigation */}
                <div className="flex items-center gap-4 mb-8">
                    <Link
                        href="/"
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors border border-white/5"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <nav className="flex items-center gap-2 text-sm text-zinc-500">
                        <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/generators" className="hover:text-zinc-300 transition-colors">Generators</Link>
                        <span>/</span>
                        <span className="text-zinc-300">{generatorName}</span>
                    </nav>
                </div>

                <div className="grid lg:grid-cols-[1fr,400px] gap-8">
                    {/* LEFT COLUMN: Main Interface */}
                    <div className="space-y-6">
                        {/* Title Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 relative overflow-hidden group min-h-[200px] flex items-center"
                        >
                            {heroVideo ? (
                                <div className="absolute inset-0 z-0">
                                    <video
                                        src={heroVideo}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent" />
                                </div>
                            ) : heroImage ? (
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={heroImage}
                                        alt={`${generatorName} Background`}
                                        fill
                                        className="object-cover opacity-60 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
                                </div>
                            ) : null}

                            <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${generatorColor} z-0`} />

                            <div className="relative z-10 flex flex-col md:flex-row items-start gap-6">
                                <div className={`p-4 rounded-2xl bg-gradient-to-br ${generatorColor} shadow-lg shadow-indigo-500/20 ring-1 ring-white/10`}>
                                    {iconNode}
                                </div>
                                <div className="space-y-2 flex-grow">
                                    <h1 className="text-4xl font-bold tracking-tight font-sans text-white drop-shadow-md">
                                        {generatorName}
                                    </h1>
                                    <p className="text-zinc-300 max-w-xl font-medium drop-shadow-sm mb-4">
                                        Advanced AI Assistant • Specialized for Educational Leadership
                                    </p>

                                    <div className="flex flex-wrap items-center gap-4">
                                        {/* Briefing Button */}
                                        {welcomeVideo && (
                                            <button
                                                onClick={() => setShowBriefing(true)}
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all text-sm font-semibold text-white group/briefing"
                                            >
                                                <div className="relative flex h-3 w-3">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                                                </div>
                                                Receive Delegate Briefing
                                            </button>
                                        )}

                                        {/* Professor Selector */}
                                        <div className="flex items-center gap-2 bg-black/30 rounded-full px-3 py-1.5 border border-white/10">
                                            <span className="text-[10px] uppercase font-bold text-zinc-500 ml-1">Assigned To:</span>
                                            <div className="flex -space-x-2">
                                                {delegates.map((d, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => {
                                                            setSelectedDelegate(d);
                                                            playClick();
                                                        }}
                                                        className={`relative w-8 h-8 rounded-full border-2 transition-all overflow-hidden ${selectedDelegate.name === d.name ? 'border-indigo-500 z-10 scale-110 shadow-lg' : 'border-zinc-800 opacity-50 hover:opacity-100 hover:z-10'}`}
                                                        title={`${d.name} (${d.role})`}
                                                    >
                                                        <Image src={d.image} fill alt={d.name} className="object-cover" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Voice Identity */}
                                        {voiceWelcome && (
                                            <VoiceIdentity src={voiceWelcome} label="Executive Uplink" />
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
                                                Live Briefing Protocol
                                            </div>
                                            <button
                                                onClick={() => setShowBriefing(false)}
                                                className="pointer-events-auto p-2 rounded-full bg-black/50 hover:bg-white/20 text-white transition-colors border border-white/10"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>

                                        {/* Video Feed / Live Console */}
                                        <div className="w-full md:w-2/3 bg-black relative flex items-center justify-center border-r border-white/10 overflow-hidden">
                                            {/* We replace the video player with the Live Briefing Console */}
                                            <div className="absolute inset-0 z-0 opacity-20">
                                                {/* Fallback visual if needed or background texture */}
                                            </div>

                                            <LiveBriefingConsole
                                                name={generatorName}
                                                description={GENERATORS.find(g => g.id === generatorId)?.description || ""}
                                                role="Sovereign Delegate"
                                                color={generatorColor}
                                                prompts={prompts}
                                                videoSrc={welcomeVideo}
                                                avatarImage={delegateImage}
                                            />
                                        </div>

                                        {/* Tactical Data Panel */}
                                        <div className="w-full md:w-1/3 p-8 bg-zinc-900/50 flex flex-col justify-center border-l border-white/5 relative">
                                            <div className="space-y-6">
                                                <div>
                                                    <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Protocol Target</h3>
                                                    <h2 className="text-2xl font-bold text-white leading-tight">{generatorName}</h2>
                                                </div>

                                                <div className="h-px w-full bg-white/10" />

                                                <div>
                                                    <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Objective Analysis</h3>
                                                    <p className="text-sm text-zinc-300 leading-relaxed">
                                                        {GENERATORS.find(g => g.id === generatorId)?.description || "Execute high-level educational strategy."}
                                                    </p>
                                                </div>

                                                <div className="space-y-3">
                                                    <div className="flex justify-between items-center p-3 rounded-lg bg-black/20 border border-white/5">
                                                        <span className="text-xs text-zinc-400 font-mono uppercase">Clearance</span>
                                                        <span className="text-xs text-amber-400 font-bold font-mono uppercase">Sovereign Executive</span>
                                                    </div>
                                                    <div className="flex justify-between items-center p-3 rounded-lg bg-black/20 border border-white/5">
                                                        <span className="text-xs text-zinc-400 font-mono uppercase">Neural Status</span>
                                                        <span className="text-xs text-emerald-400 font-bold font-mono uppercase animate-pulse">Active</span>
                                                    </div>
                                                </div>

                                                <div className="bg-indigo-900/20 p-4 rounded-xl border border-indigo-500/20 mt-4">
                                                    <div className="flex items-start gap-3">
                                                        <Bot className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                                                        <div>
                                                            <h4 className="text-xs font-bold text-indigo-300 uppercase mb-1">Delegate Insight</h4>
                                                            <p className="text-[11px] text-indigo-200/80 leading-relaxed">
                                                                "I am ready to assist. Engage the protocol when you are prepared, Principal."
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Input Area */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-zinc-900/30 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
                        >
                            {errorMsg && (
                                <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                    {errorMsg}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="relative group">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-20 group-focus-within:opacity-100 transition duration-500 blur-sm"></div>
                                    <textarea
                                        ref={textareaRef}
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder={user ? `Describe what you need from ${generatorName}...` : "Please Sign In to Initialize Protocol..."}
                                        className="relative w-full h-40 bg-zinc-950 border border-white/10 rounded-xl p-5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-white/20 resize-none leading-relaxed transition-all"
                                        disabled={isLoading || !user}
                                    />
                                    <div className="absolute top-4 right-4 flex gap-2">
                                        {/* Voice Dictation Button */}
                                        <button
                                            type="button"
                                            onClick={handleDictation}
                                            className={`p-1 rounded-md transition-colors ${isListening ? 'text-red-500 bg-red-500/10 animate-pulse' : 'text-zinc-500 hover:text-white hover:bg-white/10'}`}
                                            title="Voice Dictation"
                                        >
                                            <Mic className="w-4 h-4" />
                                        </button>

                                        {/* Clear Button */}
                                        {input && (
                                            <button
                                                type="button"
                                                onClick={() => { setInput(''); if (textareaRef.current) textareaRef.current.focus(); }}
                                                className="p-1 rounded-md text-zinc-500 hover:text-white hover:bg-white/10 transition-colors"
                                                title="Clear Input"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                        <div className="text-xs font-mono text-zinc-600 bg-zinc-900/50 px-2 py-1 rounded-md border border-white/5">
                                            {input.length} chars
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={isLoading || !input.trim()}
                                        className="relative inline-flex items-center gap-2 px-8 py-4 bg-white text-zinc-950 rounded-xl font-bold text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                GENERATING...
                                            </>
                                        ) : !user ? (
                                            <>
                                                <Zap className="w-4 h-4 text-zinc-400" />
                                                SIGN IN REQUIRED
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="w-4 h-4 text-indigo-600" />
                                                GENERATE SCRIPT
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </motion.div>

                        {/* Output Area */}
                        <AnimatePresence>
                            {(completion || isLoading) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-indigo-500/10">
                                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5 relative overflow-hidden">
                                            {/* Header Background Effect */}
                                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 pointer-events-none" />

                                            <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium z-10">
                                                <Bot className="w-4 h-4" />
                                                <span>AI Output</span>
                                            </div>
                                            {completion && !isLoading && (
                                                <div className="flex items-center gap-2 z-10">
                                                    <button
                                                        onClick={handleCopy}
                                                        className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors"
                                                        title="Copy to clipboard"
                                                    >
                                                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                                    </button>
                                                    <button
                                                        onClick={handleDownload}
                                                        className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors"
                                                        title="Download text file"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-8 relative">
                                            {isLoading && !completion ? (
                                                <div className="flex flex-col items-center justify-center py-12 space-y-6">
                                                    <div className="relative">
                                                        {/* Outer Rotating HUD */}
                                                        <div className="w-24 h-24 rounded-full border border-indigo-500/20 border-t-indigo-500 animate-[spin_3s_linear_infinite]" />
                                                        <div className="absolute inset-2 border border-purple-500/10 border-b-purple-500 rounded-full animate-[spin_2s_linear_infinite_reverse]" />

                                                        {/* Inner Core */}
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="w-12 h-12 rounded-full bg-indigo-600/20 flex items-center justify-center backdrop-blur-md">
                                                                <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="text-center space-y-2">
                                                        <motion.p
                                                            key={Math.floor(Date.now() / 2000)} // Change every 2s
                                                            initial={{ opacity: 0, y: 5 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="text-indigo-400 font-mono text-xs font-bold uppercase tracking-widest"
                                                        >
                                                            {(() => {
                                                                const protocols = [
                                                                    "Synthesizing ALCOS Standards...",
                                                                    "Auditing IDEA Part B Compliance...",
                                                                    "Optimizing Strategic Financial Yield...",
                                                                    "Connecting Sovereign Neural Link...",
                                                                    "Analyzing Student Equity Metrics...",
                                                                    "Architecting Excellence Protocol..."
                                                                ];
                                                                return protocols[Math.floor((Date.now() / 2000) % protocols.length)];
                                                            })()}
                                                        </motion.p>
                                                        <p className="text-[10px] text-zinc-500 animate-pulse uppercase tracking-[0.2em]">Neural Engine Operational</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="prose prose-invert prose-lg max-w-none">
                                                    <div className="whitespace-pre-wrap font-sans text-zinc-300 leading-relaxed">
                                                        {completion}
                                                    </div>
                                                    <div ref={messagesEndRef} />
                                                </div>
                                            )}
                                        </div>

                                        {/* Refinement Actions - AI Shortcuts */}
                                        {completion && !isLoading && (
                                            <div className="border-t border-white/5 bg-white/5 px-6 py-3 flex flex-wrap items-center gap-2">
                                                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider mr-2">Refine:</span>
                                                {[
                                                    { label: "Make it Shorter", prompt: "Condense the above protocol to be more concise and executive-level." },
                                                    { label: "Make it Detailed", prompt: "Expand the above with more specific implementation steps and details." },
                                                    { label: "Format: Email", prompt: "Rewrite the above as a professional email ready to send." },
                                                    { label: "Format: Bullets", prompt: "Convert the key points of the above into a scannable bulleted list." },
                                                    { label: "Tone: Emphatic", prompt: "Rewrite the above with a stronger, more decisive leadership tone." },
                                                    { label: "Tone: Empathetic", prompt: "Rewrite the above with a warmer, more supportive and empathetic tone." },
                                                    { label: "Translate: Spanish", prompt: "Translate the above output into professional Spanish for parent communication." }
                                                ].map((action, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => { setInput(action.prompt); window.scrollTo({ top: 0, behavior: 'smooth' }); if (textareaRef.current) textareaRef.current.focus(); }}
                                                        className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-indigo-600/20 hover:text-indigo-300 hover:border-indigo-500/30 border border-white/5 text-xs text-zinc-400 transition-all"
                                                    >
                                                        {action.label}
                                                    </button>
                                                ))}

                                                <div className="w-px h-6 bg-white/10 mx-2" />

                                                {/* Output Actions */}
                                                <button
                                                    onClick={() => {
                                                        const cleanText = completion.replace(/[*#_`]/g, '');
                                                        const utterance = new SpeechSynthesisUtterance(cleanText);
                                                        window.speechSynthesis.cancel();
                                                        window.speechSynthesis.speak(utterance);
                                                    }}
                                                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-emerald-600/20 hover:text-emerald-300 hover:border-emerald-500/30 border border-white/5 text-xs text-zinc-400 transition-all flex items-center gap-1"
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

                                                <button
                                                    onClick={handleNeuralTTS}
                                                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-pink-600/20 hover:text-pink-300 hover:border-pink-500/30 border border-white/5 text-xs text-zinc-400 transition-all flex items-center gap-1"
                                                    title="Play Neural Voice"
                                                >
                                                    <Volume2 className="w-3 h-3" />
                                                    Vox
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* RIGHT COLUMN: Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Prompts Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
                        >
                            <div className="flex items-center gap-2 mb-4 text-sm font-bold text-zinc-400 uppercase tracking-wider">
                                <Zap className="w-4 h-4" />
                                Quick Start
                            </div>
                            <div className="grid gap-3">
                                {prompts.map((prompt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleQuickPrompt(prompt)}
                                        className="group text-left p-4 rounded-xl bg-white/5 hover:bg-indigo-600/10 border border-white/5 hover:border-indigo-500/30 transition-all active:scale-[0.98]"
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <span className="text-sm text-zinc-300 group-hover:text-indigo-200 transition-colors line-clamp-2">
                                                {prompt}
                                            </span>
                                            <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Recent Usage / Stats (Placeholder) */}
                        {/* Recent Usage & History */}
                        <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/5 rounded-3xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-sm font-bold text-zinc-500 uppercase tracking-wider">
                                    <History className="w-4 h-4" />
                                    Protocol History
                                </div>
                                <button
                                    onClick={() => { localStorage.removeItem(`history_${generatorId}`); setHistory([]); }}
                                    className="text-[10px] text-zinc-600 hover:text-red-400 uppercase tracking-widest transition-colors"
                                >
                                    Clear
                                </button>
                            </div>

                            <div className="space-y-4">
                                {history.length > 0 ? (
                                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                        {history.map((record: any, idx: number) => (
                                            <button
                                                key={idx}
                                                onClick={() => { setInput(record.prompt); setCompletion(record.completion); }}
                                                className="w-full text-left p-3 rounded-lg bg-zinc-800/50 hover:bg-zinc-800 border border-white/5 hover:border-indigo-500/20 transition-all group"
                                            >
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="text-xs text-zinc-500 font-mono">{record.date}</span>
                                                    <span className="text-[10px] text-indigo-400 opacity-0 group-hover:opacity-100 uppercase transition-opacity">Recall</span>
                                                </div>
                                                <p className="text-xs text-zinc-300 line-clamp-2">{record.prompt}</p>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-zinc-600 text-sm">
                                        <History className="w-8 h-8 mx-auto mb-2 opacity-20" />
                                        No recent protocols found locally.
                                    </div>
                                )}

                                <div className="pt-4 border-t border-white/5">
                                    <p className="text-[10px] text-zinc-600 text-center">
                                        Data stored locally on your device for privacy (Sovereign Protocol).
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Suggested / Related Protocols */}
                        <div className="mt-8">
                            <h4 className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-4 px-2">Related Protocols</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {GENERATORS.filter(g => g.id !== generatorId)
                                    .slice(0, 3) // Deterministic slice for now to prevent hydration errors
                                    .map((tool) => (
                                        <Link
                                            key={tool.id}
                                            href={`/generators/${tool.id}`}
                                            className="group p-4 rounded-xl bg-zinc-900/50 border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-zinc-950 border border-white/5 text-zinc-400 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-colors">
                                                    <tool.icon className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-zinc-300 group-hover:text-white transition-colors">{tool.name}</div>
                                                    <div className="text-[10px] text-zinc-600 group-hover:text-zinc-500 uppercase tracking-wider">Protocol Active</div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
}
