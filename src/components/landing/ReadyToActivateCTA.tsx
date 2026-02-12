'use client';

import { motion } from 'framer-motion';
import { Shield, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

export default function ReadyToActivateCTA() {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.05)_0%,_transparent_70%)]" />

            <div className="container relative mx-auto px-4 z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-noble-gold/10 border border-noble-gold/30 mb-8 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                    >
                        <Shield className="w-10 h-10 text-noble-gold" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter"
                    >
                        READY TO ACTIVATE <br />
                        <span className="text-noble-gold">EDINTEL?</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light"
                    >
                        Join the vanguard of educational excellence. Experience the core power of the world's most advanced AI for schools.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col md:flex-row items-center justify-center gap-6"
                    >
                        <Link href="/auth/signup">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative px-10 py-4 bg-noble-gold text-black font-black uppercase tracking-widest rounded-full transition-all shadow-[0_0_40px_rgba(212,175,55,0.3)] hover:shadow-[0_0_60px_rgba(212,175,55,0.5)] flex items-center gap-3"
                            >
                                <Zap className="w-5 h-5 fill-current" />
                                Start Activation
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </motion.button>
                        </Link>

                        <Link href="/demo">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-4 border border-white/20 text-white font-bold uppercase tracking-widest rounded-full hover:bg-white/5 transition-all"
                            >
                                View System Demo
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Glowing Orbs */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-noble-gold/10 rounded-full blur-[100px] -z-10 animate-pulse" />
        </section>
    );
}
