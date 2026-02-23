'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight, User as UserIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import EdIntelLogo from '@/components/EdIntelLogo';
import { NAV_LINKS } from '@/config/navigation';
import { SmartNavLink } from '@/components/ui/SmartNavLink';
import { useAuth } from '@/context/AuthContext';

export function Sidebar() {
    const [collapsed, setCollapsed] = useState(true);
    const [isMounted, setIsMounted] = useState(false);
    const { user, logout } = useAuth();

    useEffect(() => {
        setIsMounted(true);
        const checkMobile = () => {
            const mobile = window.innerWidth < 1024;
            if (mobile) setCollapsed(true);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const pathname = usePathname();

    return (
        <motion.aside
            initial={false}
            animate={{ width: collapsed ? 100 : 280 }}
            transition={{ type: 'spring', stiffness: 300, damping: 35 }}
            className={cn(
                "relative z-40 flex h-screen flex-col border-r border-white/5 bg-[#020617]/80 backdrop-blur-3xl transition-all duration-300 overflow-hidden shadow-2xl shadow-black",
                !isMounted && "opacity-0"
            )}
        >
            {/* Logo Section */}
            <div className="flex h-24 items-center justify-center border-b border-white/5 shrink-0 overflow-hidden px-4">
                <Link href="/" className="flex items-center gap-4 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-electric-cyan/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
                        <EdIntelLogo variant="sovereign-fidelity" className={cn("relative transition-all duration-500", collapsed ? "scale-90" : "scale-100")} />
                    </div>
                    {!collapsed && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex flex-col"
                        >
                            <span className="text-xl font-black tracking-tighter text-white uppercase italic leading-none">
                                Ed<span className="text-electric-cyan">Intel</span>
                            </span>
                            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-sovereign-gold mt-1">
                                Sovereign Core
                            </span>
                        </motion.div>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-10 custom-scrollbar">
                {Object.entries(NAV_LINKS).map(([key, links]) => (
                    <div key={key} className="space-y-3">
                        {!collapsed && (
                            <motion.h4
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="px-4 text-[9px] font-black uppercase tracking-[0.4em] text-zinc-600 mb-2"
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
            <div className="p-4 border-t border-white/5 bg-black/40">
                {!collapsed && user && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-4"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl border border-electric-cyan/30 flex items-center justify-center bg-zinc-900 overflow-hidden shrink-0">
                                {user.avatar_url ? (
                                    <Image src={user.avatar_url} alt={user.name} width={40} height={40} className="object-cover" />
                                ) : (
                                    <UserIcon className="text-electric-cyan" size={20} />
                                )}
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-black text-white truncate leading-tight">
                                    {user.name || "Executive"}
                                </p>
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">
                                    {user.tier || "Protocol Active"}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => logout()}
                            className="w-full py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all duration-300"
                        >
                            Sign Out
                        </button>
                    </motion.div>
                )}

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setCollapsed(!collapsed)}
                        className="flex-1 flex items-center justify-center h-12 rounded-xl bg-white/5 border border-white/5 text-zinc-400 hover:text-electric-cyan hover:bg-electric-cyan/10 transition-all duration-300"
                    >
                        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                    {collapsed && (
                        <div className="p-1">
                            <div
                                onClick={() => logout()}
                                className="h-10 w-10 rounded-xl border border-white/10 flex items-center justify-center bg-zinc-900 cursor-pointer hover:border-red-500/50 transition-colors"
                            >
                                {user?.avatar_url ? (
                                    <Image src={user.avatar_url} alt="User" width={40} height={40} className="rounded-xl" />
                                ) : (
                                    <UserIcon className="text-zinc-500" size={20} />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </motion.aside>
    );
}
