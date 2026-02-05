'use client';

import React from 'react';

import { motion } from 'framer-motion';
import SummaryCards from '@/components/dashboard/SummaryCards';
import AnalyticsChart from '@/components/dashboard/AnalyticsChart';
import TokenWallet from '@/components/dashboard/TokenWallet';
import SovereignAdvisorInterface from '@/components/dashboard/SovereignAdvisorInterface';
import ActionFeed from '@/components/dashboard/ActionFeed';
import { Zap, Activity } from 'lucide-react';

import { SovereignAutomation } from '@/components/SovereignAutomation';

interface DashboardClientProps {
    tierName?: string;
}

export default function DashboardClient({ tierName = 'Sovereign Initiate' }: DashboardClientProps) {

    // Note: Auth checks and Layout (Dock, Global Status) are handled in /dashboard/layout.tsx

    return (
        <div className="max-w-[1600px] mx-auto space-y-8">
            {/* Page Header (Local) */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_cyan]" />
                        <span className="text-[10px] font-black tracking-[0.3em] text-cyan-400 uppercase">Quantum Studio Active</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
                        Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Center</span>
                    </h1>
                </div>

                {/* Secondary Actions / Status (Local to Dashboard) */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full border border-indigo-500/20">
                        <Activity className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs font-bold text-indigo-100">System Nominal</span>
                    </div>
                </div>
            </header>

            {/* Neural Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">
                {/* Row 1: KPI Cards */}
                <div className="md:col-span-12">
                    <SummaryCards />
                    <SovereignAutomation tier={tierName} />
                </div>

                {/* Row 2: Analytics (L) & Token Wallet (R) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="md:col-span-8 bg-slate-950/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 relative group overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Zap className="w-5 h-5 text-slate-700" />
                    </div>
                    <AnalyticsChart />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="md:col-span-4"
                >
                    <TokenWallet />
                </motion.div>

                {/* Row 3: Advisor (L) & Action Feed (R) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="md:col-span-7 bg-slate-950/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 min-h-[400px]"
                >
                    <SovereignAdvisorInterface />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="md:col-span-5 bg-slate-950/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6"
                >
                    <ActionFeed />
                </motion.div>
            </div>
        </div>
    );
}
