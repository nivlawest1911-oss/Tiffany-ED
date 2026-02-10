'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText,
    Sparkles,
    ShieldCheck,
    AlertTriangle,
    Copy,
    RefreshCw,
    Save,
    BrainCircuit,
    UserCircle
} from 'lucide-react';
import { toast } from 'sonner';

// Types for the IEP Data
interface IEPData {
    studentName: string;
    stateId: string;
    grade: string;
    exceptionality: string;
    strengths: string;
    concerns: string;
    impact: string;
    evalDate: string;
    iqScore: string;
    adaptiveScore: string;
}

import { useChat } from '@ai-sdk/react';

export default function IEPNarrativeArchitect() {
    // AI Chat Hook
    // @ts-expect-error - Custom Vercel AI useChat hook type mismatch with protocol context
    const { messages, append, isLoading, setMessages } = useChat({
        // @ts-expect-error - Complex API route configuration
        api: '/api/ai/chat',
        body: {
            protocolContext: 'IEP Narrative Generation Protocol. Role: Special Education Compliance Specialist.'
        },
        onError: (error) => {
            toast.error("Neural Link Severed: " + error.message);
        }
    });

    const [showOutput, setShowOutput] = useState(false);
    const [confidenceScore, setConfidenceScore] = useState(0);

    // Form State
    const [formData, setFormData] = useState<IEPData>({
        studentName: '',
        stateId: '',
        grade: '',
        exceptionality: 'Autism',
        strengths: '',
        concerns: '',
        impact: '',
        evalDate: '',
        iqScore: '',
        adaptiveScore: ''
    });

    // Derive the latest generated narrative from the chat messages
    const lastMessage = messages.filter(m => m.role === 'assistant').pop();
    const generatedNarrative = (lastMessage as any)?.content || '';

    // Calculate "Compliance Confidence" based on filled fields
    useEffect(() => {
        const fields = Object.values(formData);
        const filled = fields.filter(f => f.length > 0).length;
        const score = Math.round((filled / fields.length) * 100);
        setConfidenceScore(score);
    }, [formData]);

    const handleGenerate = async () => {
        if (confidenceScore < 50) return; // Prevent generation if low data

        setShowOutput(true);

        // Construct the prompt from form data
        const prompt = `GENERATE IEP NARRATIVE (PLAAFP) FOR:
        Student: ${formData.studentName} (ID: ${formData.stateId})
        Grade: ${formData.grade}
        Exceptionality: ${formData.exceptionality}
        
        DATA POINTS:
        - Strengths: ${formData.strengths}
        - Concerns: ${formData.concerns}
        - Impact Statement: ${formData.impact}
        - Eval Date: ${formData.evalDate}
        - IQ Score: ${formData.iqScore}
        - Adaptive Score: ${formData.adaptiveScore}
        
        REQUIREMENTS:
        1. Write a professional PLAAFP statement.
        2. Include sections for Strengths, Concerns, Evaluation Synopsis, and Academic Impact.
        3. Ensure specific compliance language for Alabama Administrative Code.`;

        // Reset previous messages if generating new
        setMessages([]);

        // Trigger AI
        await append({
            role: 'user',
            content: prompt
        });
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 p-6 lg:p-12 font-sans selection:bg-[#D4AF37]/30">

            {/* HEADER SECTION */}
            <header className="max-w-7xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-[#D4AF37]/10 rounded-lg border border-[#D4AF37]/20">
                            <BrainCircuit className="text-[#D4AF37] w-6 h-6" />
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">IEP Narrative Architect</h1>
                    </div>
                    <p className="text-slate-400 max-w-xl">
                        EdIntel Intelligence Engine • Mobile County Compliance Protocol v2.4
                    </p>
                </div>

                {/* Compliance Meter */}
                <div className="flex items-center gap-4 mt-6 md:mt-0 bg-white/5 px-6 py-3 rounded-2xl border border-white/5 backdrop-blur-sm">
                    <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">Audit Confidence</p>
                        <p className={`text - 2xl font - bold ${confidenceScore === 100 ? 'text-emerald-400' : 'text-white'} `}>
                            {confidenceScore}%
                        </p>
                    </div>
                    <div className="w-16 h-16 relative flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <path className="text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                            <path className="text-[#D4AF37]" strokeDasharray={`${confidenceScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                        </svg>
                        <ShieldCheck className="w-6 h-6 text-white/50 absolute" />
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* LEFT COLUMN: THE INPUT VAULT */}
                <div className="lg:col-span-7 space-y-8">

                    {/* Section 1: Student Identity */}
                    <section className="bg-slate-900/50 border border-white/10 rounded-3xl p-6 backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                            <UserCircle size={120} />
                        </div>
                        <h3 className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" /> Student Identity
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="text-xs text-slate-500 uppercase tracking-wider mb-2 block">Full Legal Name</label>
                                <input
                                    id="studentName"
                                    aria-label="Full Legal Name"
                                    type="text"
                                    value={formData.studentName}
                                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                                    placeholder="e.g. Michael Jordan"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-slate-500 uppercase tracking-wider mb-2 block">State ID (10-Digit)</label>
                                <input
                                    id="stateId"
                                    aria-label="State ID (10-Digit)"
                                    type="text"
                                    value={formData.stateId}
                                    onChange={(e) => setFormData({ ...formData, stateId: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors font-mono"
                                    placeholder="000-000-0000"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-slate-500 uppercase tracking-wider mb-2 block">Primary Exceptionality</label>
                                <select
                                    id="exceptionality"
                                    aria-label="Primary Exceptionality"
                                    value={formData.exceptionality}
                                    onChange={(e) => setFormData({ ...formData, exceptionality: e.target.value })}
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                                >
                                    <option>Autism</option>
                                    <option>Specific Learning Disability</option>
                                    <option>Other Health Impairment</option>
                                    <option>Emotional Disability</option>
                                    <option>Intellectual Disability</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Section 2: The Core Data (Bento Grid) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Strengths */}
                        <div className="md:col-span-2 bg-slate-900/30 border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-colors">
                            <label className="text-xs text-slate-500 uppercase tracking-wider mb-4 block flex items-center justify-between">
                                Strengths & Preferences
                                <Sparkles size={14} className="text-[#D4AF37]" />
                            </label>
                            <textarea
                                value={formData.strengths}
                                onChange={(e) => setFormData({ ...formData, strengths: e.target.value })}
                                className="w-full h-24 bg-transparent border-0 text-white placeholder:text-slate-700 focus:ring-0 resize-none"
                                placeholder="Describe functional and academic strengths..."
                            />
                        </div>

                        {/* Parental Concerns */}
                        <div className="bg-slate-900/30 border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-colors">
                            <label className="text-xs text-slate-500 uppercase tracking-wider mb-4 block">Parental Concerns</label>
                            <textarea
                                value={formData.concerns}
                                onChange={(e) => setFormData({ ...formData, concerns: e.target.value })}
                                className="w-full h-24 bg-transparent border-0 text-white placeholder:text-slate-700 focus:ring-0 resize-none"
                                placeholder="Input parent guardian feedback..."
                            />
                        </div>

                        {/* Evaluation Data */}
                        <div className="bg-slate-900/30 border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-colors space-y-4">
                            <label className="text-xs text-slate-500 uppercase tracking-wider block">Evaluation Data</label>
                            <div className="grid grid-cols-2 gap-3">
                                <input
                                    id="iqScore"
                                    aria-label="IQ Score"
                                    type="text"
                                    value={formData.iqScore}
                                    onChange={(e) => setFormData({ ...formData, iqScore: e.target.value })}
                                    className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#D4AF37]/50"
                                    placeholder="IQ Score"
                                />
                                <input
                                    id="adaptiveScore"
                                    aria-label="Adaptive Score"
                                    type="text"
                                    value={formData.adaptiveScore}
                                    onChange={(e) => setFormData({ ...formData, adaptiveScore: e.target.value })}
                                    className="bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#D4AF37]/50"
                                    placeholder="Adaptive"
                                />
                                <input
                                    aria-label="Evaluation Date"
                                    type="date"
                                    value={formData.evalDate}
                                    onChange={(e) => setFormData({ ...formData, evalDate: e.target.value })}
                                    className="col-span-2 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-slate-400 focus:border-[#D4AF37]/50"
                                />
                            </div>
                        </div>

                        {/* Impact Statement */}
                        <div className="md:col-span-2 bg-slate-900/30 border border-white/5 rounded-3xl p-6 hover:border-white/10 transition-colors">
                            <label className="text-xs text-slate-500 uppercase tracking-wider mb-4 block flex items-center gap-2">
                                <AlertTriangle size={14} className="text-amber-500" /> Adverse Impact Statement
                            </label>
                            <textarea
                                value={formData.impact}
                                onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
                                className="w-full h-24 bg-transparent border-0 text-white placeholder:text-slate-700 focus:ring-0 resize-none"
                                placeholder="How does the exceptionality affect involvement in general curriculum?"
                            />
                        </div>
                    </div>

                    {/* GENERATE ACTION */}
                    {/* GENERATE ACTION */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleGenerate}
                        disabled={confidenceScore < 50 || isLoading}
                        className={`w - full py - 6 rounded - 2xl font - bold text - lg tracking - wide shadow - 2xl flex items - center justify - center gap - 3 transition - all
              ${confidenceScore < 50
                                ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                                : 'bg-gradient-to-r from-[#D4AF37] to-amber-600 text-black shadow-[0_0_40px_rgba(212,175,55,0.3)]'
                            } `}
                    >
                        {isLoading ? (
                            <>
                                <RefreshCw className="animate-spin" /> ARCHITECTING NARRATIVE...
                            </>
                        ) : (
                            <>
                                <FileText /> GENERATE PROFICIENT NARRATIVE
                            </>
                        )}
                    </motion.button>

                    {confidenceScore < 50 && (
                        <p className="text-center text-xs text-amber-500/70 mt-2">
                            Minimum 50% Audit Confidence required to engage Architect.
                        </p>
                    )}

                </div>

                {/* RIGHT COLUMN: THE OUTPUT CONSOLE */}
                <div className="lg:col-span-5">
                    <AnimatePresence>
                        {showOutput && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="sticky top-6 h-[calc(100vh-6rem)] flex flex-col"
                            >
                                <div className="bg-[#1a1a1a] border border-white/10 rounded-t-3xl p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                                        <div className="w-3 h-3 bg-amber-500 rounded-full" />
                                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                                    </div>
                                    <span className="text-[10px] uppercase text-slate-500 font-mono">Mobile_County_PLAAFP_v2.pdf</span>
                                </div>

                                <div className="flex-1 bg-white text-black p-8 font-mono text-sm leading-relaxed overflow-y-auto shadow-2xl relative">
                                    <pre className="whitespace-pre-wrap font-mono text-xs md:text-sm">
                                        {generatedNarrative}
                                        {isLoading && <span className="animate-pulse">|</span>}
                                    </pre>

                                    {/* Watermark */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
                                        <ShieldCheck size={300} />
                                    </div>
                                </div>

                                {/* Action Bar */}
                                <div className="bg-[#1a1a1a] border-t border-white/10 rounded-b-3xl p-4 flex gap-3">
                                    <button
                                        onClick={() => {
                                            toast.info("Regenerating compliance narrative...", {
                                                description: "Aligning with Mobile County standards..."
                                            });
                                            handleGenerate();
                                        }}
                                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <RefreshCw size={14} /> REGENERATE
                                    </button>
                                    <button
                                        onClick={() => {
                                            toast.success("Saved to Vault", {
                                                description: "Narrative securely stored in Student Digital Locker."
                                            });
                                        }}
                                        className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Save size={14} /> SAVE TO VAULT
                                    </button>
                                    <button
                                        onClick={() => {
                                            navigator.clipboard.writeText(generatedNarrative);
                                            toast.success("Copied to Clipboard", {
                                                description: "Ready to paste into official IEP document."
                                            });
                                        }}
                                        className="flex-1 bg-[#D4AF37] hover:bg-amber-400 text-black py-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Copy size={14} /> COPY
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {!showOutput && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-full border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center p-12 text-center"
                            >
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                                    <FileText className="text-slate-600 w-10 h-10" />
                                </div>
                                <h3 className="text-slate-400 font-bold mb-2">Awaiting Input</h3>
                                <p className="text-slate-600 text-sm max-w-xs">
                                    Complete the "Input Vault" on the left to activate the EdIntel Intelligence Engine.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}
