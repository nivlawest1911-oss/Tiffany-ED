'use client';

import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Shield } from 'lucide-react';

interface ComplianceChecklistProps {
    results: {
        compliant: boolean;
        violations: string[];
        recommendations: string[];
        codeReferences: string[];
    };
}

export function ComplianceChecklist({ results }: ComplianceChecklistProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-xl"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${results.compliant ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                        <Shield className={`w-6 h-6 ${results.compliant ? 'text-green-400' : 'text-red-400'}`} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Compliance Audit</h3>
                        <p className="text-sm text-zinc-400">Alabama Code 290-8-9</p>
                    </div>
                </div>
                <div className={`px-4 py-2 rounded-full font-bold text-sm ${results.compliant
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                    {results.compliant ? 'COMPLIANT' : 'NON-COMPLIANT'}
                </div>
            </div>

            {results.violations.length > 0 && (
                <div className="mb-6">
                    <h4 className="text-sm font-bold text-red-400 mb-3 flex items-center gap-2">
                        <XCircle className="w-4 h-4" />
                        Violations Detected
                    </h4>
                    <div className="space-y-2">
                        {results.violations.map((violation, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-red-500/10 border border-red-500/20 rounded-xl p-3"
                            >
                                <p className="text-sm text-red-300">{violation}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            <div className="mb-6">
                <h4 className="text-sm font-bold text-blue-400 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Recommendations
                </h4>
                <div className="space-y-2">
                    {results.recommendations.map((rec, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3"
                        >
                            <p className="text-sm text-blue-300">{rec}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="pt-6 border-t border-zinc-800">
                <h4 className="text-sm font-bold text-zinc-400 mb-3">Legal References</h4>
                <div className="space-y-2">
                    {results.codeReferences.map((ref, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-zinc-500">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>{ref}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
