"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"
import { gsap } from "gsap"
import { Plus, MapPin, ArrowRight, Shield, BookOpen, ChevronDown, Activity, MessageSquare } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import HolographicBriefing from '@/components/intelligence/HolographicBriefing';
import HumanAvatar from '@/components/ui/HumanAvatar';

interface EdIntelHeroProps {
    variant?: 'cinematic' | 'holographic';
    activeAgent?: number;
    agents?: any[];
    message?: string | null;
}

export function EdIntelHero({
    variant = 'cinematic',
    activeAgent = 0,
    agents = [],
    message = null
}: EdIntelHeroProps) {

    if (variant === 'holographic') {
        return <HolographicVariant activeAgent={activeAgent} agents={agents} message={message} />;
    }

    return <CinematicVariant />;
}

function HolographicVariant({ activeAgent, agents, message }: { activeAgent: number, agents: any[], message: string | null }) {
    const agent = agents[activeAgent] || {};

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={activeAgent}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.8 }}
                className="relative w-full h-[600px] md:h-[700px] rounded-[3rem] overflow-hidden border-2 border-intel-gold/20 shadow-[0_0_80px_rgba(197,164,126,0.1)] group"
            >
                {/* VIDEO FEED */}
                <div className="absolute inset-0 bg-zinc-900">
                    {agent.video && agent.video !== '' ? (
                        <video
                            autoPlay loop muted playsInline
                            key={agent.video}
                            className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[10s]"
                        >
                            <source src={agent.video} type="video/mp4" />
                        </video>
                    ) : (
                        /* Fallback Image if Video Missing */
                        <HumanAvatar
                            src={agent.avatar}
                            alt={agent.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-90"
                        />
                    )}
                    {/* Digital Noise Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-noise" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                </div>

                {/* HOLOGRAPHIC UI OVERLAY */}
                <div className="absolute inset-0 z-20 pointer-events-none p-8 flex flex-col justify-between">
                    {/* Top Bar */}
                    <div className="flex justify-between items-start">
                        <div className="flex gap-4">
                            <motion.div
                                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                                className="px-3 py-1 bg-black/60 backdrop-blur border border-intel-gold/30 rounded text-intel-gold text-xs font-mono"
                            >
                                SIGNAL: STABLE
                            </motion.div>
                            <motion.div
                                initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}
                                className="px-3 py-1 bg-black/60 backdrop-blur border border-amber-500/30 rounded text-amber-200 text-xs font-mono"
                            >
                                ENCRYPTION: AES-256
                            </motion.div>
                        </div>
                        <Activity className="text-noble-gold animate-pulse" />
                    </div>

                    {/* Chat Response Overlay */}
                    <AnimatePresence>
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="absolute top-1/2 left-8 right-8 md:right-1/3 bg-black/95 backdrop-blur-3xl border-l-[6px] border-noble-gold p-8 rounded-r-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                            >
                                <div className="text-[10px] text-noble-gold font-black mb-3 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <MessageSquare size={14} className="animate-pulse" /> Response from {agent.name?.split(' ')[1]}
                                </div>
                                <p className="text-white text-lg md:text-2xl font-light leading-relaxed italic">
                                    "{message}"
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Bottom Info */}
                    <div className="space-y-2">
                        <motion.h2
                            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                            className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter"
                        >
                            {agent.name}
                        </motion.h2>
                        <p className="text-intel-gold font-mono text-sm tracking-widest uppercase">{agent.role}</p>
                    </div>
                </div>

                {/* Scanning Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(197,164,126,0.05)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-intel-gold/10 to-transparent h-[20%] pointer-events-none"
                    animate={{ top: ['-20%', '120%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
            </motion.div>
        </AnimatePresence>
    );
}

function CinematicVariant() {
    // Default Cinematic Variant (Consolidated Hero + UnusualHero)
    const cardRef = useRef<HTMLDivElement>(null)
    const pixelGridRef = useRef<HTMLDivElement>(null)
    const tagsRef = useRef<HTMLDivElement>(null)
    const customCursorRef = useRef<HTMLDivElement>(null)
    const [showCustomCursor, setShowCustomCursor] = useState(false)
    const [showBriefing, setShowBriefing] = useState(false);

    useEffect(() => {
        const tagsElement = tagsRef.current
        const cursorElement = customCursorRef.current

        if (!tagsElement || !cursorElement) return

        let cursorX = 0
        let cursorY = 0

        const handleMouseMove = (e: MouseEvent) => {
            cursorX = e.clientX
            cursorY = e.clientY

            gsap.to(cursorElement, {
                x: cursorX - 15,
                y: cursorY - 15,
                duration: 0.3,
                ease: "power2.out",
            })
        }

        const handleMouseEnter = () => {
            setShowCustomCursor(true)
        }

        const handleMouseLeave = () => {
            setShowCustomCursor(false)
        }

        tagsElement.addEventListener("mouseenter", handleMouseEnter)
        tagsElement.addEventListener("mouseleave", handleMouseLeave)
        tagsElement.addEventListener("mousemove", handleMouseMove)

        return () => {
            tagsElement.removeEventListener("mouseenter", handleMouseEnter)
            tagsElement.removeEventListener("mouseleave", handleMouseLeave)
            tagsElement.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    const handleMouseLeave = () => {
        if (!cardRef.current || !pixelGridRef.current) return

        const gridSize = 4
        const pixelSize = 100 / gridSize

        pixelGridRef.current.innerHTML = ""

        const totalPixels = gridSize * gridSize
        const clearIndices = new Set<number>()
        while (clearIndices.size < 3) {
            clearIndices.add(Math.floor(Math.random() * totalPixels))
        }

        let pixelIndex = 0
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                if (clearIndices.has(pixelIndex)) {
                    pixelIndex++
                    continue
                }

                const pixel = document.createElement("div")
                const isIndigo = Math.random() < 0.5

                const normalizedPosition = (col + (gridSize - 1 - row)) / ((gridSize - 1) * 2)
                const targetOpacity = 0.5 + normalizedPosition * 0.5

                pixel.className = `absolute ${isIndigo ? "bg-indigo-600" : "bg-black"}`
                pixel.style.width = `${pixelSize}%`
                pixel.style.height = `${pixelSize}%`
                pixel.style.left = `${col * pixelSize}%`
                pixel.style.top = `${row * pixelSize}%`
                pixel.style.opacity = "0"
                pixel.style.display = "block"
                pixel.setAttribute("data-target-opacity", targetOpacity.toString())
                pixelGridRef.current.appendChild(pixel)

                pixelIndex++
            }
        }

        const pixels = Array.from(pixelGridRef.current.children)
        const animationStepDuration = 0.45
        const actualPixelCount = pixels.length
        const staggerDuration = animationStepDuration / actualPixelCount

        const tl = gsap.timeline()

        tl.to(cardRef.current, {
            scale: 0.995,
            duration: 0.2,
            ease: "power2.in",
        })

        tl.to(
            pixels,
            {
                opacity: (index, target) => {
                    const el = target as HTMLElement
                    return el.getAttribute("data-target-opacity") || "1"
                },
                duration: 0.45,
                ease: "power2.in",
                stagger: {
                    each: staggerDuration,
                    from: "random",
                },
            },
            "<",
        )

        tl.to(
            pixels,
            {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out",
            },
            `+=${animationStepDuration}`,
        )

        tl.to(
            cardRef.current,
            {
                scale: 1,
                duration: 0.3,
                ease: "power2.in",
            },
            "<",
        )

        tl.set(pixels, {
            display: "none",
        })
    }

    return (
        <section className="p-[1.5%] bg-zinc-950 relative overflow-hidden">
            {/* Scan Line Effect from Hero.tsx */}
            <div className="absolute inset-0 scan-line pointer-events-none z-20 opacity-20" />

            <svg width="0" height="0" className="absolute">
                <defs>
                    <mask id="heroMask" maskContentUnits="objectBoundingBox">
                        <rect width="1" height="1" fill="black" />
                        <path
                            d="M0 0.1474 V0.9863 C0 0.9938 0.0038 0.9996 0.0085 0.9996 H0.9912 C0.9958 0.9996 1 0.9863 1 0.9863 V0.0581 C1 0.0506 0.9958 0.0444 0.9912 0.0444 H0.9255 C0.9208 0.0444 0.9165 0.0383 0.9165 0.0307 V0.0149 C0.9165 0.0074 0.9132 0.0013 0.9084 0.0013 L0.2060 0.0000 C0.2012 -0.0000 0.1975 0.0061 0.1975 0.0137 V0.0312 C0.1975 0.0387 0.1936 0.0448 0.1889 0.0448 H0.0915 C0.0868 0.0448 0.0830 0.0510 0.0830 0.0585 V0.1201 C0.0830 0.1276 0.0792 0.1337 0.0745 0.1337 H0.0085 C0.0038 0.1337 0 0.1399 0 0.1474 Z"
                            fill="white"
                        />
                    </mask>
                </defs>
            </svg>

            <div className="relative isolate w-full min-h-[calc(100svh-3vh)] sm:min-h-[calc(100svh-3vh)]">
                <div
                    className="absolute inset-0 overflow-hidden hero-mask"
                >
                    <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
                        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/liquid-metal-video_yX6NvjdW-6bLYorR3Ihmlwjivg3pjA978qrSKRU.mp4" type="video/mp4" />
                    </video>

                    <Image
                        src="/images/professional_hero_bg.png"
                        alt="Strategic Backdrop"
                        fill
                        className="object-cover opacity-60 mix-blend-screen grayscale-[0.5] hover:grayscale-0 transition-all duration-1000"
                        priority
                    />

                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-transparent to-zinc-950" />
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/45 via-zinc-950/15 to-transparent" />
                        <div className="absolute inset-0 [background:radial-gradient(90%_60%_at_10%_70%,rgba(0,0,0,.55)_0%,transparent_70%)]" />
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 max-w-[min(46rem,92vw)] md:bottom-8 md:left-8 z-10">
                        <div
                            ref={cardRef}
                            onMouseLeave={handleMouseLeave}
                            className="relative overflow-hidden backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 transition-transform duration-500 ease-in hover:scale-[1.01]"
                        >
                            <div ref={pixelGridRef} className="absolute inset-0 pointer-events-none z-10" />

                            <div className="flex flex-wrap gap-2 mb-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                                    <MapPin size={10} />
                                    <span>Alabama Focused • National Strategic Impact</span>
                                </div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                                    <Plus size={10} />
                                    <span>Vertex AI Super-Enhanced</span>
                                </div>
                            </div>

                            {/* Consolidated Typograhy from Hero.tsx */}
                            <h1 className="text-balance text-4xl/tight sm:text-5xl/tight md:text-7xl/tight font-black tracking-tighter text-white uppercase italic mb-2">
                                EdIntel
                            </h1>
                            <h1 className="text-balance text-4xl/tight sm:text-5xl/tight md:text-7xl/tight font-black tracking-tighter text-zinc-500 uppercase not-italic">
                                INTELLIGENCE
                            </h1>

                            <p className="mt-6 text-base/relaxed text-zinc-400 max-w-xl font-medium">
                                Autonomous strategic layers for the Modern Educator. Designed in Alabama to reclaim instructional time through high-fidelity AI.
                            </p>

                            <div className="flex flex-wrap gap-4 mt-8">
                                <Link
                                    href="/signup"
                                    className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-xs font-black text-black tracking-widest hover:scale-105 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] uppercase"
                                >
                                    INITIATE SYSTEM
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <button
                                    onClick={() => setShowBriefing(true)}
                                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-xs font-black text-white tracking-widest backdrop-blur hover:bg-white/10 transition-all uppercase"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Watch Introduction
                                </button>
                            </div>
                        </div>

                        {/* Compliance Badge Overlay from Hero.tsx */}
                        <div className="mt-4 flex gap-4">
                            {/* FERPA Shield */}
                            <div className="flex items-center gap-2 px-3 py-1 rounded-lg border border-primary/30 bg-black/40 backdrop-blur-sm">
                                <Shield className="w-3 h-3 text-emerald-500" />
                                <span className="text-[10px] font-medium text-emerald-500 tracking-wide">FERPA COMPLIANT</span>
                            </div>
                            {/* AL Literacy Act Badge */}
                            <div className="flex items-center gap-2 px-3 py-1 rounded-lg border border-primary/30 bg-black/40 backdrop-blur-sm">
                                <BookOpen className="w-3 h-3 text-emerald-500" />
                                <span className="text-[10px] font-medium text-emerald-500 tracking-wide">AL LITERACY ACT READY</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Status Panels (Consolidated from Hero.tsx) */}
                <div className="relative max-w-6xl mx-auto pointer-events-none z-10">
                    {/* Left Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="absolute left-4 bottom-20 hidden lg:block pointer-events-auto"
                    >
                        <div className="border border-white/10 rounded-lg p-4 bg-black/60 backdrop-blur-md max-w-xs shadow-2xl">
                            <div className="flex items-center gap-2 mb-2">
                                <Shield className="w-4 h-4 text-emerald-500" />
                                <span className="text-xs font-black text-emerald-500 tracking-wide uppercase">
                                    Due Process Shield Active
                                </span>
                            </div>
                            <p className="text-xs text-zinc-400">
                                Session ID #9921 monitored for{" "}
                                <span className="text-white font-medium decoration-dotted underline-offset-4 cursor-pointer hover:text-emerald-400 transition-colors">AL Code 290-8-9</span>{" "}
                                compliance.
                            </p>
                            <div className="flex gap-2 mt-3">
                                <span className="text-[10px] px-2 py-1 rounded bg-white/5 text-zinc-400 font-mono border border-white/5">
                                    📚 Mastering the Maze p. 42
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="absolute right-4 bottom-20 hidden lg:block pointer-events-auto"
                    >
                        <div className="border border-white/10 rounded-lg p-4 bg-black/60 backdrop-blur-md max-w-xs shadow-2xl">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                <span className="text-xs font-black text-amber-500 tracking-wide uppercase">
                                    EdIntel Legacy
                                </span>
                            </div>
                            <p className="text-xs text-zinc-400 leading-relaxed italic">
                                "Welcome back, Executive. Grounded in the resilience of Prichard 1925 and the legacy of Africatown."
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none z-10"
                >
                    <div className="flex flex-col items-center gap-2 text-zinc-500">
                        <span className="text-xs font-mono tracking-wider opacity-60">PULSE CORE DOWN</span>
                        <ChevronDown className="w-4 h-4 animate-bounce opacity-60" />
                    </div>
                </motion.div>

                {/* Global Cursor - Keeping existing cursor logic */}
                <div
                    ref={customCursorRef}
                    className={`fixed left-0 top-0 w-[30px] h-[30px] rounded-full bg-indigo-600 pointer-events-none z-50 transition-opacity duration-200 ${showCustomCursor ? "opacity-100" : "opacity-0"
                        }`}
                />

                {/* Holographic Briefing Modal */}
                <HolographicBriefing
                    isOpen={showBriefing}
                    onClose={() => setShowBriefing(false)}
                    title="Welcome Message"
                    description="Greetings, I am Dr. Alvin West. You are accessing the EdIntel Leadership Platform. This platform is designed to provide comprehensive administrative and pedagogical support, fully aligned with Alabama SDE Chapter 290-8-9 and IDEA 2004 federal mandates. Our AI assistants are ready to support your district's efficiency. Get started with your first tool to begin."
                    role="Founder & Consultant"
                    avatarImage="/images/avatars/Dr._alvin_west.png"
                    videoSrc="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/liquid-metal-video_yX6NvjdW-6bLYorR3Ihmlwjivg3pjA978qrSKRU.mp4"
                    stats={{ time: "30sec", saved: "∞", accuracy: "100%" }}
                />
            </div>
        </section>
    )
}
