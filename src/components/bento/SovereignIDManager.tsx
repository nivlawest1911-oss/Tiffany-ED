'use client';

import { User, Fingerprint, Zap, AlertTriangle, Upload, Trash2, Camera, Settings, Disc } from 'lucide-react';
import React, { useState } from 'react';

export default function SovereignIDManager() {
    const [avatarActive, setAvatarActive] = useState(true);
    const [isCommitting, setIsCommitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState('Standby // Ready for uplink');

    const handleCommit = async () => {
        setIsCommitting(true);
        setStatusMessage('Syncing with Sovereign Node...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsCommitting(false);
        setStatusMessage('Protocol Stabilized // Identity Committed');
        setTimeout(() => setStatusMessage('Standby // Ready for uplink'), 3000);
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-1 bg-gradient-to-br from-zinc-800 to-black rounded-3xl shadow-2xl">
            <div className="bg-zinc-950 rounded-[1.4rem] p-8 relative overflow-hidden">
                {/* Background FX */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/5 blur-[100px] rounded-full pointer-events-none" />

                {/* Header */}
                <div className="flex items-center gap-4 mb-8 border-b border-zinc-800 pb-6">
                    <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                        <Fingerprint className="text-amber-600" size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white tracking-tight uppercase">Sovereign Identity</h2>
                        <p className="text-xs text-zinc-500 font-mono">Nexus Configuration // ID Node #84-A</p>
                    </div>
                </div>

                {/* Avatar Section */}
                <div className="flex flex-col md:flex-row gap-8 items-center mb-10">
                    <div className="relative group">
                        <div className={`w-40 h-40 rounded-3xl border-4 ${avatarActive ? 'border-amber-600' : 'border-zinc-800'} overflow-hidden relative shadow-2xl transition-all duration-500`}>
                            {avatarActive ? (
                                <img
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
                                    alt="Sovereign Architect"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                                    <User size={48} className="text-zinc-700" />
                                </div>
                            )}

                            {/* Scanning Overlay Effect */}
                            {avatarActive && (
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[10px] uppercase font-bold text-white tracking-wider flex items-center gap-2">
                                        <Disc size={12} className="animate-spin" /> Live Node
                                    </span>
                                </div>
                            )}
                        </div>
                        {avatarActive && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-zinc-950 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                            </div>
                        )}
                    </div>

                    <div className="flex-1 space-y-4 w-full md:w-auto">
                        <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
                            <h3 className="text-sm font-bold text-white mb-1">Architect Visualization</h3>
                            <p className="text-[10px] text-zinc-500 leading-relaxed">
                                Your visual signature is broadcast across the Sovereign Network. Maintain a professional Neural Sync representation.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-bold text-xs uppercase hover:bg-zinc-200 transition-colors">
                                <Upload size={14} /> Update Signal
                            </button>
                            <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 font-bold text-xs uppercase hover:text-white hover:border-zinc-700 transition-colors">
                                <Camera size={14} /> Capture
                            </button>
                            <button
                                onClick={() => setAvatarActive(!avatarActive)}
                                className="flex items-center justify-center p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
                                title="Purge Visual ID"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Identity Settings */}
                <div className="space-y-3">
                    <h3 className="text-xs font-black text-zinc-600 uppercase tracking-widest mb-2 px-2">Privacy Protocols</h3>
                    {[
                        { label: "Public Broadcast", desc: "Visible to all Network Nodes", active: true },
                        { label: "District Only", desc: "Restricted to verified local educators", active: false },
                        { label: "Ghost Mode", desc: "Complete visual obfuscation", active: false },
                    ].map((setting, i) => (
                        <div key={i} className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${setting.active ? 'bg-amber-900/10 border-amber-600/30' : 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-700'}`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${setting.active ? 'bg-amber-600 shadow-[0_0_10px_rgba(217,119,6,0.5)]' : 'bg-zinc-700'}`} />
                                <div>
                                    <h4 className={`text-sm font-bold ${setting.active ? 'text-amber-500' : 'text-zinc-400'}`}>{setting.label}</h4>
                                    <p className="text-[10px] text-zinc-500">{setting.desc}</p>
                                </div>
                            </div>
                            {setting.active && <Settings size={14} className="text-amber-600 animate-spin-slow" />}
                        </div>
                    ))}
                </div>

                {/* Footer Action */}
                <div className="mt-8 pt-6 border-t border-zinc-800 flex items-center justify-between">
                    <p className="text-[9px] text-zinc-500 font-mono italic">
                        {statusMessage}
                    </p>
                    <button
                        onClick={handleCommit}
                        disabled={isCommitting}
                        className="px-8 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-amber-900/20 transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                        {isCommitting ? 'Stabilizing...' : <>Commit Protocol <Zap size={14} /></>}
                    </button>
                </div>
            </div>
        </div>
    );
}
