'use client';

import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';

export default function Dashboard() {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-[#0A0A0B] text-white">Loading Protocol...</div>;
    }

    if (!user) {
        // Redirect or show message (AuthContext will redirect to login usually if we protected it, but valid layout doesn't enforce it globally yet)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0A0B] text-white gap-4">
                <p>Access Restricted.</p>
                <Link href="/login" className="text-indigo-400 hover:text-indigo-300">Sign In Required</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0A0B] text-white selection:bg-indigo-500/30 pt-24 px-6">
            <div className="max-w-5xl mx-auto space-y-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <h1 className="text-4xl font-bold tracking-tight">
                        Command Center
                    </h1>
                    <p className="text-zinc-400 font-light text-lg">
                        Welcome back, <span className="text-white font-medium">{user.name}</span>.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-xl"
                    >
                        <div className="flex items-center gap-3 mb-4 text-indigo-400">
                            <Shield className="w-5 h-5" />
                            <span className="font-bold uppercase tracking-wider text-sm">Clearance Level</span>
                        </div>
                        <div className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent capitalize">
                            {user.tier}
                        </div>
                        <p className="text-zinc-500 text-sm mt-2">
                            {user.tier === 'free' ? 'Upgrade for unlimited access' : 'Full protocol access granted'}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-xl"
                    >
                        <div className="flex items-center gap-3 mb-4 text-purple-400">
                            <Zap className="w-5 h-5" />
                            <span className="font-bold uppercase tracking-wider text-sm">Protocol Usage</span>
                        </div>
                        <div className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                            {user.usage_count || 0} <span className="text-lg text-zinc-600 font-normal">/ {user.tier === 'free' ? '5' : '∞'}</span>
                        </div>
                        <div className="w-full bg-zinc-800 rounded-full h-1.5 mt-4 overflow-hidden">
                            <div
                                className="bg-purple-500 h-full transition-all duration-500"
                                style={{ width: `${Math.min(((user.usage_count || 0) / (user.tier === 'free' ? 5 : 100)) * 100, 100)}%` }}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-xl flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-4 text-emerald-400">
                                <Sparkles className="w-5 h-5" />
                                <span className="font-bold uppercase tracking-wider text-sm">Action</span>
                            </div>
                            <p className="text-zinc-400 mb-6">ready to initiate new sequence?</p>
                        </div>
                        <Link href="/" className="group flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                            <span className="text-sm font-bold">Launch Generators</span>
                            <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
