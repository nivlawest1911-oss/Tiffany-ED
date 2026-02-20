'use client';

import { GraduationCap, BookOpen, Award, Target, Beaker, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { GlassCard } from '@/components/ui/Cinematic';
import { SmartHover } from '@/components/ui/SmartHover';

export default function AcademyPage() {
    const modules = [
        { title: "Neuro-Pedagogy", description: "The science of how the sovereign mind absorbs complexity.", icon: <Zap className="h-6 w-6 text-yellow-400" /> },
        { title: "Tactical Empathy", description: "Advanced emotional intelligence for high-stakes environments.", icon: <Target className="h-6 w-6 text-emerald-400" /> },
        { title: "Regal Rhetoric", description: "Communication strategies for executive leadership.", icon: <Award className="h-6 w-6 text-indigo-400" /> },
        { title: "Algorithmic Pedagogy", description: "Integrating AI into the core of the educational experience.", icon: <Beaker className="h-6 w-6 text-pink-400" /> },
    ];

    return (
        <div className="relative min-h-screen p-8 lg:p-12 overflow-hidden flex flex-col">
            {/* Background Narrative */}
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <span className="text-[12rem] font-black uppercase tracking-tighter leading-none select-none">
                    Academy
                </span>
            </div>

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mb-16 relative z-10"
            >
                <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">
                        The Sovereign Academy
                    </span>
                </div>

                <SmartHover message="Academy Protocol: Master the science of Neuro-Pedagogy and Forge your Intellectual Legacy within the Sovereign Academy.">
                    <h1 className="text-6xl lg:text-8xl font-black text-white leading-tight mb-8 tracking-tighter">
                        Forge Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Intellectual</span> Legacy.
                    </h1>
                </SmartHover>

                <p className="text-xl text-slate-400 leading-relaxed max-w-2xl font-medium mb-10">
                    The EdIntel Academy is not just a training ground—it is a crucible for the next generation of sovereign educators and leaders.
                </p>

                <div className="flex flex-wrap gap-4">
                    <Button size="lg" className="h-14 px-8 bg-white hover:bg-slate-200 text-black rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-white/5">
                        Begin Initiation
                    </Button>
                    <Button size="lg" variant="secondary" className="h-14 px-8 border border-white/10 bg-transparent hover:bg-white/5 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all">
                        View Curriculum
                    </Button>
                </div>
            </motion.div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                {modules.map((mod, idx) => (
                    <SmartHover key={mod.title} message={mod.description}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * idx }}
                        >
                            <GlassCard className="p-8 h-full flex flex-col group cursor-pointer hover:border-white/20 transition-all">
                                <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit group-hover:scale-110 transition-transform duration-500">
                                    {mod.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                                    {mod.title}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                                    {mod.description}
                                </p>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0">
                                    Enter Module <BookOpen className="h-3 w-3" />
                                </div>
                            </GlassCard>
                        </motion.div>
                    </SmartHover>
                ))}
            </div>

            {/* Tactical Footer */}
            <div className="mt-auto pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
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
        </div>
    );
}
