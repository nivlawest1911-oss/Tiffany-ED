"use client"

import { useState } from "react"
import { Glasses, Play, Award, TrendingUp, Target, Zap } from "lucide-react"

interface VRModule {
    id: string
    title: string
    description: string
    duration: string
    difficulty: "beginner" | "intermediate" | "advanced"
    completed: boolean
    progress: number
}

export function VRTraining() {
    const [modules] = useState<VRModule[]>([
        {
            id: "1",
            title: "Classroom Management VR",
            description: "Practice de-escalation techniques in realistic scenarios",
            duration: "15 min",
            difficulty: "beginner",
            completed: false,
            progress: 65,
        },
        {
            id: "2",
            title: "IEP Meeting Simulation",
            description: "Navigate complex parent conferences with confidence",
            duration: "20 min",
            difficulty: "intermediate",
            completed: true,
            progress: 100,
        },
        {
            id: "3",
            title: "Crisis Response Training",
            description: "Emergency protocols and student safety procedures",
            duration: "30 min",
            difficulty: "advanced",
            completed: false,
            progress: 0,
        },
        {
            id: "4",
            title: "Inclusive Teaching Strategies",
            description: "Differentiation techniques for diverse learners",
            duration: "25 min",
            difficulty: "intermediate",
            completed: false,
            progress: 30,
        },
    ])

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "beginner": return "text-emerald-400"
            case "intermediate": return "text-amber-400"
            case "advanced": return "text-red-400"
            default: return "text-gray-400"
        }
    }

    return (
        <section id="vr-training" className="px-4 md:px-8 py-16 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 kente-pattern opacity-5 -z-10" />

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm mb-4 float-animation">
                        <Glasses className="w-4 h-4" />
                        VIRTUAL REALITY
                    </div>
                    <h2 className="font-black tracking-tighter text-4xl md:text-6xl text-white mb-4">
                        VR <span className="gradient-text">Training</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Immersive professional development with Meta Quest, Apple Vision Pro, and HTC Vive
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="glass-card p-6 rounded-2xl text-center">
                        <Target className="w-8 h-8 text-[#00d2ff] mx-auto mb-2" />
                        <p className="text-3xl font-black text-white">12</p>
                        <p className="text-sm text-gray-400">Modules Completed</p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl text-center">
                        <Zap className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                        <p className="text-3xl font-black text-white">8.5h</p>
                        <p className="text-sm text-gray-400">Training Time</p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl text-center">
                        <Award className="w-8 h-8 text-[#d4af37] mx-auto mb-2" />
                        <p className="text-3xl font-black text-white">5</p>
                        <p className="text-sm text-gray-400">Certifications</p>
                    </div>
                    <div className="glass-card p-6 rounded-2xl text-center">
                        <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                        <p className="text-3xl font-black text-white">94%</p>
                        <p className="text-sm text-gray-400">Success Rate</p>
                    </div>
                </div>

                {/* VR Modules */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {modules.map((module) => (
                        <div key={module.id} className="glass-card p-6 rounded-2xl hover:scale-[1.02] transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="font-bold text-xl text-white mb-2">{module.title}</h3>
                                    <p className="text-sm text-gray-400 mb-3">{module.description}</p>
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="text-gray-500">{module.duration}</span>
                                        <span className={`font-semibold ${getDifficultyColor(module.difficulty)}`}>
                                            {module.difficulty}
                                        </span>
                                    </div>
                                </div>
                                {module.completed && (
                                    <Award className="w-8 h-8 text-[#d4af37]" />
                                )}
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs text-gray-400">Progress</span>
                                    <span className="text-xs font-bold text-white">{module.progress}%</span>
                                </div>
                                <div className="w-full bg-black/30 rounded-full h-2">
                                    <div
                                        className={`h-full rounded-full transition-all ${module.completed ? 'bg-emerald-500' : 'bg-[#00d2ff]'
                                            }`}
                                        style={{ width: `${module.progress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Action Button */}
                            <button className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${module.completed
                                    ? 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                                    : 'royal-gradient text-white hover:opacity-90'
                                }`}>
                                {module.completed ? (
                                    <>
                                        <Award className="w-5 h-5" />
                                        Completed
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-5 h-5" />
                                        {module.progress > 0 ? 'Continue Training' : 'Start Training'}
                                    </>
                                )}
                            </button>
                        </div>
                    ))}
                </div>

                {/* VR Equipment */}
                <div className="mt-12 glass-card-gold p-8 rounded-3xl">
                    <h3 className="font-bold text-2xl text-white mb-6 text-center">Compatible VR Headsets</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-3">
                                <Glasses className="w-10 h-10 text-purple-400" />
                            </div>
                            <p className="font-semibold text-white">Meta Quest 3</p>
                            <p className="text-xs text-gray-400">Recommended</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-3">
                                <Glasses className="w-10 h-10 text-[#00d2ff]" />
                            </div>
                            <p className="font-semibold text-white">Apple Vision Pro</p>
                            <p className="text-xs text-gray-400">Premium</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-3">
                                <Glasses className="w-10 h-10 text-emerald-400" />
                            </div>
                            <p className="font-semibold text-white">HTC Vive</p>
                            <p className="text-xs text-gray-400">Professional</p>
                        </div>
                        <div className="text-center">
                            <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-3">
                                <Glasses className="w-10 h-10 text-amber-400" />
                            </div>
                            <p className="font-semibold text-white">PSVR 2</p>
                            <p className="text-xs text-gray-400">Gaming</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
