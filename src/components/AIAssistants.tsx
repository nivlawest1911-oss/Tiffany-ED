"use client"

import { useState } from "react"
import { Check, Plus, User, Sparkles, MessageSquare, X, ArrowRight, ShieldCheck, Zap } from "lucide-react"

const delegates = [
    {
        id: "principal",
        name: "Dr. A.I. West",
        role: "Executive AI Consultant",
        expertise: "Leadership & Policy",
        image: "/avatars/principal.jpg",
        color: "#d4af37",
        status: "Online",
        bio: "Modeled after the leadership expertise of Dr. Alvin West, this assistant specializes in high-level district strategy, board relations, and crisis management.",
        competencies: ["Policy Analysis", "Stakeholder Alignment", "Strategic Planning"],
        promptId: "email-composer"
    },
    {
        id: "counselor",
        name: "Sarah Connors",
        role: "Student Support Lead",
        expertise: "SEL & Behavior",
        image: "/avatars/counselor.jpg",
        color: "#10b981",
        status: "Busy",
        bio: "Focuses on the well-being of the campus. Expert in de-escalation, restorative justice frameworks, and mental health resource mapping.",
        competencies: ["Crisis Intervention", "SEL Curriculum", "Behavioral Support"],
        promptId: "behavior-coach"
    },
    {
        id: "curriculum",
        name: "Marcus Aurelius",
        role: "Curriculum Director",
        expertise: "PBL & Standards",
        image: "/avatars/curriculum.jpg",
        color: "#00d2ff",
        status: "Online",
        bio: "A logic-driven educator. Ensures all instructional materials align accurately with Alabama Course of Study standards while maximizing engagement.",
        competencies: ["Standard Alignment", "PBL Design", "Assessment Validity"],
        promptId: "lesson-planner"
    },
    {
        id: "data",
        name: "Athena Logic",
        role: "Data Strategist",
        expertise: "Assessments & Impact",
        image: "/avatars/data.jpg",
        color: "#8b5cf6",
        status: "Processing",
        bio: "Analyzes complex data to find actionable insights. Turns test scores and attendance records into strategic funding reports.",
        competencies: ["Predictive Analytics", "Funding Justification", "Gap Analysis"],
        promptId: "data-analyzer"
    },
    {
        id: "compliance",
        name: "Justus Code",
        role: "Compliance Officer",
        expertise: "IDEA & 504",
        image: "/avatars/compliance.jpg",
        color: "#f59e0b",
        status: "Online",
        bio: "Ensures district excellence and compliance. Monitors all documentation for legal preparedness and ensures full audit readiness.",
        competencies: ["Legal Preparedness", "Audit Prep", "Due Process"],
        promptId: "policy-advisor"
    }
]

export function AIAssistants() {
    const [activeDelegate, setActiveDelegate] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedDelegate, setSelectedDelegate] = useState<typeof delegates[0] | null>(null)

    const handleOpenProfile = (delegate: typeof delegates[0]) => {
        setSelectedDelegate(delegate)
        setIsModalOpen(true)
    }

    const handleDeploy = (promptId: string) => {
        setIsModalOpen(false)
        const element = document.getElementById('ai-generators')
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
    }

    return (
        <section className="py-16 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-2">
                            AI <span className="gradient-text">Assistants</span>
                        </h2>
                        <p className="text-gray-400">Select a professional AI assistant to support your work.</p>
                    </div>
                    <button className="hidden md:flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white text-sm hover:bg-white/10 transition-all">
                        <Plus className="w-4 h-4" />
                        Add Assistant
                    </button>
                </div>

                <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-hide">
                    {delegates.map((delegate) => (
                        <div
                            key={delegate.id}
                            className="snap-center shrink-0 w-80 h-[450px] relative group cursor-pointer"
                            onClick={() => setActiveDelegate(delegate.id)}
                        >
                            {/* Card Container */}
                            <div className={`absolute inset-0 bg-[#0a0f1c] rounded-3xl border border-white/10 overflow-hidden transition-all duration-500 ${activeDelegate === delegate.id ? 'scale-105 shadow-[0_0_30px_rgba(0,0,0,0.5)] border-white/30' : 'group-hover:scale-102'}`}>

                                {/* Background Gradient */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{
                                        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 100%), linear-gradient(45deg, ${delegate.color}40, transparent)`
                                    }}
                                >
                                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                        <User className="w-48 h-48 text-white/10" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className={`w-2 h-2 rounded-full ${delegate.status === 'Online' ? 'bg-green-500 animate-pulse' : 'bg-orange-500'}`} />
                                        <span className="text-xs font-mono text-gray-400 uppercase">{delegate.status}</span>
                                    </div>
                                    <h3 className="text-3xl font-black text-white leading-none mb-1">{delegate.name}</h3>
                                    <p className="text-lg text-gray-300 font-medium mb-4">{delegate.role}</p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-white border border-white/10 backdrop-blur-md">
                                            {delegate.expertise}
                                        </span>
                                    </div>

                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleOpenProfile(delegate); }}
                                        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${activeDelegate === delegate.id
                                            ? "bg-white text-black hover:bg-gray-200"
                                            : "bg-white/10 text-white hover:bg-white/20 border border-white/10"
                                            }`}>
                                        <MessageSquare className="w-4 h-4" />
                                        {activeDelegate === delegate.id ? "Connect" : "View Profile"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODAL */}
            {isModalOpen && selectedDelegate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-[#0a0f1c] border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white bg-white/5 rounded-full z-10">
                            <X className="w-5 h-5" />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* Left: Visuals */}
                            <div className="p-8 relative overflow-hidden flex flex-col justify-between" style={{ background: `linear-gradient(135deg, ${selectedDelegate.color}20, black)` }}>
                                <div>
                                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">{selectedDelegate.role}</h3>
                                    <div className="text-5xl font-black text-white/10 absolute top-4 left-4 pointer-events-none">v4.0</div>
                                </div>
                                <div className="flex items-center justify-center py-8">
                                    <User className="w-32 h-32 text-white/20" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                        <span className="text-xs font-mono text-emerald-400">AUTHORIZATION: LEVEL 5</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-white animate-pulse w-3/4" />
                                    </div>
                                </div>
                            </div>

                            {/* Right: Info */}
                            <div className="p-8 bg-zinc-900/50">
                                <h2 className="text-2xl font-bold text-white mb-1">{selectedDelegate.name}</h2>
                                <p className="text-sm text-gray-400 mb-6">{selectedDelegate.expertise}</p>

                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">BACKGROUND</h4>
                                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                                    {selectedDelegate.bio}
                                </p>

                                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">PRIMARY FOCUS</h4>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {selectedDelegate.competencies.map((c, i) => (
                                        <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-white">
                                            {c}
                                        </span>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handleDeploy(selectedDelegate.promptId)}
                                    className="w-full py-4 bg-gradient-to-r from-[#00d2ff] to-[#10b981] text-black font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2"
                                >
                                    <Zap className="w-4 h-4 mb-0.5" />
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
