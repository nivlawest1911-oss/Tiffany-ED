'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mic, Video, Maximize2, Minimize2, MoreVertical, Volume2, Phone, Rocket, Wand2, Zap, ChevronRight, Activity, AlertTriangle, CreditCard } from 'lucide-react';
import LiveAvatarChat from './LiveAvatarChat';

interface SovereignDelegateProps {
    role: string;
    name: string;
    avatarImage: string;
    videoSrc?: string;
    voiceSrc?: string;
    color: string;
    greetingText?: string;
    completionText?: string;
    theme?: 'default' | 'sovereign';
    isLoading?: boolean;
    guideMode?: boolean;
    voiceSettings?: { pitch: number; rate: number; lang?: string };
}

export default function SovereignDelegate({
    role,
    name,
    avatarImage,
    videoSrc,
    voiceSrc,
    color,
    completionText,
    greetingText,
    theme = 'default',
    isLoading = false,
    guideMode = false,
    voiceSettings
}: SovereignDelegateProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [showLiveChat, setShowLiveChat] = useState(false);
    const [showControlPanel, setShowControlPanel] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [directive, setDirective] = useState('');
    const [aiMode, setAiMode] = useState<'idle' | 'thinking' | 'synthesizing' | 'analyzing'>('idle');
    const [confidenceLevel, setConfidenceLevel] = useState(98.4);
    const [sessionFocus, setSessionFocus] = useState<string | null>(null);
    const [interactionCount, setInteractionCount] = useState(0);

    // Sovereign Intelligence Capital (Token System)
    const [tokensRemaining, setTokensRemaining] = useState(8); // Start near depletion for demo
    const [showRecharge, setShowRecharge] = useState(false);

    const [hasGuided, setHasGuided] = useState(false);
    const hasAnnouncedRef = useRef(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Monitor Token Levels for Upsell
    useEffect(() => {
        if (tokensRemaining <= 5 && !showRecharge && isOpen && !isLoading) {
            const timer = setTimeout(() => {
                setShowRecharge(true);
                if (!isSpeaking) {
                    speakText("Commander, your intelligence capital is nearing depletion. To maintain sovereignty and continue this session, initialize a capital injection now.");
                }
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [tokensRemaining, isOpen, isSpeaking, isLoading]);

    const handleRecharge = async () => {
        try {
            speakText("Initializing secure transaction protocol...");
            const response = await fetch('/api/create-topup-session', {
                method: 'POST',
                body: JSON.stringify({ userId: 'current_user', quantity: 50 })
            });
            const data = await response.json();

            if (data.success) {
                // Determine 'success' - in real app navigate to data.url
                // Here we simulate the successful return:
                setTokensRemaining(100);
                setShowRecharge(false);
                speakText("Capital limit expanded. Sovereignty restored. Proceeding with neural operations.");
            }
        } catch (e) {
            console.error("Recharge failed", e);
        }
    };

    // Sync Video Playback with Speaking State
    useEffect(() => {
        if (videoRef.current) {
            if (isSpeaking) {
                videoRef.current.play().catch(() => { });
            } else {
                videoRef.current.pause();
            }
        }
    }, [isSpeaking]);

    // Auto-open if loading starts
    useEffect(() => {
        if (isLoading) {
            setIsOpen(true);
            setIsMinimized(false);
        }
    }, [isLoading]);

    // Guide Mode: Auto-trigger personalized greeting on load
    useEffect(() => {
        if (theme === 'sovereign' && !hasGuided && name === "Sovereign Agent" && !isLoading && !completionText) {
            const timer = setTimeout(() => {
                setIsOpen(true);
                const hour = new Date().getHours();
                const timeGreeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
                const personalizedHint = sessionFocus ? `I see you've been reviewing our ${sessionFocus}. ` : "";

                speakText(`${timeGreeting}. ${personalizedHint}I am here to architect your next strategic educational move.`);
                setHasGuided(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [theme, hasGuided, name, greetingText, isLoading, completionText, sessionFocus]);

    // Speak completion text when it arrives
    useEffect(() => {
        if (!completionText || completionText.length < 5) {
            hasAnnouncedRef.current = false;
        } else if (completionText.length > 20 && !hasAnnouncedRef.current) {
            setIsOpen(true);
            setIsMinimized(false);
            speakText("I have finished analyzing your request. The results are ready for your review.");
            hasAnnouncedRef.current = true;
            setTokensRemaining(prev => Math.max(0, prev - 2)); // Deduct tokens for analysis
        }
    }, [completionText]);

    const speakText = (text: string) => {
        // Sovereign Neural Voice Selection Protocol
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);

            const voices = window.speechSynthesis.getVoices();
            // Prioritize higher quality proprietary voices (Mac/Google)
            const isMale = name.toLowerCase().includes('alvin') || name.toLowerCase().includes('marcus') || name.toLowerCase().includes('james') || name.toLowerCase().includes('andre');

            // Advanced Heuristic for Voice Selection
            // Prioritize higher quality, authoritative voices suitable for African American executive personas
            let preferredVoice = voices.find(v =>
                isMale
                    // Deeper, authoritative male voices
                    ? (v.name.includes("Google US English") || v.name.includes("Daniel"))
                    : (v.name.includes("Google US English") || v.name.includes("Samantha"))
            );

            // Fallback to any English
            if (!preferredVoice) {
                preferredVoice = voices.find(v => v.lang.startsWith('en'));
            }

            if (preferredVoice) utterance.voice = preferredVoice;

            // Pitch/Rate Tuning for Professionalism (Sovereign Standard)
            utterance.rate = voiceSettings?.rate || 0.95; // Measured, thoughtful pace
            utterance.pitch = voiceSettings?.pitch || (isMale ? 0.8 : 1.0); // Resonance adjustments

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);

            window.speechSynthesis.speak(utterance);
        }
    };

    useEffect(() => {
        return () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const handleVoicePreview = () => {
        setInteractionCount(prev => prev + 1);
        if (voiceSrc) {
            const audio = new Audio(voiceSrc);
            audio.play().catch(() => { });
            setIsSpeaking(true);
            audio.onended = () => setIsSpeaking(false);
        }
    };

    const handleViralBroadcast = () => {
        navigator.clipboard.writeText(window.location.href);
        speakText("Viral Expansion Protocol Initiated. Reaching one million nodes per second across the global educational spectrum.");
        alert("🚨 GLOBAL UPLINK ESTABLISHED. Reaching 1M+ nodes per second.");
    };

    const handleGenerativeSynthesis = async () => {
        if (isGenerating) return;
        if (tokensRemaining <= 0) {
            setShowRecharge(true);
            speakText("Insufficient capital. Recharge immediately.");
            return;
        }

        setIsGenerating(true);
        setAiMode('synthesizing');
        speakText("Initiating Generative Synthesis Protocol. Architecting high-fidelity video briefing based on your current operational vector.");
        setTokensRemaining(prev => Math.max(0, prev - 3)); // High cost action

        // Mock generative delay
        await new Promise(r => setTimeout(r, 2000));
        setIsGenerating(false);
        setAiMode('idle');
        speakText("Neural Video Briefing finalized. Accessing Sovereign Hub for deployment.");
        alert("🎥 Sovereign Generative Briefing Created & Synced to Dashboard.");
    };

    const handleNeuralAnalysis = async () => {
        if (tokensRemaining <= 0) {
            setShowRecharge(true);
            speakText("Insufficient capital. Recharge immediately.");
            return;
        }

        setAiMode('analyzing');
        speakText("Analyzing district-wide sentiment and predictive success models for the upcoming academic quarter.");
        setTokensRemaining(prev => Math.max(0, prev - 1));

        await new Promise(r => setTimeout(r, 1500));
        setAiMode('idle');
        speakText("Analysis complete. We predict a 14% increase in student growth metrics if current Tier 3 interventions remain stable.");
    };

    const handleReadBriefing = () => {
        if (completionText) {
            const cleanText = completionText.replace(/[*#_`]/g, '').substring(0, 400);
            speakText("Here is a summary: " + cleanText);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className={`pointer-events-auto mb-6 w-80 md:w-96 bg-zinc-900/95 backdrop-blur-2xl border ${theme === 'sovereign' ? 'border-amber-500/30' : 'border-white/10'} rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20`}
                    >
                        {/* Header */}
                        <div className={`p-4 ${theme === 'sovereign' ? 'bg-gradient-to-r from-amber-900 to-purple-900' : `bg-gradient-to-r ${color}`} relative flex items-center justify-between z-10`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'bg-red-500'} `} />
                                <div>
                                    <h3 className="text-[10px] font-black uppercase text-white tracking-widest">{role}</h3>
                                    <p className="text-xs text-white/80 font-bold">{name}</p>
                                </div>
                            </div>
                            <button onClick={() => setShowControlPanel(!showControlPanel)} className={`p-1 hover:bg-white/10 rounded-full transition-colors ${showControlPanel ? 'text-amber-400' : 'text-white'}`}>
                                <MoreVertical size={14} />
                            </button>
                            <button onClick={() => setIsMinimized(!isMinimized)} className="p-1 hover:bg-white/10 rounded-full text-white transition-colors">
                                {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                            </button>
                            <button onClick={() => { setIsOpen(false); window.speechSynthesis.cancel(); setIsSpeaking(false); }} className="p-1 hover:bg-white/10 rounded-full text-white transition-colors">
                                <X size={14} />
                            </button>
                        </div>

                        {!isMinimized && (
                            <>
                                <div className="relative aspect-square bg-[#0a0a0a] flex flex-col overflow-hidden border-b border-white/5">
                                    {/* Kente Pattern Overlay */}
                                    {theme === 'sovereign' && (
                                        <div className="absolute inset-0 opacity-10 pointer-events-none z-0" style={{
                                            backgroundImage: `repeating-linear-gradient(45deg, #d97706 0px, #d97706 2px, transparent 2px, transparent 10px)`
                                        }} />
                                    )}

                                    {videoSrc ? (
                                        <div className="relative w-full h-full group">
                                            <div className="absolute top-4 left-4 z-20">
                                                <div className="flex items-center gap-2 bg-red-600 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(220,38,38,0.3)] scale-75 origin-left">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                                    <span className="text-[8px] font-black text-white uppercase">LIVE FEED</span>
                                                </div>
                                            </div>
                                            <video
                                                ref={videoRef}
                                                src={videoSrc}
                                                loop
                                                muted
                                                playsInline
                                                className="w-full h-full object-cover opacity-80"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-full h-full p-8 flex items-center justify-center relative bg-[#050505]">
                                            {/* High-Fidelity Neural HUD */}
                                            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden opacity-40">
                                                <div className="absolute top-4 left-4 text-[6px] font-mono text-amber-500 animate-pulse">
                                                    UPLINK: ACTIVE<br />
                                                    FIDELITY: {isSpeaking ? '99.8%' : 'IDLE'}<br />
                                                    LATENCY: 14ms<br />
                                                    MODE: {aiMode.toUpperCase()}<br />
                                                    CONFIDENCE: {confidenceLevel}%
                                                </div>
                                                <div className="absolute bottom-6 right-4 text-[6px] font-mono text-amber-500 text-right">
                                                    NEURAL_SYNC_V6<br />
                                                    {isSpeaking ? 'TRANSMITTING...' : aiMode === 'idle' ? 'WAITING...' : 'PROCESSING...'}
                                                </div>
                                                {/* Holographic Pulse */}
                                                {(isSpeaking || aiMode !== 'idle') && (
                                                    <motion.div
                                                        animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                        className="absolute inset-0 bg-gradient-to-t from-amber-500/5 via-transparent to-transparent"
                                                    />
                                                )}
                                                {/* Live TV News Ticker Sim */}
                                                <div className="absolute bottom-0 inset-x-0 h-4 bg-amber-500/10 border-t border-amber-500/20 backdrop-blur-sm overflow-hidden flex items-center">
                                                    <div className="whitespace-nowrap flex gap-8 animate-marquee text-[6px] font-mono text-amber-500/50 uppercase font-black">
                                                        <span>EXCELLENCE WITHOUT EXCUSE &gt;&gt;&gt; SOVEREIGN LEADERSHIP NODE ACTIVE &gt;&gt;&gt; QUANTUM SECURE &gt;&gt;&gt; NEURAL ENGINE VERSION 6.2 &gt;&gt;&gt;</span>
                                                        <span>EXCELLENCE WITHOUT EXCUSE &gt;&gt;&gt; SOVEREIGN LEADERSHIP NODE ACTIVE &gt;&gt;&gt; QUANTUM SECURE &gt;&gt;&gt; NEURAL ENGINE VERSION 6.2 &gt;&gt;&gt;</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <motion.div
                                                animate={isSpeaking ? {
                                                    scale: [1, 1.015, 1],
                                                    rotateZ: [0, 0.5, -0.5, 0],
                                                    y: [0, -4, 0],
                                                    x: [0, 1, -1, 0]
                                                } : {
                                                    y: [0, -3, 0],
                                                    scale: [1, 1.005, 1]
                                                }}
                                                transition={isSpeaking ? {
                                                    duration: 0.6,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                } : {
                                                    duration: 5,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                                className={`relative w-48 h-48 rounded-full overflow-hidden border-4 ${theme === 'sovereign' ? 'border-amber-500/30' : 'border-white/5'} shadow-2xl transition-all duration-700 ${isSpeaking ? 'ring-8 ring-amber-500/10' : 'grayscale-[0.2]'}`}>

                                                <motion.img
                                                    src={avatarImage}
                                                    alt={name}
                                                    className="w-full h-full object-cover"
                                                    animate={isSpeaking ? {
                                                        x: [0, -5, 5, -2, 0],
                                                        y: [0, -2, 2, -1, 0],
                                                        rotate: [0, -1, 1, -0.5, 0],
                                                        scale: [1, 1.05, 1.02, 1.05, 1]
                                                    } : {}}
                                                    transition={isSpeaking ? {
                                                        duration: 4,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    } : {}}
                                                />

                                                {/* Advanced Biological Lip Sync Sim */}
                                                {isSpeaking && (
                                                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center gap-1">
                                                        {[...Array(16)].map((_, i) => (
                                                            <motion.div
                                                                key={i}
                                                                className={`w-1 rounded-full ${theme === 'sovereign' ? 'bg-amber-400' : 'bg-indigo-400'}`}
                                                                animate={{ height: [Math.random() * 8, Math.random() * 32, Math.random() * 8] }}
                                                                transition={{ duration: 0.15, repeat: Infinity, delay: i * 0.05 }}
                                                            />
                                                        ))}
                                                        <motion.div
                                                            className="absolute inset-x-0 bottom-[30%] h-12 bg-black/20 blur-xl scale-y-[0.3]"
                                                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                                                            transition={{ duration: 0.2, repeat: Infinity }}
                                                        />
                                                    </div>
                                                )}

                                                {/* Scanner Line */}
                                                {isSpeaking && (
                                                    <motion.div
                                                        animate={{ y: [-100, 300] }}
                                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                        className="absolute inset-x-0 h-px bg-amber-500/50 shadow-[0_0_10px_#d97706] z-30"
                                                    />
                                                )}
                                            </motion.div>
                                        </div>
                                    )}

                                    {/* Subtitle / Text Area */}
                                    <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent z-40 border-t border-white/5">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.5)]" />
                                            <p className="text-[9px] font-black text-white/50 uppercase tracking-[0.3em]">Neural Briefing Active</p>
                                        </div>
                                        <div className="h-10 flex items-center">
                                            <p className="text-zinc-100 text-[11px] font-medium leading-tight line-clamp-2">
                                                {isGenerating ? "Synthesizing generative video assets..." : (isSpeaking ? "Translating executive intelligence into actionable classroom protocols..." : (completionText ? "Sovereign analysis finalized. Ready for review." : "Awaiting user vocal protocols..."))}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Neural Control Panel Overlay */}
                                    <AnimatePresence>
                                        {showControlPanel && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                className="absolute inset-0 z-50 bg-black/90 backdrop-blur-xl p-6 flex flex-col justify-between"
                                            >
                                                <div className="space-y-6">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="text-[10px] font-black uppercase text-amber-500 tracking-[0.2em]">Neural Directives</h4>
                                                        <button onClick={() => setShowControlPanel(false)} className="text-white/40 hover:text-white"><X size={14} /></button>
                                                    </div>

                                                    <div className="space-y-3">
                                                        {[
                                                            { id: 'literacy', label: 'Alabama Literacy Act Audit', color: 'bg-emerald-500', action: () => speakText("Initiating Alabama Literacy Act Audit. Ensuring K-3 benchmarks align with Science of Reading protocols.") },
                                                            { id: 'sentiment', label: 'Predictive Success Modeling', color: 'bg-blue-500', action: handleNeuralAnalysis },
                                                            { id: 'association', label: 'Strategic Association Uplink', color: 'bg-amber-500', action: () => speakText("Uplinking with state strategic associations. Synchronizing policy updates.") },
                                                            { id: 'synthesis', label: 'Neural Briefing Synthesis', color: 'bg-purple-500', action: handleGenerativeSynthesis },
                                                            { id: 'relief', label: 'Teacher Relief Protocol', color: 'bg-rose-500', action: () => speakText("Deploying Teacher Relief Protocol. Automating administrative load for zero-burnout classroom management.") },
                                                            { id: 'legal', label: 'Sovereign Legal Defense', color: 'bg-zinc-500', action: () => speakText("Simulating legally-defensible administrative responses for current board policy.") },
                                                        ].map((item) => (
                                                            <button
                                                                key={item.id}
                                                                onClick={() => {
                                                                    setDirective(item.label);
                                                                    item.action();
                                                                    setShowControlPanel(false);
                                                                }}
                                                                className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all text-[10px] text-zinc-300 font-bold uppercase tracking-widest group"
                                                            >
                                                                <div className="flex items-center gap-3">
                                                                    <div className={`w-1.5 h-1.5 rounded-full ${item.color} shadow-[0_0_8px_rgba(255,255,255,0.2)]`} />
                                                                    <span>{item.label}</span>
                                                                </div>
                                                                <ChevronRight size={10} className="text-zinc-600 group-hover:text-amber-500 transition-colors" />
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20">
                                                    <p className="text-[9px] text-amber-500 font-bold uppercase tracking-widest mb-1">Status</p>
                                                    <p className="text-[10px] text-zinc-400 font-mono">FIDELITY: 99.8% | LATENCY: 12ms</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Sovereign Capital Recharge Overlay */}
                                    <AnimatePresence>
                                        {showRecharge && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="absolute inset-0 z-[60] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
                                            >
                                                <div className="w-12 h-12 mb-4 rounded-full bg-red-900/30 border border-red-500 flex items-center justify-center animate-pulse">
                                                    <AlertTriangle className="text-red-500" size={24} />
                                                </div>
                                                <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Capital Depletion</h3>
                                                <p className="text-xs text-zinc-400 mb-6 max-w-[200px] leading-relaxed">
                                                    Your intelligence node requires immediate capital injection to maintain sovereign operations.
                                                </p>

                                                <div className="space-y-3 w-full">
                                                    <button
                                                        onClick={handleRecharge}
                                                        className="w-full py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
                                                    >
                                                        <CreditCard size={14} />
                                                        Initialize Injection ($20)
                                                    </button>
                                                    <button
                                                        onClick={() => setShowRecharge(false)}
                                                        className="w-full py-2 text-zinc-500 text-[9px] font-bold uppercase tracking-widest hover:text-white transition-colors"
                                                    >
                                                        Dismiss (Restricted Mode)
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Footer Controls */}
                                <div className="p-4 bg-zinc-950 flex justify-between items-center gap-2">
                                    <button
                                        onClick={() => isSpeaking ? window.speechSynthesis.cancel() : handleReadBriefing()}
                                        className="flex-1 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center gap-2 text-white hover:bg-white/10 transition-all text-[10px] font-bold uppercase tracking-widest"
                                    >
                                        {isSpeaking ? <Volume2 size={12} className="animate-pulse" /> : <Mic size={12} />}
                                        <span>{isSpeaking ? 'Stop' : 'Speak'}</span>
                                    </button>
                                    <button
                                        onClick={() => setShowLiveChat(true)}
                                        className="flex-1 h-9 rounded-full bg-white text-black flex items-center justify-center gap-2 hover:scale-105 transition-all text-[10px] font-black uppercase tracking-widest"
                                    >
                                        <Phone size={12} />
                                        <span>Engage</span>
                                    </button>
                                    <button
                                        onClick={handleGenerativeSynthesis}
                                        className={`w-9 h-9 rounded-full ${isGenerating ? 'bg-amber-500 animate-spin' : 'bg-amber-500/10'} border border-amber-500/20 flex items-center justify-center text-amber-500 hover:bg-amber-500/20 transition-all`}
                                        title="Generative Briefing Agent"
                                    >
                                        {isGenerating ? <Zap size={14} className="text-black" /> : <Wand2 size={14} />}
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* The Floating Orb Trigger */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="pointer-events-auto relative group"
            >
                {!isOpen && (
                    <div className="absolute -top-1 -right-1 flex h-4 w-4 z-50">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-zinc-900"></span>
                    </div>
                )}

                <div className={`relative w-16 h-16 rounded-full p-1 bg-gradient-to-br ${theme === 'sovereign' ? 'from-amber-400 via-purple-600 to-amber-600' : 'from-indigo-600 to-purple-800'} shadow-2xl shadow-black`}>
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-black bg-black relative">
                        <img src={avatarImage} alt={name} className={`w-full h-full object-cover transition-all duration-500 ${isSpeaking ? 'animate-pulse scale-110' : 'group-hover:scale-110'}`} />
                        {isSpeaking && (
                            <div className="absolute inset-0 bg-amber-500/20 mix-blend-overlay animate-pulse" />
                        )}
                    </div>
                </div>
            </motion.button>

            {/* Live Avatar Chat Modal */}
            {
                showLiveChat && (
                    <LiveAvatarChat
                        avatarName={name}
                        avatarRole={role}
                        avatarImage={avatarImage}
                        avatarVideo={videoSrc}
                        avatarVoice={voiceSrc || '/voice-profiles/principal_voice.mp3'}
                        avatarVoiceSettings={voiceSettings}
                        onClose={() => setShowLiveChat(false)}
                    />
                )
            }
        </div >
    );
}

function NeuralMouthPulse({ theme, index }: { theme: string, index: number }) {
    const [heights, setHeights] = useState([2, 10, 2]);
    const [duration, setDuration] = useState(0.2);

    useEffect(() => {
        setHeights([2, Math.random() * 24 + 4, 2]);
        setDuration(0.1 + (Math.random() * 0.15));
    }, []);

    return (
        <motion.div
            className={`w-1 rounded-full ${theme === 'sovereign' ? 'bg-amber-400/30' : 'bg-indigo-400/30'} blur-[1px]`}
            animate={{
                height: heights,
                opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
                repeat: Infinity,
                duration: duration,
                delay: index * 0.02,
                ease: "easeInOut"
            }}
        />
    );
}
