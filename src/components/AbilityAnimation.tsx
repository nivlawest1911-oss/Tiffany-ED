'use client';

import { motion } from 'framer-motion';
import { Target, Shield, BookOpen, Cpu } from 'lucide-react';

interface AbilityAnimationProps {
    type: 'strategy' | 'compliance' | 'analytics' | 'curriculum' | 'identity' | 'communication';
}

export default function AbilityAnimation({ type }: AbilityAnimationProps) {
    const renderContent = () => {
        switch (type) {
            case 'strategy':
                return (
                    <div className="relative w-full h-full flex items-center justify-center bg-black/40">
                        {/* Strategic Radar Map */}
                        <div className="absolute inset-0 border-[0.5px] border-amber-500/10 rounded-full scale-110" />
                        <div className="absolute inset-0 border-[0.5px] border-amber-500/5 rounded-full scale-75" />

                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 bg-gradient-to-t from-transparent via-amber-500/10 to-transparent h-full w-full rounded-full"
                        />

                        <div className="relative z-10 flex flex-col items-center">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="w-24 h-24 bg-amber-500/20 rounded-xl flex items-center justify-center border border-amber-500/30"
                            >
                                <Target className="text-amber-500 w-12 h-12" />
                            </motion.div>
                            <div className="mt-6 space-y-2 text-center">
                                <div className="text-[10px] text-amber-500 font-mono tracking-[0.3em] uppercase">Tactical Overwatch</div>
                                <div className="flex gap-1 justify-center">
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <motion.div
                                            key={i}
                                            animate={{ height: [4, 12, 4], opacity: [0.2, 1, 0.2] }}
                                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                                            className="w-1 bg-amber-500 rounded-full"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Node Points */}
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0.5, 1.2, 0.5]
                                }}
                                transition={{
                                    duration: Math.random() * 3 + 2,
                                    repeat: Infinity,
                                    delay: i * 0.5
                                }}
                                className="absolute w-1.5 h-1.5 bg-amber-400 rounded-full blur-[2px]"
                                style={{
                                    top: `${Math.random() * 80 + 10}%`,
                                    left: `${Math.random() * 80 + 10}%`
                                }}
                            />
                        ))}
                    </div>
                );

            case 'compliance':
                return (
                    <div className="relative w-full h-full flex items-center justify-center flex-col bg-zinc-950 overflow-hidden font-mono text-[8px]">
                        <div className="absolute top-0 left-0 p-4 w-full h-full opacity-30">
                            <div className="grid grid-cols-2 gap-4">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="space-y-1">
                                        <div className="w-full h-2 bg-zinc-800 rounded overflow-hidden">
                                            <motion.div
                                                animate={{ x: [-100, 100] }}
                                                transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: "linear" }}
                                                className="w-1/2 h-full bg-indigo-500"
                                            />
                                        </div>
                                        <div className="text-zinc-600">CHECKING_RULE_642-{i}...</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="relative z-10 w-40 h-56 bg-zinc-900 border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col justify-between"
                        >
                            <div className="flex justify-between items-start">
                                <Shield className="text-emerald-400 w-8 h-8" />
                                <div className="text-right">
                                    <div className="text-emerald-400">PASSED</div>
                                    <div className="text-zinc-500">ID:91-884</div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="h-0.5 w-full bg-white/5" />
                                <div className="flex justify-between text-zinc-400">
                                    <span>STATUTE 101</span>
                                    <span className="text-emerald-500">OPTIMAL</span>
                                </div>
                                <div className="flex justify-between text-zinc-400">
                                    <span>LEA_COMPLIANCE</span>
                                    <span className="text-emerald-500">100%</span>
                                </div>
                                <div className="flex justify-between text-zinc-400">
                                    <span>PROCEDURAL_SAFEGUARD</span>
                                    <span className="text-emerald-500">ACTIVE</span>
                                </div>
                            </div>

                            <motion.div
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1, repeat: Infinity }}
                                className="w-full py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-center text-[7px] tracking-widest rounded"
                            >
                                SYSTEM_SECURE_VAULT_ACTIVE
                            </motion.div>
                        </motion.div>
                    </div>
                );

            case 'analytics':
                return (
                    <div className="relative w-full h-full flex items-center justify-center p-8">
                        <div className="w-full max-w-sm h-64 bg-black/40 border border-indigo-500/10 rounded-3xl p-6 relative overflow-hidden backdrop-blur-xl">
                            <div className="flex justify-between items-end h-full gap-2">
                                {[40, 70, 45, 90, 65, 80, 50, 95, 30].map((h, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${h}%` }}
                                            transition={{ duration: 1.5, delay: i * 0.1, ease: "circOut" }}
                                            className="w-full bg-gradient-to-t from-indigo-600 to-purple-400 rounded-lg relative group"
                                        >
                                            <motion.div
                                                animate={{ opacity: [0, 1, 0] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                                className="absolute -top-1 left-0 right-0 h-1 bg-white rounded-full blur-[1px]"
                                            />
                                        </motion.div>
                                        <span className="text-[7px] font-mono text-zinc-500">Q{i + 1}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Floating Stats */}
                            <motion.div
                                animate={{ y: [0, -4, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="absolute top-6 right-6 bg-zinc-900 border border-white/10 p-2 rounded-lg"
                            >
                                <div className="text-[8px] text-zinc-500 uppercase tracking-widest">Growth Vector</div>
                                <div className="text-xs font-black text-indigo-400">+24.8%</div>
                            </motion.div>
                        </div>

                        {/* Scanning Line overlay */}
                        <motion.div
                            animate={{ top: ['0%', '100%', '0%'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-px bg-indigo-500/40 z-10 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                        />
                    </div>
                );

            case 'curriculum':
                return (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <div className="relative flex flex-col items-center">
                            <div className="relative w-32 h-32 mb-6">
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            rotate: 360,
                                            scale: [1, 1.1, 1]
                                        }}
                                        transition={{
                                            rotate: { duration: 10 + i * 5, repeat: Infinity, ease: "linear" },
                                            scale: { duration: 3, repeat: Infinity, delay: i * 0.5 }
                                        }}
                                        className="absolute inset-0 border border-purple-500/20 rounded-full"
                                        style={{ margin: `${i * 10}px` }}
                                    />
                                ))}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <BookOpen className="text-purple-400 w-12 h-12" />
                                </div>
                            </div>

                            <div className="space-y-2 w-48">
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 + i * 0.2 }}
                                        className="h-2 bg-white/5 rounded-full relative overflow-hidden"
                                    >
                                        <motion.div
                                            animate={{ width: ['0%', '100%'] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                                            className="h-full bg-purple-500/40"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="text-center">
                            <motion.div
                                animate={{ rotate: [0, 90, 180, 270, 360] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="w-20 h-20 border-2 border-dashed border-indigo-500/30 rounded-full flex items-center justify-center mb-4"
                            >
                                <Cpu className="text-indigo-400/50 w-8 h-8" />
                            </motion.div>
                            <p className="text-zinc-600 text-[9px] uppercase tracking-[0.4em] font-mono animate-pulse">Initializing Synthesis...</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="w-full h-full relative">
            {renderContent()}

            {/* Common HUD Overlay elements */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]"
                />
                <span className="text-[7px] font-mono text-white/40 uppercase tracking-widest">Live Agent Stream: {type}</span>
            </div>

            <div className="absolute bottom-4 right-4 text-right">
                <div className="text-[7px] font-mono text-white/20 uppercase tracking-[0.2em] mb-1">Architecture: EdIntel SOVEREIGN</div>
                <div className="text-[8px] font-mono text-white/10">0x-947: SYN_STABLE</div>
            </div>
        </div>
    );
}
