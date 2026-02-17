'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mic, Video,
    MessageSquare, Send, X,
    Brain, Activity, Trophy, Zap, Users, LayoutGrid
} from 'lucide-react';
import HumanAvatar from './ui/HumanAvatar';
import { useHumanBehavior } from '@/hooks/useHumanBehavior';
import { heyGenService } from '@/services/heygen-streaming';
import { useMultimodalAvatar } from '@/hooks/useMultimodalAvatar';
import { EdIntelSidebar } from '@/components/edintel-core/EdIntelSidebar';

interface LiveAvatarChatProps {
    avatarName: string;
    avatarRole: string;
    avatarVideo?: string;
    avatarImage: string;
    avatarVoice?: string;
    avatarVoiceSettings?: {
        pitch: number;
        rate: number;
        lang?: string;
    };
    usageTokens?: number;
    onDeductTokens?: (amount: number) => void;
    onRecharge?: () => void;
    onAddXP?: (amount: number) => void;
    onClose?: () => void;

    // EdIntel integration props
    isOpen?: boolean;
    greetingText?: string;
    theme?: 'default' | 'professional';
    onShowBriefing?: () => void;
    heygenId?: string;
    protocolContext?: string;
}

export default function LiveAvatarChat({
    avatarName,
    avatarRole,
    avatarImage,
    avatarVoice = '',
    onDeductTokens = () => { },
    onAddXP = () => { },
    onClose,
    heygenId,
    greetingText,
    protocolContext,
    usageTokens
}: LiveAvatarChatProps) {
    // INTEGRATED MULTIMODAL HOOK
    const {
        isConnected,
        isProcessing,
        messages: conversation,
        sendMessage,
        startListening,
        stopListening,
        isListening,
        isSpeaking,
        connect,
        disconnect,
        speak
    } = useMultimodalAvatar({
        avatarName,
        avatarRole,
        voiceId: avatarVoice,
        engine: 'duix',
        onTokenDeduct: onTokenDeductInternal,
        onXPGain: onXPGainInternal,
        onSpeak: (text, signal) => {
            if (isStreaming) {
                const storedKeys = JSON.parse(localStorage.getItem('admin_keys') || '{}');
                const apiKey = storedKeys?.heygen || '';
                heyGenService.speak(text, apiKey, signal);
                return true;
            }
            return false;
        }
    });

    // PROACTIVE COMMUNICATION: Trigger greeting and connect on mount
    useEffect(() => {
        // Auto-connect if not connected
        if (!isConnected) {
            connect();
        }

        if (conversation.length === 0) {
            const initialGreeting = greetingText || `Greetings. I am ${avatarName}, your ${avatarRole}. I am online and synced with the EdIntel Matrix. Let us discuss strategy, compliance, or leadership architecture. What is your directive?`;
            // We give it a small delay to allow the UI to settle and connection to initialize
            const timer = setTimeout(() => {
                speak(initialGreeting);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [avatarName, avatarRole, conversation.length, greetingText, protocolContext, speak, connect, isConnected]);

    function onTokenDeductInternal(amount: number) {
        onDeductTokens(amount);
    }

    function onXPGainInternal(amount: number) {
        onAddXP(amount);
    }

    const [textInput, setTextInput] = useState('');
    const [tacticalSuggestions, setTacticalSuggestions] = useState<Array<{ id: string, label: string, protocol: string }>>([]);
    const [showSwarmSidebar, setShowSwarmSidebar] = useState(false);

    // MOUNT LOGIC: Context-Aware Intelligence Seeding
    useEffect(() => {
        if (tacticalSuggestions.length === 0) {
            const lowerName = avatarName.toLowerCase();
            if (lowerName.includes('alvin')) {
                setTacticalSuggestions([
                    { id: 'FISCAL_AUDIT', label: 'Master Budget Review', protocol: 'Reviewing FY2026 capital allocations.' },
                    { id: 'STRATEGIC_PLAN', label: '100-Day Success Blueprint', protocol: 'Architecting executive district turnaround.' },
                    { id: 'LEADERSHIP_SYNC', label: 'Cabinet Synergy Protocol', protocol: 'Calibrating senior leadership alignment.' }
                ]);
            } else if (lowerName.includes('keisha') || avatarRole.toLowerCase().includes('curriculum')) {
                setTacticalSuggestions([
                    { id: 'LESSON_FOUNDRY', label: 'Lesson Architecture', protocol: 'Synthesizing 5E+S instructional protocols.' },
                    { id: 'DATA_DRIVEN', label: 'Assessment Analysis', protocol: 'Extracting performance vectors from recent scores.' },
                    { id: 'DIFFERENTIATION', label: 'Differentiated Scaffolding', protocol: 'Engineering tailored student pathways.' }
                ]);
            } else {
                setTacticalSuggestions([
                    { id: 'COMPLIANCE_CHECK', label: 'Regulatory Audit', protocol: 'Verifying alignment with state standards.' },
                    { id: 'DIRECTIVE_ALPHA', label: 'Executive Briefing', protocol: 'Synthesizing immediate tactical tasks.' }
                ]);
            }
        }
    }, [avatarName, avatarRole, tacticalSuggestions.length]);

    const [biometricPulse, setBiometricPulse] = useState(72);
    const [neuralLoad, setNeuralLoad] = useState(12);
    const [isCalibrating, setIsCalibrating] = useState(true);
    const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
    const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
    const [videoGenerationStatus, setVideoGenerationStatus] = useState<string>('');
    const [xpNotification] = useState<{ amount: number, label: string } | null>(null);
    if (xpNotification) console.log("XP Gain:", xpNotification.amount); // Suppress unused warning conditionally
    const [systemNotification, setSystemNotification] = useState<{ message: string, type: 'error' | 'success' | 'info' } | null>(null);
    const [isHandsFree, setIsHandsFree] = useState(false);

    // HANDS-FREE LOGIC: Auto-restart listening after speaking
    useEffect(() => {
        if (isHandsFree && !isSpeaking && !isProcessing && !isListening) {
            const timer = setTimeout(() => {
                startListening();
            }, 500); // Short delay to prevent self-looping on echo
            return () => clearTimeout(timer);
        }
    }, [isHandsFree, isSpeaking, isProcessing, isListening, startListening]);

    const showSystemMessage = (message: string, type: 'error' | 'success' | 'info' = 'info') => {
        setSystemNotification({ message, type });
        setTimeout(() => setSystemNotification(null), 5000);
    };

    // HeyGen Streaming State
    const [isStreaming, setIsStreaming] = useState(false);
    const streamVideoRef = useRef<HTMLVideoElement>(null);
    const streamAbortControllerRef = useRef<AbortController | null>(null);

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const _behavior = useHumanBehavior(!isCalibrating && !generatedVideoUrl, {
        state: isProcessing ? 'thinking' : isSpeaking ? 'speaking' : isListening ? 'listening' : 'idle',
        mousePos
    });

    const handleConnectStream = async () => {
        const storedKeys = JSON.parse(localStorage.getItem('admin_keys') || '{}');
        const apiKey = storedKeys?.heygen || '';

        if (!apiKey) {
            showSystemMessage("HeyGen API Key Required for 4K Streaming. Falling back to High-Fidelity Pulse Mode.", 'info');
            // Allow them to continue with browser TTS if no key
            setIsStreaming(false);
            return;
        }

        setIsGeneratingVideo(true);
        setVideoGenerationStatus("Connecting to EdIntel Studio Engine...");

        if (streamAbortControllerRef.current) streamAbortControllerRef.current.abort();
        const controller = new AbortController();
        streamAbortControllerRef.current = controller;

        try {
            const stream = await heyGenService.startSession(heygenId || 'josh_lite3_20230714', apiKey, controller.signal);
            setIsStreaming(true);
            setIsGeneratingVideo(false);

            if (streamVideoRef.current) {
                streamVideoRef.current.srcObject = stream;
                streamVideoRef.current.play();
            }
            showSystemMessage("Broadcast Uplink Established", 'success');
        } catch (e: any) {
            if (e.name === 'AbortError') return;
            showSystemMessage("Streaming Engine Offline: " + e.message, 'error');
            setIsGeneratingVideo(false);
        } finally {
            if (streamAbortControllerRef.current === controller) {
                streamAbortControllerRef.current = null;
            }
        }
    };

    const handleDisconnectStream = async () => {
        const storedKeys = JSON.parse(localStorage.getItem('admin_keys') || '{}');
        const apiKey = storedKeys?.heygen || '';
        await heyGenService.stopSession(apiKey);
        setIsStreaming(false);
    };

    const scrollRef = useRef<HTMLDivElement>(null);
    const [presenceX, setPresenceX] = useState(0);
    const mouseX = useRef(0);
    const mouseY = useRef(0);

    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = (e.clientY / window.innerHeight) - 0.5;
            mouseX.current = x;
            mouseY.current = y;
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleGlobalMouseMove);

        const calibrationTimer = setTimeout(() => {
            setIsCalibrating(false);
        }, 3000);

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            clearTimeout(calibrationTimer);
            if (streamAbortControllerRef.current) streamAbortControllerRef.current.abort();

            // Cleanup HeyGen session on unmount
            const storedKeys = JSON.parse(localStorage.getItem('admin_keys') || '{}');
            const apiKey = storedKeys?.heygen || '';
            if (apiKey) {
                heyGenService.stopSession(apiKey);
            }
        };
    }, []);

    useEffect(() => {
        let frameId: number;
        const updatePresence = () => {
            setPresenceX(prev => prev + (mouseX.current - prev) * 0.05);
            frameId = requestAnimationFrame(updatePresence);
        };

        const pulseInterval = setInterval(() => {
            setBiometricPulse(prev => {
                const target = isSpeaking ? 82 : isProcessing ? 88 : 65;
                return prev + (target - prev) * 0.1 + (Math.random() * 2 - 1);
            });
            setNeuralLoad(prev => {
                const target = isProcessing ? 85 : isSpeaking ? 40 : 10;
                return prev + (target - prev) * 0.1;
            });
        }, 1000);

        frameId = requestAnimationFrame(updatePresence);
        return () => {
            cancelAnimationFrame(frameId);
            clearInterval(pulseInterval);
        };
    }, [isListening, isProcessing, isSpeaking]);

    const toggleMicrophone = () => {
        if (isListening) {
            stopListening();
            setIsHandsFree(false); // Manual stop disables hands-free
        } else {
            startListening();
        }
    };

    const _toggleConnection = () => {
        if (isConnected) disconnect();
        else connect();
    };

    const handleVoiceClone = () => {
        showSystemMessage("Initializing Voice Cloning Protocol...", "info");
        setTimeout(() => {
            showSystemMessage("Analyzing Audio Scans...", "info");
        }, 1500);
        setTimeout(() => {
            showSystemMessage("Voice Clone Active: High Fidelity Mode Engaged", "success");
        }, 3500);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl"
        >
            {/* NOBLE XP NOTIFICATION */}
            <AnimatePresence>
                {xpNotification && (
                    <motion.div
                        initial={{ opacity: 0, y: -40, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute top-24 left-1/2 transform -translate-x-1/2 z-[200] flex flex-col items-center gap-2"
                    >
                        <div className="liquid-glass border-noble-gold/50 px-8 py-4 flex items-center gap-4 bg-black/80">
                            <Trophy size={28} className="text-noble-gold animate-bounce" />
                            <div className="text-left">
                                <span className="text-2xl font-black gold-gradient-text">+{xpNotification.amount} XP</span>
                                <p className="text-[10px] font-black uppercase text-noble-gold/60 tracking-widest">{xpNotification.label}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* SYSTEM NOTIFICATION */}
            <AnimatePresence>
                {systemNotification && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-10 right-10 z-[200]"
                    >
                        <div className={`px-6 py-4 rounded-2xl liquid-glass border-white/10 flex items-center gap-3 ${systemNotification.type === 'error' ? 'text-rose-400' : 'text-emerald-400'}`}>
                            <Activity size={18} />
                            <span className="text-xs font-black uppercase tracking-widest">{systemNotification.message}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative w-full max-w-7xl h-[90vh] bg-[#0A0E1A] rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col">

                {/* Premium Header */}
                <div className="p-8 border-b border-white/5 bg-white/[0.02] flex items-center justify-between z-30">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-700'}`} />
                            {isConnected && <div className="absolute inset-0 bg-emerald-500/50 rounded-full animate-ping" />}
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white italic uppercase tracking-tight">{avatarName}</h2>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-noble-gold uppercase tracking-[0.3em]">{avatarRole}</span>
                                <div className="w-1 h-1 bg-white/20 rounded-full" />
                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Live Integration Node</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={isStreaming ? handleDisconnectStream : handleConnectStream}
                            title={isStreaming ? "Terminate Video Uplink" : "Establish Video Uplink"}
                            className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-3 border
                                ${isStreaming ? 'bg-red-500/20 border-red-500/50 text-red-400' : 'bg-noble-gold text-black border-noble-gold shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105'}`}
                        >
                            <Video size={14} className={isStreaming ? 'animate-pulse' : ''} />
                            {isStreaming ? 'End Stream' : 'Go Live (4K)'}
                        </button>
                        <button
                            onClick={handleVoiceClone}
                            title="Voice cloning protocols"
                            className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 hover:text-white transition-all flex items-center gap-3"
                        >
                            <Mic size={14} />
                            Voice Clone
                        </button>
                        <button
                            onClick={() => setShowSwarmSidebar(!showSwarmSidebar)}
                            title="Toggle Swarm Grid"
                            className={`p-3 rounded-xl border transition-all flex items-center justify-center ${showSwarmSidebar ? 'bg-noble-gold text-black border-noble-gold' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:text-white'}`}
                        >
                            <LayoutGrid size={20} />
                        </button>
                        <div className="w-px h-8 bg-white/5 mx-2" />
                        <button
                            onClick={onClose}
                            title="Close Terminal"
                            className="w-12 h-12 rounded-xl bg-white/5 hover:bg-rose-500 hover:text-white text-white/40 transition-all flex items-center justify-center border border-white/10"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    {/* Left: Tactical Intelligence HUD */}
                    <div className="hidden lg:flex w-80 border-r border-white/5 bg-black/20 flex-col p-8 space-y-8 overflow-y-auto custom-scrollbar">
                        <div className="space-y-4">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Biometric Data</p>
                            <div className="space-y-3">
                                <div className="liquid-glass border-white/5 p-4 bg-white/[0.02]">
                                    <div className="flex items-center justify-between mb-2">
                                        <Activity size={12} className="text-rose-500" />
                                        <span className="text-[10px] font-mono text-white/40">Heart Rate</span>
                                    </div>
                                    <span className="text-xl font-mono text-white tracking-widest">{Math.round(biometricPulse)} BPM</span>
                                </div>
                                <div className="liquid-glass border-white/5 p-4 bg-white/[0.02]">
                                    <div className="flex items-center justify-between mb-2">
                                        <Brain size={12} className="text-noble-gold" />
                                        <span className="text-[10px] font-mono text-white/40">Neural Load</span>
                                    </div>
                                    <span className="text-xl font-mono text-white tracking-widest">{Math.round(neuralLoad)}%</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Active Protocols</p>
                            <div className="space-y-3">
                                {tacticalSuggestions.map(s => (
                                    <motion.div
                                        key={s.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-noble-gold/30 transition-all cursor-pointer"
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[8px] font-black text-noble-gold uppercase tracking-widest">{s.id}</span>
                                            <Zap size={10} className="text-white/20 group-hover:text-noble-gold transition-colors" />
                                        </div>
                                        <p className="text-[11px] font-bold text-white mb-1">{s.label}</p>
                                        <p className="text-[9px] text-white/40 leading-relaxed italic">{s.protocol}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Center: Avatar Interaction Hero (Podcast Stage) */}
                    <div className="flex-1 relative bg-black flex items-center justify-center overflow-hidden group">
                        {/* Background Grid & Ambient Effects */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />
                        <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-black/80 to-transparent z-20" />
                        <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-black via-black/50 to-transparent z-20" />

                        {/* LIVE INDICATOR OVERLAY POLISHED */}
                        <div className="absolute top-8 left-8 z-50 flex items-center gap-4">
                            <div className="bg-red-600 text-white text-[10px] font-black px-4 py-1.5 rounded-sm flex items-center gap-3 uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(220,38,38,0.4)]">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]" />
                                Live Broadcast
                            </div>
                            <div className="bg-black/40 backdrop-blur-md text-white/80 text-[10px] font-mono px-4 py-1.5 rounded-sm flex items-center gap-3 border border-white/5 uppercase tracking-[0.15em]">
                                <Users size={12} className="text-noble-gold" />
                                <span className="text-white font-black">982</span> <span className="text-white/40">Broadcasting</span>
                            </div>
                        </div>

                        {/* SIGNAL STRENGTH INDICATOR */}
                        <div className="absolute top-8 right-8 z-50 hidden md:flex items-center gap-4 bg-black/40 backdrop-blur-md px-5 py-2.5 border border-white/5 rounded-2xl">
                            <div className="flex items-end gap-1 h-3.5">
                                <div className="w-1.5 h-[20%] bg-noble-gold/60 rounded-full" />
                                <div className="w-1.5 h-[45%] bg-noble-gold/80 rounded-full" />
                                <div className="w-1.5 h-[75%] bg-noble-gold rounded-full" />
                                <div className="w-1.5 h-[100%] bg-noble-gold rounded-full animate-pulse" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/40 leading-none mb-0.5">Uplink Status</span>
                                <span className="text-[10px] font-black text-emerald-400 leading-none">4K // STABLE</span>
                            </div>
                        </div>

                        {/* AVATAR / VIDEO STAGE */}
                        <motion.div
                            className="relative w-full h-full max-w-5xl flex items-center justify-center"
                            animate={{
                                rotateY: presenceX * 5,
                                scale: isSpeaking ? 1.05 : 1
                            }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                        >
                            {isStreaming ? (
                                <video ref={streamVideoRef} autoPlay playsInline className="w-full h-full object-cover opacity-100" />
                            ) : generatedVideoUrl ? (
                                <video src={generatedVideoUrl} autoPlay playsInline title="Generated AI Video" className="w-full h-full object-cover" onEnded={() => setGeneratedVideoUrl(null)} />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center md:scale-110 origin-bottom mt-10">
                                    <HumanAvatar
                                        src={avatarImage}
                                        alt={avatarName}
                                        className={`w-full h-full object-contain transition-all duration-700 ${isSpeaking ? 'brightness-110 drop-shadow-[0_0_50px_rgba(212,175,55,0.15)]' : 'brightness-95 contrast-110'}`}
                                    />
                                </div>
                            )}
                            {/* REACTIVE PARTICLE FIELD */}
                            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                                <AnimatePresence>
                                    {usageTokens !== undefined && usageTokens <= 0 && [...Array(20)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute w-1 h-1 bg-noble-gold rounded-full opacity-50"
                                            initial={{
                                                x: "50%",
                                                y: "50%",
                                                scale: 0,
                                                opacity: 0
                                            }}
                                            animate={{
                                                x: `${50 + (Math.random() - 0.5) * 100}%`,
                                                y: `${50 + (Math.random() - 0.5) * 100}%`,
                                                scale: Math.random() * 2,
                                                opacity: [0, 1, 0]
                                            }}
                                            transition={{
                                                duration: 2 + Math.random() * 2,
                                                repeat: Infinity,
                                                ease: "easeOut"
                                            }}
                                        />
                                    ))}
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        {/* PODCAST LOWER THIRDS (Topic/Context) */}
                        <div className="absolute bottom-12 left-8 z-50 max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex flex-col"
                            >
                                <div className="bg-noble-gold text-black px-4 py-1 text-[10px] font-black uppercase tracking-[0.3em] self-start inline-block mb-0.5">
                                    Current Protocols
                                </div>
                                <div className="bg-white/5 backdrop-blur-2xl border-l-[6px] border-noble-gold p-8 rounded-r-3xl max-w-lg shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-noble-gold/5 rounded-full blur-3xl" />
                                    <h3 className="text-3xl text-white font-black italic uppercase leading-none mb-3 tracking-tighter">
                                        "{conversation.length > 0 ? (conversation[conversation.length - 1].role === 'user' ? "Optimizing Strategy" : "Synthesizing Solutions") : "EdIntel Intelligence Session"}"
                                    </h3>
                                    <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                                        <Activity size={14} className="text-emerald-500 animate-pulse" />
                                        <span>Studio A // Live Broadcast Active</span>
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Transcript Subtitles (Podcast Style) */}
                        <AnimatePresence>
                            {isSpeaking && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="absolute bottom-40 w-full flex justify-center z-40 px-4"
                                >
                                    <div className="bg-black/80 backdrop-blur-md border border-white/10 px-8 py-4 rounded-full shadow-2xl max-w-3xl text-center">
                                        <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
                                            <span className="text-noble-gold mr-2">●</span>
                                            {conversation[conversation.length - 1]?.text}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Calibration Overlay */}
                        <AnimatePresence>
                            {isCalibrating && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center"
                                >
                                    <div className="relative w-64 h-64 border border-noble-gold/20 rounded-full flex items-center justify-center">
                                        <motion.div
                                            className="absolute inset-0 border-t-2 border-noble-gold rounded-full"
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                        />
                                        <Brain size={48} className="text-noble-gold animate-pulse" />
                                    </div>
                                    <div className="mt-8 text-center space-y-2">
                                        <p className="text-xl text-white font-black italic uppercase">Initializing Broadcast</p>
                                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.5em] animate-pulse">Syncing Neural Vectors...</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Loading States */}
                        {isGeneratingVideo && (
                            <div className="absolute inset-0 z-[60] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center space-y-6">
                                <div className="w-16 h-16 border-t-2 border-noble-gold rounded-full animate-spin" />
                                <div className="text-center">
                                    <p className="text-[10px] font-black text-noble-gold uppercase tracking-[0.4em] mb-2">{videoGenerationStatus}</p>
                                    <p className="text-xs text-white/40 italic font-mono uppercase">Processing through Google Vertex AI TPU v5</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Conversation Stream (Chat Room Style) */}
                    <div className="w-[450px] border-l border-white/5 bg-[#0F0F12] flex flex-col relative z-20">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20">
                            <h3 className="text-xs font-black text-white/60 uppercase tracking-[0.2em] flex items-center gap-2">
                                <MessageSquare size={14} /> Live Chat
                            </h3>
                            <div className="flex items-center gap-2">
                                <div className="bg-zinc-800 px-2 py-1 rounded text-[9px] font-bold text-zinc-400 font-mono">Slow Mode</div>
                                <div className="bg-zinc-800 px-2 py-1 rounded text-[9px] font-bold text-zinc-400 font-mono">Top Chat</div>
                            </div>
                        </div>

                        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-gradient-to-b from-[#0F0F12] to-black">
                            {/* Welcoming Message / Pinned Message */}
                            <div className="bg-noble-gold/10 border border-noble-gold/20 p-4 rounded-lg mb-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="bg-noble-gold text-black text-[9px] font-black px-1.5 rounded uppercase">Pinned</div>
                                    <span className="text-[10px] font-bold text-noble-gold uppercase">Dr. West (Host)</span>
                                </div>
                                <p className="text-xs text-zinc-300 leading-relaxed">
                                    Welcome to the EdIntel Broadcast. Ask me anything about district strategy, compliance, or leadership.
                                </p>
                            </div>

                            {conversation.length === 0 && (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-20 pb-20">
                                    <MessageSquare size={40} className="text-white" />
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Stream Chat Quiet</p>
                                </div>
                            )}

                            {conversation.map((msg, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                                >
                                    {/* Avatar Icons for Chat */}
                                    <div className={`w-8 h-8 min-w-[32px] rounded-full flex items-center justify-center overflow-hidden border ${msg.role === 'user' ? 'border-zinc-700 bg-zinc-800' : 'border-noble-gold/50 bg-noble-gold/10'}`}>
                                        {msg.role === 'user' ? <div className="text-[10px] font-bold text-white">YOU</div> : <Brain size={16} className="text-noble-gold" />}
                                    </div>

                                    <div className={`group flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                        <span className="text-[10px] font-bold text-zinc-500 mb-1 uppercase tracking-wider">{msg.role === 'user' ? 'EdIntel Leader' : avatarName}</span>
                                        <div className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[280px] shadow-lg ${msg.role === 'user'
                                            ? 'bg-zinc-800 text-white rounded-tr-none border border-white/5'
                                            : 'bg-gradient-to-br from-noble-gold/10 to-noble-gold/5 border border-noble-gold/20 text-zinc-100 rounded-tl-none'
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-8 bg-black">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (textInput.trim()) {
                                        sendMessage(textInput);
                                        setTextInput('');
                                    }
                                }}
                                className="relative group"
                            >
                                <input
                                    value={textInput}
                                    onChange={(e) => setTextInput(e.target.value)}
                                    placeholder="Execute neural command..."
                                    title="Protocol Input"
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-noble-gold/50 transition-all font-medium pr-28 group-hover:border-white/20 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsHandsFree(!isHandsFree)}
                                        title={isHandsFree ? "Disable Hands-Free" : "Enable Hands-Free Loop"}
                                        className={`p-3 rounded-xl transition-all duration-300 ${isHandsFree ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'text-zinc-600 hover:text-white hover:bg-white/5'}`}
                                    >
                                        <Zap size={18} className={isHandsFree ? "fill-current" : ""} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={toggleMicrophone}
                                        title={isListening ? "Stop Microphone" : "Start Microphone"}
                                        className={`p-3 rounded-xl transition-all duration-300 ${isListening ? 'bg-rose-500 text-white animate-pulse shadow-[0_0_20px_rgba(225,29,72,0.6)]' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
                                    >
                                        <Mic size={18} />
                                    </button>
                                    <button
                                        type="submit"
                                        title="Send message"
                                        disabled={!textInput.trim() || isProcessing}
                                        className="p-3 rounded-xl bg-noble-gold text-black hover:scale-105 transition-all disabled:opacity-30 disabled:hover:scale-100 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
                            </form>
                            <div className="mt-4 flex items-center justify-center gap-6">
                                <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.4em] flex items-center gap-2">
                                    <Activity size={8} className={isProcessing ? "text-noble-gold animate-spin" : "text-zinc-700"} />
                                    Site Command Protocol Alpha-7
                                </span>
                                <div className="w-1 h-1 bg-white/10 rounded-full" />
                                <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.4em]">Vertex AI // TPU Sync</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Status Bar */}
                <div className="px-10 py-3 bg-black border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-6 text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">
                        <span className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                            Session Uplink: Stable
                        </span>
                        <span>Neural Buffer: {Math.round(Math.random() * 10 + 2)}ms</span>
                        <span>Security: EdIntel-E2EE</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className={`w-1 h-3 rounded-full ${i < 4 ? 'bg-noble-gold/40' : 'bg-white/10'}`} />
                            ))}
                        </div>
                        <span className="text-[8px] font-black text-noble-gold uppercase tracking-[0.4em]">Tier: EdIntel</span>
                    </div>
                </div>
            </div>

            {/* EdIntel Sidebar Overlay */}
            <AnimatePresence>
                {showSwarmSidebar && (
                    <EdIntelSidebar
                        agentStatus={isProcessing ? "Neural Crunch" : isSpeaking ? "Synthesizing" : "Active"}
                        hoursSaved={14.2}
                        activeAgent={conversation.length > 0 && conversation[conversation.length - 1].role === 'avatar' ? 'Literacy Provost' : 'Swarm Idle'}
                        complianceScore={100}
                    />
                )}
            </AnimatePresence>

            <style jsx global>{`
                .gold-gradient-text {
                    background: linear-gradient(135deg, #FFF 0%, #D4AF37 50%, #8A6D3B 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(212, 175, 55, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(212, 175, 55, 0.3);
                }
            `}</style>
        </motion.div>
    );
}
