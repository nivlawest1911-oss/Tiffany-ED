'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Vibe = {
    id: string;
    label: string;
    video: string;
    color: string;
};

export const VIBES: Vibe[] = [
    { id: 'focus', label: 'Deep Work', video: '/videos/briefings/data_briefing.mp4', color: 'zinc' },
    { id: 'rally', label: 'District Rally', video: '/videos/briefings/principal_briefing.mp4', color: 'amber' },
    { id: 'emergency', label: 'Protocol Alert', video: '/videos/briefings/counselor_briefing.mp4', color: 'red' }
];

interface VibeContextType {
    currentVibe: Vibe;
    setVibe: (vibe: Vibe) => void;
    isCommandConsoleOpen: boolean;
    toggleCommandConsole: () => void;
}

const VibeContext = createContext<VibeContextType | undefined>(undefined);

export const SovereignVibeProvider = ({ children }: { children: ReactNode }) => {
    const [currentVibe, setVibe] = useState<Vibe>(VIBES[0]);
    const [isCommandConsoleOpen, setIsCommandConsoleOpen] = useState(false);

    const toggleCommandConsole = () => setIsCommandConsoleOpen(prev => !prev);

    return (
        <VibeContext.Provider value={{ currentVibe, setVibe, isCommandConsoleOpen, toggleCommandConsole }}>
            {children}
        </VibeContext.Provider>
    );
};

export const useSovereignVibe = () => {
    const context = useContext(VibeContext);
    if (!context) {
        throw new Error('useSovereignVibe must be used within a SovereignVibeProvider');
    }
    return context;
};
