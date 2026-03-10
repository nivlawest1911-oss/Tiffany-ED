'use client';

import { motion } from 'framer-motion';
import { Shield, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/lib/routes';

export default function ReadyToActivateCTA() {
    const { user } = useAuth();
    const isSignedIn = !!user;

    return (
        <section className="relative py-32 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[#020617]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(0,176,255,0.05)_0%,_transparent_70%)]" />

            <div className="container relative mx-auto px-4 z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-black/40 border border-electric-cyan/30 mb-8 shadow-[0_0_50px_rgba(0,176,255,0.15)] backdrop-blur-xl"
                    >
                        <Shield className="w-10 h-10 text-electric-cyan" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter leading-none italic"
                    >
                        ACTIVATE INSTITUTIONAL <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan to-blue-500">EXCELLENCE</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-500 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-black uppercase tracking-widest"
                    >
                        Scale specialized intelligence across your entire organization. Master the <span className="text-sovereign-gold">Sovereign Protocol</span> to drive measurable institutional ROI.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-6"
                    >
                        {isSignedIn ? (
                            <Link href="/the-room">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative px-12 py-5 bg-electric-cyan text-black font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_40px_rgba(0,176,255,0.3)] hover:shadow-[0_0_60px_rgba(0,176,255,0.5)] flex items-center gap-3"
                                >
                                    <Zap className="w-5 h-5 fill-current" />
                                    Return to Control
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </motion.button>
                            </Link>
                        ) : (
                            <Link href={`${String(ROUTES.LOGIN)}?mode=signup`}>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative px-12 py-5 bg-electric-cyan text-black font-black uppercase tracking-widest rounded-xl transition-all shadow-[0_0_40px_rgba(0,176,255,0.3)] hover:shadow-[0_0_60px_rgba(0,176,255,0.5)] flex items-center gap-3"
                                >
                                    <Zap className="w-5 h-5 fill-current" />
                                    Start Activation
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </motion.button>
                            </Link>
                        )}

                        <Link href="/demo">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-5 border border-white/10 text-white font-black uppercase tracking-widest rounded-xl hover:bg-white/5 backdrop-blur-md transition-all"
                            >
                                View System Demo
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Glowing Orbs */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-electric-cyan/10 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-sovereign-gold/10 rounded-full blur-[120px] -z-10 animate-pulse" />
        </section>
    );
}
