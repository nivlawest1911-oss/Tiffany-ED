'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Globe, MapPin, School, TrendingUp,
    Zap, ChevronRight, Filter, Activity,
    Database, Target, Cpu, LayoutGrid, List
} from "lucide-react";

// Mock Data for Alabama (Expanded)
const ALABAMA_SCHOOL_NODES = [
    { name: "Murphy High School", district: "Mobile County", type: "High School", students: "1,600", status: "Operational", efficiency: "94%" },
    { name: "Baker High School", district: "Mobile County", type: "High School", students: "2,800", status: "Operational", efficiency: "98%" },
    { name: "Davidson High School", district: "Mobile County", type: "High School", students: "1,500", status: "Operational", efficiency: "91%" },
    { name: "Hoover High School", district: "Hoover City", type: "High School", students: "2,900", status: "Synchronizing", efficiency: "89%" },
    { name: "Vestavia Hills High", district: "Vestavia Hills", type: "High School", students: "2,100", status: "Operational", efficiency: "96%" },
    { name: "Auburn High School", district: "Auburn City", type: "High School", students: "2,000", status: "Operational", efficiency: "95%" },
    { name: "Huntsville High School", district: "Huntsville City", type: "High School", students: "1,900", status: "Operational", efficiency: "93%" },
    { name: "Opelika High School", district: "Opelika City", type: "High School", students: "1,400", status: "Awaiting Connection", efficiency: "78%" },
    { name: "Daphne High School", district: "Baldwin County", type: "High School", students: "1,300", status: "Operational", efficiency: "92%" },
    { name: "Fairhope High School", district: "Baldwin County", type: "High School", students: "1,200", status: "Operational", efficiency: "94%" },
];

// Mock Data for National States
const NATIONAL_STATE_NODES = [
    { state: "Texas", schools: "8,900+", districts: "1,200", status: "Active", deployment: "92%" },
    { state: "Florida", schools: "4,200+", districts: "67", status: "Active", deployment: "88%" },
    { state: "Georgia", schools: "2,300+", districts: "181", status: "Active", deployment: "85%" },
    { state: "California", schools: "10,500+", districts: "1,000+", status: "Strategizing", deployment: "12%" },
    { state: "New York", schools: "4,800+", districts: "700+", status: "Active", deployment: "76%" },
    { state: "North Carolina", schools: "2,600+", districts: "115", status: "Active", deployment: "81%" },
    { state: "Virginia", schools: "2,100+", districts: "132", status: "Active", deployment: "79%" },
    { state: "Ohio", schools: "3,500+", districts: "600+", status: "Strategizing", deployment: "15%" },
    { state: "Illinois", schools: "4,000+", districts: "800+", status: "Active", deployment: "64%" },
    { state: "Pennsylvania", schools: "3,000+", districts: "500", status: "Active", deployment: "58%" },
];

export default function NetworkAtlas() {
    const [view, setView] = useState<'alabama' | 'national'>('alabama');
    const [searchTerm, setSearchTerm] = useState("");
    const [layout, setLayout] = useState<'grid' | 'list'>('grid');

    const filteredAlabama = useMemo(() =>
        ALABAMA_SCHOOL_NODES.filter(s =>
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.district.toLowerCase().includes(searchTerm.toLowerCase())
        ), [searchTerm]);

    const filteredNational = useMemo(() =>
        NATIONAL_STATE_NODES.filter(n =>
            n.state.toLowerCase().includes(searchTerm.toLowerCase())
        ), [searchTerm]);

    return (
        <section className="py-32 bg-[#030303] relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-indigo-600/5 rounded-full blur-[180px]" />
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-emerald-600/5 rounded-full blur-[150px]" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.05]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                            <Globe size={12} className="text-indigo-500" />
                            <span>Global Strategic Atlas</span>
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                            Professional <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-600 italic">
                                Intelligence Map.
                            </span>
                        </h2>
                        <p className="text-lg text-zinc-500 leading-relaxed font-light">
                            Real-time intelligence nodes spanning the Alabama educator network and expanding across 48 national jurisdictions. Access detailed school telemetry and regional deployment metrics.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 p-1.5 bg-zinc-900/50 border border-white/5 rounded-3xl backdrop-blur-xl">
                        <button
                            onClick={() => setView('alabama')}
                            className={`flex items-center gap-2 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'alabama' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'text-zinc-500 hover:text-white'}`}
                        >
                            <MapPin size={14} />
                            Alabama Scan
                        </button>
                        <button
                            onClick={() => setView('national')}
                            className={`flex items-center gap-2 px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'national' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' : 'text-zinc-500 hover:text-white'}`}
                        >
                            <Globe size={14} />
                            National Tactical
                        </button>
                    </div>
                </div>

                {/* Search & Tool Bar */}
                <div className="flex flex-col md:flex-row items-center gap-6 mb-12">
                    <div className="relative flex-1 group">
                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-zinc-600 group-focus-within:text-indigo-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder={view === 'alabama' ? "Deep Scan Alabama Schools (Name, District, NCES)..." : "Locate National Strategic Centers..."}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-16 pr-6 py-5 bg-zinc-900 border border-white/5 rounded-2xl text-white focus:outline-none focus:border-indigo-500/50 transition-all font-medium placeholder:text-zinc-700"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
                            <div className="h-6 w-px bg-white/5" />
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                                {view === 'alabama' ? filteredAlabama.length : filteredNational.length} Results
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex p-1 bg-zinc-900 border border-white/5 rounded-xl">
                            <button
                                onClick={() => setLayout('grid')}
                                className={`p-2 rounded-lg transition-all ${layout === 'grid' ? 'bg-white/5 text-white' : 'text-zinc-600 hover:text-white'}`}
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button
                                onClick={() => setLayout('list')}
                                className={`p-2 rounded-lg transition-all ${layout === 'list' ? 'bg-white/5 text-white' : 'text-zinc-600 hover:text-white'}`}
                            >
                                <List size={18} />
                            </button>
                        </div>
                        <button className="flex items-center gap-2 px-6 py-3.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-all">
                            <Filter size={14} />
                            Advanced
                        </button>
                    </div>
                </div>

                {/* Atlas Data Display */}
                <div className="relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`${view}-${layout}`}
                            initial={{ opacity: 0, scale: 0.99 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.01 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className={layout === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}
                        >
                            {view === 'alabama' ? (
                                filteredAlabama.map((school, idx) => (
                                    <AtlasCard
                                        key={idx}
                                        layout={layout}
                                        title={school.name}
                                        subtitle={school.district}
                                        type={school.type}
                                        metric={`${school.students} Students`}
                                        status={school.status}
                                        value={school.efficiency}
                                        icon={School}
                                        color="indigo"
                                    />
                                ))
                            ) : (
                                filteredNational.map((node, idx) => (
                                    <AtlasCard
                                        key={idx}
                                        layout={layout}
                                        title={node.state}
                                        subtitle={`${node.districts} Districts`}
                                        type="Regional HQ"
                                        metric={`${node.schools} Schools`}
                                        status={node.status}
                                        value={node.deployment}
                                        icon={Globe}
                                        color="emerald"
                                    />
                                ))
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Empty State */}
                    {(view === 'alabama' ? filteredAlabama.length : filteredNational.length) === 0 && (
                        <div className="py-32 text-center">
                            <div className="inline-flex p-6 rounded-full bg-white/5 border border-white/5 text-zinc-700 mb-6">
                                <Database size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Center Not Located.</h3>
                            <p className="text-zinc-500">The current search criteria did not match any active educational centers in our strategic atlas.</p>
                        </div>
                    )}
                </div>

                {/* Map Insight Banner */}
                <div className="mt-20 grid md:grid-cols-3 gap-8">
                    {[
                        { icon: Activity, label: "Live Connection Capacity", value: "99.98%", sub: "Global Center Stability" },
                        { icon: Target, label: "Search Indexing", value: "114,000+", sub: "US Educational Entities" },
                        { icon: Cpu, label: "Strategic Processing", value: "2.4ms", sub: "Atlas Scann Rate" }
                    ].map((stat, i) => (
                        <div key={i} className="flex items-center gap-6 p-8 rounded-[2rem] bg-zinc-900/30 border border-white/5">
                            <div className="p-4 bg-white/5 rounded-2xl">
                                <stat.icon className="w-6 h-6 text-zinc-500" />
                            </div>
                            <div>
                                <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">{stat.label}</div>
                                <div className="text-2xl font-black text-white">{stat.value}</div>
                                <div className="text-[10px] text-zinc-700 font-bold uppercase tracking-tighter">{stat.sub}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function AtlasCard({ layout, title, subtitle, type, metric, status, value, icon: Icon, color }: any) {
    const isGrid = layout === 'grid';
    const accentColor = color === 'indigo' ? 'text-indigo-400' : 'text-emerald-400';
    const bgColor = color === 'indigo' ? 'bg-indigo-500/10' : 'bg-emerald-500/10';
    const borderColor = color === 'indigo' ? 'border-indigo-500/20' : 'border-emerald-500/20';
    const hoverBorder = color === 'indigo' ? 'hover:border-indigo-500/40' : 'hover:border-emerald-500/40';

    if (!isGrid) {
        return (
            <div className={`p-4 rounded-2xl bg-zinc-900/40 border border-white/5 ${hoverBorder} transition-all flex items-center gap-6 group`}>
                <div className={`p-3 rounded-xl ${bgColor} border border-white/5 group-hover:scale-105 transition-transform`}>
                    <Icon className={`w-5 h-5 ${accentColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-white font-bold truncate">{title}</h4>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest leading-none mt-1">{subtitle}</p>
                </div>
                <div className="hidden md:block w-32 px-4 border-l border-white/5">
                    <div className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] mb-1">Type</div>
                    <div className="text-xs font-bold text-zinc-300">{type}</div>
                </div>
                <div className="hidden lg:block w-40 px-4 border-l border-white/5">
                    <div className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] mb-1">Metric</div>
                    <div className="text-xs font-bold text-zinc-300">{metric}</div>
                </div>
                <div className="w-32 px-4 border-l border-white/5">
                    <div className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] mb-1">Status</div>
                    <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${status === 'Operational' || status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                        <span className="text-[10px] font-bold text-white uppercase tracking-tighter">{status}</span>
                    </div>
                </div>
                <div className="w-24 text-right">
                    <div className="text-lg font-black text-white">{value}</div>
                    <div className="text-[8px] text-zinc-600 uppercase tracking-widest group-hover:text-zinc-400 transition-colors">Deployment</div>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-800 group-hover:text-white transition-colors" />
            </div>
        );
    }

    return (
        <div className={`group p-8 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 ${hoverBorder} transition-all duration-500 relative overflow-hidden flex flex-col h-full`}>
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Icon size={120} className={accentColor} />
            </div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-8">
                    <div className={`p-4 rounded-[1.5rem] ${bgColor} border border-white/5 group-hover:scale-110 transition-transform`}>
                        <Icon className={`w-6 h-6 ${accentColor}`} />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 border border-white/5">
                        <div className={`w-1.5 h-1.5 rounded-full ${status === 'Operational' || status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]`} />
                        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{status}</span>
                    </div>
                </div>

                <div className="mb-2">
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-1">{subtitle}</p>
                    <h4 className="text-2xl font-black text-white leading-tight group-hover:text-zinc-300 transition-colors uppercase italic">{title}</h4>
                </div>

                <p className="text-xs text-zinc-500 font-medium mb-8 flex-grow">{type} • {metric}</p>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div>
                            <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Growth Index</div>
                            <div className="flex items-center gap-2">
                                <TrendingUp size={14} className="text-emerald-500" />
                                <span className="text-lg font-black text-white leading-none tracking-tighter">{value}</span>
                            </div>
                        </div>
                        <button className="px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-[8px] font-black text-indigo-400 uppercase tracking-widest hover:bg-indigo-500/20 transition-all">
                            Strategic Consult
                        </button>
                    </div>
                    <button className="p-3 rounded-full bg-white/5 border border-white/5 text-zinc-400 hover:bg-white/10 hover:text-white transition-all transform group-hover:translate-x-1">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
