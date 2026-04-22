'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gavel, ShieldCheck, TrendingUp, Plus, Minus, Send, AlertTriangle } from 'lucide-react';
import { GovernanceEngine, GovernanceProposal } from '@/lib/GovernanceEngine';
import { GlassCard } from '@/components/ui/Cinematic';

const engine = GovernanceEngine.getInstance();
const MAX_CREDITS = 100;

export function SovereignBallot() {
    const [proposals, setProposals] = useState<GovernanceProposal[]>([]);
    const [selectedPropId, setSelectedPropId] = useState<string | null>(null);
    const [spentCredits, setSpentCredits] = useState<Record<string, number>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setProposals(engine.getActiveProposals());
    }, []);

    const selectedProp = proposals.find(p => p.id === selectedPropId);
    const totalSpent = Object.values(spentCredits).reduce((a, b) => a + b, 0);
    const remainingCredits = MAX_CREDITS - totalSpent;

    const adjustCredits = (option: string, delta: number) => {
        const current = spentCredits[option] || 0;
        const next = Math.max(0, current + delta);
        if (delta > 0 && totalSpent + delta > MAX_CREDITS) return;
        setSpentCredits({ ...spentCredits, [option]: next });
    };

    const handleSubmit = async () => {
        if (!selectedPropId) return;
        setIsSubmitting(true);
        // Simulate engine latency
        await new Promise(r => setTimeout(r, 2000));
        engine.castVote({
            voterId: 'user_current',
            proposalId: selectedPropId,
            choices: spentCredits,
            timestamp: new Date()
        });
        setIsSubmitting(false);
        setIsComplete(true);
    };

    if (isComplete) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <div className="h-24 w-24 bg-intel-gold/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-intel-gold/40">
                    <ShieldCheck className="text-intel-gold" size={48} />
                </div>
                <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">Ballot Encrypted</h2>
                <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest max-w-xs mx-auto mb-12">
                    Your choice has been hashed and added to the District Constitutional Ledger.
                </p>
                <button
                    onClick={() => { setIsComplete(false); setSelectedPropId(null); setSpentCredits({}); }}
                    className="px-8 py-3 bg-intel-gold text-black rounded-full font-black uppercase text-xs tracking-widest"
                >
                    Return to Hub
                </button>
            </motion.div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-12">
            {!selectedPropId ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {proposals.map(prop => (
                        <motion.div key={prop.id} whileHover={{ y: -5 }}>
                            <GlassCard className="p-8 border-white/5 hover:border-intel-gold/20 transition-all cursor-pointer text-left" onClick={() => setSelectedPropId(prop.id)}>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-white/5 rounded-xl text-intel-gold">
                                        <Gavel size={20} />
                                    </div>
                                    <span className="text-[10px] font-black bg-intel-gold/10 text-intel-gold px-2 py-1 rounded-md uppercase tracking-widest">
                                        {prop.type}
                                    </span>
                                </div>
                                <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-2">{prop.title}</h3>
                                <p className="text-xs text-white/40 leading-relaxed mb-8">{prop.description}</p>
                                <div className="flex items-center gap-2 text-[10px] uppercase font-black text-intel-gold tracking-widest leading-none">
                                    Open Ballot <TrendingUp size={12} />
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 text-left">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="flex items-center gap-4 text-intel-gold mb-8">
                                <AlertTriangle size={20} />
                                <span className="text-xs font-black uppercase tracking-widest">Active Constitutional Session</span>
                            </div>

                            <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
                                {selectedProp?.title}
                            </h2>
                            <p className="text-lg text-white/60 leading-relaxed mb-12">
                                {selectedProp?.description}
                            </p>

                            <div className="space-y-4">
                                {selectedProp?.options.map(option => {
                                    const credits = spentCredits[option] || 0;
                                    const weight = engine.calculateVoteWeight(credits);
                                    return (
                                        <GlassCard key={option} className="p-6 border-white/5 flex items-center justify-between">
                                            <div>
                                                <div className="text-[10px] uppercase font-black text-white/40 tracking-widest mb-1">Impact Level</div>
                                                <div className="text-xl font-black text-white uppercase italic">{option}</div>
                                            </div>
                                            <div className="flex items-center gap-8">
                                                <div className="text-right">
                                                    <div className="text-[10px] uppercase font-black text-intel-gold tracking-widest mb-1">Weight</div>
                                                    <div className="text-2xl font-black text-white tracking-tighter">{weight > 0 ? `+${weight}` : '0'}</div>
                                                </div>
                                                <div className="flex items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/10">
                                                    <button
                                                        onClick={() => adjustCredits(option, -1)}
                                                        className="p-2 hover:bg-white/10 rounded-lg text-white/60 transition-colors"
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="w-8 text-center font-mono font-bold text-intel-gold text-lg">{credits}</span>
                                                    <button
                                                        onClick={() => adjustCredits(option, 1)}
                                                        className="p-2 hover:bg-white/10 rounded-lg text-white/60 transition-colors"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </GlassCard>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <GlassCard className="p-8 border-intel-gold/20 sticky top-8">
                                <div className="text-center mb-12">
                                    <div className="text-[10px] uppercase font-black text-white/40 tracking-widest mb-4">Available Credits</div>
                                    <div className="text-7xl font-black text-white italic tracking-tighter">
                                        {remainingCredits}
                                    </div>
                                    <div className="w-full h-1 bg-white/5 rounded-full mt-8 overflow-hidden">
                                        <motion.div
                                            className="h-full bg-intel-gold"
                                            animate={{ width: `${(remainingCredits / MAX_CREDITS) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6 mb-12">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-60">
                                        <span>Stakeholder Intensity</span>
                                        <span className="text-intel-gold">Quadratic Mode</span>
                                    </div>
                                    <p className="text-[11px] text-white/40 leading-relaxed italic">
                                        Credits represent your commitment. The cost of influence grows quadratically, ensuring deep commitment outweighs simple headcount.
                                    </p>
                                </div>

                                <button
                                    disabled={totalSpent === 0 || isSubmitting}
                                    onClick={handleSubmit}
                                    className="w-full py-4 bg-intel-gold text-black rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-intel-gold/80 transition-all disabled:opacity-20 disabled:grayscale"
                                >
                                    {isSubmitting ? 'Encrypting...' : <>Seal My Vote <Send size={14} /></>}
                                </button>

                                <button
                                    onClick={() => setSelectedPropId(null)}
                                    className="w-full py-4 text-white/40 font-black uppercase tracking-widest text-[10px] hover:text-white transition-colors mt-4"
                                >
                                    Cancel Session
                                </button>
                            </GlassCard>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
