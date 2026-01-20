'use client';

import React, { useState } from 'react';
import { Shield, Key, Lock, Eye, EyeOff, Server, Cpu, Database, Zap, Activity, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ApiKey {
    id: string;
    name: string;
    key: string;
    status: 'active' | 'inactive';
    usage: number;
}

export default function SovereignApiVault() {
    const [isOpen, setIsOpen] = useState(false);

    const INITIAL_KEYS: ApiKey[] = [
        { id: 'openai', name: 'Neural Processing (GPT-4o)', key: 'sk-proj-••••••••••••••••••••••••••••••••3a2f', status: 'active', usage: 12 },
        { id: 'google', name: 'Quantum Reasoning (Gemini 2.0)', key: 'AIzaSy••••••••••••••••••••••••••••7b9d', status: 'active', usage: 45 },
        { id: 'meta', name: 'Open Architecture (Llama 3)', key: 'meta-••••••••••••••••••••••••••••0c1f', status: 'active', usage: 5 },
        { id: 'mistral', name: 'Efficiency Core (Mistral Large)', key: 'mi-••••••••••••••••••••••••••••9d4e', status: 'active', usage: 18 },
        { id: 'anthropic', name: 'Reasoning Engine (Claude 3.5)', key: 'sk-ant-••••••••••••••••••••••••••••2e1c', status: 'active', usage: 8 },
        { id: 'heygen', name: 'Avatar Synthesis (HeyGen v2)', key: 'hg-••••••••••••••••••••••••••••9f4d', status: 'active', usage: 60 },
        { id: 'elevenlabs', name: 'Vocal Emulation (ElevenLabs)', key: 'el-••••••••••••••••••••••••••••5a2b', status: 'active', usage: 32 },
        { id: 'runway', name: 'Motion Synthesis (Runway Gen-3)', key: 'rw-••••••••••••••••••••••••••••8c7e', status: 'active', usage: 15 },
    ];

    const [keys, setKeys] = useState<{ [key: string]: string }>({
        openai: '',
        elevenlabs: '',
        heygen: '',
        gemini: ''
    });

    const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({
        openai: false,
        elevenlabs: false,
        heygen: false,
        gemini: false
    });

    const services = [
        { id: 'openai', label: 'OpenAI (GPT-4o)', icon: Cpu, color: 'text-green-400', desc: 'Reasoning Engine' },
        { id: 'elevenlabs', label: 'ElevenLabs', icon: Activity, color: 'text-amber-400', desc: 'Voice Synthesis' },
        { id: 'heygen', label: 'HeyGen Avatar', icon: UserIcon, color: 'text-purple-400', desc: 'Visual Identity' },
        { id: 'gemini', label: 'Google Gemini', icon: Server, color: 'text-blue-400', desc: 'Multimodal Core' }
    ];

    const toggleVisibility = (id: string) => {
        setIsVisible(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const updateKey = (id: string, value: string) => {
        setKeys(prev => ({ ...prev, [id]: value }));
    };

    return (
        <div className="fixed top-24 right-4 z-50 font-sans">
            <AnimatePresence mode="wait">
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        onClick={() => setIsOpen(true)}
                        className="group bg-black/80 backdrop-blur-xl border border-amber-500/30 p-3 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all"
                    >
                        <Shield className="w-6 h-6 text-amber-500 group-hover:text-amber-300 transition-colors" />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: 20 }}
                        className="bg-[#0a0a0a] border border-amber-500/20 rounded-2xl p-6 w-96 shadow-2xl backdrop-blur-2xl relative overflow-hidden"
                    >
                        {/* Background Effects */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        <div className="flex items-center justify-between mb-6 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-500/10 rounded-lg">
                                    <Shield className="w-5 h-5 text-amber-500" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white uppercase tracking-widest">Sovereign Vault</h3>
                                    <p className="text-[10px] text-amber-500/60 font-mono">ENCRYPTED KEY STORAGE</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-zinc-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
                            >
                                <Lock className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-4 relative z-10">
                            {services.map((service) => (
                                <div key={service.id} className="group">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <div className="flex items-center gap-2">
                                            <service.icon className={`w-3 h-3 ${service.color}`} />
                                            <span className="text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">{service.label}</span>
                                        </div>
                                        <span className="text-[9px] text-zinc-600 uppercase tracking-widest">{service.desc}</span>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Key className="h-3 w-3 text-zinc-600 group-focus-within:text-amber-500/50 transition-colors" />
                                        </div>
                                        <input
                                            type={isVisible[service.id] ? "text" : "password"}
                                            value={keys[service.id]}
                                            onChange={(e) => updateKey(service.id, e.target.value)}
                                            className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-amber-500/50 rounded-lg pl-9 pr-9 py-2.5 text-xs text-white placeholder-zinc-700 outline-none transition-all font-mono group-hover:bg-zinc-900"
                                            placeholder={`ENTER ${service.id.toUpperCase()} SECRET_KEY`}
                                        />
                                        <button
                                            onClick={() => toggleVisibility(service.id)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-600 hover:text-zinc-300 cursor-pointer"
                                        >
                                            {isVisible[service.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">System Secure</span>
                            </div>
                            <button
                                onClick={() => {
                                    localStorage.setItem('edintel_super_enhanced', 'true');
                                    window.dispatchEvent(new Event('super_enhance_update'));
                                    alert("SYSTEM SUPER-ENHANCED: Neural engines calibrated to maximum fidelity.");
                                }}
                                className="text-[10px] bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 px-3 py-1.5 rounded border border-amber-500/20 transition-all uppercase tracking-widest font-bold flex items-center gap-2"
                            >
                                <Zap className="w-3 h-3" fill="currentColor" />
                                Super Enhance
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
