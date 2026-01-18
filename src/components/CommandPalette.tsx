'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Sparkles,
    FileText,
    Settings,
    User,
    LogOut,
    Zap,
    Clock,
    Star,
    ArrowRight
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

export default function CommandPalette({ onClose }: { onClose?: () => void }) {
    const [isOpen, setIsOpen] = useState(onClose ? true : false);
    const [search, setSearch] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();

    // ... other imports

    const commands: Command[] = [
        // Navigation (Static)
        {
            id: 'dashboard',
            title: 'Dashboard',
            subtitle: 'View your overview',
            icon: <Zap className="w-5 h-5" />,
            action: () => router.push('/dashboard'), // Fixed link
            keywords: ['home', 'dashboard', 'overview'],
            category: 'navigation',
        },
        {
            id: 'showcase',
            title: 'Theme Showcase',
            subtitle: 'Explore color themes',
            icon: <Star className="w-5 h-5" />,
            action: () => router.push('/showcase'),
            keywords: ['themes', 'colors', 'showcase'],
            category: 'navigation',
        },
        {
            id: 'settings',
            title: 'Settings',
            subtitle: 'Manage your preferences',
            icon: <Settings className="w-5 h-5" />,
            action: () => router.push('/settings'),
            keywords: ['settings', 'preferences', 'config'],
            category: 'action',
        },
        // Dynamically Generated Commands from Tools
        ...generators.map(gen => ({
            id: gen.id,
            title: gen.name,
            subtitle: gen.description,
            icon: <gen.icon className="w-5 h-5" />,
            action: () => router.push(`/generators/${gen.id}`),
            keywords: [
                ...gen.name.toLowerCase().split(' '),
                'generator', 'tool', 'ai',
                ...(gen.prompts ? gen.prompts.flatMap(p => p.toLowerCase().split(' ')) : [])
            ],
            category: 'generator' as const
        }))
    ];

    // Filter commands based on search
    const filteredCommands = commands.filter(cmd => {
        const searchLower = search.toLowerCase();
        return (
            cmd.title.toLowerCase().includes(searchLower) ||
            cmd.subtitle?.toLowerCase().includes(searchLower) ||
            cmd.keywords.some(keyword => keyword.includes(searchLower))
        );
    });

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Cmd+K or Ctrl+K to open
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(prev => !prev);
                setSearch('');
                setSelectedIndex(0);
            }

            // Escape to close
            if (e.key === 'Escape') {
                setIsOpen(false);
                onClose?.();
                setSearch('');
            }

            // Arrow navigation
            if (isOpen) {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setSelectedIndex(prev =>
                        prev < filteredCommands.length - 1 ? prev + 1 : prev
                    );
                }
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
                }

                // Enter to execute
                if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
                    e.preventDefault();
                    filteredCommands[selectedIndex].action();
                    setIsOpen(false);
                    setSearch('');
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, filteredCommands, selectedIndex]);

    // Reset selection when search changes
    useEffect(() => {
        setSelectedIndex(0);
    }, [search]);

    const categoryIcons = {
        generator: <Sparkles className="w-4 h-4" />,
        navigation: <ArrowRight className="w-4 h-4" />,
        action: <Zap className="w-4 h-4" />,
        recent: <Clock className="w-4 h-4" />,
    };

    const categoryLabels = {
        generator: 'Generators',
        navigation: 'Navigation',
        action: 'Actions',
        recent: 'Recent',
    };

    // Group commands by category
    const groupedCommands = filteredCommands.reduce((acc, cmd) => {
        if (!acc[cmd.category]) acc[cmd.category] = [];
        acc[cmd.category].push(cmd);
        return acc;
    }, {} as Record<string, Command[]>);

    return (
        <>
            {/* Trigger Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-lg shadow-purple-500/50 flex items-center gap-2"
            >
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline">Quick Search</span>
                <kbd className="hidden sm:inline px-2 py-1 text-xs bg-white/20 rounded">⌘K</kbd>
            </motion.button>

            {/* Command Palette Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                                setIsOpen(false);
                                onClose?.();
                            }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />

                        {/* Palette */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4"
                        >
                            <div className="bg-slate-900/95 backdrop-blur-xl border border-purple-500/20 rounded-2xl shadow-2xl overflow-hidden">
                                {/* Search Input */}
                                <div className="flex items-center gap-3 p-4 border-b border-purple-500/20">
                                    <Search className="w-5 h-5 text-purple-400" />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Search commands..."
                                        autoFocus
                                        className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-lg"
                                    />
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            onClose?.();
                                        }}
                                        className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded hover:bg-purple-500/40"
                                    >
                                        ESC
                                    </button>
                                </div>

                                {/* Commands List */}
                                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                                    {filteredCommands.length === 0 ? (
                                        <div className="p-8 text-center text-gray-400">
                                            No commands found for "{search}"
                                        </div>
                                    ) : (
                                        <div className="p-2">
                                            {Object.entries(groupedCommands).map(([category, cmds]) => (
                                                <div key={category} className="mb-4 last:mb-0">
                                                    {/* Category Header */}
                                                    <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-purple-300 uppercase tracking-wider">
                                                        {categoryIcons[category as keyof typeof categoryIcons]}
                                                        {categoryLabels[category as keyof typeof categoryLabels]}
                                                    </div>

                                                    {/* Commands in Category */}
                                                    {cmds.map((cmd, idx) => {
                                                        const globalIndex = filteredCommands.indexOf(cmd);
                                                        const isSelected = globalIndex === selectedIndex;

                                                        return (
                                                            <motion.button
                                                                key={cmd.id}
                                                                onClick={() => {
                                                                    cmd.action();
                                                                    setIsOpen(false);
                                                                    setSearch('');
                                                                }}
                                                                onMouseEnter={() => setSelectedIndex(globalIndex)}
                                                                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${isSelected
                                                                    ? 'bg-purple-500/20 border border-purple-500/40'
                                                                    : 'hover:bg-purple-500/10 border border-transparent'
                                                                    }`}
                                                                whileHover={{ x: 4 }}
                                                            >
                                                                <div className={`p-2 rounded-lg ${isSelected
                                                                    ? 'bg-purple-500/30 text-purple-300'
                                                                    : 'bg-purple-500/10 text-purple-400'
                                                                    }`}>
                                                                    {cmd.icon}
                                                                </div>
                                                                <div className="flex-1 text-left">
                                                                    <div className="text-white font-medium">{cmd.title}</div>
                                                                    {cmd.subtitle && (
                                                                        <div className="text-sm text-gray-400">{cmd.subtitle}</div>
                                                                    )}
                                                                </div>
                                                                {isSelected && (
                                                                    <kbd className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded">
                                                                        ↵
                                                                    </kbd>
                                                                )}
                                                            </motion.button>
                                                        );
                                                    })}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between px-4 py-3 border-t border-purple-500/20 bg-black/20">
                                    <div className="flex items-center gap-4 text-xs text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <kbd className="px-1.5 py-0.5 bg-purple-500/20 rounded">↑</kbd>
                                            <kbd className="px-1.5 py-0.5 bg-purple-500/20 rounded">↓</kbd>
                                            Navigate
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <kbd className="px-1.5 py-0.5 bg-purple-500/20 rounded">↵</kbd>
                                            Select
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {filteredCommands.length} results
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.4);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.6);
        }
      `}</style>
        </>
    );
}
