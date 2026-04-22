"use client";

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, File, X, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { uploadToVault } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import GlassPanel from '@/components/ui/GlassPanel';
import SovereignButton from '@/components/ui/SovereignButton';

interface VaultUploaderProps {
    companionId: string;
    onUploadComplete?: () => void;
}

export const VaultUploader: React.FC<VaultUploaderProps> = ({ companionId, onUploadComplete }) => {
    const { user } = useAuth();
    const [files, setFiles] = useState<{ file: File; status: 'idle' | 'uploading' | 'success' | 'error'; progress: number }[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map(file => ({
            file,
            status: 'idle' as const,
            progress: 0
        }));
        setFiles(prev => [...prev, ...newFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'text/plain': ['.txt'],
            'text/markdown': ['.md'],
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        },
        maxSize: 10 * 1024 * 1024 // 10MB
    });

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleUpload = async () => {
        if (!user) {
            toast.error('Authentication Required');
            return;
        }

        setIsProcessing(true);
        
        for (let i = 0; i < files.length; i++) {
            if (files[i].status === 'success') continue;

            const currentFile = files[i];
            setFiles(prev => prev.map((f, idx) => idx === i ? { ...f, status: 'uploading' } : f));

            try {
                // âš ï¸ Alpha Note: Client-side text extraction for PDF is complex without heavy libs.
                // For now, we ingest .txt and .md content directly. PDF ingestion will be expanded later.
                let content = "";
                if (currentFile.file.name.endsWith('.txt') || currentFile.file.name.endsWith('.md')) {
                    content = await currentFile.file.text();
                } else {
                    // Mock content for PDF/DOCX until server-side processor is live
                    content = `[DOCUMENT_PLACEHOLDER: ${currentFile.file.name}] - Institutional logic preservation active.`;
                }

                const result = await uploadToVault(
                    companionId,
                    user.id,
                    currentFile.file.name,
                    content,
                    { size: currentFile.file.size, type: currentFile.file.type }
                );

                if (result) {
                    setFiles(prev => prev.map((f, idx) => idx === i ? { ...f, status: 'success' } : f));
                } else {
                    throw new Error('Supabase reject');
                }
            } catch (error) {
                console.error('Vault upload failed:', error);
                setFiles(prev => prev.map((f, idx) => idx === i ? { ...f, status: 'error' } : f));
                toast.error(`Failed to ingest ${currentFile.file.name}`);
            }
        }

        setIsProcessing(false);
        if (onUploadComplete) onUploadComplete();
    };

    return (
        <GlassPanel className="p-6 border-[#c5a47e]/10 bg-black/20">
            <div className="mb-4">
                <h3 className="text-sm font-heading text-[#c5a47e] uppercase tracking-widest mb-1 flex items-center gap-2">
                    <Upload size={14} />
                    Knowledge Ingestion
                </h3>
                <p className="text-[10px] text-white/40 uppercase tracking-tighter">Neural Context for your Sovereign Companion</p>
            </div>

            <div 
                {...getRootProps()} 
                className={`
                    border-2 border-dashed rounded-2xl p-8 transition-all cursor-pointer flex flex-col items-center justify-center gap-3
                    ${isDragActive ? 'border-[#c5a47e] bg-[#c5a47e]/5' : 'border-white/10 hover:border-white/20 bg-white/5'}
                `}
            >
                <input {...getInputProps()} />
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Upload className="text-white/40" size={20} />
                </div>
                <div className="text-center">
                    <p className="text-xs text-white/60">Drag institutional docs here</p>
                    <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">PDF, DOCX, TXT, MD (Max 10MB)</p>
                </div>
            </div>

            <AnimatePresence>
                {files.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 space-y-2"
                    >
                        {files.map((f, i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                                <File size={16} className="text-[#c5a47e]" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-[11px] text-white/80 truncate">{f.file.name}</p>
                                    <p className="text-[9px] text-white/40 capitalize">{f.status}</p>
                                </div>
                                {f.status === 'uploading' && <Loader2 size={14} className="animate-spin text-[#c5a47e]" />}
                                {f.status === 'success' && <CheckCircle size={14} className="text-emerald-400" />}
                                {f.status === 'error' && <AlertCircle size={14} className="text-rose-400" />}
                                <button 
                                    disabled={isProcessing}
                                    aria-label={`Remove ${f.file.name}`}
                                    onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                                    className="p-1 hover:bg-white/10 rounded-md transition-colors"
                                >
                                    <X size={14} className="text-white/40" />
                                </button>
                            </div>
                        ))}

                        <div className="pt-4">
                            <SovereignButton 
                                className="w-full text-[11px] py-3"
                                onClick={handleUpload}
                                disabled={isProcessing || files.every(f => f.status === 'success')}
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="animate-spin mr-2" size={14} />
                                        Neural Indexing...
                                    </>
                                ) : (
                                    'Commence Ingestion'
                                )}
                            </SovereignButton>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </GlassPanel>
    );
};
