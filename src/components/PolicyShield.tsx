'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Unlock, ShieldCheck, Activity, Zap } from 'lucide-react';
import { useState } from 'react';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';

export default function PolicyShield() {
    const [isSecured, setIsSecured] = useState(false);
    const [score, setScore] = useState(94.2);
    const [isHardening, setIsHardening] = useState(false);
    const { playClick, playSuccess } = useProfessionalSounds();

    const toggleShield = () => {
        if (isHardening) return;
        playClick();
        setIsHardening(true);

        setTimeout(() => {
            setIsSecured(!isSecured);
            setScore(isSecured ? 94.2 : 99.9);
            setIsHardening(false);
            playSuccess();
        }, 3000);
    };

    return (
        <div className="p-6 rounded-3xl bg-zinc-900 border border-white/5 relative overflow-hidden group">
            {/* Background Glow */}
            <div className={`absolute inset-0 opacity-10 transition-colors duration-1000 ${isSecured ? 'bg-emerald-500/20' : 'bg-indigo-500/20'}`} />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${isSecured ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400'}`}>
                            {isSecured ? <ShieldCheck size={28} /> : <Shield size={28} />}
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-white uppercase tracking-widest">Professional Policy Shield</h3>
                            <p className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest">Aegis-v4 Protocol</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] font-black text-zinc-500 uppercase mb-1">Status</div>
                        <div className={`text-xs font-bold uppercase transition-colors ${isSecured ? 'text-emerald-400' : 'text-indigo-400'}`}>
                            {isSecured ? 'Hardened' : 'Monitoring'}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="p-4 rounded-2xl bg-black/20 border border-white/5">
                        <div className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                            <Activity size={10} className="text-indigo-500" /> Compliance Score
                        </div>
                        <div className="text-2xl font-black text-white">{score}%</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-black/20 border border-white/5">
                        <div className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                            <Zap size={10} className="text-amber-500" /> Defense Rating
                        </div>
                        <div className="text-2xl font-black text-white">{isSecured ? 'EXECUTIVE' : 'STANDARD'}</div>
                    </div>
                </div>

                <button
                    onClick={toggleShield}
                    disabled={isHardening}
                    className={`w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all relative overflow-hidden group shadow-xl ${isSecured
                            ? 'bg-zinc-800 text-zinc-400 hover:text-white border border-white/5'
                            : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-900/40'
                        }`}
                >
                    <AnimatePresence mode="wait">
                        {isHardening ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center justify-center gap-2"
                            >
                                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                                    <Shield size={14} />
                                </motion.div>
                                Hardening Lattice...
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center justify-center gap-2"
                            >
                                {isSecured ? <Unlock size={14} /> : <Lock size={14} />}
                                {isSecured ? 'Deactivate Aegis' : 'Initialize Executive Lock'}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>

                <p className="text-center mt-4 text-[8px] font-mono text-zinc-600 uppercase tracking-widest">
                    Last sync: {new Date().toLocaleTimeString()}
                </p>
            </div>

            {/* Scanning Line FX */}
            {isHardening && (
                <motion.div
                    animate={{ x: [-400, 400] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 h-full w-px bg-white/20 z-0"
                />
            )}
        </div>
    );
}
