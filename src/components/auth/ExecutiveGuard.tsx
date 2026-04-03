'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useIntelligence } from '@/context/IntelligenceContext';
import { Zap, ShieldAlert } from 'lucide-react';

/**
 * 🏛️ EdIntel Executive Guard
 * Performance-optimized authentication and integrity gate.
 */
export const ExecutiveGuard = ({ children, requiredTier }: { children: React.ReactNode, requiredTier?: string }) => {
    const { user, isLoading } = useAuth();
    const { isRescueOneActive, toggleRescueOne } = useIntelligence();
    const router = useRouter();
    const [clickCount, setClickCount] = useState(0);

    const handleEmergencyOverride = () => {
        setClickCount(prev => prev + 1);
        if (clickCount >= 5) {
            toggleRescueOne();
            setClickCount(0);
        }
    };

    useEffect(() => {
        if (!isLoading && !user) {
            router.push('/login');
        } else if (!isLoading && user) {
            // 1. Trial Expiration Check
            if (user.trialEndsAt && new Date(user.trialEndsAt) < new Date()) {
                const paidTiers = ['Director Pack', 'Site Command', 'Practitioner', 'Sovereign Pack', 'Standard Pack'];
                if (!paidTiers.includes(user.tier)) {
                    router.push('/pricing?expired=true');
                    return;
                }
            }
        }
    }, [user, isLoading, router, requiredTier]);

    // 1. High-Performance Glassmorphism Loader
    // CWV OPTIMIZATION: Uses pure SVG and static CSS to ensure fast FCP and low TBT.
    if (isLoading) {
        return (
            <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${isRescueOneActive ? 'bg-black' : 'bg-[#050505]'} overflow-hidden ${isRescueOneActive ? 'rescue-one-overdrive' : ''}`}>
                {/* Background Atmosphere */}
                <div className={`absolute inset-0 ${isRescueOneActive ? 'bg-rose-500/10' : 'bg-gradient-to-tr from-indigo-500/5 via-transparent to-noble-gold/5'} opacity-50`} />
                
                <div className="relative flex flex-col items-center gap-8">
                    {/* SVG Shield Core: Faster than animated components */}
                    <button 
                        onClick={handleEmergencyOverride}
                        className={`w-16 h-16 ${isRescueOneActive ? 'text-rose-500' : 'text-noble-gold/80'} animate-pulse cursor-default active:scale-95 transition-transform`}
                        aria-label="Sovereign Shield"
                    >
                        <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                            <path d="M50 15 L85 30 L85 60 C85 75 70 85 50 90 C30 85 15 75 15 60 L15 30 L50 15 Z" />
                        </svg>
                    </button>
                    
                    <div className="flex flex-col items-center space-y-2">
                        <span className="text-2xl font-black text-white tracking-[0.3em] uppercase">EdIntel</span>
                        <span className={`text-[0.6rem] font-bold ${isRescueOneActive ? 'text-rose-500 animate-pulse' : 'text-noble-gold/40'} uppercase tracking-[0.5em]`}>
                            {isRescueOneActive ? 'RESCUE ONE OVERRIDE ACTIVE' : 'Initializing Sovereign OS'}
                        </span>
                    </div>

                    {/* Progress Filament */}
                    <div className={`w-48 h-[1px] ${isRescueOneActive ? 'bg-rose-950' : 'bg-noble-gold/10'} overflow-hidden relative`}>
                        <div className={`absolute inset-0 ${isRescueOneActive ? 'bg-rose-500' : 'bg-noble-gold/40'} animate-[loading-bar_2s_ease-in-out_infinite] origin-left`} />
                    </div>

                    {isRescueOneActive && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/30 rounded-full animate-pulse">
                            <Zap className="w-3 h-3 text-rose-500" />
                            <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Tactical Mode</span>
                        </div>
                    )}
                </div>
                {isRescueOneActive && <div className="animate-tactical-scan" />}
            </div>
        );
    }

    // 2. Redirect/Unauthorized State
    if (!user) {
        return (
            <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]">
                <div className="relative p-12 border border-noble-gold/10 bg-black/40 backdrop-blur-3xl rounded-3xl flex flex-col items-center">
                   <div className="w-12 h-12 text-noble-gold/20 mb-8">
                        <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
                            <path d="M50 15 L85 30 L85 60 C85 75 70 85 50 90 C30 85 15 75 15 60 L15 30 L50 15 Z" />
                        </svg>
                    </div>
                    <h2 className="text-noble-gold/80 text-xl font-black tracking-[0.2em] uppercase mb-4 text-center">Protocol Violation</h2>
                    <p className="text-noble-gold/40 text-[10px] tracking-[0.2em] uppercase text-center mb-8 max-w-xs leading-relaxed">
                        Secure uplink failed. Redirecting to sovereign gate for authentication.
                    </p>
                    <div className="w-24 h-[1px] bg-noble-gold/10 animate-pulse" />
                </div>
            </div>
        );
    }

    return <>{children}</>;
};
