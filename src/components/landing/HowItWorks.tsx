'use client';

import { motion } from 'framer-motion';
import { UserPlus, Power, BarChart3 } from 'lucide-react';

const STEPS = [
    {
        id: "01",
        title: "Create Account",
        desc: "Secure your district's dedicated EdIntel node.",
        icon: UserPlus,
        color: "blue"
    },
    {
        id: "02",
        title: "Activate AI Tools",
        desc: "Deploy autonomous agents for grant writing, IEPs, and more.",
        icon: Power,
        color: "purple"
    },
    {
        id: "03",
        title: "Track Progress",
        desc: "Monitor district-wide intelligence and efficiency in real-time.",
        icon: BarChart3,
        color: "emerald"
    }
];

export default function HowItWorks() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                        How <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#B8860B] bg-clip-text text-transparent">EdIntel</span> Works
                    </h2>
                    <p className="text-slate-400 max-w-xl mx-auto">
                        Three steps to total institutional autonomy and operational superiority.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 border-t border-dashed border-white/20 z-0" />

                    {STEPS.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="relative z-10 group"
                        >
                            <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:border-noble-gold/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] flex flex-col items-center text-center">
                                {/* Number Badge */}
                                <div className="absolute -top-4 bg-slate-950 border border-white/10 px-4 py-1 rounded-full text-xs font-bold text-slate-500 shadow-xl">
                                    STEP {step.id}
                                </div>

                                {/* Icon */}
                                <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-noble-gold/10 text-noble-gold group-hover:scale-110 transition-transform duration-300`}>
                                    <step.icon size={32} />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    {step.desc}
                                </p>

                                {/* Visual Mini-Representation */}
                                <div className="w-full h-24 bg-black/40 rounded-xl border border-white/5 overflow-hidden relative">
                                    {/* Abstract UI representation based on step */}
                                    <div className="absolute inset-0 bg-grid-white/[0.05]" />
                                    {i === 0 && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-10 bg-white/10 rounded-lg flex items-center gap-2 px-2">
                                                <div className="w-4 h-4 rounded-full bg-blue-500" />
                                                <div className="h-1.5 w-8 bg-white/20 rounded-full" />
                                            </div>
                                        </div>
                                    )}
                                    {i === 1 && (
                                        <div className="absolute inset-x-4 top-4 space-y-2">
                                            <div className="h-1.5 w-3/4 bg-purple-500/40 rounded-full animate-pulse" />
                                            <div className="h-1.5 w-1/2 bg-purple-500/20 rounded-full" />
                                        </div>
                                    )}
                                    {i === 2 && (
                                        <div className="absolute bottom-0 inset-x-4 flex items-end justify-between h-12 gap-1">
                                            {[20, 60, 40, 80, 50].map((h, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ height: 0 }}
                                                    whileInView={{ height: `${h}%` }}
                                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                                    className="w-full bg-emerald-500/30 rounded-t-sm"
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
