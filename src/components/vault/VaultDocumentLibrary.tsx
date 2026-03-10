"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Trash2, Loader2, Search, ExternalLink, Calendar, Database } from 'lucide-react';
import { toast } from 'sonner';

interface Document {
    id: string;
    fileName: string;
    content?: string;
    createdAt: string;
    metadata: any;
    tags: string[];
}

export default function VaultDocumentLibrary({ onSelectAction }: { onSelectAction?: (doc: Document) => void }) {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/vault/documents');
            if (response.ok) {
                const data = await response.json();
                setDocuments(data);
            }
        } catch (_err) {
            console.error('Failed to fetch documents');
            toast.error('Failed to load institutional library');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to remove this intelligence asset from the vault?')) return;

        try {
            const response = await fetch(`/api/vault/documents/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setDocuments(docs => docs.filter(d => d.id !== id));
                toast.success('Document purged from secure storage');
            }
        } catch (_err) {
            toast.error('Failed to delete document');
        }
    };

    const filteredDocs = documents.filter(doc =>
        doc.fileName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
                    <Database className="w-4 h-4 text-indigo-400" />
                    Institutional Intelligence Library
                </h3>
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search library..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-slate-900/50 border border-slate-800 rounded-md pl-7 pr-2 py-1 text-[10px] text-slate-300 focus:outline-none focus:border-indigo-500 transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <AnimatePresence mode="popLayout">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-12 text-slate-500 gap-3 border border-dashed border-slate-800 rounded-xl">
                            <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
                            <span className="text-[10px] font-bold uppercase tracking-tighter">Syncing with Secure Node...</span>
                        </div>
                    ) : filteredDocs.length === 0 ? (
                        <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl">
                            <FileText className="w-8 h-8 text-slate-700 mx-auto mb-3" />
                            <div className="text-slate-400 text-xs font-medium">Vault is Empty</div>
                            <div className="text-[10px] text-slate-600 uppercase mt-1">Upload documents to begin analysis</div>
                        </div>
                    ) : (
                        filteredDocs.map((doc) => (
                            <motion.div
                                key={doc.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                onClick={() => onSelectAction?.(doc)}
                                className="group p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-indigo-500/50 hover:bg-slate-800/50 transition-all cursor-pointer relative overflow-hidden"
                            >
                                <div className="flex items-start justify-between relative z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors line-clamp-1">{doc.fileName}</div>
                                            <div className="flex items-center gap-3 mt-1">
                                                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(doc.createdAt).toLocaleDateString()}
                                                </div>
                                                {doc.tags.length > 0 && (
                                                    <div className="flex gap-1">
                                                        {doc.tags.map(tag => (
                                                            <span key={tag} className="px-1.5 py-0.5 rounded bg-slate-800 text-[8px] text-slate-400 uppercase tracking-tighter border border-slate-700">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => handleDelete(doc.id, e)}
                                            title="Purge Intelligence"
                                            className="p-2 text-slate-600 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-indigo-400" />
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl -mr-12 -mt-12 group-hover:bg-indigo-500/10 transition-all" />
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
