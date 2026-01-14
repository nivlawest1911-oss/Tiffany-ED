'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Lock, Mail, User, ArrowRight, ShieldCheck, Chrome, CreditCard } from 'lucide-react';

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

    // ... inside component
    const { signup } = useAuth();

    // ...

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        setError('');

        try {
            if (plan === 'pro' || plan === 'site_command') {
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
                // Use Auth Context for Free user creation
                await signup('/api/auth/signup', { email, name, password });
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'An error occurred. Please try again.');
            setIsProcessing(false);
        }
    };

    const handleGoogleSignup = async () => {
        setIsProcessing(true);
        // Simulation
        setTimeout(() => {
            router.push('/');
        }, 800);
    };

    return (
        <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-[2.5rem] p-10 shadow-2xl relative z-10 border border-zinc-200 dark:border-zinc-800">
            <div className="text-center mb-10">
                <div className="w-16 h-16 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform -rotate-3">
                    <ShieldCheck size={32} className="text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-3xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase mb-2">EdIntel Portal</h2>
                <div className="flex items-center justify-center gap-4">
                    <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">
                        {plan === 'pro' ? 'Professional Access' : 'Create Executive Account'}
                    </p>
                    <button
                        onClick={() => setShowBriefing(true)}
                        className="rounded-full bg-emerald-500/10 p-1.5 text-emerald-500 hover:bg-emerald-500/20 transition-colors"
                        title="Induction Protocol"
                    >
                        <ShieldCheck size={14} className="animate-pulse" />
                    </button>
                </div>
            </div>

            <HolographicBriefing
                isOpen={showBriefing}
                onClose={() => setShowBriefing(false)}
                title="Induction Protocol"
                description="Welcome, Initiate. You are about to enter the Sovereign Network. Ensure your credentials are secure. This protocol is designed to amplify your executive capacity by 10x. Proceed with registration."
                role="Sovereign Recruiter"
                avatarImage="/images/avatars/instructional_tech.png"
                thumbnail="/images/features/iep-architect-demo.mp4"
                stats={{ time: "NOW", saved: "FUTURE", accuracy: "100%" }}
                theme="sovereign"
            />

            {error && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-bold text-center rounded-xl uppercase tracking-wider"
                >
                    {error}
                </motion.div>
            )}

            <form onSubmit={handleSignup} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400 hidden">Full Name</label>
                    <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="FULL LEGAL NAME"
                            className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-sm placeholder:text-zinc-400 dark:text-white"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400 hidden">Executive Email</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="EXECUTIVE EMAIL"
                            className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-sm placeholder:text-zinc-400 dark:text-white"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-zinc-400 hidden">Access Key</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="CREATE ACCESS KEY"
                            className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium text-sm placeholder:text-zinc-400 dark:text-white"
                            required
                        />
                    </div>
                </div>

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl font-black text-sm uppercase tracking-[0.2em] shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {isProcessing ? 'Processing...' : (plan === 'pro' ? 'Proceed to Payment' : 'Initialize Protocol')}
                    {plan === 'pro' ? <CreditCard size={16} /> : <ArrowRight size={16} />}
                </motion.button>
            </form>

            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
                </div>
                <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                    <span className="px-4 bg-white dark:bg-zinc-900 text-zinc-500">Secondary Gateway</span>
                </div>
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGoogleSignup}
                disabled={isProcessing}
                className="w-full py-4 bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-zinc-200 dark:hover:bg-zinc-900 transition-all disabled:opacity-50"
            >
                <Chrome size={18} className="text-emerald-500" />
                Initialize via Google
            </motion.button>

            <p className="text-center mt-10 text-xs font-medium text-zinc-400">
                Already initialized? <Link href="/login" className="text-emerald-500 hover:text-emerald-400 font-bold uppercase tracking-wide ml-1 transition-colors">Sign In</Link>
            </p>
        </div>
    );
}

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-black p-4 relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "backOut" }}
                className="w-full max-w-md relative z-10"
            >
                <Suspense fallback={<div className="text-white text-center">Loading portal...</div>}>
                    <SignupForm />
                </Suspense>
            </motion.div>
        </div>
    );
}
