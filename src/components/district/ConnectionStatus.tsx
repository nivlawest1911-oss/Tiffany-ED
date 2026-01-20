"use client";

import { strategicCloud } from '@/lib/professional-cloud';
import { Wifi, WifiOff, Activity } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ConnectionStatus() {
    const [isOnline, setIsOnline] = useState(false);
    const [latency, setLatency] = useState(0);

    const checkConnection = async () => {
        const start = Date.now();
        const online = await strategicCloud.checkConnection();
        const end = Date.now();
        setIsOnline(online);
        if (online) setLatency(end - start);
    };

    useEffect(() => {
        checkConnection();
        const interval = setInterval(checkConnection, 30000); // Check every 30s
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-6 right-6 flex items-center gap-4 z-50">
            <div className={`
                flex items-center gap-3 px-4 py-2 rounded-full border backdrop-blur-md shadow-2xl transition-all duration-500
                ${isOnline
                    ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-400'
                    : 'bg-red-950/80 border-red-500/30 text-red-400'}
            `}>
                <div className="relative">
                    {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                    {isOnline && <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />}
                </div>

                <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest">
                        {isOnline ? 'Professional Connection' : 'Local Mode'}
                    </span>
                    {isOnline && (
                        <span className="text-[8px] font-mono opacity-70">
                            Latency: {latency}ms
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
