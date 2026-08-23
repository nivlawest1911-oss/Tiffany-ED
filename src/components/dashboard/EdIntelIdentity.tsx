'use client';

import { motion } from 'framer-motion';
import { Shield, MapPin, Scale, Award, Info, Sparkles, CheckCircle2 } from 'lucide-react';
import { HolographicCard } from '@/components/ui/HolographicCard';
import ProfessionalID from '@/components/dossier/ProfessionalID';

export const EdIntelIdentity = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-6 py-4 font-sans"
        >
            {/* FOUNDER DOSSIER MINI */}
            <HolographicCard className="xl:col-span-2 overflow-hidden group border-white/10 bg-[#050814]/90 backdrop-blur-xl">
                <div className="flex flex-col md:flex-row gap-6 p-6 items-center md:items-start text-center md:text-left h-full">
                    {/* SVG Vector Avatar Badge (Zero Raster Image Dependency) */}
                    <div className="relative w-40 h-40 rounded-2xl bg-gradient-to-br from-amber-500/20 via-indigo-900/30 to-emerald-500/20 border-2 border-amber-400/40 p-2 shadow-[0_0_30px_rgba(245,158,11,0.15)] shrink-0 flex flex-col items-center justify-center group-hover:border-amber-400 transition-colors">
                        <div className="w-20 h-20 rounded-full bg-amber-400/10 border border-amber-400/40 flex items-center justify-center text-amber-300 font-mono font-black text-3xl shadow-inner">
                            AW
                        </div>
                        <div className="mt-2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[9px] font-mono font-bold uppercase tracking-widest">
                            <Sparkles className="w-3 h-3 text-amber-400" /> Founder
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400 border-2 border-[#050814] text-black flex items-center justify-center">
                            <Award className="w-3.5 h-3.5" />
                        </div>
                    </div>

                    <div className="flex-1 space-y-3">
                        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-3">
                            <div>
                                <h1 className="text-3xl font-black text-white uppercase tracking-tight italic">
                                    Dr. Alvin <span className="text-amber-400">West</span>
                                </h1>
                                <p className="text-zinc-400 font-mono font-bold uppercase tracking-[0.2em] text-[10px]">
                                    EdIntel Delegate // EdIntel Founder
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[9px] font-mono font-bold uppercase tracking-widest">
                                    Executive Tier
                                </span>
                            </div>
                        </div>

                        <p className="text-zinc-300 text-xs leading-relaxed max-w-2xl font-sans font-medium">
                            Visionary educational leader and AI architect dedicated to democratizing institutional intelligence.
                            As the EdIntel Delegate, Dr. West bridges traditional school administration with biometrically verified pedagogical automation.
                        </p>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2 font-mono">
                            <div className="space-y-0.5">
                                <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                                    <MapPin size={10} className="text-amber-400" /> Location
                                </div>
                                <div className="text-xs font-bold text-white uppercase tracking-tight">Alabama Grid</div>
                            </div>
                            <div className="space-y-0.5">
                                <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                                    <Scale size={10} className="text-amber-400" /> Jurisdiction
                                </div>
                                <div className="text-xs font-bold text-white uppercase tracking-tight">Global EdTech</div>
                            </div>
                            <div className="space-y-0.5">
                                <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                                    <Award size={10} className="text-emerald-400" /> Clearance
                                </div>
                                <div className="text-xs font-bold text-emerald-400 uppercase tracking-tight">EdIntel Level 9</div>
                            </div>
                            <div className="space-y-0.5">
                                <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                                    <Info size={10} className="text-amber-400" /> Focus
                                </div>
                                <div className="text-xs font-bold text-amber-400 uppercase tracking-tight">Institutional Recovery</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visual Flair */}
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                    <Shield size={120} className="rotate-12 text-amber-400" />
                </div>
            </HolographicCard>

            {/* USER PROFESSIONAL ID */}
            <div className="flex items-center justify-center">
                <div className="w-full relative group">
                    <div className="absolute -inset-2 bg-gradient-to-br from-amber-500/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <ProfessionalID />
                </div>
            </div>
        </motion.div>
    );
};
