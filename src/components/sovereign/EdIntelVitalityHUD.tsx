'use client';

import { ShieldCheck, Zap, Database, Globe } from 'lucide-react';

export default function EdIntelVitalityHUD() {
    const systems = [
        { name: 'Database Pulse', icon: Database, status: 'Active', color: 'text-emerald-400' },
        { name: 'Gemini Intelligence', icon: Zap, status: 'Restored', color: 'text-amber-400' },
        { name: 'Vercel Edge Gateway', icon: Globe, status: 'Synced', color: 'text-blue-400' },
    ];

    return (
        <div className="bg-zinc-950/50 border-b border-amber-500/10 backdrop-blur-xl p-4">
            <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-emerald-500/10 rounded-full">
                        <ShieldCheck className="text-emerald-400 w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-1">System Status</h2>
                        <p className="text-sm text-white font-black italic tracking-tight">EdIntel Handshake Confirmed</p>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                    {systems.map((sys) => (
                        <div key={sys.name} className="flex items-center gap-2 group">
                            <sys.icon size={14} className={`${sys.color} group-hover:scale-110 transition-transform`} />
                            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{sys.name}</span>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${sys.color}`}>{sys.status}</span>
                        </div>
                    ))}
                </div>

                <div className="text-center md:text-right hidden sm:block">
                    <p className="text-[9px] text-zinc-600 font-black uppercase tracking-[0.2em] mb-0.5">Last Diagnostic</p>
                    <p className="text-[10px] text-amber-500 font-mono font-bold tracking-tighter">
                        {new Date().toISOString().slice(0, 16).replace('T', ' ')} CST
                    </p>
                </div>
            </div>
        </div>
    );
}
