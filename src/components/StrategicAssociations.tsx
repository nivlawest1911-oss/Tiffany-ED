'use client';

import { motion } from 'framer-motion';
import { Shield as LucideShield, Users, Landmark, Globe, Briefcase, Award, ArrowRight } from 'lucide-react';

export default function StrategicAssociations() {
    const associations = [
        {
            name: "Alabama Education Association",
            acronym: "AEA",
            role: "State Advocacy & Protection",
            desc: "The premier organization for Alabama's public education employees. Providing unified advocacy, comprehensive legal defense, and elite professional development for over 90,000 members.",
            icon: Landmark,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            features: ["Legal Defense Protocols", "Legislative Advocacy", "Professional Liability Insurance"]
        },
        {
            name: "Mobile County AEA",
            acronym: "MCAEA",
            role: "Regional Strategic Affiliate",
            desc: "A powerful local force specifically architected for Mobile County educators. Focused on hyper-local district issues, grassroots organizing, and direct member support for MCPSS staff.",
            icon: Briefcase,
            color: "text-indigo-500",
            bg: "bg-indigo-500/10",
            features: ["Local District Liaison", "Community Action", "Direct Representation"]
        },
        {
            name: "National Education Association",
            acronym: "NEA",
            role: "Federal Policy & Resource Center",
            desc: "The largest professional organization in the U.S., representing 3 million educators. Driving national policy, providing global resources, and defending the fundamental right to public education.",
            icon: Globe,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            features: ["National Standards", "Federal Advocacy", "Global Resource Library"]
        }
    ];

    return (
        <section className="py-24 bg-zinc-950/50 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

            <div className="max-w-7xl mx-auto px-6">
                <div className="mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                        <LucideShield size={12} />
                        <span>Professional Solidarity Network</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                        Unified in <span className="text-zinc-600">Excellence.</span>
                    </h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto">
                        Our artificial intelligence works in tandem with Alabama's leading professional associations to ensure every educator is protected, heard, and empowered.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {associations.map((assoc, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative p-8 rounded-[2rem] bg-zinc-900/50 border border-white/5 hover:border-amber-500/20 transition-all duration-500"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem]" />

                            <div className="relative z-10">
                                <div className={`w-14 h-14 rounded-2xl ${assoc.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <assoc.icon className={`w-8 h-8 ${assoc.color}`} />
                                </div>

                                <div className="mb-4">
                                    <h3 className="text-2xl font-black text-white leading-tight mb-1">{assoc.name}</h3>
                                    <div className={`text-[10px] font-bold ${assoc.color} uppercase tracking-widest`}>{assoc.role} ({assoc.acronym})</div>
                                </div>

                                <p className="text-zinc-400 text-sm leading-relaxed mb-8">
                                    {assoc.desc}
                                </p>

                                <div className="space-y-3">
                                    {assoc.features.map((feature, fIdx) => (
                                        <div key={fIdx} className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                            <Award size={10} className={assoc.color} />
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <motion.button
                                    whileHover={{ x: 5 }}
                                    className="mt-8 flex items-center gap-2 text-[10px] font-bold text-white uppercase tracking-[0.2em] group/btn"
                                >
                                    <span>Connect with {assoc.acronym}</span>
                                    <ArrowRight size={14} className={`group-hover/btn:translate-x-1 transition-transform ${assoc.color}`} />
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer Disclaimer/Context */}
                <div className="mt-16 text-center">
                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest">
                        EdIntel is an independent AI platform optimizing workflow efficiency. We support and align with association goals to protect teacher time and rights.
                    </p>
                </div>
            </div>
        </section>
    );
}
