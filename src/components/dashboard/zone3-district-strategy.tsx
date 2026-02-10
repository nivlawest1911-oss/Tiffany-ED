'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Map, Activity, Users, AlertTriangle } from 'lucide-react';
import { EdIntelPlayer } from '@/components/ui/EdIntelPlayer';

export function DistrictStrategy() {
    const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'PLACEHOLDER';
    const MAP_URL = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/-88.0399,30.6954,10,0/800x400?access_token=${MAPBOX_TOKEN}`;

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Map className="text-blue-500" /> District Command Map
                    </h2>
                    <p className="text-slate-400 text-sm">Real-time tactical overview of Mobile County.</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-mono text-emerald-500 uppercase tracking-widest">Live Feed Active</span>
                </div>
            </div>

            {/* MAIN VISUALIZATION GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* 1. THE LIVE MAP (Animation Integration) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-2 relative h-[400px] bg-slate-900/50 rounded-2xl border border-white/10 overflow-hidden group"
                >
                    {/* Placeholder for Map Image/Interactive Component */}
                    <div
                        className="absolute inset-0 bg-cover opacity-40 mix-blend-screen"
                        style={{ backgroundImage: `url('${MAP_URL}')` }}
                    />

                    {/* Animated Overlay Effects (The "Media" Feel) */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)]" />

                    {/* Pulsing Hotspots (Simulating Data) */}
                    <div className="absolute top-1/4 left-1/4">
                        <div className="w-32 h-32 border border-blue-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
                    </div>
                    <div className="absolute top-1/3 left-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_20px_#60a5fa] animate-pulse" />
                    <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-amber-400 rounded-full shadow-[0_0_20px_#fbbf24] animate-pulse delay-700" />

                    {/* Map UI Overlay */}
                    <div className="absolute bottom-4 left-4 p-4 glass-panel rounded-xl border-l-4 border-blue-500">
                        <h4 className="text-white font-bold text-lg">Zone 3: Prichard</h4>
                        <div className="flex items-center gap-4 mt-2">
                            <div className="text-xs text-slate-400">
                                <span className="block text-white font-mono text-lg">89%</span>
                                Attendance
                            </div>
                            <div className="text-xs text-slate-400">
                                <span className="block text-white font-mono text-lg">12</span>
                                Active Alerts
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 2. THE VIDEO FEED / BRIEFING (Video Integration) */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-slate-900 rounded-2xl border border-white/10 overflow-hidden relative"
                    >
                        <EdIntelPlayer
                            src="/videos/OS_Enhancements_AI_and_Layout.mp4"
                            title="System Status: Operational"
                            poster="/images/avatars/dr_alvin_west_official.png"
                        />
                    </motion.div>

                    {/* 3. QUICK STATS */}
                    <div className="space-y-3">
                        {[
                            { label: 'Grant Compliance', val: '98.2%', icon: Activity, color: 'text-emerald-400' },
                            { label: 'Staff Allocation', val: '412', icon: Users, color: 'text-blue-400' },
                            { label: 'Critical Incidents', val: '0', icon: AlertTriangle, color: 'text-amber-400' }
                        ].map((stat, i) => (
                            <div key={i} className="glass-panel p-4 rounded-xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                    <span className="text-sm text-slate-300">{stat.label}</span>
                                </div>
                                <span className="font-mono font-bold text-white">{stat.val}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
