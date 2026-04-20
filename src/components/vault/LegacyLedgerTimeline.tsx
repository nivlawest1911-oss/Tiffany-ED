'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Shield, Search, Calendar, ChevronRight, Gavel, Share2 } from 'lucide-react';
import ProfileShareModal from '@/components/modals/ProfileShareModal';
import { format } from 'date-fns';

interface LegacyEntry {
    id: string;
    title: string;
    directive: string;
    createdAt: string;
    tags: string[];
}

interface LegacyLedgerTimelineProps {
    onSelectAction: (entry: any) => void;
}

export default function LegacyLedgerTimeline({ onSelectAction }: LegacyLedgerTimelineProps) {
    const [entries, setEntries] = useState<LegacyEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [shareModal, setShareModal] = useState<{ isOpen: boolean; id: string }>({
        isOpen: false,
        id: ''
    });

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await fetch('/api/vault/legacy');
                if (response.ok) {
                    const data = await response.json();
                    setEntries(data);
                }
            } catch (error) {
                console.error('Failed to fetch legacy entries:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEntries();
    }, []);

    const filteredEntries = entries.filter(entry =>
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="space-y-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500/50" />
                <input
                    type="text"
                    placeholder="Search Immutable Chronicles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-black/40 border border-amber-500/20 rounded-lg py-2 pl-9 pr-4 text-xs text-amber-100 placeholder:text-amber-900 focus:outline-none focus:border-amber-500/50 transition-all"
                />
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                    {isLoading ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-12 gap-3"
                        >
                            <History className="w-8 h-8 text-amber-500 animate-spin" />
                            <p className="text-[10px] text-amber-500/50 font-black uppercase tracking-[0.2em]">Reconstructing Timeline</p>
                        </motion.div>
                    ) : filteredEntries.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <Shield className="w-8 h-8 text-zinc-700 mx-auto mb-3" />
                            <p className="text-xs text-zinc-500 font-medium">No legacy assets found.</p>
                        </motion.div>
                    ) : (
                        filteredEntries.map((entry, index) => (
                            <motion.div
                                key={entry.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => onSelectAction(entry)}
                                className="group relative bg-amber-950/10 border border-amber-500/10 hover:border-amber-500/40 rounded-xl p-4 cursor-pointer transition-all overflow-hidden"
                            >
                                {/* Immutability Watermark */}
                                <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity rotate-12">
                                    <Gavel className="w-20 h-20 text-amber-500" />
                                </div>

                                <div className="flex items-start justify-between gap-4 relative z-10">
                                    <div className="space-y-1 flex-1">
                                        <div className="flex items-center gap-2">
                                            <Shield className="w-3 h-3 text-amber-500" />
                                            <h4 className="text-white text-xs font-black uppercase tracking-wider group-hover:text-amber-400 transition-colors">
                                                {entry.title}
                                            </h4>
                                        </div>
                                        <p className="text-zinc-500 text-[10px] line-clamp-2 leading-relaxed">
                                            {entry.directive}
                                        </p>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {entry.tags.map(tag => (
                                                <span key={tag} className="px-1.5 py-0.5 rounded-sm bg-amber-500/5 border border-amber-500/10 text-[8px] font-bold text-amber-500 uppercase tracking-tighter">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-2 text-[8px] font-bold uppercase tracking-widest text-zinc-600">
                                        <div className="flex items-center gap-1 text-amber-500/40 hover:text-amber-500 transition-colors" onClick={(e) => {
                                            e.stopPropagation();
                                            setShareModal({ isOpen: true, id: entry.id });
                                        }}>
                                            <span>SHARE</span>
                                            <Share2 className="w-2.5 h-2.5" />
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-2.5 h-2.5" />
                                            {format(new Date(entry.createdAt), 'MMM dd, yyyy')}
                                        </div>
                                        <div className="flex items-center gap-1 text-amber-500/40 group-hover:text-amber-500 transition-colors">
                                            <span>RECONSTRUCT</span>
                                            <ChevronRight className="w-2.5 h-2.5" />
                                        </div>
                                    </div>
                                </div>

                                {/* Animated Background Glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/0 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>

            <ProfileShareModal
                isOpen={shareModal.isOpen}
                onClose={() => setShareModal({ ...shareModal, isOpen: false })}
                context="LEDGER"
                userName="EdIntel Delegate"
                userId={shareModal.id}
            />
        </div>
    );
}
