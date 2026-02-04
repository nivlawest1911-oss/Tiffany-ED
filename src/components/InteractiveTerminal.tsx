import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, ShieldCheck, Cpu, Globe } from 'lucide-react';

interface InteractiveTerminalProps {
    onCommand?: (cmd: string) => void;
}

export default function InteractiveTerminal({ onCommand }: InteractiveTerminalProps) {
    const [logs, setLogs] = useState<string[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [inputValue, setInputValue] = useState('');

    const mockLogs = [
        "Establishing neural handshake...",
        "Sovereign Core initialized.",
        "Loading Alabama Strategic Directive...",
        "FERPA encryption layer secured.",
        "Bento ecosystem sync complete.",
        "Optimizing instructional nodes...",
        "Analyzing student work metadata...",
        "Generating IEP architectural frame...",
        "System status: OPTIMAL",
        "Awaiting tactical command...",
        "Syncing with Dr. West's Neural Hub...",
        "Decrypting legacy curriculum data...",
        "Protocol 743-B: ACTIVE"
    ];

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            if (i < mockLogs.length) {
                setLogs(prev => [...prev, `> ${mockLogs[i]}`].slice(-8));
                i++;
            } else {
                setLogs(prev => [...prev].slice(-8)); // Just keep the last 8
            }
        }, 2000);

        return () => clearInterval(interval);
    }, []); // Re-evaluating mockLogs if needed, but for now it's static

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (onCommand && inputValue) {
            onCommand(inputValue);
            setLogs(prev => [...prev, `> [INPUT]: ${inputValue}`].slice(-8));
            setInputValue('');
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-black/80 backdrop-blur-3xl border border-intel-gold/20 rounded-[2rem] overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="bg-white/5 px-6 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <TerminalIcon size={14} className="text-intel-gold" />
                    <span className="text-[10px] font-black uppercase text-white/50 tracking-widest">Sovereign Terminal Protocol</span>
                </div>
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                </div>
            </div>

            {/* Terminal Content */}
            <div
                ref={scrollRef}
                className="p-6 h-48 md:h-64 overflow-y-auto font-mono text-[10px] md:text-xs space-y-1 md:space-y-2 custom-scrollbar"
            >
                <AnimatePresence mode="popLayout">
                    {logs.map((log, idx) => (
                        <motion.div
                            key={`${log}-${idx}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`${log.includes('OPTIMAL') || log.includes('secured') ? 'text-emerald-400' : log.includes('ACTIVE') || log.includes('initialized') || log.includes('[INPUT]') ? 'text-intel-gold' : 'text-zinc-500'}`}
                        >
                            {log}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="px-6 py-3 bg-white/5 border-t border-white/10 flex items-center gap-3">
                <span className="text-intel-gold font-mono text-xs">{'>'}</span>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Execute protocol..."
                    className="flex-1 bg-transparent border-none outline-none text-xs font-mono text-white placeholder:text-zinc-700 uppercase"
                />
            </form>

            {/* Footer Stats */}
            <div className="bg-white/[0.02] px-6 py-4 grid grid-cols-3 gap-4 border-t border-white/5">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[8px] font-black text-white/30 uppercase tracking-widest">
                        <Cpu size={10} />
                        Compute
                    </div>
                    <div className="text-[10px] font-bold text-white">4.2 TFLOPS</div>
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[8px] font-black text-white/30 uppercase tracking-widest">
                        <Globe size={10} />
                        Latency
                    </div>
                    <div className="text-[10px] font-bold text-white">12ms Sync</div>
                </div>
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[8px] font-black text-white/30 uppercase tracking-widest">
                        <ShieldCheck size={10} />
                        Integrity
                    </div>
                    <div className="text-[10px] font-bold text-emerald-500 uppercase">Verified</div>
                </div>
            </div>
        </div>
    );
}
