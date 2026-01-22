'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
    Users, Shield, Activity, Brain, Command,
    MessageSquare, AlertCircle, FileText, X,
    ChevronRight, Mic, Video, Radio, Target,
    Github, Globe, Cloud, Zap, Cpu
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import LiveAvatarChat from './LiveAvatarChat';
import { useHumanBehavior } from '@/hooks/useHumanBehavior';
import { useLeadershipRank } from '@/hooks/useLeadershipRank';
import { CORE_AVATARS } from '@/data/avatars';
import { usePathname } from 'next/navigation';
import { SOVEREIGN_PROTOCOLS, DEFAULT_PROTOCOL } from '@/data/sovereign-protocols';

const HolographicBriefing = dynamic(() => import('./HolographicBriefing'), { ssr: false });

interface Delegate {
    id: string;
    name: string;
    role: string;
    status: 'active' | 'busy' | 'offline';
    avatar: string;
    video: string;
    specialty: string;
    heygenId?: string;
    voiceId?: string;
    clearance: 'L1' | 'L2' | 'L3' | 'Sovereign' | 'Executive Sovereign' | 'Quantum';
}

interface SovereignDelegateProps {
    initialOpen?: boolean;
    greetingOverride?: string;
}

export default function SovereignDelegate({ initialOpen = false, greetingOverride }: SovereignDelegateProps) {
    // 1. SAFE RENDER GATE - Prevents Hydration Mismatch
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    const { user } = useAuth();
    const pathname = usePathname();
    const { isSovereign } = useLeadershipRank();

    // 2. State & Hooks
    const [currentProtocol, setCurrentProtocol] = useState(DEFAULT_PROTOCOL);
    const [showNotification, setShowNotification] = useState(false);

    // Call hook at top level - NEVER inside JSX
    const humanBehavior = useHumanBehavior(true);

    // Context Logic
    useEffect(() => {
        if (!isMounted) return;
        const protocol = SOVEREIGN_PROTOCOLS[pathname] || DEFAULT_PROTOCOL;
        setCurrentProtocol(protocol);

        // Announce context change with a slight delay
        const delay = setTimeout(() => {
            setShowNotification(true);
        }, 1000);

        const hide = setTimeout(() => setShowNotification(false), 9000);
        return () => { clearTimeout(delay); clearTimeout(hide); };
    }, [pathname, isMounted]);

    const INITIAL_DELEGATES: Delegate[] = CORE_AVATARS.map(avatar => ({
        id: avatar.id,
        name: avatar.name || 'Unknown Delegate',
        role: avatar.role,
        status: (avatar.status as 'active' | 'busy' | 'offline') || 'active',
        avatar: avatar.avatar,
        video: avatar.video,
        specialty: avatar.specialty,
        heygenId: avatar.heygenId,
        voiceId: avatar.voiceId,
        clearance: (avatar.clearance as Delegate['clearance']) || 'L1'
    }));

    const [delegates] = useState<Delegate[]>(INITIAL_DELEGATES);
    const [isOpen, setIsOpen] = useState(initialOpen);
    const [selectedDelegate, setSelectedDelegate] = useState<Delegate | null>(INITIAL_DELEGATES[0]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [showBriefing, setShowBriefing] = useState(false);
    const [activeTab, setActiveTab] = useState<'uplink' | 'voice'>('uplink');
    const [isRecording, setIsRecording] = useState(false);
    const [voiceProgress, setVoiceProgress] = useState(0);

    // Voice Calibration Logic
    useEffect(() => {
        if (isRecording) {
            const interval = setInterval(() => {
                setVoiceProgress(prev => {
                    if (prev >= 100) {
                        setIsRecording(false);
                        return 100;
                    }
                    return prev + 2;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [isRecording]);

    const [twinImage, setTwinImage] = useState<string | null>(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setTwinImage(localStorage.getItem('edintel_twin_image'));
        }
    }, []);

    // Auto-open Sovereign Mode on 'Ctrl+Space'
    useEffect(() => {
        if (!isMounted) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.code === 'Space') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isMounted]);

    const [isScanningIdentity, setIsScanningIdentity] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsScanningIdentity(true);
            setTimeout(() => setIsScanningIdentity(false), 2000);
        }
    }, [isOpen]);

    if (!isMounted) return null;

    return (
        <>
            {/* The Trigger Pill - NOW A LIVE VIDEO BUBBLE */}
            <motion.div
                className="fixed bottom-6 right-6 z-50 pointer-events-auto group flex flex-col items-end gap-2"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, type: "spring" }}
            >
                {/* CONTEXTUAL SPEECH BUBBLE */}
                <AnimatePresence>
                    {(showNotification) && (
                        <motion.div
                            key="notification-bubble"
                            initial={{ opacity: 0, scale: 0.8, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.8, x: 20 }}
                            onClick={() => { setIsOpen(true); setShowBriefing(true); }}
                            className="bg-black/90 backdrop-blur-xl border border-amber-500/30 p-4 rounded-2xl rounded-br-none max-w-xs shadow-2xl cursor-pointer hover:bg-zinc-900 transition-colors mb-2 mr-2 pointer-events-auto"
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest">{currentProtocol.context}</span>
                            </div>
                            <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                                "{currentProtocol.message}"
                            </p>
                            {currentProtocol.suggestedAction && (
                                <div className="mt-2 text-[9px] text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1">
                                    <span className="text-white">Suggested:</span> {currentProtocol.actionLabel || 'Execute'} <ChevronRight size={8} />
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={() => setIsOpen(true)}
                    className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.2)] bg-black transition-transform hover:scale-105 hover:border-amber-400 group-hover:shadow-[0_0_50px_rgba(245,158,11,0.4)]"
                >
                    <video
                        src={selectedDelegate ? selectedDelegate.video : ''}
                        autoPlay loop muted playsInline
                        className={`w-full h-full object-cover scale-150 translate-y-2 pointer-events-none transition-all duration-500 ${currentProtocol.videoBehavior === 'focus' ? 'brightness-110 saturate-120' : ''}`}
                    />

                    {/* Living Status Ring */}
                    <div className={`absolute inset-0 rounded-full border border-amber-500/20 animate-spin-slow ${currentProtocol.videoBehavior === 'alert' ? 'border-red-500/40' : ''}`} />

                    {/* Status Dot */}
                    <div className="absolute bottom-2 right-2 w-3 h-3 bg-emerald-500 border-2 border-black rounded-full shadow-[0_0_10px_#10b981]" />
                </button>
            </motion.div>

            {/* Main Command Interface */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="main-modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            key="modal-content"
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 50 }}
                            className="w-full max-w-4xl bg-[#09090b] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-zinc-900/50 relative overflow-hidden">
                                {isScanningIdentity && (
                                    <motion.div
                                        initial={{ top: -100 }}
                                        animate={{ top: "100%" }}
                                        transition={{ duration: 2, ease: "linear" }}
                                        className="absolute left-0 right-0 h-1 bg-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.5)] z-20 pointer-events-none"
                                    />
                                )}
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                                        <Command className="text-amber-500 w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold text-white tracking-tight">
                                            {isScanningIdentity ? 'Biometric Calibration...' : 'Sovereign Delegate Protocol'}
                                        </h2>
                                        <p className="text-xs text-zinc-500 font-mono">
                                            {isScanningIdentity ? 'VERIFYING RETINAL MESH' : 'AUTHORIZED: EXECUTIVE LEVEL'}
                                        </p>
                                    </div>
                                </div>

                                {/* CLOUD INFRASTRUCTURE HUD */}
                                <div className="hidden md:flex items-center gap-6 px-6 py-2 rounded-2xl bg-black/40 border border-white/5">
                                    <div className="flex items-center gap-2">
                                        <Github size={12} className="text-white/60" />
                                        <div className="flex flex-col">
                                            <span className="text-[8px] text-zinc-600 font-bold uppercase">Github</span>
                                            <span className="text-[9px] text-emerald-500 font-mono">CI/CD: ACTIVE</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Cloud size={12} className="text-white/60" />
                                        <div className="flex flex-col">
                                            <span className="text-[8px] text-zinc-600 font-bold uppercase">Google Cloud</span>
                                            <span className="text-[9px] text-emerald-500 font-mono">NODE: ALABAMA_1</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Zap size={12} className="text-amber-500" />
                                        <div className="flex flex-col">
                                            <span className="text-[8px] text-zinc-600 font-bold uppercase">Vercel Edge</span>
                                            <span className="text-[9px] text-emerald-500 font-mono">GLOBAL_MESH</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-full hover:bg-white/5 text-zinc-500 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Content Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[400px]">
                                {/* Sidebar: Delegate Selection */}
                                <div className="col-span-12 md:col-span-4 border-r border-white/5 bg-zinc-900/20 p-4 space-y-2">
                                    <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-2 mb-2">Available Delegates</div>
                                    {delegates.map((delegate) => (
                                        <button
                                            key={delegate.id}
                                            onClick={() => setSelectedDelegate(delegate)}
                                            className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${selectedDelegate?.id === delegate.id
                                                ? 'bg-amber-500/10 border border-amber-500/30'
                                                : 'hover:bg-white/5 border border-transparent'
                                                }`}
                                        >
                                            <div className="relative">
                                                <img
                                                    src={delegate.avatar}
                                                    alt={delegate.name}
                                                    onError={(e) => e.currentTarget.src = '/images/avatars/executive_leader.png'}
                                                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                                                />
                                                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#09090b] ${delegate.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'
                                                    }`} />
                                            </div>
                                            <div className="text-left">
                                                <div className={`text-sm font-bold ${selectedDelegate?.id === delegate.id ? 'text-amber-100' : 'text-zinc-300'}`}>
                                                    {delegate.name}
                                                </div>
                                                <div className="text-[10px] text-zinc-500">{delegate.role}</div>
                                                {(delegate.name.includes("Alvin") || delegate.id === 'user_twin') && (
                                                    <div className="flex items-center gap-1 mt-0.5">
                                                        <Mic size={8} className="text-emerald-500" />
                                                        <span className="text-[8px] text-emerald-500 font-mono tracking-tight uppercase">Voice Synced</span>
                                                    </div>
                                                )}
                                            </div>
                                            {selectedDelegate?.id === delegate.id && (
                                                <div className="ml-auto">
                                                    <Activity size={14} className="text-amber-500" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {/* Main Interaction Area */}
                                <div className="col-span-12 md:col-span-8 p-8 relative flex flex-col">
                                    {selectedDelegate ? (
                                        <>
                                            {/* Tabs */}
                                            <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4">
                                                <button
                                                    onClick={() => setActiveTab('uplink')}
                                                    className={`text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all ${activeTab === 'uplink' ? 'bg-amber-500/20 text-amber-500 ring-1 ring-amber-500/50' : 'text-zinc-500 hover:text-zinc-300'}`}
                                                >
                                                    Neural Uplink
                                                </button>
                                                <button
                                                    onClick={() => setActiveTab('voice')}
                                                    className={`text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all ${activeTab === 'voice' ? 'bg-amber-500/20 text-amber-500 ring-1 ring-amber-500/50' : 'text-zinc-500 hover:text-zinc-300'}`}
                                                >
                                                    Voice Calibration
                                                </button>
                                            </div>

                                            {activeTab === 'uplink' ? (
                                                <div className="h-full flex flex-col">
                                                    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                                                        <div className="relative w-32 h-32">
                                                            <div className="absolute inset-0 rounded-full border-2 border-amber-500/20 animate-spin-slow" />
                                                            <div className="absolute inset-2 rounded-full border border-amber-500/10 animate-reverse-spin" />
                                                            <motion.img
                                                                src={selectedDelegate.id === 'user_twin' ? (twinImage || selectedDelegate.avatar) : selectedDelegate.avatar}
                                                                alt={selectedDelegate.name}
                                                                className="w-full h-full rounded-full object-cover p-2"
                                                                animate={humanBehavior.behaviorStyles}
                                                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                                            />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter">{selectedDelegate.specialty}</h3>
                                                            <p className="text-sm text-zinc-400 mt-2 max-w-sm mx-auto leading-relaxed">
                                                                {currentProtocol.message}
                                                            </p>
                                                        </div>

                                                        <div className="flex flex-wrap justify-center gap-3 w-full max-w-md">
                                                            <button
                                                                onClick={() => setIsChatOpen(true)}
                                                                className="flex-1 py-4 bg-white text-black rounded-xl font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-2"
                                                            >
                                                                <MessageSquare size={16} />
                                                                Initiate Uplink
                                                            </button>
                                                            <button
                                                                onClick={() => setShowBriefing(true)}
                                                                className="flex-1 py-4 bg-zinc-800 text-white rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
                                                            >
                                                                <Video size={16} />
                                                                Visual Briefing
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                                    <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center relative overflow-hidden">
                                                        {isRecording ? (
                                                            <>
                                                                <div className="absolute inset-0 bg-red-500/20 animate-pulse" />
                                                                <div className="flex items-end items-center gap-1 h-12">
                                                                    {[1, 2, 3, 4, 5].map(i => (
                                                                        <motion.div
                                                                            key={i}
                                                                            className="w-1 bg-red-500 rounded-full"
                                                                            animate={{ height: [10, 40, 10] }}
                                                                            transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </>
                                                        ) : voiceProgress === 100 ? (
                                                            <Shield className="w-10 h-10 text-emerald-500" />
                                                        ) : (
                                                            <Mic className="w-10 h-10 text-zinc-500" />
                                                        )}
                                                    </div>

                                                    <div className="space-y-4 max-w-md">
                                                        <h4 className="text-lg font-bold text-white uppercase tracking-tight">
                                                            {voiceProgress === 100 ? 'Voice Matrix Secure' : 'Neural Voice Calibration'}
                                                        </h4>
                                                        <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 relative">
                                                            <p className="font-serif italic text-zinc-400 text-lg">
                                                                "I, {selectedDelegate.name}, authorize the use of my neural pattern for executive decision making."
                                                            </p>
                                                            {voiceProgress === 100 && (
                                                                <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/80 backdrop-blur-sm rounded-2xl">
                                                                    <div className="flex items-center gap-2 text-emerald-500 font-bold uppercase tracking-widest text-xs">
                                                                        <Shield size={14} />
                                                                        Verified
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {voiceProgress < 100 && (
                                                        <button
                                                            onClick={() => { setIsRecording(true); setVoiceProgress(0); }}
                                                            disabled={isRecording}
                                                            className={`px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all ${isRecording
                                                                ? 'bg-red-500/10 text-red-500 cursor-not-allowed'
                                                                : 'bg-zinc-100 text-zinc-900 hover:scale-105 shadow-xl'
                                                                }`}
                                                        >
                                                            {isRecording ? 'Calibrating...' : 'Begin Voice Capture'}
                                                        </button>
                                                    )}

                                                    {/* Progress Bar */}
                                                    {(isRecording || voiceProgress > 0) && (
                                                        <div className="w-64 h-2 bg-zinc-800 rounded-full overflow-hidden">
                                                            <motion.div
                                                                className={`h-full ${voiceProgress === 100 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                                                                style={{ width: `${voiceProgress}%` }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-zinc-600 opacity-50">
                                            <Radio size={48} className="mb-4" />
                                            <p className="font-mono text-xs uppercase tracking-widest">Select a Sovereign Delegate to Begin</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Decorative Footer */}
                            <div className="h-1 bg-gradient-to-r from-amber-600 via-purple-600 to-indigo-600" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* The Actual Conversation Interface */}
            <AnimatePresence>
                {isChatOpen && selectedDelegate && (
                    <LiveAvatarChat
                        key="live-chat"
                        isOpen={isChatOpen}
                        onClose={() => setIsChatOpen(false)}
                        avatarName={selectedDelegate.name}
                        avatarRole={selectedDelegate.role}
                        avatarImage={selectedDelegate.avatar}
                        avatarVoice={selectedDelegate.voiceId}
                        greetingText={greetingOverride || `Sovereign Uplink Established. I am ${selectedDelegate.name}. How can I assist you with high-level strategy today?`}
                        theme="professional"
                        heygenId={selectedDelegate.heygenId}
                        avatarVideo={selectedDelegate.video}
                        tokensRemaining={9999} // Unlimited for Sovereign
                        onShowBriefing={() => setShowBriefing(true)}
                    />
                )}
            </AnimatePresence>

            {/* Visual Briefing Overlay */}
            <AnimatePresence>
                {showBriefing && selectedDelegate && (
                    <HolographicBriefing
                        key="hologram"
                        isOpen={showBriefing}
                        onClose={() => setShowBriefing(false)}
                        title={currentProtocol.context || "Executive Sovereign Briefing"}
                        description={currentProtocol.message || `Connecting to secure neural feed of ${selectedDelegate.name}. Stand by for directive.`}
                        avatarImage={selectedDelegate.avatar}
                        videoSrc={selectedDelegate.video}
                        role={selectedDelegate.role}
                        theme="professional"
                        // Stats can be dynamic later, hardcoded for impact now
                        stats={{
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            saved: "127h",
                            accuracy: "99.8%"
                        }}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
