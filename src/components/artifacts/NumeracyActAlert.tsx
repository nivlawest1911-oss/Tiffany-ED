'use client';

import { motion } from 'framer-motion';
import { Calculator, AlertTriangle, TrendingDown, Target } from 'lucide-react';

interface NumeracyActAlertProps {
    studentId: string;
    score: number;
}

export function NumeracyActAlert({ studentId, score }: NumeracyActAlertProps) {
    const threshold = 40; // Below 40% triggers intervention
    const needsIntervention = score < threshold;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gradient-to-br ${needsIntervention ? 'from-red-900/20 to-zinc-950 border-red-500/20' : 'from-green-900/20 to-zinc-950 border-green-500/20'
                } border rounded-2xl p-6 shadow-xl`}
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${needsIntervention ? 'bg-red-500/10' : 'bg-green-500/10'}`}>
                        <Calculator className={`w-6 h-6 ${needsIntervention ? 'text-red-400' : 'text-green-400'}`} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Numeracy Act Assessment</h3>
                        <p className="text-sm text-zinc-400">Alabama Numeracy Act 2026</p>
                    </div>
                </div>
                <div className={`px-4 py-2 rounded-full font-bold text-sm ${needsIntervention
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}>
                    {needsIntervention ? 'INTERVENTION REQUIRED' : 'ON TRACK'}
                </div>
            </div>

            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-zinc-400">Assessment Score</span>
                    <span className="text-sm text-zinc-500">Threshold: {threshold}%</span>
                </div>
                <div className="relative h-4 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full ${needsIntervention
                                ? 'bg-gradient-to-r from-red-600 to-red-500'
                                : 'bg-gradient-to-r from-green-600 to-green-500'
                            }`}
                    />
                </div>
                <div className="flex items-center justify-between mt-2">
                    <span className={`text-3xl font-bold ${needsIntervention ? 'text-red-400' : 'text-green-400'}`}>
                        {score}%
                    </span>
                    {needsIntervention && (
                        <div className="flex items-center gap-2 text-red-400">
                            <TrendingDown className="w-5 h-5" />
                            <span className="text-sm font-bold">Below Threshold</span>
                        </div>
                    )}
                </div>
            </div>

            {needsIntervention && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                        <div>
                            <h4 className="font-bold text-red-300 mb-2">Required Actions (Section 5)</h4>
                            <ul className="space-y-2 text-sm text-zinc-300">
                                <li className="flex items-start gap-2">
                                    <Target className="w-4 h-4 text-red-400 mt-0.5" />
                                    <span>Implement Tier I math intervention (60 min/day)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Target className="w-4 h-4 text-red-400 mt-0.5" />
                                    <span>Written parent report within 15 days (Section 6)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Target className="w-4 h-4 text-red-400 mt-0.5" />
                                    <span>Dyscalculia screening recommended (Section 9)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Target className="w-4 h-4 text-red-400 mt-0.5" />
                                    <span>Summer camp eligibility assessment</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            <div className="pt-6 border-t border-zinc-800">
                <p className="text-xs text-zinc-500">
                    Student ID: <span className="text-purple-400 font-mono">{studentId}</span>
                </p>
                <p className="text-xs text-zinc-500 mt-1">
                    Assessment Date: {new Date().toLocaleDateString()} |
                    Next Review: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </p>
            </div>
        </motion.div>
    );
}
