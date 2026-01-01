'use client';
import { Play, ClipboardCheck, LayoutGrid, Award, Info, Plus, ChevronRight, Brain, Target, Zap, Shield } from 'lucide-react';
import { useState } from 'react';

export default function NeuralTrainingCommand() {
    const [activeSection, setActiveSection] = useState<'assessments' | 'training' | 'simulators'>('training');

    const heroProgram = {
        title: "Personalized AI Protocol",
        subtitle: "Neural Sync v4.0",
        goal: "Goal: 404 Sovereignty Points",
        skills: ["Pedagogical Nuance", "Compliance Logic", "Admin Authority", "Sentiment Alignment"],
        nextUp: [
            { id: 1, icon: <Brain size={14} /> },
            { id: 2, icon: <Shield size={14} /> },
            { id: 3, icon: <Zap size={14} /> },
        ]
    };

    const diagnostics = [
        {
            title: "AL Literacy Act Diagnostic",
            tags: ["Standardized Scan", "State Compliance"],
            skills: ["Phonemic Awareness", "Fluency", "Comprehension"],
            overflow: "+6 Standards",
            img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80",
            buttonText: "Start Diagnostic"
        },
        {
            title: "SPED Sovereign Audit",
            tags: ["Legal Verification", "IEP Integrity"],
            skills: ["Narrative Logic", "Data Continuity", "Law Alignment"],
            overflow: "+12 Nodes",
            img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
            buttonText: "Verify Records"
        },
        {
            title: "District Policy Ingestion",
            tags: ["Neural Learning", "Policy Sync"],
            skills: ["Code Ingestion", "Local Law Sync", "Custom Protocol"],
            overflow: "Global",
            img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
            buttonText: "Initialize Sync"
        }
    ];

    const simulators = [
        { title: "IEP Meeting Simulator", skills: ["Negotiation", "Empathy"], img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=400&q=80", isNew: true },
        { title: "Observation Loop", skills: ["Precision", "Tact"], img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80", isNew: false },
        { title: "Board Strategic Keynote", skills: ["Authority", "Clarity"], img: "https://images.unsplash.com/photo-1475721027187-4024733923f6?w=400&q=80", isNew: true },
        { title: "Conflict Resolution", skills: ["Neutrality", "Logic"], img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80", isNew: false },
        { title: "Data-Driven Coaching", skills: ["Analytics", "Mentorship"], img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80", isNew: false },
        { title: "Crisis Comm Hub", skills: ["Rapid Response", "Tone"], img: "https://images.unsplash.com/photo-1557426272-fc759fbb7a8d?w=400&q=80", isNew: true },
    ];

    return (
        <div className="p-10 rounded-[2.5rem] bg-stone-50 text-zinc-900 border border-zinc-200 shadow-3xl relative overflow-hidden group">
            {/* Header / Sub-Nav */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-500/20">
                        <Target className="text-white" size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight uppercase">Neural <span className="text-blue-600">Sync Command</span></h2>
                        <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mt-1">Sovereign Training Node // v4.0</p>
                    </div>
                </div>

                <div className="flex bg-zinc-200/50 p-1 rounded-2xl border border-zinc-200">
                    <button
                        onClick={() => setActiveSection('training')}
                        className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSection === 'training' ? 'bg-white text-blue-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                    >
                        Programs
                    </button>
                    <button
                        onClick={() => setActiveSection('assessments')}
                        className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSection === 'assessments' ? 'bg-white text-blue-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                    >
                        Diagnostics
                    </button>
                    <button
                        onClick={() => setActiveSection('simulators')}
                        className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeSection === 'simulators' ? 'bg-white text-blue-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-700'}`}
                    >
                        Simulators
                    </button>
                </div>
            </div>

            {/* Hero Card (CogniFit Training Style) */}
            <div className="relative w-full aspect-[21/9] rounded-[2.5rem] overflow-hidden mb-10 group/hero border border-zinc-200 shadow-xl bg-white">
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent z-10" />
                <img
                    src="C:/Users/nivla/.gemini/antigravity/brain/9ae6d28f-6087-47a0-8aee-e5e3ecebd38a/uploaded_image_3_1767222059208.jpg"
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-20 group-hover/hero:scale-105 transition-transform duration-1000"
                    alt="Neural Hub"
                />

                <div className="absolute inset-0 z-20 p-12 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-[8px] font-black uppercase tracking-widest">Global Protocol</span>
                            <span className="text-[10px] font-bold text-zinc-400">Session 1</span>
                        </div>
                        <h3 className="text-5xl font-black tracking-tighter uppercase italic leading-none">{heroProgram.title}</h3>
                        <p className="text-blue-600 font-bold mt-2 uppercase tracking-widest text-sm">{heroProgram.subtitle}</p>
                    </div>

                    <div className="flex items-end justify-between">
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                {heroProgram.skills.map((skill, i) => (
                                    <span key={i} className="px-3 py-1 bg-zinc-100 text-zinc-600 rounded-lg text-[9px] font-bold">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            <div className="p-4 bg-zinc-900 text-white rounded-2xl flex items-center gap-4 shadow-lg active:scale-95 cursor-pointer">
                                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                                    <Play fill="currentColor" size={16} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest">Launch Protocol</p>
                                    <p className="text-[8px] text-zinc-400 uppercase tracking-widest leading-none mt-1">Estimated Drift: 15min</p>
                                </div>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-xs font-black text-zinc-900 mb-4">{heroProgram.goal}</p>
                            <div className="flex items-center gap-3">
                                <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Next Up:</span>
                                <div className="flex gap-2">
                                    {heroProgram.nextUp.map(item => (
                                        <div key={item.id} className="w-8 h-8 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-400">
                                            {item.icon}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sub-Grids */}
            {activeSection === 'assessments' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    {diagnostics.map((item, idx) => (
                        <div key={idx} className="bg-white rounded-[2rem] border border-zinc-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group/diag">
                            <div className="h-40 relative">
                                <img src={item.img} className="w-full h-full object-cover group-hover/diag:scale-110 transition-transform duration-700" alt={item.title} />
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                                <div className="absolute top-4 left-4 flex gap-2">
                                    {item.tags.map((tag, t) => (
                                        <span key={t} className="px-2 py-0.5 bg-white/80 backdrop-blur-md rounded text-[7px] font-black uppercase tracking-widest border border-white/50">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="p-6">
                                <h4 className="text-lg font-black uppercase tracking-tight mb-4">{item.title}</h4>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {item.skills.map((skill, s) => (
                                        <span key={s} className="text-[9px] font-bold text-zinc-500">{skill}</span>
                                    ))}
                                    <span className="text-[9px] font-black text-blue-600">{item.overflow}</span>
                                </div>
                                <button className="w-full py-4 bg-zinc-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                                    {item.buttonText} <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeSection === 'simulators' && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    {simulators.map((game, idx) => (
                        <div key={idx} className="group/game relative aspect-square rounded-2xl overflow-hidden border border-zinc-200 bg-white cursor-pointer shadow-sm hover:shadow-lg transition-all">
                            <img src={game.img} className="w-full h-full object-cover grayscale group-hover/game:grayscale-0 group-hover/game:scale-110 transition-all duration-700" alt={game.title} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/game:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                                <p className="text-[10px] font-black text-white uppercase tracking-tight leading-none mb-1">{game.title}</p>
                                <div className="flex gap-1">
                                    {game.skills.map((s, i) => (
                                        <span key={i} className="text-[6px] font-bold text-blue-400 uppercase">{s}</span>
                                    ))}
                                </div>
                            </div>
                            {game.isNew && (
                                <div className="absolute top-2 right-2 px-2 py-0.5 bg-blue-600 text-white rounded text-[7px] font-black uppercase tracking-widest shadow-lg">New</div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Progress Bar (CogniFit Style) */}
            <div className="mt-12 pt-8 border-t border-zinc-100">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Sovereign Proficiency Index</p>
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">84% Synced</span>
                </div>
                <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden border border-zinc-200">
                    <div className="w-[84%] h-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
                </div>
            </div>
        </div>
    );
}
