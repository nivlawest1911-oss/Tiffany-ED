'use client';

import React from 'react';
import { Share2, Lock, CheckCircle2, Shield, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const INTEGRATIONS = [
    { id: 'google', name: 'Google Workspace', status: 'Available', tier: 'Professional', description: 'Automated IEP syncing and document generation directly to Drive.', color: 'text-blue-500', href: '/connectors/google' },
    { id: 'canvas', name: 'Canvas LMS', status: 'Locked', tier: 'Elite', description: 'Real-time assignment analysis and curriculum alignment.', color: 'text-orange-500', href: '/connectors/canvas' },
    { id: 'clever', name: 'Clever SSO', status: 'Locked', tier: 'District', description: 'Enterprise-grade Single Sign-On and roster synchronization.', color: 'text-blue-400', href: '/connectors/clever' },
    { id: 'powerschool', name: 'PowerSchool', status: 'Locked', tier: 'District', description: 'Direct gradebook integration and attendance correlation.', color: 'text-indigo-400', href: '/connectors/powerschool' },
];

export default function ConnectorHubClient() {
    return (
        <div className="min-h-screen text-white selection:bg-intel-gold/20">
            <div className="mb-12 relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-intel-gold/50" />
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase mb-4 text-gold-gradient">Connector Hub</h1>
                <p className="text-zinc-500 tracking-[0.3em] text-[10px] font-black uppercase">Neural Synchronization // Direct SIS Integration</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {INTEGRATIONS.map((app) => (
                    <div key={app.id} className="glass-panel group relative p-10 rounded-2xl border border-intel-gold/10 hover:border-intel-gold/30 transition-all duration-500 overflow-hidden">
                        {/* Background subtle glow */}
                        <div className="absolute inset-0 bg-intel-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[50px] -z-10" />

                        <div className="flex justify-between items-start mb-10">
                            <div className="p-5 bg-intel-gold/10 border border-intel-gold/20 rounded-2xl group-hover:bg-intel-gold group-hover:text-black transition-all duration-500 text-intel-gold">
                                <Share2 size={32} strokeWidth={1.5} />
                            </div>
                            {app.status === 'Locked' ? (
                                <div className="flex items-center gap-2 px-4 py-1.5 bg-black/40 rounded-full border border-white/5 backdrop-blur-md">
                                    <Lock size={10} className="text-zinc-500" />
                                    <span className="text-[9px] uppercase font-black text-zinc-500 tracking-widest">Locked</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 px-4 py-1.5 bg-intel-gold/10 rounded-full border border-intel-gold/30 backdrop-blur-md">
                                    <CheckCircle2 size={10} className="text-intel-gold" />
                                    <span className="text-[9px] uppercase font-black text-intel-gold tracking-widest">Active</span>
                                </div>
                            )}
                        </div>

                        <div className="mb-8">
                            <h3 className="text-3xl font-black mb-2 tracking-tight uppercase italic">{app.name}</h3>
                            <div className="flex items-center gap-2">
                                <div className="w-1 h-3 bg-intel-gold/40" />
                                <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-black">{app.tier} Protocol</p>
                            </div>
                        </div>

                        <p className="text-zinc-400 text-sm leading-relaxed mb-10 h-16 italic font-light">
                            "{app.description}"
                        </p>

                        <div className="flex flex-col gap-4">
                            {app.status === 'Locked' ? (
                                <button className="w-full py-4 bg-zinc-900/50 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-intel-gold hover:text-black border border-intel-gold/20 hover:border-intel-gold transition-all duration-300 flex items-center justify-center gap-2">
                                    <Shield size={14} />
                                    Authorize Node
                                </button>
                            ) : (
                                <button className="w-full py-4 bg-intel-gold/10 text-intel-gold text-[10px] font-black uppercase tracking-widest rounded-xl cursor-default flex items-center justify-center gap-2 border border-intel-gold/30">
                                    <div className="w-2 h-2 rounded-full bg-intel-gold animate-pulse shadow-[0_0_8px_rgba(197,164,126,0.6)]"></div>
                                    Synchronized
                                </button>
                            )}

                            <Link href={app.href} className="w-full py-3 text-center text-zinc-600 text-[9px] font-black uppercase tracking-[0.3em] hover:text-intel-gold transition-colors">
                                View Technical Docs // 01
                            </Link>
                        </div>
                    </div>
                ))}

                {/* Call to Action for Enterprise */}
                <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-gradient-to-br from-intel-gold/20 to-transparent border border-intel-gold/20 p-10 rounded-2xl flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-intel-gold/10 blur-[100px] rounded-full group-hover:bg-intel-gold/20 transition-all duration-1000" />

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6 text-intel-gold">
                            <div className="p-2 bg-intel-gold/10 rounded">
                                <AlertCircle size={20} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest">Enterprise Access</span>
                        </div>
                        <h3 className="text-3xl font-black mb-6 text-white uppercase tracking-tighter leading-tight italic">Custom Integration Bundle</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed italic font-light">
                            Deploy the Professional Connector Hub across your entire district with custom SSO and SIS mapping. White-label options available for large-scale deployments.
                        </p>
                    </div>
                    <button className="relative z-10 w-full mt-12 py-5 bg-intel-gold text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all duration-500 shadow-[0_10px_30px_rgba(197,164,126,0.2)]">
                        Contact Professional Sales
                    </button>
                </div>
            </div>
        </div>
    );
}
