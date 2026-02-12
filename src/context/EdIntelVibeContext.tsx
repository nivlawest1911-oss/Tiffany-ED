'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Vibe = {
    id: string;
    label: string;
    video: string;
    color: string;
    route: string;
};

export const VIBES: Vibe[] = [
    { id: 'edintel', label: 'EdIntel Protocol', video: '/videos/District_Command_Update.mp4', color: 'noble-gold', route: '/dashboard' },
    { id: 'focus', label: 'Deep Work', video: '/videos/briefings/data_briefing.mp4', color: 'zinc', route: '/gemini-workspace' },
    { id: 'rally', label: 'District Rally', video: '/videos/briefings/principal_briefing.mp4', color: 'amber', route: '/analytics' },
    { id: 'emergency', label: 'Protocol Alert', video: '/videos/briefings/counselor_briefing.mp4', color: 'red', route: '/support/topic/compliance' }
];

interface VibeContextType {
    currentVibe: Vibe;
    setVibe: (vibe: Vibe) => void;
    isCommandConsoleOpen: boolean;
    toggleCommandConsole: () => void;
    isSystemThinking: boolean;
    setSystemThinking: (isThinking: boolean) => void;
}

const VibeContext = createContext<VibeContextType | undefined>(undefined);

export const EdIntelVibeProvider = ({ children }: { children: ReactNode }) => {
    const [currentVibe, setVibeState] = useState<Vibe>(VIBES[0]);
    const [isCommandConsoleOpen, setIsCommandConsoleOpen] = useState(false);
    const [isSystemThinking, setSystemThinking] = useState(false);

    // Load persisted vibe
    useEffect(() => {
        const savedVibeId = localStorage.getItem('EdIntel_vibe');
        if (savedVibeId) {
            const savedVibe = VIBES.find(v => v.id === savedVibeId);
            if (savedVibe) setVibeState(savedVibe);
        }
    }, []);

    const setVibe = (vibe: Vibe) => {
        setVibeState(vibe);
        localStorage.setItem('EdIntel_vibe', vibe.id);
    };

    const toggleCommandConsole = () => setIsCommandConsoleOpen(prev => !prev);

    // Update global CSS variable for system thinking state
    useEffect(() => {
        if (typeof document !== 'undefined') {
            document.documentElement.style.setProperty(
                '--system-thinking-pulse',
                isSystemThinking ? '1' : '0'
            );
        }
    }, [isSystemThinking]);

    return (
        <VibeContext.Provider value={{
            currentVibe,
            setVibe,
            isCommandConsoleOpen,
            toggleCommandConsole,
            isSystemThinking,
            setSystemThinking
        }}>
            {children}
        </VibeContext.Provider>
    );
};

export const useEdIntelVibe = () => {
    const context = useContext(VibeContext);
    if (!context) {
        throw new Error('useEdIntelVibe must be used within a EdIntelVibeProvider');
    }
    return context;
};
