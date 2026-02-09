'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function AboutClient() {
    return (
        <main className="relative min-h-screen pt-32 pb-20 overflow-hidden bg-background">
            {/* Aurora Background Integration */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-slate-950" />
                <div className="absolute w-[500px] h-[500px] bg-blue-600/20 blur-[100px] rounded-full animate-aurora-1" />
                <div className="absolute w-[400px] h-[400px] bg-indigo-500/20 blur-[100px] rounded-full animate-aurora-2" />
            </div>

            <div className="container relative z-10 px-6 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl mx-auto text-center mb-20"
                >
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient-blue">
                        Mission Brief
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Constructing the digital infrastructure for sovereign entities.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Mission Dossier Cards */}
                    <div className="glass-panel p-10 rounded-3xl">
                        <h3 className="text-2xl font-bold mb-4 text-white">Strategic Vision</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            To empower decentralized autonomy through robust, scalable, and secure operational frameworks. We do not just build software; we architect sovereignty.
                        </p>
                    </div>
                    <div className="glass-panel p-10 rounded-3xl">
                        <h3 className="text-2xl font-bold mb-4 text-white">Tactical Execution</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            Deploying advanced neural interfaces and low-latency grids to ensure absolute control and visibility over your digital domain.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
