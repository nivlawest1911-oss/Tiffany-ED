'use client';
import { AuroraCard } from '../flow/AuroraCard';
import { Lock, Server, RefreshCw } from 'lucide-react';
import React from 'react';

export const IntegrationVault = ({ schoolName }: { schoolName: string }) => {
    return (
        <div className="max-w-2xl mx-auto py-12">
            <div className="text-center mb-10">
                <div className="inline-flex p-3 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
                    <Lock className="text-blue-400" size={24} />
                </div>
                <h2 className="text-2xl font-light text-white">Integration <span className="font-bold text-white">Sanctum</span></h2>
                <p className="text-[10px] text-slate-500 uppercase tracking-[0.4em] mt-2">PowerSchool Node: {schoolName}</p>
            </div>

            <AuroraCard>
                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[9px] uppercase tracking-widest text-slate-400 ml-2 font-black">API Endpoint URL</label>
                        <input
                            type="text"
                            placeholder="https://powerschool.mcpss.com"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-blue-500/50 outline-none transition-all placeholder:text-zinc-700"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[9px] uppercase tracking-widest text-slate-400 ml-2 font-black">Client ID</label>
                            <input
                                type="text"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-blue-500/50 outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[9px] uppercase tracking-widest text-slate-400 ml-2 font-black">Client Secret</label>
                            <input
                                type="password"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-blue-500/50 outline-none"
                            />
                        </div>
                    </div>

                    <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl font-black uppercase tracking-widest text-[11px] text-white shadow-[0_10px_30px_rgba(37,99,235,0.2)] hover:shadow-none transition-all">
                        Secure & Synchronize Node
                    </button>
                </form>
            </AuroraCard>
        </div>
    );
};
