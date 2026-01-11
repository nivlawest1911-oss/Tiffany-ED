'use client';

import { motion } from 'framer-motion';
import {
    Clock, FileText, Users, Award, TrendingUp, Download, Calendar,
    Sparkles, Brain, MessageSquare, Target, Zap, BarChart3
} from 'lucide-react';
import { Line, Bar, ResponsiveContainer, LineChart, BarChart, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function AnalyticsDashboard() {
    const usageData = [
        { date: '1/1', generations: 12, timeSaved: 3.2 },
        { date: '1/2', generations: 19, timeSaved: 5.1 },
        { date: '1/3', generations: 15, timeSaved: 4.0 },
        { date: '1/4', generations: 25, timeSaved: 6.7 },
        { date: '1/5', generations: 22, timeSaved: 5.9 },
        { date: '1/6', generations: 18, timeSaved: 4.8 },
        { date: '1/7', generations: 28, timeSaved: 7.5 },
        { date: '1/8', generations: 24, timeSaved: 6.4 },
        { date: '1/9', generations: 20, timeSaved: 5.4 },
        { date: '1/10', generations: 30, timeSaved: 8.0 },
    ];

    const toolBreakdown = [
        { tool: 'IEP Architect', count: 45, icon: Sparkles, color: '#a855f7' },
        { tool: 'Lesson Planner', count: 38, icon: Brain, color: '#3b82f6' },
        { tool: 'Email Composer', count: 32, icon: MessageSquare, color: '#10b981' },
        { tool: 'Behavior Coach', count: 28, icon: Target, color: '#f59e0b' },
        { tool: 'Grant Writer', count: 24, icon: Zap, color: '#ec4899' },
        { tool: 'Rubric Maker', count: 20, icon: FileText, color: '#8b5cf6' },
        { tool: 'Assessment Builder', count: 18, icon: BarChart3, color: '#06b6d4' },
        { tool: 'Field Trip Planner', count: 15, icon: Calendar, color: '#14b8a6' },
        { tool: 'Parent Communicator', count: 12, icon: Users, color: '#f97316' },
        { tool: 'Study Guide Maker', count: 10, icon: FileText, color: '#6366f1' },
    ];

    const recentActivity = [
        { tool: 'IEP Architect', date: '2 min ago', timeSaved: '45 min', status: 'completed' },
        { tool: 'Lesson Planner', date: '15 min ago', timeSaved: '30 min', status: 'completed' },
        { tool: 'Email Composer', date: '1 hour ago', timeSaved: '15 min', status: 'completed' },
        { tool: 'Behavior Coach', date: '2 hours ago', timeSaved: '25 min', status: 'completed' },
        { tool: 'Grant Writer', date: '3 hours ago', timeSaved: '60 min', status: 'completed' },
    ];

    const insights = [
        {
            icon: TrendingUp,
            title: 'You save 12 hours/week on average',
            description: 'That\'s 48 hours per month - over a full work week!',
            color: 'from-green-500 to-emerald-500',
        },
        {
            icon: Sparkles,
            title: 'IEP Architect is your most-used tool',
            description: '45 generations this month. You\'re a power user!',
            color: 'from-purple-500 to-pink-500',
        },
        {
            icon: Award,
            title: 'You\'re in the top 10% of users',
            description: 'Your efficiency is inspiring other educators.',
            color: 'from-orange-500 to-red-500',
        },
    ];

    const overviewCards = [
        {
            icon: Clock,
            label: 'Total Time Saved',
            value: '127 hours',
            trend: '+12%',
            trendUp: true,
            color: 'from-purple-500 to-pink-500',
            sparkline: [12, 19, 15, 25, 22, 18, 28, 24, 20, 30],
        },
        {
            icon: FileText,
            label: 'Documents Generated',
            value: '342',
            trend: '+8%',
            trendUp: true,
            color: 'from-blue-500 to-cyan-500',
            sparkline: [20, 25, 22, 30, 28, 25, 32, 29, 27, 35],
        },
        {
            icon: Users,
            label: 'Students Helped',
            value: '1,247',
            trend: '+15%',
            trendUp: true,
            color: 'from-green-500 to-emerald-500',
            sparkline: [100, 120, 115, 130, 125, 135, 140, 138, 145, 150],
        },
        {
            icon: Award,
            label: 'Compliance Score',
            value: '98%',
            trend: '+2%',
            trendUp: true,
            color: 'from-orange-500 to-red-500',
            sparkline: [90, 92, 93, 94, 95, 96, 96, 97, 97, 98],
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between mb-8"
                >
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
                        <p className="text-purple-300">Track your impact and productivity</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/50 flex items-center gap-2"
                    >
                        <Download className="w-5 h-5" />
                        Export Report
                    </motion.button>
                </motion.div>

                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {overviewCards.map((card, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -4 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                            <div className="relative p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-purple-500/20 group-hover:border-purple-500/40 transition-all">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color}`}>
                                        <card.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className={`flex items-center gap-1 text-sm font-medium ${card.trendUp ? 'text-green-400' : 'text-red-400'
                                        }`}>
                                        <TrendingUp className="w-4 h-4" />
                                        {card.trend}
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-white mb-1">{card.value}</div>
                                <div className="text-sm text-purple-300 mb-4">{card.label}</div>

                                {/* Mini Sparkline */}
                                <div className="h-8">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={card.sparkline.map((v, i) => ({ value: v }))}>
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#a855f7"
                                                strokeWidth={2}
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Main Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Usage Chart */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-purple-500/20"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-1">Usage Over Time</h2>
                                <p className="text-purple-300 text-sm">Last 10 days</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-300 text-sm">
                                    Generations
                                </button>
                                <button className="px-3 py-1 rounded-lg bg-black/40 text-purple-400 text-sm hover:bg-purple-500/20">
                                    Time Saved
                                </button>
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
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis dataKey="date" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                                    <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
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

                    {/* Tool Breakdown */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-purple-500/20"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Top Tools</h2>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={toolBreakdown.slice(0, 5)} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis type="number" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                                    <YAxis dataKey="tool" type="category" stroke="#9ca3af" style={{ fontSize: '12px' }} width={120} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1e293b',
                                            border: '1px solid rgba(168, 85, 247, 0.2)',
                                            borderRadius: '8px',
                                            color: '#fff',
                                        }}
                                    />
                                    <Bar dataKey="count" fill="#a855f7" radius={[0, 8, 8, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>

                {/* Insights & Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Insights */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-purple-500/20"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">AI Insights</h2>
                        <div className="space-y-4">
                            {insights.map((insight, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 + index * 0.1 }}
                                    className="flex items-start gap-4 p-4 rounded-xl bg-purple-500/10 border border-purple-500/20"
                                >
                                    <div className={`p-3 rounded-lg bg-gradient-to-br ${insight.color} flex-shrink-0`}>
                                        <insight.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold mb-1">{insight.title}</h3>
                                        <p className="text-purple-300 text-sm">{insight.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Recent Activity */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-purple-500/20"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
                        <div className="space-y-3">
                            {recentActivity.map((activity, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-purple-500/10 transition-colors"
                                >
                                    <div className="flex-1">
                                        <div className="text-white font-medium text-sm">{activity.tool}</div>
                                        <div className="text-purple-400 text-xs">{activity.date}</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-green-400 font-semibold text-sm">{activity.timeSaved}</div>
                                        <div className="text-purple-400 text-xs">saved</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
