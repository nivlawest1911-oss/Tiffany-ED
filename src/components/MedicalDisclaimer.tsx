'use client';
import { AlertCircle } from 'lucide-react';

export default function MedicalDisclaimer() {
    return (
        <div className="w-full bg-[#0A0A0B]/80 border-t border-red-900/10 backdrop-blur-md py-4 transition-all hover:bg-[#0A0A0B]">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex items-start gap-3 opacity-60 hover:opacity-100 transition-opacity max-w-4xl mx-auto">
                    <AlertCircle className="w-5 h-5 text-red-400 mt-1 shrink-0" />
                    <div className="space-y-1">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-300">Statutory Disclaimer</h4>
                        <p className="text-[10px] md:text-xs text-zinc-500 leading-relaxed text-justify">
                            <strong className="text-zinc-400">EdIntel Professional</strong> is an executive intelligence amplification system, not a licensed medical or legal entity.
                            Outputs generated regarding IEPs, behavior intervention plans, or psychological profiles are for <span className="text-zinc-300 font-medium">informational and strategic purposes only</span>.
                            This system does not provide medical diagnoses, legal counsel, or binding regulatory advice.
                            Always consult with a certified school psychologist, licensed attorney, or appropriate medical professional before finalizing binding educational contracts.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
