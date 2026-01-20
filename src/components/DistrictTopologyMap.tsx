'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Shield, Zap, AlertTriangle, MapPin, Search, Maximize2, Activity } from 'lucide-react';
import { useState } from 'react';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';

interface DistrictCenter {
    id: string;
    name: string;
    type: 'high' | 'middle' | 'elementary' | 'admin';
    status: 'optimal' | 'threat' | 'warning';
    health: number;
    description: string;
    x: number;
    y: number;
}

export default function DistrictTopologyMap({
    onDeployDelegateAction,
    onBroadcastAction
}: {
    onDeployDelegateAction?: () => void,
    onBroadcastAction?: () => void
}) {
    const [selectedCenter, setSelectedCenter] = useState<DistrictCenter | null>(null);
    const { playClick, playHover } = useProfessionalSounds();

    const nodes: DistrictCenter[] = [
        { id: '01', name: 'Professional Central High', type: 'high', status: 'optimal', health: 98, description: 'Core academic node. Excellence protocols stable.', x: 50, y: 30 },
        { id: '02', name: 'Pine Grove Elementary', type: 'elementary', status: 'threat', health: 62, description: 'Under SB 101 Legislative Siege. Immediate pivot required.', x: 20, y: 60 },
        { id: '03', name: 'Oak Shadow Middle', type: 'middle', status: 'warning', health: 84, description: 'Attendance volatility detected. Monitoring neural sync.', x: 80, y: 55 },
        { id: '04', name: 'Tech Innovation Academy', type: 'high', status: 'optimal', health: 100, description: 'Full AI integration successful. Lead tech node.', x: 50, y: 80 },
        { id: '05', name: 'District Command', type: 'admin', status: 'optimal', health: 99, description: 'The Core. Intelligence lattice origin.', x: 50, y: 55 },
    ];

    return (
        <div className="p-6 rounded-3xl bg-zinc-900 border border-white/5 relative overflow-hidden h-[450px] group">
            {/* Header */}
            <div className="relative z-20 flex justify-between items-start mb-6">
                <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
                        <Globe size={16} className="text-indigo-500 animate-pulse" />
                        Strategic Topology Map
                    </h3>
                    <p className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest mt-1">v8.4 Territorial Oversight</p>
                </div>
                <div className="flex bg-black/40 backdrop-blur-md rounded-lg border border-white/5 p-1 gap-1">
                    <button className="p-1 text-zinc-500 hover:text-white transition-colors"><Search size={12} /></button>
                    <button className="p-1 text-zinc-500 hover:text-white transition-colors"><Maximize2 size={12} /></button>
                </div>
            </div>

            {/* The Map Grid */}
            <div className="relative h-full w-full">
                {/* Connecting Lines (Lattice) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4f46e5" />
                            <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                    </defs>
                    {/* Active Data Packets */}
                    <circle r="2" fill="#fff">
                        <animateMotion dur="3s" repeatCount="indefinite" path="M 50 55 L 20 60" />
                    </circle>
                    <circle r="2" fill="#fff">
                        <animateMotion dur="4s" repeatCount="indefinite" path="M 50 30 L 50 55" />
                    </circle>
                    <circle r="2" fill="#fff">
                        <animateMotion dur="2.5s" repeatCount="indefinite" path="M 80 55 L 50 55" />
                    </circle>
                    <path
                        d="M 50 30 L 20 60 L 50 80 L 80 55 L 50 30 M 50 55 L 50 30 M 50 55 L 20 60 M 50 55 L 50 80 M 50 55 L 80 55"
                        stroke="url(#lineGrad)"
                        strokeWidth="0.5"
                        fill="none"
                        className="animate-pulse"
                    />
                </svg>

                {/* Centers */}
                {nodes.map((node) => (
                    <motion.button
                        key={node.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.2, zIndex: 30 }}
                        onClick={() => { playClick(); setSelectedCenter(node); }}
                        onMouseEnter={playHover}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group/node focus:outline-none"
                    >
                        <div className="relative">
                            {/* Outer Rings */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className={`absolute -inset-4 rounded-full border border-dashed transition-all duration-500 opacity-20 group-hover/node:opacity-50 ${node.status === 'threat' ? 'border-rose-500' :
                                    node.status === 'warning' ? 'border-amber-500' : 'border-emerald-500'
                                    }`}
                            />
                            <div className={`absolute -inset-2 rounded-full border transition-all duration-300 opacity-0 group-hover/node:opacity-100 ${node.status === 'threat' ? 'border-rose-500/50' :
                                node.status === 'warning' ? 'border-amber-500/50' : 'border-emerald-500/50'
                                }`} />

                            {/* Core Center */}
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 shadow-xl ${node.status === 'threat' ? 'bg-rose-500 text-white shadow-rose-500/20' :
                                node.status === 'warning' ? 'bg-amber-500 text-white shadow-amber-500/20' :
                                    'bg-emerald-500 text-white shadow-emerald-500/20'
                                }`}>
                                {node.type === 'admin' ? <Shield size={16} /> : <MapPin size={16} />}
                            </div>

                            {/* Label */}
                            <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                <span className="text-[8px] font-black text-white/40 uppercase tracking-widest group-hover/node:text-white transition-colors">
                                    {node.name}
                                </span>
                            </div>
                        </div>
                    </motion.button>
                ))}

                {/* Legend */}
                <div className="absolute bottom-4 left-0 flex gap-4 bg-black/20 backdrop-blur-sm p-2 rounded-xl border border-white/5">
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-[7px] font-bold text-zinc-500 uppercase">Optimal</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span className="text-[7px] font-bold text-zinc-500 uppercase">Alert</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                        <span className="text-[7px] font-bold text-zinc-500 uppercase">Siege</span>
                    </div>
                </div>
            </div>

            {/* Center Quick Info Overlay */}
            <AnimatePresence>
                {selectedCenter && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute right-6 top-24 w-60 bg-black/80 backdrop-blur-xl border border-white/10 p-5 rounded-2xl z-40 shadow-2xl"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <h4 className="text-[10px] font-black text-white uppercase tracking-widest">{selectedCenter.name}</h4>
                            <button onClick={() => setSelectedCenter(null)} className="text-zinc-500 hover:text-white tracking-widest text-[8px] uppercase">Close</button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-[8px] font-mono text-zinc-500 uppercase">
                                <span>Strategic Health</span>
                                <span className={selectedCenter.health > 90 ? 'text-emerald-400' : 'text-rose-400'}>{selectedCenter.health}%</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-1000 ${selectedCenter.health > 90 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                                    style={{ width: `${selectedCenter.health}%` }}
                                />
                            </div>

                            <p className="text-[9px] text-zinc-400 leading-relaxed italic border-l border-white/10 pl-2">
                                "{selectedCenter.description}"
                            </p>

                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={onDeployDelegateAction}
                                    className="py-2 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-lg text-[8px] font-black text-indigo-400 uppercase tracking-widest transition-all"
                                >
                                    Deploy Delegate
                                </button>
                                <button
                                    onClick={onBroadcastAction}
                                    className="py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[8px] font-black text-white uppercase tracking-widest transition-all"
                                >
                                    Broadcast
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] bg-[size:16px_16px]" />
        </div>
    );
}
