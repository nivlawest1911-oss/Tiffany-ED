"use client"

import { useMemo } from "react"
import { Heart, Activity, Watch, Smartphone, AlertCircle, Loader2 } from "lucide-react"
import { useWearable } from "@/hooks/use-wearable"
import { motion, AnimatePresence } from "framer-motion"

function MetricBar({ active, delay }: { active: boolean; delay: number }) {
    return (
        <motion.div
            className={`flex-1 ${active ? 'bg-gradient-to-t from-red-500/80 to-red-400' : 'bg-gray-800'} rounded-t`}
            initial={{ height: '20%' }}
            animate={{ height: active ? `${40 + Math.random() * 60}%` : '20%' }}
            transition={{
                duration: 0.5,
                repeat: active ? Infinity : 0,
                repeatType: "reverse",
                delay: delay * 0.1
            }}
        />
    );
}

export function WearableIntegration() {
    const { isConnected, isConnecting, lastData, error, deviceName, connect, disconnect } = useWearable()

    // Fallback data for visualization when not connected
    const displayData = useMemo(() => ({
        heartRate: lastData?.heartRate || 72,
        stressLevel: lastData?.stressLevel || 35,
        steps: 4523, // Static for now, focusing on bio-metrics
        calories: 1847,
        activeMinutes: 45,
        sleepQuality: 82,
    }), [lastData])

    const getStressColor = (level: number) => {
        if (level < 30) return "text-emerald-400"
        if (level < 60) return "text-amber-400"
        return "text-red-400"
    }

    const getHeartRateColor = (hr: number) => {
        if (hr < 60 || hr > 100) return "text-amber-400"
        return "text-emerald-400"
    }

    return (
        <section id="wearable" className="px-4 md:px-8 py-16 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/40 -z-10" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] text-sm mb-4"
                    >
                        <Watch className="w-4 h-4" />
                        BIO-TELEMETRY SYNC
                    </motion.div>
                    <h2 className="font-black tracking-tighter text-4xl md:text-6xl text-white mb-4">
                        Adaptive <span className="text-emerald-400">Biofeedback</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Contextualize your AI experience with real-time physiological data to optimize performance and prevent burnout.
                    </p>
                </div>

                {/* Connection Status */}
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl mb-8 backdrop-blur-xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isConnected ? 'bg-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-gray-500/10'}`}>
                                <Watch className={`w-6 h-6 ${isConnected ? 'text-emerald-400' : 'text-gray-400'}`} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white flex items-center gap-2">
                                    {isConnected ? 'Hardware Linked' : 'System Standby'}
                                    {isConnected && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
                                </h3>
                                <p className="text-sm text-gray-500 font-mono uppercase tracking-widest">
                                    {isConnected ? deviceName : 'Awaiting Bluetooth Pair'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto">
                            {error && (
                                <p className="text-xs text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                                    {error}
                                </p>
                            )}

                            {isConnected ? (
                                <button
                                    onClick={disconnect}
                                    className="px-8 py-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/20 transition-all font-bold uppercase tracking-tighter"
                                >
                                    Terminate Link
                                </button>
                            ) : (
                                <button
                                    onClick={connect}
                                    disabled={isConnecting}
                                    className="relative group px-8 py-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-all font-bold uppercase tracking-tighter disabled:opacity-50"
                                >
                                    {isConnecting ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Scanning...
                                        </span>
                                    ) : (
                                        'Establish Neural Link'
                                    )}
                                    <div className="absolute -inset-0.5 bg-emerald-500/20 blur opacity-0 group-hover:opacity-100 transition duration-500 rounded-lg" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {isConnected ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {/* Heart Rate */}
                            <div className="bg-black/60 border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Heart className="w-24 h-24 text-red-500" />
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-400">
                                            <Heart className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">Heart Rate</h4>
                                            <p className="text-xs text-gray-500 font-mono tracking-wider">LIVE TELEMETRY</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1">
                                        {[1, 2, 3].map(i => (
                                            <motion.div
                                                key={i}
                                                className="w-1 h-3 bg-red-500/40 rounded-full"
                                                animate={{ opacity: [0.4, 1, 0.4] }}
                                                transition={{
                                                    duration: 1,
                                                    repeat: Infinity,
                                                    delay: i * 0.2
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className={`text-6xl font-black tracking-tighter ${getHeartRateColor(displayData.heartRate)}`}>
                                        {Math.round(displayData.heartRate)}
                                    </span>
                                    <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">BPM</span>
                                </div>
                                <div className="h-16 flex items-end gap-1 px-1">
                                    {Array.from({ length: 30 }).map((_, i) => (
                                        <MetricBar key={i} active={isConnected} delay={i} />
                                    ))}
                                </div>
                            </div>

                            {/* Stress Level */}
                            <div className="bg-black/60 border border-white/5 p-6 rounded-2xl relative overflow-hidden">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-400">
                                            <Activity className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">Node Strain</h4>
                                            <p className="text-xs text-gray-500 font-mono tracking-wider">BIO-LOAD INDEX</p>
                                        </div>
                                    </div>
                                    {displayData.stressLevel > 70 && (
                                        <AlertCircle className="w-5 h-5 text-red-500 animate-pulse" />
                                    )}
                                </div>
                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className={`text-6xl font-black tracking-tighter ${getStressColor(displayData.stressLevel)}`}>
                                        {Math.round(displayData.stressLevel)}
                                    </span>
                                    <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">% INDEX</span>
                                </div>
                                <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden border border-white/5">
                                    <motion.div
                                        className={`h-full rounded-full transition-all duration-1000 ${displayData.stressLevel < 30 ? 'bg-emerald-500/60 shadow-[0_0_10px_rgba(16,185,129,0.3)]' :
                                            displayData.stressLevel < 60 ? 'bg-amber-500/60' : 'bg-red-500/60 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                                            }`}
                                        animate={{ width: `${displayData.stressLevel}%` }}
                                    />
                                </div>
                                {displayData.stressLevel > 70 && (
                                    <motion.p
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-[10px] text-red-400 mt-4 flex items-center gap-2 font-mono uppercase tracking-widest border border-red-500/20 bg-red-500/5 p-2 rounded"
                                    >
                                        <AlertCircle className="w-3 h-3" />
                                        CRITICAL LOAD: TRIGGERING RELAXATION DELEGATE
                                    </motion.p>
                                )}
                            </div>

                            {/* Wellness Insights */}
                            <div className="bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-white/5 p-6 rounded-2xl lg:col-span-1">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                                        <Smartphone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">Neural Insights</h4>
                                        <p className="text-xs text-gray-500 font-mono tracking-wider">AI DIAGNOSTICS</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {displayData.stressLevel > 70 ? (
                                        <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl space-y-1">
                                            <p className="text-xs text-red-400 font-bold uppercase tracking-tighter">âš ï¸ Burnout Risk Detected</p>
                                            <p className="text-[10px] text-gray-500 leading-relaxed font-mono">
                                                Physiological markers indicate high sympathetic activation. Lesson generator will prioritize low-energy instructional models.
                                            </p>
                                        </div>
                                    ) : (
                                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-1">
                                            <p className="text-xs text-emerald-400 font-bold uppercase tracking-tighter">âœ“ Optimal Homeostasis</p>
                                            <p className="text-[10px] text-gray-500 leading-relaxed font-mono">
                                                Your current metabolic sync is 94%. Prime state for creative instruction and high-stakes content generation.
                                            </p>
                                        </div>
                                    )}
                                    <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl space-y-1">
                                        <p className="text-xs text-indigo-400 font-bold uppercase tracking-tighter">ðŸ’¡ Flow State Potential</p>
                                        <p className="text-[10px] text-gray-500 leading-relaxed font-mono">
                                            Last heart rate variability markers suggest you are approaching a flow state. Recommended: Deep Work module.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-black/40 border border-white/5 p-12 rounded-3xl text-center backdrop-blur-3xl relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />
                            <Watch className="w-16 h-16 text-emerald-500/20 mx-auto mb-6" />
                            <h3 className="font-bold text-3xl text-white mb-3 tracking-tighter">Sync Your Kinetic Signature</h3>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
                                Connect your wearable hardware to enable biological context within the EdIntel AI ecosystem.
                            </p>
                            <div className="flex items-center justify-center gap-12 opacity-40">
                                {['apple', 'fitbit', 'garmin', 'samsung'].map(brand => (
                                    <div key={brand} className="text-center group cursor-help">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-2 group-hover:bg-white/10 transition-colors">
                                            <Watch className="w-8 h-8 text-gray-500 group-hover:text-emerald-400/50 transition-colors" />
                                        </div>
                                        <p className="text-[10px] text-gray-600 font-mono uppercase tracking-widest">{brand}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}
