'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import HolographicBriefing from './HolographicBriefing';
import {
    Clock,
    FileText,
    Users,
    TrendingUp,
    Sparkles,
    Brain,
    MessageSquare,
    Award,
    Zap,
    ArrowRight,
    BarChart3,
    Calendar
} from 'lucide-react';
import Link from 'next/link';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import SovereignDelegate from './SovereignDelegate';

export default function InteractiveDashboard() {
    const [showBriefing, setShowBriefing] = useState(false);
    // Mock data for charts
    const usageData = [
        { day: 'Mon', generations: 12 },
        { day: 'Tue', generations: 19 },
        { day: 'Wed', generations: 15 },
        { day: 'Thu', generations: 25 },
        { day: 'Fri', generations: 22 },
        { day: 'Sat', generations: 8 },
        { day: 'Sun', generations: 10 },
    ];

    const stats = [
        {
            icon: Clock,
            label: 'Hours Saved',
            value: '127',
            trend: '+12%',
            trendUp: true,
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: FileText,
            label: 'Documents Generated',
            value: '342',
            trend: '+8%',
            trendUp: true,
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: Users,
            label: 'Students Helped',
            value: '1,247',
            trend: '+15%',
            trendUp: true,
            color: 'from-green-500 to-emerald-500',
        },
        {
            icon: Award,
            label: 'Compliance Score',
            value: '98%',
            trend: '+2%',
            trendUp: true,
            color: 'from-orange-500 to-red-500',
        },
    ];

    const quickActions = [
        {
            icon: Sparkles,
            title: 'IEP Architect',
            description: 'Generate IDEA-compliant IEPs',
            link: '/enhanced-test',
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: Brain,
            title: 'Lesson Planner',
            description: 'Standards-aligned lessons',
            link: '/generators/lesson-planner',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            icon: MessageSquare,
            title: 'Email Composer',
            description: 'Professional communications',
            link: '/generators/email-composer',
            color: 'from-green-500 to-emerald-500',
        },
        {
            icon: Award,
            title: 'Behavior Coach',
            description: 'PBIS intervention strategies',
            link: '/generators/behavior-coach',
            color: 'from-orange-500 to-red-500',
        },
        {
            icon: Zap,
            title: 'Grant Writer',
            description: 'Secure funding faster',
            link: '/generators/grant-writer',
            color: 'from-pink-500 to-purple-500',
        },
        {
            icon: BarChart3,
            title: 'Reports',
            description: 'View analytics & insights',
            link: '/analytics',
            color: 'from-cyan-500 to-blue-500',
        },
    ];

    const recentActivity = [
        {
            icon: Sparkles,
            action: 'Generated IEP',
            details: 'Annual goals for 5th grade student',
            time: '2 minutes ago',
            color: 'purple',
        },
        {
            icon: Brain,
            action: 'Created Lesson Plan',
            details: 'Math - Fractions for 3rd grade',
            time: '15 minutes ago',
            color: 'blue',
        },
        {
            icon: MessageSquare,
            action: 'Drafted Email',
            details: 'Parent communication - progress update',
            time: '1 hour ago',
            color: 'green',
        },
        {
            icon: Award,
            action: 'Behavior Plan',
            details: 'Positive reinforcement strategy',
            time: '2 hours ago',
            color: 'orange',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
                >
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">
                            Welcome back, Dr. West! 👋
                        </h1>
                        <p className="text-purple-300">
                            Here's what's happening with your EdIntel workspace
                        </p>
                    </div>

                    <button
                        onClick={() => setShowBriefing(true)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all text-xs uppercase tracking-wider"
                    >
                        <Sparkles size={16} />
                        <span>Daily Intelligence Briefing</span>
                    </button>
                </motion.div>

                <HolographicBriefing
                    isOpen={showBriefing}
                    onClose={() => setShowBriefing(false)}
                    title="Executive Daily Briefing"
                    description="Good Morning, Principal. Your system usage is trending upwards at 12%. You have saved approximately 127 administrative hours this month. Compliance adherence is at 98%. Recommendation: Review the new 'Grant Writer' protocol to capitalize on available funding streams."
                    role="System Chief of Staff"
                    avatarImage="/images/avatars/executive_leader.png"
                    thumbnail="/images/features/data-analysis-demo.mp4"
                    stats={{ time: "127h", saved: "+12%", accuracy: "98%" }}
                    theme="sovereign"
                />

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -4 }}
                            className="relative group block"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                            <div className="relative p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-purple-500/20 group-hover:border-purple-500/40 transition-all">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                                        <stat.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className={`flex items-center gap-1 text-sm font-medium ${stat.trendUp ? 'text-green-400' : 'text-red-400'
                                        }`}>
                                        <TrendingUp className="w-4 h-4" />
                                        {stat.trend}
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-sm text-purple-300">{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Sovereign Impact Matrix - NEW Strategic Outcomes Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {/* Burnout Eliminator */}
                    <div className="relative p-6 rounded-2xl bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-500/20 group hover:border-red-500/40 transition-all overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Sparkles size={100} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            Burnout Elimination
                        </h3>
                        <p className="text-sm text-zinc-400 mb-4">Reduce administrative load to zero.</p>
                        <div className="flex items-end gap-2">
                            <span className="text-4xl font-black text-white">84%</span>
                            <span className="text-sm text-green-400 mb-2">reduction this week</span>
                        </div>
                        <div className="mt-4 h-1 w-full bg-red-900/30 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 w-[84%]" />
                        </div>
                    </div>

                    {/* Intelligence Maximizer */}
                    <div className="relative p-6 rounded-2xl bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 group hover:border-indigo-500/40 transition-all overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Brain size={100} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                            Cognitive Capacity
                        </h3>
                        <p className="text-sm text-zinc-400 mb-4">Focus redirected to leadership.</p>
                        <div className="flex items-end gap-2">
                            <span className="text-4xl font-black text-white">42h</span>
                            <span className="text-sm text-indigo-400 mb-2">reclaimed for strategy</span>
                        </div>
                        <div className="mt-4 h-1 w-full bg-indigo-900/30 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[78%]" />
                        </div>
                    </div>

                    {/* Engagement Optimizer */}
                    <div className="relative p-6 rounded-2xl bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border border-emerald-500/20 group hover:border-emerald-500/40 transition-all overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Users size={100} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            Student Engagement
                        </h3>
                        <p className="text-sm text-zinc-400 mb-4">Optimal intervention deployment.</p>
                        <div className="flex items-end gap-2">
                            <span className="text-4xl font-black text-white">1.2k</span>
                            <span className="text-sm text-emerald-400 mb-2">students impacted</span>
                        </div>
                        <div className="mt-4 h-1 w-full bg-emerald-900/30 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 w-[92%]" />
                        </div>
                    </div>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Quick Actions - 2 columns */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-purple-500/20"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
                                <Link href="/showcase" className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1">
                                    View all
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {quickActions.map((action, index) => (
                                    <Link key={index} href={action.link}>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.5 + index * 0.1 }}
                                            whileHover={{ scale: 1.05, y: -4 }}
                                            className="group p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer"
                                        >
                                            <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${action.color} mb-3 group-hover:scale-110 transition-transform`}>
                                                <action.icon className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="text-white font-semibold mb-1">{action.title}</h3>
                                            <p className="text-purple-300 text-sm">{action.description}</p>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Recent Activity - 1 column */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-purple-500/20 h-full"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
                                <Calendar className="w-5 h-5 text-purple-400" />
                            </div>

                            <div className="space-y-4">
                                {recentActivity.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.7 + index * 0.1 }}
                                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-purple-500/10 transition-colors cursor-pointer"
                                    >
                                        <div className={`p-2 rounded-lg bg-${item.color}-500/20 flex-shrink-0`}>
                                            <item.icon className={`w-4 h-4 text-${item.color}-400`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-white font-medium text-sm">{item.action}</div>
                                            <div className="text-purple-300 text-xs truncate">{item.details}</div>
                                            <div className="text-purple-400 text-xs mt-1">{item.time}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <Link href="/activity">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full mt-4 py-2 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-sm font-medium transition-colors"
                                >
                                    View all activity
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Usage Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-purple-500/20"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">Usage This Week</h2>
                            <p className="text-purple-300 text-sm">AI generations per day</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-sm">
                                Last 7 days
                            </div>
                        </div>
                    </div>

                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={usageData}>
                                <defs>
                                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="day"
                                    stroke="#9ca3af"
                                    style={{ fontSize: '12px' }}
                                />
                                <YAxis
                                    stroke="#9ca3af"
                                    style={{ fontSize: '12px' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e293b',
                                        border: '1px solid rgba(168, 85, 247, 0.2)',
                                        borderRadius: '8px',
                                        color: '#fff',
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="generations"
                                    stroke="#a855f7"
                                    strokeWidth={3}
                                    fill="url(#colorGradient)"
                                    dot={{ fill: '#a855f7', r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <SovereignDelegate
                    name="System Chief of Staff"
                    role="Executive Assistant"
                    avatarImage="/images/avatars/executive_leader.png"
                    color="from-emerald-500 to-teal-600"
                    greetingText="Your dashboard is ready, Principal. Usage is up 12% this week."
                />
            </div>
        </div>
    );
}
