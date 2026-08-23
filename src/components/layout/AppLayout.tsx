"use client"

import React from "react"
import { Sidebar } from "@/components/layout/Sidebar"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Bell, Grid, User as UserIcon, Settings as SettingsIcon, LogOut, ChevronDown, ShieldCheck, Zap } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import dynamic from 'next/dynamic'
import { useEdIntelVibe } from '@/context/EdIntelVibeContext'

const EdIntelCommandDeck = dynamic(() => import('@/components/dashboard/EdIntelCommandDeck'), {
    ssr: false,
    loading: () => <div className="fixed inset-0 z-[100] bg-black/95 min-h-screen flex items-center justify-center text-amber-400 font-mono text-xs">Loading Command Deck...</div>
});
const MobileNavigation = dynamic(() => import('@/components/MobileNavigation'), {
    ssr: false,
    loading: () => <div className="h-16 w-full md:hidden bg-zinc-950 border-t border-white/10" />
});
const TacticalHeaderBar = dynamic(() => import('@/components/layout/TacticalHeaderBar').then(mod => mod.TacticalHeaderBar), {
    ssr: false,
    loading: () => <div className="h-8 w-full bg-zinc-950/80 border-b border-white/5" />
});
const TrialBanner = dynamic(() => import('@/components/layout/TrialBanner').then(mod => mod.TrialBanner), {
    ssr: false,
    loading: () => <div className="min-h-[36px] w-full" />
});
import useProfessionalSounds from "@/hooks/useProfessionalSounds"
import GlassPanel from "@/components/ui/GlassPanel"
import SovereignButton from "@/components/ui/SovereignButton"
import { useAuth } from '@/context/AuthContext'
import { useIntelligence } from '@/context/IntelligenceContext'
import { AideProvider } from '@/context/AideMessagingContext'

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const { isCommandConsoleOpen, toggleCommandConsole } = useEdIntelVibe()
    const { playHover, playClick } = useProfessionalSounds()
    const { user, logout } = useAuth()
    const { isRescueOneActive } = useIntelligence()

    // Derive real tier from live AuthContext user
    const tierName = user?.tier || 'Sovereign Initiate'
    const tierId = tierName.toLowerCase().replace(/\s+/g, '-')
    const isInitiate = tierName === 'Administrator' || tierId === 'sovereign-initiate'

    // Days remaining calculation
    const getDaysRemaining = () => {
        if (!user?.created_at) return 30
        const createdDate = new Date(user.created_at).getTime()
        const now = Date.now()
        const diffMs = (createdDate + (30 * 24 * 60 * 60 * 1000)) - now
        return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)))
    }

    const daysRemaining = isInitiate ? 0 : getDaysRemaining()
    const currentTier = { id: tierId, name: tierName, daysRemaining }

    const getUserInitials = (name?: string) => {
        if (!name) return 'EX'
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    // Command + K Shortcut
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                toggleCommandConsole()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [toggleCommandConsole])

    return (
        <div className={`flex h-screen bg-[#030712] text-zinc-200 overflow-hidden font-sans relative ${isRescueOneActive ? 'rescue-one-overdrive' : ''}`}>

            {/* COMMAND CONSOLE OVERLAY */}
            <AnimatePresence>
                {isCommandConsoleOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] bg-black/95 overflow-y-auto"
                    >
                        <EdIntelCommandDeck />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sidebar Navigation */}
            <Sidebar />

            <div className="flex flex-col flex-1 relative overflow-hidden">
                {!isInitiate && (
                    <TrialBanner
                        tierId={currentTier.id}
                        tierName={currentTier.name}
                        daysRemaining={currentTier.daysRemaining}
                    />
                )}

                <TacticalHeaderBar />

                {/* Top Header Surface */}
                <header className="h-14 flex items-center justify-between px-4 md:px-6 z-20 shrink-0 border-b border-white/10 bg-[#050814]/80 backdrop-blur-xl relative">
                    <div className="hidden md:flex items-center gap-6 flex-1 relative z-10">
                        <div className="relative max-w-md w-full group cursor-pointer" onClick={toggleCommandConsole}>
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500 group-hover:text-amber-400 transition-colors" />
                            <div className="w-full bg-white/[0.03] border border-white/10 rounded-xl pl-9 pr-12 h-8 flex items-center text-xs text-zinc-400 group-hover:bg-white/[0.06] group-hover:border-amber-400/30 transition-all font-mono">
                                Search tools, agents, or compliance logs...
                                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                    <kbd className="hidden sm:inline-flex h-4 select-none items-center gap-0.5 rounded border border-white/10 bg-white/5 px-1 font-mono text-[9px] font-medium text-zinc-400">
                                        <span>⌘</span>K
                                    </kbd>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile title + search icon */}
                    <div className="flex md:hidden items-center gap-2 flex-1 relative z-10">
                        <button
                            onClick={toggleCommandConsole}
                            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-400 hover:text-white"
                            aria-label="Search"
                        >
                            <Search className="h-4 w-4" />
                        </button>
                        <span className="text-xs font-black uppercase tracking-widest text-amber-400 font-mono">EdIntel</span>
                    </div>

                    <div className="flex items-center gap-3 relative z-10">
                        <div className="flex items-center gap-1.5">
                            <SovereignButton
                                variant="glass"
                                size="sm"
                                onMouseEnter={playHover}
                                onClick={() => { playClick(); router.push('/ledger'); }}
                                className="h-8 w-8 p-0 rounded-lg border-white/10 hover:border-amber-400/30"
                            >
                                <Bell className="h-3.5 w-3.5 text-zinc-300" />
                            </SovereignButton>
                            <SovereignButton
                                variant="glass"
                                size="sm"
                                onMouseEnter={playHover}
                                onClick={() => { playClick(); router.push('/admin/tools'); }}
                                className="h-8 w-8 p-0 rounded-lg border-white/10 hover:border-amber-400/30"
                            >
                                <Grid className="h-3.5 w-3.5 text-zinc-300" />
                            </SovereignButton>
                        </div>

                        <div className="h-6 w-px bg-white/10 mx-1" />

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-2.5 px-2 py-1 hover:bg-white/5 rounded-xl transition-all group">
                                    <div className="relative">
                                        {/* Pure SVG Vector Avatar Badge (Zero Raster Dependency) */}
                                        <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-amber-500/20 via-indigo-500/20 to-emerald-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-bold text-[10px] shadow-[0_0_12px_rgba(245,158,11,0.15)] group-hover:border-amber-400 transition-colors">
                                            {getUserInitials(user?.name)}
                                        </div>
                                        <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 border border-[#030712]" />
                                    </div>
                                    <div className="hidden md:block text-left">
                                        <p className="text-xs font-bold leading-none text-white">{user?.name || "Executive"}</p>
                                        <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider">{user?.tier || "Administrator"}</p>
                                    </div>
                                    <ChevronDown className="h-3 w-3 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-[#090d1a] border-white/10 text-zinc-200 shadow-2xl font-mono text-xs">
                                <DropdownMenuLabel className="text-[10px] uppercase text-zinc-500 tracking-widest">My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-white/5" />
                                <DropdownMenuItem onClick={() => router.push('/profile')} className="focus:bg-white/5 focus:text-amber-400 cursor-pointer gap-2">
                                    <UserIcon size={14} /> Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push('/settings')} className="focus:bg-white/5 focus:text-amber-400 cursor-pointer gap-2">
                                    <SettingsIcon size={14} /> Settings
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-white/5" />
                                <DropdownMenuItem
                                    onClick={() => logout()}
                                    className="focus:bg-rose-500/10 focus:text-rose-400 text-rose-400 cursor-pointer gap-2"
                                >
                                    <LogOut size={14} /> Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Main Content Viewport */}
                <div className="flex-1 overflow-y-auto custom-scrollbar relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25 }}
                            className="p-4 md:p-6 pb-20 md:pb-16"
                        >
                            <div className="max-w-[1600px] mx-auto">
                                <React.Suspense fallback={
                                    <div className="flex items-center justify-center h-[50vh]">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-400"></div>
                                    </div>
                                }>
                                    <AideProvider>
                                        {children}
                                    </AideProvider>
                                </React.Suspense>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden">
                    <MobileNavigation />
                </div>
            </div>
            {isRescueOneActive && <div className="animate-tactical-scan" />}
        </div>
    );
}
