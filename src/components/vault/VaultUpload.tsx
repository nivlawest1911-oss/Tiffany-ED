"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VaultUploadProps {
    userId: string;
    onUploadComplete: () => void;
}

export default function VaultUpload({ userId, onUploadComplete }: VaultUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (!supabase) {
            setErrorMessage('Supabase client not initialized.');
            setUploadStatus('error');
            return;
        }

        setIsUploading(true);
        setUploadStatus('idle');
        setErrorMessage('');

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${userId}/${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            // 1. Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('vault')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Create DB Record (VaultDocument)
            // Note: This relies on an API route or server action to create the DB record securely.
            // For now, we will assume we can insert directly or call an API.
            // Let's assume we call an API endpoint for security and audit logging.

            const response = await fetch('/api/vault/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fileName: file.name,
                    fileSize: file.size,
                    fileType: file.type,
                    storagePath: filePath,
                    userId: userId // In validation, we should get userId from session
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create document record.');
            }

            setUploadStatus('success');
            onUploadComplete();

            // Reset success message after 3 seconds
            setTimeout(() => setUploadStatus('idle'), 3000);

        } catch (error: any) {
            console.error('Upload failed:', error);
            setErrorMessage(error.message || 'Upload failed');
            setUploadStatus('error');
        } finally {
            setIsUploading(false);
            // Reset file input
            event.target.value = '';
        }
    };

    return (
        <div className="w-full">
            <div className="relative group">
                <input
                    type="file"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
                />
                <div className={`
          flex items-center justify-center gap-3 px-6 py-4 rounded-xl border-2 border-dashed
          transition-all duration-300
          ${isUploading
                        ? 'border-indigo-500/50 bg-indigo-500/5'
                        : uploadStatus === 'error'
                            ? 'border-red-500/50 bg-red-500/5'
                            : 'border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800/50'
                    }
        `}>
                    <AnimatePresence mode="wait">
                        {isUploading ? (
                            <motion.div
                                key="uploading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-2 text-indigo-400"
                            >
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span className="font-medium">Encrypting & Uploading...</span>
                            </motion.div>
                        ) : uploadStatus === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-2 text-emerald-400"
                            >
                                <CheckCircle className="w-5 h-5" />
                                <span className="font-medium">Securely Archived</span>
                            </motion.div>
                        ) : uploadStatus === 'error' ? (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-2 text-red-400"
                            >
                                <AlertCircle className="w-5 h-5" />
                                <span className="font-medium">{errorMessage}</span>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="idle"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-3 text-slate-400 group-hover:text-indigo-300"
                            >
                                <Upload className="w-5 h-5" />
                                <span className="font-medium">Upload Document to Vault</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <p className="mt-2 text-xs text-center text-slate-500">
                Secured by Sovereign Gatekeeper. All uploads are encrypted.
            </p>
        </div>
    );
}
