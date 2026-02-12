"use client"

import React from "react"
import { Sidebar } from "@/components/layout/Sidebar"
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
import { Input } from "@/components/ui/input"
import Image from "next/image"

import { usePathname, useRouter } from "next/navigation"

import { useEdIntelVibe } from '@/context/EdIntelVibeContext';
import EdIntelCommandDeck from '@/components/dashboard/EdIntelCommandDeck';
import { AuroraBackground } from '@/components/dashboard/aurora-background';
import { TacticalHeaderBar } from '@/components/layout/TacticalHeaderBar';
import useProfessionalSounds from "@/hooks/useProfessionalSounds";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()
    const isMarketingRoute = ['/signup', '/login', '/about', '/pricing', '/contact', '/whats-edintel', '/enterprise'].includes(pathname);
    const isDashboardRoute = pathname?.startsWith('/dashboard');
    const { isCommandConsoleOpen, toggleCommandConsole } = useEdIntelVibe();
    const { playHover, playClick } = useProfessionalSounds()

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

    if (isMarketingRoute || isDashboardRoute) {
        return <>{children}</>
    }

    return (
        <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans relative">
            <AuroraBackground />

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

            <AnimatePresence mode="wait">
                <Sidebar />
            </AnimatePresence>
            <div className="flex-1 flex flex-col relative overflow-hidden">
                {/* Top Header */}
                <header className="h-16 border-b border-white/5 bg-black/20 backdrop-blur-md flex items-center justify-between px-8 z-10 shrink-0">
                    <div className="flex items-center gap-8 flex-1">
                        <div className="relative max-w-md w-full group cursor-pointer" onClick={toggleCommandConsole}>
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 group-focus-within:text-[#06b6d4] transition-colors" />
                            <Input
                                readOnly
                                placeholder="Search tools, agents, or assets... (⌘K)"
                                className="w-full bg-white/5 border-white/10 pl-10 h-9 text-xs focus:ring-[#06b6d4]/20 focus:border-[#06b6d4]/50 transition-all placeholder:text-white/10 cursor-pointer pointer-events-none"
                            />
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-white/20 opacity-100">
                                    <span className="text-xs">⌘</span>K
                                </kbd>
                            </div>
                        </div>

                    </div>

                    <div className="flex items-center gap-4">
                        <TacticalHeaderBar />

                        <div className="flex items-center gap-1 bg-white/5 rounded-full p-1 border border-white/10">
                            <Button
                                variant="ghost"
                                size="icon"
                                onMouseEnter={playHover}
                                onClick={() => { playClick(); router.push('/activity'); }}
                                className="h-8 w-8 rounded-full text-white/40 hover:text-white hover:bg-white/10"
                            >
                                <Bell className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onMouseEnter={playHover}
                                onClick={() => { playClick(); router.push('/all-tools'); }}
                                className="h-8 w-8 rounded-full text-white/40 hover:text-white hover:bg-white/10"
                            >
                                <Grid className="h-4 w-4" />
                            </Button>
                        </div>

                        <div className="h-8 w-px bg-white/10 mx-2" />

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="flex items-center gap-3 px-2 hover:bg-white/5 rounded-xl transition-all group">
                                    <div className="relative">
                                        <div className="h-8 w-8 rounded-full border border-white/10 overflow-hidden group-hover:border-[#06b6d4]/50 transition-colors">
                                            <Image
                                                src="/images/avatars/Dr._alvin_west.png"
                                                alt="User"
                                                width={32}
                                                height={32}
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-[#020617]" />
                                    </div>
                                    <div className="hidden md:block text-left">
                                        <p className="text-xs font-bold leading-none text-white">Dr. Alvin West</p>
                                        <p className="text-[10px] text-white/30 font-medium">Administrator</p>
                                    </div>
                                    <ChevronDown className="h-3 w-3 text-white/20 group-hover:text-white/50 transition-colors" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-[#0f172a] border-white/10 text-slate-200">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-white/5" />
                                <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer gap-2">
                                    <User size={14} /> Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer gap-2">
                                    <SettingsIcon size={14} /> Settings
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-white/5" />
                                <DropdownMenuItem className="focus:bg-red-500/10 focus:text-red-400 text-red-400 cursor-pointer gap-2">
                                    <LogOut size={14} /> Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Main Content Viewport */}
                <main className="flex-1 overflow-y-auto custom-scrollbar relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="p-8 pb-20"
                        >
                            <div className="max-w-[1600px] mx-auto">
                                {children}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                </main>
            </div>
        </div>
    )
}
