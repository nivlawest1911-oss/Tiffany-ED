'use client';

import PricingMatrix from '@/components/bento/PricingMatrix';
import HolographicBriefing from '@/components/intelligence/HolographicBriefing';
import { useState } from 'react';
import { CircleDollarSign } from 'lucide-react';

export default function PricingClient() {
    const [showBriefing, setShowBriefing] = useState(false);

    return (
        <main className="content-stage">
            <div className="max-w-7xl mx-auto px-6 pt-12">
                <div className="text-center mb-12">
                    <HolographicBriefing
                        isOpen={showBriefing}
                        onClose={() => setShowBriefing(false)}
                        agentId="strategic"
                        title="Value Capture Protocol"
                        description="I am Keisha Reynolds. We are reviewing the EdIntel capital deployment model. Our $79 per site initiative is designed to provide maximum strategic yield for modern educational districts."
                        briefingSteps={[
                            "Audit existing SaaS expenditure for redundancy.",
                            "Provision site-specific tokens across the administrative cluster.",
                            "Activate the 14-day Professional Pilot with zero friction.",
                            "Scale administrative intelligence as district fidelity increases."
                        ]}
                    />

                    <button
                        onClick={() => setShowBriefing(true)}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-noble-gold/20 bg-noble-gold/5 text-noble-gold text-[9px] font-black uppercase tracking-[0.3em] hover:bg-noble-gold/10 transition-all mb-8"
                    >
                        <CircleDollarSign size={14} className="animate-pulse" />
                        Initialize Value Briefing
                    </button>

                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4 italic">
                        Strategic <span className="text-noble-gold">Investment</span>
                    </h1>
                    <p className="text-zinc-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
                        Precision-engineered for district-wide Identity. Zero hidden costs. Absolute administrative vitality.
                    </p>
                </div>

                <PricingMatrix />
            </div>
        </main>
    );
}
