'use client';

/**
 * EdIntel EdIntel - Payment Success Page Client
 * Celebrates successful payment with high-fidelity protocol visuals
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function PaymentSuccessClient() {
    const [confetti, setConfetti] = useState(false);

    useEffect(() => {
        // Start confetti on mount (client-side only)
        setConfetti(true);
        // Stop confetti after 5 seconds
        const timer = setTimeout(() => setConfetti(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-white-smoke flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Illuminated Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-electric-cyan/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-sovereign-gold/5 rounded-full blur-[120px]" />
            </div>

            {/* Confetti Effect */}
            {confetti && (
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
                    {[...Array(50)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ y: -100, x: Math.random() * 100 + '%', opacity: 1 }}
                            animate={{
                                y: '110vh',
                                rotate: Math.random() * 360,
                                opacity: 0,
                            }}
                            transition={{
                                duration: Math.random() * 2 + 3,
                                ease: 'linear',
                            }}
                            className="absolute w-2 h-2 rounded-sm"
                            style={{
                                backgroundColor: ['#00B0FF', '#FFB300', '#0F172A', '#64748B', '#CBD5E1'][Math.floor(Math.random() * 5)],
                            }}
                        />
                    ))}
                </div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-2xl w-full relative z-10"
            >
                {/* Success Icon */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                    className="flex justify-center mb-10"
                >
                    <div className="relative group">
                        <div className="absolute inset-0 bg-electric-cyan/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500" />
                        <div className="w-24 h-24 bg-white rounded-3xl shadow-xl border border-slate-100 flex items-center justify-center relative z-10">
                            <CheckCircle className="w-12 h-12 text-electric-cyan" />
                        </div>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -top-4 -right-4"
                        >
                            <Sparkles className="w-8 h-8 text-sovereign-gold fill-sovereign-gold" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Success Message */}
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl font-black mb-4 text-slate-900 tracking-tight"
                    >
                        Success. <span className="text-electric-cyan italic">Activated.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xs font-black text-sovereign-gold uppercase tracking-[0.3em] mb-4"
                    >
                        Sovereign Access Confirmed
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed"
                    >
                        Your neural protocols have been updated. The high-luminance command center is now fully operational for your account.
                    </motion.p>
                </div>

                {/* Onboarding Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="glass-bento p-8 mb-10"
                >
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                        <div className="w-1 h-4 bg-sovereign-gold rounded-full" />
                        Deployment Protocol
                    </h3>

                    <div className="space-y-4">
                        {[
                            {
                                title: "Command Center",
                                desc: "Access the Bento Dashboard and Alabama Literacy Module.",
                                href: "/dashboard",
                                color: "electric-cyan"
                            },
                            {
                                title: "Strategic Polymath",
                                desc: "Switch to Executive Persona in the Neural Link chat.",
                                href: "/dashboard",
                                color: "sovereign-gold"
                            },
                            {
                                title: "Synthesis History",
                                desc: "Review your cross-modal audit logs and IRP generations.",
                                href: "/vault",
                                color: "slate-900"
                            }
                        ].map((step, idx) => (
                            <Link
                                key={idx}
                                href={step.href}
                                className="flex items-center justify-between p-4 bg-white/50 border border-slate-100 rounded-2xl hover:border-electric-cyan/30 hover:shadow-lg transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "w-2 h-2 rounded-full",
                                        step.color === 'electric-cyan' ? 'bg-electric-cyan shadow-[0_0_8px_rgba(0,176,255,0.5)]' :
                                            step.color === 'sovereign-gold' ? 'bg-sovereign-gold shadow-[0_0_8px_rgba(255,179,0,0.5)]' : 'bg-slate-900'
                                    )} />
                                    <div className="text-left">
                                        <h4 className="font-bold text-slate-900 text-sm tracking-tight">{step.title}</h4>
                                        <p className="text-[10px] text-slate-500 uppercase font-medium">{step.desc}</p>
                                    </div>
                                </div>
                                <ArrowRight size={16} className="text-slate-300 group-hover:text-electric-cyan group-hover:translate-x-1 transition-all" />
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* Final CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center"
                >
                    <Link
                        href="/dashboard"
                        className="btn-sovereign inline-flex items-center gap-3 px-10 py-5 group"
                    >
                        Explore Command Center
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
