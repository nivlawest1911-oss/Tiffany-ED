'use client';
import { motion } from 'framer-motion';
import { Shield, QrCode, Cpu } from 'lucide-react';
import { useEffect, useState } from 'react';

interface IDData {
    districtName: string;
    objective: string;
    leadershipStyle: string;
    rank: string;
    clearance: string;
    xp: number;
}

export default function ProfessionalID() {
    const [idData, setIdData] = useState<IDData | null>(null);

    useEffect(() => {
        // Load data from localStorage
        const stored = localStorage.getItem('professional_identity') || localStorage.getItem('EdIntel_identity');
        if (stored) {
            setIdData(JSON.parse(stored));
        } else {
            // Default placeholder if not onboarded
            setIdData({
                districtName: "Awaiting Strategic Sync",
                objective: "EXECUTING STRATEGIC VISION",
                leadershipStyle: "VISIONARY",
                rank: "PROBATIONARY COMMANDER",
                clearance: "LEVEL 1",
                xp: 1250
            });
        }
    }, []);

    if (!idData) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-sm mx-auto"
        >
            <div className="relative aspect-[1.586/1] rounded-[2rem] overflow-hidden bg-[#0a0a0c] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group">
                {/* LAYER 0: Mesh Gradient & Particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.15),transparent_50%)] animate-pulse" />
                    <div className="absolute bottom-[-20%] right-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05),transparent_50%)]" />
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
                        backgroundSize: '24px 24px'
                    }} />
                </div>

                {/* LAYER 1: Holographic Shimmer */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Card Content */}
                <div className="relative h-full p-7 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8860B] p-[1px] shadow-lg shadow-amber-500/20">
                                <div className="w-full h-full rounded-2xl bg-zinc-900 flex items-center justify-center">
                                    <Shield className="text-[#D4AF37] w-6 h-6" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-[10px] font-black uppercase text-[#D4AF37] tracking-[0.3em] mb-0.5">Professional <span className="text-white/40 italic">ID</span></h3>
                                <p className="text-white text-sm font-black tracking-tight truncate max-w-[160px]">{idData.districtName}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1">Clearance</div>
                            <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-black text-amber-500 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                                {idData.clearance}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-8 items-end">
                        <div className="flex-1 space-y-4">
                            <div>
                                <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                                    <div className="w-1 h-3 bg-indigo-500 rounded-full" />
                                    Primary Directive
                                </div>
                                <div className="text-[11px] font-bold text-zinc-200 leading-tight line-clamp-2 max-w-[180px]">
                                    {idData.objective}
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div>
                                    <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Leadership Style</div>
                                    <div className="text-[10px] font-black text-white uppercase tracking-tighter">{idData.leadershipStyle}</div>
                                </div>
                                <div>
                                    <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Strategic XP</div>
                                    <div className="text-[10px] font-black text-emerald-400 font-mono italic">{idData.xp.toLocaleString()}</div>
                                </div>
                            </div>
                        </div>

                        <div className="w-20 h-20 bg-zinc-950/80 rounded-2xl border border-white/5 p-2 flex items-center justify-center relative overflow-hidden group/qr group-hover:border-[#D4AF37]/30 transition-colors">
                            <QrCode className="w-full h-full text-[#D4AF37] opacity-20 group-hover/qr:opacity-100 transition-all duration-500 scale-90 group-hover/qr:scale-100" />
                            <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover/qr:opacity-100 transition-opacity" />
                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#D4AF37]/50" />
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#D4AF37]/50" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#D4AF37]/50" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#D4AF37]/50" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-5 border-t border-white/5">
                        <div className="flex items-center gap-2.5">
                            <Cpu className="w-3.5 h-3.5 text-indigo-400/70" />
                            <span className="text-[9px] font-black text-zinc-500 tracking-[0.1em]">ENCRYPTED NEURAL HANDSHAKE</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                            <span className="text-[9px] font-black text-white/40 tracking-wider">SECURE</span>
                        </div>
                    </div>
                </div>

                {/* Scanning Animation - Enhanced with Glow */}
                <motion.div
                    animate={{ y: [-20, 240, -20] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 h-[3px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent z-20 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                />
            </div>
        </motion.div>
    );
}
