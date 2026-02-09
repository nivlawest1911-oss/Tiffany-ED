'use client';

import React from 'react';
import { LayoutGrid, Database, Video, Zap, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export const Sidebar = () => {
    const pathname = usePathname();

    const navItems = [
        { icon: LayoutGrid, label: 'Dashboard', href: '/dashboard' },
        { icon: Database, label: 'District Intelligence', href: '/analytics' },
        { icon: Video, label: 'Sovereign Studio', href: '/dashboard/studio' },
        { icon: Zap, label: 'Antigravity Logs', href: '/admin' },
        { icon: Settings, label: 'Settings', href: '/settings' },
    ];

    return (
        <aside className="w-64 fixed left-0 top-0 h-full bg-zinc-950/50 backdrop-blur-xl border-r border-white/10 flex flex-col py-8 z-50">
            {/* BRAND LOGO */}
            <div className="px-6 mb-12">
                <Link href="/dashboard" className="flex items-center gap-3 group">
                    <div className="h-10 w-10 relative group-hover:scale-110 transition-all">
                        <Image src="/edintel-logo.png" alt="EdIntel Logo" fill className="object-contain" />
                    </div>
                    <span className="text-xl font-black tracking-tight text-white uppercase italic">EdIntel<span className="text-noble-gold not-italic">AI</span></span>
                </Link>
            </div>

            {/* PRIMARY NAV LINKS */}
            <nav className="flex flex-col gap-2 px-4 flex-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
                                ? 'text-white bg-white/10'
                                : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-primary' : 'text-zinc-400 group-hover:text-white'} />
                            <span className="text-sm font-bold uppercase tracking-wider">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* EXIT COMMAND */}
            <div className="px-4 mt-auto">
                <button
                    title="Logout"
                    aria-label="Logout"
                    className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-all rounded-xl"
                >
                    <LogOut size={20} />
                    <span className="text-sm font-bold uppercase tracking-wider">Logout</span>
                </button>
            </div>
        </aside>
    );
};
