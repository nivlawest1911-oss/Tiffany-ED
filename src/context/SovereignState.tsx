'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SovereignState {
    metacognitionPoints: number;
    userCredits: number;
    addPoints: (amount: number) => void;
    useCredits: (amount: number) => boolean;
}

const SovereignContext = createContext<SovereignState | undefined>(undefined);

export function SovereignProvider({ children }: { children: ReactNode }) {
    const [metacognitionPoints, setPoints] = useState(100);
    const [userCredits, setCredits] = useState(50);

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

    return (
        <SovereignContext.Provider value={{ metacognitionPoints, userCredits, addPoints, useCredits }}>
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
