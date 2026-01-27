'use client';

import { motion } from 'framer-motion';
import { Award, Shield, Users, Zap, Globe } from 'lucide-react';
import { CARBON_FIBRE_BG } from '@/lib/constants';
import { PRINCIPAL_ACADEMY_HERO } from '@/lib/images';

const HIGHLIGHTS = [
    {
        icon: Shield,
        title: "Executive Compliance",
        desc: "Master the 14 vectors of district-wide legal fidelity and audit-resilience."
    },
    {
        icon: Zap,
        title: "Fiscal Optimization",
        desc: "Architect resource allocation strategies that recover 20% of instructional capital."
    },
    {
        icon: Users,
        title: "Culture Synthesis",
        desc: "Develop neural-leadership frameworks that eliminate staff burnout and peak morale."
    }
];

export default function PrincipalAcademy() {
    return (
        <section className="relative py-32 bg-black overflow-hidden font-sans">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.1),transparent_50%)]" />
            <div
                className="absolute inset-0 opacity-20"
                style={{ backgroundImage: CARBON_FIBRE_BG }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-8">
                            <Award size={12} />
                            <span>Sovereign Principal Academy</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-none tracking-tighter">
                            THE ELITE <br />
                            <span className="text-zinc-600 italic">COMMAND.</span>
                        </h2>
                        <p className="text-xl text-zinc-400 mb-12 font-light leading-relaxed">
                            Beyond management. This is the inner circle for leaders who architect districts from first principles. Access exclusive simulations, executive briefs, and a global network of sovereign administrators.
                        </p>

                        <div className="space-y-6">
                            {HIGHLIGHTS.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-6 p-6 rounded-3xl bg-zinc-900/40 border border-white/5 hover:border-amber-500/20 transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-black transition-all">
                                        <item.icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">{item.title}</h3>
                                        <p className="text-sm text-zinc-500 font-medium">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative h-[600px] rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl group"
                    >
                        <img
                            src={PRINCIPAL_ACADEMY_HERO}
                            alt="Academy Intelligence"
                            className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                        {/* Overlay Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-12">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 mb-6 w-fit">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Enrollment Invitation Only</span>
                            </div>
                            <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">
                                Architect Your <br /> Legion of Leaders.
                            </h3>
                            <button className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl hover:scale-105 transition-all shadow-xl shadow-white/5">
                                Request Private Access
                            </button>
                        </div>

                        {/* Floating elements */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-12 right-12 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                    <Globe size={18} />
                                </div>
                                <div>
                                    <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Global Rank</div>
                                    <div className="text-sm font-black text-white">#04 EXECUTIVE</div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
