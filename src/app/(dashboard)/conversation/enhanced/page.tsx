"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff, Camera, Watch, Video, Send, Loader2, Brain, Activity, Zap, TrendingUp } from "lucide-react"
import { useChat } from "@ai-sdk/react"
import { AvatarDisplay, AvatarState } from "@/components/ui/AvatarDisplay"
import { animationService, AnimationState } from "@/lib/animation-service"
import { wearableService } from "@/lib/wearable-service"

export default function EnhancedMultimodalHub() {
    const [avatarState, setAvatarState] = useState<AnimationState>('idle')
    const [isRecording, setIsRecording] = useState(false)
    const [isCapturing, setIsCapturing] = useState(false)
    const [isWearableConnected, setIsWearableConnected] = useState(false)
    const [wearableStats, setWearableStats] = useState({ heartRate: '--', stress: '--' })
    const videoRef = useRef<HTMLVideoElement>(null)

    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: '/api/voice/stream-response',
        onResponse: () => animationService.setState('speaking'),
        onFinish: () => animationService.setState('idle'),
    } as any) as any

    useEffect(() => {
        const unsubscribe = animationService.subscribe(setAvatarState)
        return unsubscribe
    }, [])

    const toggleRecording = () => {
        setIsRecording(!isRecording)
        if (!isRecording) {
            animationService.setState('listening')
        } else {
            animationService.setState('thinking')
        }
    }

    const toggleCapture = async () => {
        if (isCapturing) {
            if (videoRef.current?.srcObject) {
                const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
                tracks.forEach(track => track.stop())
            }
            setIsCapturing(false)
        } else {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true })
                if (videoRef.current) videoRef.current.srcObject = stream
                setIsCapturing(true)
            } catch (err) {
                console.error("Camera access failed:", err)
            }
        }
    }

    const connectWearable = async () => {
        try {
            await wearableService.requestConnection()
            setIsWearableConnected(true)
            // Mock data for demo
            setWearableStats({ heartRate: '75', stress: 'Low' })
        } catch (err) {
            console.error("Wearable connection failed:", err)
        }
    }

    return (
        <div className="min-h-screen bg-[#050505] text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left: AI Avatar & Interaction */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <div className="relative aspect-video rounded-3xl overflow-hidden glass-card border border-white/10 group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

                        {/* Avatar Display */}
                        <div className="absolute inset-0 flex items-center justify-center p-8">
                            <AvatarDisplay
                                state={avatarState === 'idle' || avatarState === 'speaking' || avatarState === 'thinking' ? avatarState.toUpperCase() as AvatarState : 'IDLE'}
                                size={280}
                            />
                        </div>

                        {/* Status Overlay */}
                        <div className="absolute top-6 left-6 z-20 flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full animate-pulse ${avatarState === 'speaking' ? 'bg-emerald-500' :
                                avatarState === 'thinking' ? 'bg-amber-500' :
                                    avatarState === 'listening' ? 'bg-blue-500' : 'bg-white/30'
                                }`} />
                            <span className="text-sm font-bold tracking-widest uppercase opacity-80">
                                {avatarState}
                            </span>
                        </div>

                        {/* Camera Preview PIP */}
                        <AnimatePresence>
                            {isCapturing && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="absolute top-6 right-6 w-48 aspect-video rounded-xl overflow-hidden border border-white/20 z-20"
                                >
                                    <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover grayscale" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Controls */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6">
                            <button
                                onClick={toggleRecording}
                                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isRecording ? 'bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]' : 'bg-white/10 hover:bg-white/20'
                                    }`}
                            >
                                {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                            </button>

                            <button
                                onClick={toggleCapture}
                                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isCapturing ? 'bg-blue-500' : 'bg-white/10 hover:bg-white/20'
                                    }`}
                            >
                                <Camera className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Conversation Feed */}
                    <div className="flex-1 glass-card rounded-3xl p-6 overflow-y-auto max-h-[400px] border border-white/5 space-y-4">
                        {messages.length === 0 && (
                            <div className="h-full flex items-center justify-center text-gray-500 italic">
                                Start a conversation with your Sovereign Delegate...
                            </div>
                        )}
                        {messages.map((m: any, i: number) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-white/5 border border-white/10'
                                    }`}>
                                    <p className="text-sm">{m.content}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                                    <Loader2 className="w-4 h-4 animate-spin opacity-50" />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Bar */}
                    <form onSubmit={handleSubmit} className="relative">
                        <input
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Strategic direction required..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 pr-16 focus:outline-none focus:border-white/20 transition-all"
                        />
                        <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>

                {/* Right: Telemetry & Multimodal Controls */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Wearable Hub */}
                    <div className="glass-card rounded-3xl p-6 border border-white/10">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold flex items-center gap-2">
                                <Watch className="w-5 h-5 text-blue-400" />
                                Wearable Hub
                            </h3>
                            <button
                                onClick={connectWearable}
                                className={`text-xs px-3 py-1 rounded-full border transition-all ${isWearableConnected ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-white/5 border-white/10 hover:bg-white/10'
                                    }`}
                            >
                                {isWearableConnected ? 'Connected' : 'Connect'}
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                <p className="text-xs text-gray-500 mb-1">Heart Rate</p>
                                <div className="flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-red-500" />
                                    <span className="text-xl font-bold">{wearableStats.heartRate}</span>
                                    <span className="text-xs text-gray-600">BPM</span>
                                </div>
                            </div>
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                <p className="text-xs text-gray-500 mb-1">Stress (AI)</p>
                                <div className="flex items-center gap-2">
                                    <Brain className="w-4 h-4 text-purple-500" />
                                    <span className="text-xl font-bold">{wearableStats.stress}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Capabilities */}
                    <div className="glass-card rounded-3xl p-6 border border-white/10">
                        <h3 className="font-bold mb-4 opacity-70 italic text-sm">Enhanced Capabilities</h3>
                        <div className="space-y-3">
                            {[
                                { icon: Brain, label: 'Gemini 2.0 Reasoning', status: 'Active' },
                                { icon: Video, label: 'Multimodal Vision', status: isCapturing ? 'Active' : 'Standby' },
                                { icon: Zap, label: 'Latency: 240ms', status: 'Optimal' },
                                { icon: TrendingUp, label: 'Strategic Alignment', status: '98%' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <item.icon className="w-4 h-4 text-gray-400" />
                                        <span className="text-xs font-semibold">{item.label}</span>
                                    </div>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.status === 'Active' || item.status === 'Optimal' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-gray-500'
                                        }`}>
                                        {item.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Strategic Memo */}
                    <div className="glass-card-gold rounded-3xl p-6 border border-[#d4af37]/30">
                        <h3 className="text-[#d4af37] font-black text-xs tracking-widest uppercase mb-4">Tactical Memo</h3>
                        <p className="text-xs text-gray-400 leading-relaxed italic">
                            "The integration of biometric feedback with multimodal reasoning enables the Sovereign Delegate to adjust pedagogical intensity in real-time, ensuring maximum cognitive retention."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
