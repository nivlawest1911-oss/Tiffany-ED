'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
    Shield, Activity,
    MessageSquare, X,
    Mic, Trophy, Zap, Bell,
    Cpu
} from 'lucide-react';
import LiveAvatarChat from './LiveAvatarChat';
import { useAuth } from '@/context/AuthContext';
import { CORE_AVATARS } from '@/data/avatars';
import { usePathname } from 'next/navigation';
import { SOVEREIGN_PROTOCOLS, DEFAULT_PROTOCOL } from '@/data/sovereign-protocols';
import HumanAvatar from './ui/HumanAvatar';
import EdIntelPivot from './ui/EdIntelPivot';
import SovereignInteractionAgent from './SovereignInteractionAgent';

const SovereignMediaVault = dynamic(() => import('./SovereignMediaVault'), { ssr: false });

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

export default function SovereignDelegate({ initialOpen = false }: SovereignDelegateProps) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    const pathname = usePathname();
    const { user } = useAuth();
    if (user) console.log("Identity Clearance Established");

    const [currentProtocol, setCurrentProtocol] = useState(DEFAULT_PROTOCOL);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        if (!isMounted) return;
        const protocol = SOVEREIGN_PROTOCOLS[pathname] || DEFAULT_PROTOCOL;
        setCurrentProtocol(protocol);

        const delay = setTimeout(() => {
            setShowNotification(true);
        }, 2000);

        const hide = setTimeout(() => setShowNotification(false), 10000);
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
    const [activeTab, setActiveTab] = useState<'uplink' | 'voice' | 'vault'>('uplink');
    const [isRecording, setIsRecording] = useState(false);
    const [voiceProgress, setVoiceProgress] = useState(0);

    useEffect(() => {
        if (isRecording) {
            const interval = setInterval(() => {
                setVoiceProgress(prev => {
                    if (prev >= 100) {
                        setIsRecording(false);
                        return 100;
                    }
                    return prev + 1.5;
                });
            }, 60);
            return () => clearInterval(interval);
        } else {
            setVoiceProgress(0);
        }
    }, [isRecording]);

    if (!isMounted) return null;

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-6 pointer-events-none">
            {/* Context Notification Toast */}
            <AnimatePresence>
                {showNotification && !isOpen && !isChatOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.9, rotate: 2 }}
                        animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: 20 }}
                        className="pointer-events-auto liquid-glass p-5 pr-14 max-w-sm relative group border-noble-gold/40 shadow-[0_0_40px_rgba(212,175,55,0.15)] rounded-[1.5rem]"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-noble-gold/10 flex items-center justify-center text-noble-gold border border-noble-gold/30">
                                <Bell size={18} className="animate-pulse" />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[9px] font-black uppercase text-noble-gold tracking-[0.3em]">Neural Protocol</span>
                                    <div className="w-1 h-1 rounded-full bg-noble-gold animate-ping" />
                                </div>
                                <p className="text-sm text-white font-bold leading-tight">{currentProtocol.message}</p>
                                <p className="text-[10px] text-white/40 mt-1 uppercase tracking-widest font-black italic">Sovereign OS // Auto-Sync</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowNotification(false)}
                            className="absolute top-4 right-4 p-1 text-white/20 hover:text-white transition-colors"
                            title="Dismiss Notification"
                        >
                            <X size={16} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tactical Intelligence Node */}
            <div className="pointer-events-auto pr-4">
                <SovereignInteractionAgent
                    title="Intelligence Pivot"
                    description="Open the real-time system diagnostic and tactical synchronization module."
                    agentId="tactical"
                    position="left"
                >
                    <EdIntelPivot />
                </SovereignInteractionAgent>
            </div>

            {/* Launch Action Node */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.05, rotate: isOpen ? -90 : 0 }}
                whileTap={{ scale: 0.9 }}
                className="pointer-events-auto group relative w-20 h-20 rounded-[2rem] liquid-glass border-noble-gold/50 flex items-center justify-center shadow-[0_0_50px_rgba(212,175,55,0.3)] transition-all duration-500 overflow-hidden"
                title={isOpen ? "Close Command Center" : "Open Sovereign Command Center"}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-noble-gold/20 via-transparent to-noble-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                            <X className="text-white w-8 h-8" strokeWidth={1.5} />
                        </motion.div>
                    ) : (
                        <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                            <Shield className="text-noble-gold w-8 h-8 drop-shadow-[0_0_10px_rgba(212,175,55,0.8)]" strokeWidth={1.5} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Sovereign Command Center */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 40, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.95, y: 40, filter: 'blur(10px)' }}
                        className="pointer-events-auto w-full h-screen md:w-[900px] md:h-[700px] bg-[#0A0E1A]/90 backdrop-blur-3xl flex flex-col overflow-hidden border border-white/10 md:rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.9)] fixed inset-0 md:relative z-[150]"
                    >
                        {/* Elite Status Bar */}
                        <div className="p-6 bg-white/[0.03] border-b border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <SovereignInteractionAgent
                                    title="Neural Synchronicity"
                                    description="Active system heat map showing real-time connectivity across the district command mesh."
                                    agentId="visionary"
                                    position="bottom"
                                >
                                    <div className="flex items-center gap-3 px-4 py-2 bg-noble-gold/10 rounded-xl border border-noble-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.1)] cursor-help">
                                        <Activity size={14} className="text-noble-gold animate-pulse" />
                                        <span className="text-[10px] font-black text-noble-gold uppercase tracking-[0.3em]">Neural Status: Operational</span>
                                    </div>
                                </SovereignInteractionAgent>
                                <div className="hidden md:flex flex-col">
                                    <div className="text-[8px] font-black text-white/30 uppercase tracking-[0.4em] flex items-center gap-2">
                                        <Activity size={10} className="text-noble-gold/50" />
                                        Signal Strength
                                    </div>
                                    <div className="text-[11px] font-black text-white/80 uppercase tracking-widest italic">Encrypted Broadcast Sync</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-end mr-4">
                                    <div className="text-[8px] font-black text-white/30 uppercase tracking-[0.4em]">Live Listeners</div>
                                    <div className="text-xs font-black text-noble-gold tracking-tight">12.4k Distributed</div>
                                </div>
                                <div className="w-px h-8 bg-white/10 mx-2" />
                                <SovereignInteractionAgent
                                    title="Leadership Roster"
                                    description="Review the tactical achievements and professional milestones recorded in the Sovereign ledger."
                                    agentId="strategic"
                                    position="left"
                                >
                                    <button
                                        className="w-10 h-10 rounded-xl bg-white/5 hover:bg-noble-gold hover:text-black transition-all flex items-center justify-center group"
                                        title="View Leadership Achievements"
                                    >
                                        <Trophy size={16} className="text-white/40 group-hover:text-inherit" />
                                    </button>
                                </SovereignInteractionAgent>
                            </div>
                        </div>

                        <div className="flex-1 grid grid-cols-12 overflow-hidden">
                            {/* Delegate Roster Sidebar */}
                            <div className={`${selectedDelegate && !isChatOpen ? 'hidden md:block' : 'block'} col-span-12 md:col-span-4 border-r border-white/5 bg-black/40 overflow-y-auto p-4 md:p-6 space-y-3 custom-scrollbar`}>
                                <div className="flex items-center justify-between mb-6 px-2">
                                    <p className="text-[10px] font-black text-noble-gold uppercase tracking-[0.3em]">Available Hosts</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                        <span className="text-[8px] font-bold text-red-500 uppercase tracking-widest">Live Now</span>
                                    </div>
                                </div>
                                {delegates.map((delegate) => (
                                    <button
                                        key={delegate.id}
                                        onClick={() => {
                                            setSelectedDelegate(delegate);
                                        }}
                                        className={`w-full p-3 md:p-4 rounded-2xl flex items-center gap-4 transition-all duration-500 group relative overflow-hidden
                                            ${selectedDelegate?.id === delegate.id
                                                ? 'bg-noble-gold/15 border border-noble-gold/40 shadow-[0_0_20px_rgba(212,175,55,0.05)]'
                                                : 'hover:bg-white/5 border border-transparent opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        <div className="relative z-10">
                                            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl overflow-hidden border-2 transition-all duration-500 ${selectedDelegate?.id === delegate.id ? 'border-noble-gold' : 'border-white/10 group-hover:border-noble-gold/30'}`}>
                                                <HumanAvatar
                                                    src={delegate.avatar}
                                                    alt={delegate.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className={`absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-black ${delegate.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`} />
                                        </div>
                                        <div className="text-left flex-1 relative z-10">
                                            <div className={`text-xs md:text-sm font-black uppercase tracking-tight ${selectedDelegate?.id === delegate.id ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>
                                                {delegate.name}
                                            </div>
                                            <div className="text-[8px] md:text-[9px] text-noble-gold/60 uppercase tracking-widest font-black italic mt-0.5">{delegate.role}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className={`${!selectedDelegate ? 'hidden md:flex' : 'flex'} col-span-12 md:col-span-8 p-6 md:p-10 relative flex-col bg-zinc-950/40`}>
                                {selectedDelegate ? (
                                    <>
                                        {/* Navigation Protocols */}
                                        <div className="flex items-center gap-4 md:gap-8 mb-6 md:mb-10 border-b border-white/5 pb-6 overflow-x-auto no-scrollbar">
                                            {[
                                                { id: 'uplink', label: 'Podcast', icon: Zap },
                                                { id: 'voice', label: 'Audio', icon: Mic },
                                                { id: 'vault', label: 'Vault', icon: Shield }
                                            ].map(tab => (
                                                <button
                                                    key={tab.id}
                                                    onClick={() => setActiveTab(tab.id as any)}
                                                    className={`flex items-center gap-2 md:gap-3 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] transition-all relative whitespace-nowrap
                                                        ${activeTab === tab.id ? 'text-noble-gold' : 'text-white/30 hover:text-white/60'}`}
                                                >
                                                    <tab.icon size={13} className={activeTab === tab.id ? 'animate-pulse' : ''} />
                                                    {tab.label}
                                                </button>
                                            ))}
                                            {selectedDelegate && (
                                                <button
                                                    onClick={() => setSelectedDelegate(null)}
                                                    className="md:hidden ml-auto text-[9px] font-black uppercase tracking-widest text-zinc-600"
                                                >
                                                    Back
                                                </button>
                                            )}
                                        </div>

                                        <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar relative">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={activeTab}
                                                    initial={{ opacity: 0, y: 15, filter: 'blur(10px)' }}
                                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                                    exit={{ opacity: 0, y: -15, filter: 'blur(10px)' }}
                                                    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                                                    className="h-full"
                                                >
                                                    {activeTab === 'uplink' && (
                                                        <div className="h-full flex flex-col items-center justify-center text-center space-y-10 py-10">
                                                            <div className="relative group">
                                                                <div className="absolute -inset-10 bg-noble-gold/10 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity" />
                                                                <div className="relative w-40 h-40 md:w-56 md:h-56">
                                                                    <motion.div
                                                                        className="absolute -inset-4 md:-inset-6 rounded-full border border-noble-gold/20 border-t-noble-gold"
                                                                        animate={{ rotate: 360 }}
                                                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                                                    />
                                                                    <motion.div
                                                                        className="absolute -inset-2 md:-inset-3 rounded-full border border-noble-gold/10 border-b-noble-gold/40"
                                                                        animate={{ rotate: -360 }}
                                                                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                                                    />
                                                                    <div className="w-full h-full rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden border-2 border-noble-gold/30 p-2 bg-black/60 shadow-[0_0_80px_rgba(212,175,55,0.2)] transform group-hover:scale-105 transition-all duration-700">
                                                                        <HumanAvatar
                                                                            src={selectedDelegate.avatar}
                                                                            alt={selectedDelegate.name}
                                                                            className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="space-y-4">
                                                                <h3 className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter gold-gradient-text px-4">
                                                                    {selectedDelegate.specialty}
                                                                </h3>
                                                                <p className="text-xs md:text-sm text-white/50 leading-relaxed max-w-sm mx-auto font-medium px-6">
                                                                    {currentProtocol.message}
                                                                </p>
                                                            </div>

                                                            <motion.button
                                                                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(212,175,55,0.4)', backgroundColor: '#E5C158' }}
                                                                whileTap={{ scale: 0.95 }}
                                                                onClick={() => setIsChatOpen(true)}
                                                                className="px-8 md:px-12 py-4 md:py-5 bg-noble-gold text-black rounded-2xl font-black uppercase text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.5em] flex items-center gap-4 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
                                                            >
                                                                <MessageSquare size={18} fill="currentColor" />
                                                                Join Live Broadcast
                                                            </motion.button>
                                                        </div>
                                                    )}

                                                    {activeTab === 'voice' && (
                                                        <div className="h-full flex flex-col justify-center py-10 px-4">
                                                            <div className="liquid-glass p-12 border-noble-gold/20 text-center space-y-12 rounded-[3rem] bg-white/[0.02]">
                                                                <div className="space-y-3">
                                                                    <h4 className="font-black text-noble-gold uppercase tracking-[0.6em] text-[10px]">Neural Voice Interface</h4>
                                                                    <p className="text-[9px] text-white/40 uppercase tracking-[0.4em] font-black italic">Calibration & Frequency Mapping</p>
                                                                </div>

                                                                <div className="flex flex-col items-center gap-12">
                                                                    <div className="relative">
                                                                        <motion.button
                                                                            whileHover={{ scale: 1.1 }}
                                                                            whileTap={{ scale: 0.9 }}
                                                                            onClick={() => setIsRecording(!isRecording)}
                                                                            className={`w-36 h-36 rounded-full flex items-center justify-center relative z-10 transition-all duration-500 shadow-2xl ${isRecording ? 'bg-red-600/90 text-white animate-pulse shadow-[0_0_60px_rgba(220,38,38,0.5)] border-4 border-white/20' : 'bg-white/5 border-2 border-noble-gold/30 text-noble-gold hover:bg-noble-gold/15'}`}
                                                                        >
                                                                            <Mic size={48} strokeWidth={1.5} />
                                                                        </motion.button>

                                                                        <svg className="absolute inset-[-15px] w-[calc(100%+30px)] h-[calc(100%+30px)] -rotate-90 pointer-events-none opacity-40">
                                                                            <circle cx="50%" cy="50%" r="48%" fill="none" stroke="rgba(212,175,55,0.1)" strokeWidth="4" />
                                                                            <motion.circle
                                                                                cx="50%" cy="50%" r="48%"
                                                                                fill="none" stroke="#D4AF37" strokeWidth="4"
                                                                                strokeDasharray="100 100"
                                                                                animate={{ strokeDashoffset: 100 - voiceProgress }}
                                                                                className="drop-shadow-[0_0_15px_#D4AF37]"
                                                                            />
                                                                        </svg>
                                                                    </div>

                                                                    <div className="space-y-6">
                                                                        <div className="h-6 flex items-center justify-center gap-2 px-8">
                                                                            {[...Array(16)].map((_, i) => (
                                                                                <motion.div
                                                                                    key={i}
                                                                                    className={`w-1.5 rounded-full ${isRecording ? 'bg-white shadow-[0_0_10px_white]' : 'bg-white/10'}`}
                                                                                    animate={isRecording ? { height: [6, 24, 6] } : { height: 6 }}
                                                                                    transition={{ repeat: Infinity, duration: 0.4 + Math.random() * 0.4, delay: i * 0.04 }}
                                                                                />
                                                                            ))}
                                                                        </div>
                                                                        <p className={`font-mono text-[10px] uppercase tracking-[0.5em] transition-all duration-500 font-bold ${isRecording ? 'text-white scale-110' : 'text-white/20'}`}>
                                                                            {isRecording ? "Transmitting Neural Signal" : "Ready for Input"}
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                <div className="grid grid-cols-2 gap-6 pt-4">
                                                                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10 text-left backdrop-blur-md">
                                                                        <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.5em] block mb-2">Engine</span>
                                                                        <span className="text-[11px] font-black text-white uppercase italic tracking-wider">Eleven v3.5-Turbo</span>
                                                                    </div>
                                                                    <div className="p-5 bg-white/5 rounded-2xl border border-white/10 text-left backdrop-blur-md">
                                                                        <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.5em] block mb-2">Stability</span>
                                                                        <span className="text-[11px] font-black text-emerald-400 uppercase italic tracking-wider">0.4ms // Resonant</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeTab === 'vault' && (
                                                        <div className="h-full py-6">
                                                            <SovereignMediaVault />
                                                        </div>
                                                    )}
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex-1 flex flex-col items-center justify-center text-white/10 gap-6">
                                        <Cpu size={64} className="opacity-20 stroke-[1px]" />
                                        <p className="font-mono text-[10px] uppercase tracking-[0.5em] font-black">System Ready // Select Node</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quantum Footer */}
                        <div className="px-10 py-4 bg-black/60 border-t border-white/5 flex items-center justify-between text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                    Server: Alabama-Central-1
                                </span>
                                <span>Session: {Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="hover:text-noble-gold transition-colors cursor-pointer">Protocol Status</span>
                                <span className="hover:text-noble-gold transition-colors cursor-pointer">Security Ledger</span>
                                <span className="text-noble-gold/40">© 2026 Sovereign OS</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Premium Interaction Overlay */}
            <AnimatePresence>
                {isChatOpen && selectedDelegate && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                        className="pointer-events-auto fixed inset-0 z-[120] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-6"
                    >
                        {/* Header removed to allow LiveAvatarChat to control full experience */}
                        <div className="flex-1 overflow-hidden relative">
                            {/* LiveAvatarChat wrapper to handle consistent experience */}
                            <div className="absolute inset-0 overflow-y-auto custom-scrollbar">
                                <LiveAvatarChat
                                    avatarName={selectedDelegate.name}
                                    avatarRole={selectedDelegate.role}
                                    avatarImage={selectedDelegate.avatar}
                                    avatarVideo={selectedDelegate.video}
                                    heygenId={selectedDelegate.heygenId}
                                    avatarVoice={selectedDelegate.voiceId}
                                    onClose={() => setIsChatOpen(false)}
                                    protocolContext={`${selectedDelegate.specialty}: ${currentProtocol.message}`}
                                />
                            </div>
                        </div>
                    </motion.div>
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
        </div>
    );
}
