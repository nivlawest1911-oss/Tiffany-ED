'use client';
import { motion } from 'framer-motion';
import { Activity, Shield, Zap, Target, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function LeadershipMetrics() {
    const [stats, setStats] = useState({
        systemAlignment: 94.2,
        securityRating: 88,
        strategyResponse: 76,
        impactScore: 91
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                systemAlignment: Math.min(100, prev.systemAlignment + (Math.random() * 0.1 - 0.05)),
                securityRating: prev.securityRating,
                strategyResponse: Math.min(100, prev.strategyResponse + (Math.random() * 0.2 - 0.1)),
                impactScore: prev.impactScore
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const metricItems = [
        { label: 'System Alignment', value: stats.systemAlignment, icon: Activity, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
        { label: 'Security Rating', value: stats.securityRating, icon: Shield, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        { label: 'Strategy Response', value: stats.strategyResponse, icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10' },
        { label: 'District Impact', value: stats.impactScore, icon: Target, color: 'text-rose-400', bg: 'bg-rose-500/10' },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metricItems.map((item, i) => (
                <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-4 rounded-3xl bg-zinc-900/50 border border-white/5 hover:border-white/10 transition-all group overflow-hidden relative"
                >
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 p-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                        <item.icon size={64} />
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                        <div className={`w-8 h-8 rounded-xl ${item.bg} ${item.color} flex items-center justify-center`}>
                            <item.icon size={16} />
                        </div>
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{item.label}</span>
                    </div>

                    <div className="flex items-end justify-between relative z-10">
                        <div className="text-2xl font-black text-white tracking-tighter">
                            {item.value.toFixed(1)}<span className="text-xs text-zinc-600">%</span>
                        </div>
                        <div className="flex items-center gap-1 text-[8px] font-mono text-emerald-500 mb-1">
                            <TrendingUp size={8} /> +0.4%
                        </div>
                    </div>

                    {/* Mini Progress Bar */}
                    <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className={`h-full ${item.bg.replace('/10', '')}`}
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
