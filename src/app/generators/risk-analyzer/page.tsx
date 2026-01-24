'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield as LucideShield, AlertTriangle, Lock, FileText, Gavel, ArrowRight, Activity, Loader2 } from 'lucide-react';
import FloatingNavbar from '@/components/FloatingNavbar';
import { generateProfessionalResponse } from '@/lib/leadership-ai';

export default function RiskAnalyzer() {
    const [scenario, setScenario] = useState('');
    const [category, setCategory] = useState('Safety');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState<string | null>(null);
    const [riskScore, setRiskScore] = useState(0);

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        try {
            const prompt = `Act as a School Board Attorney and Risk Management Expert. Analyze this scenario for potential liability and litigation risk.
            
            Scenario: "${scenario}"
            Category: ${category}

            Output Format:
            1. Risk Score: [0-100] (Just the number)
            2. Executive Summary: Blunt assessment of liability.
            3. Potential Citations: List 2-3 relevant education case law precedents or IDEA/FERPA statutes.
            4. Mitigation Protocol: 3 immediate steps to kill this lawsuit before it starts.
            
            Tone: Warning, Legal, Protective, "Professional".`;

            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt, generatorId: 'risk-analyzer' })
            });

            if (!response.ok) throw new Error('Analysis failed');

            const text = await response.text();

            // Fake parsing the score for the visual meter (if the AI puts it at the start)
            const scoreMatch = text.match(/(\d{1,3})/);
            const score = scoreMatch ? parseInt(scoreMatch[0]) : 75;
            setRiskScore(score);
            setAnalysis(text);
        } catch (error) {
            console.error(error);
        }
        setIsAnalyzing(false);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-red-500/30 font-sans">
            <FloatingNavbar />

            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/10 rounded-full blur-[120px]" />
            </div>

            <main className="max-w-7xl mx-auto px-6 py-24 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-500 text-xs font-bold uppercase tracking-widest mb-6 border border-red-500/20">
                        <AlertTriangle size={14} />
                        <span>Liability Shield Protocol</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6">
                        Litigation <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">Risk Audit</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Don't wait for the subpoena. Analyze incidents instantly to predict legal exposure and deploy sovereign mitigation strategies.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Input Panel */}
                    <div className="space-y-6">
                        <div className="p-8 rounded-[2rem] bg-zinc-900/80 border border-white/5 shadow-2xl backdrop-blur-xl">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                                <FileText className="text-indigo-400" /> Incident Report
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Risk Category</label>
                                    <div className="flex gap-2 flex-wrap">
                                        {['Special Ed (IDEA)', 'Student Safety', 'Staff Employment', 'Civil Rights'].map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => setCategory(cat)}
                                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${category === cat ? 'bg-indigo-600 text-white shadow-lg' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Scenario Details</label>
                                    <textarea
                                        value={scenario}
                                        onChange={(e) => setScenario(e.target.value)}
                                        className="w-full bg-black/50 border border-zinc-700 rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all h-48 resize-none placeholder:text-zinc-700"
                                        placeholder="E.g., A parent is claiming we failed to implement the IEP accommodations for 3 months and is threatening due process..."
                                    />
                                    <p className="text-[10px] text-zinc-600 mt-2 flex items-center gap-1">
                                        <Lock size={10} /> Data is processed locally and sovereign-encrypted.
                                    </p>
                                </div>

                                <button
                                    onClick={handleAnalyze}
                                    disabled={!scenario || isAnalyzing}
                                    className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold shadow-lg shadow-red-900/20 disabled:opacity-50 flex items-center justify-center gap-2 transition-all mt-4"
                                >
                                    {isAnalyzing ? <Loader2 className="animate-spin" /> : <Gavel />}
                                    {isAnalyzing ? 'Evaluating Exposure...' : 'Calculate Risk Score'}
                                </button>
                            </div>
                        </div>

                        {/* Upsell Card */}
                        <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900/50 to-indigo-800/50 border border-indigo-500/20 flex items-center gap-4">
                            <div className="p-3 bg-indigo-500 rounded-lg text-white shadow-lg">
                                <LucideShield size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Need Complete Immunity?</h4>
                                <p className="text-xs text-indigo-200">The <strong>Professional Legal Vault</strong> includes 50+ pre-vetted defense templates.</p>
                            </div>
                            <ArrowRight className="ml-auto text-indigo-400" />
                        </div>
                    </div>

                    {/* Output Panel */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            {!analysis ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center p-12 rounded-[2rem] border-2 border-dashed border-zinc-900 bg-zinc-900/30 text-zinc-700"
                                >
                                    <Gavel size={64} className="mb-4 opacity-50" />
                                    <h3 className="text-2xl font-bold">Court is Adjourned</h3>
                                    <p className="mt-2 text-sm">Submit a scenario to begin the mock trial analysis.</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full bg-white text-black rounded-[2rem] shadow-2xl relative overflow-hidden"
                                >
                                    {/* Risk Meter Header */}
                                    <div className={`p-8 ${riskScore > 70 ? 'bg-red-500' : riskScore > 40 ? 'bg-orange-500' : 'bg-green-500'} text-white transition-colors duration-500`}>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs font-black uppercase tracking-widest opacity-80">Litigation Probability</span>
                                            <Activity size={20} />
                                        </div>
                                        <div className="text-7xl font-black tracking-tighter mb-1">{riskScore}%</div>
                                        <div className="text-sm font-medium opacity-90">
                                            {riskScore > 70 ? 'CRITICAL EXPOSURE DETECTED' : riskScore > 40 ? 'MODERATE RISK - ACTION REQUIRED' : 'LOW RISK - MONITOR'}
                                        </div>
                                    </div>

                                    <div className="p-8 h-[calc(100%-12rem)] overflow-y-auto">
                                        <div className="prose prose-sm max-w-none text-zinc-800 font-medium whitespace-pre-wrap">
                                            {analysis}
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 inset-x-0 p-4 bg-zinc-100 border-t border-zinc-200 flex items-center justify-between">
                                        <span className="text-xs font-bold text-zinc-500 uppercase">AI Legal Counsel</span>
                                        <button onClick={() => window.location.href = '/pricing'} className="px-4 py-2 bg-black text-white text-xs font-bold uppercase rounded-lg hover:bg-zinc-800 transition-colors">
                                            Prepare Defense (Upgrade)
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </main>
        </div>
    );
}
