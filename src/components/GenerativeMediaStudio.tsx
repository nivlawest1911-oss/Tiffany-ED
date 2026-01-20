'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles, Video, Image as ImageIcon, FileText,
    Cpu, Activity, CheckCircle, Smartphone,
    Layers, Zap, Command, Loader2
} from 'lucide-react';

const GENERATED_ASSETS = [
    {
        id: 'g1',
        type: 'image',
        url: '/images/features/strategic_vision_classroom.png',
        title: 'Future Classroom Concept',
        prompt: "Modern, high-tech classroom with holographic displays"
    },
    {
        id: 'g2',
        type: 'video',
        url: '/videos/features/iep-architect-demo.mp4',
        title: 'IEP Walkthrough',
        prompt: "Video tutorial for new IEP compliance standards"
    },
    {
        id: 'g3',
        type: 'document',
        url: '',
        title: 'District Strategic Plan 2026',
        prompt: "Executive summary of 5-year fiscal growth vectors"
    },
    {
        id: 'g4',
        type: 'image',
        url: '/images/features/collaborative_intelligence_team.png',
        title: 'Data Team Briefing',
        prompt: "Professional leadership team analyzing data metrics"
    },
    {
        id: 'g5',
        type: 'audio',
        url: '/audio/briefings/morning_update.mp3',
        title: 'Morning Executive Briefing',
        prompt: "Daily audio summary of key leadership priorities"
    },
    {
        id: 'g6',
        type: 'interactive',
        url: '',
        title: 'Budget Simulation Dashboard',
        prompt: "Interactive chart for fiscal scenario planning"
    },
    {
        id: 'g7',
        type: 'video',
        url: '/videos/features/superintendent_address.mp4',
        title: 'Superintendent State of Schools',
        prompt: "Cinematic keynote address with 4K resolution"
    },
    {
        id: 'g8',
        type: 'document',
        url: '',
        title: 'Federal Grant Award Notice',
        prompt: "Official award notification for 10M innovation grant"
    },
    {
        id: 'g9',
        type: 'interactive',
        url: '',
        title: 'VR School Board Room',
        prompt: "Virtual reality environment for remote board governance"
    }
];

export default function GenerativeMediaStudio() {
    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [mediaType, setMediaType] = useState<'image' | 'video' | 'document'>('image');
    const [generationStep, setGenerationStep] = useState("Initializing...");
    const [generatedResult, setGeneratedResult] = useState<typeof GENERATED_ASSETS[0] | null>(null);

    const handleGenerate = () => {
        if (!prompt) return;
        setIsGenerating(true);
        setProgress(0);
        setGeneratedResult(null);

        // Simulation Loop
        const steps = [
            "Parsing semantic intent...",
            "Accessing neural archives...",
            "Synthesizing visual topology...",
            "Refining fidelity...",
            "Finalizing render..."
        ];

        let start = 0;
        const interval = setInterval(() => {
            start += Math.random() * 15;
            if (start > 100) {
                start = 100;
                clearInterval(interval);
                finishGeneration();
            }
            setProgress(start);

            // Random step text
            const stepIndex = Math.floor((start / 100) * steps.length);
            setGenerationStep(steps[Math.min(stepIndex, steps.length - 1)]);

        }, 500);
    };

    const finishGeneration = () => {
        setTimeout(() => {
            setIsGenerating(false);
            // Pick a random result based on type (simulated)
            const result = GENERATED_ASSETS.find(a => a.type === mediaType) || GENERATED_ASSETS[0];
            setGeneratedResult(result);
        }, 800);
    };

    return (
        <section className="py-24 bg-[#09090b] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="mb-16 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Sparkles size={14} />
                        <span>Generative Architect Engine</span>
                    </div>
                    <h2 className="text-5xl font-black text-white uppercase tracking-tighter mb-6">
                        Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Anything.</span><br />
                        Instantly.
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Command the EdIntel Neural Engine to generate high-fidelity videos, images, and documents tailored to your district's specific DNA.
                    </p>
                </div>

                {/* Main Studio Interface */}
                <div className="max-w-4xl mx-auto bg-zinc-900/50 backdrop-blur-xl rounded-[2rem] border border-white/10 p-2 overflow-hidden shadow-2xl relative">

                    {/* Input Area */}
                    <div className="p-8 relative z-10">
                        <div className="flex flex-col gap-6">

                            {/* Type Selector */}
                            <div className="flex bg-zinc-950/50 p-1.5 rounded-xl border border-white/5 w-fit">
                                {[
                                    { id: 'image', icon: ImageIcon, label: 'Visual' },
                                    { id: 'video', icon: Video, label: 'Motion' },
                                    { id: 'document', icon: FileText, label: 'Docs' }
                                ].map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => setMediaType(type.id as any)}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${mediaType === type.id
                                            ? 'bg-purple-600 text-white shadow-lg'
                                            : 'text-zinc-500 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        <type.icon size={14} />
                                        {type.label}
                                    </button>
                                ))}
                            </div>

                            {/* Prompt Input */}
                            <div className="relative">
                                <div className="absolute top-4 left-4">
                                    <Command className="w-5 h-5 text-purple-500" />
                                </div>
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    placeholder="Describe the asset you need (e.g., 'A cinematic video about fiscal solvency for the board meeting')..."
                                    className="w-full h-32 bg-zinc-950 focus:bg-black border border-white/10 focus:border-purple-500/50 rounded-xl p-4 pl-12 text-zinc-100 placeholder:text-zinc-600 resize-none outline-none transition-all text-lg font-medium"
                                />
                                <div className="absolute bottom-4 right-4 text-[10px] text-zinc-600 font-mono">
                                    AI-READY // MODEL v4.0
                                </div>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={handleGenerate}
                                disabled={isGenerating || !prompt}
                                className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all ${isGenerating
                                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                                    : 'bg-white text-black hover:bg-purple-50 hover:scale-[1.01] shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                                    }`}
                            >
                                {isGenerating ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Zap size={16} className={prompt ? "text-purple-600 fill-current" : ""} />
                                        Generate Asset
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Progress Overlay */}
                    <AnimatePresence>
                        {isGenerating && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 z-20 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center"
                            >
                                <div className="w-24 h-24 mb-6 relative">
                                    <div className="absolute inset-0 rounded-full border-4 border-zinc-800" />
                                    <svg className="w-full h-full rotate-[-90deg]">
                                        <circle
                                            cx="48"
                                            cy="48"
                                            r="44"
                                            fill="none"
                                            stroke="#9333ea"
                                            strokeWidth="4"
                                            strokeDasharray="276"
                                            strokeDashoffset={276 - (276 * progress) / 100}
                                            className="transition-all duration-300 ease-linear"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Cpu size={32} className="text-purple-500 animate-pulse" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Constructing Reality</h3>
                                <p className="text-purple-400 font-mono text-xs uppercase tracking-widest animate-pulse">{generationStep}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Results Section */}
                <AnimatePresence>
                    {generatedResult && !isGenerating && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl mx-auto mt-8"
                        >
                            <div className="bg-zinc-900 border border-emerald-500/20 rounded-2xl p-1 overflow-hidden">
                                <div className="bg-zinc-950 rounded-xl overflow-hidden relative group">
                                    <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
                                        <CheckCircle size={10} />
                                        Complete
                                    </div>

                                    {generatedResult.type === 'video' ? (
                                        <div className="aspect-video bg-zinc-900 flex items-center justify-center cursor-pointer group-hover:bg-zinc-800 transition-colors">
                                            <Video size={48} className="text-zinc-700" />
                                            {/* Placeholder for actual video embed */}
                                            <p className="text-zinc-500 text-xs font-mono mt-4 absolute bottom-4">PREVIEW RENDER #8492</p>
                                        </div>
                                    ) : (
                                        <div className="aspect-video bg-zinc-900 relative">
                                            <img src={generatedResult.url} alt="Generated" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                                        </div>
                                    )}

                                    <div className="p-6 bg-zinc-900">
                                        <h4 className="text-white font-bold text-lg">{generatedResult.title}</h4>
                                        <p className="text-zinc-500 text-sm mt-1">{generatedResult.prompt}</p>
                                        <div className="flex gap-3 mt-4">
                                            <button className="flex-1 py-2 bg-white text-black text-xs font-bold uppercase rounded-lg hover:bg-zinc-200">Download Asset</button>
                                            <button className="flex-1 py-2 bg-zinc-800 text-white text-xs font-bold uppercase rounded-lg hover:bg-zinc-700">Refine</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </section>
    );
}
