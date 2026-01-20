'use client';
import { useEffect, useState } from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

export default function SystemHealthTile() {
    const [health, setHealth] = useState({ status: 'loading', latency: '--', aiReady: false });

    useEffect(() => {
        fetch('/api/health')
            .then(res => res.json())
            .then(data => setHealth(data))
            .catch(() => setHealth({ status: 'error', latency: 'inf', aiReady: false }));
    }, []);

    const isOK = health.status === 'operational';

    return (
        <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg ${isOK ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'}`}>
                    {isOK ? <ShieldCheck size={24} /> : <AlertTriangle size={24} />}
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-xs font-mono text-zinc-400">{health.latency}</span>
                    <span className="flex items-center gap-1.5 mt-1">
                        <span className={`w-2 h-2 rounded-full ${isOK ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                        <span className="text-[10px] font-bold uppercase text-zinc-500">{isOK ? 'Live' : 'Offline'}</span>
                    </span>
                </div>
            </div>

            <div>
                <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider">AI Strategic Link</h3>
                <p className={`text-xl font-semibold ${isOK ? 'text-zinc-900 dark:text-white' : 'text-red-500'}`}>
                    {isOK ? 'Operational' : 'Link Severed'}
                </p>
            </div>

            <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1 rounded-full overflow-hidden">
                <div className={`h-full transition-all duration-1000 ${isOK ? 'w-full bg-green-500' : 'w-1/3 bg-red-500'}`} />
            </div>
        </div>
    );
}
