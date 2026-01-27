'use client';
import { Shield as LucideShield, Lock, Eye, FileText, Scale, UserCheck, Database, Globe, ArrowRight, Brain } from "lucide-react";
import { useState, useEffect } from 'react';


function LastAuditDate() {
    const [date, setDate] = useState("SYNCING...");
    useEffect(() => {
        setDate(new Date().toISOString().split('T')[0]);
    }, []);
    return <>{date}</>;
}

export default function PrivacyPolicy() {
    const [activeSection, setActiveSection] = useState('ownership');

    const manifesto = [
        {
            id: 'ownership',
            title: "Data Ownership",
            icon: <LucideShield className="text-emerald-500" size={24} />,
            context: "At EdIntel, we prioritize your complete ownership over your data and professional work.",
            points: [
                "Institutional Ownership: Your educational institution retains full ownership of its account and all generated content.",
                "Non-Commercialization: We never sell student information, teacher profiles, or school-specific data.",
                "Secure Storage: Data is stored using industry-standard AES-256 encryption, accessible only by authorized personnel."
            ]
        },
        {
            id: 'collection',
            title: "Information Collection",
            icon: <Database className="text-blue-500" size={24} />,
            context: "We collect only the information necessary to provide and improve our educational services.",
            points: [
                "Profile Information: Basic professional details (role, specialization) provided during account setup.",
                "Usage Analytics: Anonymized behavioral patterns used to improve platform efficiency and user experience.",
                "Educational Context: Alignment with local policies and educational codes to ensure relevant results."
            ]
        },
        {
            id: 'usage',
            title: "How Information is Used",
            icon: <Brain className="text-purple-500" size={24} />,
            context: "Your data is used to provide personalized support, not just generic features.",
            points: [
                "Professional Personalization: Tailoring IEP drafts and Lesson Plans to match your professional style.",
                "Service Alignment: Cross-referencing content with state educational standards for quality assurance.",
                "Continuous Improvement: De-identified aggregate data helps us refine our educational models."
            ]
        },
        {
            id: 'sharing',
            title: "Sharing & Consent",
            icon: <UserCheck className="text-amber-500" size={24} />,
            context: "Sharing is always a deliberate action taken by you, never automated.",
            points: [
                "Controlled Sharing: Users can explicitly choose to share reports with parents or colleagues.",
                "Privacy Commitment: We do not disclose data to third parties without explicit legal requirement and user notification.",
                "Trusted Infrastructure: We use secure cloud infrastructure to ensure high availability and performance."
            ]
        }
    ];

    return (
        <div className="p-10 rounded-[2.5rem] bg-zinc-950 text-white border border-zinc-900 shadow-3xl relative overflow-hidden group">
            {/* Background Grain/Grid */}
            <div
                className="absolute inset-0 opacity-5"
                style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}
            />

            <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-xl">
                            <Lock className="text-emerald-400" size={28} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black tracking-tighter uppercase italic">Privacy <span className="text-emerald-500">Policy</span></h2>
                            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Professional Data Standards // v1.0.4</p>
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
                                    <FileText size={14} /> Full Privacy Documentation <ArrowRight size={14} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Right: The Ethical Core */}
                    <div className="lg:col-span-5">
                        <div className="p-8 rounded-[2.5rem] bg-zinc-900/30 border border-zinc-800 flex flex-col justify-between h-full relative group/ethics">
                            <div className="absolute inset-0 bg-emerald-600/5 opacity-0 group-hover/ethics:opacity-100 transition-opacity duration-1000" />

                            <div className="relative z-10">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-6">Professional Guarantees</h4>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 shrink-0"><Scale size={18} /></div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase mb-1">CIPA & FERPA Compliance</p>
                                            <p className="text-[9px] text-zinc-500 leading-relaxed">Our platform is engineered for full compliance with individual and institutional student data privacy regulations.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 shrink-0"><Globe size={18} /></div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase mb-1">Regional Data Processing</p>
                                            <p className="text-[9px] text-zinc-500 leading-relaxed">Primary data processing occurs in secure regional cloud infrastructure to ensure localized performance and security.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500 shrink-0"><Eye size={18} /></div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase mb-1">Secure Model Training</p>
                                            <p className="text-[9px] text-zinc-500 leading-relaxed">We do not use private student or institutional files for training public models. Your data remains secure.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 mt-12 p-6 rounded-2xl bg-black/40 border border-zinc-800/50">
                                <p className="text-[10px] font-mono text-emerald-500 mb-2">LAST_AUDIT: <LastAuditDate /></p>
                                <p className="text-[8px] text-zinc-600 uppercase tracking-widest leading-loose">
                                    This policy is a professional commitment to your privacy. By using the EdIntel platform, you agree to these data protection standards.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Sign-off */}
                <div className="mt-12 pt-8 border-t border-zinc-900 flex items-center justify-between opacity-30">
                    <p className="text-[9px] font-mono tracking-widest uppercase">Encryption: AES-256 // TLS 1.3</p>
                    <div className="flex gap-6">
                        <span className="text-[9px] font-mono tracking-widest uppercase">STUDENT DATA PROTECTED</span>
                        <span className="text-[9px] font-mono tracking-widest uppercase">Policy v1.0</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
