'use client';

import React from 'react';
import { Mic, Activity } from 'lucide-react';

export default function VoiceLabClient() {
    return (
        <div className="min-h-screen bg-black/90 p-8 pt-24 text-white">
            <header className="mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">
                    <Mic size={12} />
                    <span>Voice Intelligence Protocol</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black mb-4">Voice <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Lab</span></h1>
                <p className="text-slate-400 max-w-2xl">
                    Generate professional voiceovers, clone executive profiles, and translate communications instantly.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Voice Cloning Module */}
                <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden group hover:border-indigo-500/30 transition-all">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <Activity className="text-indigo-400" />
                        Voice Clone Studio
                    </h2>

                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl p-12 bg-black/20">
                        <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4 animate-pulse">
                            <Mic size={32} className="text-indigo-400" />
                        </div>
                        <p className="text-sm font-medium text-slate-300">Upload or Record Voice Sample</p>
                        <p className="text-xs text-slate-500 mt-2">Supports WAV, MP3, M4A (Max 10MB)</p>
                        <button className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-full text-xs font-bold uppercase tracking-widest transition-colors">
                            Initialize Sequence
                        </button>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors cursor-pointer">
                        <h3 className="text-lg font-bold mb-2">Text-to-Speech</h3>
                        <p className="text-xs text-slate-400 mb-4">Convert text to lifelike speech using your active voice profile.</p>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="w-1/3 h-full bg-indigo-500" />
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors cursor-pointer">
                        <h3 className="text-lg font-bold mb-2">Translation</h3>
                        <p className="text-xs text-slate-400 mb-4">Translate audio content into 30+ languages automatically.</p>
                        <div className="flex gap-2">
                            <div className="px-2 py-1 rounded bg-white/10 text-[10px] uppercase">ENG</div>
                            <div className="px-2 py-1 rounded bg-white/10 text-[10px] uppercase">SPA</div>
                            <div className="px-2 py-1 rounded bg-white/10 text-[10px] uppercase">FRA</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
