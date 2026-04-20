'use client'
import React from 'react'

// CSS-based holographic background - replaces R3F Canvas which has compatibility issues with React 18
export function HolographicBackground() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0a0f1f] to-[#020617]" />
            
            {/* Animated stars */}
            <div className="absolute inset-0">
                {Array.from({ length: 100 }).map((_, i) => (
                    <div
                        key={i}
                        className={`absolute rounded-full animate-pulse holographic-star star-p-${(i % 20) + 1}`}
                    />
                ))}
            </div>

            {/* Floating holographic cubes - CSS 3D transforms */}
            <div className="absolute inset-0 holographic-perspective">
                {/* Cyan cube */}
                <div className="absolute w-20 h-20 animate-spin holographic-preserve-3d holographic-cube-cyan">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-cyan-400/10 border border-cyan-500/50 backdrop-blur-sm rounded-lg shadow-[0_0_30px_rgba(0,176,255,0.3)]" />
                </div>

                {/* Purple cube */}
                <div className="absolute w-16 h-16 animate-spin holographic-preserve-3d holographic-cube-purple">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-purple-400/10 border border-purple-500/50 backdrop-blur-sm rounded-lg shadow-[0_0_30px_rgba(139,92,246,0.3)]" />
                </div>

                {/* Emerald cube */}
                <div className="absolute w-12 h-12 animate-spin holographic-preserve-3d holographic-cube-emerald">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-emerald-400/10 border border-emerald-500/50 backdrop-blur-sm rounded-lg shadow-[0_0_30px_rgba(16,185,129,0.3)]" />
                </div>
            </div>

            {/* Sparkle effects */}
            <div className="absolute inset-0">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={`sparkle-${i}`}
                        className={`absolute w-2 h-2 bg-white rounded-full animate-ping sparkle-p-${i + 1}`}
                    />
                ))}
            </div>

            {/* Ambient glow effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse ambient-glow-pulse-4s" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse ambient-glow-pulse-5s-delayed" />
        </div>
    )
}
