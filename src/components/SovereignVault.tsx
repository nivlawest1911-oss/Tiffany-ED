'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Shield, Zap, Lock, ChevronRight, Search, Download, Share2, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Protocol {
    id: string;
    title: string;
    type: 'defense' | 'memo' | 'strategy';
    timestamp: string;
    status: 'encrypted' | 'ready';
    author: string;
    content: string;
}

export default function SovereignVault() {
    const [protocols, setProtocols] = useState<Protocol[]>([]);
    const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null);

    useEffect(() => {
        const loadProtocols = () => {
            // Load synthesized protocols from localStorage or use defaults
            const stored = localStorage.getItem('sovereign_protocols');
            if (stored) {
                setProtocols(JSON.parse(stored));
            } else {
                const defaults: Protocol[] = [
                    {
                        id: 'DEF-001',
                        title: 'Alabama SB 101 Defense Synthesis',
                        type: 'defense',
                        timestamp: new Date().toLocaleString(),
                        status: 'ready',
                        author: 'Sarah Connors (Compliance)',
                        content: 'Tactical pivot for Spring \'26 curriculum alignment. Policy shield engaged at 99.8%.'
                    },
                    {
                        id: 'MEM-042',
                        title: 'Strategic Vision Uplink',
                        type: 'strategy',
                        timestamp: '2 hours ago',
                        status: 'ready',
                        author: 'Dr. Alvin West (Visionary)',
                        content: 'Neural integration roadmap for next fiscal quarter. Focus on teacher sovereignty.'
                    }
                ];
                setProtocols(defaults);
            }
        };

        loadProtocols();
        window.addEventListener('sovereign_vault_update', loadProtocols);
        return () => window.removeEventListener('sovereign_vault_update', loadProtocols);
    }, []);

    return (
        <div className="bg-zinc-950/50 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-3xl shadow-2xl">
            {/* Vault Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-zinc-900/50">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                        <Lock size={20} />
                    </div>
                    <div>
                        <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">Neural Archive Vault</h3>
                        <p className="text-[8px] text-zinc-500 font-mono uppercase tracking-widest mt-0.5">District Intelligence Repository</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={12} />
                        <input
                            type="text"
                            placeholder="SEARCH PROTOCOLS..."
                            className="bg-black/40 border border-white/5 rounded-lg py-1.5 pl-8 pr-4 text-[8px] font-mono text-white focus:border-indigo-500/50 outline-none transition-all w-48"
                        />
                    </div>
                </div>
            </div>

            {/* Protocols Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
                {protocols.map((protocol, i) => (
                    <motion.div
                        key={protocol.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-zinc-950 p-6 group hover:bg-zinc-900 transition-colors cursor-pointer relative overflow-hidden"
                        onClick={() => setSelectedProtocol(protocol)}
                    >
                        <div className="flex justify-between items-start relative z-10">
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-xl ${protocol.type === 'defense' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                                    protocol.type === 'strategy' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                        'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                    } border`}>
                                    {protocol.type === 'defense' ? <Shield size={18} /> :
                                        protocol.type === 'strategy' ? <Zap size={18} /> : <FileText size={18} />}
                                </div>
                                <div>
                                    <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest mb-1">{protocol.id}</div>
                                    <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{protocol.title}</h4>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-[9px] text-zinc-600 font-medium">{protocol.author}</span>
                                        <span className="w-1 h-1 rounded-full bg-zinc-800" />
                                        <span className="text-[9px] text-zinc-600 font-mono">{protocol.timestamp}</span>
                                    </div>
                                </div>
                            </div>
                            <ChevronRight className="text-zinc-800 group-hover:text-white transition-colors" size={16} />
                        </div>
                        {/* Hover Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                ))}
            </div>

            {/* Protocol Detail Overlay */}
            <AnimatePresence>
                {selectedProtocol && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-6"
                    >
                        <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setSelectedProtocol(null)} />
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-zinc-950 border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden relative z-10 shadow-2xl"
                        >
                            <div className="p-8 border-b border-white/5 bg-zinc-900/50 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                                        <Shield size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-white uppercase tracking-tight">{selectedProtocol.title}</h2>
                                        <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">{selectedProtocol.author} | Verified Compliance</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedProtocol(null)} className="text-zinc-500 hover:text-white font-mono text-xs uppercase tracking-widest">Close [Esc]</button>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl font-mono text-[11px] leading-relaxed text-zinc-400 h-64 overflow-y-auto">
                                    <div className="mb-4 text-emerald-400 font-black tracking-widest">{'>>>'} DECRYPTED_INTEL_STREAM:</div>
                                    {selectedProtocol.content}
                                    <div className="mt-8 border-t border-white/5 pt-4 text-[9px] text-zinc-600">
                                        SECURITY_HASH: 0x982aF...421c
                                        ENCRYPTION: QUANTUM_SOVEREIGN_V2
                                        CLEARANCE: LEVEL_4_COMMANDER
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button className="flex-1 py-4 rounded-xl bg-white text-black font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-500 hover:text-white transition-all">
                                        <Download size={14} /> Download PDF Protocol
                                    </button>
                                    <button className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                                        <Share2 size={14} /> Uplink to Board
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
