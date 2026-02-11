'use client';

import { Users, FileText, School, Cpu } from 'lucide-react';

const STATS = [
    { label: "Educators Served", value: "8,200+", icon: Users },
    { label: "Documents Generated", value: "145k+", icon: FileText },
    { label: "Districts Connected", value: "42", icon: School },
    { label: "AI Tools Available", value: "25+", icon: Cpu }
];

export default function CommunityStats() {
    return (
        <section className="py-20 border-y border-white/5 bg-slate-900/30 backdrop-blur-sm">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-bold text-white">Join Our Growing Community</h2>
                        <p className="text-slate-400 text-sm">Empowering educators with institution-grade intelligence.</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 md:gap-12">
                        {STATS.map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-noble-gold to-noble-gold">
                                    {stat.value}
                                </div>
                                <div className="text-xs text-noble-gold/60 uppercase tracking-widest mt-1 font-bold flex items-center justify-center gap-2">
                                    <stat.icon size={12} />
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
