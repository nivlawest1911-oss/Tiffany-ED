/**
 * SynthesisDashboard Component
 * 
 * Visualization for active media synthesis tasks with cinematic progress 
 * tracking and frequency animations.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MediaSynthesisEngine, MediaArtifact, MediaType } from '@/lib/MediaSynthesisEngine';
import { GlassCard } from '@/components/ui/Cinematic';

import ProfileShareModal from '@/components/modals/ProfileShareModal';
import { Loader2, Radio, Mic, CheckCircle2, Share2, Play } from 'lucide-react';
import { toast } from 'sonner';

export const SynthesisDashboard: React.FC = () => {
    const [artifacts, setArtifacts] = useState<MediaArtifact[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [shareModal, setShareModal] = useState<{ isOpen: boolean; id: string }>({
        isOpen: false,
        id: ''
    });
    const engine = MediaSynthesisEngine.getInstance();

    useEffect(() => {
        const interval = setInterval(() => {
            setArtifacts([...engine.getActiveArtifacts()]);
        }, 1000);
        return () => clearInterval(interval);
    }, [engine]);

    const handleSynthesize = async (type: MediaType) => {
        setIsGenerating(true);
        toast.info(`Initializing ${type} synthesis vector...`);
        await engine.synthesizeArtifact(type, `Strategic Briefing ${new Date().toLocaleTimeString()}`, 'General');
        setTimeout(() => {
            setIsGenerating(false);
            toast.success(`${type} Synthesis Secured.`);
        }, 1000);
    };

    return (
        <div className="space-y-8">
            {/* Header / Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase mb-1 md:mb-0">Media Synthesis Hub</h2>
                    <p className="text-white/40 text-[10px] md:text-sm font-medium">Autonomous generation of executive media artifacts.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <button
                        onClick={() => handleSynthesize('PODCAST')}
                        disabled={isGenerating}
                        className="flex items-center justify-center gap-2 px-6 md:px-4 py-3 md:py-2 bg-intel-gold/10 border border-intel-gold/20 rounded-full text-intel-gold hover:bg-intel-gold/20 transition-all font-bold text-xs md:text-sm uppercase tracking-widest disabled:opacity-50 w-full sm:w-auto"
                    >
                        {isGenerating ? <Loader2 className="animate-spin" size={16} /> : <Radio size={16} />}
                        Synthesize Podcast
                    </button>
                    <button
                        onClick={() => handleSynthesize('EXECUTIVE_BRIEFING')}
                        disabled={isGenerating}
                        className="flex items-center justify-center gap-2 px-6 md:px-4 py-3 md:py-2 bg-white/5 border border-white/10 rounded-full text-white/60 hover:bg-white/10 transition-all font-bold text-xs md:text-sm uppercase tracking-widest disabled:opacity-50 w-full sm:w-auto"
                    >
                        <Mic size={16} />
                        New Briefing
                    </button>
                </div>
            </div>

            {/* Active Synthesis Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode='popLayout'>
                    {artifacts.map((artifact) => (
                        <motion.div
                            key={artifact.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="max-w-full"
                        >
                            <GlassCard className="relative overflow-hidden group p-4 md:p-6">
                                <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-3 rounded-xl ${artifact.status === 'COMPLETED' ? 'bg-intel-gold/20 text-intel-gold' : 'bg-white/5 text-white/40'}`}>
                                            {artifact.type === 'PODCAST' ? <Radio size={20} /> : <Mic size={20} />}
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black text-intel-gold uppercase tracking-widest mb-1">{artifact.type}</div>
                                            <h3 className="text-lg font-bold text-white leading-tight">{artifact.title}</h3>
                                        </div>
                                    </div>
                                    {artifact.status === 'COMPLETED' ? (
                                        <div className="px-2 py-1 bg-intel-gold/10 rounded-md text-[10px] font-bold text-intel-gold uppercase">READY</div>
                                    ) : (
                                        <div className="flex items-center gap-2 px-2 py-1 bg-white/5 rounded-md text-[10px] font-bold text-white/40 uppercase">
                                            <Loader2 size={10} className="animate-spin" />
                                            Encoding
                                        </div>
                                    )}
                                </div>

                                <p className="text-white/60 text-sm mb-6 line-clamp-2">{artifact.description}</p>

                                {/* Progress / Frequency Mock */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                        <span className="text-white/40">Synthesis Progress</span>
                                        <span className="text-intel-gold">{artifact.progress}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-intel-gold/40 to-intel-gold"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${artifact.progress}%` }}
                                            transition={{ duration: 1 }}
                                        />
                                    </div>

                                    {/* Visual Frequency Bars (Cinematic) */}
                                    <div className="flex items-end justify-center gap-1 h-6 md:h-8 opacity-20 group-hover:opacity-40 transition-opacity">
                                        {[...Array(15)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-1 bg-intel-gold rounded-full"
                                                animate={{
                                                    height: artifact.status === 'SYNTHESIZING' ? [4, typeof window !== 'undefined' ? (Math.random() * (window.innerWidth < 768 ? 16 : 24) + 4) : 10, 4] : 4
                                                }}
                                                transition={{
                                                    repeat: Infinity,
                                                    duration: 0.5 + Math.random(),
                                                    ease: "easeInOut"
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
                                    <div className="text-[10px] font-medium text-white/40 flex items-center gap-2">
                                        <CheckCircle2 size={12} className={artifact.status === 'COMPLETED' ? 'text-intel-gold' : 'text-white/10'} />
                                        <span className="truncate">PROVENANCE SECURED</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            className="p-2 bg-white/5 rounded-full text-white/40 hover:text-white transition-colors"
                                            title="Share Artifact"
                                            onClick={() => setShareModal({ isOpen: true, id: artifact.id })}
                                        >
                                            <Share2 size={14} />
                                        </button>
                                        <button
                                            disabled={artifact.status !== 'COMPLETED'}
                                            className="p-2 bg-intel-gold rounded-full text-black hover:scale-110 active:scale-95 transition-all disabled:opacity-20 disabled:scale-100"
                                            title="Play Briefing"
                                            onClick={() => toast.info(`Streaming ${artifact.title}...`)}
                                        >
                                            <Play size={14} fill="black" />
                                        </button>
                                    </div>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <ProfileShareModal
                isOpen={shareModal.isOpen}
                onClose={() => setShareModal({ ...shareModal, isOpen: false })}
                context="MEDIA"
                userName="EdIntel Delegate"
                userId={shareModal.id}
            />
        </div>
    );
};
