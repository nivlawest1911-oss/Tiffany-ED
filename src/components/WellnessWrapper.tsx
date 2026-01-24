'use client';

import React from 'react';

interface WellnessWrapperProps {
    isWellnessMode: boolean;
    children: React.ReactNode;
}

export default function WellnessWrapper({ isWellnessMode, children }: WellnessWrapperProps) {
    return (
        <div className={`relative min-h-screen transition-all duration-1000 ${isWellnessMode ? 'backdrop-blur-md' : ''
            }`}>
            {/* Background Liquid Glow */}
            <div className={`wellness-glow-container ${isWellnessMode ? 'opacity-100' : 'opacity-0'}`}>
                <div className="blob blob-emerald" />
                <div className="blob blob-gold" />

                {/* Gemini Flow Movie Background (Placeholder URL for now) */}
                {isWellnessMode && (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
                    >
                        <source src="https://tucspkptgrjgcccdacnw.supabase.co/storage/v1/object/public/edintel-media/gemini-flow.mp4" type="video/mp4" />
                    </video>
                )}
            </div>

            {/* Main Content */}
            <div className="relative z-10 transition-all duration-1000">
                {children}
            </div>
        </div>
    );
}
