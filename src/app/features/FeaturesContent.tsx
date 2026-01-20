'use client';

import { motion } from 'framer-motion';
import { Sparkles, Zap, TrendingUp, Shield as LucideShield, Clock, Star, ArrowRight, Palette } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';

const FeatureItem = memo(({ feature, index }: { feature: any, index: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ scale: 1.02, y: -5 }}
        className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 group hover:border-purple-500/40 transition-all"
    >
        <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg ${feature.glow} mb-6 group-hover:scale-110 transition-transform`}>
            <feature.icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
        <p className="text-purple-200 leading-relaxed">{feature.description}</p>
    </motion.div>
));

FeatureItem.displayName = 'FeatureItem';

const StatsItem = memo(({ stat, index }: { stat: any, index: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 + index * 0.1 }}
        whileHover={{ scale: 1.05, y: -5 }}
        className="bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 text-center"
    >
        <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
        <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
        <div className="text-sm text-purple-300">{stat.label}</div>
    </motion.div>
));

StatsItem.displayName = 'StatsItem';

export default function FeaturesContent() {
    const features = [
        {
            icon: Sparkles,
            title: 'Vertex AI Supreme',
            description: 'Advanced Google Vertex AI integration provides production-ready, standards-aligned output in seconds.',
            color: 'from-noble-gold to-amber-600',
            glow: 'shadow-noble-gold/30'
        },
        {
            icon: Zap,
            title: 'Strategic Agility',
            description: '90% faster workflow with intelligent local caching and real-time leadership grids.',
            color: 'from-kente-red to-rose-700',
            glow: 'shadow-kente-red/30'
        },
        {
            icon: LucideShield,
            title: 'Legal Defense Protocol',
            description: 'Generate legally defensible IEPs and district policies with built-in compliance auditing.',
            color: 'from-kente-green to-emerald-700',
            glow: 'shadow-kente-green/30'
        },
        {
            icon: Star,
            title: 'Kente-Inspired Design',
            description: 'A premium, heritage-focused interface designed for the modern educational executive.',
            color: 'from-royal-purple to-indigo-700',
            glow: 'shadow-royal-purple/30'
        },
    ];

    const stats = [
        { value: '70+', label: 'Strategic Tools', icon: Sparkles },
        { value: '99.8%', label: 'Uptime', icon: Zap },
        { value: '14K+', label: 'Hours Saved', icon: TrendingUp },
        { value: '100Ms', label: 'Latency', icon: Clock },
    ];

    return (
        <div className="relative z-10 w-full pt-12">
            {/* Kente Pattern Header */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-kente-yellow via-kente-green to-kente-red z-50" />

            {/* Hero Buttons (Client Animated) */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
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

            {/* Stats */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatsItem key={index} stat={stat} index={index} />
                    ))}
                </div>
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
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
                        <FeatureItem key={index} feature={feature} index={index} />
                    ))}
                </div>
            </div>

            {/* Color Themes Showcase */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
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
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
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
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
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
    );
}
