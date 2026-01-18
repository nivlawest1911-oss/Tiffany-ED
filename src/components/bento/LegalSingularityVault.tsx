'use client';
import { ExternalLink, Shield as LucideShield, BookOpen, GraduationCap, Building2, TrendingUp, Cpu, FlaskConical, Scale, Lightbulb, ChevronRight } from "lucide-react";
import { ALL_RESOURCES, RESOURCE_METADATA, get2025Updates, getLiteracyResources, getResearchValidation, getIDEACompliance } from '@/config/resources';

export default function LegalSingularityVault() {
    const resources = ALL_RESOURCES;
    const updates2025 = get2025Updates();
    const literacyResources = getLiteracyResources();
    const researchValidation = getResearchValidation();
    const ideaCompliance = getIDEACompliance();

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'state': return <LucideShield className="text-red-500" size={20} />;
            case 'district': return <Building2 className="text-blue-500" size={20} />;
            case 'instructional': return <BookOpen className="text-green-500" size={20} />;
            case 'professional': return <GraduationCap className="text-purple-500" size={20} />;
            case 'accountability': return <TrendingUp className="text-orange-500" size={20} />;
            case 'stem-career': return <Cpu className="text-cyan-500" size={20} />;
            case 'research': return <FlaskConical className="text-pink-500" size={20} />;
            case 'legal': return <Scale className="text-amber-500" size={20} />;
            case 'specialized': return <Lightbulb className="text-indigo-500" size={20} />;
            default: return <LucideShield size={20} />;
        }
    };

    const getPriorityBadge = (priority: string) => {
        switch (priority) {
            case 'critical': return 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-400';
            case 'high': return 'bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/30 dark:text-orange-400';
            default: return 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-400';
        }
    };

    return (
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-zinc-950 text-white shadow-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                        <LucideShield className="text-red-400" size={24} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold">Legal Singularity Vault</h2>
                        <p className="text-sm text-slate-300">ALSDE & MCPSS Compliance Hub</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full border border-green-500/50">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs font-mono text-green-300">LIVE SYNC</span>
                </div>
            </div>

            {/* Alabama Hub Gateway */}
            <a
                href="/resources/alabama"
                className="mb-4 p-5 rounded-2xl bg-gradient-to-r from-blue-600/20 to-emerald-600/20 border border-blue-500/30 flex items-center justify-between group hover:scale-[1.02] transition-all"
            >
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
                        <Building2 className="text-white" size={20} />
                    </div>
                    <div>
                        <p className="text-xs font-black uppercase tracking-widest text-blue-400">Regional Gateway</p>
                        <p className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">Alabama Command Node</p>
                    </div>
                </div>
                <ChevronRight className="text-blue-500 group-hover:translate-x-1 transition-transform" size={20} />
            </a>

            {/* 2025 Updates Banner */}
            {updates2025.length > 0 && (
                <div className="mb-4 p-4 bg-yellow-900/30 border border-yellow-700 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="text-yellow-400" size={16} />
                        <span className="text-sm font-bold text-yellow-400">2025 Updates Available</span>
                    </div>
                    <p className="text-xs text-yellow-200">
                        {updates2025.length} new resources including Digital Literacy Standards and Teacher Shortage Tracking
                    </p>
                </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-2 mb-6">
                <div className="p-3 rounded-lg bg-red-900/20 border border-red-800/50 text-center">
                    <p className="text-xs font-bold uppercase tracking-wider text-red-400">State/Legal</p>
                    <p className="text-lg font-black text-red-400">
                        {RESOURCE_METADATA.categories.state + RESOURCE_METADATA.categories.legal}
                    </p>
                </div>
                <div className="p-3 rounded-lg bg-green-900/20 border border-green-800/50 text-center">
                    <p className="text-xs font-bold uppercase tracking-wider text-green-400">Literacy</p>
                    <p className="text-lg font-black text-green-400">{literacyResources.length}</p>
                </div>
                <div className="p-3 rounded-lg bg-pink-900/20 border border-pink-800/50 text-center">
                    <p className="text-xs font-bold uppercase tracking-wider text-pink-400">Research</p>
                    <p className="text-lg font-black text-pink-400">{researchValidation.length}</p>
                </div>
                <div className="p-3 rounded-lg bg-indigo-900/20 border border-indigo-800/50 text-center">
                    <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">Specialized</p>
                    <p className="text-lg font-black text-indigo-400">{RESOURCE_METADATA.categories.specialized}</p>
                </div>
            </div>

            {/* Resource Links */}
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {resources.map((resource, index) => (
                    <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 bg-slate-800/50 hover:bg-slate-800 rounded-xl border border-slate-700 hover:border-slate-600 transition-all group"
                    >
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                                {getCategoryIcon(resource.category)}
                                <span className="font-semibold text-sm group-hover:text-blue-400 transition-colors">
                                    {resource.title}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-full border ${getPriorityBadge(resource.priority)}`}>
                                    {resource.priority}
                                </span>
                                <ExternalLink size={14} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
                            </div>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">{resource.description}</p>
                    </a>
                ))}
            </div>

            {/* Footer Stats */}
            <div className="mt-6 pt-6 border-t border-slate-800 grid grid-cols-3 gap-4 text-center">
                <div>
                    <p className="text-2xl font-black text-red-400">4</p>
                    <p className="text-xs text-slate-400">State Links</p>
                </div>
                <div>
                    <p className="text-2xl font-black text-blue-400">3</p>
                    <p className="text-xs text-slate-400">District Links</p>
                </div>
                <div>
                    <p className="text-2xl font-black text-green-400">100%</p>
                    <p className="text-xs text-slate-400">Compliance</p>
                </div>
            </div>
        </div>
    );
}
