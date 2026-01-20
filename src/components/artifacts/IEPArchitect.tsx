'use client';

import { motion } from 'framer-motion';
import { FileText, Users, Target, Calendar, Shield } from 'lucide-react';

interface IEPArchitectProps {
    studentId: string;
    type: 'initial' | 'annual' | 'amendment';
}

export function IEPArchitect({ studentId, type }: IEPArchitectProps) {
    const typeLabels = {
        initial: 'Initial IEP',
        annual: 'Annual Review',
        amendment: 'IEP Amendment'
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-indigo-900/20 to-zinc-950 border border-indigo-500/20 rounded-2xl p-6 shadow-xl"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-500/10 rounded-xl">
                        <FileText className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">IEP Architect</h3>
                        <p className="text-sm text-indigo-300">Alabama SB 280 Unified Platform</p>
                    </div>
                </div>
                <div className="px-4 py-2 bg-indigo-500/20 rounded-full">
                    <span className="text-xs font-bold text-indigo-300">{typeLabels[type]}</span>
                </div>
            </div>

            <div className="mb-6 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-indigo-400 mt-0.5" />
                    <div>
                        <h4 className="font-bold text-indigo-300 mb-1">Paperwork Streamlining Act (SB 280)</h4>
                        <p className="text-sm text-zinc-400">
                            This unified digital platform consolidates Literacy Act, Numeracy Act, and IEP documentation,
                            reducing teacher paperwork burden by up to 70%.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs font-bold text-zinc-400">Team Members</span>
                    </div>
                    <p className="text-2xl font-bold text-white">5</p>
                    <p className="text-xs text-zinc-500">Required Participants</p>
                </div>
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-yellow-400" />
                        <span className="text-xs font-bold text-zinc-400">Review Cycle</span>
                    </div>
                    <p className="text-2xl font-bold text-white">Annual</p>
                    <p className="text-xs text-zinc-500">3-Year Re-eval</p>
                </div>
            </div>

            <div className="mb-6">
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    SMART Goals Framework
                </h4>
                <div className="space-y-3">
                    <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
                        <h5 className="font-bold text-indigo-300 mb-2">Goal 1: Reading Comprehension</h5>
                        <p className="text-sm text-zinc-400 mb-3">
                            By EOY, when presented with grade-level text, student will demonstrate 80% comprehension
                            across 5 consecutive trials with minimal prompting.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">Measurable</span>
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">Time-Bound</span>
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded">Achievable</span>
                        </div>
                    </div>
                    <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
                        <h5 className="font-bold text-indigo-300 mb-2">Goal 2: Math Fluency</h5>
                        <p className="text-sm text-zinc-400 mb-3">
                            Student will solve 20 single-digit addition problems with 90% accuracy in 3 minutes
                            by Q3, utilizing digital scaffolding tools.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded">Specific</span>
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded">Relevant</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h4 className="text-sm font-bold text-white mb-3">Accommodations</h4>
                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-3 text-sm text-zinc-300">
                        ✓ Extended time (50%)
                    </div>
                    <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-3 text-sm text-zinc-300">
                        ✓ Reduced distraction
                    </div>
                    <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-3 text-sm text-zinc-300">
                        ✓ Digital scaffolding
                    </div>
                    <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-3 text-sm text-zinc-300">
                        ✓ Multi-sensory tools
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-zinc-800">
                <div className="flex items-center justify-between text-sm">
                    <div>
                        <p className="text-xs text-zinc-500">
                            Student ID: <span className="text-indigo-400 font-mono">{studentId}</span>
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">
                            Compliance: <span className="text-green-400">Alabama Code 290-8-9 ✓</span>
                        </p>
                    </div>
                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-xs transition-colors">
                        Export IEP
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
