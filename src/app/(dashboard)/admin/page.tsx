'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldAlert, Users, Brain, BarChart3, Lock } from 'lucide-react';
import Link from 'next/link';

export default function AdminManual() {
    const COMMAND_NODES = [
        {
            title: 'Executive Intelligence',
            role: 'EdIntel',
            description: 'The Fragility Map & Strategic ROI',
            icon: <Activity className="w-6 h-6 text-intel-gold" />,
            actions: [
                { label: 'Fragility Map', href: '/admin/analytics', icon: <BarChart3 className="w-4 h-4" /> },
                { label: 'Sovereign Ledger', href: '/admin/finance', icon: <Lock className="w-4 h-4" /> }
            ]
        },
        {
            title: 'Teacher Sanctuary',
            role: 'Tiffany-ED',
            description: 'Rapid Differentiation & Parent Bridge',
            icon: <Users className="w-6 h-6 text-emerald-400" />,
            actions: [
                { label: 'Roster Logic', href: '/admin/roster', icon: <Users className="w-4 h-4" /> },
                { label: 'Restorative Coach', href: '/admin/restorative', icon: <ShieldAlert className="w-4 h-4" /> }
            ]
        },
        {
            title: 'Wellness Anchor',
            role: 'Transcend',
            description: 'Burnout Shield & Empathetic Peer',
            icon: <Brain className="w-6 h-6 text-rose-400" />,
            actions: [
                { label: 'Staff Wellness', href: '/wellness', icon: <Brain className="w-4 h-4" /> }
            ]
        }
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-20">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                    SITE COMMAND
                </h1>
                <p className="text-xl text-intel-gold/80 font-mono uppercase tracking-widest">
                    Sovereign Administrative Manual
                </p>
            </div>

            {/* Command Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {COMMAND_NODES.map((node, i) => (
                    <motion.div
                        key={node.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 rounded-[2.5rem] bg-black/40 border border-white/5 backdrop-blur-3xl relative overflow-hidden group hover:border-intel-gold/30 transition-all"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            {node.icon}
                        </div>

                        <div className="relative z-10 space-y-6">
                            <div className="space-y-2">
                                <p className="text-xs font-black uppercase tracking-widest text-white/40">{node.role}</p>
                                <h3 className="text-2xl font-black text-white">{node.title}</h3>
                                <p className="text-sm text-white/60 leading-relaxed">{node.description}</p>
                            </div>

                            <div className="space-y-3 pt-6 border-t border-white/5">
                                {node.actions.map(action => (
                                    <Link
                                        key={action.label}
                                        href={action.href}
                                        className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-intel-gold/20 transition-all group/btn"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-white/40 group-hover/btn:text-intel-gold transition-colors">{action.icon}</span>
                                            <span className="text-sm font-bold text-white/80 group-hover/btn:text-white uppercase tracking-wider">{action.label}</span>
                                        </div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover/btn:bg-intel-gold transition-colors" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* SOP Footer */}
            <div className="p-8 rounded-3xl bg-intel-gold/5 border border-intel-gold/10 text-center space-y-4">
                <h4 className="text-intel-gold font-black uppercase tracking-widest text-sm">Standard Operating Procedure</h4>
                <p className="text-white/40 text-sm max-w-2xl mx-auto">
                    This command deck serves as the primary interface for District Leaders.
                    Ensure all conflict data is verified in the Fragility Map before engaging the Restorative Coach.
                </p>
            </div>
        </div>
    );
}
