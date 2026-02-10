'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, TrendingUp, Shield as LucideShield, PieChart, Activity, Lock, Phone, Sparkles } from 'lucide-react';
import HolographicBriefing from '@/components/intelligence/HolographicBriefing';
import Image from 'next/image';


export default function DistrictStrategyClient() {
    const [districtData, setDistrictData] = useState({
        name: '',
        students: '',
        budget: '',
        painPoints: ''
    });
    const [isGenerating, setIsGenerating] = useState(false);
    const [strategyDoc, setStrategyDoc] = useState('');
    const [showBriefing, setShowBriefing] = useState(false);


    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            const prompt = `Act as Dr. Alvin West (DBA Finance, Executive Consultant). Generate a High-Level Strategic Turnaround Executive Brief for a school district.
            
            District Profile:
            - Name: ${districtData.name}
            - Size: ${districtData.students} Students
            - Annual Budget: ${districtData.budget}
            - Critical Pain Points: ${districtData.painPoints}

            Output Structure:
            1. Executive Diagnosis: Blunt assessment of the current trajectory based on pain points.
            2. The "Professional" Solution: High-level strategic shift needed (mention operational excellence).
            3. Projected ROI Analysis: Estimate financial recovery if changes are made.
            4. Implementation Vector: 3-Phase rollout plan over 90 days.
            
            Tone: Authoritative, C-Suite Professional, Financially Astute.`;

            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, generatorId: 'district-strategy' })
            });

            if (!response.ok) throw new Error('Generation failed');

            const text = await response.text();
            setStrategyDoc(text);
        } catch (error) {
            console.error("Strategy Gen Error", error);
        }
        setIsGenerating(false);
    };

    return (
        <main className="content-stage">


            <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
                <div className="flex items-center justify-between mb-16 border-b border-white/10 pb-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-amber-500/20">
                            <LucideShield size={12} />
                            <span>Executive Access Only</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
                            District <span className="text-zinc-500">Strategy</span> <span className="text-amber-500">Command</span>
                        </h1>
                    </div>

                    <div className="mt-8">
                        <HolographicBriefing
                            isOpen={showBriefing}
                            onClose={() => setShowBriefing(false)}
                            agentId="visionary"
                            title="Turnaround Strategy Matrix"
                            description="I am Dr. Alvin West. We will now synthesize your district's raw telemetry into a unified strategic vector for academic excellence and operational solvency."
                            briefingSteps={[
                                "Audit existing infrastructure for entropy and budget leaks.",
                                "Calibrate academic benchmarks against state-level performance nodes.",
                                "Generate a multi-phase mobilization plan for staff and community.",
                                "Establish real-time feedback loops for continuous improvement."
                            ]}
                        />

                        <button
                            onClick={() => setShowBriefing(true)}
                            className="px-8 py-4 liquid-glass border-noble-gold/20 text-noble-gold hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.3em] group"
                        >
                            <Sparkles size={14} className="inline mr-3 group-hover:rotate-12 transition-transform" />
                            Initialize Strategic Briefing
                        </button>
                    </div>

                    <div className="hidden md:block text-right text-zinc-500 text-xs font-mono">
                        <div>SYSTEM_STATUS: <span className="text-emerald-500">ONLINE</span></div>
                        <div>LATENCY: <span className="text-emerald-500">12ms</span></div>
                        <div>ENCRYPTION: <span className="text-emerald-500">AES-256</span></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Panel: Executive Inputs */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="p-8 rounded-[2rem] bg-zinc-900 border border-zinc-800 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-5">
                                <Building2 size={120} />
                            </div>

                            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-widest flex items-center gap-2">
                                <Activity className="text-amber-500" /> Diagnostic Inputs
                            </h3>

                            <div className="space-y-6 relative z-10">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-zinc-500 mb-2">District / Organization Name</label>
                                    <input
                                        type="text"
                                        className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-sm focus:border-amber-500 outline-none transition-colors"
                                        placeholder="e.g. Professional Independent ISD"
                                        value={districtData.name}
                                        onChange={e => setDistrictData({ ...districtData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-zinc-500 mb-2">Student Population (Headcount)</label>
                                    <input
                                        type="text"
                                        className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-sm focus:border-amber-500 outline-none transition-colors"
                                        placeholder="e.g. 15,000"
                                        value={districtData.students}
                                        onChange={e => setDistrictData({ ...districtData, students: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-zinc-500 mb-2">Operating Budget (Approx)</label>
                                    <input
                                        type="text"
                                        className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-sm focus:border-amber-500 outline-none transition-colors"
                                        placeholder="e.g. $145M"
                                        value={districtData.budget}
                                        onChange={e => setDistrictData({ ...districtData, budget: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-zinc-500 mb-2">Strategic Pain Points (Top 3)</label>
                                    <textarea
                                        className="w-full bg-black border border-zinc-800 rounded-xl p-4 text-sm focus:border-amber-500 outline-none transition-colors h-32 resize-none"
                                        placeholder="e.g. 1. High Teacher Turnover, 2. SPED Compliance Lawsuits, 3. Low Math Proficiency"
                                        value={districtData.painPoints}
                                        onChange={e => setDistrictData({ ...districtData, painPoints: e.target.value })}
                                    />
                                </div>

                                <button
                                    onClick={handleGenerate}
                                    disabled={!districtData.name || isGenerating}
                                    className="w-full py-5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-700 text-white font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-amber-900/20 disabled:opacity-50 flex items-center justify-center gap-3"
                                >
                                    {isGenerating ? (
                                        <>Running Strategic Simulation...</>
                                    ) : (
                                        <>
                                            <TrendingUp size={18} /> Generate Strategy
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: The "Million Dollar" Report */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            {!strategyDoc ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center p-12 rounded-[2rem] border-2 border-dashed border-zinc-800/50 bg-zinc-900/20"
                                >
                                    <div className="w-24 h-24 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6">
                                        <PieChart size={40} className="text-zinc-700" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-zinc-600">Awaiting Strategic Data</h3>
                                    <p className="max-w-md mt-4 text-zinc-500">
                                        Input your district's operational parameters to receive a bespoke Turnaround Brief from Dr. West's Professional AI Engine.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="relative"
                                >
                                    {/* The Report */}
                                    <div className="bg-white text-black p-12 rounded-[2rem] shadow-2xl relative overflow-hidden mb-8">
                                        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />
                                        <div className="flex justify-between items-start mb-12 border-b border-zinc-100 pb-8">
                                            <div>
                                                <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">Strategic Turnaround Brief</h2>
                                                <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Prepared for: {districtData.name}</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Confidentiality Level</div>
                                                <div className="text-red-600 font-black uppercase text-sm flex items-center justify-end gap-1"><Lock size={12} /> Board Eyes Only</div>
                                            </div>
                                        </div>

                                        <div className="prose prose-lg max-w-none font-serif text-zinc-800 whitespace-pre-wrap leading-relaxed">
                                            {strategyDoc}
                                        </div>

                                        <div className="mt-12 pt-8 border-t border-zinc-100 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <Image
                                                    src="/images/avatars/dr_alvin_west_premium.png"
                                                    alt="Dr. West"
                                                    className="w-16 h-16 rounded-full border-2 border-zinc-100"
                                                    width={64}
                                                    height={64}
                                                />
                                                <div>
                                                    <div className="font-bold text-lg leading-tight">Dr. Alvin West, DBA</div>
                                                    <div className="text-xs text-zinc-500 uppercase tracking-wider">Executive Consultant</div>
                                                </div>
                                            </div>
                                            <Image
                                                src="/logo_dark.png"
                                                alt="Professional"
                                                className="h-8 w-auto opacity-20"
                                                width={100}
                                                height={32}
                                            />
                                        </div>
                                    </div>

                                    {/* High Ticket Upsell */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 transition-colors group cursor-pointer">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                                                    <Phone size={24} />
                                                </div>
                                                <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">High Priority</span>
                                            </div>
                                            <h4 className="text-lg font-bold text-white mb-2">Book Executive Briefing</h4>
                                            <p className="text-sm text-zinc-400 mb-4">Schedule a 60-min strategic consult with Dr. West to implement this plan.</p>
                                            <div className="text-amber-500 font-black text-xl">$1,500 <span className="text-xs text-zinc-600 font-normal">/ Session</span></div>
                                        </div>

                                        <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-700 text-white shadow-lg shadow-orange-900/20 group cursor-pointer hover:brightness-110 transition-all">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="p-3 bg-white/20 rounded-xl text-white">
                                                    <Building2 size={24} />
                                                </div>
                                                <span className="text-xs font-bold text-white/60 uppercase tracking-wider">Enterprise</span>
                                            </div>
                                            <h4 className="text-lg font-bold text-white mb-2">Activate "Professional District"</h4>
                                            <p className="text-sm text-white/80 mb-4">Deploy EdIntel across your entire system. Full adoption protocol included.</p>
                                            <div className="text-white font-black text-xl">Custom Quote</div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </main>
    );
}
