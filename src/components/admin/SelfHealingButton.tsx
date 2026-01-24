'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, ShieldAlert } from 'lucide-react';

export default function SelfHealingButton() {
    const [isHealing, setIsHealing] = useState(false);

    const handleHeal = async () => {
        setIsHealing(true);
        // Simulate the Antigravity Protocol sequence
        // In a real implementation, this would hit /api/infra/restart or similar
        setTimeout(() => {
            setIsHealing(false);
            // Optional: Add a success notification or toast here
        }, 3000);
    };

    return (
        <div className="p-5 border border-rose-500/20 bg-rose-500/5 rounded-2xl backdrop-blur-md">
            <div className="flex items-center gap-3 mb-4">
                <ShieldAlert className="text-rose-500 w-4 h-4" />
                <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Emergency Protocols</span>
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleHeal}
                disabled={isHealing}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest transition-all ${isHealing
                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                        : 'bg-rose-600 text-white hover:bg-rose-500 shadow-xl shadow-rose-900/40'
                    }`}
            >
                <RefreshCcw className={`w-4 h-4 ${isHealing ? 'animate-spin' : ''}`} />
                {isHealing ? 'Executing Antigravity Protocol...' : 'Force Self-Healing Override'}
            </motion.button>

            <p className="text-[9px] text-zinc-500 mt-3 text-center italic font-medium">
                *This will purge Vercel edge caches and re-authenticate all 2027 Service Nodes.
            </p>
        </div>
    );
}
