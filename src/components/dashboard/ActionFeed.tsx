import React from 'react';
import { Bell, CheckCircle, AlertTriangle, FileText } from 'lucide-react';

export default function ActionFeed() {
    const actions = [
        {
            id: 1,
            type: 'success',
            icon: CheckCircle,
            title: 'New District Signup',
            desc: 'Mobile County District 4 added 14 teachers.',
            time: '2m ago',
            color: 'text-emerald-400'
        },
        {
            id: 2,
            type: 'alert',
            icon: AlertTriangle,
            title: 'Compliance Alert',
            desc: 'IEP audit overdue for Prichard Elementary.',
            time: '14m ago',
            color: 'text-amber-400'
        },
        {
            id: 3,
            type: 'info',
            icon: FileText,
            title: 'Report Generated',
            desc: 'Q1 Financial Optimization Report ready.',
            time: '1h ago',
            color: 'text-blue-400'
        },
        {
            id: 4,
            type: 'info',
            icon: Bell,
            title: 'System Update',
            desc: 'Tavus Phoenix-3 Engine upgraded to v4.0.',
            time: '2h ago',
            color: 'text-purple-400'
        }
    ];

    return (
        <div className="space-y-4">
            <h3 className="text-xs font-bold text-cyan-500/60 uppercase tracking-widest mb-4">Live Action Feed</h3>
            <div className="relative border-l border-indigo-500/20 ml-3 space-y-8">
                {actions.map((action) => (
                    <div key={action.id} className="relative pl-8 group cursor-pointer">
                        {/* Timeline Dot */}
                        <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full border-2 border-[#020617] ${action.type === 'alert' ? 'bg-amber-500 shadow-[0_0_10px_orange]' : action.type === 'success' ? 'bg-cyan-500 shadow-[0_0_10px_cyan]' : 'bg-indigo-500 shadow-[0_0_10px_indigo]'}`} />

                        <div className="p-4 rounded-xl bg-indigo-950/10 border border-indigo-500/10 hover:bg-indigo-900/20 hover:border-cyan-500/30 transition-all relative overflow-hidden backdrop-blur-sm">
                            <div className="flex justify-between items-start mb-1 relative z-10">
                                <h4 className={`text-xs font-black uppercase tracking-tight ${action.color}`}>{action.title}</h4>
                                <span className="text-[9px] text-indigo-400/60 font-mono font-bold">{action.time}</span>
                            </div>
                            <p className="text-xs text-indigo-200/70 leading-relaxed relative z-10 font-medium">{action.desc}</p>

                            {/* Super Intelligent Action Suggestion */}
                            <div className="mt-3 pt-3 border-t border-white/5 flex gap-2 overflow-hidden h-0 group-hover:h-auto transition-all opacity-0 group-hover:opacity-100">
                                <button
                                    onClick={() => {
                                        console.log(`[Swarm] Dispatching Goal: ${action.title}`);
                                        // In production: await sovereignSwarm.dispatchGoal(`Resolve ${action.title}`);
                                        alert(`Sovereign Swarm dispatched. Supervisor Decomposing Goal: "Resolve ${action.title}"...`);
                                    }}
                                    className="flex-1 bg-indigo-500/20 hover:bg-cyan-500/20 text-cyan-400 text-[9px] font-black uppercase py-2 rounded-lg flex items-center justify-center gap-2 border border-cyan-500/20 hover:border-cyan-500/40 transition-all"
                                >
                                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_5px_cyan]" />
                                    {action.type === 'alert' ? 'Initiate Swarm' : 'View Report'}
                                </button>
                                <button className="flex-1 bg-white/5 hover:bg-white/10 text-indigo-300 text-[9px] font-black uppercase py-2 rounded-lg border border-white/5 transition-all">
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
