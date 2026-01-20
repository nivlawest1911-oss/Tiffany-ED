'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Grid, List, Eye, Code, Palette, Zap, Settings,
    ChevronRight, Copy, Check, Download, Play
} from 'lucide-react';
import Link from 'next/link';

// All available components organized by category
const COMPONENT_LIBRARY = {
    'AI Generators': [
        { name: 'IEPGenerator', path: '/generators/iep-architect', file: 'bento/IEPGenerator.tsx' },
        { name: 'LessonPlanGenerator', path: '/generators/lesson-planner', file: 'bento/LessonPlanGenerator.tsx' },
        { name: 'LeadershipGenerator', path: '/generators/leadership', file: 'bento/LeadershipGenerator.tsx' },
        { name: 'EQGenerator', path: '/generators/eq', file: 'bento/EQGenerator.tsx' },
        { name: 'AutomatedIEPAudit', path: '/generators/iep-audit', file: 'bento/AutomatedIEPAudit.tsx' },
    ],
    'AI Avatars': [
        { name: 'ProfessionalDelegate', path: '/', file: 'ProfessionalDelegate.tsx' },
        { name: 'LiveAvatarChat', path: '/', file: 'LiveAvatarChat.tsx' },
        { name: 'HolographicBriefing', path: '/', file: 'HolographicBriefing.tsx' },
        { name: 'LiveBriefingConsole', path: '/', file: 'LiveBriefingConsole.tsx' },
        { name: 'AvatarLaboratory', path: '/identity', file: 'bento/AvatarLaboratory.tsx' },
        { name: 'AvatarMasterclass', path: '/identity', file: 'bento/AvatarMasterclass.tsx' },
    ],
    'Dashboards': [
        { name: 'InteractiveDashboard', path: '/dashboard', file: 'InteractiveDashboard.tsx' },
        { name: 'AnalyticsDashboard', path: '/analytics', file: 'AnalyticsDashboard.tsx' },
        { name: 'ExecutiveDashboard', path: '/dashboard', file: 'bento/ExecutiveDashboard.tsx' },
    ],
    'Navigation': [
        { name: 'FloatingNavbar', path: '/', file: 'FloatingNavbar.tsx' },
        { name: 'Footer', path: '/', file: 'Footer.tsx' },
        { name: 'Navbar', path: '/', file: 'Navbar.tsx' },
        { name: 'MobileNavigation', path: '/', file: 'MobileNavigation.tsx' },
    ],
    'Interactive': [
        { name: 'CommandPalette', path: '/', file: 'CommandPalette.tsx' },
        { name: 'NotificationCenter', path: '/', file: 'NotificationCenter.tsx' },
        { name: 'OnboardingFlow', path: '/onboarding', file: 'OnboardingFlow.tsx' },
        { name: 'SequentialRecallGame', path: '/cognitive', file: 'SequentialRecallGame.tsx' },
    ],
    'Content': [
        { name: 'UnusualHero', path: '/', file: 'UnusualHero.tsx' },
        { name: 'PremiumPricingTable', path: '/pricing', file: 'PremiumPricingTable.tsx' },
        { name: 'VideoTestimonials', path: '/', file: 'VideoTestimonials.tsx' },
        { name: 'FeatureVideos', path: '/', file: 'FeatureVideos.tsx' },
        { name: 'HowItWorksVideo', path: '/', file: 'HowItWorksVideo.tsx' },
        { name: 'FeatureShowcaseGrid', path: '/features', file: 'FeatureShowcaseGrid.tsx' },
    ],
    'Bento Tiles': [
        { name: 'NeuralSyncGym', path: '/cognitive', file: 'bento/NeuralSyncGym.tsx' },
        { name: 'NeuralTrainingCommand', path: '/cognitive', file: 'bento/NeuralTrainingCommand.tsx' },
        { name: 'ProfessionalBroadcastCenter', path: '/identity', file: 'bento/ProfessionalBroadcastCenter.tsx' },
        { name: 'ProfessionalEnterpriseModule', path: '/identity', file: 'bento/ProfessionalEnterpriseModule.tsx' },
        { name: 'ProfessionalFeed', path: '/identity', file: 'bento/ProfessionalFeed.tsx' },
        { name: 'ProfessionalIDManager', path: '/identity', file: 'bento/ProfessionalIDManager.tsx' },
        { name: 'ProfessionalPrivacyManifesto', path: '/privacy', file: 'bento/ProfessionalPrivacyManifesto.tsx' },
        { name: 'ProfessionalRankGuide', path: '/identity', file: 'bento/ProfessionalRankGuide.tsx' },
        { name: 'ProfessionalSkillMatrix', path: '/identity', file: 'bento/ProfessionalSkillMatrix.tsx' },
        { name: 'ProfessionalSocialConnection', path: '/identity', file: 'bento/ProfessionalSocialConnection.tsx' },
        { name: 'SystemHealthTile', path: '/dashboard', file: 'bento/SystemHealthTile.tsx' },
        { name: 'ArchitectIdentityCenter', path: '/about', file: 'bento/ArchitectIdentityCenter.tsx' },
    ],
};

export default function ComponentExplorer() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedComponent, setSelectedComponent] = useState<any>(null);
    const [copied, setCopied] = useState(false);

    // Filter components based on search
    const filteredComponents = Object.entries(COMPONENT_LIBRARY).reduce((acc, [category, components]) => {
        const filtered = components.filter(comp =>
            comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filtered.length > 0 && (!selectedCategory || selectedCategory === category)) {
            acc[category] = filtered;
        }
        return acc;
    }, {} as Record<string, typeof COMPONENT_LIBRARY[keyof typeof COMPONENT_LIBRARY]>);

    const totalComponents = Object.values(COMPONENT_LIBRARY).reduce((sum, comps) => sum + comps.length, 0);

    const copyImport = (component: any) => {
        const importStatement = `import ${component.name} from '@/components/${component.file.replace('.tsx', '')}';`;
        navigator.clipboard.writeText(importStatement);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white p-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
                        <Code size={14} />
                        <span>Component Library</span>
                    </div>
                    <h1 className="text-5xl font-bold text-white mb-4">
                        Full App Control
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Explore, preview, and use all {totalComponents} components in your EdIntel Professional platform
                    </p>
                </motion.div>

                {/* Search & Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search components..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-400 focus:outline-none focus:border-indigo-500 transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-3 rounded-xl transition-all ${viewMode === 'grid'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                                }`}
                        >
                            <Grid className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-3 rounded-xl transition-all ${viewMode === 'list'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                                }`}
                        >
                            <List className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-2 mb-8">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${selectedCategory === null
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                            }`}
                    >
                        All ({totalComponents})
                    </button>
                    {Object.keys(COMPONENT_LIBRARY).map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${selectedCategory === category
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                                }`}
                        >
                            {category} ({COMPONENT_LIBRARY[category as keyof typeof COMPONENT_LIBRARY].length})
                        </button>
                    ))}
                </div>
            </div>

            {/* Component Grid/List */}
            <div className="max-w-7xl mx-auto">
                {Object.entries(filteredComponents).map(([category, components]) => (
                    <div key={category} className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                            <Palette className="w-6 h-6 text-indigo-400" />
                            {category}
                        </h2>

                        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                            {components.map((component, index) => (
                                <motion.div
                                    key={component.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-indigo-500/50 transition-all group cursor-pointer"
                                    onClick={() => setSelectedComponent(component)}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                                                {component.name}
                                            </h3>
                                            <p className="text-xs text-zinc-500 font-mono">{component.file}</p>
                                        </div>
                                        <Zap className="w-5 h-5 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    <div className="flex gap-2">
                                        <Link href={component.path}>
                                            <button className="flex-1 px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-all flex items-center justify-center gap-2">
                                                <Eye className="w-4 h-4" />
                                                Preview
                                            </button>
                                        </Link>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                copyImport(component);
                                            }}
                                            className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm transition-all"
                                        >
                                            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Component Detail Modal */}
            <AnimatePresence>
                {selectedComponent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setSelectedComponent(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-zinc-900 border border-white/10 rounded-3xl p-8 max-w-2xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-3xl font-bold text-white mb-4">{selectedComponent.name}</h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-zinc-400 mb-2">File Location:</p>
                                    <code className="block px-4 py-2 rounded-lg bg-black/50 text-indigo-400 font-mono text-sm">
                                        src/components/{selectedComponent.file}
                                    </code>
                                </div>
                                <div>
                                    <p className="text-sm text-zinc-400 mb-2">Import Statement:</p>
                                    <code className="block px-4 py-2 rounded-lg bg-black/50 text-emerald-400 font-mono text-sm">
                                        import {selectedComponent.name} from '@/components/{selectedComponent.file.replace('.tsx', '')}';
                                    </code>
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <Link href={selectedComponent.path} className="flex-1">
                                        <button className="w-full px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all flex items-center justify-center gap-2">
                                            <Play className="w-5 h-5" />
                                            View Live
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => copyImport(selectedComponent)}
                                        className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all flex items-center gap-2"
                                    >
                                        {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                        Copy Import
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
