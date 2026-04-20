import React, { useState } from 'react';

import { EdIntelGate } from '@/components/edintel-core/EdIntelGate';
import { Sparkles, Loader2, Zap, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StudioVideoSectionProps {
    userTier: string;
    isCommandLevel: boolean;
}

export const StudioVideoSection = ({ userTier: _userTier, isCommandLevel }: StudioVideoSectionProps) => {
    const [gateOpen, setGateOpen] = useState(false);
    const [selectedTool, setSelectedTool] = useState('');
    const [isActivating, setIsActivating] = useState(false);
    const [activeTool, setActiveTool] = useState<string | null>(null);

    const handleToolClick = (toolName: string) => {
        if (!isCommandLevel) {
            setSelectedTool(toolName);
            setGateOpen(true);
        } else {
            setIsActivating(true);
            setActiveTool(toolName);

            // Simulated Uplink Handshake
            setTimeout(() => {
                setIsActivating(false);
                console.log(`Uplink established for ${toolName}.`);
            }, 2500);
        }
    };

    return (
        <>
            <div className="contents">
                {/* Video Quadrant: InVideo AI */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col justify-between relative overflow-hidden group min-h-[220px]">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                        <Zap className="w-12 h-12 text-indigo-500" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-amber-500 font-mono text-xs uppercase tracking-widest">InVideo AI Engine</h4>
                            {isCommandLevel && <ShieldCheck className="w-3 h-3 text-emerald-500" />}
                        </div>
                        <p className="text-zinc-400 text-sm mb-4 leading-relaxed">Convert student data logs into localized AI video lessons.</p>
                    </div>
                    <button
                        onClick={() => handleToolClick('InVideo AI')}
                        disabled={isActivating}
                        className={cn(
                            "w-full py-3 font-bold rounded-lg transition-all uppercase text-[10px] tracking-widest flex items-center justify-center gap-2",
                            isCommandLevel
                                ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-600 hover:text-white"
                                : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                        )}
                    >
                        {isActivating && activeTool === 'InVideo AI' ? (
                            <><Loader2 className="w-3 h-3 animate-spin" /> Establishing Uplink...</>
                        ) : (
                            isCommandLevel ? 'Initiate Neural Render' : 'Access Restricted'
                        )}
                    </button>
                </div>

                {/* Video Quadrant: Captions.ai */}
                <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-xl flex flex-col justify-between relative overflow-hidden group min-h-[220px]">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                        <Sparkles className="w-12 h-12 text-amber-500" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-amber-500 font-mono text-xs uppercase tracking-widest">Captions Protocol</h4>
                            {isCommandLevel && <ShieldCheck className="w-3 h-3 text-emerald-500" />}
                        </div>
                        <p className="text-zinc-400 text-sm mb-4 leading-relaxed">Auto-subtitle district announcements for ADA compliance.</p>
                    </div>
                    <button
                        onClick={() => handleToolClick('Captions.ai')}
                        disabled={isActivating}
                        className={cn(
                            "w-full py-3 font-bold rounded-lg transition-all uppercase text-[10px] tracking-widest flex items-center justify-center gap-2",
                            isCommandLevel
                                ? "bg-amber-500/20 text-amber-500 border border-amber-500/30 hover:bg-amber-500 hover:text-black"
                                : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                        )}
                    >
                        {isActivating && activeTool === 'Captions.ai' ? (
                            <><Loader2 className="w-3 h-3 animate-spin" /> Synchronizing Subtitles...</>
                        ) : (
                            isCommandLevel ? 'Initiate Uplink' : 'Access Restricted'
                        )}
                    </button>
                </div>
            </div>

            <EdIntelGate
                isOpen={gateOpen}
                onClose={() => setGateOpen(false)}
                toolName={selectedTool}
            />

            <AnimatePresence>
                {isActivating && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-8"
                    >
                        <div className="bg-zinc-950 border border-white/10 p-12 rounded-3xl max-w-md text-center space-y-6 shadow-2xl">
                            <div className="relative inline-block">
                                <div className="absolute inset-0 bg-electric-cyan/20 blur-xl rounded-full" />
                                <Loader2 className="w-16 h-16 text-electric-cyan animate-spin relative" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">EdIntel OS: Uplink Sequence</h3>
                                <p className="text-sm text-zinc-500 font-medium">Validating command clearance and establishing secure cognitive bridge to {activeTool}...</p>
                            </div>
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2.5, ease: "easeInOut" }}
                                    className="h-full bg-electric-cyan shadow-[0_0_10px_#00f5ff]"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
