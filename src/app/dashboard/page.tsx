'use client';

import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Zap, Shield as LucideShield, Sparkles, Activity, Clock,
    Calendar, Command, Search, ArrowUpRight,
    BarChart3, Users, FileText, Bell, Globe, Brain, X,
    Lock, ArrowRight, Shield, LayoutDashboard, Settings, LogOut, Gavel, MoreVertical, Minimize2, Maximize2, Trophy, ChevronRight, MessageSquare
} from 'lucide-react';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import TrialStatus from '@/components/TrialStatus';
import LeadershipCapacity from '@/components/LeadershipCapacity';
import ComplianceTrafficLight from '@/components/ComplianceTrafficLight';
import ProfessionalID from '@/components/ProfessionalID';
import ProfessionalMetrics from '@/components/ProfessionalMetrics';
import { useLeadershipRank } from '@/hooks/useLeadershipRank';

const MobileTacticalCommand = dynamic(() => import('@/components/MobileTacticalCommand'), { ssr: false });
const IntelligenceBriefingAgent = dynamic(() => import('@/components/IntelligenceBriefingAgent'), { ssr: false });
const ProfessionalCabinet = dynamic(() => import('@/components/LeadershipCabinet'), { ssr: false });
const LegislativeWatchdog = dynamic(() => import('@/components/LegislativeWatchdog'), { ssr: false });
const SovereignDelegate = dynamic(() => import('@/components/SovereignDelegate'), { ssr: false });
const ProfessionalBroadcaster = dynamic(() => import('@/components/LeadershipBroadcaster'), { ssr: false });
const PolicyShield = dynamic(() => import('@/components/PolicyShield'), { ssr: false });
const DistrictTopologyMap = dynamic(() => import('@/components/DistrictTopologyMap'), { ssr: false });
const ProfessionalVault = dynamic(() => import('@/components/LeadershipVault'), { ssr: false });
const NexusCommand = dynamic(() => import('@/components/NexusCommand'), { ssr: false });
const ProfessionalPromotion = dynamic(() => import('@/components/ProfessionalPromotion'), { ssr: false });


export default function Dashboard() {
    const { user, isLoading } = useAuth();
    const [mounted, setMounted] = useState(false);
    const [currentTime, setCurrentTime] = useState<string>('');
    const [recentIntel, setRecentIntel] = useState<any[]>([]);
    const [isOnboardingRequired, setIsOnboardingRequired] = useState(false);
    const [isBroadcasterOpen, setIsBroadcasterOpen] = useState(false);
    const [isNexusOpen, setIsNexusOpen] = useState(false);
    const [isPromotionOpen, setIsPromotionOpen] = useState(false);

    const { currentRank } = useLeadershipRank();
    const [prevLevel, setPrevLevel] = useState<number | null>(null);

    useEffect(() => {
        if (prevLevel !== null && currentRank.level > prevLevel) {
            setIsPromotionOpen(true);
        }
        setPrevLevel(currentRank.level);
    }, [currentRank.level]);



    useEffect(() => {
        setMounted(true);
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        };
        updateTime();
        const timer = setInterval(updateTime, 1000);

        // Load AI Intel from LocalStorage
        try {
            const intel = JSON.parse(localStorage.getItem('leadership_intel') || localStorage.getItem('sovereign_intel') || '[]');
            setRecentIntel(intel.slice(0, 3));

            // Onboarding Check
            const complete = localStorage.getItem('onboarding_complete');
            if (!complete) {
                setIsOnboardingRequired(true);
            }
        } catch (e) {
            console.error("Failed to load intel", e);
        }

        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsNexusOpen(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => {
            clearInterval(timer);
            window.removeEventListener('keydown', handleGlobalKeyDown);
        };
    }, []);

    if (!mounted) {
        return <div className="min-h-screen bg-[#050507]" />; // Prevent hydration mismatch
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0A0A0B] text-white">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-t-2 border-indigo-500 rounded-full animate-spin"></div>
                    <p className="font-mono text-sm tracking-widest text-indigo-400">PREPARING DASHBOARD...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0A0B] text-white gap-6">
                <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
                    <LucideShield className="w-8 h-8 text-red-500" />
                </div>
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-bold">Access Restricted</h1>
                    <p className="text-zinc-400">Professional Clearance Required</p>
                </div>
                <Link
                    href="/login"
                    className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors"
                >
                    Authenticate Identity
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#050507] text-white selection:bg-indigo-500/30 overflow-hidden font-sans">
            <NexusCommand
                isOpen={isNexusOpen}
                onCloseAction={() => setIsNexusOpen(false)}
                onActionAction={(actionId) => {
                    if (actionId === 'broadcast') setIsBroadcasterOpen(true);
                    // Mapping simplified to central Sovereign Delegate
                }}
            />
            <ProfessionalPromotion
                isOpen={isPromotionOpen}
                onCloseAction={() => setIsPromotionOpen(false)}
                rank={currentRank}
            />
            <ProfessionalBroadcaster isOpen={isBroadcasterOpen} onCloseAction={() => setIsBroadcasterOpen(false)} />

            {/* Background Texture */}
            <div className="fixed inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="fixed inset-0 bg-gradient-to-b from-indigo-900/5 via-transparent to-black pointer-events-none" />

            <div className="relative max-w-[1600px] mx-auto p-6 pt-24 min-h-screen flex flex-col">

                <AnimatePresence>
                    {isOnboardingRequired && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-[3.5rem] p-12 text-center shadow-[0_0_80px_rgba(99,102,241,0.2)]"
                            >
                                <div className="w-24 h-24 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-10 text-indigo-400">
                                    <Brain size={48} />
                                </div>
                                <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tight">Leadership Sync Required</h2>
                                <p className="text-zinc-400 text-sm mb-12 leading-relaxed">
                                    To unlock high-level executive features, you must establish your Professional Identity.
                                </p>
                                <Link
                                    href="/onboarding"
                                    className="group flex items-center justify-center gap-3 w-full py-6 rounded-3xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-900/40"
                                >
                                    Initialize Identity Sync <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <button
                                    onClick={() => setIsOnboardingRequired(false)}
                                    className="mt-8 text-[10px] font-black text-zinc-500 uppercase tracking-widest hover:text-zinc-300 transition-colors"
                                >
                                    Proceed with Limited Access
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* HUD Header */}
                <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-10 border-b border-white/5 pb-10 relative">
                    {/* Strategic Kente Lattice: A tribute to Dr. Alvin West's Visionary Narrative */}
                    <div className="absolute top-0 left-0 w-full h-[2px] flex overflow-hidden opacity-30">
                        {Array.from({ length: 40 }).map((_, i) => (
                            <div key={i} className={`flex-1 h-full ${i % 4 === 0 ? 'bg-amber-500' : i % 4 === 1 ? 'bg-emerald-600' : i % 4 === 2 ? 'bg-rose-600' : 'bg-black'}`} />
                        ))}
                    </div>

                    <div>
                        <div className="flex items-center gap-3 text-indigo-500 mb-2">
                            <Activity className="w-4 h-4 animate-pulse" />
                            <span className="text-xs font-bold tracking-[0.2em] uppercase">Leadership Center</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                            COMMAND <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">DECK</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="text-right hidden sm:block">
                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">District Sync</div>
                            <div className="text-xl font-mono text-white font-medium flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                {currentTime || '--:--:--'}
                            </div>
                        </div>
                        <div className="scale-90 md:scale-100 origin-right">
                            <ProfessionalID />
                        </div>
                    </div>
                </header>

                {/* Real-time Diagnostics Center */}
                <div className="mb-10">
                    <ProfessionalMetrics />
                </div>

                <TrialStatus />

                {/* Professional KPI HUD */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Hours Saved', val: '14,204', sub: '+12% this week', icon: Clock, color: 'text-indigo-400' },
                        { label: 'Capital Recovered', val: '$84,200', sub: 'Title I Optimization', icon: Zap, color: 'text-amber-400' },
                        { label: 'Policy Confidence', val: '99.8%', sub: 'FERPA/HIPAA Compliant', icon: LucideShield, color: 'text-emerald-400' },
                        { label: 'Strategic Sync', val: 'Active', sub: '24ms Latency', icon: Activity, color: 'text-blue-400' },
                    ].map((kpi, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-zinc-900/40 border border-white/5 p-4 rounded-2xl backdrop-blur-sm shadow-xl"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{kpi.label}</span>
                            </div>
                            <div className="text-xl font-black text-white">{kpi.val}</div>
                            <div className="text-[9px] text-zinc-500 mt-1">{kpi.sub}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">

                    {/* Left Column: Quick Actions & Status (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Profile Card */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Command className="w-24 h-24 rotate-12" />
                            </div>

                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-0.5">
                                    <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white">{user.name.charAt(0)}</span>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">{user.name}</h3>
                                    <p className="text-sm text-zinc-400">{user.email}</p>
                                </div>
                            </div>

                            <div className="space-y-4 relative z-10">
                                <div className="p-1">
                                    <LeadershipCapacity />
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/5">
                                    <span className="text-sm text-zinc-400">System Status</span>
                                    <span className="text-xs font-bold text-emerald-400 uppercase bg-emerald-500/10 px-2 py-1 rounded">Optimal</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Quick Launchpad */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl"
                        >
                            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Zap className="w-4 h-4" /> Priority Connection
                            </h3>
                            <div className="grid gap-3">
                                {[
                                    { name: "Lesson Planner", icon: Sparkles, color: "text-purple-400", href: "/generators/lesson-planner" },
                                    { name: "IEP Architect", icon: FileText, color: "text-blue-400", href: "/generators/iep-architect" },
                                    { name: "Executive Broadcaster", icon: MessageSquare, color: "text-emerald-400", onClick: () => setIsBroadcasterOpen(true) },
                                    { name: "Data Analyst", icon: BarChart3, color: "text-amber-400", href: "/generators/data-analyzer" },
                                ].map((tool, i) => (
                                    tool.href ? (
                                        <Link key={i} href={tool.href} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all group">
                                            <div className="flex items-center gap-3">
                                                <tool.icon className={`w-5 h-5 ${tool.color}`} />
                                                <span className="font-medium text-zinc-200 group-hover:text-white">{tool.name}</span>
                                            </div>
                                            <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
                                        </Link>
                                    ) : (
                                        <button key={i} onClick={tool.onClick} className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all group">
                                            <div className="flex items-center gap-3">
                                                <tool.icon className={`w-5 h-5 ${tool.color}`} />
                                                <span className="font-medium text-zinc-200 group-hover:text-white">{tool.name}</span>
                                            </div>
                                            <Zap className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition-transform" />
                                        </button>
                                    )
                                ))}
                            </div>
                        </motion.div>

                        {/* District Grid: Integration Points */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl"
                        >
                            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <Globe className="w-4 h-4" /> District Infrastructure
                            </h3>
                            <div className="grid grid-cols-3 gap-2">
                                {[
                                    { name: 'Canvas', status: 'Connected', color: 'bg-orange-500' },
                                    { name: 'Powerschool', status: 'Active', color: 'bg-blue-500' },
                                    { name: 'Google Workspace', status: 'Synced', color: 'bg-red-500' },
                                ].map((sys, i) => (
                                    <div key={i} className="bg-white/5 border border-white/5 p-3 rounded-xl flex flex-col items-center justify-center text-center">
                                        <div className={`w-1.5 h-1.5 rounded-full ${sys.color} mb-2 shadow-[0_0_8px_${sys.color}]`} />
                                        <div className="text-[9px] font-bold text-white uppercase">{sys.name}</div>
                                        <div className="text-[8px] text-zinc-500 mt-1 uppercase">{sys.status}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Compliance Status */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 }}
                        >
                            <ComplianceTrafficLight />
                        </motion.div>
                    </div>

                    {/* Middle Column: Central Intelligence (5 cols) */}
                    <div className="lg:col-span-5 space-y-6">

                        {/* Professional Cabinet (Task Force) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                        >
                            <ProfessionalCabinet />
                        </motion.div>

                        {/* Territorial Oversight: District Map */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.18 }}
                        >
                            <DistrictTopologyMap
                                onDeployDelegateAction={() => { }} // Simplified
                                onBroadcastAction={() => setIsBroadcasterOpen(true)}
                            />
                        </motion.div>

                        {/* Daily Briefing Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="h-full min-h-[400px] p-8 rounded-3xl bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 flex flex-col relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none" />

                            <div className="relative z-10 flex-grow">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6 border border-indigo-500/20">
                                    <Globe className="w-3 h-3" />
                                    Daily Intelligence
                                </div>

                                <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                                    "Leadership is not about being in charge. It is about taking care of those in your charge."
                                </h2>
                                <p className="text-indigo-200/60 font-serif italic mb-8">— Simon Sinek</p>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Suggested Actions</h3>
                                    <div className="p-4 rounded-xl bg-black/20 border border-white/5 hover:border-indigo-500/30 transition-colors cursor-pointer group">
                                        <div className="flex items-start gap-4">
                                            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 group-hover:text-white transition-colors">
                                                <Users className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-zinc-200 group-hover:text-white mb-1">Draft Weekly Staff Memo</h4>
                                                <p className="text-xs text-zinc-400">Use the 'Strategic Communication' option to update your team.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-xl bg-black/20 border border-white/5 hover:border-rose-500/30 transition-colors cursor-pointer group">
                                        <div className="flex items-start gap-4">
                                            <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 group-hover:text-white transition-colors">
                                                <LucideShield className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-zinc-200 group-hover:text-white mb-1">Engage Policy Shield</h4>
                                                <p className="text-xs text-zinc-400">Secure district policies against SB 101 amendments.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Professional Policy Shield */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.22 }}
                        >
                            <PolicyShield />
                        </motion.div>

                        {/* Strategic Vault: Strategic Intelligence Archive */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.28 }}
                        >
                            <ProfessionalVault />
                        </motion.div>
                    </div>

                    {/* Right Column: System Updates (3 cols) */}
                    <div className="lg:col-span-3 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <IntelligenceBriefingAgent />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.35 }}
                        >
                            <LegislativeWatchdog
                                onTriggerSynthesisAction={(prompt) => {
                                    // Synthesis trigger simplified
                                }}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="h-full p-6 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl"
                        >
                            <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-6 flex items-center gap-2">
                                <Brain className="w-4 h-4 text-purple-400" /> Strategic Status Feed
                            </h3>

                            <div className="space-y-6 relative">
                                {/* Timeline Line */}
                                <div className="absolute left-2.5 top-2 bottom-2 w-px bg-white/10" />

                                {recentIntel.length > 0 ? (
                                    recentIntel.map((item, i) => (
                                        <div key={i} className="pl-8 relative group">
                                            <div className="absolute left-1.5 top-1.5 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-black" />
                                            <h4 className="text-sm font-bold text-zinc-200 group-hover:text-amber-500 transition-colors uppercase tracking-tight">{item.title}</h4>
                                            <p className="text-[10px] text-zinc-500 mt-1 mb-1">Archived by {item.delegate}</p>
                                            <span className="text-[9px] font-mono text-zinc-600 block">{item.date}</span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="pl-8 relative text-zinc-600 text-[10px] uppercase font-bold italic py-4">
                                        Waiting for incoming strategic intel...
                                    </div>
                                )}

                                <div className="pt-4 border-t border-white/5">
                                    {[
                                        { title: "System Maintenance", desc: "Strategic system optimization complete.", time: "5h ago", color: "bg-blue-500" },
                                        { title: "Usage Alert", desc: "Access standard resources below.", time: "1d ago", color: "bg-amber-500" },
                                    ].map((item, i) => (
                                        <div key={i} className="pl-8 relative mt-4">
                                            <div className={`absolute left-1.5 top-1.5 w-2 h-2 rounded-full ${item.color} ring-4 ring-black`} />
                                            <h4 className="text-xs font-bold text-zinc-400">{item.title}</h4>
                                            <p className="text-[9px] text-zinc-600 mt-1 mb-1">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5">
                                <Link
                                    href="/vault"
                                    className="block w-full py-3 text-center rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-indigo-900/20"
                                >
                                    Access Archive Vault
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>

            <MobileTacticalCommand />

            {/* Professional Delegate (Sovereign Command) */}
            <SovereignDelegate />
        </div>
    );
}
