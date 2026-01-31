'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface TrialAlertProps {
    remainingDays: number;
}

/**
 * Sovereign Alert UI Component
 * Displays a high-visibility alert for the 14-day trial nearing completion.
 * Established at the $79/site value proposition.
 */
const TrialAlert: React.FC<TrialAlertProps> = ({ remainingDays }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-6 mt-6 p-[1px] bg-gradient-to-r from-[#FF6B6B] to-[#C5A47E] rounded-xl animate-pulse cursor-pointer shadow-lg shadow-[#FF6B6B]/20"
        >
            <div className="bg-[#050505] rounded-xl p-4 flex justify-between items-center backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#FF6B6B]/10 rounded-lg flex items-center justify-center text-[#FF6B6B] font-bold border border-[#FF6B6B]/20 shadow-inner">
                        !
                    </div>
                    <div>
                        <h4 className="text-sm font-black uppercase tracking-tighter text-white">
                            Trial Intelligence Alert // {remainingDays} Days Remaining
                        </h4>
                        <p className="text-[10px] text-gray-400 font-mono">
                            [0x-WARN] Site access will revert to Restricted Vault status. Secure for $79.
                        </p>
                    </div>
                </div>
                <button className="bg-[#C5A47E] text-black text-[10px] font-black px-6 py-2 rounded-full hover:bg-white transition-all transform hover:scale-105 active:scale-95 uppercase shadow-lg shadow-[#C5A47E]/20">
                    Activate Sovereign License
                </button>
            </div>
        </motion.div>
    );
};

export default TrialAlert;
