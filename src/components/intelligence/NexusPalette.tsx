'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';
import { cn } from '@/lib/utils';
import { TOP_GENERATORS } from '@/app/(dashboard)/(social)/the-room/TheRoomClient';

export default function NexusPalette({ onClose }: { onClose: () => void }) {
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const { playClick, playHover } = useProfessionalSounds();
    const router = useRouter();

    const actions = TOP_GENERATORS.map(tool => ({
        id: tool.id,
        title: tool.title,
        subtitle: tool.desc,
        icon: tool.icon,
        color: tool.color,
        link: tool.link
    }));

    const filtered = actions.filter((a: any) =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.subtitle.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                className="w-full max-w-2xl bg-[#020617] border border-electric-cyan/20 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,176,255,0.1)] relative z-10"
            >
                <div className="p-8 border-b border-white/5 flex items-center gap-6 bg-zinc-950/50">
                    <div className="p-4 rounded-2xl bg-electric-cyan/10 text-electric-cyan">
                        <Search size={24} />
                    </div>
                    <input
                        autoFocus
                        type="text"
                        placeholder="SEARCH PROTOCOLS..."
                        className="w-full bg-transparent border-none text-white font-black uppercase tracking-[0.2em] text-sm outline-none placeholder:text-zinc-700"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div className="max-h-[60vh] overflow-y-auto p-6 space-y-2">
                    {filtered.map((action: any, i: number) => (
                        <button
                            key={action.id}
                            className={cn(
                                "w-full p-5 rounded-2xl flex items-center justify-between text-left transition-all group",
                                i === activeIndex ? "bg-electric-cyan text-black" : "hover:bg-white/5 text-zinc-500"
                            )}
                            onMouseEnter={() => { setActiveIndex(i); playHover(); }}
                            onClick={() => { playClick(); router.push(action.link); onClose(); }}
                        >
                            <div className="flex items-center gap-5">
                                <div className={cn("p-2.5 rounded-xl bg-black/40", i === activeIndex ? "text-black bg-white/20" : action.color)}>
                                    <action.icon size={20} />
                                </div>
                                <div>
                                    <div className="font-black text-sm uppercase tracking-tight">{action.title}</div>
                                    <div className={cn("text-[9px] font-bold uppercase tracking-widest", i === activeIndex ? "text-black/60" : "text-zinc-600")}>{action.subtitle}</div>
                                </div>
                            </div>
                            {i === activeIndex && <ArrowRight size={16} />}
                        </button>
                    ))}
                </div>
                <div className="p-6 bg-black/40 border-t border-white/5 flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-zinc-700">
                    <span>Arrows to navigate â€¢ Enter to launch</span>
                    <span className="text-electric-cyan/50">Sovereign Link Active</span>
                </div>
            </motion.div>
        </div>
    );
}
