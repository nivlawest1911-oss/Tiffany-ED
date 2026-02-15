'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    Gem
} from 'lucide-react';
import { ParticleBackground } from '@/components/ui/Cinematic';
import EdIntelSovereignLogo from '@/components/EdIntelSovereignLogo';
import WellnessClient from '@/components/wellness/WellnessClient';



export default function WellnessHubPage() {
    return (
        <div className="relative min-h-screen bg-black overflow-hidden flex flex-col">
            {/* Cinematic Background - Transcend Theme */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/30 via-purple-950/20 to-black" />
                <ParticleBackground count={40} />
                <div className="absolute top-0 right-1/2 translate-x-1/2 w-[800px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full opacity-40 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 blur-[100px] rounded-full opacity-30 pointer-events-none" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col max-w-7xl mx-auto w-full p-6 md:p-12">
                {/* Header */}
                <header className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 mb-16 text-center md:text-left">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-center md:justify-start gap-3"
                        >
                            <span className="text-xs font-black tracking-[0.3em] text-purple-400 uppercase">Transcend Wellness</span>
                            <div className="h-1 w-1 rounded-full bg-purple-400" />
                            <Gem size={12} className="text-purple-400" />
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black text-white tracking-tight uppercase"
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-amber-200 to-purple-400">Transcend</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-purple-200/60 max-w-xl font-medium mx-auto md:mx-0 font-serif italic"
                        >
                            "Elevating the human spirit through sovereign intelligence."
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="hidden md:block"
                    >
                        <EdIntelSovereignLogo size={100} showText={false} />
                    </motion.div>
                </header>

                <div className="flex-1 w-full min-h-[600px] mt-8">
                    <WellnessClient />
                </div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-auto pt-12 flex items-center justify-between border-t border-purple-500/10"
                >
                    <div className="flex items-center gap-2 text-[10px] text-purple-500/40 uppercase tracking-widest">
                        <Gem size={12} />
                        Vitality Index: Optimal
                    </div>
                    <Link href="/dashboard" className="text-xs font-bold text-purple-500/40 hover:text-white transition-colors">
                        Return to Command Center
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
