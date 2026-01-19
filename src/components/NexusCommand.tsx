'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Zap, Shield, Globe, Users, FileText, X, ChevronRight, Terminal } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import useSovereignSounds from '@/hooks/useSovereignSounds';

export default function NexusCommand({ isOpen, onCloseAction, onActionAction }: { isOpen: boolean, onCloseAction: () => void, onActionAction: (action: string) => void }) {
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const { playClick, playHover } = useSovereignSounds();
    const router = useRouter();

    const actions = [
        { id: 'broadcast', title: 'Broadcast Executive Directive', icon: Zap, color: 'text-amber-400', category: 'Communications' },
        { id: 'shield', title: 'Harden Policy Shield', icon: Shield, color: 'text-indigo-400', category: 'Defense' },
        { id: 'map', title: 'Deploy Territory Oversight', icon: Globe, color: 'text-emerald-400', category: 'Tactical' },
        { id: 'sarah', title: 'Consult Sarah Connors (Compliance)', icon: Users, color: 'text-rose-400', category: 'Delegates' },
        { id: 'west', title: 'Consult Dr. West (Vision)', icon: Users, color: 'text-purple-400', category: 'Delegates' },
        { id: 'vault', title: 'Access Intelligence Vault', icon: FileText, color: 'text-blue-400', category: 'Archive' },
    ];

    const filteredActions = actions.filter(action =>
        action.title.toLowerCase().includes(query.toLowerCase()) ||
        action.category.toLowerCase().includes(query.toLowerCase())
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                setActiveIndex(prev => (prev + 1) % filteredActions.length);
            } else if (e.key === 'ArrowUp') {
                setActiveIndex(prev => (prev - 1 + filteredActions.length) % filteredActions.length);
            } else if (e.key === 'Enter') {
                if (filteredActions[activeIndex]) {
                    handleSelect(filteredActions[activeIndex]);
                }
            } else if (e.key === 'Escape') {
                onCloseAction();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [isOpen, activeIndex, filteredActions]);

    const handleSelect = (action: any) => {
        playClick();
        onActionAction(action.id);
        onCloseAction();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[300] flex items-start justify-center pt-[15vh] px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onCloseAction}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="w-full max-w-2xl bg-zinc-900/90 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative z-10"
                    >
                        {/* Search Input Area */}
                        <div className="p-5 border-b border-white/10 flex items-center gap-4 bg-black/20">
                            <Command size={20} className="text-indigo-500 animate-pulse" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="TYPE A COMMAND OR SEARCH INTEL..."
                                value={query}
                                onChange={(e) => { setQuery(e.target.value); setActiveIndex(0); }}
                                className="w-full bg-transparent border-none text-white font-black uppercase tracking-widest text-sm focus:ring-0 outline-none placeholder:text-zinc-600"
                            />
                            <div className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-zinc-500 font-mono">
                                ESC
                            </div>
                        </div>

                        {/* Results Area */}
                        <div className="max-h-[60vh] overflow-y-auto p-2">
                            {filteredActions.length > 0 ? (
                                <div className="space-y-1">
                                    {filteredActions.map((action, i) => (
                                        <button
                                            key={action.id}
                                            onMouseEnter={() => { setActiveIndex(i); playHover(); }}
                                            onClick={() => handleSelect(action)}
                                            className={`w-full p-4 rounded-xl flex items-center justify-between transition-all group ${i === activeIndex ? 'bg-indigo-600 text-white' : 'hover:bg-white/5 text-zinc-400'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4 text-left">
                                                <div className={`p-2 rounded-lg ${i === activeIndex ? 'bg-white/20 text-white' : `bg-black/40 ${action.color}`}`}>
                                                    <action.icon size={18} />
                                                </div>
                                                <div>
                                                    <div className={`text-[10px] font-black uppercase tracking-widest ${i === activeIndex ? 'text-white/80' : 'text-zinc-500'}`}>
                                                        {action.category}
                                                    </div>
                                                    <div className="font-bold text-sm tracking-tight">{action.title}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {i === activeIndex && (
                                                    <motion.div layoutId="arrow" className="flex items-center gap-2">
                                                        <span className="text-[10px] font-mono opacity-50 uppercase">Execute</span>
                                                        <ChevronRight size={14} />
                                                    </motion.div>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-10 text-center">
                                    <Terminal size={40} className="mx-auto text-zinc-800 mb-4" />
                                    <p className="text-zinc-500 font-black uppercase tracking-widest text-[10px]">No Neural Protocols Found</p>
                                </div>
                            )}
                        </div>

                        {/* Footer Help */}
                        <div className="p-4 border-t border-white/5 bg-black/40 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5 text-[8px] font-mono text-zinc-500">
                                    <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-white">↑↓</span>
                                    <span>Navigate</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-[8px] font-mono text-zinc-500">
                                    <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-white">↵</span>
                                    <span>Select</span>
                                </div>
                            </div>
                            <div className="text-[8px] font-black text-indigo-500 uppercase tracking-widest animate-pulse">
                                NEXUS_COMMAND_v1.0 ACTIVE
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
