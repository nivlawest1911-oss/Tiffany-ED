'use client';

import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield as LucideShield
} from 'lucide-react';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ComplianceTrafficLight from '@/components/ComplianceTrafficLight';
import ProfessionalID from '@/components/ProfessionalID';
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
import WellnessWrapper from '@/components/WellnessWrapper';
import FlourishBuddy from '@/components/FlourishBuddy';
import SovereignVitalityHUD from '@/components/SovereignVitalityHUD';
import SummaryCards from '@/components/dashboard/SummaryCards';
import SovereignAdvisorInterface from '@/components/dashboard/SovereignAdvisorInterface';
import ActionFeed from '@/components/dashboard/ActionFeed';
import { TrialBanner } from '@/components/subscription/TrialBanner';
import { TokenNudge } from '@/components/TokenNudge';
import { getTrialDaysRemaining } from '@/lib/subscription';

export default function DashboardClient() {
    const { user, isLoading } = useAuth();
    const [mounted, setMounted] = useState(false);
    const [currentTime, setCurrentTime] = useState<string>('');
    const [recentIntel, setRecentIntel] = useState<any[]>([]);
    const [isOnboardingRequired, setIsOnboardingRequired] = useState(false);
    const [isBroadcasterOpen, setIsBroadcasterOpen] = useState(false);
    const [isNexusOpen, setIsNexusOpen] = useState(false);
    const [isPromotionOpen, setIsPromotionOpen] = useState(false);
    const [isWellnessMode, setIsWellnessMode] = useState(false);

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
        <WellnessWrapper isWellnessMode={isWellnessMode}>
            <FlourishBuddy isActive={isWellnessMode} />
            <div className={`min-h-screen ${isWellnessMode ? 'selection:bg-emerald-500/30' : 'selection:bg-indigo-500/30'} bg-transparent text-white overflow-hidden font-sans relative`}>
                <NexusCommand
                    isOpen={isNexusOpen}
                    onCloseAction={() => setIsNexusOpen(false)}
                    onActionAction={(actionId) => {
                        if (actionId === 'broadcast') setIsBroadcasterOpen(true);
                    }}
                />
                <ProfessionalBroadcaster isOpen={isBroadcasterOpen} onCloseAction={() => setIsBroadcasterOpen(false)} />
                <SovereignVitalityHUD />

                {/* Background Texture - Sovereign Navy Base */}
                <div className="fixed inset-0 bg-[#0F172A] z-[-2]" />
                <div className="fixed inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] z-[-1]" />

                <div className="relative max-w-[1600px] mx-auto p-6 pt-24 min-h-screen flex flex-col">
                    {/* Trial Banner Integration */}
                    {user?.trialEndsAt && (
                        <TrialBanner
                            daysRemaining={getTrialDaysRemaining(user.trialEndsAt)}
                            tokenCount={user.tokensRemaining || 0}
                            onPurchase={() => window.location.href = '/pricing'}
                        />
                    )}

                    {/* Header: Sovereign Standard */}
                    <header className="flex flex-col md:flex-row items-center justify-between mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest">Sovereign Command Available</span>
                            </div>
                            <h1 className="text-4xl font-black text-white tracking-tight">
                                COMMAND <span className="text-[#D4AF37]">DECK</span>
                            </h1>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="text-right hidden sm:block">
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Local Time</div>
                                <div className="text-xl font-mono text-white">{currentTime}</div>
                            </div>
                            <ProfessionalID />
                        </div>
                    </header>

                    {/* MAIN 3-COLUMN SOVEREIGN GRID */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-grow">

                        {/* COLUMN 1: ANALYTICS & SUMMARY */}
                        <div className="lg:col-span-1 space-y-8">
                            <SummaryCards />

                            {/* Personalization: Admin Only Compliance Widget */}
                            {(user.email?.includes('west') || user.email?.includes('admin')) && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800"
                                >
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Admin Oversight</h3>
                                    <ComplianceTrafficLight />
                                </motion.div>
                            )}
                        </div>

                        {/* COLUMN 2: THE SOVEREIGN ADVISOR (FOCUS) */}
                        <div className="lg:col-span-1">
                            <SovereignAdvisorInterface />
                        </div>

                        {/* COLUMN 3: ACTION FEED & WATCHDOG */}
                        <div className="lg:col-span-1 space-y-8">
                            <ActionFeed />

                            {/* Secondary Watchdog */}
                            <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Legislative Watchdog</h3>
                                <LegislativeWatchdog onTriggerSynthesisAction={() => { }} />
                            </div>
                        </div>

                    </div>
                </div>

                <MobileTacticalCommand />
                <SovereignDelegate /> {/* Keeps the global delegate active if needed, or we rely on the Interface */}

                {/* Strategic Notifications */}
                <TokenNudge
                    daysRemaining={user.trialEndsAt ? getTrialDaysRemaining(user.trialEndsAt) : 0}
                    tokensRemaining={user.tokensRemaining || 0}
                    isTrial={!user.isTrialConverted}
                />
            </div>
        </WellnessWrapper>
    );
}
