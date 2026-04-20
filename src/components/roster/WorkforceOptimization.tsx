'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Zap,
    ArrowRightLeft,
    ShieldCheck,
    TrendingUp,
    Activity
} from 'lucide-react';
import { GlassCard } from '@/components/ui/Cinematic';
import { rosterEngine } from '@/lib/RosterEngine';
import { toast } from 'sonner';

export const WorkforceOptimization: React.FC = () => {
    const [analytics, setAnalytics] = useState<any[]>([]);
    const [swarm, setSwarm] = useState<any>(null);
    const [rebalancing, setRebalancing] = useState(false);

    useEffect(() => {
        refreshData();
    }, []);

    const refreshData = () => {
        setAnalytics(rosterEngine.getWorkforceAnalytics());
        setSwarm(rosterEngine.getOptimizationSwarm());
    };

    const handleRebalance = async () => {
        if (!swarm) return;
        setRebalancing(true);

        // Simulating Ledger Lock
        await new Promise(resolve => setTimeout(resolve, 1500));

        const result = rosterEngine.performRebalance(swarm.fromId, swarm.toId, swarm.suggestedMove);

        if (result) {
            toast.success(`Personnel Rebalance Secured: ${result.hash}`, {
                description: `Transferred ${result.transferred} records to ${result.toName}`
            });
            refreshData();
        }

        setRebalancing(false);
    };

    return (
        <div className="space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-[0.2em] md:tracking-[0.3em] mb-4">Personnel Capacity Telemetry</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {analytics.map((staff) => (
                            <GlassCard key={staff.id} className="p-4 md:p-6 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-5 md:opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Users size={32} className="md:w-10 md:h-10" />
                                </div>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-xs font-black text-intel-gold uppercase tracking-widest">{staff.role}</p>
                                        <h3 className="text-lg font-bold text-white">{staff.name}</h3>
                                    </div>
                                    <div className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${staff.status === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400' :
                                        staff.status === 'STRESSED' ? 'bg-orange-500/20 text-orange-400' :
                                            staff.status === 'UNDERUTILIZED' ? 'bg-cyan-500/20 text-cyan-400' :
                                                'bg-emerald-500/20 text-emerald-400'
                                        }`}>
                                        {staff.status}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] uppercase font-black tracking-widest text-slate-400">
                                        <span>Caseload Utilization</span>
                                        <span>{staff.caseloadCount} / {staff.maxCapacity}</span>
                                    </div>
                                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min(staff.loadRatio * 100, 100)}%` }}
                                            className={`h-full ${staff.loadRatio > 1 ? 'bg-rose-500' :
                                                staff.loadRatio > 0.8 ? 'bg-orange-500' :
                                                    'bg-intel-gold'
                                                }`}
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    {staff.specialization.map((spec: string) => (
                                        <span key={spec} className="text-[8px] font-black uppercase tracking-tighter text-slate-500 bg-white/5 px-2 py-1 rounded">
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-lg md:text-xl font-black text-white uppercase tracking-[0.2em] md:tracking-[0.3em] mb-4">Optimization Swarm</h2>
                    <GlassCard className="p-4 md:p-6 border-intel-gold/20 bg-intel-gold/5">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-xl bg-intel-gold/20 text-intel-gold animate-pulse">
                                <Zap size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-white uppercase tracking-widest">Active Intelligence</h3>
                                <p className="text-[10px] text-intel-gold/60 uppercase tracking-widest">Autonomous Rebalancing Engine</p>
                            </div>
                        </div>

                        {swarm ? (
                            <div className="space-y-6">
                                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                                    <p className="text-xs text-slate-300 leading-relaxed italic mb-4">
                                        "{swarm.logic}"
                                    </p>
                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                        <div className="text-rose-400">Stress Detected</div>
                                        <div className="text-intel-gold">{"->"}</div>
                                        <div className="text-emerald-400">Capacity Sync</div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleRebalance}
                                    disabled={rebalancing}
                                    className="w-full py-4 bg-intel-gold text-black rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-all shadow-lg shadow-intel-gold/20 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {rebalancing ? 'Locking Ledger...' : 'Authorize Rebalance'}
                                    {!rebalancing && <ArrowRightLeft size={14} />}
                                </button>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <ShieldCheck size={32} className="mx-auto text-emerald-500/40 mb-4" />
                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Workforce Equilibrium Maintained</p>
                            </div>
                        )}
                    </GlassCard>

                    <GlassCard className="p-4 md:p-6">
                        <div className="flex items-center gap-3 mb-4 text-slate-400">
                            <Activity size={16} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Institutional Efficiency</span>
                        </div>
                        <div className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-1">94.2%</div>
                        <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
                            <TrendingUp size={12} />
                            <span>+2.4% vs last cycle</span>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};
