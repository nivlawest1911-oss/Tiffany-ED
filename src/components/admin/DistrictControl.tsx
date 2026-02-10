'use client';
import { AuroraCard } from '../flow/AuroraCard';
import { Download, Globe, CheckCircle } from 'lucide-react';
import { generateDistrictAudit } from '@/lib/district-audit';
import React from 'react';

export const DistrictControl = ({ districtName, schools }: any) => {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-light text-white">District <span className="font-bold text-white">Command</span></h2>
                    <p className="text-[10px] text-emerald-500 uppercase tracking-widest font-black">Node: {districtName}</p>
                </div>
                <button
                    onClick={() => generateDistrictAudit(districtName, schools)}
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-emerald-500 hover:text-black transition-all"
                >
                    <Download size={14} /> Export EdIntel Ledger
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {schools.map((school: any) => (
                    <AuroraCard key={school.id}>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-sm font-black uppercase text-white">{school.name}</h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <CheckCircle size={12} className="text-emerald-500" />
                                    <span className="text-[9px] text-slate-400 uppercase font-bold">PowerSchool Sync: ACTIVE</span>
                                </div>
                            </div>
                            <Globe className="text-blue-400/30" size={24} />
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="p-3 bg-black/20 rounded-xl border border-white/5">
                                <p className="text-[8px] text-slate-500 uppercase font-black">Energy Reserve</p>
                                <p className="text-lg font-black text-white">{school.vault_balance} U</p>
                            </div>
                            <div className="p-3 bg-black/20 rounded-xl border border-white/5">
                                <p className="text-[8px] text-slate-500 uppercase font-black">Compliance Score</p>
                                <p className="text-lg font-black text-emerald-400">98%</p>
                            </div>
                        </div>
                    </AuroraCard>
                ))}
            </div>
        </div>
    );
};
