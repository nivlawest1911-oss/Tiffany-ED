'use client';
import { ScrollText, Gavel, ShieldAlert, Cpu, UserCheck, Flame, Scale, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function LeadershipAgreement() {
    const [activeSection, setActiveSection] = useState('Terms');

    const agreement = [
        {
            id: 'Terms',
            title: "Account Activation",
            icon: <Zap className="text-amber-500" size={24} />,
            context: "Activating your account constitutes acceptance of these professional terms.",
            points: [
                "Collaborative Partnership: Usage of the platform creates a professional relationship between you and EdIntel.",
                "Professional Capacity: You represent that you are a certified educational professional or authorized district administrator.",
                "Institutional Commitment: Building-level activations commit the local school site to these performance standards."
            ]
        },
        {
            id: 'Responsibility',
            title: "Professional Responsibility",
            icon: <UserCheck className="text-blue-500" size={24} />,
            context: "The AI assists, but you remain the ultimate authority and decision-maker.",
            points: [
                "Human Review: All AI-generated IEPs, lesson plans, and reports provide a foundation and require human review.",
                "Professional Resource: EdIntel is a productivity and educational tool, not a clinical diagnostic device.",
                "Administrative Oversight: District administrators maintain the right to verify account usage and compliance."
            ]
        },
        {
            id: 'Guidelines',
            title: "Usage Guidelines",
            icon: <ShieldAlert className="text-red-500" size={24} />,
            context: "Proper use of the platform is essential to maintaining professional standards.",
            points: [
                "Ethical Use: Tools must be used for efficiency and accuracy, supporting authentic professional work.",
                "Platform Integrity: Users shall not attempt to reverse engineer the core logic or proprietary systems.",
                "Data Protection: Automated harvesting of EdIntel's educational databases is strictly prohibited."
            ]
        },
        {
            id: 'Subscription',
            title: "Subscription Model",
            icon: <Flame className="text-orange-500" size={24} />,
            context: "Platform access is managed through tiered subscription plans.",
            points: [
                "Service Levels: Plans (Individual, Site, District) define the volume of available leadership resources.",
                "Resource Allocation: High-impact tasks are managed according to the service level allocated per billing cycle.",
                "Trial Period: New accounts are eligible for adjustments and optimization within the first 14 days."
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
                            <h2 className="text-3xl font-black tracking-tighter uppercase italic">Leadership <span className="text-amber-600">Agreement</span></h2>
                            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Institutional Terms of Service // v2.0.1</p>
                        </div>
                    </div>

                    <div className="flex bg-zinc-100 p-1 rounded-2xl border border-zinc-200">
                        {agreement.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all ${activeSection === section.id ? 'bg-white text-amber-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                            >
                                {section.id}
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
                                    <button
                                        onClick={() => window.location.href = '/pricing'}
                                        className="px-10 py-5 bg-zinc-900 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 hover:bg-amber-600 shadow-xl active:scale-95">
                                        Accept & Get Started <ArrowRight size={14} />
                                    </button>
                                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Formal Documentation available in Resource Vault</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right: The Liability Guard */}
                    <div className="lg:col-span-4">
                        <div className="p-8 rounded-[2.5rem] bg-amber-50 border border-amber-100 flex flex-col justify-between h-full group/guard">
                            <div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-700 mb-8 flex items-center gap-2">
                                    <Scale size={14} /> Accountability & Guardrails
                                </h4>
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase text-zinc-900">Limitation of Liability</p>
                                        <p className="text-[9px] text-zinc-600 leading-relaxed font-medium">To the maximum extent permitted by law, EdIntel's liability is limited to the service fees paid in the last 12 months.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase text-zinc-900">Professional Indemnity</p>
                                        <p className="text-[9px] text-zinc-600 leading-relaxed font-medium">Users agree to provide final authorization for all AI-assisted content to ensure professional accuracy.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase text-zinc-900">Dispute Resolution</p>
                                        <p className="text-[9px] text-zinc-600 leading-relaxed font-medium">Any conflicts shall be resolved via professional mediation or binding arbitration in the home state of the primary account holder.</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12">
                                <div className="w-full aspect-square rounded-3xl bg-white border border-amber-100 flex flex-col items-center justify-center p-6 text-center">
                                    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
                                        <Cpu className="text-amber-600" size={24} />
                                    </div>
                                    <p className="text-[10px] font-black uppercase mb-1">System Integrity</p>
                                    <p className="text-[8px] text-zinc-400 uppercase tracking-widest leading-normal">Our terms protect the platform's professional standards and prevent unauthorized modification of our leadership models.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
