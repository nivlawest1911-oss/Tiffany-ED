"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Users,
    FileEdit,
    Bot,
    Settings,
    ChevronLeft,
    ChevronRight,
    Video,
    Mic,
    ImageIcon,
    Brain,
    Link2,
    Heart,
    Building,
    Gavel,
    Shield,
    Phone,
    BarChart3,
    Database,
    BookOpen,
    Globe,
    Zap,
    GraduationCap,
    CreditCard,
    DollarSign,
    CirclePlay,
} from "lucide-react"
import { cn } from "@/lib/utils"
import EdIntelLogo from "@/components/EdIntelLogo"
import { HumanoidHolograph } from "@/components/ui/HumanoidHolograph"
import { HolographicBackground } from "@/components/ui/HolographicBackground"

interface NavSection {
    title: string
    items: { icon: React.ComponentType<{ className?: string }>; label: string; id: string; badge?: string; href?: string }[]
}

const navSections: NavSection[] = [
    {
        title: "Core",
        items: [
            { icon: LayoutDashboard, label: "Command Center", id: "command", href: "/dashboard" },
            { icon: Shield, label: "Bio Dossier", id: "dossier", href: "/about" },
            { icon: Zap, label: "AI Hub", id: "ai-hub", badge: "Live", href: "/ai-hub" },
            { icon: Bot, label: "Agent Swarm", id: "agents", href: "/dashboard/agents" },
        ],
    },
    {
        title: "Media Studio",
        items: [
            { icon: Video, label: "Video Studio", id: "video", href: "/video-studio" },
            { icon: Mic, label: "Voice Lab", id: "voice", href: "/voice-lab" },
            { icon: ImageIcon, label: "Asset Lab", id: "images", href: "/asset-lab" },
            { icon: Globe, label: "Gemini Workspace", id: "gemini", href: "/gemini-workspace" },
        ],
    },
    {
        title: "Classroom",
        items: [
            { icon: Brain, label: "Super-Tools", id: "tools", href: "/all-tools" },
            { icon: Link2, label: "Connectors", id: "connectors", href: "/connectors" },
            { icon: Heart, label: "Cognitive / EQ", id: "cognitive", href: "/cognitive" },
            { icon: Users, label: "Student Intel", id: "students", href: "/students" },
        ],
    },
    {
        title: "Executive",
        items: [
            { icon: FileEdit, label: "Grant Architect", id: "grants", href: "/admin/grants" },
            { icon: Building, label: "Board Room", id: "board", href: "/board" },
            { icon: Gavel, label: "The Room", id: "the-room", href: "/the-room" },
            { icon: Shield, label: "EdIntel AI", id: "EdIntel", href: "/edintel-professional" },
        ],
    },
    {
        title: "Operations",
        items: [
            { icon: Phone, label: "Comms Center", id: "comms", href: "/admin/comms" },
            { icon: BarChart3, label: "Analytics", id: "analytics", href: "/analytics" },
            { icon: Database, label: "Vault", id: "vault", href: "/admin/vault" },
            { icon: BookOpen, label: "Resources", id: "resources", href: "/resources/alabama" },
            { icon: Settings, label: "Admin", id: "admin", href: "/admin/management" },
        ],
    },
    {
        title: "Hub",
        items: [
            { icon: GraduationCap, label: "Professional", id: "professional", href: "/edintel-professional" },
            { icon: Globe, label: "Enterprise", id: "enterprise", href: "/enterprise" },
            { icon: DollarSign, label: "Pricing", id: "pricing", href: "/pricing" },
            { icon: CirclePlay, label: "Video Gallery", id: "video-gallery", href: "/video-gallery" },
            { icon: CreditCard, label: "Billing", id: "billing", href: "/payment" },
        ],
    },
]

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(true) // Start collapsed to minimize shift on mobile
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        const checkMobile = () => {
            const mobile = window.innerWidth < 768
            if (mobile) setCollapsed(true)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const [localActive, setLocalActive] = useState("command")
    const pathname = usePathname()
    const [avatarError, setAvatarError] = useState(false)

    return (
        <motion.aside
            initial={false} // Disable initial animation
            animate={{ width: collapsed ? 72 : 240 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
                "relative z-20 flex h-screen flex-col border-r border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-300 overflow-hidden",
                !isMounted && "opacity-0" // Hide until hydration to avoid flash
            )}
        >
            <HolographicBackground />
            {/* Logo Section */}
            <div className="flex h-16 items-center gap-3 px-4 border-b border-white/5 shrink-0">
                <Link href="/" className="flex items-center gap-3">
                    <EdIntelLogo variant="fidelity" className="scale-100 origin-left" />
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-2 px-3">
                {navSections.map((section) => (
                    <div key={section.title} className="mb-2">
                        <AnimatePresence>
                            {!collapsed && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/20"
                                >
                                    {section.title}
                                </motion.p>
                            )}
                        </AnimatePresence>
                        <div className="space-y-0.5">
                            {section.items.map((item) => {
                                const isActive = item.href
                                    ? pathname === item.href
                                    : localActive === item.id

                                const className = cn(
                                    "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium transition-all duration-200",
                                    isActive
                                        ? "text-white"
                                        : "text-white/40 hover:text-white/70 hover:bg-white/5"
                                )

                                const content = (
                                    <>
                                        {isActive && (
                                            <motion.div
                                                layoutId="sidebar-active"
                                                className="absolute inset-0 rounded-xl bg-white/10 border border-white/10"
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        {isActive && (
                                            <motion.div
                                                layoutId="sidebar-pill"
                                                className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-full bg-gradient-to-b from-[#D4AF37] via-[#F1D37E] to-[#B8860B] shadow-[0_0_15px_rgba(212,175,55,0.8)]"
                                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        <HumanoidHolograph
                                            icon={item.icon}
                                            isActive={isActive}
                                            className="relative z-10 shrink-0"
                                            size={18}
                                        />
                                        <AnimatePresence>
                                            {!collapsed && (
                                                <motion.span
                                                    initial={{ opacity: 0, width: 0 }}
                                                    animate={{ opacity: 1, width: "auto" }}
                                                    exit={{ opacity: 0, width: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="relative z-10 overflow-hidden whitespace-nowrap flex items-center gap-2"
                                                >
                                                    {item.label}
                                                    {item.badge && (
                                                        <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[8px] font-bold text-emerald-400">
                                                            {item.badge}
                                                        </span>
                                                    )}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </>
                                )

                                if (item.href) {
                                    return (
                                        <Link
                                            key={item.id}
                                            href={item.href}
                                            className={className}
                                            suppressHydrationWarning
                                        >
                                            {content}
                                        </Link>
                                    )
                                }

                                return (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setLocalActive(item.id)}
                                        className={className}
                                        suppressHydrationWarning
                                    >
                                        {content}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* System Health Badge */}
            <div className="border-t border-white/5 px-3 py-2 shrink-0">
                <AnimatePresence>
                    {!collapsed && (
                        <>
                            <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 mb-2">
                                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px] shadow-emerald-500/50" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] font-medium text-white/50">All Systems</p>
                                    <p className="text-[9px] text-emerald-400/70">Operational</p>
                                </div>
                                <span className="text-[9px] text-white/20">99.9%</span>
                            </div>

                            {/* Founder Footer Section - Clickable Link to About/Dossier */}
                            <Link href="/about">
                                <div className="p-4 mt-auto border-t border-white/5 bg-slate-950/30 backdrop-blur-md rounded-xl mb-2 overflow-hidden hover:bg-white/5 transition-colors cursor-pointer group">
                                    <div className="flex items-center space-x-3 p-2 rounded-xl">
                                        <div className="h-10 w-10 rounded-full border border-amber-500/30 flex items-center justify-center overflow-hidden relative shrink-0">
                                            <Image
                                                src={avatarError ? 'https://ui-avatars.com/api/?name=Alvin+West&background=0D8ABC&color=fff' : "/images/avatars/Dr._alvin_west.png"}
                                                alt="Dr. Alvin West"
                                                fill
                                                className="object-cover"
                                                onError={() => setAvatarError(true)}
                                            />
                                        </div>
                                        <div className="flex-1 overflow-hidden">
                                            <p className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                                                Dr. Alvin West
                                            </p>
                                            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider truncate">
                                                EdIntel Founder
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </>
                    )}
                </AnimatePresence>
                <button
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex w-full items-center justify-center rounded-lg p-2 text-white/40 transition-colors hover:bg-white/5 hover:text-white/70"
                >
                    {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                </button>
            </div>
        </motion.aside>
    )
}
