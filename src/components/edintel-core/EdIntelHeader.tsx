'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Fingerprint, Activity, Bell } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function EdIntelHeader() {
    const { user } = useAuth();

    return (
        <header className="fixed top-0 left-20 right-0 h-20 z-40 px-10 flex items-center justify-between border-b border-intel-gold/10 bg-EdIntel-black/80 backdrop-blur-3xl">
            {/* System Title Area */}
            <div className="flex items-center gap-10">
                <div className="flex flex-col">
                    <h1 className="text-xl font-black italic uppercase tracking-tighter text-white flex items-center gap-3">
                        <span className="text-intel-gold block w-2 h-6 bg-intel-gold rounded-full" />
                        District Intelligence
                        <span className="text-[10px] font-mono text-white/20 mt-1 uppercase tracking-widest normal-case">Command Node</span>
                    </h1>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <div className="flex items-center gap-3 px-4 py-1.5 bg-white/5 rounded-full border border-white/5 shadow-inner">
                        <Activity size={12} className="text-intel-gold animate-pulse" />
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mt-0.5">Neural Synchronicity: 100%</span>
                    </div>
                </div>
            </div>

            {/* EdIntel Bar Controls */}
            <div className="flex items-center gap-8">
                {/* Professional Shield Indicator */}
                <div className="flex items-center gap-4 group cursor-help">
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black text-shield-green uppercase tracking-widest">Active Compliance</span>
                        <span className="text-[8px] font-mono text-white/30 uppercase">AL Code 290-8-9</span>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        className="w-10 h-10 rounded-xl bg-shield-green/10 border border-shield-green/30 flex items-center justify-center text-shield-green shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                    >
                        <ShieldCheck size={18} />
                    </motion.div>
                </div>

                <div className="w-px h-8 bg-white/10" />

                {/* Secure Entry / Protocol Login */}
                <div className="flex items-center gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">{user ? 'Identity Verified' : 'Bio-Auth Required'}</span>
                        <div className="flex items-center gap-2 mt-1">
                            <div className={`w-1.5 h-1.5 rounded-full ${user ? 'bg-intel-gold' : 'bg-red-500'} animate-pulse`} />
                            <span className={`text-[10px] font-bold uppercase tracking-tighter ${user ? 'text-white' : 'text-red-500/80'}`}>
                                {user ? (user.name || 'Admin') : 'Protocol locked'}
                            </span>
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(197,164,126,0.2)' }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${user ? 'bg-intel-gold text-black' : 'bg-white/5 border border-white/10 text-white/40 hover:border-intel-gold/50 hover:text-white'}`}
                        title={user ? "Manage High-Fidelity Session" : "Initiate Bio-Auth Protocol"}
                    >
                        <Fingerprint size={24} strokeWidth={1.5} />
                    </motion.button>
                </div>

                <button className="relative w-10 h-10 rounded-full flex items-center justify-center text-white/20 hover:text-white hover:bg-white/5 transition-all" title="System Notifications">
                    <Bell size={18} />
                    <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-black shadow-[0_0_8px_#ef4444]" />
                </button>
            </div>
        </header>
    );
}
