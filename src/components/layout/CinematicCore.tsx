'use client';

import React from 'react';

/**
 * SYSTEM 1: The Cinematic Core
 * 
 * This sits BEHIND everything. It never moves.
 * Provides persistent, high-end visual layer behind every page.
 */
const CinematicCore = () => {
    return (
        <div className="cinematic-layer">
            {/* 1. The Video/Image Layer */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="global-bg-video"
            >
                {/* Fallback to gradient if video doesn't load */}
                <source src="/videos/edintel-core-loop.mp4" type="video/mp4" />
            </video>

            {/* 2. The Texture Mesh (The "Grain") */}
            <div className="texture-mesh"></div>

            {/* 3. The Vignette (Focuses eyes on center) */}
            <div className="vignette-overlay"></div>
        </div>
    );
};

export default CinematicCore;
