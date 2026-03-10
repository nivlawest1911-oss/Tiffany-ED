'use client';

import { useState } from 'react';
import { GraduationCap, BookOpen, Award, Target, Beaker, Zap, ChevronLeft, Loader2, Sparkles, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/Cinematic';
import { SmartHover } from '@/components/ui/SmartHover';
import { HolographicBackground } from '@/components/ui/HolographicBackground';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'sonner';
import { MetaCurriculumView } from '@/components/academy/MetaCurriculumView';

export default function AcademyPage() {
    const [activeModule, setActiveModule] = useState<string | null>(null);
    const [isThinking, setIsThinking] = useState(false);
    const [isLogicEngineEnabled, setIsLogicEngineEnabled] = useState(false);
    const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
    const [input, setInput] = useState("");
    const [isMetaMode, setIsMetaMode] = useState(false);

    const modules = [
        { id: "neuro", title: "Neuro-Pedagogy", description: "The science of how the sovereign mind absorbs complexity.", icon: <Zap className="h-6 w-6 text-yellow-400" /> },
        { id: "tactical", title: "Tactical Empathy", description: "Advanced emotional intelligence for high-stakes environments.", icon: <Target className="h-6 w-6 text-emerald-400" /> },
        { id: "rhetoric", title: "Regal Rhetoric", description: "Communication strategies for executive leadership.", icon: <Award className="h-6 w-6 text-indigo-400" /> },
        { id: "algo", title: "Algorithmic Pedagogy", description: "Integrating AI into the core of the educational experience.", icon: <Beaker className="h-6 w-6 text-pink-400" /> },
    ];

    const enterModule = (id: string) => {
        setActiveModule(id);
        const moduleData = modules.find(m => m.id === id);
        setChatHistory([{
            role: 'ai',
            content: `### Welcome to the ${moduleData?.title} Module
            
Initiation protocol engaged. I am your Sovereign Instructor. We will now explore: *${moduleData?.description}*

How would you like to begin your training? I can provide a scenario, a theoretical deep-dive, or an executive briefing.`
        }]);
    };

    const handleSendMessage = async () => {
        if (!input.trim() || !activeModule) return;

        const newMessages = [...chatHistory, { role: 'user' as const, content: input }];
        setChatHistory(newMessages);
        setInput("");
        setIsThinking(true);

        try {
            const response = await fetch('/api/vault/chat', { // Reusing Vault API for RAG-like interaction with instruction context
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: newMessages.slice(-5),
                    documentContext: `You are a Sovereign Instructor in the EdIntel Academy. You are teaching a module on ${modules.find(m => m.id === activeModule)?.title}. Your tone is regal, professional, and slightly futuristic. Focus on high-rigor pedagogical concepts.`,
                    isLogicEngineEnabled
                })
            });

            if (!response.ok) throw new Error('Instruction uplink failed');

            const data = await response.json();
            setChatHistory([...newMessages, { role: 'ai', content: data.reply }]);
        } catch (error: any) {
            console.error(error);
            toast.error("Error communicating with Academy Instructor.");
        } finally {
            setIsThinking(false);
        }
    };

    return (
        <div className="relative min-h-screen p-8 lg:p-12 overflow-hidden flex flex-col font-inter text-slate-200">
            <HolographicBackground />

            <AnimatePresence mode="wait">
                {!activeModule ? (
                    <motion.div
                        key="lobby"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="relative z-10 flex-1 flex flex-col"
                    >
                        {/* Hero Section */}
                        <div className="max-w-4xl mb-16 relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                    <GraduationCap className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">
                                    The Sovereign Academy
                                </span>
                            </div>

                            <SmartHover message="Academy Protocol: Master the science of Neuro-Pedagogy and Forge your Intellectual Legacy.">
                                <h1 className="text-6xl lg:text-8xl font-black text-white leading-tight mb-8 tracking-tighter">
                                    Forge Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Intellectual</span> Legacy.
                                </h1>
                            </SmartHover>

                            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl font-medium mb-10">
                                The EdIntel Academy is a crucible for the next generation of sovereign educators and leaders.
                            </p>

                            <div className="flex items-center gap-6 p-4 bg-white/5 border border-white/10 rounded-2xl max-w-md">
                                <div className="p-3 bg-indigo-500/20 rounded-xl text-indigo-400">
                                    <Cpu className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Logic Engine Overlay</h4>
                                    <p className="text-[10px] text-zinc-500 leading-normal mt-1 italic">
                                        Enabling the Logic Engine activates multi-step chain-of-thought processing for instructional mastery.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsLogicEngineEnabled(!isLogicEngineEnabled)}
                                    title={isLogicEngineEnabled ? "Disable Logic Engine" : "Enable Logic Engine"}
                                    aria-label={isLogicEngineEnabled ? "Disable Logic Engine" : "Enable Logic Engine"}
                                    className={`relative w-12 h-6 rounded-full transition-all duration-300 ml-auto ${isLogicEngineEnabled ? 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]' : 'bg-zinc-700'}`}
                                >
                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${isLogicEngineEnabled ? 'left-7' : 'left-1'}`} />
                                </button>
                            </div>
                        </div>

                        {/* Meta-Synthesis Toggle */}
                        <div className="mb-12">
                            <Button
                                onClick={() => setIsMetaMode(!isMetaMode)}
                                className={`w-full py-8 border-dashed border-2 rounded-3xl flex items-center justify-center gap-4 transition-all ${isMetaMode ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400' : 'bg-white/5 border-white/10 text-zinc-500'}`}
                            >
                                <Cpu className={`w-6 h-6 ${isMetaMode ? 'animate-pulse' : ''}`} />
                                <div className="text-left">
                                    <h4 className="font-bold text-white uppercase tracking-widest text-xs">Toggle Meta-Synthesis Protocol</h4>
                                    <p className="text-[10px] text-zinc-500">Enable autonomous curriculum generation grounded in district objectives.</p>
                                </div>
                            </Button>
                        </div>

                        {/* Content Area */}
                        {isMetaMode ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <MetaCurriculumView />
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 mb-12">
                                {modules.map((mod, idx) => (
                                    <SmartHover key={mod.title} message={mod.description}>
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 * idx }}
                                            onClick={() => enterModule(mod.id)}
                                        >
                                            <GlassCard className="p-8 h-full flex flex-col group cursor-pointer hover:border-white/20 transition-all active:scale-95">
                                                <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit group-hover:scale-110 transition-transform duration-500">
                                                    {mod.icon}
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                                                    {mod.title}
                                                </h3>
                                                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                                                    {mod.description}
                                                </p>
                                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 group-hover:text-white transition-colors">
                                                    Begin Initiation <BookOpen className="h-3 w-3" />
                                                </div>
                                            </GlassCard>
                                        </motion.div>
                                    </SmartHover>
                                ))}
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="interface"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="relative z-10 flex-1 flex flex-col"
                    >
                        <header className="flex items-center justify-between mb-8">
                            <Button
                                variant="ghost"
                                onClick={() => setActiveModule(null)}
                                className="text-zinc-400 hover:text-white flex items-center gap-2 font-black uppercase tracking-widest text-[10px]"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Exit Module
                            </Button>

                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Neural Interface</span>
                                    <span className="text-xs text-white font-bold">{modules.find(m => m.id === activeModule)?.title}</span>
                                </div>
                                <div className="h-10 w-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                                    <Cpu className="w-5 h-5 text-indigo-400" />
                                </div>
                            </div>
                        </header>

                        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
                            {/* Left: Chat/Interface */}
                            <GlassCard className="lg:col-span-8 flex flex-col bg-black/40 border-white/5 overflow-hidden">
                                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                                    {chatHistory.map((msg, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[85%] rounded-2xl p-4 ${msg.role === 'user'
                                                ? 'bg-indigo-600/20 border border-indigo-500/30 text-white'
                                                : 'bg-white/5 border border-white/10 text-zinc-300 prose prose-invert prose-sm'
                                                }`}>
                                                {msg.role === 'ai' ? (
                                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                        {msg.content}
                                                    </ReactMarkdown>
                                                ) : (
                                                    <p>{msg.content}</p>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                    {isThinking && (
                                        <div className="flex gap-4 justify-start">
                                            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-center gap-3">
                                                <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">Processing Cogitation...</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 bg-black/40 border-t border-white/5">
                                    <div className="relative flex items-center">
                                        <input
                                            type="text"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                            placeholder="Forge your response..."
                                            className="w-full bg-zinc-900 border border-white/10 rounded-xl py-4 px-6 text-white text-sm focus:outline-none focus:border-indigo-500/50 transition-all font-medium"
                                        />
                                        <Button
                                            size="icon"
                                            onClick={handleSendMessage}
                                            disabled={!input.trim() || isThinking}
                                            className="absolute right-2 bg-indigo-600 hover:bg-indigo-500 text-white h-10 w-10"
                                        >
                                            <Zap className="w-4 h-4 fill-current" />
                                        </Button>
                                    </div>
                                </div>
                            </GlassCard>

                            {/* Right: Telemetry & Status */}
                            <div className="lg:col-span-4 space-y-6">
                                <GlassCard className="p-6 border-indigo-500/20 bg-indigo-500/5">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-6 flex items-center gap-2">
                                        <Sparkles className="w-3 h-3" /> Pedagogical Precision
                                    </h4>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                                                <span className="text-zinc-500">Rigor Level</span>
                                                <span className="text-white">High</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full bg-indigo-500 w-[85%]" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                                                <span className="text-zinc-500">Mastery Index</span>
                                                <span className="text-white">Initiate</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                <div className="h-full bg-purple-500 w-[12%]" />
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>

                                <div className="p-6 bg-white/5 border border-white/10 rounded-[2rem] space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Module Briefing</h4>
                                    <p className="text-xs text-zinc-400 leading-relaxed italic">
                                        "The sovereign educator does not simply transfer data; they facilitate the reconstruction of reality within the learner's neural grid."
                                    </p>
                                </div>

                                <div className="p-6 bg-indigo-950/20 border border-indigo-500/20 rounded-[2rem] flex items-start gap-4">
                                    <Zap className="w-5 h-5 text-indigo-400 shrink-0" />
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-white uppercase tracking-wider">Logic Engine: {isLogicEngineEnabled ? 'ACTIVE' : 'STANDBY'}</p>
                                        <p className="text-[9px] text-zinc-500 leading-tight">Enhanced reasoning protocols provided by Gemini-1.5-Pro. Multi-step cognition active.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tactical Footer */}
            {!activeModule && (
                <div className="mt-auto pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 z-10">
                    <div className="flex items-center gap-8">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Status</span>
                            <span className="text-xs font-bold text-emerald-500 flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                Curriculum Online
                            </span>
                        </div>
                        <div className="flex flex-col border-l border-white/10 pl-8">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Participants</span>
                            <span className="text-xs font-bold text-white">1,240 Enrolled</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
