'use client';

import { motion } from 'framer-motion';
import { Brain, Sparkles, GraduationCap, BookOpen, Lightbulb, TrendingUp } from 'lucide-react';

export default function AnimatedEducatorHero() {
    return (
        <div className="relative w-full h-[600px] bg-gradient-to-br from-indigo-950 via-purple-900 to-black overflow-hidden rounded-3xl">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            </div>

            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-purple-400 rounded-full"
                    initial={{
                        x: Math.random() * 100 + '%',
                        y: Math.random() * 100 + '%',
                        opacity: 0
                    }}
                    animate={{
                        y: [null, Math.random() * -200 - 100],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                />
            ))}

            {/* Main Content Container */}
            <div className="relative h-full flex items-center justify-center px-8">
                {/* Left Side - Educator Image Area */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-1/2 h-full flex items-center justify-center"
                >
                    {/* Educator Silhouette with Glow */}
                    <div className="relative w-80 h-96">
                        {/* Pulsing Glow Behind */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full blur-3xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.6, 0.3]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />

                        {/* Professional Figure */}
                        <div className="relative z-10 w-full h-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-3xl border border-purple-500/30 backdrop-blur-sm flex items-center justify-center">
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Brain className="w-32 h-32 text-purple-300" />
                            </motion.div>
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 to-yellow-500 px-4 py-2 rounded-full text-black font-bold text-sm shadow-lg"
                            animate={{ rotate: [0, 5, -5, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Sparkles className="w-4 h-4 inline mr-1" />
                            AI-Powered
                        </motion.div>
                    </div>
                </motion.div>

                {/* Right Side - Floating Holographic Elements */}
                <div className="relative w-1/2 h-full flex items-center justify-center">
                    {/* Holographic Data Panels */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative w-full h-full flex flex-col items-center justify-center gap-6"
                    >
                        {/* Panel 1 - Analytics */}
                        <motion.div
                            className="w-64 bg-purple-900/30 backdrop-blur-md border border-purple-500/30 rounded-2xl p-4"
                            animate={{ y: [0, -10, 0], rotateY: [0, 5, 0] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="w-5 h-5 text-green-400" />
                                <span className="text-sm font-bold text-white">Student Progress</span>
                            </div>
                            <div className="space-y-2">
                                {[85, 92, 78].map((val, i) => (
                                    <div key={i} className="relative h-2 bg-black/30 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${val}%` }}
                                            transition={{ duration: 1.5, delay: i * 0.2 + 0.5 }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Panel 2 - AI Insights */}
                        <motion.div
                            className="w-64 bg-indigo-900/30 backdrop-blur-md border border-indigo-500/30 rounded-2xl p-4"
                            animate={{ y: [0, 10, 0], rotateY: [0, -5, 0] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Brain className="w-5 h-5 text-purple-400" />
                                <span className="text-sm font-bold text-white">AI Recommendations</span>
                            </div>
                            <div className="space-y-1 text-xs text-purple-200">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                >
                                    • Focus on reading comprehension
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.2 }}
                                >
                                    • Increase collaborative activities
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.4 }}
                                >
                                    • Review math fundamentals
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Panel 3 - Learning Tools */}
                        <motion.div
                            className="w-64 bg-purple-900/30 backdrop-blur-md border border-purple-500/30 rounded-2xl p-4"
                            animate={{ y: [0, -8, 0], rotateY: [0, 3, 0] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <GraduationCap className="w-5 h-5 text-amber-400" />
                                <span className="text-sm font-bold text-white">Active Tools</span>
                            </div>
                            <div className="flex gap-2">
                                {[BookOpen, Lightbulb, Brain].map((Icon, i) => (
                                    <motion.div
                                        key={i}
                                        className="flex-1 bg-black/30 rounded-lg p-2 flex items-center justify-center"
                                        whileHover={{ scale: 1.1 }}
                                        animate={{ y: [0, -5, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                    >
                                        <Icon className="w-6 h-6 text-purple-300" />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Floating Icons */}
            <motion.div
                className="absolute top-20 left-20"
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 10, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
            >
                <div className="w-16 h-16 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-2xl flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-purple-300" />
                </div>
            </motion.div>

            <motion.div
                className="absolute bottom-20 right-20"
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, -10, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
            >
                <div className="w-16 h-16 bg-indigo-500/20 backdrop-blur-sm border border-indigo-400/30 rounded-2xl flex items-center justify-center">
                    <Lightbulb className="w-8 h-8 text-amber-300" />
                </div>
            </motion.div>

            {/* Bottom Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </div>
    );
}
