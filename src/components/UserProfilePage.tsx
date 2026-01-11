'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    User, Mail, MapPin, Calendar, Edit, Save, X, Upload, Bell,
    Shield, CreditCard, Clock, FileText, Award, TrendingUp, Download,
    Sparkles, CheckCircle
} from 'lucide-react';

export default function UserProfilePage() {
    const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'settings' | 'billing'>('overview');
    const [isEditing, setIsEditing] = useState(false);
    const [profileData, setProfileData] = useState({
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
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-purple-500/20"
                >
                    <div className="flex items-start gap-6">
                        {/* Avatar */}
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold">
                                AW
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="absolute bottom-0 right-0 p-2 rounded-full bg-purple-500 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Upload className="w-4 h-4" />
                            </motion.button>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-white mb-2">{profileData.name}</h1>
                                    <p className="text-purple-300 mb-1">{profileData.role}</p>
                                    <p className="text-purple-400 text-sm">{profileData.school}</p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="px-4 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-medium flex items-center gap-2"
                                >
                                    {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                                    {isEditing ? 'Cancel' : 'Edit Profile'}
                                </motion.button>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {stats.map((stat, index) => (
                                    <div key={index} className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                        <div className="flex items-center gap-2 mb-1">
                                            <stat.icon className="w-4 h-4 text-purple-400" />
                                            <span className="text-purple-300 text-xs">{stat.label}</span>
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
                            className={`px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                                    : 'bg-black/40 text-purple-300 hover:bg-purple-500/20 border border-purple-500/20'
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
                                    className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-purple-500/20"
                                >
                                    <h2 className="text-2xl font-bold text-white mb-4">Favorite Tools</h2>
                                    <div className="space-y-3">
                                        {favoriteTools.map((tool, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                                <div className="flex items-center gap-3">
                                                    <tool.icon className="w-5 h-5 text-purple-400" />
                                                    <span className="text-white font-medium">{tool.name}</span>
                                                </div>
                                                <span className="text-purple-300 text-sm">{tool.uses} uses</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Achievements */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-purple-500/20"
                                >
                                    <h2 className="text-2xl font-bold text-white mb-4">Achievements</h2>
                                    <div className="grid grid-cols-2 gap-3">
                                        {achievements.map((achievement, index) => (
                                            <div
                                                key={index}
                                                className={`p-4 rounded-xl text-center ${achievement.unlocked
                                                        ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/40'
                                                        : 'bg-black/40 border border-purple-500/10 opacity-50'
                                                    }`}
                                            >
                                                <div className="text-3xl mb-2">{achievement.icon}</div>
                                                <div className="text-white font-semibold text-sm mb-1">{achievement.name}</div>
                                                <div className="text-purple-300 text-xs">{achievement.description}</div>
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
                                className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-purple-500/20"
                            >
                                <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
                                <div className="space-y-3">
                                    {recentActivity.map((activity, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-purple-500/10 transition-colors">
                                            <div>
                                                <div className="text-white font-medium">{activity.action}</div>
                                                <div className="text-purple-400 text-sm">{activity.tool}</div>
                                            </div>
                                            <div className="text-purple-300 text-sm">{activity.date}</div>
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
                            className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-purple-500/20"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-white">Activity History</h2>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 rounded-xl bg-purple-500/20 text-purple-300 font-medium flex items-center gap-2"
                                >
                                    <Download className="w-4 h-4" />
                                    Export
                                </motion.button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-purple-500/20">
                                            <th className="text-left py-3 px-4 text-purple-300 font-semibold">Tool</th>
                                            <th className="text-left py-3 px-4 text-purple-300 font-semibold">Action</th>
                                            <th className="text-left py-3 px-4 text-purple-300 font-semibold">Date</th>
                                            <th className="text-left py-3 px-4 text-purple-300 font-semibold">Time Saved</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-purple-200">
                                        {recentActivity.map((activity, index) => (
                                            <tr key={index} className="border-b border-purple-500/10 hover:bg-purple-500/5">
                                                <td className="py-3 px-4">{activity.tool}</td>
                                                <td className="py-3 px-4">{activity.action}</td>
                                                <td className="py-3 px-4">{activity.date}</td>
                                                <td className="py-3 px-4 text-green-400">45 min</td>
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
                            <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-purple-500/20">
                                <h2 className="text-2xl font-bold text-white mb-4">Personal Information</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-purple-300 text-sm mb-2 block">Full Name</label>
                                        <input
                                            type="text"
                                            value={profileData.name}
                                            className="w-full p-3 rounded-lg bg-black/40 border border-purple-500/20 text-white focus:border-purple-500/40 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-purple-300 text-sm mb-2 block">Email</label>
                                        <input
                                            type="email"
                                            value={profileData.email}
                                            className="w-full p-3 rounded-lg bg-black/40 border border-purple-500/20 text-white focus:border-purple-500/40 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-purple-300 text-sm mb-2 block">Role</label>
                                        <select className="w-full p-3 rounded-lg bg-black/40 border border-purple-500/20 text-white focus:border-purple-500/40 outline-none">
                                            <option>Administrator</option>
                                            <option>Teacher</option>
                                            <option>Specialist</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-purple-300 text-sm mb-2 block">School</label>
                                        <input
                                            type="text"
                                            value={profileData.school}
                                            className="w-full p-3 rounded-lg bg-black/40 border border-purple-500/20 text-white focus:border-purple-500/40 outline-none"
                                        />
                                    </div>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold flex items-center gap-2"
                                >
                                    <Save className="w-5 h-5" />
                                    Save Changes
                                </motion.button>
                            </div>

                            {/* Notification Preferences */}
                            <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-purple-500/20">
                                <h2 className="text-2xl font-bold text-white mb-4">Notifications</h2>
                                <div className="space-y-3">
                                    {[
                                        'Email notifications for new features',
                                        'Generation completion alerts',
                                        'Weekly usage reports',
                                        'Compliance updates',
                                    ].map((pref, index) => (
                                        <label key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-500/10 cursor-pointer">
                                            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-purple-500/20 bg-black/40 text-purple-500" />
                                            <span className="text-purple-200">{pref}</span>
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
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/40">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-2">Professional Plan</h2>
                                        <p className="text-purple-300">$39.99/month • Renews on Feb 14, 2026</p>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium"
                                    >
                                        Upgrade
                                    </motion.button>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="p-3 rounded-lg bg-black/20">
                                        <div className="text-purple-300 text-sm mb-1">Generations</div>
                                        <div className="text-white font-bold">Unlimited</div>
                                    </div>
                                    <div className="p-3 rounded-lg bg-black/20">
                                        <div className="text-purple-300 text-sm mb-1">Tools</div>
                                        <div className="text-white font-bold">All 41</div>
                                    </div>
                                    <div className="p-3 rounded-lg bg-black/20">
                                        <div className="text-purple-300 text-sm mb-1">Support</div>
                                        <div className="text-white font-bold">Priority</div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-purple-500/20">
                                <h2 className="text-2xl font-bold text-white mb-4">Payment Method</h2>
                                <div className="flex items-center justify-between p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                    <div className="flex items-center gap-3">
                                        <CreditCard className="w-6 h-6 text-purple-400" />
                                        <div>
                                            <div className="text-white font-medium">•••• •••• •••• 4242</div>
                                            <div className="text-purple-300 text-sm">Expires 12/2027</div>
                                        </div>
                                    </div>
                                    <button className="text-purple-400 hover:text-purple-300 text-sm">Update</button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}
