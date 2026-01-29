import React from 'react';
import { Clock, Zap, Shield, TrendingUp, Users } from 'lucide-react';

export default function SummaryCards() {
    const [hoveredCard, setHoveredCard] = React.useState<number | null>(null);

    const cards = [
        { id: 1, label: 'Hours Automated', val: '14,204', sub: '+12% Efficiency', icon: Clock, color: 'text-indigo-400', insight: 'Automation equivalent to 7 full-time staff.' },
        { id: 2, label: 'Title I Recovered', val: '$84,200', sub: 'Active', icon: Zap, color: 'text-amber-400', insight: 'Funds reallocated from administrative overhead.' },
        { id: 3, label: 'Compliance Index', val: '99.8%', sub: 'Secure', icon: Shield, color: 'text-emerald-400', insight: '0 FERPA violations detected in 12 months.' },
        { id: 4, label: 'Student Profiles', val: '1,240', sub: 'Synced', icon: Users, color: 'text-blue-400', insight: 'Real-time sync with PowerSchool active.' },
    ];

    return (
        <div className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Daily Pulse (AI Enhanced)</h3>

            {cards.map((card) => (
                <div
                    key={card.id}
                    onMouseEnter={() => setHoveredCard(card.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="relative p-4 rounded-2xl bg-slate-900/50 border border-slate-700 hover:border-[#D4AF37]/50 transition-all duration-300 group cursor-pointer overflow-hidden"
                >
                    {/* Intelligent Hover Reveal */}
                    <div className={`absolute inset-0 bg-slate-800/90 z-20 flex flex-col justify-center p-4 transition-transform duration-300 ${hoveredCard === card.id ? 'translate-y-0' : 'translate-y-full'}`}>
                        <div className="flex items-center gap-2 mb-2 text-[#D4AF37]">
                            <TrendingUp size={16} />
                            <span className="text-[10px] font-black uppercase tracking-widest">AI Insight</span>
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed font-medium">
                            {card.insight}
                        </p>
                    </div>

                    <div className="flex justify-between items-start mb-2 relative z-10">
                        <div className={`p-2 rounded-lg bg-slate-800 ${card.color}`}>
                            <card.icon size={20} />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-800 px-2 py-1 rounded">{card.sub}</span>
                    </div>
                    <div className="text-2xl font-black text-white relative z-10">{card.val}</div>
                    <div className="text-xs text-slate-400 relative z-10">{card.label}</div>
                </div>
            ))}
        </div>
    );
}
