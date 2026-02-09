'use client';

import React from 'react';
import { Users, FileText, ArrowRight } from 'lucide-react';

export function BoardRoom() {
    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/5 bg-slate-950/50">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Users className="text-purple-500" /> Executive Board Room
                </h3>
                <button className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
                    View Agenda <ArrowRight className="w-3 h-3" />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors group cursor-pointer">
                        <div className="flex items-start justify-between mb-2">
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                                <FileText className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest">Pending</span>
                        </div>
                        <h4 className="text-sm font-semibold text-slate-200 group-hover:text-white">Q1 Fiscal Projection Review</h4>
                        <p className="text-xs text-slate-500 mt-1">Requires Dr. West's signature.</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
