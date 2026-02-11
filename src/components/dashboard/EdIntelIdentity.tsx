'use client';

import { motion } from 'framer-motion';
import { Shield, MapPin, Scale, Award, Info } from 'lucide-react';
import Image from 'next/image';
import { GlassCard } from '@/components/ui/Cinematic';
import ProfessionalID from '@/components/dossier/ProfessionalID';

export const EdIntelIdentity = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 xl:grid-cols-3 gap-8 py-8"
        >
            {/* FOUNDER DOSSIER MINI */}
            <GlassCard className="xl:col-span-2 overflow-hidden group">
                <div className="flex flex-col md:flex-row gap-8 p-8 items-center md:items-start text-center md:text-left">
                    <div className="relative w-48 h-48 rounded-full border-2 border-noble-gold p-1 shadow-[0_0_30px_rgba(212,175,55,0.3)] shrink-0 overflow-hidden">
                        <Image
                            src="/images/dr_alvin_west.png"
                            alt="Dr. Alvin West"
                            width={192}
                            height={192}
                            className="object-cover rounded-full"
                        />
                    </div>
                    <div className="flex-1 space-y-4">
                        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
                            <div>
                                <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
                                    Dr. Alvin <span className="text-noble-gold">West</span>
                                </h1>
                                <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-[10px]">
                                    EdIntel Delegate // EdIntel Founder
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 rounded-full bg-noble-gold/10 border border-noble-gold/30 text-noble-gold text-[10px] font-black uppercase tracking-widest">
                                    Executive Tier
                                </span>
                            </div>
                        </div>

                        <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl font-medium">
                            Visionary educational leader and AI architect dedicated to democratizing institutional intelligence.
                            As the EdIntel Delegate, Dr. West bridges the gap between traditional school administration
                            and quantum-age pedagogical efficiency.
                        </p>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                            <div className="space-y-1">
                                <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-1">
                                    <MapPin size={10} /> Location
                                </div>
                                <div className="text-xs font-bold text-white uppercase">Alabama Grid</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-1">
                                    <Scale size={10} /> Jurisdiction
                                </div>
                                <div className="text-xs font-bold text-white uppercase">Global EdTech</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-1">
                                    <Award size={10} /> Clearance
                                </div>
                                <div className="text-xs font-bold text-emerald-500 uppercase">EdIntel Level 9</div>
                            </div>
                            <div className="space-y-1">
                                <div className="text-[9px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-1">
                                    <Info size={10} /> Focus
                                </div>
                                <div className="text-xs font-bold text-noble-gold uppercase">Institutional Recovery</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Visual Flair */}
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                    <Shield size={120} className="rotate-12" />
                </div>
            </GlassCard>

            {/* USER PROFESSIONAL ID */}
            <div className="flex items-center justify-center">
                <div className="w-full relative group">
                    <div className="absolute -inset-4 bg-gradient-to-br from-[#D4AF37]/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <ProfessionalID />
                </div>
            </div>
        </motion.div>
    );
};
