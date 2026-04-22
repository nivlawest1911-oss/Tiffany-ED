'use client';
import { motion } from 'framer-motion';
import { Shield, Zap, Target, TrendingUp, Network } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useIntelligence } from '@/context/IntelligenceContext';

export default function LeadershipMetrics() {
    const { isRescueOneActive } = useIntelligence();
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
                securityRating: isRescueOneActive ? 99.8 : 88,
                strategyResponse: Math.min(100, prev.strategyResponse + (Math.random() * 0.4 - 0.2)),
                impactScore: prev.impactScore
            }));
        }, 3000);
        return () => clearInterval(interval);
    }, [isRescueOneActive]);

    const metricItems = [
        { 
            label: 'System Alignment', 
            value: stats.systemAlignment, 
            icon: Network, 
            color: isRescueOneActive ? 'text-rose-400' : 'text-indigo-400', 
            bg: isRescueOneActive ? 'bg-rose-500/10' : 'bg-indigo-500/10' 
        },
        { 
            label: 'Security Integrity', 
            value: stats.securityRating, 
            icon: Shield, 
            color: isRescueOneActive ? 'text-rose-500' : 'text-emerald-400', 
            bg: isRescueOneActive ? 'bg-rose-500/20' : 'bg-emerald-500/10' 
        },
        { 
            label: 'Strategy Response', 
            value: stats.strategyResponse, 
            icon: Zap, 
            color: isRescueOneActive ? 'text-orange-400' : 'text-amber-400', 
            bg: isRescueOneActive ? 'bg-orange-500/10' : 'bg-amber-500/10' 
        },
        { 
            label: 'Collective Impact', 
            value: stats.impactScore, 
            icon: Target, 
            color: isRescueOneActive ? 'text-rose-600' : 'text-rose-400', 
            bg: isRescueOneActive ? 'bg-rose-500/10' : 'bg-rose-500/10' 
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metricItems.map((item, i) => (
                <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-6 rounded-[2.5rem] bg-[#050505]/40 border transition-all duration-500 group overflow-hidden relative backdrop-blur-xl ${
                        isRescueOneActive ? 'border-rose-500/20 shadow-rose-900/5' : 'border-white/5 hover:border-white/10'
                    }`}
                >
                    {/* Tactical Scan Line (Rescue One) */}
                    {isRescueOneActive && (
                        <motion.div 
                            animate={{ y: [0, 100, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                            className="absolute inset-0 bg-rose-500/5 h-[1px] w-full z-0 pointer-events-none"
                        />
                    )}

                    {/* Background Pattern */}
                    <div className={`absolute top-0 right-0 p-4 opacity-[0.02] group-hover:opacity-[0.06] transition-opacity ${isRescueOneActive ? 'text-rose-500' : ''}`}>
                        <item.icon size={80} />
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                        <div className={`w-8 h-8 rounded-xl ${item.bg} ${item.color} flex items-center justify-center`}>
                            <item.icon size={16} />
                        </div>
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{item.label}</span>
                    </div>

                    <div className="flex items-end justify-between relative z-10">
                        <div className="text-3xl font-black text-white tracking-tighter">
                            {item.value.toFixed(1)}<span className="text-xs text-zinc-600 ml-0.5">%</span>
                        </div>
                        <div className={`flex items-center gap-1 text-[9px] font-black font-mono transition-colors ${isRescueOneActive ? 'text-rose-500' : 'text-emerald-500'} mb-1.5`}>
                            {isRescueOneActive ? 'ACTV' : <TrendingUp size={10} />} {isRescueOneActive ? '999' : '+0.4%'}
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
