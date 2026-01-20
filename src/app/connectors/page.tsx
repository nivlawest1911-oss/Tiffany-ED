"use client";

import React from 'react';
import { Share2, Lock, CheckCircle2, Shield, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const INTEGRATIONS = [
    { id: 'google', name: 'Google Workspace', status: 'Available', tier: 'Professional', description: 'Automated IEP syncing and document generation directly to Drive.', color: 'text-blue-500', href: '/connectors/google' },
    { id: 'canvas', name: 'Canvas LMS', status: 'Locked', tier: 'Elite', description: 'Real-time assignment analysis and curriculum alignment.', color: 'text-orange-500', href: '/connectors/canvas' },
    { id: 'clever', name: 'Clever SSO', status: 'Locked', tier: 'District', description: 'Enterprise-grade Single Sign-On and roster synchronization.', color: 'text-blue-400', href: '/connectors/clever' },
    { id: 'powerschool', name: 'PowerSchool', status: 'Locked', tier: 'District', description: 'Direct gradebook integration and attendance correlation.', color: 'text-indigo-400', href: '/connectors/powerschool' },
];

export default function ConnectorHub() {
    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans selection:bg-zinc-800">
            <header className="mb-12 border-b border-zinc-800 pb-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-2">Strategic Connectors</h1>
                        <p className="text-zinc-500 tracking-widest text-xs uppercase">Amplify Leadership Through Data Integration</p>
                    </div>
                    <Link href="/dashboard" className="text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                        Return to Command
                    </Link>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {INTEGRATIONS.map((app) => (
                    <div key={app.id} className="group relative bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-zinc-500 transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-900/50">
                        <div className="flex justify-between items-start mb-8">
                            <div className={`p-4 bg-zinc-800 rounded-xl group-hover:bg-white group-hover:text-black transition-colors duration-300 ${app.color}`}>
                                <Share2 size={28} strokeWidth={1.5} />
                            </div>
                            {app.status === 'Locked' ? (
                                <div className="flex items-center gap-2 px-3 py-1 bg-zinc-950 rounded-full border border-zinc-800">
                                    <Lock size={12} className="text-zinc-500" />
                                    <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Locked</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 px-3 py-1 bg-green-950/30 rounded-full border border-green-900/50">
                                    <CheckCircle2 size={12} className="text-emerald-500" />
                                    <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-wider">Active</span>
                                </div>
                            )}
                        </div>

                        <div className="mb-6">
                            <h3 className="text-2xl font-bold mb-2 tracking-tight">{app.name}</h3>
                            <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">{app.tier} Protocol</p>
                        </div>

                        <p className="text-zinc-400 text-sm leading-relaxed mb-8 h-12">
                            {app.description}
                        </p>

                        <div className="flex flex-col gap-3">
                            {app.status === 'Locked' ? (
                                <button className="w-full py-4 bg-zinc-950 text-zinc-300 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-black border border-zinc-800 hover:border-white transition-all duration-300 flex items-center justify-center gap-2">
                                    <Shield size={14} />
                                    Initialize Upgrade
                                </button>
                            ) : (
                                <button className="w-full py-4 border border-zinc-800 bg-zinc-900/50 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded-xl cursor-default flex items-center justify-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                    System Synced
                                </button>
                            )}

                            <Link href={app.href} className="w-full py-3 text-center text-zinc-600 text-[9px] font-bold uppercase tracking-[0.2em] hover:text-white transition-colors">
                                View Integration Docs
                            </Link>
                        </div>
                    </div>
                ))}

                {/* Call to Action for Enterprise */}
                <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 p-8 rounded-2xl flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-4 text-amber-500">
                            <AlertCircle size={20} />
                            <span className="text-xs font-bold uppercase tracking-widest">District Wide Access</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 text-white">Need Custom Integration?</h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Deploy the Professional Connector Hub across your entire district with custom SSO and SIS mapping. White-label options available for large-scale deployments.
                        </p>
                    </div>
                    <button className="w-full mt-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-amber-500 hover:text-white transition-all duration-300">
                        Contact Professional Sales
                    </button>
                </div>
            </div>
        </div>
    );
}
