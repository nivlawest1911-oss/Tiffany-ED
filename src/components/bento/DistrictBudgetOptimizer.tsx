'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShieldAlert, FileSearch, ArrowRight, Brain, PieChart, Calculator } from 'lucide-react';

export default function DistrictBudgetOptimizer() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 overflow-hidden hover:border-emerald-500/30 transition-all duration-500 h-[400px] flex flex-col justify-between"
        >
            {/* Background Glow */}
            <div className={`absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        <Calculator size={24} />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] font-black uppercase tracking-widest">
                        <TrendingUp size={10} />
                        <span>Budget Analysis</span>
                    </div>
                </div>

                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 group-hover:text-emerald-400 transition-colors">
                    District Budget <br /> <span className="text-zinc-600 group-hover:text-emerald-500 transition-colors">Optimizer</span>
                </h3>

                <p className="text-sm text-zinc-500 leading-relaxed font-medium mb-6">
                    Analyze district spending patterns to identify savings and optimize resource allocation. Data-driven financial insights for educational leadership.
                </p>

                <div className="space-y-3">
                    {[
                        { icon: PieChart, text: "Spending Variance Analysis" },
                        { icon: ShieldAlert, text: "Strategic Planning" },
                        { icon: FileSearch, text: "Grant Resource Discovery" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                            <item.icon size={12} className="text-emerald-500/50" />
                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/5">
                <button className="w-full h-12 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-105 transition-all relative overflow-hidden group">
                    <span className="relative z-10 group-hover:opacity-0 transition-opacity flex items-center gap-2">
                        <span>Analyze Budget</span>
                        <ArrowRight size={14} />
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-emerald-500 text-white font-black">
                        INITIATE FISCAL SCAN
                    </span>
                </button>
            </div>

            {/* Strategic Pattern Ornament */}
            <div className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                <Brain size={120} className="text-emerald-500/10 rotate-12" />
            </div>
        </motion.div>
    );
}
