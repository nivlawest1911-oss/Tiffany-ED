'use client';

import { useState, useEffect, useCallback } from 'react';

export type SovereignRank = {
    title: string;
    level: number;
    minXP: number;
    color: string;
    clearance: string;
};

export const RANKS: SovereignRank[] = [
    { title: "Probationary Agent", level: 1, minXP: 0, color: "text-zinc-500", clearance: "Level 1 (Restricted)" },
    { title: "Tactical Specialist", level: 2, minXP: 50, color: "text-emerald-500", clearance: "Level 2 (Active)" },
    { title: "Sovereign Strategist", level: 3, minXP: 150, color: "text-indigo-500", clearance: "Level 3 (Strategist)" },
    { title: "Field Commander", level: 4, minXP: 400, color: "text-amber-500", clearance: "Level 4 (Directive)" },
    { title: "District Commander", level: 5, minXP: 1000, color: "text-red-500", clearance: "Level 5 (Sovereign)" },
];

export function useSovereignRank() {
    const [xp, setXp] = useState(0);
    const [currentRank, setCurrentRank] = useState(RANKS[0]);

    // Load XP on mount
    useEffect(() => {
        const savedXP = localStorage.getItem('sovereign_xp');
        if (savedXP) setXp(parseInt(savedXP));
    }, []);

    // Save XP whenever it changes
    useEffect(() => {
        localStorage.setItem('sovereign_xp', xp.toString());

        // Determine rank
        const newRank = RANKS.slice().reverse().find(r => xp >= r.minXP) || RANKS[0];
        if (newRank.level !== currentRank.level) {
            setCurrentRank(newRank);
        }
    }, [xp]);

    const addXP = useCallback((amount: number) => {
        setXp(prev => prev + amount);
    }, []);

    const nextRank = RANKS[currentRank.level] || null;
    const progressToNext = nextRank
        ? ((xp - currentRank.minXP) / (nextRank.minXP - currentRank.minXP)) * 100
        : 100;

    return {
        xp,
        addXP,
        currentRank,
        nextRank,
        progressToNext,
        allRanks: RANKS
    };
}
