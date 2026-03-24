'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, Loader2, TrendingUp } from 'lucide-react';
import { GlassCard } from '@/components/ui/Cinematic';
import { cn } from '@/lib/utils';

export function DigitalTwinSimulator({ title }: { title?: string }) {
    const [scenario, setScenario] = useState('');
    const [isSimulating, setIsSimulating] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleSimulate = async () => {
        if (!scenario) return;
        setIsSimulating(true);
        try {
            const res = await fetch('/api/simulate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ scenario }),
            });
            const data = await res.json();
            setResult(data.result);
        } catch (error) {
            console.error('Simulation failed:', error);
        } finally {
            setIsSimulating(false);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-foreground flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-electric-cyan" />
                {title || "District Digital Twin: Policy Sandbox"}
            </h2>

            <GlassCard className="p-6 border-electric-cyan/20">
                <div className="space-y-4">
                    <label htmlFor="simulation-input" className="text-xs text-muted-foreground font-medium uppercase tracking-widest block">Simulation Input</label>
                    <textarea
                        id="simulation-input"
                        value={scenario}
                        onChange={(e) => setScenario(e.target.value)}
                        placeholder="e.g., Simulate the impact of a 5% teacher salary increase coupled with a 10% reduction in district-level administrative travel over 24 months."
                        aria-label="Enter simulation scenario description"
                        className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-electric-cyan/50 min-h-[100px] resize-none"
                    />
                    <button
                        onClick={handleSimulate}
                        disabled={isSimulating || !scenario}
                        aria-label={isSimulating ? "Simulation in progress" : "Initialize policy simulation"}
                        className={cn(
                            "w-full py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-lg",
                            isSimulating ? "bg-zinc-800 text-zinc-500 cursor-not-allowed" : "bg-electric-cyan text-black hover:scale-[1.02] shadow-electric-cyan/20"
                        )}
                    >
                        {isSimulating ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Processing Neural Simulation...
                            </>
                        ) : (
                            <>
                                <Play className="w-4 h-4 fill-current" />
                                Initialize Simulation
                            </>
                        )}
                    </button>
                </div>
            </GlassCard>

            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="space-y-4"
                    >
                        <GlassCard className="p-6 bg-emerald-500/5 border-emerald-500/20">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-sm font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4" /> Forecaster Projection
                                </h4>
                                <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase">
                                    {result.complianceStatus}
                                </span>
                            </div>
                            <div className="prose prose-invert prose-sm max-w-none text-slate-300">
                                {result.finalSynthesis}
                            </div>
                        </GlassCard>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {result.tasks.map((task: any, idx: number) => (
                                <GlassCard key={idx} className="p-4 border-white/5 bg-black/20">
                                    <p className="text-[10px] font-black text-zinc-500 uppercase mb-2 tracking-tighter">{task.agent}</p>
                                    <p className="text-xs text-white leading-relaxed line-clamp-3">{task.result?.substring(0, 150)}...</p>
                                </GlassCard>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
