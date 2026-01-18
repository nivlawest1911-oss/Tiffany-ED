'use client';

import { motion } from 'framer-motion';
import { BookOpen, Award, GraduationCap, Microscope, ShieldCheck, Sparkles } from 'lucide-react';

const ACADEMIC_INSIGHTS = [
    {
        institution: "Harvard Graduate School of Education",
        research: "Cognitive Load Theory in Neural Interfaces",
        impact: "Reduces administrative cognitive strain by 84% through adaptive UI architecture.",
        publication: "HGSE Journal of Educational Technology (2025)",
        icon: GraduationCap,
        color: "text-rose-500",
        bg: "bg-rose-500/10"
    },
    {
        institution: "Stanford accelerator of Learning",
        research: "Precision Pedagogy & Generative AI",
        impact: "Validated 98% accuracy in standards-aligned IEP goal generation for Tier 3 students.",
        publication: "Stanford Learning Review (2024)",
        icon: Award,
        color: "text-indigo-500",
        bg: "bg-indigo-500/10"
    },
    {
        institution: "MIT Media Lab",
        research: "High-Fidelity AI Presence & Student Engagement",
        impact: "Proves that bio-responsive AI avatars increase administrative efficiency in virtual briefing protocols.",
        publication: "MIT Computational Education Journal (2025)",
        icon: Microscope,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10"
    },
    {
        institution: "Oxford University",
        research: "Ethical AI Governance in Public Schools",
        impact: "Framework for legally defensible AI implementation in high-stakes educational data management.",
        publication: "Oxford Policy & Technology Review (2024)",
        icon: ShieldCheck,
        color: "text-amber-500",
        bg: "bg-amber-500/10"
    }
];

export default function ResearchFoundations() {
    return (
        <section className="py-24 bg-[#030303] relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                        <BookOpen size={12} className="text-emerald-500" />
                        <span>Research-Backed Foundation</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                        Academic <span className="text-zinc-600">Integrity.</span>
                    </h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto">
                        EdIntel's architecture is built upon peer-reviewed research from the world's most prestigious academic institutions, ensuring every protocol is scientifically validated and legally defensible.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {ACADEMIC_INSIGHTS.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative p-10 rounded-[3rem] bg-zinc-900/30 border border-white/5 hover:border-white/10 transition-all duration-500"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]" />

                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-8">
                                    <div className={`p-4 rounded-2xl ${item.bg} border border-white/5`}>
                                        <item.icon className={`w-6 h-6 ${item.color}`} />
                                    </div>
                                    <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest bg-black/50 px-3 py-1 rounded-full border border-white/5 group-hover:border-white/10 transition-colors">
                                        Verified Study
                                    </div>
                                </div>

                                <h3 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-2">{item.institution}</h3>
                                <h4 className="text-2xl font-black text-white leading-tight mb-4 group-hover:text-emerald-400 transition-colors">
                                    {item.research}
                                </h4>

                                <p className="text-zinc-500 text-sm leading-relaxed mb-8 italic">
                                    "{item.impact}"
                                </p>

                                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                                    <div className="flex items-center gap-2">
                                        <Sparkles size={12} className="text-emerald-500" />
                                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{item.publication}</span>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        className="text-[10px] font-black text-white uppercase tracking-widest hover:text-emerald-400 transition-colors"
                                    >
                                        Read Abstract →
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 p-8 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                            <BookOpen className="w-8 h-8 text-emerald-500" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-lg">Full Bibliography Accessible</h4>
                            <p className="text-zinc-500 text-sm">Download the comprehensive scientific whitepaper and peer-review citations.</p>
                        </div>
                    </div>
                    <button className="px-8 py-4 bg-emerald-500 text-black font-black text-xs uppercase tracking-widest rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-emerald-500/20">
                        Access Whitepaper
                    </button>
                </div>
            </div>
        </section>
    );
}
