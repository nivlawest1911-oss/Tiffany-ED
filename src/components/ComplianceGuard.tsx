'use client';
import { motion } from 'framer-motion';
import { ShieldAlert, BookOpen, AlertTriangle } from 'lucide-react';

export default function ComplianceGuard() {
    return (
        <div className="hidden lg:block fixed bottom-8 left-8 z-50">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-zinc-900 border border-emerald-500/20 rounded-xl shadow-2xl p-4 max-w-sm"
            >
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <ShieldAlert className="text-emerald-500 w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-1">Due Process Shield Active</h4>
                        <p className="text-xs text-zinc-300 leading-snug mb-2">
                            Session ID #9921 monitored for <a href="https://alabamaadministrativecode.state.al.us/docs/ed/290-8-9.pdf" target="_blank" rel="noopener noreferrer" className="text-white font-bold hover:text-emerald-400 underline decoration-dotted underline-offset-2 transition-colors">AL Code 290-8-9</a> compliance.
                        </p>

                        <div className="flex gap-2">
                            <span className="flex items-center gap-1 text-[9px] bg-zinc-800 px-2 py-1 rounded text-zinc-400 border border-zinc-700">
                                <BookOpen size={10} /> Mastering the Maze p. 42
                            </span>
                            <span className="flex items-center gap-1 text-[9px] bg-zinc-800 px-2 py-1 rounded text-zinc-400 border border-zinc-700">
                                <AlertTriangle size={10} /> PII Redaction: ON
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
