'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Bot,
    Palette,
    Shield,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import EdIntelLogo from '@/components/EdIntelLogo';

export default function LiquidDock() {
    const pathname = usePathname();
    const { logout } = useAuth();
    const [isOpen, setIsOpen] = React.useState(false);

    const navItems = [
        { name: 'Sovereign Room', href: '/the-room', icon: LayoutDashboard },
        { name: 'Protocol Registry', href: '/generators', icon: Bot },
        { name: 'Visual Lab', href: '/video-studio', icon: Palette },
        { name: 'Admin Shield', href: '/admin', icon: Shield },
        { name: 'Settings', href: '/settings', icon: Settings },
    ];

    return (
        <>
            {/* Mobile Trigger */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-6 left-6 z-50 p-3 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-full text-white shadow-lg"
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Dock Container */}
            <motion.aside
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: isOpen ? 0 : 0, opacity: 1 }} // Always visible on desktop
                className={`
                    fixed left-6 top-6 bottom-6 z-40 w-24 
                    hidden lg:flex flex-col items-center py-8
                    bg-slate-950/60 backdrop-blur-3xl border border-white/5 rounded-[2.5rem]
                    shadow-[0_20px_50px_rgba(0,0,0,0.5)]
                `}
            >
                {/* Logo / Brand */}
                <div className="mb-12 scale-100">
                    <EdIntelLogo variant="fidelity" />
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 flex flex-col gap-8 w-full px-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.name} href={item.href} className="relative group w-full flex justify-center">
                                {isActive && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute inset-0 bg-indigo-500/20 rounded-2xl border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <div className={`
                                    relative p-4 rounded-xl transition-all duration-300
                                    ${isActive ? 'text-indigo-400' : 'text-slate-500 hover:text-white hover:bg-white/5'}
                                `}>
                                    <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />

                                    {/* Liquid Tooltip */}
                                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1.5 
                                        bg-slate-900/90 border border-white/10 rounded-lg text-xs font-medium text-white 
                                        opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 
                                        transition-all duration-300 pointer-events-none whitespace-nowrap
                                        shadow-lg z-50">
                                        {item.name}
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Actions */}
                <div className="flex flex-col gap-6 w-full px-4">
                    <button
                        onClick={logout}
                        className="p-4 rounded-xl text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 transition-all flex justify-center group relative"
                    >
                        <LogOut size={24} />
                        <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1.5 
                            bg-slate-900/90 border border-noble-red/20 rounded-lg text-xs font-medium text-noble-red
                            opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 
                            transition-all duration-300 pointer-events-none whitespace-nowrap">
                            Disconnect
                        </div>
                    </button>

                    {/* User Avatar Mini */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 p-[1px] shadow-lg shadow-indigo-500/20">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-xs font-black text-white">
                            AW
                        </div>
                    </div>
                </div>
            </motion.aside>

            {/* Mobile Drawer (Simplistic for now) */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 z-30 bg-black/80 backdrop-blur-md" onClick={() => setIsOpen(false)} />
            )}
            <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: isOpen ? 0 : '-100%' }}
                className="lg:hidden fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-white/10 p-6 pt-24"
            >
                <nav className="flex flex-col gap-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-4 p-3 rounded-lg text-slate-300 hover:bg-white/10 hover:text-white"
                        >
                            <item.icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </motion.div>
        </>
    );
}
