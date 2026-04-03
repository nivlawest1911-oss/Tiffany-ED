'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Activity } from 'lucide-react';
import { BioFeedback } from '@/lib/wearable-service';

interface BiometricVisualizerProps {
    biometrics: BioFeedback | null;
    chartData: number[];
}

export const BiometricVisualizer: React.FC<BiometricVisualizerProps> = ({ biometrics, chartData }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Heart Rate Card */}
            <div className="group relative p-8 rounded-[40px] bg-black/40 border border-white/5 overflow-hidden text-left hover:shadow-[0_0_50px_-12px_rgba(244,63,94,0.3)] transition-shadow duration-500">
                <div className="absolute top-0 right-0 p-8">
                    <Heart className={`w-12 h-12 transition-all duration-300 ${biometrics ? 'text-rose-500 animate-pulse' : 'text-zinc-800'}`} />
                </div>
                <div className="relative z-10 space-y-2 text-left">
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block text-left">Heart Rate</span>
                    <div className="text-7xl font-black tracking-tighter text-left">
                        {biometrics?.heartRate || '--'} <span className="text-xl text-zinc-500 font-medium">BPM</span>
                    </div>
                </div>
                {/* Neural Pulse visualizer */}
                <div className="mt-8 h-24 flex items-center justify-center relative">
                    <AnimatePresence>
                        {biometrics && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0.5, opacity: 1 }}
                                        animate={{ scale: 2, opacity: 0 }}
                                        transition={{
                                            duration: 60 / (biometrics.heartRate || 72),
                                            repeat: Infinity,
                                            delay: i * 0.2,
                                            ease: "easeOut"
                                        }}
                                        className="absolute w-24 h-24 border-2 border-rose-500 rounded-full"
                                    />
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                    <div className="w-full flex items-end gap-1 h-12">
                        {chartData.map((val, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-rose-500/20 rounded-t-sm transition-[height] duration-300 ease-out"
                                style={{ height: `${(val / 180) * 100}%` }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Cognitive Stress Card */}
            <div className="relative p-8 rounded-[40px] bg-black/40 border border-white/5 overflow-hidden text-left">
                <div className="absolute top-0 right-0 p-8">
                    <Activity className={`w-12 h-12 transition-all duration-300 ${biometrics ? 'text-cyan-400' : 'text-zinc-800'}`} />
                </div>
                <div className="relative z-10 space-y-2 text-left">
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block text-left">Cognitive Load</span>
                    <div className="text-7xl font-black tracking-tighter text-left">
                        {biometrics?.stressLevel || '--'}<span className="text-xl text-zinc-500 font-medium">%</span>
                    </div>
                </div>
                <div className="mt-8 space-y-6">
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            animate={{ width: `${biometrics?.stressLevel || 0}%` }}
                            transition={{ duration: 0.5 }}
                            className={`h-full transition-colors duration-500 ${(biometrics?.stressLevel || 0) > 70 ? 'bg-orange-600' : 'bg-cyan-500'}`}
                        />
                    </div>
                    {/* Sub-metrics */}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-1 text-left">
                            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest text-left block">Neural Efficiency</span>
                            <div className="text-xl font-black text-white/90 text-left">
                                {biometrics ? Math.max(10, 100 - (biometrics.stressLevel || 0)) : '--'}%
                            </div>
                        </div>
                        <div className="space-y-1 text-left">
                            <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest text-left block">Memory Load</span>
                            <div className="text-xl font-black text-white/90 text-left">
                                {biometrics ? Math.min(95, (biometrics.stressLevel || 0) + 12) : '--'}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
