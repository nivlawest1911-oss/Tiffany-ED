'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, DollarSign, ArrowRight, Download, CheckCircle, AlertCircle, FileText, Loader2 } from 'lucide-react';
import FloatingNavbar from '@/components/FloatingNavbar';
import { generateProfessionalResponse } from '@/lib/leadership-ai';

export default function GrantWriterLite() {
    const [step, setStep] = useState(1);
    const [goal, setGoal] = useState('');
    const [amount, setAmount] = useState('');
    const [demographics, setDemographics] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedGrant, setGeneratedGrant] = useState('');
    const [showPremiumModal, setShowPremiumModal] = useState(false);

    const handleGenerate = async () => {
        setIsGenerating(true);
        try {
            const prompt = `Write a compelling grant proposal section for an education grant. 
            Goal: ${goal}
            Target Amount: ${amount}
            Demographics: ${demographics}
            Focus: High-impact, data-driven, equity-focused. 
            Tone: Professional, persuasive, urgent.
            Structure: 
            1. Needs Statement
            2. Proposed Solution
            3. Budget Justification (High Level)
            4. Expected Impact (ROI)`;

            const response = await generateProfessionalResponse(prompt, 'grant-writer');
            setGeneratedGrant(response);
            setStep(2);
        } catch (error) {
            console.error("Grant Gen Error", error);
        }
        setIsGenerating(false);
    };

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            <FloatingNavbar />

            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px]" />
            </div>

            <main className="max-w-5xl mx-auto px-6 py-24 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6 border border-emerald-500/20">
                        <DollarSign size={14} />
                        <span>Revenue Generator</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black mb-6">
                        Grant Writer <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Lite</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Secure funding for your vision. This tool generates high-impact grant narratives proven to win Title 1 and private funding.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left Panel: Input */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="p-8 rounded-[2rem] bg-zinc-900/50 border border-white/10 backdrop-blur-xl">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <Sparkles className="text-emerald-500" /> Grant Parameters
                            </h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Funding Goal (What will you buy?)</label>
                                    <textarea
                                        value={goal}
                                        onChange={(e) => setGoal(e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all h-24 resize-none"
                                        placeholder="e.g., 30 iPads for a reading intervention lab..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Target Amount ($)</label>
                                    <input
                                        type="text"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                        placeholder="e.g., $15,000"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase text-zinc-500 mb-2">Target Demographics</label>
                                    <input
                                        type="text"
                                        value={demographics}
                                        onChange={(e) => setDemographics(e.target.value)}
                                        className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                                        placeholder="e.g., 3rd Grade, 85% Free/Reduced Lunch"
                                    />
                                </div>

                                <button
                                    onClick={handleGenerate}
                                    disabled={!goal || !amount || isGenerating}
                                    className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 font-bold text-white shadow-lg shadow-emerald-500/20 hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 transition-all flex items-center justify-center gap-2"
                                >
                                    {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles />}
                                    {isGenerating ? 'Drafting Proposal...' : 'Generate Proposal'}
                                </button>
                            </div>
                        </div>

                        {/* Social Proof / "Why Upgrade" Teaser */}
                        <div className="p-6 rounded-2xl bg-indigo-900/10 border border-indigo-500/20">
                            <h4 className="font-bold text-indigo-300 mb-2 flex items-center gap-2">
                                <AlertCircle size={16} /> Pro Tip
                            </h4>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                                <strong>Professional District</strong> users get access to our <em>Grant Search Engine</em> that automatically matches your proposal to 500+ active grants.
                            </p>
                        </div>
                    </div>

                    {/* Right Panel: Output */}
                    <div className="lg:col-span-7">
                        <AnimatePresence mode="wait">
                            {!generatedGrant ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="h-full flex flex-col items-center justify-center text-center p-12 rounded-[2rem] border-2 border-dashed border-zinc-800 text-zinc-600"
                                >
                                    <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center mb-6">
                                        <FileText size={40} className="opacity-50" />
                                    </div>
                                    <h3 className="text-xl font-bold text-zinc-500">Proposal Canvas Empty</h3>
                                    <p className="max-w-xs mt-2 text-sm">Fill out the parameters on the left to generate your million-dollar narrative.</p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="relative h-full flex flex-col"
                                >
                                    <div className="absolute -top-3 -right-3">
                                        <span className="relative flex h-6 w-6">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-6 w-6 bg-emerald-500"></span>
                                        </span>
                                    </div>

                                    <div className="bg-white text-black p-8 rounded-[2rem] shadow-2xl overflow-y-auto max-h-[600px] mb-6 font-serif">
                                        <div className="prose prose-sm max-w-none">
                                            <h2 className="text-2xl font-bold mb-6 text-center border-b pb-4">Grant Proposal Draft</h2>
                                            <div className="whitespace-pre-wrap">{generatedGrant}</div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => navigator.clipboard.writeText(generatedGrant)}
                                            className="flex-1 py-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold flex items-center justify-center gap-2 transition-all"
                                        >
                                            <ArrowRight size={18} /> Copy to Clipboard
                                        </button>
                                        <button
                                            onClick={() => setShowPremiumModal(true)}
                                            className="flex-1 py-4 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all shadow-lg shadow-white/10"
                                        >
                                            <Download size={18} /> Export PDF (Premium)
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            {/* Premium Upsell Modal */}
            <AnimatePresence>
                {showPremiumModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowPremiumModal(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative bg-zinc-900 border border-emerald-500/30 p-8 rounded-3xl max-w-md w-full text-center shadow-2xl shadow-emerald-900/50"
                        >
                            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 text-emerald-400">
                                <DollarSign size={32} />
                            </div>
                            <h3 className="text-2xl font-black text-white mb-4">Unlock Full Funding Power?</h3>
                            <p className="text-zinc-400 mb-8">
                                To export official PDFs and access our <strong>Automated Grant Finder</strong> database, you need to be a Professional Practitioner.
                            </p>

                            <div className="space-y-3 mb-8">
                                <div className="flex items-center gap-3 text-sm text-left p-3 rounded-lg bg-white/5">
                                    <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                                    <span>Export to Federal PDF Format</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm text-left p-3 rounded-lg bg-white/5">
                                    <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                                    <span>Matching with 500+ Active Grants</span>
                                </div>
                            </div>

                            <button onClick={() => window.location.href = '/pricing'} className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold mb-4 transition-all">
                                Upgrade to Practitioner
                            </button>
                            <button onClick={() => setShowPremiumModal(false)} className="text-zinc-500 text-sm hover:text-white transition-colors">
                                No thanks, I'll copy-paste manually
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
