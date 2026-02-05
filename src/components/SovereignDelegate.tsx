'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
    Shield, Activity,
    X,
    Trophy, Zap, Bell,
    Cpu, Brain
} from 'lucide-react';
import LiveAvatarChat from './LiveAvatarChat';
import { useAuth } from '@/context/AuthContext';
import { CORE_AVATARS } from '@/data/avatars';
import { usePathname } from 'next/navigation';
import { SOVEREIGN_PROTOCOLS, DEFAULT_PROTOCOL } from '@/data/sovereign-protocols';
import HumanAvatar from './ui/HumanAvatar';

import SovereignInteractionAgent from './SovereignInteractionAgent';

import { useCelebrate } from '@/context/CelebrationContext';

import { SovereignBrief } from './SovereignBrief';
import { NarrativeArchitect } from './NarrativeArchitect';
import { RecidivismEngine } from './RecidivismEngine';

const SovereignMediaVault = dynamic(() => import('./SovereignMediaVault'), { ssr: false });
const SovereignAvatarInterface = dynamic(() => import('./SovereignAvatarInterface'), { ssr: false });

// Admin Components
const SystemStatus = dynamic(() => import('./admin/SystemStatus').then(m => m.SystemStatus), { ssr: false });
const DistrictControl = dynamic(() => import('./admin/DistrictControl').then(m => m.DistrictControl), { ssr: false });

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
    const { celebrate } = useCelebrate();
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
    const [activeTab, setActiveTab] = useState<'uplink' | 'brief' | 'architect' | 'reform' | 'vault' | 'admin'>('uplink');

    const handleDelegateSelection = useCallback((delegate: Delegate) => {
        setSelectedDelegate(delegate);

        // Smart Default Routing based on Role
        if (delegate.role.includes('Superintendent') || delegate.role.includes('Officer')) {
            setActiveTab('brief');
        } else if (delegate.role.includes('Curriculum') || delegate.role.includes('Instruction')) {
            setActiveTab('architect');
        } else if (delegate.role.includes('Support') || delegate.role.includes('Counselor')) {
            setActiveTab('reform');
        } else {
            setActiveTab('uplink'); // Default back to Avatar if generic
        }

        try {
            if (['Sovereign', 'Executive Sovereign', 'Quantum'].includes(delegate.clearance)) {
                celebrate(
                    `High Clearance: ${delegate.name}`,
                    `${delegate.role} is now at your disposal. Accessing secure protocols.`,
                    'achievement'
                );
            }
        } catch (e) {
            console.warn("Celebration protocol failed, but system operational.", e);
        }
    }, [celebrate]);

    const handleTabChange = useCallback((tab: typeof activeTab) => {
        setActiveTab(tab);
    }, []);

    useEffect(() => {
        const handleOpenChat = (e: any) => {
            if (e.detail) {
                handleDelegateSelection(e.detail);
                setIsChatOpen(true);
            }
        };

        window.addEventListener('open-ai-chat', handleOpenChat);
        return () => window.removeEventListener('open-ai-chat', handleOpenChat);
    }, [handleDelegateSelection]);


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

            {/* Sovereign Command Center Aggregator */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 40, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.95, y: 40, filter: 'blur(10px)' }}
                        className="pointer-events-auto w-full h-screen md:w-[1000px] md:h-[750px] bg-[#0A0E1A]/95 backdrop-blur-3xl flex flex-col overflow-hidden border border-white/10 md:rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.9)] fixed inset-0 md:relative z-[150]"
                    >
                        {/* Mawu Lisa / Linnentown Geometric Overlay */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-[0.15] pointer-events-none mix-blend-overlay" />

                        {/* Elite Status Bar */}
                        <div className="p-6 bg-white/[0.03] border-b border-white/5 flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-6">
                                <SovereignInteractionAgent
                                    title="Neural Synchronicity"
                                    description="Active system heat map showing real-time connectivity across the district command mesh."
                                    agentId="visionary"
                                    position="bottom"
                                >
                                    <div className="flex items-center gap-3 px-4 py-2 bg-noble-gold/10 rounded-xl border border-noble-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.1)] cursor-help">
                                        <Activity size={14} className="text-noble-gold animate-pulse" />
                                        <span className="text-[10px] font-black text-noble-gold uppercase tracking-[0.3em]">Swarm: Active</span>
                                    </div>
                                </SovereignInteractionAgent>
                                <div className="hidden md:flex flex-col">
                                    <div className="text-[8px] font-black text-white/30 uppercase tracking-[0.4em] flex items-center gap-2">
                                        <Activity size={10} className="text-noble-gold/50" />
                                        Executive Aggregator
                                    </div>
                                    <div className="text-[11px] font-black text-white/80 uppercase tracking-widest italic">100+ Nodes Unified</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-end mr-4">
                                    <div className="text-[8px] font-black text-white/30 uppercase tracking-[0.4em]">Live Listeners</div>
                                    <div className="text-xs font-black text-noble-gold tracking-tight">12.4k Distributed</div>
                                </div>
                                <div className="w-px h-8 bg-white/10 mx-2" />
                            </div>
                        </div>

                        <div className="flex-1 grid grid-cols-12 overflow-hidden relative z-10">
                            {/* Delegate Swarm Selector */}
                            <div className={`${selectedDelegate && !isChatOpen ? 'hidden md:block' : 'block'} col-span-12 md:col-span-3 border-r border-white/5 bg-black/40 overflow-y-auto p-4 md:p-5 space-y-3 custom-scrollbar`}>
                                <div className="flex items-center justify-between mb-6 px-2">
                                    <p className="text-[10px] font-black text-noble-gold uppercase tracking-[0.2em]">Swarm Agents</p>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    </div>
                                </div>
                                {delegates.map((delegate) => (
                                    <button
                                        key={delegate.id}
                                        onClick={() => handleDelegateSelection(delegate)}
                                        className={`w-full p-2.5 rounded-2xl flex items-center gap-3 transition-all duration-500 group relative overflow-hidden
                                            ${selectedDelegate?.id === delegate.id
                                                ? 'bg-noble-gold/15 border border-noble-gold/40 shadow-[0_0_20px_rgba(212,175,55,0.05)]'
                                                : 'hover:bg-white/5 border border-transparent opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        <div className="relative z-10">
                                            <div className={`w-10 h-10 rounded-xl overflow-hidden border transition-all duration-500 ${selectedDelegate?.id === delegate.id ? 'border-noble-gold' : 'border-white/10 group-hover:border-noble-gold/30'}`}>
                                                <HumanAvatar
                                                    src={delegate.avatar}
                                                    alt={delegate.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </div>
                                        <div className="text-left flex-1 relative z-10">
                                            <div className={`text-[10px] font-black uppercase tracking-tight truncate ${selectedDelegate?.id === delegate.id ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>
                                                {delegate.name}
                                            </div>
                                            <div className="text-[7px] text-noble-gold/60 uppercase tracking-widest font-black italic mt-0.5 truncate">{delegate.role.split(' ')[0]}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            <div className={`${!selectedDelegate ? 'hidden md:flex' : 'flex'} col-span-12 md:col-span-9 p-0 relative flex-col bg-zinc-950/40`}>
                                {selectedDelegate ? (
                                    <>
                                        {/* Unified Aggregator Nav */}
                                        <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/5 overflow-x-auto no-scrollbar bg-black/20">
                                            {[
                                                { id: 'brief', label: 'Executive Brief', icon: Activity },
                                                { id: 'uplink', label: 'Avatar Uplink', icon: Zap },
                                                { id: 'architect', label: 'Narrative Architect', icon: Brain },
                                                { id: 'reform', label: 'Restorative Reform', icon: Trophy },
                                                { id: 'vault', label: 'Vault', icon: Shield },
                                                { id: 'admin', label: 'District', icon: Cpu }
                                            ].map(tab => (
                                                <button
                                                    key={tab.id}
                                                    onClick={() => handleTabChange(tab.id as any)}
                                                    className={`py-4 px-4 border-b-2 text-[9px] font-black uppercase tracking-[0.2em] transition-all relative whitespace-nowrap flex items-center gap-2
                                                        ${activeTab === tab.id
                                                            ? 'border-noble-gold text-noble-gold bg-gradient-to-t from-noble-gold/5 to-transparent'
                                                            : 'border-transparent text-white/30 hover:text-white/60 hover:bg-white/5'}`}
                                                >
                                                    <tab.icon size={13} className={activeTab === tab.id ? 'fill-current' : ''} />
                                                    {tab.label}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="flex-1 overflow-hidden relative p-4 md:p-6">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={activeTab}
                                                    initial={{ opacity: 0, y: 15 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -15, position: 'absolute' }}
                                                    transition={{ duration: 0.3 }}
                                                    className="h-full w-full"
                                                >
                                                    {activeTab === 'brief' && <SovereignBrief />}

                                                    {activeTab === 'uplink' && (
                                                        <div className="h-full flex flex-col justify-center py-2">
                                                            <div className="h-full rounded-[2.5rem] overflow-hidden border border-noble-gold/20 shadow-2xl bg-black relative">
                                                                <SovereignAvatarInterface
                                                                    avatarId={selectedDelegate?.heygenId}
                                                                />
                                                                {/* Overlay Label for Context */}
                                                                <div className="absolute bottom-6 left-8 z-20 pointer-events-none">
                                                                    <div className="text-[10px] font-black text-noble-gold uppercase tracking-[0.4em] mb-1">Live Connection</div>
                                                                    <div className="text-xl font-black text-white italic uppercase">{selectedDelegate.name}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {activeTab === 'architect' && <NarrativeArchitect />}

                                                    {activeTab === 'reform' && <RecidivismEngine />}

                                                    {activeTab === 'vault' && (
                                                        <SovereignMediaVault selectedDelegate={selectedDelegate} />
                                                    )}

                                                    {activeTab === 'admin' && (
                                                        <div className="h-full py-2 overflow-y-auto custom-scrollbar space-y-6">
                                                            <SystemStatus />
                                                            <DistrictControl
                                                                districtName="Mobile County Public Schools"
                                                                schools={[
                                                                    { id: '1', name: 'Prichard High', vault_balance: 1420 },
                                                                    { id: '2', name: 'LeFlore Academy', vault_balance: 890 }
                                                                ]}
                                                            />
                                                        </div>
                                                    )}
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex-1 flex flex-col items-center justify-center text-white/10 gap-6">
                                        <div className="w-32 h-32 rounded-full border border-noble-gold/20 flex items-center justify-center animate-pulse-slow">
                                            <Shield size={64} className="opacity-20 stroke-[1px]" />
                                        </div>
                                        <p className="font-mono text-[10px] uppercase tracking-[0.5em] font-black">System Ready // Select Neural Node</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quantum Footer */}
                        <div className="px-10 py-4 bg-black/60 border-t border-white/5 flex items-center justify-between text-[8px] font-black text-white/20 uppercase tracking-[0.4em] z-10">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                    Server: Alabama-Central-1
                                </span>
                                <span>Session: {Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="hover:text-noble-gold transition-colors cursor-pointer">Protocol Status</span>
                                <span className="text-noble-gold/40">© 2026 Sovereign OS</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Premium Interaction Overlay - Only for Full Chat */}
            <AnimatePresence>
                {isChatOpen && selectedDelegate && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                        className="pointer-events-auto fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-6"
                    >
                        {/* LiveAvatarChat has its own close button which triggers setIsChatOpen(false) */}
                        <div className="w-full h-full max-w-[1600px] relative">
                            <LiveAvatarChat
                                avatarName={selectedDelegate.name}
                                avatarRole={selectedDelegate.role}
                                avatarImage={selectedDelegate.avatar}
                                avatarVideo={selectedDelegate.video}
                                heygenId={selectedDelegate.heygenId}
                                avatarVoice={selectedDelegate.voiceId}
                                onClose={() => setIsChatOpen(false)}
                                protocolContext={`SYSTEM OVERRIDE: You are acting as ${selectedDelegate.name} (${selectedDelegate.role}). Current Objective: ${selectedDelegate.specialty}. STATUS: ${currentProtocol.message}. INSTRUCTION: Be extremely intellectual, authoritative yet empathetic. Speak like a high-level strategic consultant for a sovereign education system.`}
                            />
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
                .animate-pulse-slow {
                    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 12s linear infinite;
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
                
                /* Texture Utility Class attempt */
                .bg-mawu-lisa {
                    background-image: url('https://www.transparenttextures.com/patterns/black-scales.png');
                }
            `}</style>
        </div>
    );
}
