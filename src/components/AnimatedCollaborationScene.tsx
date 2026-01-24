'use client';

import { motion } from 'framer-motion';
import { Users, TrendingUp, BarChart3, Award, Sparkles } from 'lucide-react';

export default function AnimatedCollaborationScene() {
    const teamMembers = [
        { color: 'from-purple-500 to-indigo-500', delay: 0 },
        { color: 'from-pink-500 to-purple-500', delay: 0.2 },
        { color: 'from-amber-500 to-orange-500', delay: 0.4 },
        { color: 'from-indigo-500 to-blue-500', delay: 0.6 },
    ];

    const analyticsData = [
        { label: 'Student Engagement', value: 94, color: 'bg-green-500' },
        { label: 'Learning Outcomes', value: 88, color: 'bg-blue-500' },
        { label: 'Collaboration Score', value: 92, color: 'bg-purple-500' },
    ];

    return (
        <div className="relative w-full h-[600px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden rounded-3xl">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf6_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf6_1px,transparent_1px)] bg-[size:3rem_3rem]" />
            </div>

            {/* Main Content */}
            <div className="relative h-full flex items-center justify-between px-12">
                {/* Left Side - Team Collaboration */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-1/2"
                >
                    {/* Conference Table Representation */}
                    <div className="relative">
                        {/* Central Holographic Display */}
                        <motion.div
                            className="relative w-80 h-64 bg-gradient-to-br from-purple-900/40 to-indigo-900/40 backdrop-blur-md border border-purple-500/30 rounded-3xl p-6"
                            animate={{
                                boxShadow: [
                                    '0 0 20px rgba(139, 92, 246, 0.3)',
                                    '0 0 40px rgba(139, 92, 246, 0.6)',
                                    '0 0 20px rgba(139, 92, 246, 0.3)',
                                ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <Users className="w-6 h-6 text-purple-400" />
                                <span className="text-white font-bold">Team Analytics</span>
                            </div>

                            {/* Live Data Visualization */}
                            <div className="space-y-3">
                                {analyticsData.map((item, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between text-xs text-purple-200 mb-1">
                                            <span>{item.label}</span>
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: i * 0.3 + 0.5 }}
                                                className="font-bold"
                                            >
                                                {item.value}%
                                            </motion.span>
                                        </div>
                                        <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                                            <motion.div
                                                className={`h-full ${item.color}`}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.value}%` }}
                                                transition={{ duration: 1.5, delay: i * 0.3 + 0.5 }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Floating Sparkles */}
                            <motion.div
                                className="absolute -top-2 -right-2"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            >
                                <Sparkles className="w-6 h-6 text-amber-400" />
                            </motion.div>
                        </motion.div>

                        {/* Team Member Avatars */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-2">
                            {teamMembers.map((member, i) => (
                                <motion.div
                                    key={i}
                                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${member.color} border-2 border-white/20 shadow-lg`}
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: member.delay, duration: 0.5 }}
                                    whileHover={{ scale: 1.1, y: -5 }}
                                >
                                    <motion.div
                                        className="w-full h-full rounded-full flex items-center justify-center"
                                        animate={{ y: [0, -3, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                                    >
                                        <Users className="w-8 h-8 text-white" />
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Connection Lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            {teamMembers.map((_, i) => (
                                <motion.line
                                    key={i}
                                    x1="50%"
                                    y1="40%"
                                    x2={`${30 + i * 15}%`}
                                    y2="10%"
                                    stroke="url(#connectionGradient)"
                                    strokeWidth="2"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 0.5 }}
                                    transition={{ duration: 1, delay: i * 0.2 + 0.5 }}
                                />
                            ))}
                            <defs>
                                <linearGradient id="connectionGradient">
                                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0" />
                                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="1" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </motion.div>

                {/* Right Side - Floating Metrics */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative w-1/2 flex flex-col gap-6"
                >
                    {/* Metric Card 1 */}
                    <motion.div
                        className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 backdrop-blur-md border border-green-500/30 rounded-2xl p-6"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-6 h-6 text-green-400" />
                                <span className="text-white font-bold">Performance</span>
                            </div>
                            <motion.div
                                className="text-3xl font-black text-green-400"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1, type: "spring" }}
                            >
                                +24%
                            </motion.div>
                        </div>
                        <div className="text-sm text-green-200">
                            District-wide improvement this quarter
                        </div>
                    </motion.div>

                    {/* Metric Card 2 */}
                    <motion.div
                        className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-md border border-blue-500/30 rounded-2xl p-6"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <BarChart3 className="w-6 h-6 text-blue-400" />
                                <span className="text-white font-bold">AI Insights</span>
                            </div>
                            <motion.div
                                className="text-3xl font-black text-blue-400"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.2, type: "spring" }}
                            >
                                1.2K
                            </motion.div>
                        </div>
                        <div className="text-sm text-blue-200">
                            Personalized recommendations generated
                        </div>
                    </motion.div>

                    {/* Metric Card 3 */}
                    <motion.div
                        className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-md border border-purple-500/30 rounded-2xl p-6"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Award className="w-6 h-6 text-purple-400" />
                                <span className="text-white font-bold">Success Rate</span>
                            </div>
                            <motion.div
                                className="text-3xl font-black text-purple-400"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 1.4, type: "spring" }}
                            >
                                98%
                            </motion.div>
                        </div>
                        <div className="text-sm text-purple-200">
                            Educators achieving their goals
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Floating Particles */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-purple-400 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -100, -200],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: Math.random() * 3
                    }}
                />
            ))}

            {/* Bottom Info Bar */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-6 py-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-white font-medium">Live Collaboration</span>
                    </div>
                    <div className="w-px h-4 bg-white/20" />
                    <span className="text-purple-300 font-mono">5,000+ Active Educators</span>
                </div>
            </motion.div>
        </div>
    );
}
