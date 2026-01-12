'use client';

import { motion } from 'framer-motion';
import { Shield, Brain, Zap, Target, Users, Key, Clock, Award, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';
import FloatingNavbar from '@/components/FloatingNavbar';
import CircadianFilter from '@/components/graphics/CircadianFilter';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-black transition-colors duration-500">
            <CircadianFilter />
            <FloatingNavbar />

            {/* 1. Hero: The Manifesto */}
            <div className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-widest mb-6 backdrop-blur-md"
                    >
                        <Shield size={12} /> The Sovereign Protocol
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-8"
                    >
                        We Do Not Just Build Software.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600">We Build Sovereignty.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        The modern educational system is designed to consume time, energy, and cognitive bandwidth.
                        EdIntel Sovereign exists to reclaim it—giving educators the power to lead with logic, precision, and absolute authority.
                    </motion.p>
                </div>

                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/20 blur-[130px] rounded-full pointer-events-none" />
            </div>

            {/* 2. The Architect: Dr. Alvin West */}
            <section className="py-24 bg-zinc-950/50 border-y border-white/5 relative">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl shadow-indigo-500/20 group">
                            <img
                                src="/images/dr_alvin_west.png"
                                alt="Dr. Alvin West - Founder & Chief Architect"
                                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                            <div className="absolute bottom-0 inset-x-0 p-8">
                                <h3 className="text-3xl font-black text-white mb-1">Dr. Alvin West, II</h3>
                                <p className="text-indigo-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                    Founder & Chief Architect
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-4">The Architect's Vision</h2>
                            <p className="text-zinc-400 leading-relaxed text-lg">
                                "I watched brilliant educators burn out not from teaching, but from administration.
                                The paperwork, the compliance, the endless data entry—it was a parasite on their passion.
                                <br /><br />
                                I founded EdIntel not to simply 'help' teachers, but to arm them. We built a cognitive layer
                                that intercepts the bureaucracy before it hits the human. This is about more than efficiency;
                                it's about survival and the restoration of the educator's rightful place as an intellectual leader."
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="text-indigo-400 font-black text-3xl mb-1">20+</div>
                                <div className="text-zinc-500 text-sm uppercase tracking-wider">Years in Education</div>
                            </div>
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="text-indigo-400 font-black text-3xl mb-1">PhD</div>
                                <div className="text-zinc-500 text-sm uppercase tracking-wider">Cognitive Systems</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-zinc-500 border-l-2 border-indigo-500 pl-4 italic">
                            Currently leading Transcend Academic, Business & Cognitive Solutions.
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. The Philosophy: Sovereign Pillars */}
            <section className="py-24 px-6 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-6">The 4 Pillars of Sovereignty</h2>
                        <p className="text-zinc-400 max-w-2xl mx-auto">
                            Our entire platform is engineered upon these non-negotiable principles.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: Brain,
                                title: "Cognitive Offload",
                                desc: "We automate low-level logic (forms, scheduling) so you can focus on high-level strategy."
                            },
                            {
                                icon: Shield,
                                title: "Legal Ironclad",
                                desc: "Every output is FERPA-compliant and audit-ready. We protect you from liability."
                            },
                            {
                                icon: Key,
                                title: "Data Ownership",
                                desc: "You are not a product. Your data belongs to you, encrypted and sovereign."
                            },
                            {
                                icon: Zap,
                                title: "Speed as a Weapon",
                                desc: "What took days now takes seconds. Speed is not just convenience; it is power."
                            }
                        ].map((pillar, i) => (
                            <div key={i} className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-indigo-500/40 transition-all hover:-translate-y-1">
                                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6">
                                    <pillar.icon size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Timeline / Mission Stats */}
            <section className="py-24 bg-gradient-to-b from-indigo-950/20 to-black border-y border-white/5">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-white mb-16">The Impact of Intelligence</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="relative group">
                            <div className="text-6xl font-black text-white/10 group-hover:text-white/20 transition-colors absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                47K
                            </div>
                            <div className="pt-8">
                                <div className="text-4xl font-black text-white mb-2">47,000+</div>
                                <div className="text-indigo-400 uppercase text-xs tracking-widest font-bold">Educators Empowered</div>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="text-6xl font-black text-white/10 group-hover:text-white/20 transition-colors absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                98%
                            </div>
                            <div className="pt-8">
                                <div className="text-4xl font-black text-white mb-2">98.5%</div>
                                <div className="text-indigo-400 uppercase text-xs tracking-widest font-bold">Reduction in Admin Time</div>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="text-6xl font-black text-white/10 group-hover:text-white/20 transition-colors absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                142
                            </div>
                            <div className="pt-8">
                                <div className="text-4xl font-black text-white mb-2">142</div>
                                <div className="text-indigo-400 uppercase text-xs tracking-widest font-bold">Districts Secured</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. CTA: Join the Movement */}
            <section className="py-32 px-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-indigo-900/10 pointer-events-none" />
                <div className="relative z-10 max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
                        Stop Managing. Start Leading.
                    </h2>
                    <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
                        The protocol is ready. The sovereign network is active. Your node is waiting to be initialized.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/signup">
                            <button className="px-10 py-4 bg-white text-black font-black uppercase text-sm tracking-widest rounded-xl hover:bg-zinc-200 transition-colors flex items-center gap-2">
                                Initialize Node
                                <ArrowRight size={16} />
                            </button>
                        </Link>
                        <Link href="/contact">
                            <button className="px-10 py-4 bg-black border border-zinc-800 text-white font-black uppercase text-sm tracking-widest rounded-xl hover:bg-zinc-900 transition-colors">
                                Contact Command
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
