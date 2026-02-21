'use client';

import { motion } from 'framer-motion';
import { FileText, Users, Receipt, ShieldCheck, MessageSquare } from 'lucide-react';

const DOMAINS = [
    { name: "Document Generation", score: 98, icon: FileText, color: "bg-blue-500" },
    { name: "Student Analytics", score: 92, icon: Users, color: "bg-indigo-500" },
    { name: "Media Production", score: 88, icon: MessageSquare, color: "bg-[#D4AF37]" },
    { name: "Grant Writing", score: 95, icon: Receipt, color: "bg-emerald-500" },
    { name: "Compliance", score: 100, icon: ShieldCheck, color: "bg-[#D4AF37]" },
    { name: "Communication", score: 90, icon: MessageSquare, color: "bg-[#D8B4FE]" }
];

export default function DistrictIntelligenceScore() {
    return (
        <div className="flex flex-col h-full bg-transparent w-full">
            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 uppercase tracking-tighter italic">
                <span className="w-2 h-6 bg-primary-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                Intelligence Matrix
            </h3>

            <div className="space-y-6">
                {DOMAINS.map((domain, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <div className="flex justify-between items-end mb-2">
                            <div className="flex items-center gap-2 text-sm text-white/50 font-medium tracking-tight">
                                <domain.icon size={16} className="text-white/40" />
                                {domain.name}
                            </div>
                            <span className="text-sm font-bold text-white">{domain.score}%</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${domain.score}%` }}
                                transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                className={`h-full ${domain.color} shadow-[0_0_15px_rgba(255,255,255,0.2)] rounded-full`}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40">
                    <span>Overall Efficiency</span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded shadow-sm shadow-emerald-500/10">+14.2% This Week</span>
                </div>
            </div>
        </div>
    );
}
