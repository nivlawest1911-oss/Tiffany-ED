'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function LandingPageClient() {
    return (
        <div className="relative min-h-screen flex flex-col bg-slate-950 text-white overflow-hidden">
            {/* Cinematic Entry Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black" />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 blur-[120px] animate-aurora-1" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] animate-aurora-2" />
                <div className="scanline" /> {/* Scanline overlay from globals.css */}
            </div>

            {/* Hero Content */}
            <main className="flex-grow flex flex-col items-center justify-center relative z-10 text-center px-4">
                <div className="glass-panel px-6 py-2 rounded-full mb-8 border-blue-500/30">
                    <span className="text-sm font-medium tracking-widest text-blue-400 uppercase">System Online // v2.0.4</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 text-white drop-shadow-2xl">
                    SOVEREIGN <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">OS</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
                    The definitive operating layer for autonomous digital command.
                    Secure. Scalable. Sovereign.
                </p>

                <div className="flex gap-4">
                    <Link href="/dashboard" className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-all overflow-hidden">
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative flex items-center">
                            Initialize System <ArrowRight className="ml-2 w-4 h-4" />
                        </span>
                    </Link>
                    <Link href="/about" className="px-8 py-4 glass-panel hover:bg-white/5 text-white font-bold rounded-lg transition-all">
                        View Dossier
                    </Link>
                </div>
            </main>

            {/* Unified Footer */}
            <footer className="relative z-10 py-8 border-t border-white/5 bg-slate-950/50 backdrop-blur-md">
                <div className="container mx-auto px-6 text-center text-slate-500 text-sm">
                    <p>© 2024 Sovereign OS. All Systems Nominal.</p>
                </div>
            </footer>
        </div>
    );
}
