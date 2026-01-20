'use client';

import { motion } from 'framer-motion';
import { BookOpen, Clock, AlertCircle, FileText } from 'lucide-react';

interface LiteracyActReportProps {
    studentId: string;
    deficiencies: string[];
}

export function LiteracyActReport({ studentId, deficiencies }: LiteracyActReportProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-900/20 to-zinc-950 border border-purple-500/20 rounded-2xl p-6 shadow-xl"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-500/10 rounded-xl">
                        <BookOpen className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Individual Reading Plan (IRP)</h3>
                        <p className="text-sm text-purple-300">Alabama Literacy Act § 16-6G-5</p>
                    </div>
                </div>
                <div className="px-4 py-2 bg-purple-500/20 rounded-full">
                    <span className="text-xs font-bold text-purple-300">REQUIRED</span>
                </div>
            </div>

            <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                        <h4 className="font-bold text-purple-300 mb-1">Compliance Requirement</h4>
                        <p className="text-sm text-zinc-400">
                            IRP must be created within <span className="text-purple-400 font-bold">30 days</span> of deficiency identification.
                            Mandatory <span className="text-purple-400 font-bold">60 min/day</span> Tier I instruction required.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Identified Deficiencies
                </h4>
                <div className="space-y-2">
                    {deficiencies.map((deficiency, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-3"
                        >
                            <p className="text-sm text-zinc-300">{deficiency}</p>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-purple-400" />
                        <span className="text-xs font-bold text-zinc-400">Daily Instruction</span>
                    </div>
                    <p className="text-2xl font-bold text-white">60 min</p>
                    <p className="text-xs text-zinc-500">Tier I Required</p>
                </div>
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-yellow-400" />
                        <span className="text-xs font-bold text-zinc-400">Parent Notice</span>
                    </div>
                    <p className="text-2xl font-bold text-white">15 days</p>
                    <p className="text-xs text-zinc-500">Notification Deadline</p>
                </div>
            </div>

            <div className="pt-6 border-t border-zinc-800">
                <p className="text-xs text-zinc-500">
                    Student ID: <span className="text-purple-400 font-mono">{studentId}</span>
                </p>
                <p className="text-xs text-zinc-500 mt-1">
                    Generated: {new Date().toLocaleDateString()} | Status: <span className="text-yellow-400">Pending Implementation</span>
                </p>
            </div>
        </motion.div>
    );
}
