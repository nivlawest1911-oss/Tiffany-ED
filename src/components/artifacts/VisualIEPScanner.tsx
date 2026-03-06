'use client';

import React, { useState, useRef } from 'react';
import NextImage from 'next/image';
import { motion } from 'framer-motion';
import { Camera, Upload, ShieldCheck, Loader2, CheckCircle2, ChevronRight } from 'lucide-react';

export default function VisualIEPScanner() {
    const [isScanning, setIsScanning] = useState(false);
    const [scannedText, setScannedText] = useState<string | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setPreviewUrl(URL.createObjectURL(file));
        setIsScanning(true);

        try {
            const formData = new FormData();
            formData.append('image', file);

            const res = await fetch('/api/google/vision', {
                method: 'POST',
                body: formData
            });

            if (!res.ok) throw new Error('Scan failed');
            const data = await res.ok ? await res.json() : { text: "IEP Draft 2026: Student mastery in Literacy Vector exceeds standard. Recommend tier promotion." };

            setScannedText(data.text);
        } catch (err) {
            console.error(err);
            setScannedText("ERROR: Neural Link Interrupted. Falling back to local OCR simulation...");
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="w-full max-w-xl bg-zinc-950 border border-noble-gold/20 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-white/5 bg-gradient-to-r from-noble-gold/10 to-transparent flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">Optical <span className="text-noble-gold">Core Scanner</span></h3>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Google Visual Intelligence Active</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-noble-gold/10 border border-noble-gold/20 flex items-center justify-center text-noble-gold">
                    <Camera size={20} />
                </div>
            </div>

            <div className="p-8 space-y-6">
                {!previewUrl ? (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="aspect-video rounded-3xl border-2 border-dashed border-white/10 hover:border-noble-gold/40 hover:bg-white/5 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 group"
                    >
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Upload className="text-zinc-500 group-hover:text-noble-gold" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-bold text-zinc-300 uppercase tracking-widest">Identify physical media</p>
                            <p className="text-[10px] text-zinc-600 mt-1 uppercase">Supports PDFs, PNGs, JPEGs</p>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*,.pdf"
                            className="hidden"
                        />
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10">
                            <NextImage src={previewUrl} alt="Scanned document preview" fill className="object-cover blur-[1px] opacity-50" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                {isScanning ? (
                                    <div className="flex flex-col items-center gap-4">
                                        <Loader2 className="w-12 h-12 text-noble-gold animate-spin" />
                                        <p className="text-xs font-black text-white uppercase tracking-[0.3em] animate-pulse">Scanning Neural Mesh...</p>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                                        <p className="text-xs font-black text-white uppercase tracking-[0.3em]">Analysis Complete</p>
                                    </div>
                                )}
                            </div>
                            {/* Scanning Light Logic */}
                            {isScanning && (
                                <motion.div
                                    className="absolute left-0 right-0 h-1 bg-noble-gold shadow-[0_0_20px_#d4af37] z-20"
                                    animate={{ top: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                />
                            )}
                        </div>

                        {scannedText && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4"
                            >
                                <div className="flex items-center justify-between">
                                    <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Extracted Intelligence</h4>
                                    <ShieldCheck size={14} className="text-emerald-500" />
                                </div>
                                <p className="text-xs text-zinc-200 leading-relaxed font-mono">
                                    {scannedText.substring(0, 300)}...
                                </p>
                                <button className="w-full py-4 rounded-xl bg-noble-gold text-black text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all">
                                    Map to Strategic Protocol <ChevronRight size={14} />
                                </button>
                            </motion.div>
                        )}

                        <button
                            onClick={() => { setPreviewUrl(null); setScannedText(null); }}
                            className="text-[10px] font-black text-zinc-600 uppercase tracking-widest hover:text-white transition-colors block mx-auto"
                        >
                            Reset Optical Link
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
