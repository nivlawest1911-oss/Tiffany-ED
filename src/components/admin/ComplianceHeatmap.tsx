'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Target, AlertCircle } from 'lucide-react';
import { GlassCard } from '@/components/ui/Cinematic';

const DEPARTMENTS = [
    { name: 'Special Education', score: 99.8, status: 'compliant' },
    { name: 'Financial Services', score: 99.4, status: 'compliant' },
    { name: 'Human Resources', score: 98.2, status: 'warning' },
    { name: 'Student Data', score: 99.9, status: 'compliant' },
    { name: 'Curriculum & Instruction', score: 97.5, status: 'warning' },
    { name: 'Communications', score: 99.1, status: 'compliant' },
    { name: 'IT Infrastructure', score: 99.7, status: 'compliant' },
    { name: 'Community Relations', score: 98.8, status: 'compliant' },
];

export function ComplianceHeatmap() {
    return (
        <GlassCard className="p-8 border-white/5 bg-white/[0.01]">
            <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                    <h2 className="text-xl font-black text-white tracking-widest uppercase">Compliance Heatmap</h2>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Cross-Department Policy Alignment</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex flex-col text-right">
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Aggregate Compliance</span>
                        <span className="text-xl font-black text-emerald-400">99.1%</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {DEPARTMENTS.map((dept, i) => (
                    <motion.div
                        key={dept.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative p-4 rounded-xl border border-white/5 bg-white/[0.02] flex flex-col items-center justify-center text-center group cursor-default"
                    >
                        <motion.div 
                            className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity ${
                                dept.status === 'compliant' ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                        />
                        
                        <div className="mb-4 relative">
                            <div className={`h-12 w-12 rounded-full border-2 flex items-center justify-center ${
                                dept.status === 'compliant' ? 'border-emerald-500/20 text-emerald-500' : 'border-amber-500/20 text-amber-500'
                            }`}>
                                <Target size={20} className={dept.status === 'warning' ? 'animate-pulse' : ''} />
                            </div>
                            <div className={`absolute -top-1 -right-1 p-1 rounded-full ${
                                dept.status === 'compliant' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'
                            }`}>
                                {dept.status === 'compliant' ? <ShieldCheck size={10} /> : <AlertCircle size={10} />}
                            </div>
                        </div>

                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1 leading-tight h-8 flex items-center">
                            {dept.name}
                        </span>
                        <span className={`text-lg font-black tracking-tighter ${
                            dept.status === 'compliant' ? 'text-white' : 'text-amber-500'
                        }`}>
                            {dept.score}%
                        </span>

                        {/* Progress bar */}
                        <div className="w-full h-1 bg-white/5 rounded-full mt-4 overflow-hidden">
                            <motion.div 
                                className={`h-full ${dept.status === 'compliant' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${dept.score}%` }}
                                transition={{ delay: i * 0.1 + 0.3, duration: 1 }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex items-center gap-4">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                    <ShieldCheck size={18} />
                </div>
                <p className="text-[10px] font-medium text-emerald-400 uppercase tracking-widest leading-relaxed">
                    All nodes are currently within established sovereign guardrails. No significant policy drift detected in the current epoch.
                </p>
            </div>
        </GlassCard>
    );
}
