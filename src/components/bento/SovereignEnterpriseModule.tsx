'use client';

import { Facebook, Globe, Laptop, BookOpen, Brain, Briefcase, ExternalLink, Leaf, Shield } from 'lucide-react';
import React from 'react';

export default function SovereignEnterpriseModule() {
    return (
        <div className="w-full max-w-5xl mx-auto space-y-8">
            {/* Enterprise Identity Card */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-950 border border-zinc-800 shadow-2xl group">
                {/* Dynamic Background */}
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity duration-1000 grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-r from-teal-950/90 via-zinc-950/90 to-transparent" />

                <div className="relative z-10 p-8 md:p-12 flex flex-col justify-end min-h-[400px]">
                    <div className="mb-auto flex justify-between items-start">
                        <div className="bg-teal-900/30 backdrop-blur-md border border-teal-500/30 p-2 rounded-xl flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
                                <Shield size={20} className="text-white" />
                            </div>
                            <span className="text-[10px] uppercase font-bold text-teal-300 tracking-[0.2em] pr-2">Sovereign Enterprise Node</span>
                        </div>
                        <a href="https://www.facebook.com/TranscendSo/" target="_blank" className="p-3 rounded-full bg-white/10 hover:bg-teal-500 text-white transition-colors backdrop-blur-sm border border-white/10">
                            <Facebook size={20} />
                        </a>
                    </div>

                    <div className="max-w-2xl space-y-6">
                        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none uppercase">
                            Transcend <span className="text-teal-500">Holistic</span><br />
                            Business Solutions
                        </h1>
                        <div className="flex flex-col gap-2 border-l-4 border-teal-500 pl-6 py-2">
                            <p className="text-xl font-bold text-zinc-200">Academic, Business & Cognitive Architecture</p>
                            <p className="text-sm font-mono text-zinc-400">Led by Dr. Alvin West, Jr. (Ph.D., MBA, DBA)</p>
                        </div>

                        <div className="flex flex-wrap gap-3 pt-4">
                            {[
                                { label: "Global Consulting", icon: Globe },
                                { label: "Cognitive Fitness", icon: Brain },
                                { label: "Academic Finance", icon: BookOpen },
                            ].map((tag, i) => (
                                <span key={i} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900/50 border border-zinc-700 text-xs font-bold text-zinc-300 uppercase tracking-wider backdrop-blur-sm hover:border-teal-500 hover:text-white transition-colors cursor-default">
                                    <tag.icon size={12} className="text-teal-500" /> {tag.label}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Consulting */}
                <div className="p-6 rounded-[2rem] bg-zinc-900 border border-zinc-800 hover:border-teal-600 transition-all group cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-600/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-teal-600/20 transition-colors" />
                    <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-zinc-400 group-hover:text-teal-500 group-hover:bg-zinc-950 shadow-xl">
                        <Briefcase size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Enterprise Consulting</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                        Global independent financial strategies and business leadership mentorship.
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-teal-600 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                        View Portfolio <ExternalLink size={10} />
                    </div>
                </div>

                {/* Card 2: Cognitive */}
                <div className="p-6 rounded-[2rem] bg-zinc-900 border border-zinc-800 hover:border-amber-600 transition-all group cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-600/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-amber-600/20 transition-colors" />
                    <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-zinc-400 group-hover:text-amber-500 group-hover:bg-zinc-950 shadow-xl">
                        <Brain size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Cognitive Fitness</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                        Specialized neural calibration programs and holistic wellness products.
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-amber-600 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                        Access Modules <ExternalLink size={10} />
                    </div>
                </div>

                {/* Card 3: Academic */}
                <div className="p-6 rounded-[2rem] bg-zinc-900 border border-zinc-800 hover:border-blue-600 transition-all group cursor-pointer relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-blue-600/20 transition-colors" />
                    <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-zinc-400 group-hover:text-blue-500 group-hover:bg-zinc-950 shadow-xl">
                        <Laptop size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Ed-Tech Solutions</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed mb-4">
                        Instructional administration and special education compliance auditing.
                    </p>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-blue-600 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                        System Audit <ExternalLink size={10} />
                    </div>
                </div>
            </div>

            {/* Contact Matrix */}
            <div className="p-1 rounded-3xl bg-gradient-to-r from-zinc-800 to-zinc-900">
                <div className="bg-zinc-950 rounded-[1.4rem] p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex w-16 h-16 rounded-full bg-teal-900/20 border border-teal-500/20 items-center justify-center">
                            <Leaf size={24} className="text-teal-500" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Initiate Direct Outreach</h3>
                            <p className="text-xs text-zinc-500 font-mono mt-1">
                                dralvinwest@transcendholisticwellness.com  //  +1 251-616-8594
                            </p>
                        </div>
                    </div>
                    <a href="http://www.transcendholisticwellness.com/" target="_blank" className="px-8 py-3 rounded-xl bg-white text-black hover:bg-teal-500 hover:text-white transition-colors font-bold text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer shadow-lg shadow-white/5">
                        Visit Official Nexus <ExternalLink size={12} />
                    </a>
                </div>
            </div>
        </div>
    );
}
