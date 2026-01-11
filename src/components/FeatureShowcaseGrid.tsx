'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Sparkles, FileText, Brain, MessageSquare, Award, Zap, Users, Calendar,
    BookOpen, Clipboard, Target, TrendingUp, Shield, Heart, Lightbulb,
    Code, BarChart3, Megaphone, Palette, Video, GraduationCap, Trophy,
    Rocket, Search, Filter, ArrowRight, CheckCircle
} from 'lucide-react';
import Link from 'link';

const allTools = [
    // IEP & Special Ed
    { id: 'iep-architect', name: 'IEP Architect', description: 'Generate compliant IEP drafts with SMART goals', icon: Sparkles, category: 'iep', color: 'from-purple-500 to-pink-500', link: '/enhanced-test' },
    { id: 'behavior-coach', name: 'Behavior Coach', description: 'Positive behavior intervention strategies and PBIS support', icon: Heart, category: 'iep', color: 'from-orange-500 to-red-500', link: '/generators/behavior-coach' },
    { id: 'dyslexia-resource', name: 'Dyslexia Resource Gen', description: 'Specialized interventions and fonts for reading support', icon: BookOpen, category: 'iep', color: 'from-blue-500 to-cyan-500', link: '/generators/dyslexia' },
    { id: 'cognitive-coach', name: 'Cognitive Coach', description: 'Executive function strategies', icon: Brain, category: 'iep', color: 'from-green-500 to-emerald-500', link: '/generators/cognitive' },

    // Lesson Planning
    { id: 'lesson-planner', name: 'Lesson Planner', description: 'Standards-aligned lesson plans in seconds', icon: FileText, category: 'lesson', color: 'from-blue-500 to-cyan-500', link: '/generators/lesson-planner' },
    { id: 'pbl-architect', name: 'PBL Architect', description: 'Project-based learning design', icon: Rocket, category: 'lesson', color: 'from-purple-500 to-pink-500', link: '/generators/pbl' },
    { id: 'differentiation', name: 'Differentiation', description: 'Tiered activities for diverse learners', icon: Users, category: 'lesson', color: 'from-green-500 to-emerald-500', link: '/generators/differentiation' },
    { id: 'assessment-builder', name: 'Assessment Builder', description: 'Create comprehensive assessments', icon: Clipboard, category: 'lesson', color: 'from-orange-500 to-red-500', link: '/generators/assessment' },
    { id: 'rubric-maker', name: 'Rubric Maker', description: 'Create detailed grading rubrics for any assignment', icon: Target, category: 'lesson', color: 'from-pink-500 to-purple-500', link: '/generators/rubric' },
    { id: 'study-guide', name: 'Study Guide Maker', description: 'Comprehensive review materials', icon: BookOpen, category: 'lesson', color: 'from-cyan-500 to-blue-500', link: '/generators/study-guide' },
    { id: 'quiz-gamifier', name: 'Quiz Gamifier', description: 'Turn assessments into engaging games', icon: Trophy, category: 'lesson', color: 'from-purple-500 to-pink-500', link: '/generators/quiz-game' },
    { id: 'video-lesson', name: 'Video Lesson Planner', description: 'Create engaging video lesson scripts', icon: Video, category: 'lesson', color: 'from-blue-500 to-cyan-500', link: '/generators/video-lesson' },

    // Communication
    { id: 'email-composer', name: 'Email Composer', description: 'Professional communications for parents and staff', icon: MessageSquare, category: 'communication', color: 'from-green-500 to-emerald-500', link: '/generators/email-composer' },
    { id: 'recommendation-writer', name: 'Recommendation Writer', description: 'Draft powerful letters of recommendation', icon: Award, category: 'communication', color: 'from-purple-500 to-pink-500', link: '/generators/recommendation' },
    { id: 'parent-communicator', name: 'Parent Communicator', description: 'Effective parent communication logs', icon: Users, category: 'communication', color: 'from-blue-500 to-cyan-500', link: '/generators/parent-comm' },
    { id: 'newsletter-wizard', name: 'Newsletter Wizard', description: 'Engaging community updates', icon: Megaphone, category: 'communication', color: 'from-orange-500 to-red-500', link: '/generators/newsletter' },
    { id: 'comms-director', name: 'Comms Director', description: 'PR and marketing content', icon: Megaphone, category: 'communication', color: 'from-pink-500 to-purple-500', link: '/generators/pr' },

    // Behavior & SEL
    { id: 'conflict-mediator', name: 'Conflict Mediator', description: 'Scripts and strategies for resolving conflicts', icon: Shield, category: 'behavior', color: 'from-red-500 to-orange-500', link: '/generators/conflict' },
    { id: 'icebreaker-specialist', name: 'Icebreaker Specialist', description: 'Fun activities to build classroom community', icon: Heart, category: 'behavior', color: 'from-pink-500 to-purple-500', link: '/generators/icebreaker' },
    { id: 'student-goal-setter', name: 'Student Goal Setter', description: 'Help students create SMART goals', icon: Target, category: 'behavior', color: 'from-green-500 to-emerald-500', link: '/generators/student-goals' },

    // Admin & Compliance
    { id: 'grant-writer', name: 'Grant Writer Studio', description: 'Secure funding with compelling proposals', icon: Zap, category: 'admin', color: 'from-purple-500 to-pink-500', link: '/generators/grant-writer' },
    { id: 'policy-advisor', name: 'Policy Advisor', description: 'Navigate regulations and compliance', icon: Shield, category: 'admin', color: 'from-blue-500 to-cyan-500', link: '/generators/policy' },
    { id: 'grant-auditor', name: 'Grant Auditor', description: 'Check spending against grant requirements', icon: CheckCircle, category: 'admin', color: 'from-green-500 to-emerald-500', link: '/generators/grant-audit' },
    { id: 'meeting-prep', name: 'Meeting Prep', description: 'Agendas and talking points', icon: Calendar, category: 'admin', color: 'from-orange-500 to-red-500', link: '/generators/meeting' },
    { id: 'budget-allocator', name: 'Budget Allocator', description: 'Financial modeling and planning', icon: TrendingUp, category: 'admin', color: 'from-purple-500 to-pink-500', link: '/generators/budget' },
    { id: 'safety-drill', name: 'Safety Drill Master', description: 'Crisis planning and emergency protocols', icon: Shield, category: 'admin', color: 'from-red-500 to-orange-500', link: '/generators/safety' },
    { id: 'transport-logistics', name: 'Transport Logistics', description: 'Route efficiency and planning', icon: Calendar, category: 'admin', color: 'from-blue-500 to-cyan-500', link: '/generators/transport' },
    { id: 'athletic-compliance', name: 'Athletic Compliance', description: 'Track student athlete eligibility', icon: Trophy, category: 'admin', color: 'from-green-500 to-emerald-500', link: '/generators/athletics' },
    { id: 'schedule-optimizer', name: 'Master Schedule Optimizer', description: 'Analyze and improve class schedules', icon: Calendar, category: 'admin', color: 'from-purple-500 to-pink-500', link: '/generators/schedule' },

    // Teaching & Learning
    { id: 'field-trip', name: 'Field Trip Architect', description: 'Plan educational excursions with logistics', icon: Calendar, category: 'teaching', color: 'from-cyan-500 to-blue-500', link: '/generators/field-trip' },
    { id: 'substitute-binder', name: 'Substitute Binder Pro', description: 'Complete day-of substitute packet instantly', icon: Clipboard, category: 'teaching', color: 'from-green-500 to-emerald-500', link: '/generators/sub-binder' },
    { id: 'idea-generator', name: 'Idea Generator', description: 'Creative solutions for any challenge', icon: Lightbulb, category: 'teaching', color: 'from-orange-500 to-red-500', link: '/generators/ideas' },
    { id: 'writing-coach', name: 'Writing Coach', description: 'Essay feedback and improvement', icon: FileText, category: 'teaching', color: 'from-purple-500 to-pink-500', link: '/generators/writing' },
    { id: 'math-tutor', name: 'Math Tutor Pro', description: 'Step-by-step math help', icon: Brain, category: 'teaching', color: 'from-blue-500 to-cyan-500', link: '/generators/math-tutor' },
    { id: 'science-fair', name: 'Science Fair Mentor', description: 'Project ideas and guidance', icon: Sparkles, category: 'teaching', color: 'from-green-500 to-emerald-500', link: '/generators/science-fair' },
    { id: 'college-essay', name: 'College Essay Coach', description: 'Ivy League-level essay feedback', icon: GraduationCap, category: 'teaching', color: 'from-purple-500 to-pink-500', link: '/generators/college-essay' },
    { id: 'debate-prep', name: 'Debate Prep', description: 'Argument building and rebuttals', icon: MessageSquare, category: 'teaching', color: 'from-orange-500 to-red-500', link: '/generators/debate' },

    // Tech & Data
    { id: 'code-commander', name: 'Code Commander', description: 'Learn coding concepts', icon: Code, category: 'tech', color: 'from-purple-500 to-pink-500', link: '/generators/code' },
    { id: 'data-detective', name: 'Data Detective', description: 'Data visualization and analysis', icon: BarChart3, category: 'tech', color: 'from-blue-500 to-cyan-500', link: '/generators/data-viz' },
    { id: 'data-analyzer', name: 'Data Analyzer', description: 'Interpret student data', icon: BarChart3, category: 'tech', color: 'from-green-500 to-emerald-500', link: '/generators/data-analysis' },
    { id: 'design-studio', name: 'Design Studio', description: 'Creative layout and graphics', icon: Palette, category: 'tech', color: 'from-pink-500 to-purple-500', link: '/generators/design' },
];

const categories = [
    { id: 'all', name: 'All Tools', count: 41 },
    { id: 'iep', name: 'IEP & Special Ed', count: 4 },
    { id: 'lesson', name: 'Lesson Planning', count: 8 },
    { id: 'communication', name: 'Communication', count: 5 },
    { id: 'behavior', name: 'Behavior & SEL', count: 3 },
    { id: 'admin', name: 'Admin & Compliance', count: 9 },
    { id: 'teaching', name: 'Teaching & Learning', count: 8 },
    { id: 'tech', name: 'Tech & Data', count: 4 },
];

export default function FeatureShowcaseGrid() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [visibleCount, setVisibleCount] = useState(12);

    const filteredTools = allTools.filter(tool => {
        const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
        const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const visibleTools = filteredTools.slice(0, visibleCount);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 text-center"
                >
                    <h1 className="text-5xl font-bold text-white mb-4">
                        41 AI-Powered Tools
                    </h1>
                    <p className="text-xl text-purple-300 max-w-2xl mx-auto">
                        Everything you need to save time and focus on what matters most
                    </p>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                >
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search tools..."
                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-black/40 backdrop-blur-xl border border-purple-500/20 text-white placeholder-purple-400/50 focus:border-purple-500/40 outline-none"
                        />
                    </div>
                </motion.div>

                {/* Category Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8 overflow-x-auto"
                >
                    <div className="flex gap-2 min-w-max pb-2">
                        {categories.map((category) => (
                            <motion.button
                                key={category.id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === category.id
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                                        : 'bg-black/40 text-purple-300 hover:bg-purple-500/20 border border-purple-500/20'
                                    }`}
                            >
                                {category.name}
                                <span className="ml-2 text-xs opacity-75">({category.count})</span>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {visibleTools.map((tool, index) => (
                        <Link key={tool.id} href={tool.link}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.05 }}
                                whileHover={{ scale: 1.02, y: -4 }}
                                className="group p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer h-full"
                            >
                                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${tool.color} mb-4 group-hover:scale-110 transition-transform`}>
                                    <tool.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
                                <p className="text-purple-200 mb-4 leading-relaxed">{tool.description}</p>
                                <div className="flex items-center gap-2 text-purple-400 group-hover:text-purple-300 transition-colors">
                                    <span className="text-sm font-medium">Try it now</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                {/* Load More */}
                {filteredTools.length > visibleCount && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setVisibleCount(prev => prev + 12)}
                            className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/50"
                        >
                            Load More Tools ({filteredTools.length - visibleCount} remaining)
                        </motion.button>
                    </motion.div>
                )}

                {/* Results Count */}
                <div className="mt-8 text-center text-purple-300">
                    Showing {visibleTools.length} of {filteredTools.length} tools
                </div>
            </div>
        </div>
    );
}
