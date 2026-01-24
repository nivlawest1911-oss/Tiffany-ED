'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const LeadIntake = () => {
    const [email, setEmail] = useState('');
    const [school, setSchool] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            // Log the lead into the Sovereign database
            const { error } = await supabase
                .from('leads')
                .insert([{
                    email,
                    school_name: school,
                    source: 'Sovereign Website Portal',
                    status: 'IDENTIFIED'
                }]);

            if (error) throw error;

            setTimeout(() => setStatus('success'), 1500);
        } catch (err) {
            console.error("Submission failed:", err);
            alert("Institutional handshake timeout. Please try again or contact Dr. West directly.");
            setStatus('idle');
        }
    };

    return (
        <div className="relative w-full max-w-lg mx-auto">
            {/* Decorative Background Mesh */}
            <div className="absolute inset-0 bg-emerald-500/5 blur-[100px] -z-10" />

            <AnimatePresence mode="wait">
                {status === 'success' ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-12 bg-[#050507] border border-emerald-500/30 rounded-[3rem] text-center shadow-2xl"
                    >
                        <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 rounded-3xl flex items-center justify-center mx-auto mb-8">
                            <ShieldCheck className="text-emerald-500 w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-black uppercase text-white italic tracking-tighter leading-none">Protocol Initiated</h3>
                        <p className="text-[10px] text-emerald-400 mt-4 tracking-[0.4em] uppercase font-bold">Node Provisioning in Progress</p>
                        <p className="text-zinc-500 text-sm mt-6 leading-relaxed">
                            A verification protocol has been dispatched to <span className="text-white font-bold">{email}</span>. Please authorize your school's 14-day trial within 24 hours.
                        </p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="mt-10 text-[9px] text-zinc-600 uppercase font-black tracking-widest hover:text-white transition-colors"
                        >
                            Register Another Node
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="p-10 bg-[#050507] border border-white/10 rounded-[3rem] shadow-2xl relative overflow-hidden group"
                    >
                        {/* Interior Glow */}
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-[60px] group-hover:bg-emerald-500/20 transition-all duration-700" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
                                    <Sparkles className="text-emerald-500 w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Site Request</h3>
                                    <p className="text-[8px] text-zinc-500 uppercase tracking-widest font-black">Provisioning Portal // v4.2</p>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-bold ml-1">Building Command Name</label>
                                    <input
                                        type="text"
                                        placeholder="E.G. MATTIE T. BLOUNT HIGH SCHOOL"
                                        className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-2xl text-[10px] text-white uppercase tracking-widest focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-700"
                                        value={school}
                                        onChange={(e) => setSchool(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 font-bold ml-1">Administrative Endpoint</label>
                                    <input
                                        type="email"
                                        placeholder="ADMIN@MCPSS.COM"
                                        className="w-full bg-white/[0.03] border border-white/10 p-4 rounded-2xl text-[10px] text-white uppercase tracking-widest focus:border-emerald-500 outline-none transition-all placeholder:text-zinc-700"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={status === 'submitting'}
                                    className="w-full relative group/btn flex items-center justify-center gap-3 py-5 bg-emerald-600 text-black font-black uppercase text-xs tracking-[0.3em] rounded-2xl overflow-hidden shadow-lg shadow-emerald-900/20 disabled:opacity-50"
                                >
                                    {status === 'submitting' ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Handshaking...
                                        </>
                                    ) : (
                                        <>
                                            Authorize 14-Day Pilot
                                            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                    {/* High-speed sweep effect */}
                                    <div className="absolute inset-0 bg-white/20 -translate-x-[150%] group-hover/btn:translate-x-[150%] transition-transform duration-1000 rotate-12" />
                                </motion.button>
                            </form>

                            <p className="mt-8 text-[8px] text-center text-zinc-600 uppercase tracking-[0.2em] leading-relaxed italic">
                                By authorizing, you agree to the Sovereign Data Governance protocols.<br />Developed exclusively for Alabama Public Schools.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
