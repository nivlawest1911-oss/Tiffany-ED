'use client';

import { Map, Plane, Compass, Camera, Calendar, Globe, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/Cinematic';
import { SmartHover } from '@/components/ui/SmartHover';

const UPCOMING_EXCURSIONS = [
    { title: "Museum of Sovereign Art", date: "Nov 12, 2025", type: "Physical", capacity: "30/30", status: "Full" },
    { title: "Virtual Silicon Valley Tour", date: "Nov 15, 2025", type: "VR", capacity: "Unlimited", status: "Open" },
    { title: "Legislative Session Observation", date: "Dec 02, 2025", type: "Physical", capacity: "12/15", status: "Filling" },
    { title: "Deep Sea Ecology Exploration", date: "Dec 10, 2025", type: "AR", capacity: "Unlimited", status: "Open" },
];

export default function ExcursionsPage() {
    return (
        <div className="relative min-h-screen p-8 lg:p-12 overflow-hidden flex flex-col">
            {/* Background Narrative */}
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <span className="text-[12rem] font-black uppercase tracking-tighter leading-none select-none">
                    Explore
                </span>
            </div>

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mb-12 relative z-10"
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
                        <Map className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-teal-400">
                        Transcend Excursions
                    </span>
                </div>

                <SmartHover message="Excursion Protocol: Expand the sovereign learning horizon through strategic physical adventures and immersive virtual explorations.">
                    <h1 className="text-6xl lg:text-8xl font-black text-white leading-tight mb-8 tracking-tighter">
                        Limitless <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400">Horizons</span>.
                    </h1>
                </SmartHover>

                <p className="text-xl text-slate-400 leading-relaxed max-w-2xl font-medium mb-10">
                    The world is your laboratory. Transcend Excursions blends strategic field trip planning with cutting-edge virtual exploration to bring the universe to the sovereign learner.
                </p>
            </motion.div>

            {/* Tactical Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
                {/* Trip Planner & Schedule */}
                <GlassCard className="lg:col-span-2 p-8 border-teal-500/10">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-widest text-white mb-1">Strategic Trip Planner</h3>
                            <p className="text-xs text-slate-500 font-medium">Coordinate logistics and curriculum integration</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all"
                                aria-label="Plane Logistics"
                            >
                                <Plane size={18} />
                            </button>
                            <button
                                className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all"
                                aria-label="Global Coordination"
                            >
                                <Globe size={18} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 group hover:border-teal-500/20 transition-all cursor-pointer">
                            <Compass className="h-10 w-10 text-teal-400 mb-4 group-hover:rotate-45 transition-transform duration-500" />
                            <h4 className="text-sm font-bold text-white mb-2">New Expedition</h4>
                            <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Initialize logistics, safety protocols, and parent bridge communication.</p>
                        </div>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 group hover:border-cyan-500/20 transition-all cursor-pointer">
                            <Camera className="h-10 w-10 text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-500" />
                            <h4 className="text-sm font-bold text-white mb-2">Virtual Lens</h4>
                            <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Deploy VR/AR environments for immersive institutional exploration.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Upcoming Schedule</h5>
                        {UPCOMING_EXCURSIONS.map((ex, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 group hover:bg-white/10 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                                        <Calendar size={16} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-white group-hover:text-teal-400 transition-colors">{ex.title}</p>
                                        <p className="text-[10px] text-slate-500 font-medium">{ex.date} • {ex.type}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-slate-300">{ex.capacity}</p>
                                    <p className={`text-[10px] font-black uppercase ${ex.status === 'Open' ? 'text-emerald-500' : 'text-rose-500'}`}>{ex.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                {/* Legacy Documentation */}
                <div className="space-y-6">
                    <GlassCard className="p-8 border-emerald-500/10">
                        <h4 className="text-xs font-black uppercase tracking-widest text-emerald-400 mb-6">Exploration Metrics</h4>
                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between text-[10px] font-black uppercase mb-2">
                                    <span className="text-slate-500">Expedition Readiness</span>
                                    <span className="text-emerald-400">92%</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 w-[92%]" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                    <p className="text-2xl font-black text-white">12</p>
                                    <p className="text-[10px] font-black uppercase text-slate-500">Total Trips</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                                    <p className="text-2xl font-black text-white">450</p>
                                    <p className="text-[10px] font-black uppercase text-slate-500">Students</p>
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="p-8 bg-teal-500/5 border-teal-500/10">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Strategic Recommendation</h4>
                        <p className="text-sm font-bold text-white mb-4 italic leading-relaxed">
                            "Leverage Virtual Silicon Valley Tour to bridge the Q4 coding curriculum gap."
                        </p>
                        <button className="w-full flex items-center justify-center gap-2 py-3 bg-teal-500 hover:bg-teal-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all">
                            Initialize Bridge <ArrowRight size={14} />
                        </button>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
