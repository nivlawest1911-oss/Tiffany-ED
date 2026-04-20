'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    GraduationCap,
    Zap,
    ChevronRight,
    Search,
    ShieldCheck,
    BookOpen,
    Share2
} from 'lucide-react';
import { professionalEngine, TrainingModule, SkillCategory } from '@/lib/ProfessionalEngine';
import { GlassCard } from '@/components/ui/Cinematic';
import { DualPersonaHUD } from '@/components/professional/DualPersonaHUD';
import { toast } from 'sonner';
import ProfileShareModal from '@/components/modals/ProfileShareModal';

export default function AcademyDashboard() {
    const [modules, setModules] = useState<TrainingModule[]>([]);
    const [skillsMatrix, setSkillsMatrix] = useState<Record<SkillCategory, number>>(professionalEngine.getSkillsMatrix());
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<SkillCategory | 'ALL'>('ALL');
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);

    useEffect(() => {
        setModules(professionalEngine.getAvailableModules());
        const interval = setInterval(() => {
            setSkillsMatrix(professionalEngine.getSkillsMatrix());
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const filteredModules = modules.filter(m => {
        const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'ALL' || m.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const handleStartModule = async (moduleId: string) => {
        const milestone = professionalEngine.completeModule(moduleId, 100);
        if (milestone) {
            const tModule = modules.find(m => m.id === moduleId);
            toast.success("Certification Secured", {
                description: `${tModule?.title} has been hashed to your professional lineage.`
            });

            // In a real app, we'd trigger the logCertificationEarned via a server-side route
            // For now, we update local state
            setModules([...professionalEngine.getAvailableModules()]);
            setSkillsMatrix(professionalEngine.getSkillsMatrix());
        }
    };

    return (
        <div className="space-y-8">
            {/* Header section with Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <GlassCard className="lg:col-span-2 p-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                        <GraduationCap size={160} className="text-intel-gold" />
                    </div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-intel-gold/10 border border-intel-gold/20 text-intel-gold text-xs font-bold uppercase tracking-widest mb-4">
                            <Zap size={12} className="animate-pulse" />
                            Neural Learning Active
                        </div>
                        <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-4">
                            Sovereign <span className="text-intel-gold">Academy</span>
                        </h1>
                        <p className="text-white/60 max-w-xl leading-relaxed">
                            Master the cognitive tools of the EdIntel ecosystem. Advance your status through
                            autonomous training modules and secure high-fidelity certifications.
                        </p>
                    </div>

                    <div className="absolute top-6 right-6 z-20">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsShareModalOpen(true)}
                            className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/40 hover:text-intel-gold hover:bg-intel-gold/10 hover:border-intel-gold/30 transition-all flex items-center gap-2 group/share"
                        >
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-0 group-hover/share:opacity-100 transition-opacity">Share Progress</span>
                            <Share2 size={16} />
                        </motion.button>
                    </div>
                </GlassCard>

                <GlassCard className="p-6 border-intel-gold/20 bg-intel-gold/5 flex flex-col justify-center text-center">
                    <div className="text-5xl font-black text-intel-gold mb-2 tabular-nums">
                        {modules.filter(m => m.isCompleted).length}
                    </div>
                    <div className="text-xs font-bold text-white/40 uppercase tracking-[0.3em]">
                        Credentials Earned
                    </div>
                </GlassCard>

                <div className="flex flex-col gap-4">
                    <DualPersonaHUD 
                        isGenerating={false}
                        stressLevel={42}
                        clinicalSafetyTriggered={false}
                        biometrics={{ hr: 68, hrv: 75 }}
                    />
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                        <div className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">Neural_Handshake_Status</div>
                        <div className="text-[10px] font-bold text-[#22d3ee] uppercase tracking-wider animate-pulse">Synchronized // Patterson Active</div>
                    </div>
                </div>
            </div>

            {/* Skills Matrix / Radar Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {(Object.entries(skillsMatrix) as [SkillCategory, number][]).map(([category, value]) => (
                    <GlassCard key={category} className="p-4 border-white/5 hover:border-white/10 transition-colors">
                        <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-3">
                            {category.replace('_', ' ')}
                        </div>
                        <div className="flex items-end justify-between">
                            <div className="text-2xl font-black text-white">{Math.round(value)}%</div>
                            <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-intel-gold"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${value}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>

            {/* Module Discovery */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar">
                        {['ALL', 'DATA_LITERACY', 'SWARM_GOVERNANCE', 'FISCAL_AI', 'NEURAL_PEDAGOGY'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat as any)}
                                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat
                                    ? 'bg-white text-black'
                                    : 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10 border border-white/5'
                                    }`}
                            >
                                {cat.replace('_', ' ')}
                            </button>
                        ))}
                    </div>

                    <div className="relative group min-w-[300px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-intel-gold transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="SEARCH ACADEMY MODULES..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 pl-12 pr-6 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-intel-gold/50 transition-all uppercase tracking-widest"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <AnimatePresence mode="popLayout">
                        {filteredModules.map((module) => (
                            <motion.div
                                key={module.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={`group relative p-6 rounded-[2rem] border transition-all duration-500 overflow-hidden ${module.isCompleted
                                    ? 'bg-emerald-500/10 border-emerald-500/20'
                                    : 'bg-white/5 border-white/5 hover:border-intel-gold/30'
                                    }`}
                            >
                                <div className="relative z-10 flex gap-6">
                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${module.isCompleted ? 'bg-emerald-500/20 text-emerald-500' : 'bg-white/5 text-white/40 group-hover:text-intel-gold group-hover:bg-intel-gold/10'
                                        } transition-colors`}>
                                        <BookOpen size={32} />
                                    </div>

                                    <div className="flex-1 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-bold text-intel-gold uppercase tracking-widest">
                                                {module.complexity} â€¢ {module.durationMinutes} MIN
                                            </span>
                                            {module.isCompleted && (
                                                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                                                    <ShieldCheck size={12} />
                                                    Certified
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors uppercase tracking-tight">
                                            {module.title}
                                        </h3>
                                        <p className="text-sm text-white/40 leading-relaxed">
                                            {module.description}
                                        </p>

                                        <div className="pt-4 flex items-center justify-between">
                                            <div className="flex gap-2">
                                                {module.skillsGained.map(skill => (
                                                    <span key={skill} className="px-2 py-1 rounded-lg bg-white/5 text-[9px] font-bold text-white/60 uppercase tracking-wider">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                            {!module.isCompleted && (
                                                <button
                                                    onClick={() => handleStartModule(module.id)}
                                                    className="flex items-center gap-2 text-[10px] font-black text-white hover:text-intel-gold transition-colors uppercase tracking-widest group/btn"
                                                >
                                                    Begin Module
                                                    <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <ProfileShareModal 
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                context="ACADEMY"
                userName="EdIntel Delegate" // Ideally from a user context
            />
        </div>
    );
}
