"use client"

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import EdIntelLogo from "@/components/EdIntelLogo"




import { NAV_LINKS } from "@/config/navigation"
import { SmartNavLink } from "@/components/ui/SmartNavLink"

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(true)
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

    const pathname = usePathname()
    const [avatarError, setAvatarError] = useState(false)

    return (
        <motion.aside
            initial={false}
            animate={{ width: collapsed ? 80 : 280 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn(
                "relative z-20 flex h-screen flex-col border-r border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 overflow-hidden",
                !isMounted && "opacity-0"
            )}
        >
            {/* Logo Section */}
            <div className="flex h-20 items-center justify-center border-b border-white/5 shrink-0 overflow-hidden">
                <Link href="/" className="flex items-center gap-3">
                    <EdIntelLogo variant="sovereign-fidelity" className={cn("transition-all duration-500", collapsed ? "scale-75" : "scale-100")} />
                    {!collapsed && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-secondary-500"
                        >
                            EdIntel
                        </motion.span>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8 custom-scrollbar">
                {/* Sections */}
                {Object.entries(NAV_LINKS).map(([key, links]) => (
                    <div key={key} className="space-y-2">
                        {!collapsed && (
                            <motion.h4
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2"
                            >
                                {key.replace('_', ' ')}
                            </motion.h4>
                        )}
                        <div className="space-y-1">
                            {links.map((item) => (
                                <SmartNavLink
                                    key={item.href}
                                    item={item}
                                    active={pathname === item.href}
                                    collapsed={collapsed}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </nav>

            {/* User Section / Footer */}
            <div className="p-4 border-t border-white/5 bg-white/5">
                {!collapsed && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4"
                    >
                        <Link href="/about" className="group flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition-all duration-300">
                            <div className="h-10 w-10 rounded-full border border-primary-500/30 overflow-hidden shrink-0 relative">
                                <Image
                                    src={avatarError ? 'https://ui-avatars.com/api/?name=Alvin+West&background=6366f1&color=fff' : "/images/avatars/Dr._alvin_west.png"}
                                    alt="Dr. Alvin West"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    onError={() => setAvatarError(true)}
                                />
                            </div>
                            <div className="min-w-0">
                                <p className="text-sm font-bold text-gray-900 truncate">Dr. Alvin West</p>
                                <p className="text-[10px] text-gray-500 font-medium uppercase truncate">Founder & Lead</p>
                            </div>
                        </Link>
                    </motion.div>
                )}

                <button
                    type="button"
                    onClick={() => setCollapsed(!collapsed)}
                    className="flex w-full items-center justify-center rounded-xl p-2 text-gray-400 hover:text-indigo-600 hover:bg-primary-50 transition-all duration-200"
                >
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>
        </motion.aside>
    )
}
