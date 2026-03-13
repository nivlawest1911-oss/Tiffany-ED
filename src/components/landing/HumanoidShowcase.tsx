'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Bot, Sparkles, Zap, Shield } from 'lucide-react';

// Humanoid image assets
const HUMANOID_ASSETS = {
    banner: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/african-american-humanoid-web-banner-design_599862-2874-tBEoXaxRvtaGjpO8tHCes3MbXXw1GX.avif',
    isolated: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/african-american-robot-humanoid-isolated-background_599862-3042-LWvrkdAqWoxFBAu7kV0jq7tQRJSOSh.avif',
    office: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/african-american-businessman-standing-near-humanoid-robot-office-african-american-businessman-standing-near-humanoid-robot-221604342-qstrCmoInJgiZiX82F4i6LlFz0VDj7.webp'
};

const AI_FEATURES = [
    {
        icon: Bot,
        title: 'Autonomous Assistants',
        description: 'AI delegates that work 24/7 to handle routine tasks and communications'
    },
    {
        icon: Sparkles,
        title: 'Natural Interaction',
        description: 'Human-like conversations powered by advanced language models'
    },
    {
        icon: Zap,
        title: 'Instant Processing',
        description: 'Real-time analysis and response to complex educational scenarios'
    },
    {
        icon: Shield,
        title: 'Secure & Compliant',
        description: 'Enterprise-grade security with full FERPA compliance'
    }
];

export default function HumanoidShowcase() {
    return (
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,229,255,0.08),transparent_50%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,179,0,0.08),transparent_50%)]" />
                {/* Grid */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(0,229,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,179,0,0.1) 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-bold uppercase tracking-widest mb-6">
                        <Bot size={14} className="animate-pulse" />
                        AI-Powered Humanoid Assistants
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">
                        Your Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#FFB300]">Colleagues</span>
                    </h2>
                    <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
                        Advanced AI humanoids designed to augment your educational leadership with intelligent automation and natural interaction.
                    </p>
                </motion.div>

                {/* Main Showcase Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-16">
                    {/* Featured Humanoid - Banner Style */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-[#00E5FF]/30 group"
                    >
                        <Image
                            src={HUMANOID_ASSETS.banner}
                            alt="EdIntel AI Humanoid"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            unoptimized
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                        
                        {/* Scan line effect */}
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,229,255,0.03) 4px, rgba(0,229,255,0.03) 8px)',
                            }}
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                        />

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="px-3 py-1 bg-[#00E5FF]/20 border border-[#00E5FF]/40 rounded-full">
                                    <span className="text-[10px] font-bold text-[#00E5FF] uppercase tracking-widest flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
                                        AI Active
                                    </span>
                                </div>
                                <div className="px-3 py-1 bg-[#FFB300]/20 border border-[#FFB300]/40 rounded-full">
                                    <span className="text-[10px] font-bold text-[#FFB300] uppercase tracking-widest">
                                        Neural v4.1
                                    </span>
                                </div>
                            </div>
                            <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                                EdIntel AI Assistant
                            </h3>
                            <p className="text-zinc-400 text-sm max-w-md">
                                Next-generation humanoid interface for seamless educational administration and strategic decision-making.
                            </p>
                        </div>

                        {/* Corner accents */}
                        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#00E5FF]/50 rounded-tl-lg" />
                        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#FFB300]/50 rounded-tr-lg" />
                    </motion.div>

                    {/* Right Column - Stacked Cards */}
                    <div className="flex flex-col gap-8">
                        {/* Isolated Humanoid */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 group"
                        >
                            <Image
                                src={HUMANOID_ASSETS.isolated}
                                alt="Futuristic AI Robot"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60" />
                            <div className="absolute bottom-4 left-4 right-4">
                                <h4 className="text-xl font-black text-white uppercase tracking-tight">Autonomous Processing</h4>
                                <p className="text-xs text-zinc-400">Self-learning AI with adaptive behavior patterns</p>
                            </div>
                        </motion.div>

                        {/* Office Interaction */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 group"
                        >
                            <Image
                                src={HUMANOID_ASSETS.office}
                                alt="Human-AI Collaboration"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60" />
                            <div className="absolute bottom-4 left-4 right-4">
                                <h4 className="text-xl font-black text-white uppercase tracking-tight">Human-AI Synergy</h4>
                                <p className="text-xs text-zinc-400">Seamless collaboration between educators and AI assistants</p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Features Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    {AI_FEATURES.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-[#00E5FF]/30 transition-colors group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-[#00E5FF]/10 flex items-center justify-center mb-4 group-hover:bg-[#00E5FF]/20 transition-colors">
                                <feature.icon className="text-[#00E5FF]" size={24} />
                            </div>
                            <h4 className="text-white font-bold mb-2">{feature.title}</h4>
                            <p className="text-sm text-zinc-500">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
