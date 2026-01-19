'use client';
import { motion } from 'framer-motion';
import { Shield, MapPin, Award, Zap, QrCode, Cpu } from 'lucide-react';
import { useEffect, useState } from 'react';

interface IDData {
    districtName: string;
    objective: string;
    leadershipStyle: string;
    rank: string;
    clearance: string;
    xp: number;
}

export default function SovereignID() {
    const [idData, setIdData] = useState<IDData | null>(null);

    useEffect(() => {
        // Load data from localStorage
        const stored = localStorage.getItem('sovereign_identity');
        if (stored) {
            setIdData(JSON.parse(stored));
        } else {
            // Default placeholder if not onboarded
            setIdData({
                districtName: "Awaiting Neural Sync",
                objective: "RECLAIMING SOVEREIGNTY",
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
            <div className="relative aspect-[1.586/1] rounded-3xl overflow-hidden bg-zinc-900 border border-white/20 shadow-2xl group">
                {/* Background Patterns */}
                <div className="absolute inset-0 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.2),transparent_50%)]" />
                    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                </div>

                {/* Glass Blur Overlay */}
                <div className="absolute inset-0 backdrop-blur-[2px]" />

                {/* Card Content */}
                <div className="relative h-full p-6 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                <Shield className="text-white w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.2em]">Sovereign ID</h3>
                                <p className="text-white text-xs font-bold truncate max-w-[150px]">{idData.districtName}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-[8px] font-mono text-zinc-500 uppercase">Clearance</div>
                            <div className="text-[10px] font-black text-amber-500">{idData.clearance}</div>
                        </div>
                    </div>

                    <div className="flex gap-6 items-end">
                        <div className="flex-1 space-y-3">
                            <div>
                                <div className="text-[8px] font-mono text-zinc-500 uppercase mb-0.5">Primary Directive</div>
                                <div className="text-[10px] font-bold text-zinc-200 line-clamp-1">{idData.objective}</div>
                            </div>
                            <div className="flex gap-4">
                                <div>
                                    <div className="text-[8px] font-mono text-zinc-500 uppercase mb-0.5">Style</div>
                                    <div className="text-[10px] font-bold text-white uppercase">{idData.leadershipStyle}</div>
                                </div>
                                <div>
                                    <div className="text-[8px] font-mono text-zinc-500 uppercase mb-0.5">Strategic XP</div>
                                    <div className="text-[10px] font-bold text-emerald-500">{idData.xp.toLocaleString()}</div>
                                </div>
                            </div>
                        </div>

                        <div className="w-16 h-16 rounded-lg bg-white/5 border border-white/10 p-1 flex items-center justify-center relative overflow-hidden group/qr">
                            <QrCode className="w-full h-full text-white opacity-40 group-hover/qr:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 bg-indigo-500/20 opacity-0 group-hover/qr:opacity-100 transition-opacity" />
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2">
                            <Cpu className="w-3 h-3 text-indigo-400" />
                            <span className="text-[8px] font-mono text-zinc-400">NEURAL LINK ENCRYPTED</span>
                        </div>
                        <div className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-[8px] font-black text-indigo-400 uppercase tracking-widest">
                            Official Delegate
                        </div>
                    </div>
                </div>

                {/* Scanning Animation */}
                <motion.div
                    animate={{ y: [0, 160, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent z-20"
                />
            </div>
        </motion.div>
    );
}
