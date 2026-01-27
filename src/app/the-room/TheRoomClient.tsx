'use client';

import { motion } from 'framer-motion';
import {
    Brain, HandCoins, Flame,
    ArrowRight, Globe, Cpu, Network
} from 'lucide-react';
import Link from 'next/link';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import CircadianFilter from '@/components/graphics/CircadianFilter';
import { THE_ROOM_HERO } from '@/lib/images';

const commandCenters = [
    {
        id: "wisdom-archive",
        title: "Wisdom Archive",
        subtitle: "Specialized AI Advisors",
        description: "Access deep-knowledge advisors focused on Philosophy, History, and Future Trends to support strategic decision-making.",
        icon: Brain,
        color: "from-indigo-900 to-purple-900",
        link: "/generators?category=wisdom",
        count: "5 Advisors"
    },
    {
        id: "leadership-forge",
        title: "The Leadership Forge",
        subtitle: "Strategy & Economic Growth",
        description: "Tools for district fiscal strategy, capital optimization, and operational excellence.",
        icon: HandCoins,
        color: "from-emerald-900 to-teal-900",
        link: "/generators?category=forge",
        count: "6 Frameworks"
    },
    {
        id: "healing-nexus",
        title: "Healing Nexus",
        subtitle: "Wellness & Identity",
        description: "Trauma-informed protocols and identity restoration nodes. Knowledge as a tool for collective healing.",
        icon: Flame,
        color: "from-red-900 to-orange-950",
        link: "/generators?category=healing",
        count: "4 Centers"
    },
    {
        id: "global-academy",
        title: "Global Academy",
        subtitle: "Visual Knowledge explains",
        description: "Original series and story-based curricula. Any topic becomes a high-fidelity video lesson.",
        icon: Globe,
        color: "from-blue-900 to-indigo-950",
        link: "/generators?category=global",
        count: "8 Channels"
    }
];

export default function TheRoomClient() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-indigo-500/30 overflow-x-hidden">
            <CircadianFilter />
            <FloatingNavbar />

            {/* Strategic Header */}
            <div className="relative pt-40 pb-24 px-6 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-full bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15),transparent_70%)] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mb-8"
                    >
                        <Network size={14} /> Executive Insight Interface
                    </motion.div>

                    <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-6 leading-[0.8] text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600">
                        The EdIntel<br />
                        <span className="text-indigo-500">Room.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl font-light leading-relaxed">
                        Thought becoming form. You are inside the next-generation learning network where strategic intelligence generates its own systems.
                    </p>
                </div>
            </div>

            {/* Divine Strategic Map */}
            <section className="py-24 px-6 relative">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    {commandCenters.map((node, i) => (
                        <motion.div
                            key={node.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative"
                        >
                            <Link href={node.link}>
                                <div className={`relative h-full p-10 rounded-[3rem] bg-zinc-900/40 border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden`}>
                                    <div className={`absolute inset-0 bg-gradient-to-br ${node.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                    <div className="flex justify-between items-start mb-12">
                                        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-white">
                                            <node.icon size={32} />
                                        </div>
                                        <div className="text-xs font-mono text-zinc-500 tracking-widest uppercase">
                                            {node.count}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-2">{node.subtitle}</h3>
                                        <h2 className="text-4xl font-black text-white mb-6 tracking-tight uppercase group-hover:text-indigo-300 transition-colors">
                                            {node.title}
                                        </h2>
                                        <p className="text-zinc-400 text-lg leading-relaxed group-hover:text-zinc-300 transition-colors">
                                            {node.description}
                                        </p>
                                    </div>

                                    <div className="mt-12 flex items-center gap-2 text-white font-bold uppercase text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                                        Initialize Protocol <ArrowRight size={14} />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Creation Engine Section */}
            <section className="py-32 px-6 border-y border-white/5 bg-zinc-950/50">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-black uppercase tracking-widest mb-8">
                            <Cpu size={14} /> Media Synthesis Studio
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-none">
                            Thought becoming <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-indigo-500">Form.</span>
                        </h2>
                        <p className="text-xl text-zinc-400 font-light leading-relaxed mb-10">
                            Our Synthesis Studio transforms abstract strategy into high-fidelity visual media. Every advisor and system is synthesized to ensure your district's vision and identity are amplified.
                        </p>
                        <div className="grid grid-cols-2 gap-8 mb-12">
                            <div>
                                <div className="text-3xl font-black text-white mb-1">∞</div>
                                <div className="text-xs text-zinc-500 uppercase tracking-widest font-black">Capacity</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black text-white mb-1">ZERO</div>
                                <div className="text-xs text-zinc-500 uppercase tracking-widest font-black">Stock Media</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 w-full aspect-square relative rounded-[3rem] overflow-hidden border border-white/5 group">
                        <img
                            src={THE_ROOM_HERO}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            alt="Strategic Creation"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        <div className="absolute bottom-10 left-10">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-full bg-emerald-500 animate-pulse" />
                                <div className="text-xs font-mono text-white tracking-widest uppercase">Engine Operational</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
