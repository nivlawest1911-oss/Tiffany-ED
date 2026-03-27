"use client"

import React from "react"
import { Sidebar } from "@/components/layout/Sidebar"
import MobileNavigation from "@/components/MobileNavigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Bell, Grid, User, Settings as SettingsIcon, LogOut, ChevronDown } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Image from "next/image"

import { useRouter } from "next/navigation"

import { useEdIntelVibe } from '@/context/EdIntelVibeContext';
import EdIntelCommandDeck from '@/components/dashboard/EdIntelCommandDeck';
import { TacticalHeaderBar } from '@/components/layout/TacticalHeaderBar';
import useProfessionalSounds from "@/hooks/useProfessionalSounds";
import { TrialBanner } from '@/components/layout/TrialBanner';
import GlassPanel from "@/components/ui/GlassPanel";
import SovereignButton from "@/components/ui/SovereignButton";
import { useAuth } from '@/context/AuthContext';

import { AideProvider } from '@/context/AideMessagingContext';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    // Simplified: No longer checking routes internally. 
    // This component is now exclusively used by the (dashboard) layout.
    const { isCommandConsoleOpen, toggleCommandConsole } = useEdIntelVibe();
    const { playHover, playClick } = useProfessionalSounds()
    const { user, logout } = useAuth();

    // Derive real tier from live AuthContext user
    const tierName = user?.tier || 'Sovereign Initiate';
    const tierId = tierName.toLowerCase().replace(/\s+/g, '-');
    const isInitiate = tierName === 'Administrator' || tierId === 'sovereign-initiate';

    // daysRemaining: Improved resilient calculation
    const getDaysRemaining = () => {
        if (!user?.created_at) return 30;
        const createdDate = new Date(user.created_at).getTime();
        const now = Date.now();
        const diffMs = (createdDate + (30 * 24 * 60 * 60 * 1000)) - now;
        return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
    };

    const daysRemaining = isInitiate ? 0 : getDaysRemaining();
    const currentTier = { id: tierId, name: tierName, daysRemaining };

    // CRM/CMD+K Shortcut
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                toggleCommandConsole();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [toggleCommandConsole]);


    return (
        <AideProvider>
            <div className="flex h-screen text-slate-200 overflow-hidden font-sans relative">
                {/* GenerativeBackground is already in root layout */}

                {/* COMMAND CONSOLE OVERLAY */}
                <AnimatePresence>
                    {isCommandConsoleOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="fixed inset-0 z-[100] bg-black/95 overflow-y-auto"
                        >
                            <EdIntelCommandDeck />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Sidebar remains stable regardless of module */}
                <Sidebar />

                <div className="flex flex-col flex-1 relative overflow-hidden">
                    {/* 1. Global Trial Banner (Conversion Hook) — hidden for free Initiate tier */}
                    {!isInitiate && (
                        <TrialBanner
                            tierId={currentTier.id}
                            tierName={currentTier.name}
                            daysRemaining={currentTier.daysRemaining}
                        />
                    )}

                    <TacticalHeaderBar />

                    {/* Top Header */}
                    <header className="h-16 flex items-center justify-between px-4 md:px-8 z-20 shrink-0">
                        <GlassPanel className="absolute inset-x-0 top-0 h-16 rounded-none border-t-0 border-x-0 bg-white/[0.02]">
                            <div />
                        </GlassPanel>

                        <div className="hidden md:flex items-center gap-8 flex-1 relative z-10">
                            <div className="relative max-w-md w-full group cursor-pointer" onClick={toggleCommandConsole}>
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-hover:text-electric-cyan transition-colors" />
                                <div className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-12 h-9 flex items-center text-xs text-white/30 group-hover:bg-white/10 group-hover:border-white/20 transition-all">
                                    Search tools, agents, or assets...
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                        <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-white/20 opacity-100">
                                            <span className="text-xs">⌘</span>K
                                        </kbd>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mobile: title + search icon */}
                        <div className="flex md:hidden items-center gap-3 flex-1 relative z-10">
                            <button
                                onClick={toggleCommandConsole}
                                className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                                aria-label="Search"
                            >
                                <Search className="h-4 w-4 text-white/40" />
                            </button>
                        </div>

                        <div className="flex items-center gap-4 relative z-10">
                            <div className="flex items-center gap-2">
                                <SovereignButton
                                    variant="glass"
                                    size="sm"
                                    aria-label="Notifications"
                                    onMouseEnter={playHover}
                                    onClick={() => { playClick(); router.push('/activity'); }}
                                    className="h-9 w-9 p-0 rounded-xl"
                                >
                                    <Bell className="h-4 w-4" />
                                </SovereignButton>
                                <SovereignButton
                                    variant="glass"
                                    size="sm"
                                    aria-label="All Tools"
                                    onMouseEnter={playHover}
                                    onClick={() => { playClick(); router.push('/all-tools'); }}
                                    className="h-9 w-9 p-0 rounded-xl"
                                >
                                    <Grid className="h-4 w-4" />
                                </SovereignButton>
                            </div>

                            <div className="h-8 w-px bg-white/10 mx-2" />

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center gap-3 px-2 hover:bg-white/5 rounded-xl transition-all group" onClick={() => {}}>
                                        <div className="relative">
                                            <div className="h-8 w-8 rounded-full border border-white/10 overflow-hidden group-hover:border-electric-cyan/50 transition-colors">
                                                <Image
                                                    src={user?.avatar_url || "/images/avatars/dr_alvin_west_official.png"}
                                                    alt="User"
                                                    width={32}
                                                    height={32}
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-[#020617]" />
                                        </div>
                                        <div className="hidden md:block text-left">
                                            <p className="text-xs font-bold leading-none text-white">{user?.name || "Executive"}</p>
                                            <p className="text-[10px] text-white/30 font-medium">{user?.tier || "Administrator"}</p>
                                        </div>
                                        <ChevronDown className="h-3 w-3 text-white/20 group-hover:text-white/50 transition-colors" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 bg-[#0f172a] border-white/10 text-slate-200">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator className="bg-white/5" />
                                    <DropdownMenuItem onClick={() => router.push('/profile')} className="focus:bg-white/5 focus:text-white cursor-pointer gap-2">
                                        <User size={14} /> Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => router.push('/settings')} className="focus:bg-white/5 focus:text-white cursor-pointer gap-2">
                                        <SettingsIcon size={14} /> Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="bg-white/5" />
                                    <DropdownMenuItem
                                        onClick={() => logout()}
                                        className="focus:bg-red-500/10 focus:text-red-400 text-red-400 cursor-pointer gap-2"
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
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="p-4 md:p-8 pb-24 md:pb-20"
                            >
                                <div className="max-w-[1600px] mx-auto">
                                    <React.Suspense fallback={
                                        <div className="flex items-center justify-center h-[50vh]">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-electric-cyan"></div>
                                        </div>
                                    }>
                                        {children}
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
            </div>
        </AideProvider>
    );
}
