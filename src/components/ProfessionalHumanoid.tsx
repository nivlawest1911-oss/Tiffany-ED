'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// Reference humanoid images
const HUMANOID_IMAGES = {
    banner: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/african-american-humanoid-web-banner-design_599862-2874-tBEoXaxRvtaGjpO8tHCes3MbXXw1GX.avif',
    isolated: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/african-american-robot-humanoid-isolated-background_599862-3042-LWvrkdAqWoxFBAu7kV0jq7tQRJSOSh.avif',
    office: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/african-american-businessman-standing-near-humanoid-robot-office-african-american-businessman-standing-near-humanoid-robot-221604342-qstrCmoInJgiZiX82F4i6LlFz0VDj7.webp'
};

interface ProfessionalHumanoidProps {
    variant?: 'banner' | 'isolated' | 'office' | 'svg';
    name?: string;
    title?: string;
    phase?: 'intro' | 'active' | 'highlight';
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export default function ProfessionalHumanoid({
    variant = 'svg',
    name = "EdIntel AI",
    title = "Intelligent Assistant",
    phase = 'intro',
    className = "",
    size = 'md'
}: ProfessionalHumanoidProps) {
    const sizeClasses = {
        sm: 'w-48 h-60',
        md: 'w-64 h-80',
        lg: 'w-80 h-[400px]'
    };

    const imageUrl = variant !== 'svg' ? HUMANOID_IMAGES[variant] : null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`relative flex flex-col items-center gap-6 ${className}`}
        >
            {/* Holographic Frame */}
            <div className={`relative ${sizeClasses[size]}`}>
                {/* Outer Glow Ring */}
                <motion.div
                    animate={{
                        boxShadow: phase === 'highlight'
                            ? ['0 0 40px rgba(0,229,255,0.5)', '0 0 60px rgba(0,229,255,0.7)', '0 0 40px rgba(0,229,255,0.5)']
                            : '0 0 30px rgba(0,229,255,0.4)'
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 rounded-3xl border-2 border-[#00E5FF]/50"
                />

                {/* Glass Panel Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/40 rounded-3xl backdrop-blur-xl overflow-hidden border border-white/10">
                    {/* Scan Lines Effect */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0, 229, 255, 0.05) 3px, rgba(0, 229, 255, 0.05) 6px)',
                        }}
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Humanoid Image or SVG */}
                    <div className="absolute inset-3 rounded-2xl overflow-hidden bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]">
                        {imageUrl ? (
                            <Image
                                src={imageUrl}
                                alt={name}
                                fill
                                className="object-cover object-center"
                                unoptimized
                            />
                        ) : (
                            // Futuristic Humanoid Robot SVG
                            <FuturisticRobotSVG phase={phase} />
                        )}
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#00E5FF]/70 rounded-tl-lg" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#00E5FF]/70 rounded-tr-lg" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#FFB300]/60 rounded-bl-lg" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#FFB300]/60 rounded-br-lg" />

                    {/* Status indicator */}
                    <motion.div
                        className="absolute top-4 right-4 flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <motion.div
                            className="w-2 h-2 rounded-full bg-[#00E5FF]"
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                        <span className="text-[8px] font-mono text-[#00E5FF]/80 uppercase tracking-wider">Online</span>
                    </motion.div>
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
                    <p className="text-xs font-bold text-[#00E5FF] uppercase tracking-[0.2em]">
                        {title}
                    </p>
                </motion.div>
            )}
        </motion.div>
    );
}

// Futuristic Robot SVG Component
function FuturisticRobotSVG({ phase }: { phase: string }) {
    return (
        <svg
            viewBox="0 0 200 320"
            className="w-full h-full p-4"
            style={{ filter: 'drop-shadow(0 0 20px rgba(0, 229, 255, 0.4))' }}
        >
            <defs>
                {/* Glossy black body gradient */}
                <linearGradient id="profRobotBody" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1f1f1f" />
                    <stop offset="40%" stopColor="#2a2a2a" />
                    <stop offset="60%" stopColor="#1a1a1a" />
                    <stop offset="100%" stopColor="#0f0f0f" />
                </linearGradient>
                {/* White accent panels */}
                <linearGradient id="profRobotAccent" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#d0d0d0" />
                </linearGradient>
                {/* Cyan glow */}
                <linearGradient id="profVisorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="100%" stopColor="#0097A7" />
                </linearGradient>
                <filter id="profGlow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                <filter id="profCyanGlow">
                    <feGaussianBlur stdDeviation="3" />
                    <feFlood floodColor="#00E5FF" floodOpacity="0.6" />
                    <feComposite operator="in" in2="blur" />
                    <feMerge>
                        <feMergeNode />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {/* HEAD - Sleek helmet */}
            <g filter="url(#profGlow)">
                {/* Main helmet */}
                <motion.path
                    d="M 100 15 C 135 15 150 35 150 55 C 150 80 135 90 100 90 C 65 90 50 80 50 55 C 50 35 65 15 100 15"
                    fill="url(#profRobotBody)"
                    stroke="#333"
                    strokeWidth="0.5"
                    animate={{ y: [0, -1, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                {/* White forehead accent */}
                <path d="M 82 22 Q 100 18 118 22 L 114 32 Q 100 28 86 32 Z" fill="url(#profRobotAccent)" />
                {/* Visor */}
                <motion.path
                    d="M 58 48 Q 100 40 142 48 Q 142 65 100 70 Q 58 65 58 48"
                    fill="url(#profVisorGrad)"
                    filter="url(#profCyanGlow)"
                    animate={{ opacity: [0.85, 1, 0.85] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                {/* Ear panels */}
                <ellipse cx="52" cy="52" rx="6" ry="12" fill="url(#profRobotAccent)" />
                <ellipse cx="148" cy="52" rx="6" ry="12" fill="url(#profRobotAccent)" />
            </g>

            {/* NECK */}
            <rect x="88" y="90" width="24" height="15" fill="url(#profRobotBody)" rx="4" />

            {/* TORSO */}
            <g filter="url(#profGlow)">
                <motion.path
                    d="M 60 105 L 140 105 L 135 170 Q 100 180 65 170 Z"
                    fill="url(#profRobotBody)"
                    stroke="#333"
                    strokeWidth="0.5"
                    animate={{ scale: [1, 1.005, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
                {/* Chest panel */}
                <rect x="78" y="118" width="44" height="35" rx="4" fill="#111" stroke="#00E5FF" strokeWidth="0.5" />
                <motion.rect
                    x="82" y="122" width="36" height="27" rx="2"
                    fill="#00E5FF"
                    opacity="0.15"
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                {/* Side accents */}
                <rect x="60" y="110" width="12" height="45" fill="url(#profRobotAccent)" rx="2" />
                <rect x="128" y="110" width="12" height="45" fill="url(#profRobotAccent)" rx="2" />
            </g>

            {/* ARMS */}
            <g filter="url(#profGlow)">
                {/* Left */}
                <motion.path
                    d="M 60 108 L 42 140 L 38 175 L 35 200"
                    stroke="url(#profRobotBody)"
                    strokeWidth="14"
                    fill="none"
                    strokeLinecap="round"
                    animate={{ rotate: [0, 1.5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <circle cx="42" cy="140" r="5" fill="url(#profRobotAccent)" />
                <circle cx="35" cy="200" r="7" fill="url(#profRobotBody)" stroke="#00E5FF" strokeWidth="1" />

                {/* Right */}
                <motion.path
                    d="M 140 108 L 158 140 L 162 175 L 165 200"
                    stroke="url(#profRobotBody)"
                    strokeWidth="14"
                    fill="none"
                    strokeLinecap="round"
                    animate={{ rotate: [0, -1.5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                />
                <circle cx="158" cy="140" r="5" fill="url(#profRobotAccent)" />
                <circle cx="165" cy="200" r="7" fill="url(#profRobotBody)" stroke="#00E5FF" strokeWidth="1" />
            </g>

            {/* LOWER BODY */}
            <path d="M 65 170 Q 100 185 135 170 L 130 215 Q 100 225 70 215 Z" fill="url(#profRobotBody)" />

            {/* LEGS */}
            <g filter="url(#profGlow)">
                <path d="M 78 215 L 75 265 L 72 305" stroke="url(#profRobotBody)" strokeWidth="12" fill="none" strokeLinecap="round" />
                <path d="M 122 215 L 125 265 L 128 305" stroke="url(#profRobotBody)" strokeWidth="12" fill="none" strokeLinecap="round" />
                <circle cx="75" cy="265" r="4" fill="url(#profRobotAccent)" />
                <circle cx="125" cy="265" r="4" fill="url(#profRobotAccent)" />
                <ellipse cx="72" cy="310" rx="12" ry="6" fill="url(#profRobotBody)" />
                <ellipse cx="128" cy="310" rx="12" ry="6" fill="url(#profRobotBody)" />
            </g>

            {/* GLOW ACCENTS */}
            <motion.circle
                cx="100" cy="135" r="5"
                fill="#00E5FF"
                filter="url(#profCyanGlow)"
                animate={{ r: [4, 7, 4], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.circle cx="60" cy="108" r="3" fill="#00E5FF" filter="url(#profCyanGlow)"
                animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.circle cx="140" cy="108" r="3" fill="#00E5FF" filter="url(#profCyanGlow)"
                animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.4 }} />
        </svg>
    );
}
