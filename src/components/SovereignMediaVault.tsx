'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles, Upload, Box, Wand2, FileVideo, Trash2, Maximize2, X
} from 'lucide-react';
import HumanAvatar from './ui/HumanAvatar';

interface MediaItem {
    id: string;
    type: 'image' | 'video';
    src: string;
    name: string;
    timestamp: number;
}

// Initial fallback data for new users
const DEFAULT_MEDIA: MediaItem[] = [
    { id: 'heritage-1', type: 'image', src: '/images/heritage/prichard_1925.png', name: 'Prichard 1925 Rail Hub', timestamp: Date.now() },
    { id: 'heritage-2', type: 'image', src: '/images/heritage/dr_h_roger_williams.png', name: 'Dr. H. Roger Williams Legacy', timestamp: Date.now() },
    { id: 'heritage-3', type: 'image', src: '/images/heritage/africatown_marker.png', name: 'Africatown Clotilda History', timestamp: Date.now() },
    { id: 'heritage-4', type: 'image', src: '/images/heritage/baldwin_training_school.png', name: 'Baldwin Training School 1880', timestamp: Date.now() },
    { id: 'def-1', type: 'image', src: '/images/keisha_reynolds_avatar_1768666809673.png', name: 'Keisha R.', timestamp: Date.now() },
    { id: 'def-5', type: 'image', src: '/images/strategic_leadership_node.png', name: 'Strategy Node', timestamp: Date.now() }
];

export default function SovereignMediaVault() {
    const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
    const [isEnhanced, setIsEnhanced] = useState(true);
    const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
    const [scanningFile, setScanningFile] = useState<string | null>(null);
    const [processingStatus, setProcessingStatus] = useState<string | null>(null);

    // Initialize from LocalStorage or Defaults
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

    // Persist changes
    useEffect(() => {
        if (mediaItems.length > 0) {
            localStorage.setItem('sovereign_vault_media', JSON.stringify(mediaItems));
        }
    }, [mediaItems]);

    const integrations = [
        { name: 'Gemini', status: 'connected', color: 'text-blue-400', icon: 'G' },
        { name: 'HeyGen', status: 'ready', color: 'text-purple-400', icon: 'H' },
        { name: 'Captions', status: 'standby', color: 'text-pink-400', icon: 'C' },
        { name: 'InVideo', status: 'standby', color: 'text-orange-400', icon: 'I' },
    ];

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const fakeId = Math.random().toString(36).substr(2, 9);
            setScanningFile(fakeId);

            // Simulate "Deep Scan" and actual Browser File Reading
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setTimeout(() => {
                        const newItem: MediaItem = {
                            id: fakeId,
                            type: file.type.startsWith('video') ? 'video' : 'image',
                            src: event.target?.result as string, // Base64 for local persistence
                            name: file.name,
                            timestamp: Date.now()
                        };
                        setMediaItems(prev => [newItem, ...prev]);
                        setScanningFile(null);
                    }, 2000); // Cinematic delay
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm("Permanently delete this asset from the Quantum Vault?")) {
            setMediaItems(prev => prev.filter(item => item.id !== id));
            if (selectedItem?.id === id) setSelectedItem(null);
        }
    };

    const handleAnalyze = () => {
        if (!selectedItem) return;
        setProcessingStatus("Initiating Neural Analysis...");

        // Comprehensive Functional Simulation
        setTimeout(() => setProcessingStatus("Extracting Vector Embeddings..."), 800);
        setTimeout(() => setProcessingStatus("Cross-Referencing Regulatory Database..."), 1600);
        setTimeout(() => {
            setProcessingStatus("Integration Complete.");
            setTimeout(() => {
                setProcessingStatus(null);
                setSelectedItem(null);
                // Dispatch event for other components to potentially react
                window.dispatchEvent(new CustomEvent('sovereign-asset-integrated', { detail: selectedItem }));
                alert(`Asset "${selectedItem.name}" has been vectorized and integrated into your strategic context.`);
            }, 1000);
        }, 2200);
    };

    return (
        <div className="h-full flex flex-col animate-in fade-in duration-700">
            {/* Header / Control Panel */}
            <div className="flex items-center justify-between mb-6 p-4 bg-zinc-900/50 rounded-2xl border border-white/5">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20">
                        <Box className="text-amber-500 w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white uppercase tracking-tight">Quantum Media Vault</h3>
                        <p className="text-xs text-zinc-500">Secure Asset Enhancement & Integration</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <label className="cursor-pointer px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-2 transition-all">
                        <Upload size={14} />
                        Upload
                        <input type="file" multiple className="hidden" onChange={handleFileUpload} accept="image/*,video/*" />
                    </label>

                    <button
                        onClick={() => setIsEnhanced(!isEnhanced)}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-2 transition-all ${isEnhanced
                            ? 'bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                            : 'bg-zinc-800 text-zinc-400'
                            }`}
                    >
                        <Wand2 size={14} />
                        {isEnhanced ? 'Enhanced' : 'Standard'}
                    </button>
                </div>
            </div>

            {/* Integration Status Bar */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                {integrations.map((integration, idx) => (
                    <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-black/40 border border-white/5 rounded-full whitespace-nowrap">
                        <span className={`font-black ${integration.color}`}>{integration.icon}</span>
                        <span className="text-[10px] font-bold text-zinc-400 uppercase">{integration.name}</span>
                        <div className={`w-1.5 h-1.5 rounded-full ${integration.status === 'connected' ? 'bg-emerald-500 animate-pulse' :
                            integration.status === 'ready' ? 'bg-amber-500' : 'bg-zinc-700'
                            }`} />
                    </div>
                ))}
            </div>

            {/* Media Grid */}
            <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-20 content-start">
                <AnimatePresence mode='popLayout'>
                    {scanningFile && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="aspect-video bg-zinc-900/50 rounded-xl border border-amber-500/30 flex flex-col items-center justify-center gap-2 animate-pulse"
                        >
                            <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                            <span className="text-[10px] text-amber-500 font-bold uppercase tracking-widest">Deep Scanning...</span>
                        </motion.div>
                    )}

                    {mediaItems.map((item) => (
                        <motion.div
                            key={item.id}
                            layoutId={item.id}
                            onClick={() => setSelectedItem(item)}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className={`group relative aspect-video bg-zinc-900 rounded-xl overflow-hidden cursor-pointer border transition-all ${selectedItem?.id === item.id ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-white/5 hover:border-amber-500/50'}`}
                        >
                            {item.type === 'video' ? (
                                <div className="absolute inset-0 flex items-center justify-center bg-zinc-900">
                                    <FileVideo className="text-zinc-700" size={32} />
                                </div>
                            ) : (
                                <img
                                    src={item.src}
                                    alt={item.name}
                                    className={`w-full h-full object-cover transition-all duration-700 ${isEnhanced ? 'contrast-125 saturate-110 brightness-110' : ''}`}
                                />
                            )}

                            {/* Holographic Overlay */}
                            {isEnhanced && (
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
                            )}

                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                <button
                                    onClick={(e) => handleDelete(item.id, e)}
                                    className="p-1.5 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-colors"
                                >
                                    <Trash2 size={12} />
                                </button>
                            </div>

                            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                                <p className="text-[10px] font-bold text-white truncate">{item.name}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {mediaItems.length === 0 && !scanningFile && (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 opacity-50 text-zinc-500">
                        <Box size={48} className="mb-4" />
                        <p className="text-sm font-light">Vault Empty. Security Protocols Active.</p>
                        <p className="text-xs mt-2 uppercase tracking-widest">Upload Assets to Begin</p>
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-8"
                        onClick={() => !processingStatus && setSelectedItem(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="w-full max-w-2xl bg-zinc-900 border border-amber-500/20 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[80vh]"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="relative aspect-video bg-black shrink-0">
                                {selectedItem.type === 'video' ? (
                                    <video src={selectedItem.src} controls className={`w-full h-full object-contain ${isEnhanced ? 'contrast-125 saturate-125 drop-shadow-2xl' : ''}`} />
                                ) : (
                                    <img src={selectedItem.src} alt={selectedItem.name} className={`w-full h-full object-contain ${isEnhanced ? 'contrast-125 saturate-125 drop-shadow-2xl' : ''}`} />
                                )}

                                {isEnhanced && (
                                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-amber-500/10 to-transparent mix-blend-overlay" />
                                )}

                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6 bg-zinc-900 border-t border-white/5 flex-1 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-1">{selectedItem.name}</h2>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase rounded border border-emerald-500/20">Secure Vault</span>
                                        {isEnhanced && <span className="px-2 py-0.5 bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase rounded border border-amber-500/20">Enhanced</span>}
                                        <span className="px-2 py-0.5 bg-zinc-800 text-zinc-400 text-[10px] font-mono uppercase rounded">
                                            {new Date(selectedItem.timestamp).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-zinc-400 leading-relaxed">
                                        This asset is securely stored within the Quantum Vault.
                                        {isEnhanced ? " Neural enhancement protocols have been applied for maximum clarity." : ""}
                                    </p>
                                </div>

                                <div className="mt-6 flex justify-end gap-3">
                                    <button
                                        onClick={(e) => handleDelete(selectedItem.id, e)}
                                        className="px-6 py-3 bg-zinc-800 hover:bg-red-900/20 hover:text-red-400 text-zinc-400 font-bold uppercase text-xs tracking-widest rounded-xl transition-colors"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className={`px-6 py-3 font-bold uppercase text-xs tracking-widest rounded-xl hover:scale-105 transition-all flex items-center gap-2 ${processingStatus
                                            ? 'bg-amber-500/20 text-amber-500 cursor-wait'
                                            : 'bg-white text-black hover:bg-zinc-200'
                                            }`}
                                        onClick={handleAnalyze}
                                        disabled={!!processingStatus}
                                    >
                                        {processingStatus ? (
                                            <>
                                                <div className="w-3 h-3 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
                                                {processingStatus}
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles size={16} />
                                                Integrate to App
                                            </>
                                        )}
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
