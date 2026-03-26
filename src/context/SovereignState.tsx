'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OnboardingData {
    role: string;
    districtName: string;
    objective: string;
    swarmAuthorized: boolean;
    completedAt?: string;
}

interface SovereignState {
    metacognitionPoints: number;
    userCredits: number;
    onboardingData: OnboardingData | null;
    addPoints: (amount: number) => void;
    useCredits: (amount: number) => boolean;
    updateOnboarding: (data: OnboardingData) => void;
}

const SovereignContext = createContext<SovereignState | undefined>(undefined);

export function SovereignProvider({ children }: { children: ReactNode }) {
    const [metacognitionPoints, setPoints] = useState(100);
    const [userCredits, setCredits] = useState(50);
    const [onboardingData, setOnboardingData] = useState<OnboardingData | null>(null);
    
    // Load persisted data on client only
    React.useEffect(() => {
        if (typeof window === 'undefined') return;
        try {
            const saved = localStorage.getItem('edintel_onboarding_data');
            if (saved) {
                setOnboardingData(JSON.parse(saved));
            }
        } catch {
            // localStorage may not be available
        }
    }, []);

    const addPoints = (amount: number) => {
        setPoints(prev => prev + amount);
    };

    const useCredits = (amount: number) => {
        if (userCredits >= amount) {
            setCredits(prev => prev - amount);
            return true;
        }
        return false;
    };

    const updateOnboarding = (data: OnboardingData) => {
        setOnboardingData(data);
        if (typeof window !== 'undefined') {
            try {
                localStorage.setItem('edintel_onboarding_data', JSON.stringify(data));
                // Broadcast for other nodes/tabs
                window.dispatchEvent(new CustomEvent('sovereign-node-sync', { detail: data }));
            } catch {
                // localStorage may not be available
            }
        }
    };

    return (
        <SovereignContext.Provider value={{
            metacognitionPoints,
            userCredits,
            onboardingData,
            addPoints,
            useCredits,
            updateOnboarding
        }}>
            {children}
        </SovereignContext.Provider>
    );
}

export function useSovereignState() {
    const context = useContext(SovereignContext);
    if (context === undefined) {
        throw new Error('useSovereignState must be used within a SovereignProvider');
    }
    return context;
}
