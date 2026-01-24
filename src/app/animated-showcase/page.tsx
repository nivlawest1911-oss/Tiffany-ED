'use client';

import AnimatedEducatorHero from '@/components/AnimatedEducatorHero';
import AnimatedBrainNetwork from '@/components/AnimatedBrainNetwork';
import AnimatedCollaborationScene from '@/components/AnimatedCollaborationScene';

export default function AnimatedHeroShowcase() {
    return (
        <div className="min-h-screen bg-black p-8 space-y-12">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-black text-white mb-4">Animated Hero Components</h1>
                <p className="text-zinc-400 mb-12">Choose your preferred animated hero for EdIntel</p>

                {/* Option 1 - Professional Educator */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-bold">
                            ✓ SELECTED
                        </div>
                        <h2 className="text-2xl font-bold text-white">Option 1: Professional Educator with AI</h2>
                    </div>
                    <p className="text-zinc-400 mb-6">
                        Perfect for hero sections, about pages, or feature showcases. Shows professional educator with holographic AI displays and analytics.
                    </p>
                    <AnimatedEducatorHero />
                </div>

                {/* Option 2 - Brain Network */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-4">Option 2: AI Neural Network Brain</h2>
                    <p className="text-zinc-400 mb-6">
                        Perfect for backgrounds, tech sections, or AI feature pages. Abstract brain visualization with flowing connections.
                    </p>
                    <AnimatedBrainNetwork />
                </div>

                {/* Option 3 - Collaboration */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-4">Option 3: Diverse Educators Collaborating</h2>
                    <p className="text-zinc-400 mb-6">
                        Perfect for community sections, team pages, or testimonials. Shows collaborative professional environment with AI analytics.
                    </p>
                    <AnimatedCollaborationScene />
                </div>

                {/* Usage Instructions */}
                <div className="mt-16 p-8 bg-zinc-900 border border-zinc-800 rounded-2xl">
                    <h3 className="text-xl font-bold text-white mb-4">How to Use</h3>
                    <div className="space-y-4 text-zinc-300">
                        <div>
                            <p className="font-semibold text-white mb-2">Import the component:</p>
                            <code className="block bg-black p-4 rounded-lg text-sm text-purple-400">
                                import AnimatedEducatorHero from '@/components/AnimatedEducatorHero';
                            </code>
                        </div>
                        <div>
                            <p className="font-semibold text-white mb-2">Use in your page:</p>
                            <code className="block bg-black p-4 rounded-lg text-sm text-purple-400">
                                &lt;AnimatedEducatorHero /&gt;
                            </code>
                        </div>
                        <div>
                            <p className="font-semibold text-white mb-2">Suggested locations:</p>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                <li>Hero section on homepage</li>
                                <li>About page header</li>
                                <li>Contact page background</li>
                                <li>Feature showcase sections</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
