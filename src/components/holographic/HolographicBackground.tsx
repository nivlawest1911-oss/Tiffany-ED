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
                        className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                        style={{
                            left: `${(i * 1.3) % 100}%`,
                            top: `${(i * 1.7) % 100}%`,
                            opacity: 0.3 + ((i * 0.1) % 0.7),
                            animationDelay: `${(i * 0.03) % 3}s`,
                            animationDuration: `${2 + (i * 0.02) % 2}s`,
                        }}
                    />
                ))}
            </div>

            {/* Floating holographic cubes - CSS 3D transforms */}
            <div className="absolute inset-0" style={{ perspective: '1000px' }}>
                {/* Cyan cube */}
                <div 
                    className="absolute w-20 h-20 animate-spin"
                    style={{
                        left: '60%',
                        top: '40%',
                        animationDuration: '15s',
                        transformStyle: 'preserve-3d',
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-cyan-400/10 border border-cyan-500/50 backdrop-blur-sm rounded-lg shadow-[0_0_30px_rgba(0,176,255,0.3)]" />
                </div>

                {/* Purple cube */}
                <div 
                    className="absolute w-16 h-16 animate-spin"
                    style={{
                        left: '25%',
                        top: '30%',
                        animationDuration: '20s',
                        animationDirection: 'reverse',
                        transformStyle: 'preserve-3d',
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-purple-400/10 border border-purple-500/50 backdrop-blur-sm rounded-lg shadow-[0_0_30px_rgba(139,92,246,0.3)]" />
                </div>

                {/* Emerald cube */}
                <div 
                    className="absolute w-12 h-12 animate-spin"
                    style={{
                        left: '45%',
                        top: '70%',
                        animationDuration: '12s',
                        transformStyle: 'preserve-3d',
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-emerald-400/10 border border-emerald-500/50 backdrop-blur-sm rounded-lg shadow-[0_0_30px_rgba(16,185,129,0.3)]" />
                </div>
            </div>

            {/* Sparkle effects */}
            <div className="absolute inset-0">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={`sparkle-${i}`}
                        className="absolute w-2 h-2 bg-white rounded-full animate-ping"
                        style={{
                            left: `${(i * 5.7) % 100}%`,
                            top: `${(i * 4.9) % 100}%`,
                            animationDelay: `${(i * 0.25) % 5}s`,
                            animationDuration: `${1 + (i * 0.1) % 2}s`,
                        }}
                    />
                ))}
            </div>

            {/* Ambient glow effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        </div>
    )
}
