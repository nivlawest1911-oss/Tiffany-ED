'use client';

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
const supabase = createClient();
import { ShieldCheck, ArrowRight, Loader2, Sparkles, Building2, Mail, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCelebrate } from '@/context/CelebrationContext';

export const LeadIntake = () => {
    const { celebrate } = useCelebrate();
    const [email, setEmail] = useState('');
    const [school, setSchool] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const { error } = await supabase
                .from('leads')
                .insert([{
                    email,
                    school_name: school,
                    source: 'EdIntel Website Portal',
                    status: 'IDENTIFIED'
                }]);

            if (error) throw error;
            setTimeout(() => {
                setStatus('success');
                celebrate(
                    'Pilot Authorized',
                    'Your district has been successfully queued for EdIntel integration.',
                    'prime'
                );
            }, 1500);
        } catch (err) {
            console.error("Submission failed:", err);
            alert("Institutional handshake timeout. Please check your connection or contact Dr. West.");
            setStatus('idle');
        }
    };

    return (
        <div className="relative w-full max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
                {status === 'success' ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="liquid-glass p-12 text-center border-noble-gold/30 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-noble-gold/5 pointer-events-none" />
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-20 h-20 bg-noble-gold/20 border border-noble-gold/40 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                        >
                            <ShieldCheck className="text-noble-gold w-10 h-10" />
                        </motion.div>
                        <h3 className="text-4xl font-black uppercase italic tracking-tighter gold-gradient-text mb-4">Protocol Initiated</h3>
                        <p className="text-[10px] text-noble-gold/80 tracking-[0.4em] uppercase font-black mb-8 leading-none">Node Provisioning Active</p>
                        <p className="text-white/60 text-lg leading-relaxed max-w-md mx-auto">
                            A verification protocol has been dispatched to <span className="text-white font-bold">{email}</span>. Please authorize your district license within 24 hours.
                        </p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="mt-12 text-[10px] text-white/30 uppercase font-black tracking-[0.3em] hover:text-noble-gold transition-all"
                        >
                            Initialize Secondary Node
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="liquid-glass p-1 md:p-1 relative overflow-hidden"
                    >
                        <form onSubmit={handleSubmit} className="relative z-10 p-10 space-y-8">
                            <div className="flex items-center gap-4 mb-12">
                                <div className="w-12 h-12 bg-noble-gold/10 border border-noble-gold/20 rounded-2xl flex items-center justify-center">
                                    <Sparkles className="text-noble-gold w-6 h-6 animate-pulse" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">EdIntel Intake</h3>
                                    <p className="text-[9px] text-noble-gold/50 uppercase tracking-[0.4em] font-black">Provisioning Portal // v5.1.S</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-black ml-1 flex items-center gap-2">
                                        <Building2 size={12} className="text-noble-gold" />
                                        Building Command
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="District or School Name"
                                        className="w-full bg-white/[0.03] border border-white/10 p-5 rounded-2xl text-[11px] text-white uppercase tracking-widest focus:border-noble-gold focus:ring-1 focus:ring-noble-gold/20 outline-none transition-all placeholder:text-white/10"
                                        value={school}
                                        onChange={(e) => setSchool(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-black ml-1 flex items-center gap-2">
                                        <Mail size={12} className="text-noble-gold" />
                                        Admin Endpoint
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Admin@District.edu"
                                        className="w-full bg-white/[0.03] border border-white/10 p-5 rounded-2xl text-[11px] text-white uppercase tracking-widest focus:border-noble-gold focus:ring-1 focus:ring-noble-gold/20 outline-none transition-all placeholder:text-white/10"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                disabled={status === 'submitting'}
                                className="EdIntel-button w-full py-8 text-sm group"
                            >
                                {status === 'submitting' ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Synchronizing...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-4">
                                        <Command size={20} className="group-hover:rotate-12 transition-transform" />
                                        <span>Authorize EdIntel Pilot</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                    </div>
                                )}
                            </motion.button>

                            <p className="pt-6 text-[8px] text-center text-white/20 uppercase tracking-[0.3em] leading-relaxed italic font-bold">
                                Authentication implies acceptance of EdIntel Data Governance Protocols.<br />
                                Authorized for Alabama Educational Jurisdictions only.
                            </p>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
