'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie,
    AreaChart,
    Area
} from 'recharts';
import { TrendingUp, Users, Clock, AlertCircle, Database, Zap } from 'lucide-react';
import { getDistrictAnalytics } from '@/app/actions/bigquery';
import SovereignInteractionAgent from '@/components/SovereignInteractionAgent';

const TOOLTIP_STYLE = {
    backgroundColor: 'rgba(5, 5, 8, 0.98)',
    border: '1px solid rgba(197,164,126,0.5)',
    borderRadius: '24px',
    boxShadow: '0 40px 100px rgba(0,0,0,0.9)',
    fontSize: '9px',
    fontWeight: '900',
    textTransform: 'uppercase',
    padding: '20px',
    backdropFilter: 'blur(30px)',
} as React.CSSProperties;

export default function AnalyticsClient() {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const result = await getDistrictAnalytics();
            if (result.success) {
                setData(result.data);
                setError(null);
            } else {
                setError(result.error);
            }
            setIsLoading(false);
        }
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] gap-12">
                <div className="relative">
                    <motion.div
                        className="w-32 h-32 rounded-[2rem] border-2 border-intel-gold/10 border-t-intel-gold shadow-[0_0_60px_rgba(197,164,126,0.1)]"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Database className="text-intel-gold w-10 h-10 animate-pulse" />
                    </div>
                </div>
                <div className="text-center space-y-4">
                    <p className="font-black text-intel-gold uppercase tracking-[0.6em] text-xs animate-pulse">Synchronizing Neural Grid</p>
                    <div className="flex items-center justify-center gap-3">
                        <div className="h-px w-8 bg-zinc-800" />
                        <span className="text-[9px] text-zinc-600 uppercase tracking-widest font-black italic">Source: BigQuery // SEC-ALPHA</span>
                        <div className="h-px w-8 bg-zinc-800" />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] text-center p-8">
                <div className="w-24 h-24 bg-red-500/5 border border-red-500/20 rounded-[2.5rem] flex items-center justify-center mb-10 relative group">
                    <div className="absolute inset-0 bg-red-500/5 blur-2xl group-hover:bg-red-500/10 transition-all" />
                    <AlertCircle className="text-red-500 w-10 h-10 relative z-10" />
                </div>
                <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-4">Tactical Bridge Interrupted</h3>
                <p className="text-zinc-500 max-w-lg uppercase tracking-widest text-xs font-black leading-relaxed italic border-x border-red-500/20 px-8 py-2">
                    ERROR: {error}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-12 bg-white text-black px-12 py-5 text-[11px] font-black uppercase tracking-[0.4em] rounded-2xl hover:bg-intel-gold transition-all shadow-2xl hover:scale-105"
                >
                    Finalize Retry Protocol
                </button>
            </div>
        );
    }

    const COLORS = ['#C5A47E', '#8E795E', '#D9C1A3', '#6A5A46', '#B09677', '#E5D5C0', '#4A3D2F'];

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-32">
            {/* Command Header Section */}
            <div className="relative group overflow-hidden rounded-[3.5rem] p-12 bg-white/[0.01] border border-white/[0.05] backdrop-blur-3xl min-h-[300px] flex flex-col justify-end">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-intel-gold/[0.03] blur-[150px] -z-10 group-hover:bg-intel-gold/[0.05] transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-0" />

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-10">
                    <div className="space-y-6 max-w-3xl">
                        <SovereignInteractionAgent
                            title="Intelligence Operations"
                            description="Real-time multi-tenant aggregation grid. Currently syncing 45,000+ data nodes via Google BigQuery clusters."
                            agentId="strategic"
                        >
                            <div className="inline-flex items-center gap-3 px-6 py-2 bg-intel-gold/10 border border-intel-gold/30 rounded-full cursor-help">
                                <Zap size={14} className="text-intel-gold animate-pulse" />
                                <span className="text-[10px] font-black uppercase text-intel-gold tracking-[0.4em] italic">Tactical AI Active</span>
                            </div>
                        </SovereignInteractionAgent>

                        <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter text-white leading-none">
                            District <span className="gold-gradient-text">Grid</span>
                        </h2>
                        <p className="text-zinc-600 font-bold uppercase tracking-widest text-sm leading-relaxed max-w-xl italic border-l-2 border-intel-gold/50 pl-8">
                            Empowering leadership through high-fidelity visualization and predictive neural modeling.
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-4">
                        <div className="flex gap-2">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="w-1.5 h-12 bg-white/[0.03] rounded-full overflow-hidden">
                                    <motion.div
                                        className="w-full bg-intel-gold/40"
                                        animate={{ height: ['20%', '90%', '40%'] }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                                    />
                                </div>
                            ))}
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.6em] text-zinc-700">Bit-Stream Frequency: 1.2GHZ</span>
                    </div>
                </div>
            </div>

            {/* Core Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Avg Attendance', value: '94.8%', icon: Clock, color: 'text-intel-gold', trend: '+1.2%', desc: 'Instructional Continuity' },
                    { label: 'Total Enrolled', value: '4,150', icon: Users, color: 'text-zinc-400', trend: '+45', desc: 'Sovereign Node Count' },
                    { label: 'Growth Index', value: '88.2', icon: TrendingUp, color: 'text-intel-gold', trend: '+5.4', desc: 'Neural Output' },
                    { label: 'Risk Alerts', value: '12', icon: AlertCircle, color: 'text-red-500', trend: '-2', desc: 'Critical Pathing' }
                ].map((stat, i) => (
                    <SovereignInteractionAgent
                        key={stat.label}
                        title={stat.label}
                        description={`Analyzing ${stat.label} across the Mobile County Instructional Grid. Predictive trend is ${stat.trend}.`}
                        agentId={i % 2 === 0 ? "strategic" : "tactical"}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/[0.02] border border-white/[0.05] p-8 rounded-[2.5rem] group hover:border-intel-gold/40 transition-all duration-700 backdrop-blur-3xl overflow-hidden relative cursor-help"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex justify-between items-center mb-8 relative z-10">
                                <div className={`p-4 rounded-2xl bg-black/40 border border-white/5 ${stat.color} group-hover:scale-110 group-hover:border-intel-gold/50 transition-all duration-500`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <div className={`text-[10px] font-black px-4 py-1.5 rounded-full border ${stat.trend.startsWith('+') ? 'bg-intel-gold/10 border-intel-gold/20 text-intel-gold' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                                    {stat.trend}
                                </div>
                            </div>
                            <div className="relative z-10">
                                <p className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.4em] mb-2">{stat.label}</p>
                                <h4 className="text-4xl font-black italic uppercase tracking-tighter mb-4 text-white group-hover:text-intel-gold transition-colors">{stat.value}</h4>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{stat.desc}</p>
                            </div>
                        </motion.div>
                    </SovereignInteractionAgent>
                ))}
            </div>

            {/* Tactical Visualization Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Main Distribution Chart */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="lg:col-span-8 bg-white/[0.02] border border-white/[0.05] p-12 rounded-[4rem] backdrop-blur-3xl relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-intel-gold/[0.02] blur-[150px] -z-10" />
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mb-16 relative z-10">
                        <div className="space-y-3">
                            <h3 className="font-black text-4xl uppercase tracking-tighter text-white italic group-hover:text-intel-gold transition-colors">Institutional Snapshot</h3>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900/80 rounded-full border border-zinc-800">
                                    <div className="w-1.5 h-1.5 rounded-full bg-intel-gold animate-ping" />
                                    <span className="text-[9px] font-black uppercase text-zinc-400 tracking-widest">Live Sync</span>
                                </div>
                                <p className="text-[10px] text-zinc-600 uppercase tracking-[0.5em] font-black italic">Instructional Attendance Audit</p>
                            </div>
                        </div>
                    </div>

                    <div className="h-[400px] w-full relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="10 10" stroke="rgba(255,255,255,0.01)" vertical={false} />
                                <XAxis
                                    dataKey="school_name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 9, fontWeight: 900, textAnchor: 'middle' }}
                                    dy={15}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 9, fontWeight: 900 }}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(197,164,126,0.03)' }}
                                    contentStyle={TOOLTIP_STYLE}
                                />
                                <Bar dataKey="avg_attendance" radius={[12, 12, 0, 0]}>
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                            opacity={0.7}
                                            className="transition-all hover:opacity-100 cursor-pointer"
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Focus Capacity Panel */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="lg:col-span-4 bg-white/[0.02] border border-white/[0.05] p-10 rounded-[3.5rem] flex flex-col backdrop-blur-3xl group relative overflow-hidden"
                >
                    <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-white/[0.02] blur-[100px] -z-10" />
                    <div className="mb-12 relative z-10">
                        <h3 className="font-black text-3xl uppercase tracking-tighter text-white italic group-hover:text-intel-gold transition-colors">Node Capacity</h3>
                        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.4em] font-black mt-3 italic">Student Node Shares</p>
                    </div>

                    <div className="flex-1 flex flex-col justify-center items-center relative z-10">
                        <div className="h-[250px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={data}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={95}
                                        paddingAngle={8}
                                        dataKey="total_students"
                                        stroke="none"
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-60 transition-opacity cursor-pointer" />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={TOOLTIP_STYLE} />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col mt-4">
                                <span className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em]">Total</span>
                                <span className="text-3xl font-black text-white italic uppercase tracking-tighter">4.1K</span>
                            </div>
                        </div>

                        <div className="mt-12 w-full space-y-3">
                            {data.slice(0, 5).map((school, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ x: 10 }}
                                    className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl group/item cursor-pointer"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.05)]" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                        <span className="text-[10px] font-black uppercase text-zinc-500 truncate max-w-[120px] group-hover/item:text-white transition-colors">{school.school_name}</span>
                                    </div>
                                    <span className="text-[10px] font-black text-zinc-400 group-hover/item:text-intel-gold transition-colors">{school.total_students} NODES</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Neural Flux Area Chart */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-black/60 border border-white/5 p-12 rounded-[4rem] backdrop-blur-3xl relative overflow-hidden group"
            >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-intel-gold/[0.03] to-transparent pointer-events-none" />
                <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-16 relative z-10">
                    <div className="flex items-center gap-8">
                        <div className="w-20 h-20 bg-intel-gold/10 rounded-[2rem] border border-intel-gold/30 flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:border-intel-gold transition-all duration-700">
                            <Zap size={32} className="text-intel-gold animate-pulse" />
                        </div>
                        <div>
                            <h3 className="font-black text-4xl uppercase tracking-tighter text-white italic group-hover:text-intel-gold transition-colors">Neural Throughput</h3>
                            <p className="text-[10px] text-zinc-600 uppercase tracking-[0.5em] font-black mt-4 italic leading-relaxed">
                                District Intelligence Pulse // v9.4 Strategic Synchronizer
                            </p>
                        </div>
                    </div>
                </div>

                <div className="h-[450px] w-full relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="neuralGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#C5A47E" stopOpacity={0.6} />
                                    <stop offset="50%" stopColor="#C5A47E" stopOpacity={0.15} />
                                    <stop offset="100%" stopColor="#C5A47E" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="20 20" stroke="rgba(255,255,255,0.01)" vertical={false} />
                            <XAxis dataKey="school_name" hide={true} />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: 'rgba(255,255,255,0.15)', fontSize: 9, fontWeight: 900 }}
                                dx={-10}
                            />
                            <Tooltip contentStyle={TOOLTIP_STYLE} />
                            <Area
                                type="monotone"
                                dataKey="total_students"
                                stroke="#C5A47E"
                                strokeWidth={4}
                                fillOpacity={1}
                                fill="url(#neuralGradient)"
                                animationDuration={4000}
                                strokeLinecap="round"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>
    );
}
