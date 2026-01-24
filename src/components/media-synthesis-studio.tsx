"use client"

import { useState } from "react"
import { Mic, Film, Play, Download, Wand2, Sparkles, MonitorPlay } from "lucide-react"

const videoTemplates = [
    {
        id: "announcement",
        name: "Morning Announcement",
        description: "Daily update from Principal Avatar",
        duration: "2:00",
        thumbColor: "#00d2ff"
    },
    {
        id: "lesson",
        name: "Math Lesson Hook",
        description: "Engaging intro to Quadratic Equations",
        duration: "5:30",
        thumbColor: "#10b981"
    },
    {
        id: "news",
        name: "District News",
        description: "Weekly roundup of school achievements",
        duration: "3:45",
        thumbColor: "#d4af37"
    },
]

export function MediaSynthesisStudio() {
    const [selectedTemplate, setSelectedTemplate] = useState("announcement")
    const [selectedEngine, setSelectedEngine] = useState("internal")
    const [isGenerating, setIsGenerating] = useState(false)
    const [progress, setProgress] = useState(0)

    const handleGenerate = () => {
        setIsGenerating(true)
        setProgress(0)

        // Simulate generation process
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setIsGenerating(false)
                    return 100
                }
                return prev + 1
            })
        }, 50)
    }

    const activeTemplate = videoTemplates.find(t => t.id === selectedTemplate)

    return (
        <section className="px-4 md:px-8 py-16">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-400 text-sm mb-4">
                        <Film className="w-4 h-4" />
                        MEDIA SYNTHESIS ENGINE
                    </div>
                    <h2 className="font-black tracking-tighter text-3xl md:text-5xl text-white mb-2">
                        AI Video <span className="gradient-text">Studio</span>
                    </h2>
                    <p className="text-gray-400">Generate studio-quality educational broadcasts in seconds.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Controls */}
                    <div className="space-y-6">
                        <div className="glass-card p-6 rounded-2xl">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                <Wand2 className="w-5 h-5 text-[#00d2ff]" />
                                Select Template
                            </h3>
                            <div className="space-y-3">
                                {videoTemplates.map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => setSelectedTemplate(t.id)}
                                        className={`w-full p-4 rounded-xl text-left transition-all border ${selectedTemplate === t.id
                                            ? "bg-white/10 border-[#00d2ff]"
                                            : "bg-white/5 border-transparent hover:bg-white/10"
                                            }`}
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-bold text-white">{t.name}</span>
                                            <span className="text-xs text-gray-500">{t.duration}</span>
                                        </div>
                                        <p className="text-xs text-gray-400">{t.description}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-2xl">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-purple-400" />
                                AI Rendering Engine
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-gray-400 block mb-2">Select Engine</label>
                                    <select
                                        value={selectedEngine}
                                        onChange={(e) => setSelectedEngine(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-sm text-gray-300"
                                    >
                                        <option value="internal">EdIntel Professional (Internal)</option>
                                        <option value="heygen">HeyGen (High-Fidelity Lip Sync)</option>
                                        <option value="invideo">InVideo (Broadcast Synthesis)</option>
                                        <option value="opus">Opus (Short-Form Clips)</option>
                                        <option value="captions">Captions (Accessibility & Dubbing)</option>
                                        <option value="gemini">Gemini (Multimodal Analysis)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6 rounded-2xl">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                <Mic className="w-5 h-5 text-[#10b981]" />
                                Voice Control
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-gray-400 block mb-2">Clone Voice Source</label>
                                    <select className="w-full bg-black/40 border border-white/10 rounded-lg p-2 text-sm text-gray-300">
                                        <option>Dr. Alvin West (Original)</option>
                                        <option>Professional Female (Sarah)</option>
                                        <option>Dynamic Narrator (Marcus)</option>
                                    </select>
                                </div>
                                <button className="w-full py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 flex items-center justify-center gap-2">
                                    <Mic className="w-4 h-4" />
                                    Record Custom Sample
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Video Preview */}
                    <div className="lg:col-span-2">
                        <div className="glass-card-gold p-1 rounded-3xl h-full flex flex-col">
                            <div className="relative flex-1 bg-black rounded-2xl overflow-hidden min-h-[400px] flex items-center justify-center group">

                                {/* Simulated Video Content */}
                                {isGenerating ? (
                                    <div className="text-center w-full px-12">
                                        <div className="mb-4 flex flex-col items-center">
                                            <Sparkles className="w-12 h-12 text-[#d4af37] animate-spin mb-4" />
                                            <h3 className="text-2xl font-bold text-white animate-pulse">Rendering Strategic Video...</h3>
                                        </div>
                                        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-[#00d2ff] via-[#10b981] to-[#d4af37]" style={{ width: `${progress}%` }} />
                                        </div>
                                        <p className="mt-2 text-gray-400 text-sm">Synthesizing avatar lip-sync: {progress}%</p>
                                    </div>
                                ) : (
                                    <div className="relative w-full h-full bg-[#050505] flex items-center justify-center">
                                        {/* Placeholder for video */}
                                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#1a1a2e_0%,_#000000_100%)]" />

                                        {/* Avatar Placeholder in Video */}
                                        <div className="relative z-10 text-center">
                                            <div
                                                className="w-32 h-32 rounded-full mx-auto mb-6 bg-cover border-4 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                                                style={{
                                                    borderColor: activeTemplate?.thumbColor,
                                                    backgroundImage: "url('/professional-african-american-educator-avatar-port.jpg')"
                                                }}
                                            />
                                            <h3 className="text-3xl font-black text-white mb-2">{activeTemplate?.name}</h3>
                                            <p className="text-[#d4af37] tracking-widest text-sm uppercase mb-4">Ready to Broadcast</p>

                                            {selectedEngine !== 'internal' && (
                                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
                                                    <Sparkles className="w-3 h-3 text-purple-400" />
                                                    <span className="text-xs font-bold text-white uppercase">Powered by {selectedEngine}</span>
                                                </div>
                                            )}

                                            <button onClick={() => setIsGenerating(true)} className="mt-8 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full backdrop-blur-md transition-all transform hover:scale-105 group-hover:shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                                <Play className="w-8 h-8 text-white fill-white" />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Overlay UI */}
                                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
                                    <div>
                                        <div className="bg-red-600 px-2 py-0.5 rounded text-[10px] font-bold text-white inline-block mb-1">REC</div>
                                        <p className="text-xs font-mono text-gray-400">FPS: 60 | RES: 4K</p>
                                    </div>
                                    <MonitorPlay className="w-6 h-6 text-white/50" />
                                </div>
                            </div>

                            {/* Action Bar */}
                            <div className="px-6 py-4 flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-white text-lg">Export Settings</h4>
                                    <p className="text-xs text-gray-400">MP4 / 4K / Subtitles Enabled</p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleGenerate}
                                        disabled={isGenerating}
                                        className="px-6 py-3 bg-[#00d2ff] hover:bg-[#00d2ff]/80 text-black font-bold rounded-xl flex items-center gap-2 transition-all disabled:opacity-50"
                                    >
                                        <Wand2 className="w-4 h-4" />
                                        {isGenerating ? "Generating..." : "Generate Video"}
                                    </button>
                                    <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl flex items-center gap-2 transition-all">
                                        <Download className="w-4 h-4" />
                                        Download
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
