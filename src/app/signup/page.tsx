'use client';
import { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import { Lock, Mail, User as LucideUser, ArrowRight, ShieldCheck, Hexagon, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import HolographicBriefing from '@/components/HolographicBriefing';

function SignupForm() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [showBriefing, setShowBriefing] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const plan = searchParams.get('plan') || 'free';
    const billing = searchParams.get('billing');
    const { signup } = useAuth();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setError('');

        try {
            const premiumPlans = ['pro', 'practitioner', 'director', 'enterprise', 'site_command'];
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
                theme="professional"
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

            <p className="text-center text-xs font-medium text-zinc-500">
                Already established? <Link href="/login" className="text-emerald-500 hover:text-white font-black uppercase tracking-widest ml-1 transition-colors">Sign In</Link>
            </p>
        </motion.div>
    );
}

export default function SignupPage() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - window.innerWidth / 2);
            mouseY.set(e.clientY - window.innerHeight / 2);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4 relative overflow-hidden selection:bg-emerald-500/30">
            {/* 🌌 Induction Command Grid */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div
                    style={{ x: springX, y: springY }}
                    className="absolute inset-[-10%] opacity-20"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)]" />
                    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(16,185,129,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.1) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
                </motion.div>
            </div>

            <div className="w-full max-w-xl relative z-10">
                <Suspense fallback={<div className="text-white text-center font-black uppercase tracking-widest">Bridging Neural Layers...</div>}>
                    <SignupForm />
                </Suspense>
            </div>

            <div className="absolute top-12 left-12 opacity-20 pointer-events-none hidden lg:block">
                <Sparkles size={120} className="text-emerald-500 animate-pulse" />
            </div>
        </div>
    );
}
