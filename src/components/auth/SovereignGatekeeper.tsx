'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, ShieldAlert, Zap, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EdIntelLogo from '@/components/EdIntelLogo';
import { NAV_LINKS } from '@/config/navigation';

interface SovereignGatekeeperProps {
    children: ReactNode;
}

const TIER_MAP: Record<string, number> = {
    'Sovereign Initiate': 0,
    'Standard Pack': 1,
    'Sovereign Pack': 2,
    'Practitioner': 3,
    'Director Pack': 4,
    'Site Command': 5
};

/**
 * Sovereign Gatekeeper: The definitive access control layer for EdIntel's 12 Sovereign Nodes.
 * Provides cinematic "Denied" states and synchronized tier checks.
 */
export const SovereignGatekeeper = ({ children }: SovereignGatekeeperProps) => {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    const [requiredTier, setRequiredTier] = useState<number>(0);

    useEffect(() => {
        if (isLoading) return;

        if (!user) {
            router.push('/login');
            return;
        }

        // 1. Identify the current node and its required tier from NAV_LINKS
        let minTier = 0;

        Object.values(NAV_LINKS).forEach((category) => {
            category.forEach((item: any) => {
                if (pathname.startsWith(item.href)) {
                    minTier = item.minTier;
                }
            });
        });

        setRequiredTier(minTier);

        // 2. Map user tier string to index
        const userTierIndex = TIER_MAP[user.tier] || 0;

        // 3. Authorization Logic
        if (userTierIndex >= minTier) {
            setIsAuthorized(true);
        } else {
            setIsAuthorized(false);
        }
    }, [user, isLoading, pathname, router]);

    // Loading State (Shared with ExecutiveGuard aesthetics)
    if (isLoading || isAuthorized === null) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-yellow-600/5 opacity-50" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 flex flex-col items-center"
                >
                    <EdIntelLogo variant="fidelity" size={80} showText={false} animated={true} />
                    <div className="mt-12 flex flex-col items-center gap-4">
                        <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
                        <p className="text-[10px] tracking-[0.4em] text-amber-400/80 uppercase font-black animate-pulse">
                            Synchronizing Gatekeeper
                        </p>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Denied State: The "Cinematic Gatekeeper" UI
    if (!isAuthorized) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-black relative p-6 overflow-hidden">
                {/* Background Grid & Glow */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 blur-[120px] rounded-full pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10 max-w-lg w-full text-center space-y-8"
                >
                    <div className="flex justify-center">
                        <div className="relative">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full"
                            />
                            <div className="relative bg-zinc-900 border border-red-500/30 p-6 rounded-[2rem] shadow-2xl shadow-red-500/10">
                                <Lock className="w-12 h-12 text-red-500" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-center gap-3 text-red-400">
                            <ShieldAlert className="w-4 h-4" />
                            <span className="text-xs font-black uppercase tracking-[0.4em]">Access Restricted</span>
                        </div>
                        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">
                            Sovereign <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Gatekeeper</span> Protocol
                        </h2>
                        <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                            This node requires <span className="text-white font-bold uppercase">{Object.keys(TIER_MAP).find(key => TIER_MAP[key] === requiredTier)}</span> credentials or higher. Your current intelligence clearance is below the operational threshold.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                        <Button
                            variant="ghost"
                            onClick={() => router.push('/dashboard')}
                            className="bg-zinc-900/50 border-white/5 text-zinc-400 hover:text-white hover:bg-white/5 py-6 rounded-2xl flex items-center gap-2 group"
                        >
                            <Home className="w-4 h-4" />
                            Command Center
                        </Button>
                        <Button
                            onClick={() => router.push('/pricing')}
                            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-black uppercase tracking-widest py-6 rounded-2xl shadow-xl shadow-red-600/20 group"
                        >
                            Upgrade Tier
                            <Zap className="w-4 h-4 ml-2 fill-current" />
                        </Button>
                    </div>

                    <div className="flex items-center justify-center gap-2 pt-8 opacity-20 hover:opacity-100 transition-opacity">
                        <div className="h-[1px] w-12 bg-zinc-800" />
                        <span className="text-[10px] font-mono text-zinc-600 tracking-tighter">ENCRYPTION: AES-256-GCM ACTIVE</span>
                        <div className="h-[1px] w-12 bg-zinc-800" />
                    </div>
                </motion.div>
            </div>
        );
    }

    return <>{children}</>;
};
