'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
    Sparkles, Upload, Box, Wand2, FileVideo, Trash2, X, Archive, Shield, Database, Zap, Loader2
} from 'lucide-react';
import SovereignMediaEngine from './SovereignMediaEngine';

interface MediaItem {
    id: string;
    type: 'image' | 'video';
    src: string;
    name: string;
    timestamp: number;
}

const DEFAULT_MEDIA: MediaItem[] = [
    { id: 'heritage-1', type: 'image', src: '/images/heritage/prichard_1925.png', name: 'Prichard 1925 Rail Hub', timestamp: Date.now() },
    { id: 'heritage-2', type: 'image', src: '/images/heritage/dr_h_roger_williams.png', name: 'Dr. H. Roger Williams Legacy', timestamp: Date.now() },
    { id: 'heritage-3', type: 'image', src: '/images/heritage/africatown_marker.png', name: 'Africatown Clotilda History', timestamp: Date.now() },
    { id: 'def-1', type: 'image', src: '/images/keisha_reynolds_avatar_1768666809673.png', name: 'Keisha R.', timestamp: Date.now() },
    { id: 'def-5', type: 'image', src: '/images/strategic_leadership_node.png', name: 'Strategy Node', timestamp: Date.now() }
];

export default function SovereignMediaVault({ selectedDelegate }: { selectedDelegate?: any }) {
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [isEnhanced, setIsEnhanced] = useState(true);
    const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
    const [scanningFile, setScanningFile] = useState<string | null>(null);
    const [processingStatus, setProcessingStatus] = useState<string | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('sovereign_vault_media');
        if (stored) {
            try {
                setMediaItems(JSON.parse(stored));
            } catch (e) {
                setMediaItems(DEFAULT_MEDIA);
            }
        } else {
            setMediaItems(DEFAULT_MEDIA);
        }
    }, []);

    useEffect(() => {
        if (mediaItems.length > 0) {
            localStorage.setItem('sovereign_vault_media', JSON.stringify(mediaItems));
        }
    }, [mediaItems]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const fakeId = Math.random().toString(36).substr(2, 9);
            setScanningFile(fakeId);

            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setTimeout(() => {
                        const newItem: MediaItem = {
                            id: fakeId,
                            type: file.type.startsWith('video') ? 'video' : 'image',
                            src: event.target?.result as string,
                            name: file.name,
                            timestamp: Date.now()
                        };
                        setMediaItems(prev => [newItem, ...prev]);
                        setScanningFile(null);
                    }, 2500);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setMediaItems(prev => prev.filter(item => item.id !== id));
        if (selectedItem?.id === id) setSelectedItem(null);
    };

    const handleAnalyze = () => {
        if (!selectedItem) return;
        setProcessingStatus("Initializing Molecular Scan...");
        setTimeout(() => setProcessingStatus("Extracting Neural Vectors..."), 1200);
        setTimeout(() => setProcessingStatus("Syncing with Governance Lake..."), 2400);
        setTimeout(() => {
            setProcessingStatus("Handshake Confirmed.");
            setTimeout(() => {
                setProcessingStatus(null);
                setSelectedItem(null);
                window.dispatchEvent(new CustomEvent('sovereign-asset-integrated', { detail: selectedItem }));
            }, 1000);
        }, 3600);
    };

    return (
        <div className="w-full flex flex-col pt-8 space-y-12 pb-24">
            {/* Premium Control Panel */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] backdrop-blur-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-noble-gold/5 blur-[100px] -z-10" />
                <div className="flex items-center gap-6 relative z-10">
                    <div className="w-16 h-16 bg-noble-gold/10 rounded-2xl flex items-center justify-center border border-noble-gold/20 shadow-2xl">
                        <Archive className="text-noble-gold w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter gold-gradient-text">Sovereign Vault</h3>
                        <div className="flex items-center gap-4 mt-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 italic">Secure Asset Repository</span>
                            <div className="flex items-center gap-2 px-3 py-1 bg-noble-gold/10 rounded-full border border-noble-gold/20">
                                <Shield size={10} className="text-noble-gold" />
                                <span className="text-[8px] font-black text-noble-gold uppercase tracking-widest italic">Encrypted</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto relative z-10">
                    <label className="flex-1 md:flex-none cursor-pointer px-8 py-4 bg-white/5 border border-white/10 hover:border-noble-gold/50 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl flex items-center justify-center gap-3 transition-all group overflow-hidden">
                        <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <div className="relative z-10 flex items-center gap-3">
                            <Upload size={16} className="group-hover:-translate-y-1 transition-transform" />
                            Provision Asset
                        </div>
                        <input type="file" multiple className="hidden" onChange={handleFileUpload} accept="image/*,video/*" />
                    </label>

                    <button
                        onClick={() => setIsEnhanced(!isEnhanced)}
                        className={`px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl flex items-center justify-center gap-3 transition-all border ${isEnhanced
                            ? 'bg-noble-gold text-black border-noble-gold shadow-2xl shadow-noble-gold/20'
                            : 'bg-white/5 border-white/10 text-zinc-600'
                            }`}
                    >
                        <Wand2 size={16} />
                        {isEnhanced ? 'Neural Sync' : 'Standard'}
                    </button>
                </div>
            </div>

            {/* AI Agent Neural Briefing Area */}
            <AnimatePresence mode="wait">
                {selectedDelegate && (
                    <NeuralBriefing delegate={selectedDelegate} />
                )}
            </AnimatePresence>

            {/* Sub-status indicators */}
            <div className="flex gap-4 mb-4 overflow-x-auto pb-6 scrollbar-hide px-2">
                {['Gemini v1.5', 'HeyGen Real-time', 'Biometric Auth', 'Quantum Storage'].map((node, i) => (
                    <div key={i} className="flex items-center gap-3 px-6 py-2.5 bg-white/[0.02] border border-white/5 rounded-full whitespace-nowrap">
                        <div className={`w-2 h-2 rounded-full ${i < 2 ? 'bg-noble-gold animate-pulse shadow-[0_0_12px_rgba(212,175,55,0.6)]' : 'bg-zinc-800'}`} />
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.4em] italic">{node}</span>
                    </div>
                ))}
            </div>

            {/* Media Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8 content-start h-auto">
                <AnimatePresence mode='popLayout'>
                    {scanningFile && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="aspect-[4/5] bg-white/[0.02] border border-noble-gold/30 rounded-[2.5rem] flex flex-col items-center justify-center gap-8 backdrop-blur-3xl relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-noble-gold/[0.02] to-transparent" />
                            <div className="relative z-10">
                                <div className="w-20 h-20 border-2 border-noble-gold/10 border-t-noble-gold rounded-full animate-spin" />
                                <Database className="absolute inset-0 m-auto text-noble-gold w-8 h-8 animate-pulse" />
                            </div>
                            <div className="text-center relative z-10 space-y-3">
                                <span className="text-[10px] text-noble-gold font-black uppercase tracking-[0.4em] italic leading-none">Deep Scanning</span>
                                <div className="flex justify-center gap-2">
                                    {[0, 1, 2].map(d => (
                                        <motion.div
                                            key={d}
                                            className="w-1.5 h-1.5 bg-noble-gold rounded-full"
                                            animate={{
                                                y: [0, -6, 0],
                                                opacity: [0.3, 1, 0.3]
                                            }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 1,
                                                delay: d * 0.25
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {mediaItems.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            onClick={() => setSelectedItem(item)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className={`group relative aspect-[4/5] bg-zinc-900 rounded-[2.5rem] overflow-hidden cursor-pointer border transition-all duration-700 ${selectedItem?.id === item.id
                                ? 'border-noble-gold shadow-[0_0_50px_rgba(212,175,55,0.25)]'
                                : 'border-white/5 hover:border-noble-gold/40'
                                }`}
                        >
                            {/* Quantum Overlay Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-noble-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10 pointer-events-none" />

                            {item.type === 'video' ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-0">
                                    <FileVideo className="text-noble-gold/30 mb-4 group-hover:scale-110 transition-transform duration-700" size={56} strokeWidth={1} />
                                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] leading-none italic font-mono">Video // Protocol</span>
                                </div>
                            ) : (
                                <Image
                                    src={item.src}
                                    alt={item.name}
                                    fill
                                    className={`object-cover transition-all duration-[1.5s] ease-out group-hover:scale-110 ${isEnhanced ? 'contrast-[1.15] saturate-[1.1] brightness-[1.1]' : ''}`}
                                />
                            )}

                            {/* Hover Controls */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                                <div className="absolute top-6 right-6">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => handleDelete(item.id, e)}
                                        className="w-12 h-12 bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white rounded-2xl flex items-center justify-center transition-all backdrop-blur-xl border border-red-500/20"
                                        title={`Purge Asset: ${item.name}`}
                                    >
                                        <Trash2 size={20} />
                                    </motion.button>
                                </div>
                                <div className="absolute bottom-8 inset-x-8">
                                    <p className="text-xs font-black text-white uppercase tracking-tighter italic truncate mb-2">{item.name}</p>
                                    <div className="flex items-center gap-3">
                                        <Zap size={12} className="text-noble-gold" />
                                        <span className="text-[9px] font-black text-noble-gold uppercase tracking-[0.2em] italic">Ready for Integration</span>
                                    </div>
                                </div>
                            </div>

                            {/* Default Label */}
                            <div className="absolute bottom-1.5 inset-x-6 p-4 bg-white/[0.02] border-t border-white/5 backdrop-blur-3xl opacity-90 group-hover:opacity-0 transition-all duration-500 z-20 rounded-t-3xl">
                                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest truncate italic">{item.name}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {mediaItems.length === 0 && !scanningFile && (
                    <div className="col-span-full flex flex-col items-center justify-center py-40 text-center space-y-8">
                        <div className="w-32 h-32 bg-white/[0.02] border border-dashed border-white/10 rounded-full flex items-center justify-center group animate-pulse">
                            <Box size={48} className="text-zinc-800 group-hover:text-noble-gold transition-colors" />
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-3xl font-black text-white/40 uppercase tracking-tighter italic">Vault is Offline</h4>
                            <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-700 font-black italic shadow-orange-951">Standard Security Protocols Active</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Enhanced Detail Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <AssetDetailModal
                        asset={selectedItem}
                        _isEnhanced={isEnhanced}
                        processingStatus={processingStatus}
                        onAnalyze={handleAnalyze}
                        onClose={() => setSelectedItem(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

/**
 * Sub-component for Neural Briefing to ensure internal state and type safety
 */
function NeuralBriefing({ delegate }: { delegate: any }) {
    return (
        <motion.div
            key={delegate.id}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            className="relative p-8 liquid-glass border-noble-gold/20 bg-noble-gold/[0.03] rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 overflow-hidden group/briefing"
        >
            <div className="absolute top-0 right-0 w-64 h-full bg-noble-gold/5 blur-[80px] -z-10 group-hover/briefing:bg-noble-gold/10 transition-all duration-700" />

            <div className="relative w-20 h-20 md:w-24 md:h-24">
                <div className="absolute -inset-2 rounded-full border border-noble-gold/30 border-t-noble-gold animate-spin-slow" />
                <div className="w-full h-full rounded-full overflow-hidden border-2 border-noble-gold p-1 bg-black">
                    <Image
                        src={delegate.avatar}
                        alt={delegate.name}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-noble-gold flex items-center justify-center border-2 border-black shadow-lg">
                    <Zap size={12} className="text-black" />
                </div>
            </div>

            <div className="flex-1 space-y-4 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-3">
                    <span className="text-[10px] font-black text-noble-gold uppercase tracking-[0.4em] italic mb-1">{delegate.role} {'//'} Briefing</span>
                    <div className="h-px w-full md:w-auto flex-1 bg-white/5 hidden md:block" />
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[8px] font-black text-white/40 uppercase tracking-widest">Neural Link: SECURE</span>
                    </div>
                </div>
                <p className="text-lg md:text-xl text-white font-black italic leading-tight tracking-tight uppercase">
                    "{delegate.specialty === 'Instructional Leadership & Culture'
                        ? `I am ready to synthesize your district's instructional assets. Let's optimize the curriculum grid.`
                        : delegate.specialty.includes('Strategic')
                            ? `Strategic asset synchronization initialized. How shall we prioritize the district's historical legacy?`
                            : `Neural handshake confirmed. I am processing your asset repository for executive insights.`}"
                </p>
                <div className="flex flex-col md:flex-row items-center gap-6 pt-2">
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Status: Ready for Interaction</span>
                    <div className="flex gap-1">
                        {[...Array(4)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-4 h-1 bg-noble-gold/20 rounded-full"
                                animate={{ opacity: [0.2, 1, 0.2] }}
                                transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <button
                className="w-full md:w-auto px-8 py-4 bg-noble-gold text-black rounded-xl text-[9px] font-black uppercase tracking-[0.4em] hover:scale-105 transition-all shadow-xl shadow-noble-gold/20 animate-pulse-slow active:scale-95"
                onClick={() => window.dispatchEvent(new CustomEvent('open-ai-chat', { detail: delegate }))}
            >
                Open Comms
            </button>
        </motion.div>
    );
}


/**
 * Sub-component for Asset Detail to resolve 'possibly null' issues
 */
function AssetDetailModal({ asset, _isEnhanced, processingStatus, onAnalyze, onClose }: {
    asset: MediaItem;
    _isEnhanced: boolean; // Renamed to denote unused
    processingStatus: string | null;
    onAnalyze: () => void;
    onClose: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-[40px] flex items-center justify-center p-8"
            onClick={() => !processingStatus && onClose()}
        >
            <motion.div
                initial={{ scale: 0.95, y: 60, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 60, opacity: 0 }}
                className="w-full max-w-6xl bg-zinc-950 border border-noble-gold/20 rounded-[4rem] overflow-hidden shadow-[0_0_150px_rgba(212,175,55,0.15)] flex flex-col md:flex-row max-h-[85vh] relative"
                onClick={e => e.stopPropagation()}
            >
                <div className="md:w-[55%] relative bg-black aspect-video md:aspect-auto overflow-hidden group p-4">
                    <SovereignMediaEngine
                        type={asset.type}
                        src={asset.src}
                        alt={asset.name}
                        className="w-full h-full rounded-[3rem]"
                        autoPlay={true}
                        isCinematic={true}
                        overlayText={asset.name}
                    />
                </div>

                <div className="md:w-[45%] p-16 md:p-20 flex flex-col justify-between bg-zinc-950 relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-noble-gold/5 blur-[100px] -z-10" />

                    <div className="space-y-12">
                        <div className="flex items-center gap-6">
                            <div className="px-5 py-2 bg-noble-gold text-black text-[10px] font-black uppercase rounded-full shadow-2xl shadow-noble-gold/20 tracking-[0.2em] italic">
                                Priority Asset
                            </div>
                            <span className="text-[10px] font-black font-mono text-zinc-700 uppercase tracking-widest leading-none">REF: {asset.id}</span>
                        </div>

                        <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter italic leading-[0.9] gold-gradient-text">{asset.name}</h2>

                        <div className="space-y-8">
                            <div className="flex items-start gap-5 group/feature">
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-2 shadow-[0_0_15px_rgba(16,185,129,0.8)] group-hover/feature:scale-125 transition-transform" />
                                <div>
                                    <p className="text-[11px] font-black text-white uppercase tracking-[0.2em] italic">Security Clearance</p>
                                    <p className="text-[10px] text-zinc-600 mt-2 font-black uppercase tracking-widest leading-relaxed">Verified // Sovereign Governance // Layer 6</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-5 group/feature">
                                <div className="w-2.5 h-2.5 rounded-full bg-noble-gold mt-2 shadow-[0_0_15px_rgba(212,175,55,0.8)] group-hover/feature:scale-125 transition-transform" />
                                <div>
                                    <p className="text-[11px] font-black text-white uppercase tracking-[0.2em] italic">Neural Readiness</p>
                                    <p className="text-[10px] text-zinc-600 mt-2 font-black uppercase tracking-widest leading-relaxed">Optimized for multimodal AI context injection protocol</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 mt-16">
                        <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={!!processingStatus}
                            onClick={onAnalyze}
                            className={`w-full py-7 rounded-[2rem] font-black uppercase text-xs tracking-[0.4em] transition-all flex items-center justify-center gap-5 relative overflow-hidden group/btn ${processingStatus
                                ? 'bg-noble-gold/10 text-noble-gold cursor-wait border border-noble-gold/30 italic'
                                : 'bg-white text-black hover:bg-noble-gold shadow-3xl'
                                }`}
                        >
                            <div className="absolute inset-0 bg-black/5 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                            <div className="relative z-10 flex items-center gap-5">
                                {processingStatus ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        {processingStatus}
                                    </>
                                ) : (
                                    <>
                                        <Sparkles size={20} className="group-hover/btn:rotate-12 transition-transform" />
                                        Integrate to Neural Grid
                                    </>
                                )}
                            </div>
                        </motion.button>

                        <button
                            onClick={onClose}
                            className="w-full py-4 text-[10px] font-black text-zinc-700 uppercase tracking-[0.5em] hover:text-white transition-all italic"
                        >
                            Dismiss Asset Handshake
                        </button>
                    </div>
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-10 right-10 w-16 h-16 bg-white/[0.03] hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-all border border-white/10 group backdrop-blur-3xl z-50"
                    title="Close Detail"
                >
                    <X size={32} className="group-hover:rotate-90 transition-transform duration-500" />
                </button>
            </motion.div>
        </motion.div>
    );
}
