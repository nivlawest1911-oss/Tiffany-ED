import React from 'react';
import { Clock, Zap, Shield, TrendingUp, Users } from 'lucide-react';

export default function SummaryCards() {
    const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);

    const cards = [
        { id: 1, label: 'Hours Automated', val: '14,204', sub: '+12% Yield', icon: Clock, color: 'text-noble-gold', shadow: 'shadow-noble-gold/20', insight: 'Automation equivalent to 7 full-time staff.' },
        { id: 2, label: 'Capital Recovered', val: '$84,200', sub: 'Verified', icon: Zap, color: 'text-noble-gold', shadow: 'shadow-noble-gold/20', insight: 'Funds reallocated from administrative overhead.' },
        { id: 3, label: 'Compliance Tier', val: 'Level IV', sub: 'Optimal', icon: Shield, color: 'text-noble-gold', shadow: 'shadow-noble-gold/20', insight: '0 FERPA violations detected in 12 months.' },
        { id: 4, label: 'Delegate Profiles', val: '1,240', sub: 'Synced', icon: Users, color: 'text-noble-gold', shadow: 'shadow-noble-gold/20', insight: 'Real-time sync with PowerSchool active.' },
    ];

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <div className="h-1 w-1 bg-noble-gold rounded-full animate-pulse" />
                <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Daily Pulse (Neural Input)</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        onMouseEnter={() => setHoveredCard(card.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        className={`relative p-8 rounded-[2rem] bg-zinc-950/40 backdrop-blur-2xl border border-white/5 hover:border-noble-gold/30 hover:bg-noble-gold/[0.02] transition-all duration-500 group cursor-pointer overflow-hidden shadow-2xl ${card.shadow}`}
                    >
                        {/* Intelligent Hover Reveal */}
                        <div className={`absolute inset-0 bg-zinc-950/95 z-20 flex flex-col justify-center p-8 transition-all duration-500 ease-out ${hoveredCard === card.id ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                            <div className="flex items-center gap-2 mb-3 text-noble-gold">
                                <TrendingUp size={16} />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Neural Insight</span>
                            </div>
                            <p className="text-xs text-zinc-300 leading-relaxed font-semibold">
                                {card.insight}
                            </p>
                        </div>

                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className={`p-3 rounded-2xl bg-white/5 ${card.color} border border-white/5 group-hover:scale-110 transition-transform duration-500`}>
                                <card.icon size={22} />
                            </div>
                            <span className="text-[9px] font-black text-zinc-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/5 group-hover:bg-noble-gold/10 group-hover:text-noble-gold group-hover:border-noble-gold/20 transition-all duration-500 uppercase tracking-widest">{card.sub}</span>
                        </div>
                        <div className="text-4xl font-black text-white relative z-10 tracking-tighter mb-1 italic">{card.val}</div>
                        <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] relative z-10">{card.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
