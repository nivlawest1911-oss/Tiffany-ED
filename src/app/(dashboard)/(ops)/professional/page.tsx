'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    GraduationCap,
    ShieldCheck,
    Activity,
    Target
} from 'lucide-react';
import AcademyDashboard from '@/components/professional/AcademyDashboard';
import CertificationVault from '@/components/professional/CertificationVault';

export default function ProfessionalCenterPage() {
    const [view, setView] = useState<'ACADEMY' | 'VAULT'>('ACADEMY');

    return (
        <div className="min-h-screen bg-[#050505] p-6 lg:p-10">
            {/* Top Navigation */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[2rem] bg-gradient-to-br from-intel-gold to-amber-600 flex items-center justify-center shadow-lg shadow-intel-gold/20">
                        <GraduationCap className="text-black" size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
                            Professional <span className="text-intel-gold">Development</span>
                        </h1>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Neural Link Active
                            </span>
                            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">â€¢</span>
                            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Academy Node 01</span>
                        </div>
                    </div>
                </div>

                <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-xl">
                    <button
                        onClick={() => setView('ACADEMY')}
                        className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${view === 'ACADEMY' ? 'bg-intel-gold text-black shadow-lg shadow-intel-gold/20' : 'text-white/40 hover:text-white'
                            }`}
                    >
                        Academy
                    </button>
                    <button
                        onClick={() => setView('VAULT')}
                        className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all ${view === 'VAULT' ? 'bg-intel-gold text-black shadow-lg shadow-intel-gold/20' : 'text-white/40 hover:text-white'
                            }`}
                    >
                        Vault
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-[1400px] mx-auto">
                <motion.div
                    key={view}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    {view === 'ACADEMY' ? <AcademyDashboard /> : <CertificationVault />}
                </motion.div>
            </div>

            {/* Sidebar / Auxiliary Info (Optional for Phase 30) */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-50 hover:opacity-100 transition-opacity duration-700">
                <div className="flex items-center gap-4 p-6 rounded-3xl bg-white/5 border border-white/5 group">
                    <div className="p-3 rounded-2xl bg-white/5 text-white/40 group-hover:text-intel-gold transition-colors">
                        <Activity size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Neural Load</div>
                        <div className="text-sm font-black text-white">42% â€¢ OPTIMIZED</div>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-6 rounded-3xl bg-white/5 border border-white/5 group">
                    <div className="p-3 rounded-2xl bg-white/5 text-white/40 group-hover:text-intel-gold transition-colors">
                        <ShieldCheck size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Cognitive Integrity</div>
                        <div className="text-sm font-black text-white">VERIFIED</div>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-6 rounded-3xl bg-white/5 border border-white/5 group">
                    <div className="p-3 rounded-2xl bg-white/5 text-white/40 group-hover:text-intel-gold transition-colors">
                        <Target size={20} />
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Next Milestone</div>
                        <div className="text-sm font-black text-white uppercase">Sovereign Synthesis</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
