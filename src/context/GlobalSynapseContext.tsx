'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authClient } from '@/lib/auth-client';

export type AuthHandshakeStatus = 'INITIALIZING' | 'ACTIVE' | 'UPLINK_REQUIRED' | 'INTERRUPTED' | 'IDENTITY_PROVISIONED';

interface GlobalSynapseState {
    // ðŸ›ï¸ Metadata & Telemetry
    authStatus: AuthHandshakeStatus;
    uplinkHealth: number; // 0-100%
    wellnessSync: 'STABLE' | 'SYNCING' | 'INTERRUPTED' | 'STANDBY';
    curriculumLoad: number; // 0-100% active Ð¿ÐµÐ´Ð°Ð³Ð¾Ð³Ð¸ÐºÐ° nodes
    
    // ðŸ§  Telemetry Controllers
    setAuthStatus: (status: AuthHandshakeStatus) => void;
    setUplinkHealth: (health: number) => void;
    setWellnessSync: (status: 'STABLE' | 'SYNCING' | 'INTERRUPTED' | 'STANDBY') => void;
    setCurriculumLoad: (load: number) => void;
}

const GlobalSynapseContext = createContext<GlobalSynapseState | undefined>(undefined);

export function GlobalSynapseProvider({ children }: { children: ReactNode }) {
    const [authStatus, setAuthStatus] = useState<AuthHandshakeStatus>('INITIALIZING');
    const [uplinkHealth, setUplinkHealth] = useState(0);
    const [wellnessSync, setWellnessSync] = useState<'STABLE' | 'SYNCING' | 'INTERRUPTED' | 'STANDBY'>('STANDBY');
    const [curriculumLoad, setCurriculumLoad] = useState(0);
    
    const { data: session, isPending } = authClient.useSession();

    // ðŸ“¡ Neural Status Synchronizer
    useEffect(() => {
        if (isPending) {
            setAuthStatus('INITIALIZING');
        } else if (session) {
            setAuthStatus('ACTIVE');
            setUplinkHealth(100);
            setWellnessSync('STABLE');
        } else {
            setAuthStatus('UPLINK_REQUIRED');
            setUplinkHealth(0);
        }
    }, [session, isPending]);

    // ðŸ§  Simulated Pedagogical Pulse (Integration strings)
    useEffect(() => {
        if (authStatus === 'ACTIVE') {
            const interval = setInterval(() => {
                setCurriculumLoad(prev => {
                    const next = prev + (Math.random() * 5);
                    return next > 95 ? 95 : next;
                });
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [authStatus]);

    return (
        <GlobalSynapseContext.Provider value={{
            authStatus,
            uplinkHealth,
            wellnessSync,
            curriculumLoad,
            setAuthStatus,
            setUplinkHealth,
            setWellnessSync,
            setCurriculumLoad
        }}>
            {children}
        </GlobalSynapseContext.Provider>
    );
}

export function useGlobalSynapse() {
    const context = useContext(GlobalSynapseContext);
    if (context === undefined) {
        throw new Error('useGlobalSynapse must be used within a GlobalSynapseProvider');
    }
    return context;
}
