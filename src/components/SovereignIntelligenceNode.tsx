'use client';

import React from 'react';

export default function SovereignIntelligenceNode() {
    const observations = [
        { time: '14:23', event: 'Compliance: Student AI_Code_290-8-9', status: 'RESOLVED' },
        { time: '13:45', event: 'Roster Index: 841 Records', status: 'SYNCED' },
        { time: '12:30', event: 'Cognitive Gym: 23 Active Sessions', status: 'MONITORING' },
        { time: '11:15', event: 'Leadership Protocol: Activated', status: 'ACTIVE' },
    ];

    return (
        <div className="dashboard-card">
            <div className="card-header">
                <div className="text-xs text-gray-500 uppercase tracking-wider flex items-center justify-between">
                    <span>Intelligence Agent // Node-02</span>
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                </div>
            </div>

            <div className="card-body">
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
                    Live Observation Feed
                </h3>
                <div className="space-y-3">
                    {observations.map((obs, i) => (
                        <div key={i} className="flex items-start gap-3 p-2 bg-zinc-900/50 rounded border border-zinc-800 hover:border-indigo-500/30 transition-colors">
                            <span className="text-xs font-mono text-indigo-500 flex-shrink-0">{obs.time}</span>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-300">{obs.event}</p>
                                <span className={`text-[10px] font-bold uppercase ${obs.status === 'RESOLVED' ? 'text-emerald-500' :
                                        obs.status === 'ACTIVE' ? 'text-amber-500' :
                                            'text-gray-500'
                                    }`}>
                                    {obs.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card-footer">
                View Analytics
            </div>
        </div>
    );
}
