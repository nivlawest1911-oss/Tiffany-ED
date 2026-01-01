'use client';
import { TrendingUp, DollarSign, Target } from 'lucide-react';

export default function ROISingularityHeader() {
    return (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-2xl relative overflow-hidden">
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Target className="text-emerald-200" size={24} />
                        <h3 className="text-sm font-bold uppercase tracking-widest">Revenue Singularity</h3>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-200">
                        <TrendingUp size={16} />
                        <span className="text-xs font-mono">+247%</span>
                    </div>
                </div>

                <div className="flex items-end gap-2 mb-2">
                    <DollarSign className="text-emerald-200 mb-1" size={32} />
                    <span className="text-5xl font-black tracking-tight">12.8B</span>
                </div>

                <p className="text-xs text-emerald-100 uppercase tracking-wider mb-4">
                    Statewide Revenue Achievement Fund
                </p>

                <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                        <p className="text-lg font-bold">$4.2B</p>
                        <p className="text-[9px] text-emerald-200 uppercase">Allocated</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                        <p className="text-lg font-bold">$3.1B</p>
                        <p className="text-[9px] text-emerald-200 uppercase">Pending</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
                        <p className="text-lg font-bold">$5.5B</p>
                        <p className="text-[9px] text-emerald-200 uppercase">Projected</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
