'use client';

import { useState } from 'react';
import EnhancedGeneratorV2 from '@/components/EnhancedGeneratorV2';
import { Palette, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const generators = [
    {
        id: 'iep-architect',
        title: 'IEP Architect',
        description: 'Generate IDEA-compliant IEPs with AI',
        color: 'purple' as const,
        prompts: [
            'Create IEP for 5th grade student with dyslexia',
            'Generate annual goals for math intervention',
            'Draft accommodations for ADHD student',
        ]
    },
    {
        id: 'lesson-planner',
        title: 'Lesson Plan Generator',
        description: 'Create comprehensive lesson plans',
        color: 'blue' as const,
        prompts: [
            'Create 5-day unit on fractions for 4th grade',
            'Design project-based learning activity',
            'Plan differentiated reading lesson',
        ]
    },
    {
        id: 'behavior-coach',
        title: 'Behavior Coach',
        description: 'Evidence-based behavior interventions',
        color: 'green' as const,
        prompts: [
            'Create behavior intervention plan for classroom disruption',
            'Design positive reinforcement system',
            'Draft de-escalation strategies',
        ]
    },
    {
        id: 'grant-writer',
        title: 'Grant Writer',
        description: 'Compelling grant proposals',
        color: 'orange' as const,
        prompts: [
            'Write grant proposal for STEM program',
            'Create budget narrative for technology grant',
            'Draft needs statement for literacy initiative',
        ]
    },
];

export default function ShowcasePage() {
    const [selectedGenerator, setSelectedGenerator] = useState(generators[0]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
            {/* Header */}
            <div className="border-b border-purple-500/20 bg-black/40 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50">
                            <Palette className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-white">EdIntel Generator Showcase</h1>
                            <p className="text-sm text-purple-300 mt-1">Experience our premium AI generators with different color themes</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Generator Selector */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {generators.map((gen, index) => (
                        <motion.button
                            key={gen.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedGenerator(gen)}
                            className={`p-4 rounded-xl border-2 transition-all ${selectedGenerator.id === gen.id
                                    ? `border-${gen.color}-500 bg-${gen.color}-500/20 shadow-lg shadow-${gen.color}-500/50`
                                    : 'border-gray-700 bg-black/20 hover:border-gray-600'
                                }`}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className={`w-5 h-5 ${selectedGenerator.id === gen.id ? `text-${gen.color}-400` : 'text-gray-400'
                                    }`} />
                                <h3 className={`font-semibold ${selectedGenerator.id === gen.id ? 'text-white' : 'text-gray-300'
                                    }`}>
                                    {gen.title}
                                </h3>
                            </div>
                            <p className="text-sm text-gray-400">{gen.description}</p>
                            <div className={`mt-3 px-3 py-1 rounded-full text-xs font-medium inline-block ${gen.color === 'purple' ? 'bg-purple-500/20 text-purple-300' :
                                    gen.color === 'blue' ? 'bg-blue-500/20 text-blue-300' :
                                        gen.color === 'green' ? 'bg-green-500/20 text-green-300' :
                                            'bg-orange-500/20 text-orange-300'
                                }`}>
                                {gen.color.charAt(0).toUpperCase() + gen.color.slice(1)} Theme
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Selected Generator */}
            <motion.div
                key={selectedGenerator.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <EnhancedGeneratorV2
                    generatorId={selectedGenerator.id}
                    title={selectedGenerator.title}
                    description={selectedGenerator.description}
                    accentColor={selectedGenerator.color}
                    quickPrompts={selectedGenerator.prompts}
                />
            </motion.div>
        </div>
    );
}
