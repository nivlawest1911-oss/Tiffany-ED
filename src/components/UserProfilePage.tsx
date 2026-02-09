'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Mail, Calendar, Edit, Save, X, Upload, CreditCard, Clock, FileText, Award, TrendingUp, Download,
    Sparkles
} from "lucide-react";

export default function UserProfilePage() {
    const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'settings' | 'billing'>('overview');
    const [isEditing, setIsEditing] = useState(false);
    const [profileData /*, setProfileData */] = useState({
        name: 'Dr. Alvin West II',
        email: 'alvin.west@edintel.ai',
        role: 'Administrator',
        school: 'Mobile County High School',
        district: 'Mobile County Public Schools',
        memberSince: 'December 2025',
    });

    const stats = [
        { label: 'Member Since', value: 'Dec 2025', icon: Calendar },
        { label: 'Total Generations', value: '342', icon: Sparkles },
        { label: 'Hours Saved', value: '127', icon: Clock },
        { label: 'Achievements', value: '12', icon: Award },
    ];

    const recentActivity = [
        { tool: 'IEP Architect', date: '2 min ago', action: 'Generated IEP' },
        { tool: 'Lesson Planner', date: '15 min ago', action: 'Created lesson plan' },
        { tool: 'Email Composer', date: '1 hour ago', action: 'Drafted email' },
        { tool: 'Behavior Coach', date: '2 hours ago', action: 'Created behavior plan' },
        { tool: 'Grant Writer', date: '3 hours ago', action: 'Generated grant proposal' },
    ];

    const favoriteTools = [
        { name: 'IEP Architect', uses: 45, icon: Sparkles },
        { name: 'Lesson Planner', uses: 38, icon: FileText },
        { name: 'Email Composer', uses: 32, icon: Mail },
        { name: 'Behavior Coach', uses: 28, icon: Award },
        { name: 'Grant Writer', uses: 24, icon: TrendingUp },
    ];

    const achievements = [
        { name: 'Early Adopter', description: 'Joined in the first month', icon: '🚀', unlocked: true },
        { name: 'Power User', description: '100+ generations', icon: '⚡', unlocked: true },
        { name: 'Time Saver', description: 'Saved 100+ hours', icon: '⏰', unlocked: true },
        { name: 'Compliance Champion', description: '98% compliance score', icon: '🏆', unlocked: true },
    ];

    return (
        <div className="min-h-screen bg-black p-6 font-inter selection:bg-noble-gold selection:text-black">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-8 rounded-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/5 relative overflow-hidden group"
                >
                    <div className="flex items-start gap-6">
                        {/* Avatar */}
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full bg-zinc-800 border-2 border-noble-gold/30 flex items-center justify-center text-noble-gold text-4xl font-black tracking-tighter shadow-2xl shadow-noble-gold/20">
                                AW
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="absolute bottom-0 right-0 p-2 rounded-full bg-noble-gold text-black shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Upload className="w-4 h-4" />
                            </motion.button>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-2">{profileData.name}</h1>
                                    <p className="text-noble-gold/80 font-bold text-xs uppercase tracking-[0.2em] mb-1">{profileData.role}</p>
                                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest">{profileData.school}</p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="px-4 py-2 rounded-xl bg-noble-gold/10 hover:bg-noble-gold/20 text-noble-gold font-black text-[10px] uppercase tracking-widest border border-noble-gold/20 transition-all"
                                >
                                    {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                                    {isEditing ? 'Cancel' : 'Edit Profile'}
                                </motion.button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {stats.map((stat, index) => (
                                    <div key={index} className="p-3 rounded-lg bg-zinc-900 border border-white/10 group-hover:border-noble-gold/20 transition-all">
                                        <div className="flex items-center gap-2 mb-1">
                                            <stat.icon className="w-4 h-4 text-noble-gold" />
                                            <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</span>
                                        </div>
                                        <div className="text-white font-bold text-lg">{stat.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {[
                        { id: 'overview', label: 'Overview' },
                        { id: 'activity', label: 'Activity' },
                        { id: 'settings', label: 'Settings' },
                        { id: 'billing', label: 'Billing' },
                    ].map((tab) => (
                        <motion.button
                            key={tab.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border shrink-0 ${activeTab === tab.id
                                ? 'bg-noble-gold text-black border-noble-gold shadow-lg shadow-noble-gold/20'
                                : 'bg-zinc-900/50 text-zinc-500 hover:bg-zinc-800 hover:text-noble-gold border-white/5'
                                }`}
                        >
                            {tab.label}
                        </motion.button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="space-y-6">
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {/* Favorite Tools */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/5 shadow-2xl shadow-noble-gold/5"
                                >
                                    <h2 className="text-2xl font-bold text-white mb-4">Favorite Tools</h2>
                                    <div className="space-y-3">
                                        {favoriteTools.map((tool, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5 hover:border-noble-gold/20 transition-all">
                                                <div className="flex items-center gap-3">
                                                    <tool.icon className="w-5 h-5 text-noble-gold" />
                                                    <span className="text-white font-medium">{tool.name}</span>
                                                </div>
                                                <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{tool.uses} uses</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Achievements */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/5 shadow-2xl shadow-noble-gold/5"
                                >
                                    <h2 className="text-2xl font-bold text-white mb-4">Achievements</h2>
                                    <div className="grid grid-cols-2 gap-3">
                                        {achievements.map((achievement, index) => (
                                            <div
                                                key={index}
                                                className={`p-4 rounded-xl text-center border transition-all ${achievement.unlocked
                                                    ? 'bg-noble-gold/5 border-noble-gold/20'
                                                    : 'bg-black/40 border-white/5 opacity-30 shadow-none'
                                                    }`}
                                            >
                                                <div className="text-3xl mb-2">{achievement.icon}</div>
                                                <div className="text-white font-semibold text-sm mb-1">{achievement.name}</div>
                                                <div className="text-zinc-500 text-[10px] font-medium leading-tight">{achievement.description}</div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Recent Activity */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/5 shadow-2xl shadow-noble-gold/5"
                            >
                                <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
                                <div className="space-y-3">
                                    {recentActivity.map((activity, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-noble-gold/5 transition-colors">
                                            <div>
                                                <div className="text-white font-medium group-hover:text-noble-gold transition-colors">{activity.action}</div>
                                                <div className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{activity.tool}</div>
                                            </div>
                                            <div className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{activity.date}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </>
                    )}

                    {/* Activity Tab */}
                    {activeTab === 'activity' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/5 shadow-2xl shadow-noble-gold/5"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">Activity History</h2>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 rounded-xl bg-noble-gold/10 text-noble-gold font-black text-[10px] uppercase tracking-widest flex items-center gap-2 border border-noble-gold/20"
                                >
                                    <Download className="w-4 h-4" />
                                    Export
                                </motion.button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/5">
                                            <th className="text-left py-3 px-4 text-zinc-500 text-[10px] font-black uppercase tracking-widest">Tool</th>
                                            <th className="text-left py-3 px-4 text-zinc-500 text-[10px] font-black uppercase tracking-widest">Action</th>
                                            <th className="text-left py-3 px-4 text-zinc-500 text-[10px] font-black uppercase tracking-widest">Date</th>
                                            <th className="text-left py-3 px-4 text-zinc-500 text-[10px] font-black uppercase tracking-widest">Time Saved</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-zinc-300">
                                        {recentActivity.map((activity, index) => (
                                            <tr key={index} className="border-b border-white/5 hover:bg-noble-gold/5 transition-colors group">
                                                <td className="py-3 px-4">{activity.tool}</td>
                                                <td className="py-3 px-4">{activity.action}</td>
                                                <td className="py-3 px-4">{activity.date}</td>
                                                <td className="py-3 px-4 text-noble-gold font-bold">45 min</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    )}

                    {/* Settings Tab */}
                    {activeTab === 'settings' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            {/* Personal Info */}
                            <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/5 shadow-2xl shadow-noble-gold/5">
                                <h2 className="text-2xl font-bold text-white mb-4">Personal Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 block">Full Name</label>
                                        <input
                                            type="text"
                                            value={profileData.name}
                                            className="w-full p-3 rounded-lg bg-black/40 border border-white/5 shadow-2xl shadow-noble-gold/5 text-white focus:border-noble-gold/50 outline-none"
                                            placeholder="Full Name"
                                            title="Full Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 block">Email</label>
                                        <input
                                            type="email"
                                            value={profileData.email}
                                            className="w-full p-3 rounded-lg bg-black/40 border-white/10 text-white focus:border-noble-gold/50 outline-none"
                                            placeholder="Email Address"
                                            title="Email Address"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 block">Role</label>
                                        <select title="Select Role" className="w-full p-3 rounded-lg bg-black border border-white/10 text-white focus:border-noble-gold/50 outline-none transition-all appearance-none">
                                            <option>Administrator</option>
                                            <option>Teacher</option>
                                            <option>Specialist</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-2 block">School</label>
                                        <input
                                            type="text"
                                            value={profileData.school}
                                            className="w-full p-3 rounded-lg bg-black border border-white/10 text-white focus:border-noble-gold/50 outline-none transition-all"
                                            placeholder="School Name"
                                            title="School Name"
                                        />
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-4 px-8 py-3 rounded-xl bg-noble-gold text-black font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-noble-gold/20 flex items-center gap-2"
                                >
                                    <Save className="w-5 h-5" />
                                    Save Changes
                                </motion.button>
                            </div>

                            {/* Notification Preferences */}
                            <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/5 shadow-2xl shadow-noble-gold/5">
                                <h2 className="text-2xl font-bold text-white mb-4">Notifications</h2>
                                <div className="space-y-3">
                                    {[
                                        'Email notifications for new features',
                                        'Generation completion alerts',
                                        'Weekly usage reports',
                                        'Compliance updates',
                                    ].map((pref, index) => (
                                        <label key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-noble-gold/5 cursor-pointer group transition-all">
                                            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-white/10 bg-black text-noble-gold focus:ring-noble-gold" />
                                            <span className="text-zinc-300 text-sm">{pref}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Billing Tab */}
                    {activeTab === 'billing' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            {/* Current Plan */}
                            <div className="p-6 rounded-2xl bg-noble-gold/5 border border-noble-gold/20 relative overflow-hidden group">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-2xl font-black text-noble-gold mb-1 uppercase tracking-tighter italic">Professional Plan</h2>
                                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">$39.99/month • Renews on Feb 14, 2026</p>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-6 py-2 rounded-xl bg-noble-gold text-black font-black text-[10px] uppercase tracking-widest shadow-lg shadow-noble-gold/10"
                                    >
                                        Upgrade
                                    </motion.button>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="p-3 rounded-lg bg-black/20 border border-white/5">
                                        <div className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Generations</div>
                                        <div className="text-noble-gold font-black uppercase tracking-tighter">Unlimited</div>
                                    </div>
                                    <div className="p-3 rounded-lg bg-black/20 border border-white/5">
                                        <div className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Tools</div>
                                        <div className="text-noble-gold font-black uppercase tracking-tighter">All 41</div>
                                    </div>
                                    <div className="p-3 rounded-lg bg-black/20">
                                        <div className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">Support</div>
                                        <div className="text-noble-gold font-black uppercase tracking-tighter">Priority</div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="flex items-center justify-between p-4 rounded-lg bg-zinc-900 border border-white/10 hover:border-noble-gold/20 transition-all group">
                                <div className="flex items-center gap-3">
                                    <CreditCard className="w-6 h-6 text-noble-gold" />
                                    <div>
                                        <div className="text-white font-bold tracking-widest">•••• •••• •••• 4242</div>
                                        <div className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Expires 12/2027</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
