'use client';
import { Brain, Zap, Target, BookOpen, Activity, AlertCircle, ChevronRight, Shield as LucideShield, Zap as Lightning } from "lucide-react";

export default function SovereignSkillMatrix() {
    // Sovereign Data Structure replicating CogniFit Cognitive Domains
    const domains = [
        { id: 1, name: "System Logic", score: 685, color: "text-green-500", border: "border-green-500" }, // Reasoning
        { id: 2, name: "Neural Sync", score: 412, color: "text-yellow-500", border: "border-yellow-500" }, // Coordination
        { id: 3, name: "Data Recall", score: 789, color: "text-cyan-500", border: "border-cyan-500" }, // Memory
        { id: 4, name: "Admin Focus", score: 550, color: "text-purple-500", border: "border-purple-500" }, // Attention
        { id: 5, name: "Audit Speed", score: 820, color: "text-amber-600", border: "border-amber-600" }, // Perception
    ];

    const detailedSkills = [
        { id: 1, name: "IEP Compliance", score: 812, type: "strength", desc: "Elite detection of regulatory drifts" },
        { id: 2, name: "Budget Forecasting", score: 756, type: "strength", desc: "High accuracy in token allocation" },
        { id: 3, name: "Conflict Resolution", score: 729, type: "strength", desc: "Automated mediation protocols" },
        { id: 4, name: "Task Delegation", score: 450, type: "weakness", desc: "Sub-optimal avatar utilization" },
        { id: 5, name: "Burnout Sensing", score: 320, type: "weakness", desc: "Staff fatigue metrics ignored" },
        { id: 6, name: "System Updates", score: 512, type: "neutral", desc: "Standard patch cycle adherence" },
    ];

    return (
        <div className="w-full max-w-6xl mx-auto space-y-8">
            {/* Header / Summary Module */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-8 rounded-[2.5rem] bg-zinc-900 border border-zinc-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full pointer-events-none" />
                    <h3 className="text-sm font-black text-green-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <Zap size={16} fill="currentColor" /> Sovereign Strengths
                    </h3>
                    <div className="space-y-4 relative z-10">
                        {detailedSkills.filter(s => s.type === 'strength').map(skill => (
                            <div key={skill.id} className="group">
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-zinc-300 font-bold group-hover:text-white transition-colors">{skill.name}</span>
                                    <span className="text-xl font-black text-white">{skill.score}</span>
                                </div>
                                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[85%]" />
                                </div>
                                <p className="text-[10px] text-zinc-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{skill.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-zinc-900 border border-zinc-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 blur-[80px] rounded-full pointer-events-none" />
                    <h3 className="text-sm font-black text-red-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                        <AlertCircle size={16} /> Critical Calibration
                    </h3>
                    <div className="space-y-4 relative z-10">
                        {detailedSkills.filter(s => s.type === 'weakness').map(skill => (
                            <div key={skill.id} className="group">
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-zinc-300 font-bold group-hover:text-white transition-colors">{skill.name}</span>
                                    <span className="text-xl font-black text-white">{skill.score}</span>
                                </div>
                                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-red-500 w-[35%]" />
                                </div>
                                <p className="text-[10px] text-zinc-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{skill.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Matrix Full View */}
            <div className="p-8 rounded-[2.5rem] bg-black border border-zinc-800 shadow-2xl">
                <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-6">
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-tight">Sovereign Matrix</h2>
                        <p className="text-xs text-zinc-500 font-mono mt-1">Real-time Neural Analysis // Node: Architect West</p>
                    </div>
                    <button className="px-6 py-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-amber-600 text-xs font-bold text-zinc-300 hover:text-white transition-all uppercase tracking-wider">
                        Export Dossier
                    </button>
                </div>

                {/* Domain Donuts */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
                    {domains.map(domain => (
                        <div key={domain.id} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/50 hover:border-zinc-700 transition-all cursor-pointer group">
                            <div className={`w-20 h-20 rounded-full border-4 ${domain.border} flex items-center justify-center mb-3 relative`}>
                                <span className={`text-xl font-black ${domain.color}`}>{domain.score}</span>
                                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                                    {/* Just a visual SVG circle simulation would go here for the donut completeness */}
                                </svg>
                            </div>
                            <h4 className="text-xs font-bold text-zinc-400 group-hover:text-white uppercase tracking-wider">{domain.name}</h4>
                            <p className="text-[9px] text-zinc-600">Max: 800</p>
                        </div>
                    ))}
                </div>

                {/* Global Score & Rank */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {detailedSkills.map(skill => (
                            <div key={skill.id} className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700 group transition-all">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-zinc-800 group-hover:bg-zinc-700 transition-colors`}>
                                    <Activity size={18} className={skill.score > 700 ? "text-green-500" : skill.score < 500 ? "text-red-500" : "text-yellow-500"} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between mb-1">
                                        <h4 className="text-xs font-bold text-zinc-300 group-hover:text-white">{skill.name}</h4>
                                        <span className={`text-xs font-mono font-bold ${skill.score > 700 ? "text-green-500" : skill.score < 500 ? "text-red-500" : "text-yellow-500"}`}>{skill.score}</span>
                                    </div>
                                    <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                                        <div className={`h-full ${skill.score > 700 ? "bg-green-500" : skill.score < 500 ? "bg-red-500" : "bg-yellow-500"}`} style={{ width: `${(skill.score / 850) * 100}%` }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        {/* Current Global Score & Rank Card */}
                        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-b from-amber-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-4">Global Intelligence</h3>
                            <div className="w-32 h-32 rounded-full border-8 border-zinc-800 border-t-amber-600 flex items-center justify-center mb-4 shadow-2xl bg-black relative">
                                <div className="absolute inset-0 rounded-full border-4 border-zinc-900 animate-pulse-slow" />
                                <div className="text-center z-10">
                                    <span className="text-3xl font-black text-white block">685</span>
                                    <span className="text-[9px] text-amber-500 font-bold uppercase tracking-wider">Virtuoso</span>
                                </div>
                            </div>
                            <button className="flex items-center gap-2 text-xs font-bold text-amber-600 hover:text-amber-500 transition-colors uppercase tracking-wider">
                                View Full Analytics <ChevronRight size={12} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
