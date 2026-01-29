import React from 'react';
import { Clock, Zap, Shield, TrendingUp, Users } from 'lucide-react';

export default function SummaryCards() {
    const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);

    const cards = [
        { id: 1, label: 'Hours Automated', val: '14,204', sub: '+12% Efficiency', icon: Clock, color: 'text-indigo-400', insight: 'Automation equivalent to 7 full-time staff.' },
        { id: 2, label: 'Title I Recovered', val: '$84,200', sub: 'Active', icon: Zap, color: 'text-cyan-400', insight: 'Funds reallocated from administrative overhead.' },
        { id: 3, label: 'Compliance Index', val: '99.8%', sub: 'Secure', icon: Shield, color: 'text-emerald-400', insight: '0 FERPA violations detected in 12 months.' },
        { id: 4, label: 'Student Profiles', val: '1,240', sub: 'Synced', icon: Users, color: 'text-pink-400', insight: 'Real-time sync with PowerSchool active.' },
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <div className="h-1 w-1 bg-cyan-500 rounded-full animate-pulse" />
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Daily Pulse (AI Enhanced)</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        onMouseEnter={() => setHoveredCard(card.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        className="relative p-6 rounded-[1.5rem] bg-slate-950/40 backdrop-blur-xl border border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.02] transition-all duration-300 group cursor-pointer overflow-hidden shadow-lg"
                    >
                        {/* Intelligent Hover Reveal */}
                        <div className={`absolute inset-0 bg-slate-950/90 z-20 flex flex-col justify-center p-6 transition-transform duration-300 ${hoveredCard === card.id ? 'translate-y-0' : 'translate-y-full'}`}>
                            <div className="flex items-center gap-2 mb-2 text-cyan-400">
                                <TrendingUp size={16} />
                                <span className="text-[10px] font-black uppercase tracking-widest">AI Insight</span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed font-medium">
                                {card.insight}
                            </p>
                        </div>

                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className={`p-2.5 rounded-xl bg-white/5 ${card.color} border border-white/5`}>
                                <card.icon size={20} />
                            </div>
                            <span className="text-[9px] font-bold text-slate-500 bg-white/5 px-2 py-1 rounded-md border border-white/5 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 transition-colors">{card.sub}</span>
                        </div>
                        <div className="text-3xl font-black text-white relative z-10 tracking-tight">{card.val}</div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest relative z-10 mt-1">{card.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
