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
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">Live Action Feed</h3>
            <div className="relative border-l border-slate-800 ml-3 space-y-8">
                {actions.map((action) => (
                    <div key={action.id} className="relative pl-8 group cursor-pointer">
                        {/* Timeline Dot */}
                        <div className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full border-2 border-[#0F172A] ${action.type === 'alert' ? 'bg-amber-500' : action.type === 'success' ? 'bg-emerald-500' : 'bg-slate-500'}`} />

                        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 hover:bg-slate-800/60 transition-colors relative overflow-hidden">
                            <div className="flex justify-between items-start mb-1 relative z-10">
                                <h4 className={`text-xs font-bold ${action.color}`}>{action.title}</h4>
                                <span className="text-[9px] text-zinc-600 font-mono">{action.time}</span>
                            </div>
                            <p className="text-xs text-slate-300 leading-relaxed relative z-10">{action.desc}</p>

                            {/* Super Intelligent Action Suggestion */}
                            <div className="mt-3 pt-3 border-t border-slate-700/50 flex gap-2 overflow-hidden h-0 group-hover:h-auto transition-all opacity-0 group-hover:opacity-100">
                                <button
                                    onClick={() => {
                                        console.log(`[Swarm] Dispatching Goal: ${action.title}`);
                                        // In production: await sovereignSwarm.dispatchGoal(`Resolve ${action.title}`);
                                        alert(`Sovereign Swarm dispatched. Supervisor Decomposing Goal: "Resolve ${action.title}"...`);
                                    }}
                                    className="flex-1 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 text-[9px] font-bold uppercase py-1.5 rounded flex items-center justify-center gap-1 border border-indigo-500/20"
                                >
                                    <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
                                    {action.type === 'alert' ? 'Initiate Swarm' : 'View Report'}
                                </button>
                                <button className="flex-1 bg-slate-700/30 hover:bg-slate-700/50 text-slate-400 text-[9px] font-bold uppercase py-1.5 rounded border border-slate-700/50">
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
