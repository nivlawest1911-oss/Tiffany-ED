'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Share2, Activity } from 'lucide-react';
import { GlassCard } from '@/components/ui/Cinematic';
import ProfileShareModal from '@/components/modals/ProfileShareModal';

const MOCK_INTEL_ALERTS = [
    {
        id: 'intel-1',
        node: 'North District',
        type: 'NEURAL_SPIKE',
        title: 'High Cognitive Load Detected',
        description: 'Aggregate neural ingestion rate exceeding 85% in primary learning blocks.',
        timestamp: '2m ago',
        urgency: 'high'
    },
    {
        id: 'intel-2',
        node: 'Central Node',
        type: 'PROTOCOL_UPDATE',
        title: 'New IEP Optimization Strategy',
        description: 'Successful deployment of Tier 3 automation; reducing review latency by 40%.',
        timestamp: '15m ago',
        urgency: 'low'
    },
    {
        id: 'intel-3',
        node: 'West Sector',
        type: 'SECURITY_ALERT',
        title: 'Unauthorized Data Access Attempt',
        description: 'Sovereign Gatekeeper mitigated external probe from unknown IP range.',
        timestamp: '45m ago',
        urgency: 'critical'
    }
];

export function RegionalIntelligenceFeed() {
    const [shareModal, setShareModal] = useState<{ isOpen: boolean; id: string }>({
        isOpen: false,
        id: ''
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Share2 className="w-4 h-4 text-noble-gold" />
                    <h3 className="text-sm font-black text-white uppercase tracking-widest italic">Regional Intelligence Feed</h3>
                </div>
                <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Live Sync</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {MOCK_INTEL_ALERTS.map((alert, idx) => (
                    <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <GlassCard className={`p-5 border-l-4 ${alert.urgency === 'critical' ? 'border-l-red-500 bg-red-500/5' :
                            alert.urgency === 'high' ? 'border-l-orange-500 bg-orange-500/5' :
                                'border-l-noble-gold bg-noble-gold/5'
                            }`}>
                            <div className="flex justify-between items-start mb-3">
                                <div className={`p-1.5 rounded-lg ${alert.urgency === 'critical' ? 'bg-red-500/20 text-red-400' :
                                    alert.urgency === 'high' ? 'bg-orange-500/20 text-orange-400' :
                                        'bg-noble-gold/20 text-noble-gold'
                                    }`}>
                                    {alert.type === 'NEURAL_SPIKE' ? <Activity size={12} /> :
                                        alert.type === 'SECURITY_ALERT' ? <Shield size={12} /> :
                                            <Zap size={12} />}
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => setShareModal({ isOpen: true, id: alert.id })}
                                        className="p-1 text-white/20 hover:text-noble-gold transition-colors"
                                        title="Share Intelligence Alert"
                                        aria-label="Share Intelligence Alert"
                                    >
                                        <Share2 size={10} />
                                    </button>
                                    <span className="text-[10px] font-mono text-white/20 uppercase">{alert.timestamp}</span>
                                </div>
                            </div>

                            <div className="text-left">
                                <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">{alert.node}</div>
                                <h4 className="text-xs font-bold text-white mb-2 leading-tight uppercase italic">{alert.title}</h4>
                                <p className="text-[10px] text-white/60 leading-relaxed font-inter">{alert.description}</p>
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>

            <ProfileShareModal
                isOpen={shareModal.isOpen}
                onClose={() => setShareModal({ ...shareModal, isOpen: false })}
                context="SIGNAL"
                userName="EdIntel Delegate"
                userId={shareModal.id}
            />
        </div>
    );
}
