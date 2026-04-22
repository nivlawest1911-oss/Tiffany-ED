'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProfessionalHumanoidProps {
    imageUrl?: string;
    name?: string;
    title?: string;
    phase?: 'intro' | 'active' | 'highlight';
    className?: string;
}

export default function ProfessionalHumanoid({
    imageUrl,
    name = "Alvin West Jr.",
    title = "Founder & CEO",
    phase = 'intro',
    className = ""
}: ProfessionalHumanoidProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`relative flex flex-col items-center gap-6 ${className}`}
        >
            {/* Holographic Frame */}
            <div className="relative w-64 h-80">
                {/* Outer Glow Ring */}
                <motion.div
                    animate={{
                        boxShadow: phase === 'highlight'
                            ? ['0 0 30px rgba(255,179,0,0.4)', '0 0 50px rgba(255,179,0,0.6)', '0 0 30px rgba(255,179,0,0.4)']
                            : '0 0 20px rgba(0,229,255,0.3)'
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 rounded-3xl border-2 border-gradient-to-b from-[#FFB300]/60 to-[#00E5FF]/40"
                />

                {/* Glass Panel Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-3xl backdrop-blur-xl overflow-hidden">
                    {/* Scan Lines Effect */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-20"
                        style={{
                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 229, 255, 0.1) 2px, rgba(0, 229, 255, 0.1) 4px)',
                        }}
                    />

                    {/* Humanoid Image or Silhouette */}
                    <div className="absolute inset-4 rounded-2xl overflow-hidden bg-gradient-to-br from-[#FFB300]/10 to-[#00E5FF]/10">
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt={name}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            // Professional Humanoid Placeholder with Business Attire
                            <svg
                                viewBox="0 0 200 300"
                                className="w-full h-full"
                                style={{ filter: 'drop-shadow(0 0 15px rgba(255,179,0,0.3))' }}
                            >
                                <defs>
                                    <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#2C3E50" stopOpacity="0.9" />
                                        <stop offset="50%" stopColor="#34495E" stopOpacity="0.85" />
                                        <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0.8" />
                                    </linearGradient>
                                    <filter id="professionalGlow">
                                        <feGaussianBlur stdDeviation="1.5" result="blur" />
                                        <feMerge>
                                            <feMergeNode in="blur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                {/* Head */}
                                <motion.circle
                                    cx="100"
                                    cy="50"
                                    r="28"
                                    fill="#C19A6B"
                                    filter="url(#professionalGlow)"
                                    animate={{ y: [0, -2, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                />

                                {/* Business Suit - Jacket */}
                                <motion.path
                                    d="M 60 75 Q 60 85 65 95 L 65 200 Q 65 210 75 215 L 75 270 L 125 270 L 125 215 Q 135 210 135 200 L 135 95 Q 140 85 140 75 Z"
                                    fill="url(#bodyGrad)"
                                    filter="url(#professionalGlow)"
                                    animate={{ scale: [1, 1.01, 1] }}
                                    transition={{ duration: 2.5, repeat: Infinity }}
                                />

                                {/* Dress Shirt Front */}
                                <rect x="85" y="85" width="30" height="80" fill="#F5F5F5" opacity="0.8" />

                                {/* Tie */}
                                <path
                                    d="M 95 85 L 100 85 L 102 135 L 98 135 Z"
                                    fill="#E74C3C"
                                    opacity="0.9"
                                    filter="url(#professionalGlow)"
                                />

                                {/* Arms - Professional */}
                                <motion.path
                                    d="M 65 95 L 40 140 L 38 200"
                                    stroke="#2C3E50"
                                    strokeWidth="14"
                                    fill="none"
                                    strokeLinecap="round"
                                    animate={{ x: [0, 3, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    filter="url(#professionalGlow)"
                                />
                                <motion.path
                                    d="M 135 95 L 160 140 L 162 200"
                                    stroke="#2C3E50"
                                    strokeWidth="14"
                                    fill="none"
                                    strokeLinecap="round"
                                    animate={{ x: [0, -3, 0] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                    filter="url(#professionalGlow)"
                                />

                                {/* Holographic Data Streams */}
                                <motion.circle
                                    cx="100"
                                    cy="140"
                                    r="12"
                                    fill="#FFB300"
                                    fillOpacity="0.4"
                                    animate={{ r: [12, 18, 12], opacity: [0.4, 0.1, 0.4] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />

                                {/* Professional Badges/Icons around figure */}
                                {[0, 1, 2].map((i) => (
                                    <motion.circle
                                        key={i}
                                        cx={100 + Math.cos(i * 120 * Math.PI / 180) * 55}
                                        cy={100 + Math.sin(i * 120 * Math.PI / 180) * 55}
                                        r="6"
                                        fill="#00E5FF"
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                    />
                                ))}
                            </svg>
                        )}
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#FFB300]/60 rounded-tl-lg" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#00E5FF]/60 rounded-tr-lg" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#00E5FF]/60 rounded-bl-lg" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#FFB300]/60 rounded-br-lg" />
                </div>
            </div>

            {/* Information Panel */}
            {(name || title) && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-center space-y-2"
                >
                    <h3 className="text-lg font-black text-white uppercase tracking-tighter">
                        {name}
                    </h3>
                    <p className="text-xs font-bold text-[#FFB300] uppercase tracking-[0.2em]">
                        {title}
                    </p>
                </motion.div>
            )}
        </motion.div>
    );
}
