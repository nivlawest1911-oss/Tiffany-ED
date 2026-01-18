'use client';
import { AlertCircle, Stethoscope, Scale, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function MedicalDisclaimer() {
    return (
        <div className="w-full bg-[#0A0A0B]/80 border-t border-red-900/10 backdrop-blur-md py-4 transition-all hover:bg-[#0A0A0B]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">

                <div className="flex items-start gap-3 opacity-60 hover:opacity-100 transition-opacity max-w-2xl">
                    <AlertCircle className="w-5 h-5 text-red-400 mt-1 shrink-0" />
                    <div className="space-y-1">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-300">Statutory Disclaimer</h4>
                        <p className="text-[10px] md:text-xs text-zinc-500 leading-relaxed text-justify">
                            <strong className="text-zinc-400">EdIntel Sovereign</strong> is an executive intelligence amplification system, not a licensed medical or legal entity.
                            Outputs generated regarding IEPs, behavior intervention plans, or psychological profiles are for <span className="text-zinc-300 font-medium">informational and strategic purposes only</span>.
                            This system does not provide medical diagnoses, legal counsel, or binding regulatory advice.
                            Always consult with a certified school psychologist, licensed attorney, or appropriate medical professional before finalizing binding educational contracts.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-6 shrink-0 border-l border-zinc-800 pl-6 h-full">
                    <div className="group flex items-center gap-2 cursor-pointer">
                        <div className="p-2 bg-zinc-900 rounded-lg group-hover:bg-zinc-800 transition-colors">
                            <Stethoscope size={14} className="text-zinc-500 group-hover:text-blue-400 transition-colors" />
                        </div>
                        <div>
                            <p className="text-[9px] text-zinc-600 uppercase font-bold">Medical</p>
                            <p className="text-[10px] text-zinc-400">Consult Specialist</p>
                        </div>
                    </div>
                    <div className="group flex items-center gap-2 cursor-pointer">
                        <div className="p-2 bg-zinc-900 rounded-lg group-hover:bg-zinc-800 transition-colors">
                            <Scale size={14} className="text-zinc-500 group-hover:text-amber-400 transition-colors" />
                        </div>
                        <div>
                            <p className="text-[9px] text-zinc-600 uppercase font-bold">Legal</p>
                            <p className="text-[10px] text-zinc-400">Consult Counsel</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
