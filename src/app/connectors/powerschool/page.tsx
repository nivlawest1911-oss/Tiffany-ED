'use client';

import { motion } from 'framer-motion';
import { Database, Shield, Zap, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function PowerSchoolGuide() {
    return (
        <div className="min-h-screen bg-black text-zinc-100 font-sans p-6 md:p-12 lg:p-24 selection:bg-zinc-800">
            <div className="max-w-4xl mx-auto">
                <Link href="/connectors" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold mb-12">
                    <ChevronLeft size={14} />
                    Back to Connectors
                </Link>

                <header className="mb-16 border-b border-zinc-800 pb-12">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                            <Database className="text-blue-500" size={32} />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">PowerSchool</h1>
                            <p className="text-zinc-500 tracking-[0.2em] uppercase text-xs font-bold mt-2">SIS Data Synchronization</p>
                        </div>
                    </div>
                </header>

                <section className="space-y-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Zap className="text-amber-500" size={18} />
                                Student Sync
                            </h3>
                            <p className="text-sm text-zinc-400 leading-relaxed">
                                Automate student performance logging and behavior intervention tracking. EdIntel's AI-generated IEP reports are archived directly into the PowerSchool student record for permanent historical data.
                            </p>
                        </div>
                        <div className="bg-zinc-900/50 p-8 rounded-3xl border border-white/5">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Shield className="text-indigo-500" size={18} />
                                FERPA Shield
                            </h3>
                            <p className="text-sm text-zinc-400 leading-relaxed">
                                High-security data vault. All transmissions between EdIntel and PowerSchool are encrypted with AES-256 and follow strict Alabama PII (Personally Identifiable Information) protocols.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-2xl font-black uppercase tracking-tight">Enterprise Setup</h2>
                        <ol className="space-y-4">
                            {[
                                "Enable the EdIntel Plugin in your PowerSchool System Administrator console.",
                                "Configure your District SIS URL and Client ID.",
                                "Set field-mapping permissions for student evaluations.",
                                "Test data archiving with a mock student profile."
                            ].map((step, i) => (
                                <li key={i} className="flex gap-4 items-start">
                                    <span className="text-zinc-700 font-mono text-sm">{i + 1}.</span>
                                    <p className="text-sm text-zinc-300">{step}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </section>
            </div>
        </div>
    );
}
