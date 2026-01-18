'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, TrendingUp, ShieldAlert, FileSearch, ArrowRight, Brain, PieChart, Calculator } from 'lucide-react';

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
                        <span>Capital Recovery</span>
                    </div>
                </div>

                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 group-hover:text-emerald-400 transition-colors">
                    District Budget <br /> <span className="text-zinc-600 group-hover:text-emerald-500 transition-colors">Optimizer</span>
                </h3>

                <p className="text-sm text-zinc-500 leading-relaxed font-medium mb-6">
                    Analyze district-wide spending patterns to identify leakage and recover instructional capital. Sovereign financial intelligence for the modern superintendent.
                </p>

                <div className="space-y-3">
                    {[
                        { icon: PieChart, text: "Spending Variance Analysis" },
                        { icon: ShieldAlert, text: "Compliance Risk Mapping" },
                        { icon: FileSearch, text: "Grant Opportunity Mining" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                            <item.icon size={12} className="text-emerald-500/50" />
                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/5">
                <button className="w-full h-12 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-105 transition-all">
                    <span>Initiate Audit</span>
                    <ArrowRight size={14} />
                </button>
            </div>

            {/* Neural Pattern Ornament */}
            <div className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                <Brain size={120} className="text-emerald-500/10 rotate-12" />
            </div>
        </motion.div>
    );
}
