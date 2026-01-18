"use client"

import { useState, useEffect } from "react"
import { Heart, Activity, Zap, TrendingUp, Watch, Smartphone, AlertCircle } from "lucide-react"

interface WearableData {
    heartRate: number
    stressLevel: number
    steps: number
    calories: number
    activeMinutes: number
    sleepQuality: number
}

function MetricBar() {
    const [height, setHeight] = useState('30%');

    useEffect(() => {
        setHeight(`${30 + Math.random() * 70}%`);
    }, []);

    return (
        <div
            className="flex-1 bg-gradient-to-t from-red-500/50 to-red-400 rounded-t transition-all duration-300"
            style={{ height }}
        />
    );
}

export function WearableIntegration() {
    const [isConnected, setIsConnected] = useState(false)
    const [wearableData, setWearableData] = useState<WearableData>({
        heartRate: 72,
        stressLevel: 35,
        steps: 4523,
        calories: 1847,
        activeMinutes: 45,
        sleepQuality: 82,
    })
    const [deviceType, setDeviceType] = useState<string>("apple-watch")

    // Simulate real-time data updates
    useEffect(() => {
        if (isConnected) {
            const interval = setInterval(() => {
                setWearableData(prev => ({
                    heartRate: Math.max(60, Math.min(100, prev.heartRate + (Math.random() - 0.5) * 4)),
                    stressLevel: Math.max(0, Math.min(100, prev.stressLevel + (Math.random() - 0.5) * 10)),
                    steps: prev.steps + Math.floor(Math.random() * 20),
                    calories: prev.calories + Math.floor(Math.random() * 5),
                    activeMinutes: prev.activeMinutes + (Math.random() > 0.9 ? 1 : 0),
                    sleepQuality: prev.sleepQuality,
                }))
            }, 2000)
            return () => clearInterval(interval)
        }
    }, [isConnected])

    const connectWearable = async () => {
        // Simulate wearable connection
        setIsConnected(true)
    }

    const disconnectWearable = () => {
        setIsConnected(false)
    }

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
            <div className="absolute inset-0 fluid-background -z-10" />

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] text-sm mb-4 float-animation">
                        <Watch className="w-4 h-4" />
                        WELLNESS SYNC
                    </div>
                    <h2 className="font-black tracking-tighter text-4xl md:text-6xl text-white mb-4">
                        Wearable <span className="gradient-text">Integration</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Connect your Apple Watch, Fitbit, or Garmin to track educator wellness and prevent burnout
                    </p>
                </div>

                {/* Connection Status */}
                <div className="glass-card-emerald p-6 rounded-2xl mb-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isConnected ? 'bg-emerald-500/20' : 'bg-gray-500/20'}`}>
                                <Watch className={`w-6 h-6 ${isConnected ? 'text-emerald-400' : 'text-gray-400'}`} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">
                                    {isConnected ? 'Connected' : 'Not Connected'}
                                </h3>
                                <p className="text-sm text-gray-400">
                                    {isConnected ? `${deviceType === 'apple-watch' ? 'Apple Watch' : deviceType === 'fitbit' ? 'Fitbit' : 'Garmin'} Series 9` : 'Connect your wearable device'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <select
                                value={deviceType}
                                onChange={(e) => setDeviceType(e.target.value)}
                                className="px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-emerald-500/50"
                                disabled={isConnected}
                            >
                                <option value="apple-watch">Apple Watch</option>
                                <option value="fitbit">Fitbit</option>
                                <option value="garmin">Garmin</option>
                                <option value="samsung">Samsung Galaxy Watch</option>
                            </select>

                            {isConnected ? (
                                <button
                                    onClick={disconnectWearable}
                                    className="px-6 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                                >
                                    Disconnect
                                </button>
                            ) : (
                                <button
                                    onClick={connectWearable}
                                    className="px-6 py-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-all"
                                >
                                    Connect Device
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Health Metrics Dashboard */}
                {isConnected && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Heart Rate */}
                        <div className="glass-card p-6 rounded-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                                        <Heart className="w-5 h-5 text-red-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">Heart Rate</h4>
                                        <p className="text-xs text-gray-400">Real-time BPM</p>
                                    </div>
                                </div>
                                <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-gray-600'}`} />
                            </div>
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className={`text-5xl font-black ${getHeartRateColor(wearableData.heartRate)}`}>
                                    {Math.round(wearableData.heartRate)}
                                </span>
                                <span className="text-gray-400">BPM</span>
                            </div>
                            <div className="h-16 flex items-end gap-1">
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <MetricBar key={i} />
                                ))}
                            </div>
                        </div>

                        {/* Stress Level */}
                        <div className="glass-card p-6 rounded-2xl">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                                        <Activity className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">Stress Level</h4>
                                        <p className="text-xs text-gray-400">Burnout Prevention</p>
                                    </div>
                                </div>
                                {wearableData.stressLevel > 70 && (
                                    <AlertCircle className="w-5 h-5 text-red-400 animate-pulse" />
                                )}
                            </div>
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className={`text-5xl font-black ${getStressColor(wearableData.stressLevel)}`}>
                                    {Math.round(wearableData.stressLevel)}
                                </span>
                                <span className="text-gray-400">%</span>
                            </div>
                            <div className="w-full bg-black/30 rounded-full h-3 overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${wearableData.stressLevel < 30 ? 'bg-emerald-500' :
                                        wearableData.stressLevel < 60 ? 'bg-amber-500' : 'bg-red-500'
                                        }`}
                                    style={{ width: `${wearableData.stressLevel}%` }}
                                />
                            </div>
                            {wearableData.stressLevel > 70 && (
                                <p className="text-xs text-red-400 mt-3 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    High stress detected - Consider a break
                                </p>
                            )}
                        </div>

                        {/* Activity */}
                        <div className="glass-card p-6 rounded-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-[#00d2ff]/20 flex items-center justify-center">
                                    <Zap className="w-5 h-5 text-[#00d2ff]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Activity</h4>
                                    <p className="text-xs text-gray-400">Daily Movement</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm text-gray-400">Steps</span>
                                        <span className="text-sm font-bold text-[#00d2ff]">{wearableData.steps.toLocaleString()}</span>
                                    </div>
                                    <div className="w-full bg-black/30 rounded-full h-2">
                                        <div className="h-full bg-[#00d2ff] rounded-full" style={{ width: `${(wearableData.steps / 10000) * 100}%` }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm text-gray-400">Calories</span>
                                        <span className="text-sm font-bold text-emerald-400">{wearableData.calories}</span>
                                    </div>
                                    <div className="w-full bg-black/30 rounded-full h-2">
                                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(wearableData.calories / 2500) * 100}%` }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm text-gray-400">Active Minutes</span>
                                        <span className="text-sm font-bold text-amber-400">{wearableData.activeMinutes}</span>
                                    </div>
                                    <div className="w-full bg-black/30 rounded-full h-2">
                                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(wearableData.activeMinutes / 60) * 100}%` }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sleep Quality */}
                        <div className="glass-card p-6 rounded-2xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5 text-purple-400" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">Sleep Quality</h4>
                                    <p className="text-xs text-gray-400">Last Night</p>
                                </div>
                            </div>
                            <div className="flex items-baseline gap-2 mb-4">
                                <span className="text-5xl font-black text-purple-400">
                                    {wearableData.sleepQuality}
                                </span>
                                <span className="text-gray-400">%</span>
                            </div>
                            <p className="text-sm text-gray-400">
                                7h 23m total sleep
                            </p>
                        </div>

                        {/* Wellness Insights */}
                        <div className="glass-card-gold p-6 rounded-2xl lg:col-span-2">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-[#d4af37]/20 flex items-center justify-center">
                                    <Smartphone className="w-5 h-5 text-[#d4af37]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">AI Wellness Insights</h4>
                                    <p className="text-xs text-gray-400">Powered by EdIntel AI</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {wearableData.stressLevel > 70 && (
                                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                                        <p className="text-sm text-red-400 font-semibold mb-1">⚠️ High Stress Alert</p>
                                        <p className="text-xs text-gray-400">
                                            Your stress level is elevated. Consider taking a 10-minute mindfulness break or delegating tasks.
                                        </p>
                                    </div>
                                )}
                                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                                    <p className="text-sm text-emerald-400 font-semibold mb-1">✓ Good Heart Rate Variability</p>
                                    <p className="text-xs text-gray-400">
                                        Your cardiovascular health is optimal. Keep up the good work!
                                    </p>
                                </div>
                                <div className="p-4 bg-[#00d2ff]/10 border border-[#00d2ff]/30 rounded-xl">
                                    <p className="text-sm text-[#00d2ff] font-semibold mb-1">💡 Activity Suggestion</p>
                                    <p className="text-xs text-gray-400">
                                        You're {Math.round((1 - wearableData.steps / 10000) * 100)}% away from your daily step goal. A quick walk during lunch could help!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Not Connected State */}
                {!isConnected && (
                    <div className="glass-card p-12 rounded-3xl text-center">
                        <Watch className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="font-bold text-2xl text-white mb-2">Connect Your Wearable</h3>
                        <p className="text-gray-400 mb-6 max-w-md mx-auto">
                            Sync your health data to get personalized wellness insights and prevent educator burnout
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-2">
                                    <Watch className="w-8 h-8 text-gray-400" />
                                </div>
                                <p className="text-xs text-gray-500">Apple Watch</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-2">
                                    <Activity className="w-8 h-8 text-gray-400" />
                                </div>
                                <p className="text-xs text-gray-500">Fitbit</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mx-auto mb-2">
                                    <Heart className="w-8 h-8 text-gray-400" />
                                </div>
                                <p className="text-xs text-gray-500">Garmin</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
