'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Mic, Video, Check, Zap, Fingerprint } from 'lucide-react';
import Image from 'next/image';

export default function AITwinGenerator() {
    const [step, setStep] = useState(1);
    const [role, setRole] = useState('Superintendent');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleGenerate = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setStep(3);
        }, 3000);
    };

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background FX */}
            <div className="absolute inset-0 bg-zinc-900/50 backdrop-blur-sm" />
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-900/20 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Controls */}
                    <div className="space-y-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                                    <Fingerprint className="text-indigo-400" size={20} />
                                </div>
                                <h3 className="text-indigo-400 font-mono text-xs uppercase tracking-[0.2em]">Identity Cloning Protocol</h3>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">
                                Create Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">AI Twin</span>
                            </h2>
                            <p className="text-zinc-400 text-lg leading-relaxed border-l-4 border-indigo-500/30 pl-6">
                                Upload your biometric data to generate a EdIntel digital delegate capable of autonomous leadership tasks, video broadcasts, and strategic communication.
                            </p>
                        </div>

                        {step === 1 && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">1. Select Delegate Role</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {['Superintendent', 'Principal', 'Counselor', 'Communications'].map((r) => (
                                            <button
                                                key={r}
                                                onClick={() => setRole(r)}
                                                className={`p-4 rounded-xl border text-left transition-all ${role === r
                                                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                                                    : 'bg-zinc-900/50 border-white/10 text-zinc-400 hover:bg-zinc-800'
                                                    }`}
                                            >
                                                <div className="text-xs font-black uppercase tracking-widest mb-1">{r}</div>
                                                <div className="text-[10px] opacity-60">Auth Level: {r === 'Superintendent' ? 'Omega' : 'Alpha'}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider block">2. Upload Biometrics</label>
                                    <div className="grid grid-cols-3 gap-4">
                                        <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-dashed border-zinc-700 hover:border-indigo-500 hover:bg-indigo-500/5 transition-all group">
                                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                                <Upload size={18} />
                                            </div>
                                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Photo</span>
                                        </button>
                                        <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-dashed border-zinc-700 hover:border-indigo-500 hover:bg-indigo-500/5 transition-all group">
                                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                                <Mic size={18} />
                                            </div>
                                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Voice</span>
                                        </button>
                                        <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border border-dashed border-zinc-700 hover:border-indigo-500 hover:bg-indigo-500/5 transition-all group">
                                            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                                                <Video size={18} />
                                            </div>
                                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Video</span>
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setStep(2)}
                                    className="w-full py-6 bg-white text-black font-black uppercase tracking-[0.2em] rounded-xl hover:bg-indigo-500 hover:text-white transition-all shadow-xl hover:shadow-indigo-500/20"
                                >
                                    Initialize Cloning Sequence
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-zinc-950 p-8 rounded-3xl border border-indigo-500/30 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-indigo-900">
                                    <motion.div
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 3, ease: "linear" }}
                                        className="h-full bg-indigo-400 shadow-[0_0_20px_rgba(129,140,248,0.8)]"
                                    />
                                </div>
                                <div className="flex flex-col items-center text-center space-y-6 py-8">
                                    <div className="w-24 h-24 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin flex items-center justify-center">
                                        <Zap className="text-indigo-400 animate-pulse" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">Synthesizing Neural Map</h3>
                                        <p className="text-indigo-400 font-mono text-xs uppercase tracking-widest">Processing Biometric Data...</p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 w-full">
                                        <div className="bg-zinc-900 p-3 rounded text-xs font-mono text-zinc-400">Voice Match: <span className="text-emerald-400">98.4%</span></div>
                                        <div className="bg-zinc-900 p-3 rounded text-xs font-mono text-zinc-400">Face Map: <span className="text-emerald-400">100%</span></div>
                                    </div>
                                </div>
                                {!isProcessing && (
                                    <button onClick={handleGenerate} className="hidden" ref={(el) => { if (el && !isProcessing) setTimeout(handleGenerate, 100); }}></button>
                                )}
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className="bg-emerald-900/20 border border-emerald-500/30 p-6 rounded-2xl flex items-start gap-4">
                                    <div className="p-3 bg-emerald-500/20 rounded-full text-emerald-400">
                                        <Check size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-emerald-400 font-black uppercase tracking-wider mb-2">Twin Successfully Created</h3>
                                        <p className="text-zinc-400 text-sm">Your digital delegate is now active and ready for assignment. Access via the Delegate Dashboard.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setStep(1)}
                                    className="w-full py-4 border border-white/10 text-zinc-400 hover:text-white uppercase tracking-widest text-xs font-bold rounded-xl hover:bg-white/5 transition-all"
                                >
                                    Generate Another Twin
                                </button>
                            </motion.div>
                        )}
                    </div>

                    {/* Right: Visualization */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
                        <motion.div
                            className="relative z-10 aspect-[4/5] rounded-[2.5rem] overflow-hidden border-2 border-indigo-500/20 shadow-2xl bg-zinc-900"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Image
                                src="/images/avatars/Dr._alvin_west.png"
                                alt="AI Twin Preview"
                                fill
                                className="object-cover opacity-80"
                            />

                            {/* Overlay UI */}
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

                            <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        System Online
                                    </div>
                                    <div className="px-3 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
                                        {role}
                                    </div>
                                </div>
                                <h1 className="text-4xl font-black text-white uppercase tracking-tighter">
                                    Dr. Alvin West <span className="text-zinc-500 text-2xl">AI</span>
                                </h1>
                                <div className="grid grid-cols-3 gap-2">
                                    <div className="bg-black/50 backdrop-blur p-3 rounded-xl border border-white/10 text-center">
                                        <div className="text-emerald-400 font-bold text-lg">99%</div>
                                        <div className="text-[8px] text-zinc-500 uppercase tracking-wider">Voice Match</div>
                                    </div>
                                    <div className="bg-black/50 backdrop-blur p-3 rounded-xl border border-white/10 text-center">
                                        <div className="text-indigo-400 font-bold text-lg">24/7</div>
                                        <div className="text-[8px] text-zinc-500 uppercase tracking-wider">Availability</div>
                                    </div>
                                    <div className="bg-black/50 backdrop-blur p-3 rounded-xl border border-white/10 text-center">
                                        <div className="text-purple-400 font-bold text-lg">12</div>
                                        <div className="text-[8px] text-zinc-500 uppercase tracking-wider">Languages</div>
                                    </div>
                                </div>
                            </div>

                            {/* Scanning Line Effect */}
                            <motion.div
                                animate={{ top: ['0%', '100%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-1 bg-indigo-400/50 shadow-[0_0_20px_rgba(129,140,248,0.5)] z-20"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
