"use client"

import { useState } from "react"
import { Users, MessageCircle, Video, FileText, Share2, Clock, CheckCircle } from "lucide-react"

interface CollaborationSession {
    id: string
    title: string
    participants: number
    status: "active" | "scheduled" | "completed"
    type: "planning" | "iep" | "meeting" | "training"
}

export function CollaborationHub() {
    const [sessions] = useState<CollaborationSession[]>([
        { id: "1", title: "IEP Team Meeting - Student A", participants: 5, status: "active", type: "iep" },
        { id: "2", title: "Lesson Planning - 3rd Grade", participants: 3, status: "active", type: "planning" },
        { id: "3", title: "Board Presentation Prep", participants: 8, status: "scheduled", type: "meeting" },
        { id: "4", title: "New Teacher Orientation", participants: 12, status: "completed", type: "training" },
    ])

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
            case "scheduled": return "bg-amber-500/20 text-amber-400 border-amber-500/30"
            case "completed": return "bg-gray-500/20 text-gray-400 border-gray-500/30"
            default: return "bg-white/5 text-gray-400"
        }
    }

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "iep": return FileText
            case "planning": return Users
            case "meeting": return Video
            case "training": return Share2
            default: return MessageCircle
        }
    }

    return (
        <section id="collaboration" className="px-4 md:px-8 py-16 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 holographic opacity-10 -z-10" />

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d2ff]/10 border border-[#00d2ff]/30 text-[#00d2ff] text-sm mb-4 float-animation">
                        <Users className="w-4 h-4" />
                        REAL-TIME COLLABORATION
                    </div>
                    <h2 className="font-black tracking-tighter text-4xl md:text-6xl text-white mb-4">
                        Collaboration <span className="gradient-text">Hub</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Work together in real-time with your team on IEPs, lesson plans, and district initiatives
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Active Sessions */}
                    <div className="lg:col-span-2 space-y-4">
                        <h3 className="font-bold text-xl text-white mb-4">Active Sessions</h3>
                        {sessions.map((session) => {
                            const Icon = getTypeIcon(session.type)
                            return (
                                <div key={session.id} className="glass-card p-6 rounded-2xl hover:scale-[1.02] transition-all cursor-pointer">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-[#00d2ff]/20 flex items-center justify-center">
                                                <Icon className="w-6 h-6 text-[#00d2ff]" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white">{session.title}</h4>
                                                <p className="text-sm text-gray-400">{session.participants} participants</p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(session.status)}`}>
                                            {session.status}
                                        </span>
                                    </div>

                                    {session.status === "active" && (
                                        <div className="flex items-center gap-3">
                                            <button className="flex-1 py-2 bg-[#00d2ff]/20 border border-[#00d2ff]/30 text-[#00d2ff] rounded-lg hover:bg-[#00d2ff]/30 transition-all flex items-center justify-center gap-2">
                                                <Video className="w-4 h-4" />
                                                Join Session
                                            </button>
                                            <button className="px-4 py-2 bg-white/5 border border-white/10 text-gray-400 rounded-lg hover:bg-white/10 transition-all">
                                                <Share2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-xl text-white mb-4">Quick Start</h3>
                        <button className="w-full p-6 glass-card-emerald rounded-2xl hover:scale-[1.02] transition-all text-left">
                            <div className="flex items-center gap-3 mb-2">
                                <Video className="w-6 h-6 text-emerald-400" />
                                <h4 className="font-bold text-white">Start Video Call</h4>
                            </div>
                            <p className="text-sm text-gray-400">Instant team meeting</p>
                        </button>

                        <button className="w-full p-6 glass-card-gold rounded-2xl hover:scale-[1.02] transition-all text-left">
                            <div className="flex items-center gap-3 mb-2">
                                <FileText className="w-6 h-6 text-[#d4af37]" />
                                <h4 className="font-bold text-white">Co-Edit Document</h4>
                            </div>
                            <p className="text-sm text-gray-400">Real-time collaboration</p>
                        </button>

                        <button className="w-full p-6 glass-card rounded-2xl hover:scale-[1.02] transition-all text-left">
                            <div className="flex items-center gap-3 mb-2">
                                <MessageCircle className="w-6 h-6 text-[#00d2ff]" />
                                <h4 className="font-bold text-white">Team Chat</h4>
                            </div>
                            <p className="text-sm text-gray-400">Instant messaging</p>
                        </button>

                        {/* Recent Activity */}
                        <div className="glass-card p-6 rounded-2xl mt-6">
                            <h4 className="font-bold text-white mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-gray-400" />
                                Recent Activity
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-1" />
                                    <div>
                                        <p className="text-sm text-white">IEP approved</p>
                                        <p className="text-xs text-gray-500">2 min ago</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-1" />
                                    <div>
                                        <p className="text-sm text-white">Lesson plan shared</p>
                                        <p className="text-xs text-gray-500">15 min ago</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-1" />
                                    <div>
                                        <p className="text-sm text-white">Meeting scheduled</p>
                                        <p className="text-xs text-gray-500">1 hour ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
