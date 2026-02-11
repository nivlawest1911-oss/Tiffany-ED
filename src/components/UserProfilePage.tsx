'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail, Calendar, Edit, Save, Upload, CreditCard, Clock, FileText, Award, TrendingUp,
    Sparkles, Shield, Zap, Target, BookOpen
} from "lucide-react";
import { supabase } from '@/lib/supabase';

import { ParticleBackground, GlassCard } from "@/components/ui/Cinematic";

export default function UserProfilePage() {
    const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'settings' | 'billing'>('overview');
    const [loading, setLoading] = useState(true);

    const [subscription, setSubscription] = useState<any>(null);
    const [profileData, setProfileData] = useState({
        name: 'EdIntel Delegate',
        email: 'protocol@edintel.ai',
        role: 'EdIntel Administrator',
        school: 'Mobile County High School',
        district: 'Mobile County Public Schools',
        memberSince: 'December 2025',
    });

    useEffect(() => {
        async function getProfile() {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setProfileData(prev => ({
                    ...prev,
                    name: user.user_metadata?.full_name || user.email?.split('@')[0] || prev.name,
                    email: user.email || prev.email,
                }));

                // Fetch Subscription
                const { data: sub } = await supabase
                    .from('subscriptions')
                    .select('*')
                    .eq('user_id', user.id)
                    .single();

                if (sub) setSubscription(sub);
            }
            setLoading(false);
        }
        getProfile();
    }, []);

    const handlePortalRedirect = async () => {
        try {
            // Check if user has a customer ID in their profile/metadata
            // For now, redirect to a generic portal route if it exists, or show a message
            const res = await fetch('/api/stripe/portal', { method: 'POST' });
            const data = await res.json();
            if (data.url) window.location.href = data.url;
        } catch (err) {
            console.error('Portal redirect failed:', err);
        }
    };

    const stats = [
        { label: 'Member Since', value: 'Dec 2025', icon: Calendar, color: 'text-blue-400' },
        { label: 'Total Generations', value: '342', icon: Sparkles, color: 'text-noble-gold' },
        { label: 'Hours Saved', value: '127', icon: Clock, color: 'text-emerald-400' },
        { label: 'Clearance Level', value: 'Level 5', icon: Shield, color: 'text-purple-400' },
    ];

    const recentActivity = [
        { tool: 'IEP Architect', date: '2 min ago', action: 'Generated IEP', status: 'COMPLETED' },
        { tool: 'Lesson Planner', date: '15 min ago', action: 'Created lesson plan', status: 'COMPLETED' },
        { tool: 'Email Composer', date: '1 hour ago', action: 'Drafted email', status: 'ARCHIVED' },
        { tool: 'Behavior Coach', date: '2 hours ago', action: 'Created behavior plan', status: 'COMPLETED' },
    ];

    const tabs = [
        { id: 'overview', label: 'Overview', icon: Target },
        { id: 'activity', label: 'Neural Activity', icon: Zap },
        { id: 'settings', label: 'Configurations', icon: Edit },
        { id: 'billing', label: 'Subscription', icon: CreditCard },
    ];

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-2 border-noble-gold border-t-transparent rounded-full"
            />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-400 font-inter selection:bg-noble-gold selection:text-black">
            {/* Ambient Background Glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-noble-gold/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/10 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-6xl mx-auto p-6 md:p-8 relative z-10">

                {/* Header / Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative mb-12 rounded-3xl overflow-hidden border border-white/5 bg-zinc-900/20 backdrop-blur-3xl group"
                >
                    <ParticleBackground />
                    <div className="absolute inset-0 bg-gradient-to-r from-noble-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                    <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        {/* Avatar */}
                        <div className="relative shrink-0">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-zinc-800 to-black border-2 border-noble-gold/30 flex items-center justify-center shadow-2xl shadow-noble-gold/20 relative"
                            >
                                <span className="text-noble-gold text-4xl md:text-5xl font-black tracking-tighter italic">
                                    {profileData.name.split(' ').map(n => n[0]).join('')}
                                </span>
                                <div className="absolute inset-0 rounded-full bg-noble-gold/5 animate-pulse" />
                            </motion.div>
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                className="absolute bottom-2 right-2 p-3 rounded-full bg-noble-gold text-black shadow-xl hover:shadow-noble-gold/40 transition-all border border-white/20"
                            >
                                <Upload className="w-4 h-4" />
                            </motion.button>
                        </div>

                        {/* Profile Identity */}
                        <div className="flex-1 text-center md:text-left space-y-4">
                            <div>
                                <motion.h1
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-4xl md:text-6xl font-black text-white tracking-tight mb-2 flex items-center justify-center md:justify-start gap-4"
                                >
                                    {profileData.name}
                                    <Sparkles className="w-8 h-8 text-noble-gold animate-pulse" />
                                </motion.h1>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                    <span className="px-3 py-1 rounded-full bg-noble-gold/10 text-noble-gold text-[10px] font-black uppercase tracking-[0.2em] border border-noble-gold/20">
                                        {profileData.role}
                                    </span>
                                    <span className="flex items-center gap-2 text-zinc-500 text-xs font-medium border-l border-white/10 pl-4 uppercase tracking-widest">
                                        <BookOpen className="w-4 h-4" />
                                        {profileData.school}
                                    </span>
                                </div>
                            </div>

                            {/* Rapid Stats Bar */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.05)' }}
                                        className="p-4 rounded-2xl bg-black/40 border border-white/5 transition-all group/stat"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <stat.icon className={`w-5 h-5 ${stat.color} group-hover/stat:scale-110 transition-transform`} />
                                            <span className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.2em]">{stat.label}</span>
                                        </div>
                                        <div className="text-white text-xl font-black tracking-tight">{stat.value}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tactical Navigation Tabs */}
                <div className="flex justify-center md:justify-start gap-3 mb-10 overflow-x-auto pb-4 no-scrollbar">
                    {tabs.map((tab) => (
                        <motion.button
                            key={tab.id}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-3 whitespace-nowrap border shrink-0 ${activeTab === tab.id
                                ? 'bg-noble-gold text-black border-noble-gold shadow-[0_0_30px_rgba(212,175,55,0.3)]'
                                : 'bg-zinc-900/30 text-zinc-500 hover:text-white border-white/5 backdrop-blur-md'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </motion.button>
                    ))}
                </div>

                {/* Contextual Intelligence Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-8"
                    >
                        {activeTab === 'overview' && (
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Activity Pulse */}
                                <GlassCard className="lg:col-span-2 p-8" delay={0.1}>
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                            <TrendingUp className="w-6 h-6 text-emerald-400" />
                                            Neural Processing History
                                        </h2>
                                        <span className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20 uppercase tracking-widest">
                                            Live Sync Active
                                        </span>
                                    </div>
                                    <div className="space-y-6">
                                        {recentActivity.map((activity, index) => (
                                            <div key={index} className="flex items-center justify-between group/item p-4 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/5 transition-all">
                                                <div className="flex items-center gap-6">
                                                    <div className="w-12 h-12 rounded-lg bg-zinc-800/50 flex items-center justify-center text-noble-gold border border-white/5 group-hover/item:border-noble-gold/30 transition-colors">
                                                        <FileText className="w-6 h-6" />
                                                    </div>
                                                    <div>
                                                        <div className="text-white font-bold text-lg leading-none mb-1">{activity.action}</div>
                                                        <div className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">{activity.tool}</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-zinc-400 text-xs font-medium mb-1">{activity.date}</div>
                                                    <div className="text-[10px] font-black text-noble-gold uppercase tracking-widest opacity-0 group-hover/item:opacity-100 transition-opacity">
                                                        Protocol Ref 49A
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </GlassCard>

                                {/* Achievements Vault */}
                                <GlassCard className="p-8" delay={0.2}>
                                    <h2 className="text-2xl font-bold text-white mb-8">Achievements</h2>
                                    <div className="grid grid-cols-1 gap-4">
                                        {[
                                            { name: 'EdIntel Pioneer', icon: Sparkles, color: 'text-noble-gold' },
                                            { name: 'AI Alchemist', icon: Award, color: 'text-blue-400' },
                                            { name: 'Time Guardian', icon: Clock, color: 'text-emerald-400' }
                                        ].map((a, i) => (
                                            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-800/20 border border-white/5 hover:bg-noble-gold/5 transition-colors group/token">
                                                <div className={`p-3 rounded-xl bg-black/40 border border-white/5 group-hover/token:border-noble-gold/30 transition-colors`}>
                                                    <a.icon className={`w-6 h-6 ${a.color}`} />
                                                </div>
                                                <div>
                                                    <div className="text-white font-bold text-sm tracking-widest uppercase italic">{a.name}</div>
                                                    <div className="text-zinc-500 text-[10px] font-black tracking-widest">Unlocked Jan 2026</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        className="w-full mt-8 py-4 rounded-xl border border-dashed border-white/10 text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] hover:text-noble-gold hover:border-noble-gold/30 transition-all"
                                    >
                                        View All Clearance Medals
                                    </motion.button>
                                </GlassCard>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="grid grid-cols-1 gap-8">
                                <GlassCard className="p-10 max-w-4xl mx-auto w-full">
                                    <div className="flex items-center gap-4 mb-10 border-b border-white/5 pb-6">
                                        <div className="p-4 rounded-2xl bg-noble-gold/10 border border-noble-gold/20">
                                            <Edit className="w-8 h-8 text-noble-gold" />
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-black text-white italic tracking-tighter">Identity Core</h2>
                                            <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">Configure your EdIntel profile parameters</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {[
                                            { label: 'Display Identity', value: profileData.name, icon: Mail },
                                            { label: 'Neural Link Address', value: profileData.email, icon: Mail },
                                            { label: 'Institutional Node', value: profileData.school, icon: Calendar },
                                            { label: 'Regional Sector', value: profileData.district, icon: Map }
                                        ].map((field, i) => (
                                            <div key={i} className="space-y-3">
                                                <label className="text-noble-gold text-[10px] font-black uppercase tracking-[0.4em] ml-1">{field.label}</label>
                                                <div className="relative group/input">
                                                    <input
                                                        type="text"
                                                        defaultValue={field.value}
                                                        className="w-full bg-black/40 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-noble-gold focus:ring-1 focus:ring-noble-gold/20 transition-all"
                                                        title={field.label}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-4 mt-12">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-10 py-5 rounded-2xl bg-noble-gold text-black font-black text-[12px] uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(212,175,55,0.2)] flex items-center gap-3"
                                        >
                                            <Save className="w-5 h-5" />
                                            Update Protocols
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-8 py-5 rounded-2xl bg-white/5 text-zinc-500 font-black text-[12px] uppercase tracking-[0.3em] border border-white/10 hover:text-white transition-colors"
                                        >
                                            Reset
                                        </motion.button>
                                    </div>
                                </GlassCard>
                            </div>
                        )}

                        {activeTab === 'billing' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <GlassCard className="p-8 border-noble-gold/20 bg-noble-gold/[0.02]">
                                    <div className="flex justify-between items-start mb-8">
                                        <div>
                                            <div className="text-noble-gold text-[10px] font-black uppercase tracking-[0.4em] mb-4">Active Plan</div>
                                            <h3 className="text-4xl font-black text-white tracking-tight italic mb-2 uppercase italic font-black">
                                                {subscription?.tier_name || 'Initiate'}
                                            </h3>
                                            <p className="text-zinc-500 text-sm font-medium">Status: {subscription?.status || 'Active (Trial)'}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-3xl font-black text-noble-gold font-black italic">
                                                {subscription?.tier_name?.includes('Pro') ? '$39.99' : '$0.00'}
                                            </div>
                                            <div className="text-zinc-600 text-[10px] font-black uppercase tracking-widest ">Per Cycle</div>
                                        </div>
                                    </div>
                                    <div className="space-y-4 border-t border-white/5 pt-8">
                                        {[
                                            'Biometric-Verified Access',
                                            'Unlimited EdIntel Agents',
                                            'District Compliance Gaurantee',
                                            'Next-Gen Media Synthesis'
                                        ].map((feature, i) => (
                                            <div key={i} className="flex items-center gap-3 text-zinc-400 text-sm">
                                                <Shield className="w-4 h-4 text-noble-gold" />
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        onClick={handlePortalRedirect}
                                        className="w-full mt-10 py-5 rounded-2xl bg-noble-gold text-black font-black text-[10px] uppercase tracking-[0.4em]"
                                    >
                                        {subscription ? 'Manage Subscription Hub' : 'Upgrade to EdIntel Pro'}
                                    </motion.button>
                                </GlassCard>

                                <GlassCard className="p-8">
                                    <h3 className="text-2xl font-bold text-white mb-8">Payment Architecture</h3>
                                    <div className="p-6 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between group/card transition-all hover:border-noble-gold/20">
                                        <div className="flex items-center gap-4">
                                            <div className="p-4 rounded-xl bg-zinc-800/50 border border-white/5 text-white italic font-black text-xl group-hover/card:text-noble-gold transition-colors">
                                                VISA
                                            </div>
                                            <div>
                                                <div className="text-white font-bold tracking-[0.2em]">•••• •••• 4242</div>
                                                <div className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Global Master Vault</div>
                                            </div>
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            className="text-zinc-500 hover:text-noble-gold transition-colors"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </motion.button>
                                    </div>
                                    <div className="mt-8 space-y-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-500">Cycle Manifest</span>
                                            <span className="text-white font-bold tracking-widest">INV-2026-001A</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-zinc-500">Next Transmission</span>
                                            <span className="text-white font-bold tracking-widest">FEB 14, 2026</span>
                                        </div>
                                    </div>
                                </GlassCard>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
