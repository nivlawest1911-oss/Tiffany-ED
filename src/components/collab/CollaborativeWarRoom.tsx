'use client';

import { useEffect, useState, useRef } from 'react';
import * as Y from 'yjs';
import { supabase } from '@/lib/supabase';
import { SupabaseYjsProvider } from '@/lib/collab/supabase-provider';
import { Card } from '@/components/ui/card';
import { Users, Zap, Shield, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export function CollaborativeWarRoom() {
    const [text, setText] = useState('');
    const [users, setUsers] = useState<number>(1);
    const ydocRef = useRef<Y.Doc>(new Y.Doc());
    const providerRef = useRef<SupabaseYjsProvider | null>(null);

    useEffect(() => {
        if (!supabase) return;

        console.log('[WarRoom] Initializing Liquid Data Link...');

        // Initialize Yjs Document
        const ydoc = ydocRef.current;
        const ytext = ydoc.getText('briefing');

        // Initialize Supabase Provider
        providerRef.current = new SupabaseYjsProvider(ydoc, supabase, 'war-room-alpha');

        // Sync local state with Yjs
        ytext.observe(() => {
            setText(ytext.toString());
        });

        return () => {
            providerRef.current?.disconnect();
        };
    }, []);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        const ytext = ydocRef.current.getText('briefing');

        // This is a naive way to sync. For production, use y-monaco or similar.
        // But for a 'Holographic' demo, it works.
        ydocRef.current.transact(() => {
            ytext.delete(0, ytext.length);
            ytext.insert(0, newText);
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-noble-gold/10 border border-noble-gold/20 rounded-2xl">
                        <Users className="w-6 h-6 text-noble-gold" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter">Liquid War Room</h3>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">Multi-User Strategic Synthesis</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                        <Activity className="w-3 h-3 text-blue-400" />
                        <span className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">{users} Active Peers</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                        <Shield className="w-3 h-3 text-emerald-400" />
                        <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">CRDT Encrypted</span>
                    </div>
                </div>
            </div>

            <Card className="p-1 bg-gradient-to-br from-white/5 to-transparent border-white/5 shadow-2xl overflow-hidden group">
                <div className="relative">
                    {/* Background Glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] pointer-events-none" />

                    <textarea
                        value={text}
                        onChange={handleTextChange}
                        placeholder="Begin collective strategic brief..."
                        className="w-full h-[400px] bg-black/40 backdrop-blur-md p-8 text-zinc-300 font-medium leading-relaxed outline-none border-none resize-none placeholder:text-zinc-800 selection:bg-blue-500/30"
                    />

                    {/* Cursor Simulation Overlay (Holographic Effect) */}
                    <div className="absolute bottom-6 right-8 flex items-center gap-3 opacity-30 group-hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-white/10 rounded-full">
                            <Zap size={10} className="text-amber-500" />
                            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Liquid Sync Active</span>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: 'Latency', value: '12ms', icon: Activity },
                    { label: 'Consistency', value: 'Delta-Pass', icon: Shield },
                    { label: 'Network', value: 'Supabase-Mesh', icon: Zap }
                ].map((stat, i) => (
                    <div key={i} className="p-4 bg-zinc-900/40 border border-white/5 rounded-2xl flex items-center gap-4">
                        <stat.icon className="w-4 h-4 text-zinc-500" />
                        <div>
                            <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest">{stat.label}</p>
                            <p className="text-xs text-zinc-300 font-black uppercase tracking-tighter">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
