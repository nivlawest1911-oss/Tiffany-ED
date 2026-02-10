'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { VoiceCommand } from '@/components/ui/VoiceCommand';
import EdIntelLogo from '@/components/EdIntelLogo';

/* --- ZONES: The Tactical Layout Modules --- */
// Ensure these files exist in /components/dashboard/
import { ExecutiveBrief } from '@/components/dashboard/zone1-executive-brief';
import { LiveOperations } from '@/components/dashboard/zone2-live-operations';
import { DistrictStrategy } from '@/components/dashboard/zone3-district-strategy';
import { GrantArchitect } from '@/components/dashboard/zone3-grant-architect';
import { BoardRoom } from '@/components/dashboard/zone3-board-room';
import { MediaConsole } from '@/components/dashboard/zone4-media-console';

export default function DashboardClient() {
    return (
        <div className="relative min-h-screen pb-20 overflow-x-hidden">

            {/* 1. CINEMATIC BACKGROUND MESH (Video-Based) */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Living Background Video */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen scale-110 blur-sm"
                    src="/videos/EdIntel_Sovereign_OS_Layout_Enhancements.mp4"
                />
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-600/10 blur-[100px] rounded-full" />
                {/* Holographic Scanline Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] opacity-10" />
            </div>

            <div className="relative z-10 max-w-[1600px] mx-auto p-4 md:p-8 space-y-8">

                {/* 2. WELCOME PROTOCOL */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-2"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            <span>System Nominal • EdIntel v2.0</span>
                        </motion.div>
                        <div className="flex items-center gap-4">
                            <div className="relative w-12 h-12">
                                <EdIntelLogo className="w-full h-full" />
                            </div>
                            <h1 className="text-3xl md:text-4xl font-light text-white tracking-tight">
                                Command <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Dashboard</span>
                            </h1>
                        </div>
                    </div>

                    {/* Voice Command Module */}
                    <div className="w-full md:w-auto">
                        <VoiceCommand />
                    </div>
                </header>

                {/* 3. ZONE 1: EXECUTIVE BRIEFING (Cinematic) */}
                <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <ExecutiveBrief />
                </section>

                {/* 4. ZONE 2: LIVE OPERATIONS (Data Stream) */}
                <section className="animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                    <LiveOperations />
                </section>

                {/* 5. ZONE 3: STRATEGIC & TACTICAL MODULES */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
                    <div className="xl:col-span-2 space-y-6">
                        <DistrictStrategy />
                    </div>
                    <div className="space-y-6">
                        <GrantArchitect />
                        <BoardRoom />
                    </div>
                </div>

                {/* 6. ZONE 4: MEDIA INTELLIGENCE (The Video Vault) */}
                <section className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
                    <MediaConsole />
                </section>

            </div>
        </div>
    );
}
