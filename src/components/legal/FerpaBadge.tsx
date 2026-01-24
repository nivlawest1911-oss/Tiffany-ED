'use client';

import React from 'react';
import { ShieldCheck, Scale } from 'lucide-react';

export const ComplianceBadge = () => {
    return (
        <div className="flex items-center gap-6 p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 text-emerald-400">
                <ShieldCheck size={20} className="drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">FERPA Compliant</span>
            </div>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2 text-emerald-400">
                <Scale size={20} className="drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                <span className="text-[10px] font-black uppercase tracking-widest leading-none">AL Literacy Act Ready</span>
            </div>
        </div>
    );
};
