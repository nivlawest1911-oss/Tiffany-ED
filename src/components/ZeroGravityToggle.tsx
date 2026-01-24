'use client';

import { motion } from 'framer-motion';

interface ZeroGravityToggleProps {
    isWellnessMode: boolean;
    onToggle: (value: boolean) => void;
}

export default function ZeroGravityToggle({ isWellnessMode, onToggle }: ZeroGravityToggleProps) {
    return (
        <div className="flex flex-col items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.3em] text-amber-500/60 font-black">
                {isWellnessMode ? "Wellness Active" : "Command Active"}
            </span>

            <div
                onClick={() => onToggle(!isWellnessMode)}
                className={`w-20 h-10 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-500 ${isWellnessMode ? 'bg-emerald-600/30' : 'bg-zinc-800'
                    } border border-amber-500/20`}
            >
                <motion.div
                    layout
                    transition={{
                        type: "spring",
                        stiffness: 250,
                        damping: 20,
                        mass: 0.8
                    }}
                    className={`w-8 h-8 rounded-full shadow-lg flex items-center justify-center ${isWellnessMode ? 'bg-emerald-400' : 'bg-amber-500'
                        }`}
                    animate={{
                        x: isWellnessMode ? 40 : 0,
                        rotate: isWellnessMode ? 180 : 0,
                        scale: isWellnessMode ? 1.1 : 1
                    }}
                >
                    {/* Antigravity Core Icon */}
                    <div className="w-3 h-3 rounded-full border-2 border-black/40 animate-pulse" />
                </motion.div>
            </div>
        </div>
    );
}
