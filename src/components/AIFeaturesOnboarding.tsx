'use client';

/**
 * EdIntel SOVEREIGN - AI Features Onboarding
 * Interactive tutorial for Gemini Workspace, Hugging Face Studio, and AI Phone Center
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles, Brain, Mic, X,
    ChevronRight, ChevronLeft, Check, Rocket
} from 'lucide-react';
import Link from 'next/link';

interface OnboardingStep {
    id: string;
    title: string;
    description: string;
    icon: any;
    color: string;
    features: string[];
    ctaText: string;
    ctaLink: string;
    image?: string;
}

const onboardingSteps: OnboardingStep[] = [
    {
        id: 'welcome',
        title: 'Welcome to EdIntel SOVEREIGN AI Hub',
        description: 'Discover three powerful AI systems designed to revolutionize your educational leadership workflow.',
        icon: Rocket,
        color: 'from-indigo-500 to-purple-600',
        features: [
            'Import and analyze content from Google Gemini',
            'Generate images and analyze text with Hugging Face',
            'Manage intelligent AI phone calls with sentiment analysis'
        ],
        ctaText: 'Begin Tour',
        ctaLink: '#'
    },
    {
        id: 'gemini',
        title: 'Gemini Workspace Hub',
        description: 'Import conversations, documents, and prompts from your Google Gemini workspace. AI automatically categorizes and converts them into actionable EdIntel workflows.',
        icon: Sparkles,
        color: 'from-emerald-500 to-teal-600',
        features: [
            '📥 Drag-and-drop file uploads (images, PDFs, text)',
            '🤖 AI-powered auto-tagging and categorization',
            '🔄 Convert Gemini conversations into EdIntel workflows',
            '📚 Searchable content library with filters',
            '🎯 Smart feature mapping (IEP, Lesson Plans, etc.)'
        ],
        ctaText: 'Open Gemini Workspace',
        ctaLink: '/gemini-workspace',
        image: '/images/gemini-workspace-preview.png'
    },
    {
        id: 'huggingface',
        title: 'Hugging Face AI Studio',
        description: 'Access cutting-edge AI models for text analysis, image generation, speech processing, and semantic search—all in one unified interface.',
        icon: Brain,
        color: 'from-purple-500 to-pink-600',
        features: [
            '✍️ Text Analysis: Sentiment, summarization, Q&A',
            '🎨 Image Generation: Create visuals from text prompts',
            '🔍 Image Analysis: Object detection, captioning',
            '🎤 Speech Processing: Text-to-speech and transcription',
            '🔎 Semantic Search: Find similar content intelligently'
        ],
        ctaText: 'Launch AI Studio',
        ctaLink: '/huggingface',
        image: '/images/huggingface-studio-preview.png'
    },
    {
        id: 'phone',
        title: 'AI Phone Center',
        description: 'Manage intelligent phone calls with AI-powered voice agents, real-time sentiment analysis, and smart call routing.',
        icon: Mic,
        color: 'from-blue-500 to-cyan-600',
        features: [
            '📞 Incoming call handling with AI greetings',
            '🎭 Multiple AI voice personalities',
            '💬 Real-time sentiment analysis',
            '🧠 Intelligent call routing',
            '📊 Call analytics and history',
            '📤 Outbound calling capabilities'
        ],
        ctaText: 'Open Phone Center',
        ctaLink: '/phone',
        image: '/images/phone-center-preview.png'
    }
];

export default function AIFeaturesOnboarding() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        // Check if user has seen onboarding
        const hasSeenOnboarding = localStorage.getItem('ai_features_onboarding_seen');
        if (!hasSeenOnboarding) {
            setTimeout(() => setIsOpen(true), 1500);
        }
    }, []);

    const handleNext = () => {
        if (currentStep < onboardingSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setCompleted(true);
            setTimeout(() => {
                handleClose();
            }, 2000);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleClose = () => {
        localStorage.setItem('ai_features_onboarding_seen', 'true');
        setIsOpen(false);
    };

    const handleSkip = () => {
        handleClose();
    };

    const step = onboardingSteps[currentStep];
    const Icon = step.icon;

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl"
                onClick={(e) => {
                    if (e.target === e.currentTarget) handleClose();
                }}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative max-w-4xl w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
                >
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>

                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
                        <motion.div
                            className={`h-full bg-gradient-to-r ${step.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    {/* Content */}
                    <div className="p-12">
                        <AnimatePresence mode="wait">
                            {!completed ? (
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Icon */}
                                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${step.color} mb-6`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-4xl font-black text-white mb-4 tracking-tight">
                                        {step.title}
                                    </h2>

                                    {/* Description */}
                                    <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
                                        {step.description}
                                    </p>

                                    {/* Features */}
                                    <div className="space-y-3 mb-8">
                                        {step.features.map((feature, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="flex items-start gap-3"
                                            >
                                                <div className={`mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.color}`} />
                                                <span className="text-zinc-400 text-sm leading-relaxed">
                                                    {feature}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Navigation */}
                                    <div className="flex items-center justify-between pt-8 border-t border-white/5">
                                        <div className="flex items-center gap-4">
                                            {currentStep > 0 && (
                                                <button
                                                    onClick={handlePrevious}
                                                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all"
                                                >
                                                    <ChevronLeft className="w-4 h-4" />
                                                    <span className="text-sm font-bold">Previous</span>
                                                </button>
                                            )}
                                            {currentStep === 0 && (
                                                <button
                                                    onClick={handleSkip}
                                                    className="text-sm font-bold text-zinc-500 hover:text-zinc-300 transition-colors"
                                                >
                                                    Skip Tour
                                                </button>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-4">
                                            {/* Step Indicators */}
                                            <div className="flex items-center gap-2">
                                                {onboardingSteps.map((_, index) => (
                                                    <div
                                                        key={index}
                                                        className={`w-2 h-2 rounded-full transition-all ${index === currentStep
                                                                ? `bg-gradient-to-r ${step.color} w-8`
                                                                : 'bg-white/20'
                                                            }`}
                                                    />
                                                ))}
                                            </div>

                                            {/* Next/Finish Button */}
                                            {currentStep === 0 ? (
                                                <button
                                                    onClick={handleNext}
                                                    className={`flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r ${step.color} text-white font-bold transition-all hover:scale-105`}
                                                >
                                                    <span>{step.ctaText}</span>
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    <Link href={step.ctaLink}>
                                                        <button
                                                            onClick={handleClose}
                                                            className={`px-6 py-3 rounded-xl bg-gradient-to-r ${step.color} text-white font-bold transition-all hover:scale-105`}
                                                        >
                                                            {step.ctaText}
                                                        </button>
                                                    </Link>
                                                    <button
                                                        onClick={handleNext}
                                                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all"
                                                    >
                                                        <span className="text-sm font-bold">
                                                            {currentStep === onboardingSteps.length - 1 ? 'Finish' : 'Next'}
                                                        </span>
                                                        <ChevronRight className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-20"
                                >
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center mb-6">
                                        <Check className="w-10 h-10 text-white" />
                                    </div>
                                    <h2 className="text-4xl font-black text-white mb-4">
                                        You're All Set! 🎉
                                    </h2>
                                    <p className="text-xl text-zinc-400 text-center max-w-md">
                                        Explore the AI Hub from the navigation menu anytime.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
