"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Command,
    FileText,
    Zap,
    Shield,
    Cpu,
    ArrowRight,
    X
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { InstitutionalSearch, SearchResult } from '@/lib/InstitutionalSearch';

export const CommandPalette: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        const performSearch = async () => {
            if (query.trim().length === 0) {
                setResults([]);
                return;
            }

            setIsSearching(true);
            const searchEngine = InstitutionalSearch.getInstance();
            const res = await searchEngine.search(query);
            setResults(res);
            setIsSearching(false);
            setActiveIndex(0);
        };

        const timeoutId = setTimeout(performSearch, 300);
        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleSelect = (result: SearchResult) => {
        setIsOpen(false);
        setQuery('');
        router.push(result.url);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            setActiveIndex(prev => (prev + 1) % results.length);
        } else if (e.key === 'ArrowUp') {
            setActiveIndex(prev => (prev - 1 + results.length) % results.length);
        } else if (e.key === 'Enter' && results[activeIndex]) {
            handleSelect(results[activeIndex]);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        onClick={() => setIsOpen(false)}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-zinc-900/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                    >
                        <div className="flex items-center px-4 py-4 border-b border-white/5">
                            <Search className="w-5 h-5 text-zinc-400 mr-3" />
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Universal institutional search... (Ctrl+K)"
                                className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder:text-zinc-600 font-medium"
                            />
                            <div className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded-md border border-white/5">
                                <Command size={12} className="text-zinc-500" />
                                <span className="text-[10px] font-bold text-zinc-500 uppercase">K</span>
                            </div>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                            {isSearching ? (
                                <div className="p-12 flex flex-col items-center justify-center text-zinc-500 gap-4">
                                    <div className="w-8 h-8 rounded-full border-2 border-cyan-500/20 border-t-cyan-500 animate-spin" />
                                    <span className="text-xs font-black uppercase tracking-widest italic opacity-50">Synthesizing Results...</span>
                                </div>
                            ) : results.length > 0 ? (
                                <div className="p-2 space-y-1">
                                    {results.map((result, index) => (
                                        <button
                                            key={result.id}
                                            onClick={() => handleSelect(result)}
                                            onMouseEnter={() => setActiveIndex(index)}
                                            className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 group ${index === activeIndex ? 'bg-white/10 ring-1 ring-white/10' : 'hover:bg-white/5'
                                                }`}
                                        >
                                            <div className={`p-2 rounded-lg mr-4 ${result.type === 'vault' ? 'bg-indigo-500/10 text-indigo-400' :
                                                result.type === 'academy' ? 'bg-cyan-500/10 text-cyan-400' :
                                                    result.type === 'education' ? 'bg-emerald-500/10 text-emerald-400' :
                                                        'bg-purple-500/10 text-purple-400'
                                                }`}>
                                                {result.type === 'vault' ? <Shield size={18} /> :
                                                    result.type === 'academy' ? <Zap size={18} /> :
                                                        result.type === 'education' ? <FileText size={18} /> :
                                                            <Cpu size={18} />}
                                            </div>
                                            <div className="flex-1 text-left">
                                                <div className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-wide">
                                                    {result.title}
                                                </div>
                                                <div className="text-xs text-zinc-500 line-clamp-1 font-medium">
                                                    {result.description}
                                                </div>
                                            </div>
                                            <div className={`transition-all duration-300 ${index === activeIndex ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
                                                <ArrowRight size={14} className="text-cyan-500" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : query.length > 0 ? (
                                <div className="p-12 text-center text-zinc-500">
                                    <X size={24} className="mx-auto mb-4 opacity-20" />
                                    <p className="text-xs uppercase tracking-[0.2em] font-black italic">No records found within the current intelligence layer.</p>
                                </div>
                            ) : (
                                <div className="p-8 space-y-6">
                                    <div>
                                        <h4 className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-black mb-4 px-2">Recent Navigations</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            {['The Room', 'Academy', 'Vault', 'Education Hub'].map((item) => (
                                                <div key={item} className="flex items-center p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer group">
                                                    <div className="w-2 h-2 rounded-full bg-cyan-500/50 mr-3 group-hover:bg-cyan-400 transition-colors" />
                                                    <span className="text-xs font-bold text-zinc-400 group-hover:text-white uppercase tracking-tight transition-colors">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
                                        <div className="flex items-center gap-3">
                                            <Cpu className="text-cyan-400 w-5 h-5 animate-pulse" />
                                            <div className="text-left">
                                                <div className="text-[10px] font-black text-cyan-500 uppercase tracking-widest leading-none mb-1">Oracle Mode</div>
                                                <div className="text-xs text-zinc-400 font-medium">Synthesize deep institutional insights.</div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setIsOpen(false);
                                                router.push('/oracle');
                                            }}
                                            className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-cyan-500/20 transition-all"
                                        >
                                            Inquire
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="px-4 py-3 bg-white/5 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1"><Command size={12} /> + Enter to Select</span>
                                <span className="flex items-center gap-1">↑↓ to Navigate</span>
                            </div>
                            <span className="text-cyan-500 opacity-50">EdIntel Sovereign Search v1.0</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
