import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Activity, Clock, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Mock data types interface
interface BurnoutMetric {
    id: string;
    label: string;
    value: number; // 0-100
    trend: 'up' | 'down' | 'stable';
    status: 'optimal' | 'warning' | 'critical';
    description: string;
}

interface StaffMember {
    id: string;
    name: string;
    role: string;
    burnoutScore: number;
    metrics: BurnoutMetric[];
    avatar: string;
}

// Mock Data Generator
const MOCK_STAFF: StaffMember[] = [
    {
        id: '1',
        name: 'Sarah Jenkins',
        role: 'Special Ed Lead',
        burnoutScore: 88,
        avatar: '/images/avatars/executive_leader.png',
        metrics: [
            { id: 'm1', label: 'Caseload Strain', value: 92, trend: 'up', status: 'critical', description: 'Caseload exceeds recommended limit by 15%' },
            { id: 'm2', label: 'Compliance Fatigue', value: 85, trend: 'up', status: 'critical', description: 'High volume of recent IEP deadlines' },
            { id: 'm3', label: 'Resource Access', value: 45, trend: 'stable', status: 'warning', description: 'Limited access to paraprofessional support' }
        ]
    },
    {
        id: '2',
        name: 'Marcus Thorne',
        role: 'School Psychologist',
        burnoutScore: 65,
        avatar: '/images/avatars/data_analyst.png',
        metrics: [
            { id: 'm1', label: 'Caseload Strain', value: 70, trend: 'down', status: 'warning', description: 'Manageable but approaching threshold' },
            { id: 'm2', label: 'Compliance Fatigue', value: 60, trend: 'stable', status: 'optimal', description: 'Steady workflow' },
            { id: 'm3', label: 'Resource Access', value: 80, trend: 'up', status: 'optimal', description: 'Good access to testing materials' }
        ]
    },
    {
        id: '3',
        name: 'Elena Rodriguez',
        role: 'Speech Pathologist',
        burnoutScore: 42,
        avatar: '/images/avatars/curriculum_strategist.png',
        metrics: [
            { id: 'm1', label: 'Caseload Strain', value: 45, trend: 'stable', status: 'optimal', description: 'Well within capacity' },
            { id: 'm2', label: 'Compliance Fatigue', value: 30, trend: 'down', status: 'optimal', description: 'Recent paperwork completed' },
            { id: 'm3', label: 'Resource Access', value: 90, trend: 'stable', status: 'optimal', description: 'Full resource availability' }
        ]
    }
];

export default function BurnoutHeatmap() {
    const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate data loading
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/20';
            case 'warning': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
            default: return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-red-500';
        if (score >= 60) return 'text-amber-500';
        return 'text-emerald-500';
    };

    const getProgressColor = (score: number) => {
        if (score >= 80) return 'bg-red-500';
        if (score >= 60) return 'bg-amber-500';
        return 'bg-emerald-500';
    };

    return (
        <Card className="w-full h-full bg-zinc-950 border-white/10 overflow-hidden flex flex-col relative group">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] pointer-events-none" />

            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <Flame className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white tracking-tight">Ecosystem Burnout Heatmap</h3>
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest">Live Biometric Telemetry</span>
                        </div>
                    </div>
                </div>
                <Badge variant="outline" className="bg-zinc-900/50 border-white/10 text-zinc-400">
                    <Clock className="w-3 h-3 mr-1" />
                    Updated: Just now
                </Badge>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 relative z-10 overflow-y-auto custom-scrollbar">
                {isLoading ? (
                    <div className="h-full flex flex-col items-center justify-center space-y-4">
                        <div className="w-12 h-12 rounded-full border-2 border-red-500/20 border-t-red-500 animate-spin" />
                        <p className="text-xs text-zinc-500 font-mono animate-pulse">ANALYZING NEURAL STRESS MARKERS...</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* High Level Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Avg. Strain</div>
                                <div className="text-2xl font-black text-white">65%</div>
                            </div>
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                                <div className="text-xs text-red-400 uppercase tracking-wider mb-1">Critical Risk</div>
                                <div className="text-2xl font-black text-red-500">2 Staff</div>
                            </div>
                            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                <div className="text-xs text-emerald-400 uppercase tracking-wider mb-1">Optimal State</div>
                                <div className="text-2xl font-black text-emerald-500">8 Staff</div>
                            </div>
                        </div>

                        {/* Staff Heatmap List */}
                        <div className="space-y-3">
                            {MOCK_STAFF.map((staff) => (
                                <motion.div
                                    key={staff.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={cn(
                                        "p-4 rounded-xl border transition-all cursor-pointer hover:bg-white/5",
                                        selectedStaff?.id === staff.id
                                            ? "bg-white/5 border-noble-gold/30 shadow-[0_0_15px_rgba(197,164,126,0.1)]"
                                            : "bg-black/20 border-white/5 hover:border-white/10"
                                    )}
                                    onClick={() => setSelectedStaff(staff.id === selectedStaff?.id ? null : staff)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className={cn(
                                                "w-12 h-12 rounded-full border-2 p-0.5",
                                                getScoreColor(staff.burnoutScore).replace('text-', 'border-')
                                            )}>
                                                <img src={staff.avatar} alt={staff.name} className="w-full h-full rounded-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                            </div>
                                            <div className={cn(
                                                "absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-zinc-900 flex items-center justify-center border border-white/10",
                                                getScoreColor(staff.burnoutScore)
                                            )}>
                                                <Activity size={10} />
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <h4 className="font-bold text-white text-sm">{staff.name}</h4>
                                                <span className={cn("font-black text-sm", getScoreColor(staff.burnoutScore))}>
                                                    {staff.burnoutScore}%
                                                </span>
                                            </div>
                                            <p className="text-xs text-zinc-500 mb-2">{staff.role}</p>

                                            {/* Progress Bar */}
                                            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${staff.burnoutScore}%` }}
                                                    className={cn("h-full rounded-full", getProgressColor(staff.burnoutScore))}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expanded Details */}
                                    <AnimatePresence>
                                        {selectedStaff?.id === staff.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="mt-4 pt-4 border-t border-white/5 overflow-hidden"
                                            >
                                                <div className="grid grid-cols-1 gap-2">
                                                    {staff.metrics.map((metric) => (
                                                        <div key={metric.id} className="flex items-center justify-between p-2 rounded-lg bg-black/30">
                                                            <div className="flex items-center gap-2">
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger>
                                                                            <Info size={12} className="text-zinc-500 hover:text-white transition-colors" />
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            <p>{metric.description}</p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                                <span className="text-xs text-zinc-300">{metric.label}</span>
                                                            </div>
                                                            <Badge variant="outline" className={cn("text-[10px] uppercase font-bold border-0", getStatusColor(metric.status))}>
                                                                {metric.status}
                                                            </Badge>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mt-4 flex gap-2">
                                                    <button className="flex-1 py-2 rounded-lg bg-noble-gold/10 text-noble-gold text-xs font-bold uppercase tracking-wider hover:bg-noble-gold/20 transition-colors border border-noble-gold/20">
                                                        Deploy Support
                                                    </button>
                                                    <button className="flex-1 py-2 rounded-lg bg-white/5 text-zinc-400 text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-colors border border-white/10">
                                                        View Full Profile
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
}
