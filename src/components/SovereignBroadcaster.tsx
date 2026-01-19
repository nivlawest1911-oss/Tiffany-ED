'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
    Send, Sparkles, Shield, AlertTriangle,
    CheckCircle, MessageSquare, Brain,
    ArrowRight, Zap, RefreshCw, X, ChevronRight,
    Users, Lock
} from 'lucide-react';
import useSovereignSounds from '@/hooks/useSovereignSounds';

interface DelegateFeedback {
    name: string;
    role: string;
    feedback: string;
    status: 'compliance' | 'impact' | 'vision';
}

export default function SovereignBroadcaster({ isOpen, onCloseAction }: { isOpen: boolean, onCloseAction: () => void }) {
    const [draft, setDraft] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [readinessScore, setReadinessScore] = useState(0);
    const [feedback, setFeedback] = useState<DelegateFeedback[]>([]);
    const [refinedDraft, setRefinedDraft] = useState('');
    const [leadershipStyle, setLeadershipStyle] = useState('Visionary');
    const { playClick, playSuccess } = useSovereignSounds();

    useEffect(() => {
        const identity = JSON.parse(localStorage.getItem('sovereign_identity') || '{}');
        if (identity.leadershipStyle) setLeadershipStyle(identity.leadershipStyle);
    }, []);

    const processDraft = () => {
        if (!draft) return;
        setIsProcessing(true);
        playClick();

        // Simulate neural processing
        setTimeout(() => {
            const feedbacks: DelegateFeedback[] = [
                {
                    name: 'Sarah Connors',
                    role: 'Compliance Auditor',
                    feedback: 'Draft scanned. ALSDE AL Code 290-8-9 requirements verified. Policy shield at 98%.',
                    status: 'compliance'
                },
                {
                    name: leadershipStyle === 'Stoic' ? 'Marcus Aurelius' : 'Dr. Alvin West',
                    role: leadershipStyle === 'Stoic' ? 'Administrative Stoic' : 'Sovereign Architect',
                    feedback: leadershipStyle === 'Stoic'
                        ? 'Duty observed. Language tempered for absolute administrative authority.'
                        : 'Neural resonance increased. Narrative uplifted to inspire district-wide agency.',
                    status: leadershipStyle === 'Stoic' ? 'vision' : 'vision'
                },
                {
                    name: 'André State',
                    role: 'Innovation Architect',
                    feedback: 'Operational agility confirmed. Communication vector optimized for staff engagement.',
                    status: 'impact'
                }
            ];

            setFeedback(feedbacks);
            setReadinessScore(94);
            setRefinedDraft(`[EXECUTIVE DIRECTIVE: ${leadershipStyle.toUpperCase()} OVERLAY]\n\n${draft}\n\n[NEURAL SIGNATURE VERIFIED: COMMANDER LATTICE]`);
            setIsProcessing(false);
            playSuccess();
        }, 3000);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    className="w-full max-w-5xl bg-zinc-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(99,102,241,0.2)] flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[90vh]"
                >
                    {/* Left Panel: Composer */}
                    <div className="flex-1 p-8 md:p-12 border-r border-white/5 flex flex-col min-h-0">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                    <MessageSquare size={20} />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight">Sovereign Broadcaster</h2>
                                    <p className="text-[10px] text-zinc-500 font-mono uppercase">Node Control: Active</p>
                                </div>
                            </div>
                            <button onClick={onCloseAction} className="p-2 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 flex flex-col gap-4 min-h-0">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Rough Directive Input</label>
                            <textarea
                                value={draft}
                                onChange={(e) => setDraft(e.target.value)}
                                placeholder="Enter rough strategic thoughts or raw district updates..."
                                className="flex-1 w-full bg-zinc-950 border border-white/10 rounded-2xl p-6 text-white text-sm font-medium focus:border-indigo-500 outline-none transition-all resize-none custom-scrollbar"
                            />

                            <button
                                onClick={processDraft}
                                disabled={isProcessing || !draft}
                                className="w-full py-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-20 text-white font-black text-xs uppercase tracking-[0.2em] transition-all relative overflow-hidden group shadow-xl shadow-indigo-900/20"
                            >
                                {isProcessing ? (
                                    <div className="flex items-center justify-center gap-3">
                                        <RefreshCw size={14} className="animate-spin" />
                                        Neural Refinement in Progress...
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-3">
                                        <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
                                        Initialize Archetype Tuning
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Right Panel: Analysis & Output */}
                    <div className="w-full md:w-[400px] bg-zinc-950/50 p-8 md:p-12 flex flex-col gap-8 overflow-y-auto custom-scrollbar">
                        <div>
                            <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">Command Pulse</h3>
                            <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${readinessScore}%` }}
                                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                />
                            </div>
                            <div className="flex justify-between mt-2">
                                <span className="text-[9px] font-mono text-zinc-500">READINESS_SCORE</span>
                                <span className="text-[9px] font-black text-white">{readinessScore}%</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Delegate Verification</h3>
                            <div className="space-y-3">
                                {isProcessing ? (
                                    [1, 2, 3].map(i => (
                                        <div key={i} className="p-3 rounded-xl border border-white/5 bg-white/5 animate-pulse">
                                            <div className="h-2 w-20 bg-zinc-800 rounded mb-2" />
                                            <div className="h-1.5 w-full bg-zinc-800 rounded" />
                                        </div>
                                    ))
                                ) : (
                                    feedback.map((f, i) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            key={i}
                                            className="p-4 rounded-xl border border-white/5 bg-zinc-900/50"
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${f.status === 'compliance' ? 'bg-emerald-500' :
                                                    f.status === 'vision' ? 'bg-amber-500' : 'bg-blue-500'
                                                    }`} />
                                                <span className="text-[9px] font-black text-white uppercase">{f.name}</span>
                                            </div>
                                            <p className="text-[10px] text-zinc-500 leading-relaxed italic">"{f.feedback}"</p>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="mt-6 p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-[10px] text-indigo-400 animate-pulse">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-4 h-4 rounded-full border border-indigo-500 flex items-center justify-center">
                                    <div className="w-1 h-1 bg-indigo-500 rounded-full" />
                                </div>
                                <span>NEURAL_SIGIL_ACTIVE</span>
                            </div>
                            {refinedDraft}
                        </div>
                        <div className="mt-auto pt-6 border-t border-white/5">
                            <button
                                className="w-full py-4 rounded-xl bg-white text-black font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-lg flex items-center justify-center gap-2"
                                onClick={() => { playSuccess(); onCloseAction(); }}
                            >
                                <Send size={14} />
                                Uplink Directive
                            </button>
                            <p className="text-center mt-3 text-[8px] font-mono text-zinc-600">DISTRIBUTING TO: DISTRICT_LATTICE</p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
