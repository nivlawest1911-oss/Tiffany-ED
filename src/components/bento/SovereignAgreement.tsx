'use client';
import { ScrollText, Gavel, ShieldAlert, Cpu, UserCheck, Flame, Scale, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function SovereignAgreement() {
    const [activeSection, setActiveSection] = useState('activation');

    const agreement = [
        {
            id: 'activation',
            title: "Node Activation (Agreement)",
            icon: <Zap className="text-amber-500" size={24} />,
            context: "Activating your Sovereign Node constitutes acceptance of this professional oath.",
            points: [
                "Collaborative Partnership: Usage of the platform creates a Governor-Consul relationship between you and EdIntel.",
                "Professional Capacity: You represent that you are a certified educational professional or authorized district administrator.",
                "Institutional Binding: Site-level activations bind the local school site to these performance standards."
            ]
        },
        {
            id: 'authority',
            title: "Sovereign Authority (Responsibility)",
            icon: <UserCheck className="text-blue-500" size={24} />,
            context: "The AI assists, but you remain the ultimate authority—the Sovereign.",
            points: [
                "The Safety Valve: All AI-generated IEPs, lesson plans, and legal drafts are 'Strategic Scaffolding' and require human review.",
                "Non-Medical/Clinical: EdIntel is a productivity and pedagogical booster, not a clinical diagnostic device.",
                "Administrative Control: District admins maintain the right to verify sub-node usage and compliance."
            ]
        },
        {
            id: 'protocol',
            title: "The Sovereign Protocol (Behavior)",
            icon: <ShieldAlert className="text-red-500" size={24} />,
            context: "Misuse of the node is a violation of the Sovereign Code.",
            points: [
                "Burnout Neutralization: Tools must be used for efficiency and accuracy, not for deceptive automation.",
                "Intellectual Property: Users shall not attempt to reverse engineer the 'Neural Sync' weights or core logic.",
                "Anti-Scraping: Automated harvesting of EdIntel's pedagogical databases is strictly prohibited."
            ]
        },
        {
            id: 'fuel',
            title: "Fuel Model (Economics)",
            icon: <Flame className="text-orange-500" size={24} />,
            context: "Node performance is powered by the Sovereign Token Economy.",
            points: [
                "Subscription Ladder: Tiers (Individual, Site, District) define the volume of concurrently active AI delegates.",
                "Token Usage: Specific high-compute tasks consume 'Fuel Tokens' allocated per billing cycle.",
                "14-Day Pilot: Pilot conversions are eligible for full optimization adjustments within the first 14 days."
            ]
        }
    ];

    return (
        <div className="p-10 rounded-[2.5rem] bg-white text-zinc-900 border border-zinc-200 shadow-3xl relative overflow-hidden group">
            {/* Design Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full" />

            <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-zinc-900 flex items-center justify-center shadow-xl">
                            <Gavel className="text-amber-500" size={28} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black tracking-tighter uppercase italic">Sovereign <span className="text-amber-600">Agreement</span></h2>
                            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Institutional Terms of Use // v2.0.1</p>
                        </div>
                    </div>

                    <div className="flex bg-zinc-100 p-1 rounded-2xl border border-zinc-200">
                        {['activation', 'authority', 'protocol', 'fuel'].map((section) => (
                            <button
                                key={section}
                                onClick={() => setActiveSection(section)}
                                className={`px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all ${activeSection === section ? 'bg-white text-amber-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                            >
                                {section}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left: Interactive Terms */}
                    <div className="lg:col-span-8 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
                        {agreement.map((section) => section.id === activeSection && (
                            <div key={section.id} className="space-y-8">
                                <div className="p-10 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 relative overflow-hidden">
                                    {/* Watermark Icon */}
                                    <div className="absolute -bottom-10 -right-10 opacity-[0.03] rotate-12">
                                        {section.icon}
                                    </div>

                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-3 rounded-2xl bg-white border border-zinc-100 shadow-sm">
                                            {section.icon}
                                        </div>
                                        <h3 className="text-2xl font-black uppercase tracking-tight">{section.title}</h3>
                                    </div>

                                    <p className="text-zinc-500 text-base font-medium leading-relaxed mb-8 italic">"{section.context}"</p>

                                    <div className="space-y-6">
                                        {section.points.map((point, i) => (
                                            <div key={i} className="flex gap-5 group/clause">
                                                <div className="mt-1.5 w-5 h-5 rounded-full bg-white border border-zinc-200 flex items-center justify-center shrink-0">
                                                    <CheckCircle2 className="text-amber-500" size={10} />
                                                </div>
                                                <p className="text-sm text-zinc-700 leading-relaxed font-semibold">{point}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-6">
                                    <button className="px-10 py-5 bg-zinc-900 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 hover:bg-amber-600 shadow-xl active:scale-95">
                                        Accept & Synchronize Node <ArrowRight size={14} />
                                    </button>
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Formal Legal Doc available in Vault</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right: The Liability Guard */}
                    <div className="lg:col-span-4">
                        <div className="p-8 rounded-[2.5rem] bg-amber-50 border border-amber-100 flex flex-col justify-between h-full group/guard">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-700 mb-8 flex items-center gap-2">
                                    <Scale size={14} /> Immunity & Guardrails
                                </h4>
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase text-zinc-900">Limitation of Liability</p>
                                        <p className="text-[9px] text-zinc-600 leading-relaxed font-medium">To the maximum extent permitted by Alabama law, EdIntel's liability is capped at the total 'Fuel' tokens purchased in the last 12 months.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase text-zinc-900">Intellectual Indemnity</p>
                                        <p className="text-[9px] text-zinc-600 leading-relaxed font-medium">Users agree to indemnify EdIntel against pedagogical errors resulting from the failure to review AI-scaffolding.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase text-zinc-900">Dispute Sync</p>
                                        <p className="text-[9px] text-zinc-600 leading-relaxed font-medium">Any conflicts shall be resolved via binding arbitration in the state of residency of the primary district node.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12">
                                <div className="w-full aspect-square rounded-3xl bg-white border border-amber-100 flex flex-col items-center justify-center p-6 text-center">
                                    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
                                        <Cpu className="text-amber-600" size={24} />
                                    </div>
                                    <p className="text-[10px] font-black uppercase mb-1">Algorithmic Integrity</p>
                                    <p className="text-[8px] text-zinc-400 uppercase tracking-widest leading-normal">Our terms protec the integrity of the Sovereign Model from unauthorized calibration or external tampering.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
