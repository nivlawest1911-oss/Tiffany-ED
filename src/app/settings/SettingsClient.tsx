'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    User, Shield, Bell, Zap, CreditCard,
    Settings as SettingsIcon, Brain, Sparkles,
    CheckCircle2, AlertCircle, Target, ArrowRight,
    Cpu, Network, Lock
} from 'lucide-react';
import { useIntelligence } from '@/context/IntelligenceContext';
import { HolographicBackground } from '@/components/ui/HolographicBackground';

export default function SettingsClient() {
    const { triggerBriefing } = useIntelligence();
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState('identity');

    useEffect(() => {
        setMounted(true);
        triggerBriefing('Settings');
    }, [triggerBriefing]);

    const sections = [
        { id: 'identity', label: 'User Identity', icon: User, color: 'indigo' },
        { id: 'nodes', label: 'Neural Nodes', icon: Brain, color: 'cyan' },
        { id: 'subscription', label: 'Subscription', icon: CreditCard, color: 'amber' },
        { id: 'security', label: 'Security', icon: Shield, color: 'emerald' },
        { id: 'notifications', label: 'Notifications', icon: Bell, color: 'pink' },
    ];

    if (!mounted) return null;

    return (
        <main className="min-h-screen relative overflow-hidden font-inter text-slate-200">
            <HolographicBackground />

            <div className="relative z-10 max-w-7xl mx-auto p-6 lg:p-12">
                {/* Header Area */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 w-fit">
                            <SettingsIcon className="w-4 h-4 text-indigo-400 animate-spin-slow" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">System Parameters</span>
                        </div>
                        <h1 className="text-5xl font-black uppercase tracking-tighter text-white">
                            Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400">Center</span>
                        </h1>
                        <p className="text-slate-400 max-w-lg text-sm leading-relaxed">
                            Configure your EdIntel Sovereignty. Calibrate neural nodes, manage institutional capital, and secure your leadership profile.
                        </p>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => triggerBriefing('Legacy Profile')}
                        className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-all group shrink-0 shadow-lg shadow-amber-900/10"
                    >
                        <Target size={18} className="group-hover:rotate-45 transition-transform" />
                        <div className="text-left">
                            <div className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Founder Hub</div>
                            <div className="text-xs font-medium opacity-60">Dr. West Analysis</div>
                        </div>
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Navigation Sidebar */}
                    <div className="lg:col-span-1 space-y-2">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 group relative overflow-hidden ${activeSection === section.id
                                        ? `bg-${section.color}-500/10 border-${section.color}-500/50 shadow-[0_0_20px_rgba(99,102,241,0.15)]`
                                        : 'bg-white/5 border-transparent hover:bg-white/10'
                                    }`}
                            >
                                <section.icon className={`w-5 h-5 ${activeSection === section.id ? `text-${section.color}-400` : 'text-slate-500 group-hover:text-slate-300'}`} />
                                <span className={`text-sm font-bold ${activeSection === section.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                                    {section.label}
                                </span>
                                {activeSection === section.id && (
                                    <motion.div
                                        layoutId="active-indicator"
                                        className={`absolute right-4 w-1.5 h-1.5 rounded-full bg-${section.color}-400 shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
                                    />
                                )}
                            </button>
                        ))}

                        <div className="mt-8 p-6 bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-3xl border border-white/5 space-y-4">
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-amber-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">Tier: School Site Pro</span>
                            </div>
                            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-amber-500 h-full w-[65%]" />
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                <span>32.5k / 50k Tokens</span>
                                <span>65%</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-3">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSection}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                            >
                                {activeSection === 'identity' && <IdentitySection />}
                                {activeSection === 'nodes' && <NodesSection />}
                                {activeSection === 'subscription' && <SubscriptionSection />}
                                {activeSection === 'security' && <SecuritySection />}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </main>
    );
}

function IdentitySection() {
    return (
        <Card className="bg-slate-950/40 border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 lg:p-12 space-y-10">
            <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <User className="w-8 h-8 text-indigo-400" />
                </div>
                <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-white">Identity Configuration</h2>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Management of Neural Presence</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Legal Name</label>
                    <Input className="bg-white/5 border-white/10 h-14 rounded-2xl text-white focus:border-indigo-500/50" defaultValue="Dr. Alvin West, II" />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Professional Role</label>
                    <Input className="bg-white/5 border-white/10 h-14 rounded-2xl text-white focus:border-indigo-500/50" defaultValue="Chief Strategy Architect" />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Institutional Bio (Neural Feed)</label>
                    <textarea
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 text-white text-sm focus:border-indigo-500/50 h-32 outline-none transition-all placeholder:text-slate-600"
                        defaultValue="Doctorate-level clinical and fiscal strategist specializing in neural educational frameworks and district-wide turnaround architecture."
                    />
                </div>
            </div>

            <div className="pt-6">
                <Button className="bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl px-10 h-14 font-bold text-sm uppercase tracking-widest gap-3">
                    <Sparkles className="w-4 h-4" /> Sync Neural Profile
                </Button>
            </div>
        </Card>
    );
}

function NodesSection() {
    const nodes = [
        { id: 'iep', name: 'IEP Architect', status: 'Online', latentcy: '12ms', color: 'indigo' },
        { id: 'curriculum', name: 'Curriculum Foundry', status: 'Syncing', latentcy: '145ms', color: 'cyan' },
        { id: 'audit', name: 'Compliance Node', status: 'Online', latentcy: '8ms', color: 'emerald' },
        { id: 'vision', name: 'Admin Vision', status: 'Offline', latentcy: '---', color: 'slate' },
    ];

    return (
        <Card className="bg-slate-950/40 border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 lg:p-12">
            <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                        <Cpu className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black uppercase tracking-tight text-white">Neural Hub Nodes</h2>
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Active Processing Units</p>
                    </div>
                </div>
                <Button variant="outline" className="border-white/10 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-300">
                    <RefreshCw className="w-3 h-3 mr-2" /> Re-scan Array
                </Button>
            </div>

            <div className="space-y-4">
                {nodes.map(node => (
                    <div key={node.id} className="group flex items-center justify-between p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                        <div className="flex items-center gap-6">
                            <div className={`w-12 h-12 rounded-2xl bg-${node.color}-500/10 flex items-center justify-center border border-${node.color}-500/20 group-hover:scale-110 transition-transform`}>
                                <Network className={`w-6 h-6 text-${node.color}-400`} />
                            </div>
                            <div>
                                <h4 className="font-bold text-white">{node.name}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className={`w-1.5 h-1.5 rounded-full ${node.status === 'Online' ? 'bg-emerald-500 animate-pulse' : node.status === 'Syncing' ? 'bg-amber-500 animate-spin-slow' : 'bg-slate-600'}`} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{node.status}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-1">Latency</div>
                            <div className="font-mono text-xs text-slate-400">{node.latentcy}</div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}

function SubscriptionSection() {
    return (
        <div className="space-y-8">
            <Card className="bg-slate-950/40 border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 lg:p-12 overflow-hidden relative">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-[2.5rem] bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                            <CreditCard className="w-10 h-10 text-amber-500" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <h2 className="text-3xl font-black uppercase tracking-tight text-white">School Site Pro</h2>
                                <span className="px-3 py-1 bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest rounded-full">Active</span>
                            </div>
                            <p className="text-slate-400 text-sm">Next billing cycle: March 14, 2026</p>
                        </div>
                    </div>
                    <Button variant="outline" className="border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10 rounded-2xl h-14 px-8 text-amber-400 font-bold uppercase tracking-widest text-[10px]">
                        Manage Billing
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    {[
                        { label: 'Token Capacity', value: '50,000 / mo', icon: Zap },
                        { label: 'Neural Nodes', value: 'Infinite', icon: Brain },
                        { label: 'Support Tier', value: 'Platinum 24/7', icon: Sparkles },
                    ].map((stat, i) => (
                        <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-3">
                            <stat.icon size={20} className="text-amber-500/80" />
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{stat.label}</div>
                                <div className="text-lg font-black text-white">{stat.value}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <Card className="bg-gradient-to-br from-indigo-900/40 to-cyan-900/40 border border-indigo-500/20 backdrop-blur-3xl rounded-[2.5rem] p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8 group">
                <div className="space-y-4 text-center md:text-left">
                    <h3 className="text-2xl font-black uppercase tracking-tighter text-white">Upgrade to District Command</h3>
                    <p className="text-indigo-200/60 text-sm max-w-md">Unlock cross-building analytics, unlimited voice cloning, and custom government policy advisors.</p>
                </div>
                <Button className="bg-white text-indigo-950 hover:bg-white/90 rounded-2xl h-16 px-10 font-black uppercase tracking-widest text-xs gap-3 shrink-0 group-hover:scale-105 transition-transform shadow-xl shadow-white/5">
                    Explore Enterprise <ArrowRight size={16} />
                </Button>
            </Card>
        </div>
    );
}

function SecuritySection() {
    return (
        <Card className="bg-slate-950/40 border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 lg:p-12">
            <div className="flex items-center gap-4 mb-12">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Lock className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-white">Security & Access</h2>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Protocol Firewalls</p>
                </div>
            </div>

            <div className="space-y-6">
                {[
                    { title: 'Biometric MFA', desc: 'Secure login via face/thumbprint synthesis', enabled: true },
                    { title: 'Session Encryption', desc: 'Quantum-resistant AES-256 active for all nodes', enabled: true },
                    { title: 'Identity Shield', desc: 'Masks digital footprint during public node access', enabled: false },
                ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-6 rounded-[2rem] bg-white/5 border border-white/5">
                        <div className="space-y-1">
                            <h4 className="font-bold text-white">{item.title}</h4>
                            <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                        <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${item.enabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                            {item.enabled ? 'Enabled' : 'Disabled'}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
