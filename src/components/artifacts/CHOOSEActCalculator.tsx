'use client';

import { motion } from 'framer-motion';
import { DollarSign, Users, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

interface CHOOSEActCalculatorProps {
    income: number;
    size: number;
}

export function CHOOSEActCalculator({ income, size }: CHOOSEActCalculatorProps) {
    // 2026 Federal Poverty Level (approximate)
    const basePovertyLevel = 15060;
    const perPersonIncrease = 5380;
    const povertyLevel = basePovertyLevel + (size - 1) * perPersonIncrease;
    const threshold = povertyLevel * 3; // 300% of poverty level
    const isEligible = income <= threshold;
    const esaAmount = 7000;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gradient-to-br ${isEligible ? 'from-green-900/20 to-zinc-950 border-green-500/20' : 'from-zinc-900 to-zinc-950 border-zinc-700'
                } border rounded-2xl p-6 shadow-xl`}
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${isEligible ? 'bg-green-500/10' : 'bg-zinc-800'}`}>
                        <DollarSign className={`w-6 h-6 ${isEligible ? 'text-green-400' : 'text-zinc-400'}`} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">CHOOSE Act Calculator</h3>
                        <p className="text-sm text-zinc-400">Alabama ESA Eligibility 2026</p>
                    </div>
                </div>
                <div className={`px-4 py-2 rounded-full font-bold text-sm ${isEligible
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                    {isEligible ? 'ELIGIBLE' : 'NOT ELIGIBLE'}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-bold text-zinc-400">Household Income</span>
                    </div>
                    <p className="text-2xl font-bold text-white">${income.toLocaleString()}</p>
                    <p className="text-xs text-zinc-500">Annual</p>
                </div>
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-bold text-zinc-400">Household Size</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{size}</p>
                    <p className="text-xs text-zinc-500">Members</p>
                </div>
            </div>

            <div className="mb-6 p-4 bg-zinc-800/50 border border-zinc-700 rounded-xl">
                <h4 className="text-sm font-bold text-white mb-3">Eligibility Calculation</h4>
                <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-zinc-400">Federal Poverty Level (2026)</span>
                        <span className="text-white font-mono">${povertyLevel.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-zinc-400">300% Threshold</span>
                        <span className="text-white font-mono">${threshold.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-zinc-700">
                        <span className="text-zinc-400">Your Income</span>
                        <span className={`font-mono font-bold ${isEligible ? 'text-green-400' : 'text-red-400'}`}>
                            ${income.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            {isEligible ? (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                    <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                        <div className="flex-1">
                            <h4 className="font-bold text-green-300 mb-2">Congratulations! You Qualify</h4>
                            <p className="text-sm text-zinc-300 mb-4">
                                Your household is eligible for an Education Savings Account (ESA) under the Alabama CHOOSE Act.
                            </p>
                            <div className="bg-zinc-900 border border-green-500/30 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-zinc-400 mb-1">Annual ESA Amount</p>
                                        <p className="text-3xl font-bold text-green-400">${esaAmount.toLocaleString()}</p>
                                    </div>
                                    <TrendingUp className="w-8 h-8 text-green-400" />
                                </div>
                                <p className="text-xs text-zinc-500 mt-3">Per eligible student</p>
                            </div>
                            <div className="mt-4 space-y-2">
                                <h5 className="text-xs font-bold text-green-300">Eligible Expenses:</h5>
                                <ul className="text-xs text-zinc-400 space-y-1">
                                    <li>✓ Private school tuition</li>
                                    <li>✓ Homeschool curriculum</li>
                                    <li>✓ Tutoring services</li>
                                    <li>✓ Educational therapy</li>
                                    <li>✓ Online learning programs</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <div className="flex items-start gap-3">
                        <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
                        <div>
                            <h4 className="font-bold text-red-300 mb-2">Not Currently Eligible</h4>
                            <p className="text-sm text-zinc-300">
                                Your household income exceeds the 300% poverty level threshold for the CHOOSE Act ESA program.
                            </p>
                            <p className="text-xs text-zinc-500 mt-2">
                                Income must be ${(threshold - income).toLocaleString()} lower to qualify.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="pt-6 border-t border-zinc-800">
                <p className="text-xs text-zinc-500">
                    Calculation based on 2026 Federal Poverty Guidelines |
                    Alabama CHOOSE Act |
                    Generated: {new Date().toLocaleDateString()}
                </p>
            </div>
        </motion.div>
    );
}
