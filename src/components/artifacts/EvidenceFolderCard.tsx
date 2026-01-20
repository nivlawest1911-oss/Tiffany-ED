'use client';

import { motion } from 'framer-motion';
import { FileText, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

interface EvidenceFolderCardProps {
    data: any[];
    studentId: string;
}

export function EvidenceFolderCard({ data, studentId }: EvidenceFolderCardProps) {
    const riskLevel = data.length > 5 ? 'high' : data.length > 2 ? 'medium' : 'low';
    const riskColor = riskLevel === 'high' ? 'text-red-500' : riskLevel === 'medium' ? 'text-yellow-500' : 'text-green-500';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl p-6 shadow-xl"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-500/10 rounded-xl">
                        <FileText className="w-6 h-6 text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Evidence Folder</h3>
                        <p className="text-sm text-zinc-400">Student ID: {studentId}</p>
                    </div>
                </div>
                <div className={`flex items-center gap-2 ${riskColor}`}>
                    {riskLevel === 'high' ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                    <span className="text-sm font-bold uppercase">{riskLevel} Risk</span>
                </div>
            </div>

            <div className="space-y-3">
                {data.length === 0 ? (
                    <div className="text-center py-8 text-zinc-500">
                        <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
                        <p className="font-medium">No compliance issues detected</p>
                    </div>
                ) : (
                    data.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h4 className="font-bold text-white mb-1">{item.category || 'General'}</h4>
                                    <p className="text-sm text-zinc-400">{item.description || 'Evidence item'}</p>
                                    <p className="text-xs text-zinc-500 mt-2">
                                        {new Date(item.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <TrendingUp className="w-4 h-4 text-yellow-500" />
                            </div>
                        </motion.div>
                    ))
                )}
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-800">
                <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-400">Total Evidence Items</span>
                    <span className="font-bold text-white">{data.length}</span>
                </div>
            </div>
        </motion.div>
    );
}
