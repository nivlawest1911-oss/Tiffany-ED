'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShieldCheck, Hexagon } from 'lucide-react';
import HolographicBriefing from '@/components/intelligence/HolographicBriefing';
import SignupForm from '@/components/features/SignupForm';

export default function SignupClient() {
    const [showBriefing, setShowBriefing] = useState(false);
    const searchParams = useSearchParams();
    const plan = searchParams.get('plan') || 'free';

    return (
        <main className="content-stage min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 w-full flex flex-col items-center">
                <button
                    onClick={() => setShowBriefing(true)}
                    className="mb-12 px-6 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[9px] font-black uppercase tracking-[0.3em] hover:bg-emerald-500/10 transition-all group flex items-center gap-3"
                >
                    <ShieldCheck size={14} className="animate-pulse" />
                    Initialize Induction Briefing
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-xl bg-zinc-900/40 backdrop-blur-3xl rounded-[3.5rem] p-12 lg:p-16 border border-white/5 shadow-[0_0_100px_rgba(0,0,0,0.8)] relative z-10"
                >
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                        <Hexagon size={240} className="-rotate-12" />
                    </div>

                    <div className="text-center mb-16 relative">
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="w-20 h-20 bg-emerald-500/10 rounded-[2rem] flex items-center justify-center mx-auto mb-10 border border-emerald-500/20 shadow-2xl relative"
                        >
                            <ShieldCheck size={40} className="text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
                            <div className="absolute inset-0 rounded-[2rem] border border-emerald-500/20 animate-pulse" />
                        </motion.div>

                        <h2 className="text-4xl font-black tracking-tighter text-white uppercase mb-4">EdIntel <span className="text-emerald-500">Induction</span></h2>
                        <div className="flex items-center justify-center gap-6">
                            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-emerald-500/50" />
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em] whitespace-nowrap">
                                {plan === 'pro' ? 'Professional Provisioning' : 'Identity Protocol // v4.2'}
                            </p>
                            <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-emerald-500/50" />
                        </div>
                    </div>

                    <HolographicBriefing
                        isOpen={showBriefing}
                        onClose={() => setShowBriefing(false)}
                        title="Induction Sentinel"
                        description="Welcome to the EdIntel Collective. You are initiating a strategic node provisioning. This protocol will synchronize your professional identity across the EdIntel network."
                        role="Induction Overseer"
                        avatarImage="/images/avatars/instructional_tech.png"
                        stats={{ time: "PROCESS", saved: "FUTURE", accuracy: "100%" }}
                    />

                    <SignupForm />

                    <div className="relative my-12">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5" />
                        </div>
                        <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.4em]">
                            <span className="px-6 bg-[#121215] text-zinc-600 rounded-full border border-white/5 py-1">Induction Gateway</span>
                        </div>
                    </div>

                    <p className="text-center text-xs font-medium text-zinc-500">
                        Already established? <Link href="/login" className="text-emerald-500 hover:text-white font-black uppercase tracking-widest ml-1 transition-colors">Sign In</Link>
                    </p>
                </motion.div>
            </div>
        </main>
    );
}

// Removing previous block export
