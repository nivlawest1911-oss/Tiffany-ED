'use client';

import React from 'react';
import LiquidDock from '@/components/navigation/LiquidDock';
import GlobalStatusBar from '@/components/dashboard/GlobalStatusBar';
import dynamic from 'next/dynamic';
import { useAuth } from '@/context/AuthContext';
import { Loader2, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

// Dynamic Imports for Global Command features
const NexusCommand = dynamic(() => import('@/components/NexusCommand'), { ssr: false });
const ProfessionalBroadcaster = dynamic(() => import('@/components/LeadershipBroadcaster'), { ssr: false });
import TrialAlert from '@/components/TrialAlert';
import { useTrialStatus } from '@/hooks/useTrialStatus';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth();
    const [isNexusOpen, setIsNexusOpen] = React.useState(false);
    const [isBroadcasterOpen, setIsBroadcasterOpen] = React.useState(false);

    // Trial Intelligence Uplink: Tracking the 14-day window
    // In production, siteId would be fetched from the user profile or current context
    const { remainingDays, isExpiring } = useTrialStatus(user?.id || '');

    // Global Key Listener for Nexus
    React.useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsNexusOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                    <p className="font-mono text-sm tracking-widest text-indigo-400">INITIALIZING QUANTUM STUDIO...</p>
                </div>
            </div>
        );
    }

    // Access Denied State (Simple Fallback) - Pages usually handle specific redirect logic
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#020617]">
                <div className="text-center space-y-4">
                    <Shield className="w-12 h-12 text-red-500 mx-auto" />
                    <h1 className="text-white font-black text-xl">Secure Environment</h1>
                    <p className="text-slate-500 text-sm">Authentication Required</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30 overflow-x-hidden relative font-sans">
            {/* 🌌 Aura Background (Global) */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.08)_0%,transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(6,182,212,0.05)_0%,transparent_60%)]" />
                {/* Moving Mesh Effect (CSS Animation) */}
                <div className="absolute inset-0 opacity-20 bg-[url('/images/grid-noise.png')] mix-blend-overlay" />
            </div>

            <NexusCommand
                isOpen={isNexusOpen}
                onCloseAction={() => setIsNexusOpen(false)}
                onActionAction={(actionId) => {
                    if (actionId === 'broadcast') setIsBroadcasterOpen(true);
                }}
            />
            <ProfessionalBroadcaster isOpen={isBroadcasterOpen} onCloseAction={() => setIsBroadcasterOpen(false)} />

            <LiquidDock />
            <GlobalStatusBar />

            {/* Main Content Area */}
            <main className="relative z-10 lg:pl-32 p-4 min-h-screen transition-all duration-300">
                {isExpiring && remainingDays !== null && (
                    <TrialAlert remainingDays={remainingDays} />
                )}

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
}
