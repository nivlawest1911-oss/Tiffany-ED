'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Activity,
    Shield,
    Zap,
    Brain,
    HeartPulse,
    Sparkles,
    Target,
    Camera,
    Eye
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import Link from 'next/link';
import EdIntelHeader from '@/components/sovereign/EdIntelHeader';

const roiData = [
    { month: 'Sep', administrative: 45, strategic: 25 },
    { month: 'Oct', administrative: 38, strategic: 35 },
    { month: 'Nov', administrative: 30, strategic: 45 },
    { month: 'Dec', administrative: 15, strategic: 65 },
    { month: 'Jan', administrative: 8, strategic: 82 },
];

const burnoutData = [
    { category: 'Paperwork', before: 85, after: 12 },
    { category: 'Compliance', before: 92, after: 15 },
    { category: 'Emails', before: 78, after: 22 },
    { category: 'Planning', before: 70, after: 18 },
];

const mentalHealthImpact = [
    { name: 'Counseling Hours', value: '420+', unit: 'Monthly Reclaimed' },
    { name: 'Teacher Retention', value: '24%', unit: 'Index Increase' },
    { name: 'Crisis Response', value: '3.4m', unit: 'Reduction Time' },
];

export default function PivotIntelligencePage() {
    return (
        <div className="min-h-screen bg-[#050507] text-white selection:bg-noble-gold/30">
            <EdIntelHeader />

            <main className="pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto space-y-24">
                {/* Hero section */}
                <section className="relative">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-noble-gold/10 rounded-full blur-[120px] animate-pulse" />

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-noble-gold/10 border border-noble-gold/20 rounded-lg">
                                <Target className="w-5 h-5 text-noble-gold" />
                            </div>
                            <span className="text-xs font-black uppercase tracking-[0.4em] text-noble-gold/60">Strategic Intelligence Briefing</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.9] mb-8">
                            The <span className="text-noble-gold">Pivot</span>: <br />
                            <span className="text-zinc-600">Executive ROI</span>
                        </h1>

                        <p className="max-w-2xl text-xl text-zinc-400 font-medium leading-relaxed">
                            Transforming instructional leadership from administrative friction to strategic acceleration.
                            EdIntel EdIntel redefines the ROI of educational personnel.
                        </p>
                    </motion.div>
                </section>

                {/* Metrics Grid */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {mentalHealthImpact.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-[2rem] hover:border-noble-gold/30 transition-all group"
                        >
                            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2 group-hover:text-noble-gold transition-colors">{item.name}</div>
                            <div className="text-4xl font-black text-white mb-1">{item.value}</div>
                            <div className="text-xs font-bold text-zinc-600 uppercase tracking-tighter">{item.unit}</div>
                        </motion.div>
                    ))}
                </section>

                {/* Primary Narrative: Mental Health Reallocation */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <h2 className="text-4xl font-black tracking-tight uppercase italic flex items-center gap-4">
                            <HeartPulse className="text-red-500" />
                            The Human <span className="text-noble-gold">Dividend</span>
                        </h2>
                        <div className="space-y-4 text-zinc-400 leading-relaxed">
                            <p>
                                Across traditional districts, specialized personnel—principals, counselors, and psychs—spend
                                <span className="text-white font-bold px-2 italic text-lg">68% of their capacity</span> on administrative compliance, IEP paperwork, and fiscal reporting.
                            </p>
                            <p className="bg-noble-gold/5 border-l-2 border-noble-gold p-6 rounded-r-2xl italic text-white/90">
                                "EdIntel Pivot doesn't just automate tasks; it reallocates human hours. We are moving
                                counselors back into the hallways and psychologists back into interventions. We are
                                reclaiming the heart of education."
                            </p>
                            <p>
                                By deploying EdIntel Dr. West’s executive automation, districts are seeing a recursive cycle of
                                <span className="text-emerald-400 font-bold ml-1">Mental Health Reallocation</span>. High-fidelity AI
                                handles the friction, letting your highest-paid experts focus on your highest-need students.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-zinc-900/60 border border-zinc-800 rounded-[3rem] p-10 h-[450px] relative overflow-hidden group shadow-2xl"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Sparkles size={120} />
                        </div>
                        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-500 mb-8">Capacity Reallocation Matrix</h3>
                        <ResponsiveContainer width="100%" height="80%">
                            <AreaChart data={roiData}>
                                <defs>
                                    <linearGradient id="colorAdmin" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorStrat" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="month" stroke="#374151" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff', fontSize: '10px', textTransform: 'uppercase' }}
                                />
                                <Area type="monotone" dataKey="administrative" stroke="#ef4444" fillOpacity={1} fill="url(#colorAdmin)" strokeWidth={3} />
                                <Area type="monotone" dataKey="strategic" stroke="#D4AF37" fillOpacity={1} fill="url(#colorStrat)" strokeWidth={3} />
                            </AreaChart>
                        </ResponsiveContainer>
                        <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500" />
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Admin Friction</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-noble-gold" />
                                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Strategic Impact</span>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* New Section: Visual Intelligence */}
                <section className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-zinc-900/60 border border-zinc-800 rounded-[3rem] p-10 h-[450px] relative overflow-hidden group shadow-2xl order-2 md:order-1"
                    >
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                            <Camera size={200} className="text-noble-gold" />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div className="w-16 h-16 rounded-2xl bg-noble-gold/10 border border-noble-gold/30 flex items-center justify-center text-noble-gold mb-8">
                                <Camera size={32} />
                            </div>
                            <h3 className="text-2xl font-black uppercase italic tracking-wider">Visual Intelligence <br /><span className="text-noble-gold">Core</span></h3>
                            <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-[10px] text-emerald-400">
                                [SCANNING DISTRICT_REPORT_2025.PDF] <br />
                                [EXTRACTING_IEP_LEVELS] ... 100% <br />
                                [MAPPING_BEHAVIORAL_VECTORS] ... 100%
                            </div>
                            <p className="text-xs text-zinc-500 uppercase tracking-widest font-black">Autonomous Document Synthesis Active</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6 order-1 md:order-2"
                    >
                        <h2 className="text-4xl font-black tracking-tight uppercase italic flex items-center gap-4">
                            <Eye className="text-noble-gold" />
                            Optical <span className="text-noble-gold">Synthesis</span>
                        </h2>
                        <div className="space-y-4 text-zinc-400 leading-relaxed">
                            <p>
                                The Pivot's camera icon represents our <strong>Optical Synthesis Engine</strong>. It isn't just about recording; it's about <span className="text-white font-bold">seeing the unseen patterns</span> in physical and digital documentation.
                            </p>
                            <p>
                                By scanning paper-based IEPs, psychological reports, and district memos, EdIntel converts analog friction into digital intelligence. This visual-to-narrative pipeline reduces document processing time by <span className="text-noble-gold font-bold">88%</span>.
                            </p>
                            <div className="flex items-center gap-4 pt-4">
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black text-white">0.4s</span>
                                    <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Processing Latency</span>
                                </div>
                                <div className="h-10 w-px bg-zinc-800" />
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black text-white">High</span>
                                    <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">OCR Fidelity</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Burnout Mitigation Section */}
                <section className="bg-zinc-900/30 border border-zinc-800/50 rounded-[4rem] p-12 overflow-hidden relative">
                    <div className="max-w-3xl">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase italic mb-6">
                            Burnout <span className="text-zinc-600">Redefined</span>
                        </h2>
                        <p className="text-zinc-400 text-lg mb-12">
                            Teacher and administrative burnout is not a personal failure; it's a data-logistics failure.
                            We solve the logistics to save the person.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {burnoutData.map((item, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="text-xs font-black uppercase text-zinc-500 tracking-wider font-mono">{item.category}</div>
                                    <div className="h-48 w-full bg-zinc-800/30 rounded-2xl flex flex-col justify-end p-4 gap-2 border border-white/5 relative group overflow-hidden">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${item.before}%` }}
                                            className="w-full bg-red-500/20 rounded-lg absolute bottom-4 left-4 right-4 transition-all duration-1000 group-hover:opacity-30 opacity-10"
                                        />
                                        <motion.div
                                            initial={{ height: 0 }}
                                            whileInView={{ height: `${item.after}%` }}
                                            className="w-full bg-noble-gold/60 rounded-lg relative z-10 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                                        />
                                        <div className="flex justify-between items-center text-[10px] font-black text-white relative z-20">
                                            <span>Current: {item.after}%</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action: The Upgrade */}
                <section className="relative py-20">
                    <div className="absolute inset-0 bg-gradient-to-r from-noble-gold/20 via-transparent to-noble-gold/20 blur-[150px] opacity-30" />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative bg-zinc-900/80 backdrop-blur-2xl border border-noble-gold/50 rounded-[4rem] p-12 md:p-20 text-center flex flex-col items-center shadow-2xl"
                    >
                        <Zap className="w-16 h-16 text-noble-gold mb-8 animate-pulse" />
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none mb-6">
                            Ready for <span className="text-noble-gold">Full Sync</span>?
                        </h2>
                        <p className="max-w-2xl text-xl text-zinc-400 mb-12">
                            The Pivot is only the baseline. Upgrade Dr. West or EdIntel Pro to unlock the
                            full strategic potential of the EdIntel Multi-Agent Network.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6">
                            <Link href="/pricing" className="px-12 py-5 bg-noble-gold text-black rounded-full font-black uppercase tracking-widest text-lg hover:bg-white hover:scale-105 transition-all shadow-xl shadow-noble-gold/20">
                                Upgrade Dr. West
                            </Link>
                            <Link href="/EdIntel" className="px-12 py-5 bg-white/5 border border-white/10 text-white rounded-full font-black uppercase tracking-widest text-lg hover:bg-white/10 hover:scale-105 transition-all">
                                EdIntel Pro Access
                            </Link>
                        </div>

                        <div className="mt-12 flex items-center gap-8 opacity-40">
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">FERPA Secured</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Brain className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Neural Encryption</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Activity className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">100% Verified</span>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </main>

            <footer className="py-20 border-t border-white/5 text-center">
                <p className="text-zinc-600 text-xs font-mono uppercase tracking-[0.5em]">EdIntel Enterprise OS // Architecture v4.2.0-EdIntel</p>
            </footer>

            <style jsx global>{`
                .text-gold-gradient {
                    background: linear-gradient(135deg, #FFF 0%, #D4AF37 50%, #8A6D3B 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>
        </div >
    );
}
