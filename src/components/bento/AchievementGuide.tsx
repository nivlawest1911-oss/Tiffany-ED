'use client';
import { Target, Trophy, Crown, Star, Shield as LucideShield, Zap, Circle, User } from "lucide-react";

export default function AchievementGuide() {
    const ranks = [
        { id: 1, name: "Beginner", icon: <User />, color: "bg-zinc-600", description: "Getting started. Learning the basics of the platform." },
        { id: 2, name: "Apprentice", icon: <Circle />, color: "bg-yellow-500", description: "Completing first sessions and exploring core tools." },
        { id: 3, name: "Trainee", icon: <Target />, color: "bg-orange-500", description: "Regular participation. Building consistent habits." },
        { id: 4, name: "Virtuoso", icon: <Zap />, color: "bg-green-500", description: "High-level performance. Managing multiple projects effectively." },
        { id: 5, name: "Professional", icon: <Star />, color: "bg-purple-500", description: "Advanced problem solving and leadership development." },
        { id: 6, name: "Elite", icon: <LucideShield />, color: "bg-cyan-500", description: "Demonstrating mastery. Achieving peak performance goals." },
        { id: 7, name: "Expert", icon: <Crown />, color: "bg-red-500", description: "Professional leadership. Guiding others through best practices." },
        { id: 8, name: "Leader", icon: <Trophy />, color: "bg-amber-600", description: "Total mastery of all core leadership tools." },
        { id: 9, name: "Director", icon: <Crown />, color: "bg-gray-400", description: "High-level management and strategic planning." },
        { id: 10, name: "Executive", icon: <Crown />, color: "bg-black", description: "The highest achievement. Unified theory and practice." }
    ];

    const targets = [
        { label: "Performance Output", icon: "⚡", desc: "Total accomplishment credits earned" },
        { label: "Session Volume", icon: "📚", desc: "Number of completed modules and simulations" },
        { label: "Project Depth", icon: "🧠", desc: "Average complexity of tasks completed" },
        { label: "Competency Index", icon: "📊", desc: "Overall performance and growth score" },
        { label: "Professional Network", icon: "🔗", desc: "Active community connections" },
        { label: "Consistency Streak", icon: "⏳", desc: "Regular session attendance reliability" }
    ];

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-zinc-950 border border-zinc-900 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="text-center mb-12 relative z-10">
                <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Achievement Guide</h2>
                <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Leadership Development Pathway</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                {/* Ranks List */}
                <div className="space-y-3">
                    <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Achievement Tiers</h3>
                    {ranks.map((rank) => (
                        <div key={rank.id} className="flex items-center gap-4 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all group">
                            <div className={`w-10 h-10 rounded-lg ${rank.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                {rank.icon}
                            </div>
                            <div>
                                <h4 className="text-sm font-bold text-white group-hover:text-amber-500 transition-colors">{rank.id}. {rank.name}</h4>
                                <p className="text-[10px] text-zinc-500 leading-tight">{rank.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Requirements Panel */}
                <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                        <h3 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-6">Growth Criteria</h3>
                        <p className="text-xs text-zinc-400 mb-6 leading-relaxed">
                            To advance to the next achievement level, you must meet benchmarks in <span className="text-white font-bold">all 6 critical areas</span>.
                        </p>
                        <div className="grid grid-cols-1 gap-3">
                            {targets.map((t, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-zinc-800/50">
                                    <span className="text-lg">{t.icon}</span>
                                    <div>
                                        <p className="text-xs font-bold text-zinc-300">{t.label}</p>
                                        <p className="text-[10px] text-zinc-600">{t.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-900/20 to-black border border-amber-900/30 text-center">
                        <Trophy size={24} className="text-amber-500 mx-auto mb-3" />
                        <h3 className="text-sm font-black text-white uppercase tracking-wider mb-2">Current Status</h3>
                        <p className="text-[10px] text-zinc-400 mb-4">You are currently at level <span className="text-amber-500 font-bold">4. Virtuoso</span></p>
                        <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-600 w-[65%]" />
                        </div>
                        <p className="text-[9px] text-zinc-600 mt-2 font-mono">65% of the way to the next level</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
