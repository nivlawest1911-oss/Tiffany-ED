'use client';
import { motion } from 'framer-motion';
import { Zap, Lock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function LeadershipCapacity() {
    const { user } = useAuth();

    // Fallbacks if user is null (though parent usually handles this check)
    if (!user) return null;

    const maxUsage = user.tier === 'free' ? 5 : 1000;
    const usage = user.usage_count || 0;
    const remaining = Math.max(0, maxUsage - usage);
    const percentage = Math.min(100, (usage / maxUsage) * 100);

    const isLow = remaining <= 2 && user.tier === 'free';

    return (
        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-xl overflow-hidden relative group">
            <div className="flex items-center justify-between mb-3 relative z-10">
                <div className="flex items-center gap-2">
                    <Zap size={16} className={isLow ? "text-amber-500 animate-pulse" : "text-indigo-500"} />
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">Strategic Capacity</span>
                </div>
                <span className={`font-mono text-xs font-bold ${isLow ? "text-amber-500" : "text-white"}`}>
                    {usage}/{maxUsage === 1000 ? '∞' : maxUsage}
                </span>
            </div>

            {/* Progress Bar Container */}
            <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden mb-3 relative z-10">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    className={`h-full rounded-full ${isLow ? 'bg-amber-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`}
                />
            </div>

            {user.tier === 'free' && (
                <div className="relative z-10">
                    <p className="text-[10px] text-zinc-500 mb-3">
                        {isLow
                            ? "Capacity critical. Upgrade required for uninterrupted synthesis."
                            : "Standard neural throughput active."}
                    </p>

                    {isLow && (
                        <Link href="/pricing" className="flex items-center justify-between w-full p-2 rounded-lg bg-indigo-600/10 border border-indigo-500/30 hover:bg-indigo-600/20 transition-all text-xs font-bold text-indigo-400 group/btn">
                            <span>Boost Capacity</span>
                            <ArrowUpRight size={12} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </Link>
                    )}
                </div>
            )}

            {user.tier !== 'free' && (
                <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-bold uppercase tracking-widest mt-2">
                    <Lock size={10} /> Unlimited Throughput Active
                </div>
            )}

            {/* Background Grain */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
    );
}
