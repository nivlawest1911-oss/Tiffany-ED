'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Sparkles,
    Zap,
    ArrowRight,
    Shield,
    Command as CommandIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { generators } from '@/data/generators';

interface Command {
    id: string;
    title: string;
    subtitle?: string;
    icon: React.ReactNode;
    action: () => void;
    keywords: string[];
    category: 'generator' | 'navigation' | 'action' | 'recent';
}

export default function CommandPalette({ onCloseAction }: { onCloseAction?: () => void }) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();

    const commands: Command[] = [
        {
            id: 'dashboard',
            title: 'Dashboard',
            subtitle: 'Strategic Overview',
            icon: <Zap className="w-5 h-5" />,
            action: () => router.push('/admin/analytics'),
            keywords: ['home', 'dashboard', 'overview'],
            category: 'navigation',
        },
        {
            id: 'intel',
            title: 'Intelligence Tools',
            subtitle: 'AI Research Node',
            icon: <Sparkles className="w-5 h-5" />,
            action: () => router.push('/admin/tools'),
            keywords: ['tools', 'ai', 'intel'],
            category: 'navigation',
        },
        {
            id: 'vault',
            title: 'API Vault',
            subtitle: 'Secure credentials',
            icon: <Shield className="w-5 h-5" />,
            action: () => router.push('/admin/vault'),
            keywords: ['vault', 'safety', 'api'],
            category: 'navigation',
        },
        {
            id: 'sovereign_cmd',
            title: 'Sovereign Command',
            subtitle: 'Executive Delegate Protocol',
            icon: <CommandIcon className="w-5 h-5 text-noble-gold" />,
            action: () => window.dispatchEvent(new CustomEvent('open-sovereign-delegate')),
            keywords: ['sovereign', 'command', 'delegate'],
            category: 'action',
        },
        ...generators.map(gen => ({
            id: gen.id,
            title: gen.name,
            subtitle: gen.description,
            icon: <gen.icon className="w-5 h-5" />,
            action: () => router.push(`/generators/${gen.id}`),
            keywords: [gen.name.toLowerCase(), 'generator', 'tool'],
            category: 'generator' as const
        }))
    ];

    const filteredCommands = commands.filter(cmd => {
        const s = search.toLowerCase();
        return cmd.title.toLowerCase().includes(s) ||
            cmd.subtitle?.toLowerCase().includes(s) ||
            cmd.keywords.some(k => k.includes(s));
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === 'Escape') {
                setIsOpen(false);
                onCloseAction?.();
            }

            if (isOpen) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
                }
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
                }
                if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
                    e.preventDefault();
                    filteredCommands[selectedIndex].action();
                    setIsOpen(false);
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredCommands, selectedIndex, onCloseAction]);

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-[15vh] px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-zinc-900/90 border border-noble-gold/30 rounded-[2.5rem] shadow-[0_0_100px_rgba(212,175,55,0.2)] overflow-hidden"
                        >
                            <div className="p-6 border-b border-white/5 flex items-center gap-4">
                                <Search className="text-noble-gold" size={24} />
                                <input
                                    autoFocus
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Execute Command..."
                                    className="bg-transparent border-none outline-none text-xl text-white w-full placeholder:text-white/10 uppercase font-black italic tracking-tighter"
                                />
                                <kbd className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-white/40 font-black">ESC</kbd>
                            </div>

                            <div className="max-h-[50vh] overflow-y-auto custom-scrollbar p-4 space-y-2">
                                {filteredCommands.map((cmd, idx) => (
                                    <button
                                        key={cmd.id}
                                        onClick={() => {
                                            cmd.action();
                                            setIsOpen(false);
                                        }}
                                        onMouseEnter={() => setSelectedIndex(idx)}
                                        className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all ${idx === selectedIndex ? 'bg-noble-gold/15 border border-noble-gold/40 shadow-[0_0_20px_rgba(212,175,55,0.1)]' : 'border border-transparent hover:bg-white/5'}`}
                                    >
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${idx === selectedIndex ? 'bg-noble-gold text-black' : 'bg-white/5 text-white/40'}`}>
                                            {cmd.icon}
                                        </div>
                                        <div className="text-left flex-1">
                                            <div className="text-sm font-black uppercase text-white tracking-widest">{cmd.title}</div>
                                            <div className="text-[10px] uppercase text-white/30 font-bold italic tracking-widest">{cmd.subtitle}</div>
                                        </div>
                                        {idx === selectedIndex && <ArrowRight size={16} className="text-noble-gold animate-pulse" />}
                                    </button>
                                ))}
                            </div>

                            <div className="p-4 bg-black/40 border-t border-white/5 flex items-center justify-between text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">
                                <div className="flex gap-6">
                                    <span>↑↓ Navigate</span>
                                    <span>↵ Select</span>
                                </div>
                                <span>Sovereign OS Command v5.1.S</span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(212, 175, 55, 0.1);
                    border-radius: 10px;
                }
            `}</style>
        </>
    );
}
