'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    TrendingUp,
    Clock,
    ShieldCheck,
    Zap,
    Sparkles,
    Brain,
    Activity,
    ChevronRight,
    Download,
    FileText
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { calculateSovereignSavings, formatCurrency } from '@/lib/roi-logic';

// --- MOCK DATA ---
const DISTRICT_STATS = {
    legalDocumentsReviewed: 245,
    gradingHoursSaved: 1240,
    administrativeTasksAutomated: 850,
    complianceChecksRun: 420
};

const TREND_DATA = [
    { name: 'Jan', savings: 45000, efficiency: 65, workload: 88 },
    { name: 'Feb', savings: 52000, efficiency: 68, workload: 85 },
    { name: 'Mar', savings: 48000, efficiency: 72, workload: 82 },
    { name: 'Apr', savings: 61000, efficiency: 75, workload: 78 },
    { name: 'May', savings: 58000, efficiency: 78, workload: 75 },
    { name: 'Jun', savings: 72000, efficiency: 82, workload: 70 },
    { name: 'Jul', savings: 85000, efficiency: 88, workload: 65 },
];

const SCHOOL_PERFORMANCE = [
    { name: 'North High', impact: 88, adoption: 92, color: '#D4AF37' },
    { name: 'East Academy', impact: 76, adoption: 85, color: '#B08D57' },
    { name: 'South Middle', impact: 94, adoption: 78, color: '#C5A059' },
    { name: 'West Elementary', impact: 82, adoption: 88, color: '#E5C76B' },
    { name: 'Innovation Hub', impact: 91, adoption: 95, color: '#AA8A3F' },
];

// --- COMPONENTS ---

interface MetricCardProps {
    icon: any;
    label: string;
    value: string;
    trend?: string;
    subtext: string;
    color?: string;
}

const MetricCard = ({ icon: Icon, label, value, trend, subtext, color = "intel-gold" }: MetricCardProps) => (
    <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        className="relative group h-full"
    >
        <div className={`absolute inset-0 bg-${color}/5 rounded-3xl blur-2xl group-hover:bg-${color}/10 transition-all duration-500`} />
        <Card className="relative h-full bg-black/40 backdrop-blur-3xl border-white/5 group-hover:border-intel-gold/30 rounded-3xl overflow-hidden transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-intel-gold/5 rounded-full -mr-16 -mt-16 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-intel-gold/40 transition-colors">
                        <Icon className="w-6 h-6 text-intel-gold" />
                    </div>
                    {trend && (
                        <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/5 font-mono text-[10px] uppercase tracking-tighter">
                            {trend}
                        </Badge>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-1">
                    <p className="text-[10px] text-white/40 uppercase font-black tracking-[0.2em]">{label}</p>
                    <h3 className="text-3xl font-black text-white italic tracking-tighter">{value}</h3>
                    <p className="text-[10px] text-white/20 font-mono tracking-wide">{subtext}</p>
                </div>
            </CardContent>
        </Card>
    </motion.div>
);

const StrategicBriefing = ({ metrics }: { metrics: typeof DISTRICT_STATS }) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [briefing, setBriefing] = useState<string | null>(null);

    const generateBrief = async () => {
        setIsGenerating(true);
        try {
            const response = await fetch('/api/admin/strategic-analysis', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ metrics })
            });
            const data = await response.json();
            setBriefing(data.analysis);
        } catch (error) {
            console.error("Briefing Error:", error);
            setBriefing("Failed to synthesize strategic briefing. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Card className="bg-black/40 backdrop-blur-3xl border-white/5 rounded-3xl overflow-hidden">
            <CardHeader className="border-b border-white/5 pb-4">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="text-white font-black italic uppercase tracking-tighter text-xl">
                            Strategic <span className="text-intel-gold">Synthesis</span>
                        </CardTitle>
                        <CardDescription className="text-white/30 text-[10px] uppercase font-mono tracking-widest">
                            AI-Driven Executive Intelligence
                        </CardDescription>
                    </div>
                    <Button
                        onClick={generateBrief}
                        disabled={isGenerating}
                        className="bg-intel-gold text-black hover:bg-white transition-all font-black uppercase text-[10px] tracking-widest h-9 px-6 rounded-full"
                    >
                        {isGenerating ? <Activity className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                        {isGenerating ? 'Synthesizing...' : 'Generate Briefing'}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="pt-6 relative min-h-[200px]">
                <AnimatePresence mode="wait">
                    {briefing ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-white/80 font-serif leading-relaxed space-y-4"
                        >
                            <div className="prose prose-invert prose-sm max-w-none">
                                {briefing.split('\n').map((line, i) => (
                                    <p key={i} className={line.startsWith('**') || line.startsWith('###') ? 'text-intel-gold font-bold' : ''}>
                                        {line.replace(/\*\*/g, '').replace(/###/g, '')}
                                    </p>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            className="absolute inset-0 flex flex-col items-center justify-center space-y-4 opacity-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.2 }}
                        >
                            <Brain className="w-16 h-16 text-intel-gold" />
                            <p className="text-[10px] uppercase tracking-[0.3em] font-black">Awaiting Tactical Command</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </CardContent>
        </Card>
    );
};

export default function MissionControlDashboard() {
    const savings = useMemo(() => calculateSovereignSavings(DISTRICT_STATS), []);

    return (
        <div className="space-y-8 pb-20">
            {/* 3D Global Effects Definition */}
            <svg className="h-0 w-0 absolute pointer-events-none">
                <defs>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                        <feOffset dx="2" dy="2" result="offsetblur" />
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.5" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                    </linearGradient>
                </defs>
            </svg>

            {/* Header with Glass Effects */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 p-8 rounded-[40px] bg-white/[0.02] border border-white/5 backdrop-blur-sm overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-intel-gold/50 to-transparent" />
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-intel-gold/10 border border-intel-gold/20 mb-4">
                            <Activity className="w-3 h-3 text-intel-gold" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-intel-gold">Mission Control v4.0</span>
                        </div>
                        <h1 className="text-5xl font-black text-white mb-2 uppercase tracking-tighter leading-none">
                            District <span className="text-intel-gold italic">Intelligence</span>
                        </h1>
                        <p className="text-white/40 font-mono text-xs uppercase tracking-[0.2em]">Operational Uplink: Central Command Node Alpha</p>
                    </div>
                    <div className="flex gap-4">
                        <Button 
                            variant="ghost" 
                            onClick={() => toast.info("Mission Parameters: Standard Protocol Alpha active")}
                            className="rounded-2xl border-white/10 bg-white/5 text-white/50 hover:bg-white/10 h-14 px-8 font-black uppercase text-[10px] tracking-widest"
                        >
                            Parameters
                        </Button>
                        <Button 
                            onClick={() => toast.success("Global Export initiated", { description: "Aggregating all 14 nodes into Sovereign Ledger..." })}
                            className="rounded-2xl bg-white text-black hover:bg-intel-gold transition-all duration-500 h-14 px-8 font-black uppercase text-[10px] tracking-widest shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                        >
                            <Download className="w-4 h-4 mr-2" /> Global Export
                        </Button>
                    </div>
                </div>
            </motion.div>

            {/* Top Row: Core Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    icon={TrendingUp}
                    label="Fiscal Reclaim"
                    value={formatCurrency(savings.totalSavings)}
                    trend="+18.4%"
                    subtext="Consolidated District ROI"
                />
                <MetricCard
                    icon={Clock}
                    label="Capacity Delta"
                    value={`${savings.hoursReclaimed}h`}
                    trend="+5.2%"
                    subtext="Teacher Planning Efficiency"
                />
                <MetricCard
                    icon={ShieldCheck}
                    label="Compliance Index"
                    value="98.2%"
                    trend="+1.2%"
                    subtext="IEP/Legal Mitigation Rate"
                    color="emerald-500"
                />
                <MetricCard
                    icon={Zap}
                    label="AI Synergy"
                    value="4.2x"
                    trend="+12%"
                    subtext="Cross-Node Performance"
                    color="purple-500"
                />
            </div>

            {/* Main Visualizations Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 3D-Styled Area Chart */}
                <Card className="lg:col-span-2 bg-black/40 backdrop-blur-3xl border-white/5 rounded-3xl overflow-hidden p-6">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h3 className="text-white font-black italic uppercase tracking-tighter text-xl">Efficiency <span className="text-intel-gold">Dynamics</span></h3>
                            <p className="text-[10px] text-white/20 uppercase font-mono tracking-widest">Temporal Growth Analysis</p>
                        </div>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={TREND_DATA}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 900 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 900 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(0,0,0,0.9)',
                                        border: '1px solid rgba(212,175,55,0.4)',
                                        borderRadius: '16px',
                                        backdropFilter: 'blur(20px)',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                                    }}
                                    itemStyle={{ color: '#D4AF37', fontWeight: 'bold' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="efficiency"
                                    stroke="#D4AF37"
                                    strokeWidth={4}
                                    fill="url(#areaGradient)"
                                    animationDuration={2500}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="workload"
                                    stroke="rgba(255,255,255,0.2)"
                                    strokeWidth={2}
                                    fill="transparent"
                                    strokeDasharray="10 10"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Performance Rankings */}
                <Card className="bg-black/40 backdrop-blur-3xl border-white/5 rounded-3xl overflow-hidden p-6 flex flex-col">
                    <h3 className="text-white font-black italic uppercase tracking-tighter text-xl mb-8">Node <span className="text-intel-gold">Adoption</span></h3>
                    <div className="flex-1 space-y-6">
                        {SCHOOL_PERFORMANCE.map((school, i) => (
                            <div key={school.name} className="group cursor-pointer">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-[10px] font-black uppercase text-white/50 group-hover:text-white transition-colors tracking-widest">{school.name}</span>
                                    <span className="text-xs font-black text-intel-gold">{school.impact}%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden relative">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${school.impact}%` }}
                                        transition={{ duration: 1.5, delay: i * 0.1, ease: 'circOut' }}
                                        className="absolute top-0 left-0 h-full rounded-full"
                                        style={{ backgroundColor: school.color } as React.CSSProperties}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button 
                        variant="ghost" 
                        onClick={() => toast("Topology synchronization verified.", { description: "Institutional link integrity: 100%" })}
                        className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-intel-gold bg-transparent"
                    >
                        Full Topology Report <ChevronRight className="w-3 h-3 ml-2" />
                    </Button>
                </Card>
            </div>

            {/* Bottom Row: Activities & Synthesis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <StrategicBriefing metrics={DISTRICT_STATS} />

                <Card className="bg-black/40 backdrop-blur-3xl border-white/5 rounded-3xl overflow-hidden p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-white font-black italic uppercase tracking-tighter text-xl">Tactical <span className="text-intel-gold">Inventory</span></h3>
                        <Badge className="bg-intel-gold/10 text-intel-gold border-intel-gold/20 font-black text-[9px] uppercase tracking-widest">Active nodes: 12</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { label: 'IEP Architect', count: 42, icon: Sparkles },
                            { label: 'Lesson Core', count: 128, icon: Brain },
                            { label: 'Fiscal Tracker', count: 15, icon: FileText },
                            { label: 'Legal Sentinel', count: 8, icon: ShieldCheck },
                        ].map((item) => (
                            <motion.div
                                key={item.label}
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(212,175,55,0.05)' }}
                                className="p-4 rounded-2xl bg-white/5 border border-white/5 transition-all cursor-pointer group"
                            >
                                <item.icon className="w-5 h-5 text-intel-gold/50 group-hover:text-intel-gold mb-3 transition-colors" />
                                <div className="text-[10px] font-black text-white/40 uppercase tracking-tighter">{item.label}</div>
                                <div className="text-2xl font-black text-white italic">{item.count}</div>
                            </motion.div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
