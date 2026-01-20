'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Scale, Gavel, UserCheck, ArrowRight, Brain, FileText, Lock } from 'lucide-react';

export default function SpecialEdLawAuditor() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 overflow-hidden hover:border-amber-500/30 transition-all duration-500 h-[400px] flex flex-col justify-between"
        >
            {/* Background Glow */}
            <div className={`absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 blur-[80px] rounded-full transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500">
                        <Scale size={24} />
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[8px] font-black uppercase tracking-widest">
                        <ShieldCheck size={10} />
                        <span>IDEA Compliance</span>
                    </div>
                </div>

                <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4 group-hover:text-amber-400 transition-colors">
                    Special Ed Law <br /> <span className="text-zinc-600 group-hover:text-amber-500 transition-colors">Compliance Auditor</span>
                </h3>

                <p className="text-sm text-zinc-500 leading-relaxed font-medium mb-6">
                    Advanced legal assistance designed to review IEPs and 504 plans for IDEA compliance. Ensure every document is legally sound and instructionally effective.
                </p>

                <div className="space-y-3">
                    {[
                        { icon: Gavel, text: "Legal Standard Verification" },
                        { icon: UserCheck, text: "Parental Rights Validation" },
                        { icon: Lock, text: "Privacy Standards Audit" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs text-zinc-400 font-mono">
                            <item.icon size={12} className="text-amber-500/50" />
                            <span>{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative z-10 pt-6 border-t border-white/5">
                <button className="w-full h-12 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-105 transition-all">
                    <span>Scan for Compliance</span>
                    <ArrowRight size={14} />
                </button>
            </div>

            {/* Strategic Pattern Ornament */}
            <div className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                <FileText size={120} className="text-amber-500/10 rotate-45" />
            </div>
        </motion.div>
    );
}
