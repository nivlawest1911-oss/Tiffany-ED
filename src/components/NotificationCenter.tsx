'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Bell, X, CheckCircle, Sparkles, AlertCircle, Info, TrendingUp,
    Settings, Trash2, Clock
} from 'lucide-react';

interface Notification {
    id: string;
    type: 'success' | 'info' | 'warning' | 'update';
    title: string;
    description: string;
    time: string;
    read: boolean;
    actionLabel?: string;
    actionUrl?: string;
}

export default function NotificationCenter({ onClose }: { onClose?: () => void }) {
    const [isOpen, setIsOpen] = useState(onClose ? true : false);
    const [activeTab, setActiveTab] = useState<'all' | 'unread'>('all');
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: '1',
            type: 'success',
            title: 'IEP Generation Complete',
            description: 'Your IEP for Student A has been generated successfully',
            time: '2 minutes ago',
            read: false,
            actionLabel: 'View IEP',
            actionUrl: '/documents/iep-123',
        },
        {
            id: '2',
            type: 'info',
            title: 'New Feature Available',
            description: 'Try our new Behavior Coach tool with PBIS support',
            time: '1 hour ago',
            read: false,
            actionLabel: 'Try Now',
            actionUrl: '/generators/behavior-coach',
        },
        {
            id: '3',
            type: 'warning',
            title: 'Compliance Update',
            description: 'Alabama IDEA regulations updated - review your IEPs',
            time: '3 hours ago',
            read: true,
            actionLabel: 'Learn More',
            actionUrl: '/compliance',
        },
        {
            id: '4',
            type: 'update',
            title: 'Usage Milestone Reached',
            description: 'You\'ve saved 100+ hours this month! 🎉',
            time: '1 day ago',
            read: true,
        },
        {
            id: '5',
            type: 'info',
            title: 'Team Mention',
            description: 'Dr. Smith mentioned you in a comment on Lesson Plan #45',
            time: '2 days ago',
            read: true,
            actionLabel: 'View Comment',
            actionUrl: '/documents/lesson-45',
        },
    ]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const filteredNotifications = activeTab === 'unread'
        ? notifications.filter(n => !n.read)
        : notifications;

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return CheckCircle;
            case 'warning': return AlertCircle;
            case 'update': return TrendingUp;
            default: return Info;
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case 'success': return 'text-green-400 bg-green-500/20';
            case 'warning': return 'text-orange-400 bg-orange-500/20';
            case 'update': return 'text-purple-400 bg-purple-500/20';
            default: return 'text-blue-400 bg-blue-500/20';
        }
    };

    return (
        <>
            {/* Bell Icon Trigger */}
            <div className="fixed top-6 right-6 z-50">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative p-3 rounded-xl bg-black/40 backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 transition-all"
                >
                    <Bell className="w-6 h-6 text-purple-300" />
                    {unreadCount > 0 && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold"
                        >
                            {unreadCount}
                        </motion.div>
                    )}
                </motion.button>
            </div>

            {/* Notification Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => {
                                setIsOpen(false);
                                onClose?.();
                            }}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                        />

                        {/* Dropdown */}
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className="fixed top-20 right-6 w-full max-w-md z-50"
                        >
                            <div className="bg-slate-900/95 backdrop-blur-xl border border-purple-500/20 rounded-2xl shadow-2xl overflow-hidden">
                                {/* Header */}
                                <div className="p-4 border-b border-purple-500/20 bg-black/20">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                            <Bell className="w-5 h-5 text-purple-400" />
                                            Notifications
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={markAllAsRead}
                                                className="text-purple-400 hover:text-purple-300 text-sm"
                                            >
                                                Mark all read
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => {
                                                    setIsOpen(false);
                                                    onClose?.();
                                                }}
                                                className="p-1 rounded-lg hover:bg-purple-500/20 text-purple-400"
                                            >
                                                <X className="w-5 h-5" />
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Tabs */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setActiveTab('all')}
                                            className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all ${activeTab === 'all'
                                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                                : 'bg-purple-500/10 text-purple-300 hover:bg-purple-500/20'
                                                }`}
                                        >
                                            All
                                        </button>
                                        <button
                                            onClick={() => setActiveTab('unread')}
                                            className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center justify-center gap-2 ${activeTab === 'unread'
                                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                                : 'bg-purple-500/10 text-purple-300 hover:bg-purple-500/20'
                                                }`}
                                        >
                                            Unread
                                            {unreadCount > 0 && (
                                                <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs">
                                                    {unreadCount}
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Notifications List */}
                                <div className="max-h-[60vh] overflow-y-auto">
                                    {filteredNotifications.length === 0 ? (
                                        <div className="p-8 text-center">
                                            <Bell className="w-12 h-12 text-purple-400/50 mx-auto mb-3" />
                                            <p className="text-purple-300">No notifications</p>
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-purple-500/10">
                                            {filteredNotifications.map((notification, index) => {
                                                const Icon = getIcon(notification.type);
                                                const colorClass = getColor(notification.type);

                                                return (
                                                    <motion.div
                                                        key={notification.id}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.05 }}
                                                        onClick={() => markAsRead(notification.id)}
                                                        className={`p-4 hover:bg-purple-500/5 transition-colors cursor-pointer ${!notification.read ? 'bg-purple-500/5' : ''
                                                            }`}
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            {/* Icon */}
                                                            <div className={`p-2 rounded-lg ${colorClass} flex-shrink-0`}>
                                                                <Icon className="w-4 h-4" />
                                                            </div>

                                                            {/* Content */}
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-start justify-between gap-2 mb-1">
                                                                    <h4 className={`font-semibold ${!notification.read ? 'text-white' : 'text-purple-200'
                                                                        }`}>
                                                                        {notification.title}
                                                                    </h4>
                                                                    {!notification.read && (
                                                                        <div className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0 mt-1" />
                                                                    )}
                                                                </div>
                                                                <p className="text-purple-300 text-sm mb-2">
                                                                    {notification.description}
                                                                </p>
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-purple-400 text-xs flex items-center gap-1">
                                                                        <Clock className="w-3 h-3" />
                                                                        {notification.time}
                                                                    </span>
                                                                    {notification.actionLabel && (
                                                                        <button className="text-purple-400 hover:text-purple-300 text-xs font-medium">
                                                                            {notification.actionLabel} →
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            {/* Delete */}
                                                            <motion.button
                                                                whileHover={{ scale: 1.1 }}
                                                                whileTap={{ scale: 0.9 }}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    deleteNotification(notification.id);
                                                                }}
                                                                className="p-1 rounded-lg hover:bg-red-500/20 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </motion.button>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="p-4 border-t border-purple-500/20 bg-black/20 flex items-center justify-between">
                                    <button className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1">
                                        View all notifications →
                                    </button>
                                    <button className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1">
                                        <Settings className="w-4 h-4" />
                                        Settings
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
