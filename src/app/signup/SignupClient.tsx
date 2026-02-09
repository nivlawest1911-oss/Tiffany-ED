'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Lock, Mail, User as LucideUser, ArrowRight, ShieldCheck, Hexagon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import HolographicBriefing from '@/components/HolographicBriefing';

function SignupForm() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showBriefing, setShowBriefing] = useState(false);
    const _router = useRouter();
    const searchParams = useSearchParams();
    const plan = searchParams.get('plan') || 'free';
    const billing = searchParams.get('billing');
    const { signup, loginWithGoogle, loginWithFacebook } = useAuth();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setError('');

        try {
            const premiumPlans = ['pro'];
            if (premiumPlans.includes(plan)) {
                const response = await fetch('/api/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, name, plan, isAnnual: billing === 'annual' }),
                });

                const data = await response.json();
                if (data.url) {
                    window.location.href = data.url;
                    return;
                } else {
                    throw new Error(data.error || 'Checkout initiation failed');
                }
            } else {
                await signup(email, password, name);
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'An error occurred during protocol initialization.');
            setIsProcessing(false);
        }
    };

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
                        description="Welcome to the Sovereign Collective. You are initiating a strategic node provisioning. This protocol will synchronize your professional identity across the EdIntel network."
                        role="Induction Overseer"
                        avatarImage="/images/avatars/instructional_tech.png"
                        stats={{ time: "PROCESS", saved: "FUTURE", accuracy: "100%" }}
                    />

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="mb-12 p-6 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold text-center rounded-2xl uppercase tracking-widest leading-relaxed"
                        >
                            <span className="opacity-50 mr-2">[!]</span> {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSignup} className="space-y-8">
                        <div className="space-y-4">
                            <div className="relative group">
                                <LucideUser className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-400 transition-colors" size={20} />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="FULL LEGAL NAME"
                                    className="w-full pl-16 pr-8 py-5 bg-black/20 border border-white/5 rounded-2xl outline-none focus:border-emerald-500/40 focus:bg-black/40 transition-all font-bold text-xs tracking-widest placeholder:text-zinc-700 text-white"
                                    required
                                />
                            </div>

                            <div className="relative group">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-400 transition-colors" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="EXECUTIVE EMAIL"
                                    className="w-full pl-16 pr-8 py-5 bg-black/20 border border-white/5 rounded-2xl outline-none focus:border-emerald-500/40 focus:bg-black/40 transition-all font-bold text-xs tracking-widest placeholder:text-zinc-700 text-white"
                                    required
                                />
                            </div>

                            <div className="relative group">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-emerald-400 transition-colors" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="CREATE ACCESS KEY"
                                    className="w-full pl-16 pr-8 py-5 bg-black/20 border border-white/5 rounded-2xl outline-none focus:border-emerald-500/40 focus:bg-black/40 transition-all font-bold text-xs tracking-widest placeholder:text-zinc-700 text-white"
                                    required
                                />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isProcessing}
                            className="w-full relative group/btn flex items-center justify-center gap-4 py-6 bg-emerald-600 text-black font-black uppercase text-xs tracking-[0.4em] rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/40 disabled:opacity-50"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                {isProcessing ? 'Initializing...' : (plan === 'pro' ? 'Begin Strategic Provisioning' : 'Establish Protocol')}
                                <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform duration-500" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-400 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                        </motion.button>

                        <button
                            type="button"
                            onClick={() => setShowBriefing(true)}
                            className="w-full text-center text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-emerald-400 transition-colors"
                        >
                            View Strategic Orientation
                        </button>
                    </form>

                    <div className="relative my-12">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5" />
                        </div>
                        <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.4em]">
                            <span className="px-6 bg-[#121215] text-zinc-600 rounded-full border border-white/5 py-1">Induction Gateway</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-10">
                        <button
                            onClick={() => loginWithGoogle()}
                            className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 transition-all group"
                        >
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform text-white" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                            </svg>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white">Google</span>
                        </button>
                        <button
                            onClick={() => loginWithFacebook()}
                            className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/30 transition-all group"
                        >
                            <svg className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            <span className="text-[10px] font-black uppercase tracking-widest text-white">Facebook</span>
                        </button>
                    </div>

                    <p className="text-center text-xs font-medium text-zinc-500">
                        Already established? <Link href="/login" className="text-emerald-500 hover:text-white font-black uppercase tracking-widest ml-1 transition-colors">Sign In</Link>
                    </p>
                </motion.div>
            </div>
        </main>
    );
}

export default function SignupClient() {
    return (
        <Suspense fallback={<div className="h-screen bg-black flex items-center justify-center text-zinc-600 font-black uppercase tracking-[0.5em] animate-pulse">Initializing Neural Link...</div>}>
            <SignupForm />
        </Suspense>
    );
}
