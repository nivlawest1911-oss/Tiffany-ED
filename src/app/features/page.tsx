'use client';

import { motion } from 'framer-motion';
import { Sparkles, Zap, TrendingUp, Shield, Clock, Star, ArrowRight, Palette } from 'lucide-react';
import Link from 'next/link';

export default function FeaturesLanding() {
    const features = [
        {
            icon: Sparkles,
            title: 'AI-Powered Generation',
            description: 'Advanced AI creates professional, standards-aligned content in seconds',
            color: 'from-purple-500 to-pink-500',
            glow: 'shadow-purple-500/50'
        },
        {
            icon: Zap,
            title: 'Lightning Fast',
            description: '90% faster with intelligent caching. Instant responses for common prompts',
            color: 'from-blue-500 to-cyan-500',
            glow: 'shadow-blue-500/50'
        },
        {
            icon: Shield,
            title: 'IDEA Compliant',
            description: 'Generate legally compliant IEPs, 504 plans, and educational documents',
            color: 'from-green-500 to-emerald-500',
            glow: 'shadow-green-500/50'
        },
        {
            icon: Star,
            title: 'Premium Quality',
            description: 'Production-ready content with proper formatting and citations',
            color: 'from-orange-500 to-red-500',
            glow: 'shadow-orange-500/50'
        },
    ];

    const stats = [
        { value: '10+', label: 'AI Generators', icon: Sparkles },
        { value: '90%', label: 'Faster', icon: Zap },
        { value: '50%', label: 'Cost Savings', icon: TrendingUp },
        { value: '< 1s', label: 'Response Time', icon: Clock },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="relative z-10">
                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <motion.div
                            className="inline-flex p-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50 mb-8"
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Sparkles className="w-12 h-12 text-white" />
                        </motion.div>

                        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
                            EdIntel <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Sovereign</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-purple-200 mb-8 max-w-3xl mx-auto">
                            Transform education with AI-powered tools. Generate IEPs, lesson plans, and more in seconds.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/showcase">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-lg shadow-purple-500/50 text-white font-semibold text-lg flex items-center gap-2"
                                >
                                    Try Generators
                                    <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </Link>

                            <Link href="/enhanced-test">
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white font-semibold text-lg backdrop-blur-sm"
                                >
                                    View Demo
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 text-center"
                            >
                                <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-sm text-purple-300">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Premium Features
                        </h2>
                        <p className="text-xl text-purple-200 max-w-2xl mx-auto">
                            Everything you need to transform your educational workflow
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 group hover:border-purple-500/40 transition-all"
                            >
                                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg ${feature.glow} mb-6 group-hover:scale-110 transition-transform`}>
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-purple-200 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Color Themes Showcase */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="text-center mb-16"
                    >
                        <Palette className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            4 Premium Themes
                        </h2>
                        <p className="text-xl text-purple-200 max-w-2xl mx-auto mb-8">
                            Choose the perfect color scheme for each generator
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: 'Purple', gradient: 'from-purple-500 to-pink-500', glow: 'shadow-purple-500/50' },
                            { name: 'Blue', gradient: 'from-blue-500 to-cyan-500', glow: 'shadow-blue-500/50' },
                            { name: 'Green', gradient: 'from-green-500 to-emerald-500', glow: 'shadow-green-500/50' },
                            { name: 'Orange', gradient: 'from-orange-500 to-red-500', glow: 'shadow-orange-500/50' },
                        ].map((theme, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.4 + index * 0.1 }}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className={`aspect-square rounded-2xl bg-gradient-to-br ${theme.gradient} shadow-lg ${theme.glow} flex items-center justify-center cursor-pointer`}
                            >
                                <span className="text-white font-bold text-xl">{theme.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.8 }}
                        className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 rounded-3xl p-12 text-center backdrop-blur-xl"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Transform Education?
                        </h2>
                        <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
                            Join thousands of educators using AI to save time and improve outcomes
                        </p>
                        <Link href="/showcase">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-2xl shadow-purple-500/50 text-white font-bold text-xl flex items-center gap-3 mx-auto"
                            >
                                Get Started Free
                                <ArrowRight className="w-6 h-6" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
