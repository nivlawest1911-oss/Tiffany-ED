'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Mic, Video, Maximize2, Minimize2, MoreVertical, Volume2, Phone,
    Rocket, Wand2, Zap, ChevronRight, Activity, AlertTriangle,
    CreditCard, Trophy, Terminal, Shield, Brain, Share2, FileText, Users
} from 'lucide-react';
import LiveAvatarChat from './LiveAvatarChat';
import { useLeadershipRank } from '@/hooks/useLeadershipRank';
import { useHumanBehavior } from '@/hooks/useHumanBehavior';
import { useAuth } from '@/context/AuthContext';

interface AIAssistantProps {
    role: string;
    name: string;
    avatarImage: string;
    videoSrc?: string;
    voiceSrc?: string;
    color: string;
    greetingText?: string;
    completionText?: string;
    theme?: 'default' | 'professional';
    isLoading?: boolean;
    guideMode?: boolean;
    voiceSettings?: { pitch: number; rate: number; lang?: string };
    autoOpen?: boolean;
    initialDirective?: string;
}

export default function AIAssistant({
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
    autoOpen = false,
    initialDirective = '',
    voiceSettings
}: AIAssistantProps) {
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

    // Token System
    const [tokensRemaining, setTokensRemaining] = useState(8);
    const [showRecharge, setShowRecharge] = useState(false);
    const { user } = useAuth();

    // Professional Rank System
    const { xp, addXP, currentRank, progressToNext, isSovereign } = useLeadershipRank();
    const [cinematicMode, setCinematicMode] = useState(true);
    const humanBehavior = useHumanBehavior(isOpen && !isSpeaking);

    const [hasGuided, setHasGuided] = useState(false);
    const hasAnnouncedRef = useRef(false);

    // Dynamic engagement protocol
    useEffect(() => {
        if (autoOpen) {
            setIsOpen(true);
            const personalizedGreeting = user ? `Welcome back, ${user.name}. I'm ready to continue our strategic coordination.` : greetingText;
            if (initialDirective) {
                setDirective(initialDirective);
                const timer = setTimeout(() => {
                    handleGenerativeSynthesis();
                }, 1500);
                return () => clearTimeout(timer);
            }
            if (!hasAnnouncedRef.current && personalizedGreeting) {
                speakText(personalizedGreeting);
                hasAnnouncedRef.current = true;
            }
        }
    }, [autoOpen, initialDirective, user]);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Monitor Token Levels for Upsell
    useEffect(() => {
        if (tokensRemaining <= 5 && !showRecharge && isOpen && !isLoading) {
            const timer = setTimeout(() => {
                setShowRecharge(true);
                if (!isSpeaking) {
                    speakText("You are running low on tokens. To continue this session smoothly, you can add more to your balance now.");
                }
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [tokensRemaining, isOpen, isSpeaking, isLoading]);

    const handleRecharge = async () => {
        try {
            speakText("Preparing secure checkout...");
            const response = await fetch('/api/create-topup-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: 'current_user', quantity: 40 }) // 40 tokens for $20
            });
            const data = await response.json();

            if (data.success && data.url) {
                // Real Stripe Redirection
                window.location.href = data.url;
            } else {
                throw new Error(data.details || "Session generation failed");
            }
        } catch (e: any) {
            console.error("Recharge failed", e);
            speakText("Transaction failed. Please verify your connection and try again.");
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
        if (theme === 'professional' && !hasGuided && name === "AI Assistant" && !isLoading && !completionText) {
            const timer = setTimeout(() => {
                setIsOpen(true);
                const hour = new Date().getHours();
                const timeGreeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
                const personalizedHint = sessionFocus ? `I see you've been reviewing our ${sessionFocus}. ` : "";

                speakText(`${timeGreeting}. ${personalizedHint}I am here to help you lead your district more effectively.`);
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
            addXP(15); // Large reward for successful generation
        }
    }, [completionText]);

    const LEADERSHIP_ARCHETYPES: Record<string, { tone: string, rate: number, pitch: number, jargon: string[] }> = {
        'alvin': { tone: 'visionary', rate: 0.9, pitch: 0.85, jargon: ['Leadership', 'Legacy Achievement', 'District Connection', 'Pedagogical Fidelity'] },
        'marcus': { tone: 'philosophical', rate: 0.8, pitch: 0.7, jargon: ['Virtue', 'Discipline', 'Administrative Duty', 'Stoic Compliance'] },
        'sarah': { tone: 'tactical', rate: 1.1, pitch: 1.05, jargon: ['Protocol Override', 'Vector Analysis', 'Strategic Drift', 'Fidelity Check'] },
        'andré': { tone: 'innovative', rate: 1.0, pitch: 0.9, jargon: ['Heuristic', 'Optimization', 'Strategic Architecture', 'Strategic Agility'] },
        'default': { tone: 'professional', rate: 0.95, pitch: 0.9, jargon: ['Fidelity', 'Efficiency', 'Success Metrics', 'Strategic Alignment'] }
    };

    const getArchetype = () => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('alvin')) return LEADERSHIP_ARCHETYPES['alvin'];
        if (lowerName.includes('marcus')) return LEADERSHIP_ARCHETYPES['marcus'];
        if (lowerName.includes('sarah')) return LEADERSHIP_ARCHETYPES['sarah'];
        if (lowerName.includes('andre') || lowerName.includes('andré')) return LEADERSHIP_ARCHETYPES['andré'];
        return LEADERSHIP_ARCHETYPES['default'];
    };

    const speakText = (text: string) => {
        // Professional Strategic Voice Selection Connection
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            // HUMAN-LIKE REFINEMENT: Inject natural fillers and pauses
            let naturalText = text;
            if (Math.random() > 0.7) {
                const fillers = [
                    "Well, let's explore this, ",
                    "Interestingly, ",
                    "From a strategic standpoint, ",
                    "Actually, thinking about the district's growth, ",
                    "Right, so, ",
                    "I believe that "
                ];
                naturalText = fillers[Math.floor(Math.random() * fillers.length)] + text;
            }

            // Inject natural micro-pauses for human cadence
            naturalText = naturalText.replace(/\, /g, ", ... ");
            naturalText = naturalText.replace(/\. /g, ". ...... ");
            naturalText = naturalText.replace(/\? /g, "? ... ");

            if (Math.random() > 0.8) {
                naturalText = "Um, " + naturalText;
            }

            const utterance = new SpeechSynthesisUtterance(naturalText);
            const archetype = getArchetype();

            const voices = window.speechSynthesis.getVoices();
            // Prioritize higher quality proprietary voices (Mac/Google)
            const isMale = name.toLowerCase().includes('alvin') || name.toLowerCase().includes('marcus') || name.toLowerCase().includes('james') || name.toLowerCase().includes('andre');

            // Advanced Heuristic for Voice Selection
            // Prioritize authoritative voices for African American executive personas
            let preferredVoice = voices.find(v =>
                isMale
                    ? (v.name.includes("Google US English") || v.name.includes("Daniel") || v.name.includes("Rocko"))
                    : (v.name.includes("Google US English") || v.name.includes("Samantha") || v.name.includes("Zira"))
            );

            // Fallback to any English
            if (!preferredVoice) {
                preferredVoice = voices.find(v => v.lang.startsWith('en'));
            }

            if (preferredVoice) utterance.voice = preferredVoice;

            // Pitch/Rate Tuning for Professionalism (Professional Standard)
            utterance.rate = voiceSettings?.rate || archetype.rate; // Measured, thoughtful pace
            utterance.pitch = voiceSettings?.pitch || (isMale ? archetype.pitch : 1.0); // Resonance adjustments

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

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        speakText("Link copied to clipboard. You can now share this platform with your colleagues.");
    };

    const handleGenerativeSynthesis = async () => {
        if (isGenerating) return;
        if (tokensRemaining <= 0) {
            setShowRecharge(true);
            speakText("Insufficient tokens. Top up to continue.");
            return;
        }

        setIsGenerating(true);
        setAiMode('synthesizing');
        speakText("Creating an expert video briefing based on your current objectives.");
        setTokensRemaining(prev => Math.max(0, prev - 3)); // High cost action

        // Mock generative delay
        await new Promise(r => setTimeout(r, 4000));

        // Save to Leadership Vault
        const newProtocol = {
            id: `SYN-${Math.floor(Math.random() * 999).toString().padStart(3, '0')}`,
            title: `Executive Briefing: ${directive || 'District Strategy'}`,
            type: directive.toLowerCase().includes('defense') ? 'defense' : 'strategy',
            timestamp: new Date().toLocaleTimeString(),
            status: 'ready',
            author: `${name} (${role})`,
            content: `Video briefing completed. Strategies aligned with district goals. Finalized based on input: "${directive}".`
        };

        const existing = JSON.parse(localStorage.getItem('leadership_protocols') || localStorage.getItem('professional_protocols') || '[]');
        localStorage.setItem('leadership_protocols', JSON.stringify([newProtocol, ...existing]));
        window.dispatchEvent(new Event('leadership_vault_update'));

        setIsGenerating(false);
        setAiMode('idle');
        speakText("Briefing finalized. You can access it in your command center.");
        addXP(20);
        alert("🎥 Video Briefing Created & Synced to Dashboard.");
    };

    const handleStrategicAnalysis = async () => {
        if (tokensRemaining <= 0) {
            setShowRecharge(true);
            speakText("Insufficient tokens. Top up to continue.");
            return;
        }

        setAiMode('analyzing');
        speakText("Analyzing district-wide sentiment and predictive success models for the upcoming academic quarter.");
        setTokensRemaining(prev => Math.max(0, prev - 1));

        await new Promise(r => setTimeout(r, 1500));
        setAiMode('idle');
        addXP(5); // Small XP for quick analysis
        speakText("Analysis complete. We predict student growth across provided benchmarks.");
    };

    const handleGeneratePDF = async () => {
        if (!completionText) {
            speakText("I need an active session to create a document. Please start a conversation first.");
            return;
        }

        try {
            const { jsPDF } = await import('jspdf');
            const doc = new jsPDF();

            speakText("Creating professional PDF report with executive formatting.");

            // PDF Styling
            doc.setFillColor(15, 15, 20); // Dark background for header
            doc.rect(0, 0, 210, 40, 'F');

            doc.setTextColor(255, 255, 255);
            doc.setFontSize(22);
            doc.setFont("helvetica", "bold");
            doc.text("EXECUTIVE REPORT", 20, 25);

            const archetype = getArchetype();
            doc.setFontSize(8);
            doc.setTextColor(archetype.tone === 'tactical' ? 255 : 200, archetype.tone === 'visionary' ? 200 : 150, 100);
            doc.text(`ARCHETYPE: ${archetype.tone.toUpperCase()} | KEY JARGON: ${archetype.jargon.slice(0, 2).join(', ').toUpperCase()}`, 20, 30);

            doc.setFontSize(10);
            doc.setTextColor(255, 255, 255);
            doc.text(`RANK: ${currentRank.title.toUpperCase()} | CLEARANCE: ${currentRank.clearance.toUpperCase()}`, 20, 36);

            doc.setTextColor(40, 40, 40);
            doc.setFontSize(12);
            doc.setFont("helvetica", "normal");

            const splitText = doc.splitTextToSize(completionText.replace(/[*#_`]/g, ''), 170);
            doc.text(splitText, 20, 55);

            doc.setFontSize(8);
            doc.setTextColor(150, 150, 150);
            doc.text(`Generated by ${name} (${role}) on ${new Date().toLocaleDateString()}`, 20, 280);
            doc.text("EDINTEL LEADERSHIP NETWORK - CONFIDENTIAL DISTRICT INTEL", 20, 285);

            doc.save(`Leadership_Briefing_${Date.now()}.pdf`);
            speakText("Briefing archived and downloaded. Ready for administrative presentation.");

            // Auto-Vault Archiving Protocol
            const archivalData = {
                id: `intel-${Date.now()}`,
                title: `Strategic Briefing: ${name}`,
                type: 'intel',
                delegate: name,
                rank: currentRank.title,
                date: new Date().toISOString().split('T')[0],
                status: 'Archived',
                confidence: '99%'
            };

            try {
                const existingIntel = JSON.parse(localStorage.getItem('leadership_intel') || localStorage.getItem('professional_intel') || '[]');
                localStorage.setItem('leadership_intel', JSON.stringify([archivalData, ...existingIntel].slice(0, 20)));
            } catch (e) {
                console.error("Archival failed", e);
            }

            addXP(10); // XP for documentation
        } catch (e) {
            console.error("PDF generation failed", e);
            speakText("Connection with PDF architect failed. Retrying.");
        }
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
                        className={`pointer-events-auto mb-6 w-80 md:w-96 bg-zinc-900/95 backdrop-blur-2xl border ${theme === 'professional' ? 'border-amber-500/30' : 'border-white/10'} rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20 relative`}
                    >
                        <AnimatePresence>
                            {isGenerating && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center"
                                >
                                    <div className="w-20 h-20 mb-6 relative">
                                        <div className="absolute inset-0 rounded-full border-2 border-amber-500/20 animate-ping" />
                                        <div className="absolute inset-0 rounded-full border-t-2 border-amber-500 animate-spin" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Brain className="text-amber-500 w-8 h-8" />
                                        </div>
                                    </div>
                                    <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-4">Creating Briefing</h3>
                                    <div className="space-y-2 font-mono text-[8px] text-amber-500/70 text-left">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span>UPLOADING DATA...</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                            <span>MAPPING OBJECTIVES...</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                                            <span>SAVING TO HISTORY...</span>
                                        </div>
                                    </div>
                                    <div className="mt-8 w-full bg-white/5 h-1 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-amber-500"
                                            animate={{ width: ['0%', '40%', '60%', '100%'] }}
                                            transition={{ duration: 4, times: [0, 0.4, 0.7, 1] }}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {/* Header */}
                        <div className={`p-4 ${theme === 'professional' ? 'bg-gradient-to-r from-amber-900 to-purple-900' : `bg-gradient-to-r ${color}`} relative z-10 shadow-lg`}>
                            {/* Strategic Rank Status Bar */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 overflow-hidden">
                                <motion.div
                                    className="h-full bg-amber-400 shadow-[0_0_10px_#fbbf24]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressToNext}%` }}
                                    transition={{ duration: 1 }}
                                />
                            </div>

                            <div className="flex items-center justify-between mt-1">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'bg-red-500'} `} />
                                    <div>
                                        <h3 className="text-[10px] font-black uppercase text-white tracking-widest flex items-center gap-2">
                                            {role}
                                            <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-black/40 text-amber-400 border border-amber-500/30">
                                                RANK {currentRank.level}
                                            </span>
                                        </h3>
                                        <p className="text-xs text-white/80 font-bold">{name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
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
                            </div>

                            {/* Rank Title & Presence */}
                            {!isMinimized && (
                                <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2">
                                    <div className="flex items-center gap-1.5">
                                        <Trophy size={10} className="text-amber-500" />
                                        <span className={`text-[9px] font-black uppercase tracking-tighter ${currentRank.color}`}>
                                            {currentRank.title}
                                        </span>
                                    </div>
                                    <div className="flex -space-x-1.5">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-4 h-4 rounded-full border border-zinc-900 bg-zinc-800 flex items-center justify-center overflow-hidden">
                                                <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Commander" className="w-full h-full object-cover opacity-60" />
                                            </div>
                                        ))}
                                        <div className="w-4 h-4 rounded-full border border-zinc-900 bg-emerald-500/20 flex items-center justify-center">
                                            <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {!isMinimized && (
                            <>
                                <div className="relative aspect-square bg-[#0a0a0a] flex flex-col overflow-hidden border-b border-white/5">
                                    {/* Kente Pattern Overlay */}
                                    {theme === 'professional' && (
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
                                            {/* High-Fidelity Strategic HUD */}
                                            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden opacity-40">
                                                <div className="absolute top-4 left-4 text-[6px] font-mono text-amber-500 animate-pulse">
                                                    CONNECTION: ACTIVE<br />
                                                    QUALITY: {isSpeaking ? '99.8%' : 'IDLE'}<br />
                                                    LATENCY: 14ms<br />
                                                    MODE: {aiMode.toUpperCase()}
                                                </div>
                                                <div className="absolute bottom-6 right-4 text-[6px] font-mono text-amber-500 text-right">
                                                    SYSTEM_V6<br />
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
                                                        <span>EXCELLENCE WITHOUT EXCUSE &gt;&gt;&gt; LEADERSHIP SUPPORT ACTIVE &gt;&gt;&gt; SECURE CONNECTION &gt;&gt;&gt; SYSTEM VERSION 6.2 &gt;&gt;&gt;</span>
                                                        <span>EXCELLENCE WITHOUT EXCUSE &gt;&gt;&gt; LEADERSHIP SUPPORT ACTIVE &gt;&gt;&gt; SECURE CONNECTION &gt;&gt;&gt; SYSTEM VERSION 6.2 &gt;&gt;&gt;</span>
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
                                                className={`relative w-48 h-48 rounded-full overflow-hidden border-4 ${theme === 'professional' ? 'border-amber-500/30' : 'border-white/5'} shadow-2xl transition-all duration-700 ${isSpeaking ? 'ring-8 ring-amber-500/10' : 'grayscale-[0.2]'}`}>

                                                <motion.img
                                                    src={avatarImage}
                                                    alt={name}
                                                    className="w-full h-full object-cover origin-bottom"
                                                    style={humanBehavior.style}
                                                    animate={{
                                                        filter: isSpeaking ? 'contrast(1.1) brightness(1.1) saturate(1.1) drop-shadow(0 0 20px rgba(251,191,36,0.3))' : 'contrast(1) brightness(1) saturate(1)',
                                                        y: humanBehavior.behaviorStyles.brow * 2
                                                    }}
                                                />

                                                {/* Cinematic Overlays */}
                                                {cinematicMode && (
                                                    <>
                                                        <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
                                                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                                                        <div className="absolute inset-0 pointer-events-none border-[10px] border-black/20 blur-lg" />
                                                        <div className="absolute top-0 left-0 right-0 h-[100%] pointer-events-none bg-gradient-to-b from-transparent via-white/5 to-transparent animate-scanline-fast opacity-30" />
                                                    </>
                                                )}

                                                {/* African American AI Holography Glow: Kente Inspired */}
                                                <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
                                                    <div className={`w-[90%] h-[90%] rounded-full blur-[120px] animate-pulse ${theme === 'professional' ? 'bg-amber-500/10' : 'bg-indigo-500/10'}`} />
                                                    {/* Kente Pattern Dots */}
                                                    <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay rotate-45 pointer-events-none"
                                                        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '16px 16px' }} />
                                                </div>

                                                {/* Vertex AI & Neural Mirror Metadata */}
                                                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-3 py-1">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                                    <span className="text-[6px] font-black text-white uppercase tracking-widest leading-none">Vertex AI Supreme</span>
                                                </div>

                                                <div className="absolute bottom-10 left-4 z-40 bg-black/40 border border-white/10 px-1.5 py-0.5 rounded text-[5px] font-mono text-zinc-400 uppercase">
                                                    Neural_Mirror // 4.2_S{isSovereign ? 'X' : 'B'}
                                                </div>

                                                {/* Advanced Biological Lip Sync Sim */}
                                                {isSpeaking && (
                                                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center gap-1">
                                                        {[...Array(16)].map((_, i) => (
                                                            <motion.div
                                                                key={i}
                                                                className={`w-1 rounded-full ${theme === 'professional' ? 'bg-amber-400' : 'bg-indigo-400'}`}
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
                                            <p className="text-[9px] font-black text-white/50 uppercase tracking-[0.3em]">Live Interaction</p>
                                        </div>
                                        <div className="h-10 flex items-center">
                                            <p className="text-zinc-100 text-[11px] font-medium leading-tight line-clamp-2">
                                                {isGenerating ? "Preparing video assets..." : (isSpeaking ? "Translating instructions into actionable strategies..." : (completionText ? "Analysis finalized. Ready for review." : "Waiting for you..."))}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Strategic Control Panel Overlay */}
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
                                                        <h4 className="text-[10px] font-black uppercase text-amber-500 tracking-[0.2em]">Quick Actions</h4>
                                                        <button onClick={() => setShowControlPanel(false)} className="text-white/40 hover:text-white"><X size={14} /></button>
                                                    </div>

                                                    <div className="space-y-3">
                                                        {[
                                                            { id: 'literacy', label: 'Alabama Literacy Act Audit', color: 'bg-emerald-500', action: () => speakText("Reviewing Alabama Literacy Act benchmarks.") },
                                                            { id: 'sentiment', label: 'Predictive Success Modeling', color: 'bg-blue-500', action: handleStrategicAnalysis },
                                                            { id: 'association', label: 'Strategic Association Sync', color: 'bg-amber-500', action: () => speakText("Synchronizing with state associations.") },
                                                            { id: 'synthesis', label: 'Create Video Briefing', color: 'bg-purple-500', action: handleGenerativeSynthesis },
                                                            { id: 'relief', label: 'Teacher Support Protocol', color: 'bg-rose-500', action: () => speakText("Deploying Teacher Support Protocol.") },
                                                            { id: 'legal', label: 'Policy Defense', color: 'bg-zinc-500', action: () => speakText("Reviewing board policy alignment.") },
                                                            { id: 'pdf', label: 'Create PDF Report', color: 'bg-indigo-600', action: handleGeneratePDF },
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
                                                    <div className="flex items-center justify-between mb-2">
                                                        <p className="text-[9px] text-amber-500 font-bold uppercase tracking-widest">Leadership Rank Status</p>
                                                        <p className="text-[9px] text-zinc-500 font-mono">XP: {xp}</p>
                                                    </div>
                                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mb-2">
                                                        <motion.div
                                                            className="h-full bg-amber-500 shadow-[0_0_8px_#fbbf24]"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${progressToNext}%` }}
                                                        />
                                                    </div>
                                                    <p className="text-[8px] text-zinc-500 font-mono uppercase">
                                                        {currentRank.title} | {currentRank.clearance}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Professional Token Top-Up Overlay */}
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
                                                <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Tokens Low</h3>
                                                <p className="text-xs text-zinc-400 mb-6 max-w-[200px] leading-relaxed">
                                                    You need to add more tokens to your balance to continue this live interaction.
                                                </p>

                                                <div className="space-y-3 w-full">
                                                    <button
                                                        onClick={handleRecharge}
                                                        className="w-full py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
                                                    >
                                                        <CreditCard size={14} />
                                                        Add Tokens ($20)
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
                                        <span>Full Chat</span>
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

                <div className={`relative w-16 h-16 rounded-full p-1 bg-gradient-to-br ${theme === 'professional' ? 'from-amber-400 via-purple-600 to-amber-600' : 'from-indigo-600 to-purple-800'} shadow-2xl shadow-black`}>
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
                        avatarVoice={voiceSrc || '/voice-profiles/lead_voice.wav'}
                        avatarVoiceSettings={voiceSettings}
                        tokensRemaining={tokensRemaining}
                        onDeductTokens={(amount) => setTokensRemaining(prev => Math.max(0, prev - amount))}
                        onRecharge={() => setShowRecharge(true)}
                        onAddXP={addXP}
                        onClose={() => setShowLiveChat(false)}
                    />
                )
            }
            <style jsx global>{`
                @keyframes scanline-fast {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                .animate-scanline-fast {
                    animation: scanline-fast 4s linear infinite;
                }
            `}</style>
        </div >
    );
}

function SyncMouthPulse({ theme, index }: { theme: string, index: number }) {
    const [heights, setHeights] = useState([2, 10, 2]);
    const [duration, setDuration] = useState(0.2);

    useEffect(() => {
        setHeights([2, Math.random() * 24 + 4, 2]);
        setDuration(0.1 + (Math.random() * 0.15));
    }, []);

    return (
        <motion.div
            className={`w-1 rounded-full ${theme === 'professional' ? 'bg-amber-400/30' : 'bg-indigo-400/30'} blur-[1px]`}
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
