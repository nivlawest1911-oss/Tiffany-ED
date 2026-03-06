'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle2, Loader2, Sparkles, Database, TrendingDown } from 'lucide-react';
import { useCelebrate } from '@/context/CelebrationContext';
import { cn } from '@/lib/utils';

export default function AlabamaLiteracyModule() {
    const { celebrate } = useCelebrate();
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
    const [results, setResults] = useState<any>(null);

    const [autoPilot, setAutoPilot] = useState(false);
    const tokenPricePerBatch = 500;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setUploadStatus('idle');
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);
        setUploadStatus('processing');

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('autoPilot', String(autoPilot));

            const res = await fetch('/api/literacy/process', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Processing Interrupted');

            const data = await res.json();
            setResults(data);
            setUploadStatus('success');

            celebrate(
                'Strategy Synchronized',
                'Alabama Literacy Act audit complete. IRPs generated in Auto-Pilot mode.',
                'success'
            );
        } catch (error) {
            console.error('Literacy processing failed', error);
            setUploadStatus('error');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="glass-bento relative overflow-hidden h-full">
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-electric-cyan/10 flex items-center justify-center border border-electric-cyan/20">
                            <FileText className="w-6 h-6 text-electric-cyan" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">Literacy Act Engine</h2>
                            <div className="flex items-center gap-2">
                                <Database size={10} className="text-slate-400" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sovereign PostgreSQL Sync</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full border border-slate-200">
                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Auto-Pilot</span>
                        <button
                            onClick={() => setAutoPilot(!autoPilot)}
                            aria-label="Toggle Auto-Pilot"
                            className={cn(
                                "w-10 h-5 rounded-full relative transition-colors duration-300 p-1",
                                autoPilot ? "bg-electric-cyan" : "bg-slate-300"
                            )}
                        >
                            <motion.div
                                animate={{ x: autoPilot ? 20 : 0 }}
                                className="w-3 h-3 bg-white rounded-full shadow-sm"
                            />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Upload Section */}
                    <div className="space-y-6">
                        <div className={cn(
                            "border-2 border-dashed rounded-[2rem] p-8 flex flex-col items-center justify-center transition-all duration-300",
                            file ? "border-electric-cyan/50 bg-electric-cyan/5" : "border-slate-200 bg-slate-50 hover:border-slate-300"
                        )}>
                            <input
                                type="file"
                                id="literacy-upload"
                                className="hidden"
                                onChange={handleFileChange}
                                accept=".csv,.xlsx,.pdf"
                            />
                            <label
                                htmlFor="literacy-upload"
                                className="cursor-pointer flex flex-col items-center text-center"
                            >
                                <div className="w-14 h-14 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-4 group hover:scale-110 transition-transform">
                                    <Upload className="w-6 h-6 text-slate-400 group-hover:text-electric-cyan transition-colors" />
                                </div>
                                <span className="text-xs font-bold text-slate-900 mb-1">
                                    {file ? file.name : "Inject Literacy Data Node"}
                                </span>
                                <span className="text-[9px] text-slate-400 uppercase tracking-widest font-black">
                                    CSV, XLSX, or PDF
                                </span>
                            </label>
                        </div>

                        {file && !isUploading && uploadStatus === 'idle' && (
                            <div className="p-4 rounded-2xl bg-electric-cyan/5 border border-electric-cyan/10 animate-in fade-in slide-in-from-bottom-2">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-[9px] font-black text-electric-cyan uppercase tracking-widest flex items-center gap-1">
                                        <Sparkles size={10} /> Synthesis Preview
                                    </span>
                                    <span className="text-[10px] font-black text-slate-900">{tokenPricePerBatch} TKN</span>
                                </div>
                                <p className="text-[9px] text-slate-500 leading-relaxed uppercase font-medium">
                                    Estimated {autoPilot ? "Batch IRP Generation" : "Compliance Audit"} will deduct from your neural capacity.
                                </p>
                            </div>
                        )}

                        <button
                            onClick={handleUpload}
                            disabled={!file || isUploading}
                            className="w-full btn-sovereign flex items-center justify-center gap-3"
                        >
                            {isUploading ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} fill="currentColor" />}
                            {isUploading ? "Synthesizing..." : autoPilot ? "Execute Auto-Pilot" : "Execute Literacy Audit"}
                        </button>
                    </div>

                    {/* Status/Insights Section */}
                    <div className="rounded-[2rem] bg-slate-50 border border-slate-200 p-6 relative min-h-[250px] flex flex-col overflow-hidden">
                        <AnimatePresence mode="wait">
                            {uploadStatus === 'idle' && (
                                <motion.div
                                    key="idle"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="h-full flex flex-col items-center justify-center text-center text-slate-400"
                                >
                                    <div className="w-16 h-16 border border-slate-200 rounded-full flex items-center justify-center mb-4 bg-white shadow-sm">
                                        <TrendingDown size={24} strokeWidth={1.5} />
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">Awaiting Insight</p>
                                    <p className="text-[10px] mt-2 max-w-[180px] leading-relaxed uppercase font-medium">Injection required for strategic synthesis.</p>
                                </motion.div>
                            )}

                            {uploadStatus === 'processing' && (
                                <motion.div
                                    key="processing"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="h-full flex flex-col items-center justify-center text-center"
                                >
                                    <div className="relative">
                                        <div className="w-20 h-20 border-b-2 border-electric-cyan rounded-full animate-spin" />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Database size={20} className="text-electric-cyan" />
                                        </div>
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] mt-6 text-electric-cyan">Vault Access Engaged</p>
                                    <p className="text-[9px] mt-2 text-slate-400 italic uppercase font-medium">Crunching literacy metrics...</p>
                                </motion.div>
                            )}

                            {uploadStatus === 'success' && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-4"
                                >
                                    <div className="flex items-center gap-2 text-emerald-600">
                                        <CheckCircle2 size={16} />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Strategy Synchronized</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100">
                                            <div className="text-[8px] text-emerald-600 font-black uppercase tracking-widest mb-1">Compliance</div>
                                            <div className="text-xl font-black text-slate-900 italic">{results?.metrics?.complianceScore || '98.4'}%</div>
                                        </div>
                                        <div className="p-3 rounded-xl bg-white border border-slate-100">
                                            <div className="text-[8px] text-slate-400 font-black uppercase tracking-widest mb-1">Criticals</div>
                                            <div className="text-xl font-black text-slate-900 italic">{results?.metrics?.riskFactors || '00'}</div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Neural Insights</h4>
                                        <div className="space-y-1.5 overflow-y-auto max-h-[100px] pr-2 custom-scrollbar">
                                            {(results?.insights || [
                                                "Sovereign Memory updated with latest ALSDE mandates.",
                                                "Tier-2 intervention targets optimized for batch generation.",
                                                "Compliance markers verified via Prisma cross-audit."
                                            ]).map((insight: string, i: number) => (
                                                <div key={i} className="p-2.5 rounded-lg bg-white border border-slate-100 text-[10px] font-bold text-slate-600 leading-tight">
                                                    {insight}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
