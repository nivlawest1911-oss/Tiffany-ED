'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, CheckCircle2, AlertCircle, LifeBuoy } from 'lucide-react';
import { createSupportTicket } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';

export const SupportTerminal = () => {
    const { user } = useAuth();
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [priority, setPriority] = useState('STANDARD');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !subject || !message) return;

        setIsSubmitting(true);
        try {
            const ticket = await createSupportTicket(user.id, subject, message, priority);
            if (ticket) {
                setStatus('success');
                setSubject('');
                setMessage('');
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                throw new Error('Signal Interrupted');
            }
        } catch (err) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-8 bg-[#050507] border border-white/10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <LifeBuoy className="w-32 h-32 rotate-12" />
            </div>

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <MessageSquare className="text-indigo-500 w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-black uppercase italic tracking-tighter text-white leading-none">Support Terminal</h2>
                        <p className="text-[8px] text-zinc-500 uppercase tracking-[0.4em] font-black mt-2">Direct Command Uplink</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="SUBJECT PROTOCOL..."
                        className="w-full p-4 bg-white/[0.03] border border-white/5 rounded-2xl outline-none focus:border-indigo-500/50 transition-all font-black text-[10px] text-white placeholder:text-zinc-600 uppercase tracking-widest"
                        required
                    />
                </div>

                <div className="flex gap-2">
                    {['STANDARD', 'URGENT', 'TACTICAL'].map((p) => (
                        <button
                            key={p}
                            type="button"
                            onClick={() => setPriority(p)}
                            className={`flex-1 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all ${priority === p
                                    ? 'bg-indigo-600 text-white border border-indigo-500 shadow-lg shadow-indigo-900/20'
                                    : 'bg-white/[0.03] text-zinc-600 border border-white/5 hover:bg-white/[0.05]'
                                }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>

                <div>
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="DESCRIBE THE STRATEGIC ANOMALY..."
                        className="w-full h-32 p-4 bg-white/[0.03] border border-white/5 rounded-2xl outline-none focus:border-indigo-500/50 transition-all font-bold text-[10px] text-white placeholder:text-zinc-700 resize-none leading-relaxed"
                        required
                    />
                </div>

                <AnimatePresence mode="wait">
                    {status === 'success' ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-400"
                        >
                            <CheckCircle2 className="w-5 h-5" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Feedback Transmitted to Vault</span>
                        </motion.div>
                    ) : status === 'error' ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500"
                        >
                            <AlertCircle className="w-5 h-5" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Uplink Failed. Check Connectivity.</span>
                        </motion.div>
                    ) : (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-5 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-indigo-500 hover:text-white transition-all shadow-xl shadow-indigo-900/10 active:scale-95 disabled:opacity-50"
                        >
                            {isSubmitting ? 'TRANSMITTING...' : 'Initialize Feedback Protocol'}
                            <Send className="w-4 h-4" />
                        </motion.button>
                    )}
                </AnimatePresence>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-[8px] text-zinc-700 uppercase font-black tracking-widest text-center">
                    Authorized Encryption: AES-GCM 256-BIT // Site Node: Mobile_Local
                </p>
            </div>
        </div>
    );
};
