"use client"

import React from "react"
import { motion } from "framer-motion"

export const AuroraBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-950">
            {/* Cinematic Aurora Layers */}
            <div className="absolute inset-0 opacity-30">
                <div className="animate-aurora-1 absolute -top-1/2 -left-1/2 h-full w-full rounded-full bg-gradient-to-r from-blue-600/40 to-indigo-600/20 blur-[120px]" />
                <div className="animate-aurora-2 absolute -bottom-1/2 -right-1/2 h-full w-full rounded-full bg-gradient-to-r from-purple-600/30 to-blue-500/20 blur-[120px]" />
                <div className="animate-aurora-3 absolute top-1/4 left-1/4 h-full w-full rounded-full bg-gradient-to-r from-emerald-500/10 to-blue-400/10 blur-[100px]" />
            </div>

            {/* Scannable Texture Overlay */}
            <div className="scanline animate-scan opacity-20" />

            {/* Noise / Grain */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.6)_100%)]" />
        </div>
    )
}
