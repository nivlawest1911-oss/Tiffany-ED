'use client';

import { useState, useEffect, useCallback } from 'react';

export type LeadershipRank = {
    title: string;
    level: number;
    minXP: number;
    color: string;
    clearance: string;
};

export const LEADERSHIP_RANKS: LeadershipRank[] = [
    { title: "New Leader", level: 1, minXP: 0, color: "text-zinc-500", clearance: "Initial Access" },
    { title: "Professional Associate", level: 2, minXP: 50, color: "text-emerald-500", clearance: "Professional Access" },
    { title: "Strategic Lead", level: 3, minXP: 150, color: "text-indigo-500", clearance: "Strategic Access" },
    { title: "Executive Principal", level: 4, minXP: 400, color: "text-amber-500", clearance: "Executive Access" },
    { title: "District Superintendent", level: 5, minXP: 1000, color: "text-red-500", clearance: "Superintendent Access" },
];

export function useLeadershipRank() {
    const [xp, setXp] = useState(0);
    const [currentRank, setCurrentRank] = useState(LEADERSHIP_RANKS[0]);

    // Load XP on mount
    useEffect(() => {
        const savedXP = localStorage.getItem('leadership_xp') || localStorage.getItem('sovereign_xp');
        if (savedXP) setXp(parseInt(savedXP));
    }, []);

    // Save XP whenever it changes
    useEffect(() => {
        localStorage.setItem('leadership_xp', xp.toString());

        // Determine rank
        const newRank = LEADERSHIP_RANKS.slice().reverse().find(r => xp >= r.minXP) || LEADERSHIP_RANKS[0];
        if (newRank.level !== currentRank.level) {
            setCurrentRank(newRank);
        }
    }, [xp]);

    const addXP = useCallback((amount: number) => {
        setXp(prev => prev + amount);
    }, []);

    const nextRank = LEADERSHIP_RANKS[currentRank.level] || null;
    const progressToNext = nextRank
        ? ((xp - currentRank.minXP) / (nextRank.minXP - currentRank.minXP)) * 100
        : 100;

    return {
        xp,
        addXP,
        currentRank,
        nextRank,
        progressToNext,
        allRanks: LEADERSHIP_RANKS
    };
}
