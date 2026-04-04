'use client';

import { useState } from 'react';
import { unlockBriefingData } from '../actions';
import { toast } from 'sonner';
import { Lock, Zap, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UnlockBriefingButton({ slug }: { slug: string }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleUnlock = async () => {
        setIsLoading(true);
        const toastId = toast.loading('Synchronizing token-wallet...');
        
        try {
            const result = await unlockBriefingData(slug);
            if (result.success) {
                toast.success('Access Granted', { description: 'Deep Dive Node Unlocked', id: toastId });
            } else {
                toast.error('Unlock Failed', { description: result.error, id: toastId });
            }
        } catch (_error: any) {
            toast.error('Tactical Error', { description: 'Network synchronization failed.', id: toastId });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto liquid-glass border-noble-gold/30 bg-zinc-950 p-12 text-center rounded-[3rem] relative overflow-hidden group">
            <div className="absolute inset-0 bg-noble-gold/[0.03] opacity-50 group-hover:opacity-100 transition-opacity" />
            
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative z-10"
            >
                <div className="w-24 h-24 rounded-full bg-noble-gold/10 border border-noble-gold/30 flex items-center justify-center mx-auto mb-8">
                    <Lock className="text-noble-gold" size={40} />
                </div>
                
                <h3 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">
                    Restricted <span className="text-noble-gold">Operational</span> Data
                </h3>
                
                <p className="text-lg text-white/50 font-mono mb-12 max-w-2xl mx-auto tracking-wide leading-relaxed">
                    This deep-level intelligence contains <span className="text-white">Mobile County</span> specific population charts, Alabama legislative checklists, and tactical roadmaps. 
                    Unlock access for <span className="text-noble-gold">1 Usage Token</span>.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <button
                        onClick={handleUnlock}
                        disabled={isLoading}
                        className="EdIntel-button bg-noble-gold text-black px-12 py-5 text-[12px] group w-full md:w-auto"
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2 animate-pulse">
                                <Zap size={14} className="animate-spin" /> Authorizing...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <ShieldCheck size={14} /> Unlock Tactical Report
                            </span>
                        )}
                        <ChevronRight size={14} className="ml-4 group-hover:translate-x-2 transition-transform" />
                    </button>
                    
                    <div className="flex flex-col items-start text-left px-6 py-2 border-l border-white/10 hidden md:block">
                        <span className="text-[8px] font-black text-white/30 uppercase tracking-[0.4em]">Current Cost</span>
                        <span className="text-xs font-black text-noble-gold uppercase italic tracking-widest leading-none">1 Usage Token</span>
                    </div>
                </div>

                <p className="mt-8 text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">One-time deduction. Permanent archive access.</p>
            </motion.div>
        </div>
    );
}
