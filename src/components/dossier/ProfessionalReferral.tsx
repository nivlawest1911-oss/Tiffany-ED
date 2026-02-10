'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Gift, Copy, CheckCircle, Globe } from 'lucide-react';
import Image from 'next/image';

export default function ProfessionalReferral() {
    const [copied, setCopied] = useState(false);
    const [inviteCount, setInviteCount] = useState(0);
    const referralLink = "https://edintel.ai/join/sov-77x";

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        // Simulate a viral event for the user to feel good
        if (inviteCount === 0) setInviteCount(1);
    };

    const handleSimulateInvite = () => {
        setInviteCount(prev => prev + 1);
    };

    return (
        <section className="relative py-16 px-4">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-purple-900/20 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto relative z-10"
            >
                <div className="bg-zinc-900/80 backdrop-blur-xl border border-indigo-500/30 rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
                    {/* Viral Background Effects */}
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] animate-pulse-slow" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] animate-pulse-slow delay-1000" />

                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-indigo-500/20">
                                <Globe size={12} />
                                <span>Global Network Expansion</span>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                                Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Infinite</span> Intelligence
                            </h2>
                            <p className="text-zinc-400 mb-8 leading-relaxed">
                                Our network grows stronger with every person. Invite 3 educators to join our Professional Network and unlock a <strong>Month of Professional Access</strong> instantly.
                            </p>

                            {/* Progress Bar */}
                            <div className="mb-8">
                                <div className="flex justify-between text-xs font-bold uppercase text-zinc-500 mb-2">
                                    <span>Progress to Unlock</span>
                                    <span>{Math.min(inviteCount, 3)} / 3 Invites</span>
                                </div>
                                <div className="h-4 bg-black rounded-full overflow-hidden border border-zinc-800">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(Math.min(inviteCount, 3) / 3) * 100}%` }}
                                        transition={{ type: "spring", stiffness: 50 }}
                                        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative"
                                    >
                                        <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
                                    </motion.div>
                                </div>
                                {inviteCount >= 3 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-400 text-sm font-bold"
                                    >
                                        <CheckCircle size={16} />
                                        <span>Congratulations! Professional Protocols Unlocked.</span>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        <div className="w-full md:w-auto p-6 bg-black rounded-3xl border border-zinc-800 shadow-2xl relative group">
                            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4 text-center">Your Professional Link</h3>

                            <div className="flex items-center gap-2 p-2 bg-zinc-900 rounded-xl border border-zinc-800 mb-4 group-hover:border-indigo-500/50 transition-colors">
                                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                    <Gift size={20} />
                                </div>
                                <code className="flex-1 text-xs text-white px-2 font-mono truncate max-w-[160px]">
                                    {referralLink}
                                </code>
                                <button
                                    onClick={handleCopy}
                                    className="p-2 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors"
                                >
                                    {copied ? <CheckCircle size={18} className="text-emerald-500" /> : <Copy size={18} />}
                                </button>
                            </div>

                            <button
                                onClick={handleSimulateInvite} // In real app, this would be a real share dialog
                                className="w-full py-4 rounded-xl bg-white text-black font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/10"
                            >
                                <Share2 size={16} /> Share Invitation
                            </button>

                            <p className="text-[10px] text-zinc-600 text-center mt-4 px-4">
                                *Referring 10+ users grants "Community Leader" status and additional professional rewards.
                            </p>

                            {/* "Live" Social Proof */}
                            <div className="absolute -bottom-10 md:-bottom-12 left-1/2 -translate-x-1/2 flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-zinc-800 overflow-hidden relative">
                                        <Image
                                            src={`/images/avatars/avatar_${i}.png`}
                                            onError={(e: any) => e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`}
                                            alt="User"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                                <div className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center text-[9px] font-bold text-white">
                                    +2k
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
