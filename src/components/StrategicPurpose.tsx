'use client';

import { motion } from 'framer-motion';
import { Heart, Users, Scale, Sprout, GraduationCap, MapPin, ArrowRight, Globe, Activity } from "lucide-react";

export default function StrategicPurpose() {
    const pillars = [
        {
            icon: Heart,
            title: "Community Support Program",
            desc: "We reinvest 15% of every dollar back into Alabama rural school technology grants. By subscribing, you aren't just buying software; you're funding the next generation of academic excellence.",
            color: "text-rose-500",
            bg: "bg-rose-500/10"
        },
        {
            icon: Users,
            title: "Empowering Educators",
            desc: "Designed to reduce teacher burnout and administrative overhead, returning focus to students and instruction.",
            color: "text-indigo-500",
            bg: "bg-indigo-500/10"
        },
        {
            icon: Scale,
            title: "Ensuring Compliance",
            desc: "Tailored specifically for Alabama state benchmarks and IDEA Part B professional standards.",
            color: "text-amber-500",
            bg: "bg-amber-500/10"
        },
        {
            icon: Globe,
            title: "National Strategic Growth",
            desc: "Standardizing excellence across 48+ US states, bringing Alabama's educational innovation to the national stage.",
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
        }
    ];

    return (
        <section className="relative py-32 overflow-hidden bg-black">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
                <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    {/* Left Side: The Message */}
                    <div className="space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs font-bold uppercase tracking-[0.3em]">
                                <MapPin size={12} className="text-rose-500" />
                                <span>Alabama First Initiative</span>
                            </div>
                            <h2 className="text-5xl md:text-8xl font-bold text-white leading-none tracking-tighter mb-8">
                                Building <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
                                    Alabama's Future.
                                </span>
                            </h2>
                            <p className="text-xl text-zinc-400 leading-relaxed font-light max-w-xl">
                                Born from a deep commitment to excellence, EdIntel is our response to the challenges facing Alabama Schools. We are solving critical problems for our educators:
                            </p>

                            <div className="space-y-4 py-8">
                                {[
                                    { role: "For Administrators", problem: "Identifying $38M+ in potential savings through AI-driven budget analysis and resource optimization." },
                                    { role: "For Teachers", problem: "Saving 120+ hours of time-consuming paperwork monthly, allowing for more 1-on-1 student focus." },
                                    { role: "For Districts", problem: "Bridging the achievement gap with Science of Reading & professional compliance automation." }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 text-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_#d97706]" />
                                        <span className="text-zinc-300 font-bold w-32 shrink-0">{item.role}:</span>
                                        <span className="text-zinc-500">{item.problem}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {pillars.map((pillar, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex gap-6 group"
                                >
                                    <div className={`p-4 rounded-2xl ${pillar.bg} border border-white/5 group-hover:border-white/10 transition-all flex-shrink-0 h-fit`}>
                                        <pillar.icon className={`w-6 h-6 ${pillar.color}`} />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-lg font-bold text-white transition-colors group-hover:text-amber-400">
                                            {pillar.title}
                                        </h4>
                                        <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
                                            {pillar.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-4 px-8 py-5 rounded-full bg-white text-black font-black uppercase tracking-widest text-sm shadow-2xl shadow-white/5 hover:shadow-white/10 transition-all"
                        >
                            <span>Get Started Today</span>
                            <ArrowRight size={18} />
                        </motion.button>

                        {/* Executive Signature */}
                        <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between opacity-80">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-full p-0.5 bg-gradient-to-br from-amber-500 to-amber-700">
                                        <img src="/images/avatars/executive_leader.png" alt="Dr. Alvin West" className="w-full h-full rounded-full object-cover border-2 border-zinc-950" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-zinc-950 rounded-full animate-pulse" />
                                </div>
                                <div>
                                    <div className="text-white font-serif italic text-lg leading-none mb-1">Dr. Alvin West</div>
                                    <div className="text-zinc-500 text-[9px] font-black uppercase tracking-widest">Executive Sovereign</div>
                                </div>
                            </div>
                            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10">
                                <Activity size={12} className="text-emerald-500" />
                                <span className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest">Mission Active</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: The Visual Impact */}
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl bg-zinc-900/50 backdrop-blur-3xl p-2"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent" />
                            <div className="relative rounded-[2.8rem] overflow-hidden aspect-[4/5]">
                                <img
                                    src="/images/strategic_vision_classroom.png"
                                    alt="Educational Innovation"
                                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                                {/* Overlay Stats */}
                                <div className="absolute bottom-12 left-12 right-12 grid grid-cols-2 gap-8 text-white">
                                    <div className="space-y-1">
                                        <div className="text-4xl font-black tracking-tighter">$38M+</div>
                                        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Resources Optimized</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-4xl font-black tracking-tighter">127H</div>
                                        <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Avg. Time Saved/Mo</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Floating Decorative Elements */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-12 -right-12 p-6 rounded-3xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl shadow-2xl z-20"
                        >
                            <Sprout className="w-12 h-12 text-rose-500 mb-4" />
                            <div className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mb-1">Growth Initiative</div>
                            <div className="text-lg font-black text-white">Community Reinvestment</div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-12 -left-12 p-6 rounded-3xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl shadow-2xl z-20"
                        >
                            <GraduationCap className="w-12 h-12 text-indigo-400 mb-4" />
                            <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Success Metric</div>
                            <div className="text-lg font-black text-white">Compliance Rate: 98%</div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
