'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Home, Sparkles, Clock, User, Menu, X, Search, Bell, TrendingUp, Settings, LogOut
} from 'lucide-react';
import Link from 'next/link';

export default function MobileNavigation() {
    const [activeTab, setActiveTab] = useState('home');
    const [menuOpen, setMenuOpen] = useState(false);

    const bottomTabs = [
        { id: 'home', label: 'Home', icon: Home, link: '/' },
        { id: 'generators', label: 'Tools', icon: Sparkles, link: '/all-tools' },
        { id: 'activity', label: 'Activity', icon: Clock, link: '/analytics' },
        { id: 'profile', label: 'Profile', icon: User, link: '/profile' },
        { id: 'more', label: 'More', icon: Menu, link: '#', action: () => setMenuOpen(true) },
    ];

    const menuItems = [
        { label: 'Dashboard', icon: Home, link: '/dashboard' },
        { label: 'All Tools', icon: Sparkles, link: '/all-tools' },
        { label: 'Analytics', icon: TrendingUp, link: '/analytics' },
        { label: 'Notifications', icon: Bell, link: '/notifications' },
        { label: 'Settings', icon: Settings, link: '/settings' },
        { label: 'Sign Out', icon: LogOut, link: '/logout', danger: true },
    ];

    return (
        <>
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-purple-500/20">
                <div className="flex items-center justify-between p-4">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-white font-bold text-lg">EdIntel</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="p-2 rounded-lg bg-purple-500/20 text-purple-300"
                        >
                            <Search className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            className="p-2 rounded-lg bg-purple-500/20 text-purple-300 relative"
                        >
                            <Bell className="w-5 h-5" />
                            <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-pink-500" />
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-purple-500/20 safe-area-inset-bottom">
                <div className="flex items-center justify-around px-2 py-2">
                    {bottomTabs.map((tab) => {
                        const isActive = activeTab === tab.id;

                        return (
                            <Link
                                key={tab.id}
                                href={tab.link}
                                onClick={(e) => {
                                    if (tab.action) {
                                        e.preventDefault();
                                        tab.action();
                                    } else {
                                        setActiveTab(tab.id);
                                    }
                                }}
                            >
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all min-w-[64px] ${isActive
                                            ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20'
                                            : ''
                                        }`}
                                >
                                    <div className={`p-2 rounded-lg transition-all ${isActive
                                            ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/50'
                                            : 'bg-transparent'
                                        }`}>
                                        <tab.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-purple-400'
                                            }`} />
                                    </div>
                                    <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-purple-400'
                                        }`}>
                                        {tab.label}
                                    </span>
                                </motion.button>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Full Screen Menu */}
            {menuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="lg:hidden fixed inset-0 z-50 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-purple-500/20">
                        <h2 className="text-2xl font-bold text-white">Menu</h2>
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setMenuOpen(false)}
                            className="p-2 rounded-xl bg-purple-500/20 text-purple-300"
                        >
                            <X className="w-6 h-6" />
                        </motion.button>
                    </div>

                    {/* Profile Card */}
                    <div className="p-6">
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/40">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
                                    AW
                                </div>
                                <div>
                                    <div className="text-white font-bold text-lg">Dr. Alvin West II</div>
                                    <div className="text-purple-300 text-sm">Administrator</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="p-3 rounded-lg bg-black/20 text-center">
                                    <div className="text-white font-bold">342</div>
                                    <div className="text-purple-300 text-xs">Generations</div>
                                </div>
                                <div className="p-3 rounded-lg bg-black/20 text-center">
                                    <div className="text-white font-bold">127h</div>
                                    <div className="text-purple-300 text-xs">Saved</div>
                                </div>
                                <div className="p-3 rounded-lg bg-black/20 text-center">
                                    <div className="text-white font-bold">98%</div>
                                    <div className="text-purple-300 text-xs">Score</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="px-6 space-y-2">
                        {menuItems.map((item, index) => (
                            <Link key={index} href={item.link}>
                                <motion.button
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => setMenuOpen(false)}
                                    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${item.danger
                                            ? 'bg-red-500/10 hover:bg-red-500/20 border border-red-500/20'
                                            : 'bg-black/40 hover:bg-purple-500/20 border border-purple-500/20'
                                        }`}
                                >
                                    <div className={`p-2 rounded-lg ${item.danger
                                            ? 'bg-red-500/20'
                                            : 'bg-purple-500/20'
                                        }`}>
                                        <item.icon className={`w-5 h-5 ${item.danger ? 'text-red-400' : 'text-purple-400'
                                            }`} />
                                    </div>
                                    <span className={`font-medium ${item.danger ? 'text-red-400' : 'text-white'
                                        }`}>
                                        {item.label}
                                    </span>
                                </motion.button>
                            </Link>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-purple-500/20">
                        <div className="text-center text-purple-400 text-sm">
                            EdIntel v4.0.2 • Made with ♥ in Mobile, AL
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Content Spacer */}
            <div className="lg:hidden h-16" /> {/* Top spacer */}
            <div className="lg:hidden h-20" /> {/* Bottom spacer */}
        </>
    );
}
