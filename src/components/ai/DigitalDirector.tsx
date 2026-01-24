'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import React from 'react';

export const DigitalDirector = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    // Note: This is an architectural shell for the HeyGen/Kling Streaming SDK.
    // In production, this connects to the /api/ai/greet endpoint for dynamic session initialization.

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <motion.div
                drag
                whileHover={{ scale: 1.05 }}
                className="relative group cursor-pointer"
            >
                {/* Gemini Flow Halo */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400 to-blue-600 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />

                {/* The Digital Dr. West Container */}
                <div className="relative h-32 w-32 md:h-48 md:w-48 rounded-full border-2 border-white/10 overflow-hidden bg-black shadow-2xl">
                    <video
                        ref={videoRef}
                        autoPlay
                        muted
                        loop
                        className="h-full w-full object-cover grayscale-[20%] hover:grayscale-0 transition-all"
                        poster="/dr-west-static.png"
                        src="/videos/dr-west-loop.mp4" // Placeholder for Kling AI Loop
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                </div>

                {/* Status Indicator */}
                <div className="absolute bottom-4 right-4 h-4 w-4 bg-emerald-500 rounded-full border-2 border-black shadow-[0_0_10px_#10b981] z-20" />
            </motion.div>
        </div>
    );
};
