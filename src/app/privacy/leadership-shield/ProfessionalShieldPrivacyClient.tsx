import React from 'react';
import { Shield, Lock, FileText, Server, Eye } from 'lucide-react';

export default function ProfessionalShieldPrivacyClient() {
    return (
        <main className="content-stage">
            <div className="max-w-4xl mx-auto py-12">

                <header className="mb-20 border-b border-zinc-800 pb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <Shield className="w-12 h-12 text-white" strokeWidth={1} />
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Professional Shield</h1>
                    </div>
                    <p className="text-zinc-500 tracking-[0.2em] uppercase text-sm font-bold">
                        Data Privacy & Alabama Compliance Protocol
                    </p>
                </header>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold mb-6 text-white uppercase tracking-tight flex items-center gap-3">
                        <Lock className="w-6 h-6 text-zinc-500" />
                        Statement of Leadership
                    </h2>
                    <div className="prose prose-invert max-w-none text-zinc-300 leading-loose">
                        <p className="text-lg font-light border-l-2 border-white pl-6 mb-8 italic">
                            "Leadership over Data is the foundation of Educational Liberty."
                        </p>
                        <p>
                            EdIntel Professional is constructed upon a non-negotiable principle: <strong>Your data remains your jurisdiction.</strong> We do not traffic in student information, nor do we compromise the integrity of the educational environment for commercial gain. Our infrastructure is engineered to meet the strictest compliance standards required by the State of Alabama and Federal Law.
                        </p>
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                    <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl">
                        <FileText className="w-8 h-8 text-white mb-4" />
                        <h3 className="text-xl font-bold mb-3">FERPA & SOPPA Compliance</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            EdIntel Professional is engineered to meet and exceed the Family Educational Rights and Privacy Act (FERPA) standards. We do not store personally identifiable student information (PII) on public servers. All ephemeral data processing occurs within isolated contexts.
                        </p>
                    </div>

                    <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl">
                        <Server className="w-8 h-8 text-white mb-4" />
                        <h3 className="text-xl font-bold mb-3">Alabama Regional Silo</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            All data processed for Mobile County and Alabama districts is hosted within the <strong>Google Cloud Platform (GCP) Alabama/US-East regional silos</strong>. Your data never leaves domestic jurisdiction.
                        </p>
                    </div>

                    <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl">
                        <Eye className="w-8 h-8 text-white mb-4" />
                        <h3 className="text-xl font-bold mb-3">The "Zero-Training" Promise</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            We utilize enterprise-grade API "Zero-Retention" protocols. Your district's proprietary data and teacher inquiries are <strong>never</strong> used to train public Large Language Models (LLMs).
                        </p>
                    </div>

                    <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl">
                        <Shield className="w-8 h-8 text-white mb-4" />
                        <h3 className="text-xl font-bold mb-3">Independent Data Partitioning</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Each district is assigned a unique, encrypted "Center Partition," ensuring that your intelligence capital remains your own. Cross-district data leakage is architecturally impossible.
                        </p>
                    </div>
                </div>

                <footer className="text-center border-t border-zinc-800 pt-12">
                    <p className="text-zinc-600 text-xs uppercase tracking-widest mb-4">
                        Verified by Professional Systems Architecture
                    </p>
                    <div className="flex justify-center gap-6 text-zinc-500 text-sm">
                        <span>VPAT Compliant</span>
                        <span>•</span>
                        <span>Section 508 Ready</span>
                        <span>•</span>
                        <span>GCP Secured</span>
                    </div>
                </footer>

            </div>
        </main>
    );
}
