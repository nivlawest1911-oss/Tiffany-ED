'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Shield, User, Mail, School, Check, ArrowRight, Loader2 } from 'lucide-react';
import { createEdIntelUser } from '@/actions/signup';

export default function SignupForm() {
    const [statusMessage, setStatusMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    async function onSubmit(formData: FormData) {
        setIsLoading(true);
        setStatusMessage('');

        try {
            const response = await createEdIntelUser(formData);

            if (response.success) {
                setIsSuccess(true);
                setStatusMessage(response.message);

                // Auto-redirect to Stripe after successful enrollment
                if (response.stripeUrl) {
                    setTimeout(() => {
                        window.location.href = response.stripeUrl;
                    }, 2000); // 2s delay to show success message
                }
            }
        } catch (error: any) {
            setStatusMessage(error.message || "An error occurred during signup.");
        } finally {
            setIsLoading(false);
        }
    }

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="liquid-glass border-emerald-500/30 p-12 text-center"
            >
                <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <Check className="text-emerald-500" size={40} />
                </div>
                <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic mb-4">Uplink Established.</h2>
                <p className="text-zinc-400 font-medium mb-8 italic">{statusMessage}</p>
                <div className="flex justify-center items-center flex-col gap-2">
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Bridging to Secure Checkout...</p>
                    <div className="h-1 w-32 bg-noble-gold/20 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: "100%" }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                            className="h-full w-full bg-noble-gold shadow-[0_0_10px_#D4AF37]"
                        />
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="relative">
            {/* Noble Accent Lines */}
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-noble-gold opacity-10 blur-[80px]" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-noble-gold opacity-10 blur-[80px]" />

            <div className="relative liquid-glass border-white/5 p-8 md:p-12 overflow-hidden">
                {/* Kente Pattern Overlay Subtle */}
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('/images/kente-pattern.png')] bg-repeat opacity-5" />

                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 rounded-xl bg-noble-gold/10 border border-noble-gold/20">
                            <Shield className="text-noble-gold" size={20} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Sovereign Enrollment.</h2>
                            <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em]">Initialize Executive License</p>
                        </div>
                    </div>

                    <form action={onSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">
                                    <User size={12} className="text-noble-gold" />
                                    Executive Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full bg-white/[0.03] border border-white/5 rounded-xl p-4 text-white focus:outline-none focus:border-noble-gold/50 transition-all font-medium placeholder:text-zinc-700"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            {/* Email Address */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">
                                    <Mail size={12} className="text-noble-gold" />
                                    Secure Endpoint
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full bg-white/[0.03] border border-white/5 rounded-xl p-4 text-white focus:outline-none focus:border-noble-gold/50 transition-all font-medium placeholder:text-zinc-700"
                                    placeholder="work@institutional.edu"
                                />
                            </div>
                        </div>

                        {/* School Site / Location */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">
                                <School size={12} className="text-noble-gold" />
                                Institutional Node
                            </label>
                            <input
                                type="text"
                                name="schoolSite"
                                required
                                className="w-full bg-white/[0.03] border border-white/5 rounded-xl p-4 text-white focus:outline-none focus:border-noble-gold/50 transition-all font-medium placeholder:text-zinc-700"
                                placeholder="e.g., Murphy High School, District"
                            />
                        </div>

                        {/* Pricing Tier Selection */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">
                                <Zap size={12} className="text-noble-gold" />
                                Intelligence Tier
                            </label>
                            <select
                                name="tierName"
                                required
                                title="Intelligence Tier Selection"
                                className="w-full bg-white/[0.03] border border-white/5 rounded-xl p-4 text-white focus:outline-none focus:border-noble-gold/50 transition-all font-medium appearance-none cursor-pointer"
                            >
                                <option value="" disabled selected className="bg-black">Select Access Level...</option>
                                <option value="Site Command" className="bg-black">Site Command ($79.99/mo)</option>
                                <option value="Director Pack" className="bg-black">Director Pack ($69.99/mo)</option>
                                <option value="Practitioner" className="bg-black">Practitioner ($49.99/mo)</option>
                                <option value="Sovereign Pack" className="bg-black">Sovereign Pack ($39.99/mo)</option>
                                <option value="Standard Pack" className="bg-black">Standard Pack ($9.99/mo)</option>
                                <option value="Sovereign Initiate" className="bg-black">Sovereign Initiate ($0.00/mo)</option>
                            </select>
                        </div>

                        <div className="pt-4">
                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-noble-gold text-black py-5 rounded-xl font-black uppercase text-[10px] tracking-[0.3em] transition-all relative overflow-hidden group disabled:opacity-50"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="animate-spin" size={16} />
                                            Establishing Neural Link...
                                        </>
                                    ) : (
                                        <>
                                            Authorize 30-Day Protocol
                                            <ArrowRight size={14} />
                                        </>
                                    )}
                                </span>
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
                            </motion.button>
                            <p className="text-center text-[9px] text-zinc-600 font-black uppercase tracking-[0.3em] mt-6 italic">
                                All tiers include the 30-day "Sovereign Hands" Pilot Phase.
                            </p>
                        </div>

                        {/* Status Messaging */}
                        <AnimatePresence>
                            {statusMessage && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className={`p-5 rounded-xl text-[11px] font-bold uppercase tracking-wider text-center flex items-center justify-center gap-3 border ${statusMessage.includes('Welcome')
                                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                        : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                                        }`}
                                >
                                    {statusMessage}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </div>
            </div>
        </div>
    );
}
