'use client';

import React from 'react';
import { LayoutGrid, Database, Video, Zap, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Sidebar = () => {
    const pathname = usePathname();

    const navItems = [
        { icon: LayoutGrid, label: 'Dashboard', href: '/dashboard' },
        { icon: Database, label: 'District Intelligence', href: '/dashboard/data' },
        { icon: Video, label: 'Sovereign Studio', href: '/dashboard/studio' },
        { icon: Zap, label: 'Antigravity Logs', href: '/dashboard/logs' },
        { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
    ];

    return (
        <aside className="w-20 border-r border-zinc-900 bg-zinc-950 flex flex-col items-center py-8 z-50">
            {/* BRAND LOGO PILL */}
            <Link href="/dashboard" className="mb-12 group">
                <div className="h-10 w-10 bg-amber-500 rounded-xl flex items-center justify-center font-black text-black group-hover:scale-110 transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                    Ei
                </div>
            </Link>

            {/* PRIMARY NAV LINKS */}
            <nav className="flex flex-col gap-8 flex-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            title={item.label}
                            aria-label={item.label}
                            className={`p-3 rounded-2xl transition-all duration-300 relative group ${isActive
                                    ? 'text-amber-500 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
                                    : 'text-zinc-600 hover:text-zinc-300'
                                }`}
                        >
                            <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />

                            {/* ACTIVE GLOW BAR */}
                            {isActive && (
                                <div className="absolute left-[-1.25rem] top-1/2 -translate-y-1/2 w-1 h-6 bg-amber-500 rounded-r-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                            )}

                            {/* HOVER LABEL (Optional Tooltip approach) */}
                            <div className="absolute left-16 top-1/2 -translate-y-1/2 px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity rounded">
                                {item.label}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* EXIT COMMAND */}
            <button
                title="Logout"
                aria-label="Logout"
                className="p-3 text-zinc-600 hover:text-red-500 transition-colors mt-auto"
            >
                <LogOut size={22} />
            </button>
        </aside>
    );
};
