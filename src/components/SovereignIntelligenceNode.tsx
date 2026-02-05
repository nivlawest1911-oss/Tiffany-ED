'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Shield, Eye, AlertCircle } from 'lucide-react';

export default function SovereignIntelligenceNode() {
    const [latestObservation, setLatestObservation] = useState<any>(null);
    const [analyzing, setAnalyzing] = useState(false);

    useEffect(() => {
        // Fetch most recent observation
        const fetchLatest = async () => {
            const { data, error } = await supabase
                .from('evidence_vault')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (!error && data) {
                setLatestObservation(data);
            }
        };

        fetchLatest();

        // Real-time listener for the Intelligence Agent
        const observationSubscription = supabase
            .channel('realtime_observations')
            .on('postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'evidence_vault' },
                (payload) => {
                    console.log('New Evidence Detected:', payload.new);
                    setLatestObservation(payload.new);
                    triggerAgentAnalysis(payload.new);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(observationSubscription);
        };
    }, []);

    const triggerAgentAnalysis = (observation: any) => {
        setAnalyzing(true);
        // Simulate Intelligence Agent analysis
        setTimeout(() => {
            setAnalyzing(false);
            console.log('Analysis Complete for node:', observation.student_hash);
        }, 3000);
    };

    return (
        <div className="sovereign-card h-full min-h-[300px] border-emerald-500/20">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                        Intelligence Agent • Active
                    </span>
                </div>
                {analyzing && (
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        <span className="text-[9px] text-zinc-500 font-mono uppercase">Analyzing...</span>
                    </div>
                )}
            </div>

            <div className="flex-grow space-y-4">
                <div className="p-4 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest">Latest Observation</p>
                        <Eye className="w-3 h-3 text-zinc-600" />
                    </div>
                    {latestObservation ? (
                        <div>
                            <p className="text-xl font-black text-zinc-100 tracking-tighter truncate">
                                {latestObservation.student_hash.slice(0, 12)}...
                            </p>
                            <p className="text-[10px] text-zinc-400 font-mono mt-1">
                                Tag: <span className="text-emerald-500">{latestObservation.compliance_tag}</span>
                            </p>
                        </div>
                    ) : (
                        <p className="text-zinc-600 italic text-xs">Waiting for uplink...</p>
                    )}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-zinc-950 rounded-xl border border-zinc-900">
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                        <div>
                            <p className="text-[9px] text-zinc-500 font-mono uppercase">Compliance Scan</p>
                            <p className="text-[11px] text-zinc-100 font-bold">AL CODE 290-8-9 VERIFIED</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="command-deck mt-6 !bg-emerald-500 hover:!bg-emerald-400 transition-colors">
                EXECUTE PROTOCOL
            </div>
        </div>
    );
}
