'use client';
import React from 'react';

export const AuroraCard = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative group overflow-hidden rounded-[2rem] p-[1px]">
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-emerald-400 to-purple-500 opacity-20 group-hover:opacity-40 transition-opacity blur-xl" />

            <div className="relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 h-full">
                {children}
            </div>
        </div>
    );
};
