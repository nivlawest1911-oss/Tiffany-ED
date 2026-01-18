"use client"

import { useState } from "react"
import { Video, Mic, Camera, Sparkles, User, Brain, MessageSquare } from "lucide-react"

import { generateSovereignResponse } from '../lib/sovereign-ai';

export function AITwinGenerator() {
    const [twinName, setTwinName] = useState("")
    const [twinRole, setTwinRole] = useState("teacher")
    const [isGenerating, setIsGenerating] = useState(false)
    const [twinCreated, setTwinCreated] = useState(false)
    const [twinProfile, setTwinProfile] = useState<string>("")

    const handleGenerateTwin = async () => {
        setIsGenerating(true)
        try {
            const rawProfile = await generateSovereignResponse("twin configuration", "twin-gen-1");
            const customizedProfile = rawProfile
                .replace('[Name]', twinName || "Dr. West AI")
                .replace('[Role]', twinRole === 'teacher' ? 'Instructional Core Assistant' :
                    twinRole === 'admin' ? 'Strategic Operations Director' :
                        twinRole === 'counselor' ? 'Student Advocacy Lead' : 'Instructional Coach');

            setTwinProfile(customizedProfile);
            setTwinCreated(true);
        } catch (error) {
            console.error("Twin Generation Failed", error);
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <section id="ai-twin" className="px-4 md:px-8 py-16 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 fluid-background -z-10" />

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-sm mb-4 float-animation">
                        <Sparkles className="w-4 h-4" />
                        AI TWIN TECHNOLOGY
                    </div>
                    <h2 className="font-black tracking-tighter text-4xl md:text-6xl text-white mb-4">
                        Create Your <span className="gradient-text">AI Twin</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Generate a personalized AI assistant that learns your teaching style, voice, and preferences
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Twin Creator */}
                    <div className="glass-card-gold p-8 rounded-3xl">
                        <h3 className="font-bold text-2xl text-white mb-6">Twin Configuration</h3>

                        <div className="space-y-6">
                            <div>
                                <label className="text-sm text-gray-400 mb-2 block">Twin Name</label>
                                <input
                                    type="text"
                                    value={twinName}
                                    onChange={(e) => setTwinName(e.target.value)}
                                    placeholder="e.g., Dr. West AI"
                                    className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#d4af37]/50"
                                />
                            </div>

                            <div>
                                <label className="text-sm text-gray-400 mb-2 block">Role</label>
                                <select
                                    value={twinRole}
                                    onChange={(e) => setTwinRole(e.target.value)}
                                    className="w-full p-4 bg-black/30 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#d4af37]/50"
                                >
                                    <option value="teacher">Teacher Assistant</option>
                                    <option value="admin">Administrative Support</option>
                                    <option value="counselor">Student Counselor</option>
                                    <option value="coach">Instructional Coach</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <button className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
                                    <Camera className="w-6 h-6 text-[#00d2ff]" />
                                    <span className="text-xs text-gray-400">Add Photo</span>
                                </button>
                                <button className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
                                    <Mic className="w-6 h-6 text-[#10b981]" />
                                    <span className="text-xs text-gray-400">Voice Sample</span>
                                </button>
                                <button className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
                                    <Video className="w-6 h-6 text-[#d4af37]" />
                                    <span className="text-xs text-gray-400">Video Intro</span>
                                </button>
                            </div>

                            <button
                                onClick={handleGenerateTwin}
                                disabled={isGenerating || !twinName}
                                className="w-full py-4 royal-gradient text-white font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                {isGenerating ? (
                                    <>
                                        <Brain className="w-5 h-5 animate-spin" />
                                        Generating Your AI Twin...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5" />
                                        Create AI Twin
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Twin Preview */}
                    <div className="glass-card p-8 rounded-3xl flex flex-col h-full">
                        <h3 className="font-bold text-2xl text-white mb-6">Twin Preview</h3>

                        {twinCreated ? (
                            <div className="space-y-6 flex-1 flex flex-col">
                                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-[#6b46c1] to-[#d4af37] flex items-center justify-center shrink-0">
                                    <div className="absolute inset-0 kente-pattern opacity-20" />
                                    <User className="w-24 h-24 text-white relative z-10" />
                                </div>

                                <div className="flex-1 overflow-y-auto custom-scrollbar bg-black/30 rounded-xl p-4 border border-white/10">
                                    <pre className="whitespace-pre-wrap font-mono text-xs text-emerald-300 leading-relaxed">
                                        {twinProfile}
                                    </pre>
                                </div>

                                <div className="grid grid-cols-2 gap-4 shrink-0">
                                    <div className="text-center p-4 bg-white/5 rounded-xl">
                                        <p className="text-2xl font-bold text-[#00d2ff]">98%</p>
                                        <p className="text-xs text-gray-400">Voice Match</p>
                                    </div>
                                    <div className="text-center p-4 bg-white/5 rounded-xl">
                                        <p className="text-2xl font-bold text-[#10b981]">Active</p>
                                        <p className="text-xs text-gray-400">Status</p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                <Brain className="w-16 h-16 text-gray-600 mb-4" />
                                <p className="text-gray-500">Your AI Twin will appear here</p>
                                <p className="text-sm text-gray-600 mt-2">Configure and generate to preview</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Embedded Demo Video */}
                <div className="mt-12 glass-card p-8 rounded-3xl">
                    <h3 className="font-bold text-2xl text-white mb-6 text-center">See AI Twins in Action</h3>
                    <div className="aspect-video rounded-2xl overflow-hidden bg-black">
                        <video
                            controls
                            className="w-full h-full"
                            poster="/images/labs-bg.jpg"
                        >
                            <source src="/videos/briefings/counselor_briefing.mp4" type="video/mp4" />
                            <track kind="captions" src="/videos/ai-twin-captions.vtt" srcLang="en" label="English" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
        </section>
    )
}
