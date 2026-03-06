'use client';

import React from 'react';
import { Users, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import GlassPanel from '@/components/ui/GlassPanel';

export function BoardRoom() {
    return (
        <GlassPanel className="p-6 h-full">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2 tracking-tight">
                    <Users className="text-amber-400" /> Executive Board Room
                </h3>
                <Link href="/board" className="text-xs font-bold uppercase tracking-wider text-white/50 hover:text-amber-400 flex items-center gap-1 transition-colors duration-300">
                    View Agenda <ArrowRight className="w-3 h-3" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/5 hover:border-amber-400/30 hover:bg-white/10 transition-all duration-300 group cursor-pointer shadow-sm shadow-black/20">
                        <div className="flex items-start justify-between mb-3">
                            <div className="p-2 bg-amber-400/10 border border-amber-400/20 rounded-lg text-amber-400 group-hover:scale-110 group-hover:bg-amber-400/20 transition-all duration-300">
                                <FileText className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] text-white/40 uppercase tracking-widest font-black">Pending</span>
                        </div>
                        <h4 className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">Q1 Fiscal Projection Review</h4>
                        <p className="text-xs text-white/40 mt-1 font-medium">Requires Dr. West's signature.</p>
                    </div>
                ))}
            </div>
        </GlassPanel>
    );
}
