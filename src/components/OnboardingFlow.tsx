'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles, GraduationCap, Users, Shield as LucideShield, Briefcase, CheckCircle,
    ArrowRight, ArrowLeft, FileText, Brain, MessageSquare, Award,
    Zap, Target
} from 'lucide-react';
import Confetti from 'react-confetti';

export default function OnboardingFlow({ onComplete }: { onComplete?: () => void }) {
    const [step, setStep] = useState(0);
    const [selectedRole, setSelectedRole] = useState('');
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [showConfetti, setShowConfetti] = useState(false);

    const roles = [
        {
            id: 'teacher',
            title: 'Classroom Teacher',
            description: 'K-12 educator focused on instruction',
            icon: GraduationCap,
            color: 'from-purple-500 to-pink-500',
        },
        {
            id: 'admin',
            title: 'Administrator',
            description: 'Principal, AP, or district leader',
            icon: Briefcase,
            color: 'from-blue-500 to-cyan-500',
        },
        {
            id: 'specialist',
            title: 'Specialist',
            description: 'Special ed, counselor, or coach',
            icon: LucideShield,
            color: 'from-green-500 to-emerald-500',
        },
        {
            id: 'other',
            title: 'Other',
            description: 'Support staff or other role',
            icon: Users,
            color: 'from-orange-500 to-red-500',
        },
    ];

    const interests = [
        { id: 'iep', label: 'IEP Generation', icon: FileText, description: 'Create compliant IEPs faster' },
        { id: 'lesson', label: 'Lesson Planning', icon: Brain, description: 'Standards-aligned lessons' },
        { id: 'communication', label: 'Communication', icon: MessageSquare, description: 'Parent & staff emails' },
        { id: 'behavior', label: 'Behavior Management', icon: Target, description: 'PBIS & interventions' },
        { id: 'grant', label: 'Grant Writing', icon: Zap, description: 'Secure funding' },
        { id: 'compliance', label: 'Compliance', icon: LucideShield, description: 'Stay up to date' },
    ];

    const handleNext = () => {
        if (step === 2) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 5000);
        }
        setStep(prev => Math.min(prev + 1, 3));
    };

    const handleBack = () => {
        setStep(prev => Math.max(prev - 1, 0));
    };

    const toggleInterest = (id: string) => {
        setSelectedInterests(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const canProceed = () => {
        if (step === 1) return selectedRole !== '';
        if (step === 2) return selectedInterests.length > 0;
        return true;
    };

    const getRecommendations = () => {
        const recs = [];
        if (selectedInterests.includes('iep')) recs.push('IEP Architect');
        if (selectedInterests.includes('lesson')) recs.push('Lesson Planner');
        if (selectedInterests.includes('communication')) recs.push('Email Composer');
        if (selectedInterests.includes('behavior')) recs.push('Behavior Coach');
        if (selectedInterests.includes('grant')) recs.push('Grant Writer');
        if (selectedInterests.includes('compliance')) recs.push('Policy Advisor');
        return recs;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-6">
            {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}

            <div className="w-full max-w-4xl">
                {/* Progress Indicator */}
                <div className="flex items-center justify-center gap-2 mb-12">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={`h-2 rounded-full transition-all ${i === step
                                ? 'w-12 bg-gradient-to-r from-purple-500 to-pink-500'
                                : i < step
                                    ? 'w-8 bg-purple-500/50'
                                    : 'w-8 bg-purple-500/20'
                                }`}
                        />
                    ))}
                </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {/* Step 0: Welcome */}
                    {step === 0 && (
                        <motion.div
                            key="step0"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring' }}
                                className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-purple-500/50"
                            >
                                <Sparkles className="w-16 h-16 text-white" />
                            </motion.div>

                            <h1 className="text-5xl font-bold text-white mb-4">
                                Welcome to EdIntel! 👋
                            </h1>
                            <p className="text-xl text-purple-300 mb-8 max-w-2xl mx-auto">
                                Let's personalize your experience so you can start saving time and focusing on what matters most.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-purple-300 mb-8">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                    <span>Takes 2 minutes</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                    <span>Personalized setup</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                    <span>Skip anytime</span>
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleNext}
                                className="px-10 py-5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xl shadow-2xl shadow-purple-500/50 flex items-center gap-3 mx-auto"
                            >
                                Get Started
                                <ArrowRight className="w-6 h-6" />
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Step 1: Role Selection */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                        >
                            <h2 className="text-4xl font-bold text-white mb-4 text-center">
                                What's your role?
                            </h2>
                            <p className="text-xl text-purple-300 mb-8 text-center">
                                This helps us recommend the right tools for you
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                                {roles.map((role) => (
                                    <motion.button
                                        key={role.id}
                                        whileHover={{ scale: 1.02, y: -4 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedRole(role.id)}
                                        className={`p-6 rounded-2xl text-left transition-all ${selectedRole === role.id
                                            ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50 shadow-lg shadow-purple-500/20'
                                            : 'bg-black/40 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40'
                                            }`}
                                    >
                                        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${role.color} mb-4`}>
                                            <role.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">{role.title}</h3>
                                        <p className="text-purple-300">{role.description}</p>
                                        {selectedRole === role.id && (
                                            <div className="mt-4 flex items-center gap-2 text-green-400">
                                                <CheckCircle className="w-5 h-5" />
                                                <span className="font-medium">Selected</span>
                                            </div>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Interests */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                        >
                            <h2 className="text-4xl font-bold text-white mb-4 text-center">
                                What are you interested in?
                            </h2>
                            <p className="text-xl text-purple-300 mb-8 text-center">
                                Select all that apply - we'll personalize your dashboard
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                {interests.map((interest) => (
                                    <motion.button
                                        key={interest.id}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => toggleInterest(interest.id)}
                                        className={`p-4 rounded-xl text-left transition-all ${selectedInterests.includes(interest.id)
                                            ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50'
                                            : 'bg-black/40 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40'
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className={`p-2 rounded-lg ${selectedInterests.includes(interest.id)
                                                ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                                                : 'bg-purple-500/20'
                                                }`}>
                                                <interest.icon className={`w-5 h-5 ${selectedInterests.includes(interest.id) ? 'text-white' : 'text-purple-400'
                                                    }`} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-white font-semibold mb-1">{interest.label}</h3>
                                                <p className="text-purple-300 text-sm">{interest.description}</p>
                                            </div>
                                            {selectedInterests.includes(interest.id) && (
                                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                            )}
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            <div className="text-center text-purple-300">
                                {selectedInterests.length} selected
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Complete */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring' }}
                                className="w-32 h-32 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-500/50"
                            >
                                <CheckCircle className="w-16 h-16 text-white" />
                            </motion.div>

                            <h1 className="text-5xl font-bold text-white mb-4">
                                You're All Set! 🎉
                            </h1>
                            <p className="text-xl text-purple-300 mb-8">
                                Your personalized dashboard is ready
                            </p>

                            <div className="max-w-2xl mx-auto mb-8 p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-purple-500/20">
                                <h3 className="text-white font-bold mb-4">Recommended Tools for You:</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {getRecommendations().map((rec, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + index * 0.1 }}
                                            className="flex items-center gap-2 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20"
                                        >
                                            <Sparkles className="w-4 h-4 text-purple-400" />
                                            <span className="text-purple-200 text-sm">{rec}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    if (onComplete) onComplete();
                                    else window.location.href = '/dashboard';
                                }}
                                className="px-10 py-5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-xl shadow-2xl shadow-purple-500/50 flex items-center gap-3 mx-auto"
                            >
                                Go to Dashboard
                                <ArrowRight className="w-6 h-6" />
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation */}
                {step > 0 && step < 3 && (
                    <div className="flex items-center justify-between mt-12">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleBack}
                            className="px-6 py-3 rounded-xl bg-black/40 backdrop-blur-xl border border-purple-500/20 text-purple-300 font-semibold flex items-center gap-2"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back
                        </motion.button>

                        <button
                            onClick={() => window.location.href = '/dashboard'}
                            className="text-purple-400 hover:text-purple-300 text-sm"
                        >
                            Skip for now
                        </button>

                        <motion.button
                            whileHover={{ scale: canProceed() ? 1.05 : 1 }}
                            whileTap={{ scale: canProceed() ? 0.95 : 1 }}
                            onClick={handleNext}
                            disabled={!canProceed()}
                            className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all ${canProceed()
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50'
                                : 'bg-black/40 text-purple-500/50 cursor-not-allowed'
                                }`}
                        >
                            Next
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                )}
            </div>
        </div>
    );
}
