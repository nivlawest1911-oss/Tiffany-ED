'use client';
import { Shield as LucideShield, Lock, Eye, FileText, Scale, UserCheck, Database, Globe, ArrowRight, Zap, Brain } from "lucide-react";
import { useState, useEffect } from 'react';


function LastAuditDate() {
    const [date, setDate] = useState("SYNCING...");
    useEffect(() => {
        setDate(new Date().toISOString().split('T')[0]);
    }, []);
    return <>{date}</>;
}

export default function SovereignPrivacyManifesto() {
    const [activeSection, setActiveSection] = useState('ownership');

    const manifesto = [
        {
            id: 'ownership',
            title: "Data Sovereignty & Ownership",
            icon: <LucideShield className="text-emerald-500" size={24} />,
            context: "In the EdIntel ecosystem, we replace 'User Control' with 'Absolute Sovereignty'.",
            points: [
                "District Ownership: The educational institution owns its individual AI node and all generated intelligence.",
                "Non-Commercialization: We never sell student PII, teacher profiles, or district-specific cognitive data.",
                "The Vault Principle: Data resides in an AES-256 encrypted Sovereign Vault, accessible only by verified district personnel."
            ]
        },
        {
            id: 'collection',
            title: "Intelligence Collection",
            icon: <Database className="text-blue-500" size={24} />,
            context: "We collect only what is necessary to fuel your Sovereign Delegate.",
            points: [
                "Profile Data: Synthesis inputs (role, specialization) provided during avatar creation.",
                "Usage Logs: Anonymized behavioral patterns used to optimize Neural Sync difficulty.",
                "Institutional Context: District policies and Alabama Education Code ingestion for legal alignment."
            ]
        },
        {
            id: 'usage',
            title: "How Intelligence is Used",
            icon: <Brain className="text-purple-500" size={24} />,
            context: "Your data is used to synthesize authority, not just features.",
            points: [
                "Cognitive Personalization: Adjusting IEP drafts and Lesson Plans based on your unique pedagogical style.",
                "Legal Protection: Cross-referencing actions with state mandates to identify vulnerabilities.",
                "Research & Optimization: De-identified aggregate data fuels our local LLM improvements."
            ]
        },
        {
            id: 'sharing',
            title: "Hierarchy of Consent",
            icon: <UserCheck className="text-amber-500" size={24} />,
            context: "Sharing is a directed action, never an automated leakage.",
            points: [
                "Directed Sharing: Users can explicitly share reports with parents or board members.",
                "Transparency promise: We will never disclose data to legal authorities without a fight and immediate user notification.",
                "Service Providers: Only essential infrastructure (like HeyGen for visual synthesis) receives directed inputs."
            ]
        }
    ];

    return (
        <div className="p-10 rounded-[2.5rem] bg-zinc-950 text-white border border-zinc-900 shadow-3xl relative overflow-hidden group">
            {/* Background Grain/Grid */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />

            <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-xl">
                            <Lock className="text-emerald-400" size={28} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black tracking-tighter uppercase italic">Sovereign <span className="text-emerald-500">Privacy Manifesto</span></h2>
                            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Sovereign Data Residency // v1.0.4</p>
                        </div>
                    </div>

                    <div className="flex gap-2 p-1 bg-zinc-900 rounded-2xl border border-zinc-800">
                        {['ownership', 'collection', 'usage', 'sharing'].map((section) => (
                            <button
                                key={section}
                                onClick={() => setActiveSection(section)}
                                className={`px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all ${activeSection === section ? 'bg-emerald-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                            >
                                {section}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left: Active Sidebar Content */}
                    <div className="lg:col-span-7 space-y-8 animate-in fade-in slide-in-from-left-8 duration-500">
                        {manifesto.map((section) => section.id === activeSection && (
                            <div key={section.id} className="space-y-6">
                                <div className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                                            {section.icon}
                                        </div>
                                        <h3 className="text-xl font-black uppercase tracking-tight">{section.title}</h3>
                                    </div>
                                    <p className="text-zinc-400 text-sm italic font-medium leading-relaxed mb-6">"{section.context}"</p>

                                    <div className="space-y-4">
                                        {section.points.map((point, i) => (
                                            <div key={i} className="flex gap-4 group/point hover:translate-x-1 transition-transform">
                                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                                <p className="text-xs text-zinc-300 leading-relaxed font-medium">{point}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button className="px-8 py-4 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-500 border border-emerald-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3">
                                    <FileText size={14} /> Full Legal Documentation <ArrowRight size={14} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Right: The Ethical Core */}
                    <div className="lg:col-span-5">
                        <div className="p-8 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800 flex flex-col justify-between h-full relative group/ethics">
                            <div className="absolute inset-0 bg-emerald-600/5 opacity-0 group-hover/ethics:opacity-100 transition-opacity duration-1000" />

                            <div className="relative z-10">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-6">Sovereign Guarantees</h4>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 shrink-0"><Scale size={18} /></div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase mb-1">CIPA & FERPA Core</p>
                                            <p className="text-[9px] text-zinc-500 leading-relaxed">Engineered for full compliance with the Children’s Internet Protection Act and Student Data Privacy.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 shrink-0"><Globe size={18} /></div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase mb-1">State Data Residency</p>
                                            <p className="text-[9px] text-zinc-500 leading-relaxed">Primary processing occurs in the user's regional cloud node to ensure localized data sovereignty.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 shrink-0"><Eye size={18} /></div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase mb-1">Zero Blind Training</p>
                                            <p className="text-[9px] text-zinc-500 leading-relaxed">We do not use your private district files to train public models. Local stays local.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 mt-12 p-6 rounded-2xl bg-black/40 border border-zinc-800/50">
                                <p className="text-[10px] font-mono text-emerald-500 mb-2">LAST_AUDIT: <LastAuditDate /></p>
                                <p className="text-[8px] text-zinc-600 uppercase tracking-widest leading-loose">
                                    This manifesto is legally binding for all EdIntel Nodes. By initializing your Sovereignty Pilot, you enter an agreement of mutual intelligence protection.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Sign-off */}
                <div className="mt-12 pt-8 border-t border-zinc-900 flex items-center justify-between opacity-30">
                    <p className="text-[9px] font-mono tracking-widest uppercase">Encryption: AES-256 // TLS 1.3</p>
                    <div className="flex gap-6">
                        <span className="text-[9px] font-mono tracking-widest uppercase">AL-CODE PROTECTED</span>
                        <span className="text-[9px] font-mono tracking-widest uppercase">Manifesto v1.0</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
