'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';
import {
    Shield,
    Zap,
    LogOut,
    CreditCard,
    BarChart3,
    Terminal,
    Cpu,
    Lock,
    Brain
} from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

export default function AccountClient() {
    const { user, logout } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = async () => {
        setIsLoading(true);
        await logout();
        // Redirect handled by AuthContext or useAuth hook usually, 
        // but safe to assume router.push('/') happens there or we let it propagate.
    };

    if (!user) {
        return null; // or loading state, though page.tsx protects this
    }

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-white p-4 md:p-8 lg:p-12 font-sans selection:bg-indigo-500/30">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">

                {/* Header Section */}
                <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 mb-2"
                        >
                            <div className="p-2 bg-indigo-500/10 rounded-lg border border-indigo-500/20">
                                <Shield className="w-5 h-5 text-indigo-400" />
                            </div>
                            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Sovereign Identity Protocol</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl font-black text-white tracking-tight"
                        >
                            Operator <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Profile</span>
                        </motion.h1>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-4"
                    >
                        <button
                            onClick={handleLogout}
                            disabled={isLoading}
                            className="group flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-red-500/50 hover:bg-red-500/10 transition-all text-sm font-medium text-zinc-400 hover:text-red-400"
                        >
                            <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            {isLoading ? 'Disconnecting...' : 'Disconnect'}
                        </button>
                    </motion.div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Column 1: Identity Card */}
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="p-8 rounded-[2rem] bg-zinc-900/50 border border-white/5 backdrop-blur-xl relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-indigo-500 to-purple-500 mb-6 relative">
                                    <div className="w-full h-full rounded-full bg-black overflow-hidden relative">
                                        {user.avatar_url ? (
                                            <Image
                                                src={user.avatar_url}
                                                alt={user.name || 'User'}
                                                width={128}
                                                height={128}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-white font-black text-4xl">
                                                {user.email?.[0]?.toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-4 border-black z-20" title="Online" />
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-1">{user.name || 'Anonymous Operator'}</h2>
                                <p className="text-sm text-zinc-500 font-mono mb-6">{user.email}</p>

                                <div className="w-full grid grid-cols-2 gap-4">
                                    <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex flex-col items-center gap-1">
                                        <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Role</span>
                                        <span className="text-xs font-medium text-indigo-300">Administrator</span>
                                    </div>
                                    <div className="p-3 rounded-2xl bg-black/40 border border-white/5 flex flex-col items-center gap-1">
                                        <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider">Joined</span>
                                        <span className="text-xs font-medium text-zinc-300">{new Date(user.id ? Date.now() : Date.now()).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="p-6 rounded-[2rem] bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 backdrop-blur-xl relative overflow-hidden"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                                        <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">Current Plan</span>
                                    </div>
                                    <h3 className="text-xl font-black text-white italic">Sovereign Initiate</h3>
                                </div>
                                <button onClick={() => toast("Upgrade feature coming soon.")} className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-[10px] font-black uppercase tracking-wider transition-colors shadow-lg shadow-amber-500/20">
                                    Upgrade
                                </button>
                            </div>

                            <div className="space-y-3">
                                <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
                                    <div className="h-full w-[0%] bg-amber-500 rounded-full" />
                                </div>
                                <div className="flex justify-between text-[10px] font-medium text-amber-500/60 uppercase tracking-widest">
                                    <span>Trial Active</span>
                                    <span>14 Days Remaining</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Column 2: Neural Telemetry (Usage) */}
                    <div className="lg:col-span-2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="p-8 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 relative overflow-hidden h-full min-h-[400px]"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                    <BarChart3 className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Neural Telemetry</h3>
                                    <p className="text-xs text-zinc-500 font-medium">Real-time system usage and AI interactions.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { icon: Terminal, label: 'Commands Executed', value: '0', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
                                    { icon: Cpu, label: 'Compute Cycles', value: '1.2ms', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
                                    { icon: Lock, label: 'Secure Sessions', value: '1', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
                                    { icon: Brain, label: 'Swarm Dispatches', value: '0', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
                                ].map((stat, i) => (
                                    <div key={i} className="p-6 rounded-3xl bg-black/20 border border-white/5 hover:border-white/10 transition-colors group">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.border}`}>
                                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                                            </div>
                                            <span className="text-[10px] font-bold text-zinc-700 uppercase tracking-widest group-hover:text-zinc-500 transition-colors">Live</span>
                                        </div>
                                        <div className="text-3xl font-black text-white mb-1 group-hover:scale-105 transition-transform origin-left">{stat.value}</div>
                                        <div className="text-xs font-medium text-zinc-500">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 p-6 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center">
                                        <CreditCard className="w-6 h-6 text-indigo-400" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white mb-1">Billing Portal</h4>
                                        <p className="text-xs text-zinc-500">Manage payment methods and invoices</p>
                                    </div>
                                </div>
                                <button onClick={() => toast("Billing portal is under construction.")} className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-300 hover:text-white hover:border-zinc-700 transition-all">
                                    Manage
                                </button>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
}
