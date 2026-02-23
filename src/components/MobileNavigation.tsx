'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home, Sparkles, LayoutDashboard, User, Menu, X,
    Settings, LogOut, Globe, CreditCard, Shield, GraduationCap
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';

export default function MobileNavigation() {
    const pathname = usePathname();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const { playClick } = useProfessionalSounds();

    const isActiveTab = (path: string) => {
        if (path === '/' && pathname === '/') return true;
        if (path !== '/' && pathname?.startsWith(path)) return true;
        return false;
    };

    const handleNavigation = (path: string) => {
        playClick();
        router.push(path);
    };

    // 📱 REFINED TABS FOR EdIntel USERS
    const bottomTabs = [
        { id: 'home', label: 'Home', icon: Home, link: '/' },
        { id: 'the-room', label: 'Room', icon: Sparkles, link: '/the-room' },
        { id: 'command', label: 'Command', icon: LayoutDashboard, link: '/the-room' },
        { id: 'identity', label: 'Identity', icon: User, link: '/identity' },
        { id: 'more', label: 'More', icon: Menu, action: () => setMenuOpen(true) },
    ];

    const menuItems = [
        { label: 'Sovereign Room', icon: GraduationCap, link: '/the-room' },
        { label: 'Enterprise & Pricing', icon: CreditCard, link: '/pricing' },
        { label: 'Sovereign Protocol', icon: Shield, link: '/generators' },
        { label: 'Settings', icon: Settings, link: '/settings' },
    ];

    return (
        <>
            {/* Bottom Navigation Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-white/10 safe-area-inset-bottom pb-safe">
                <div className="flex items-center justify-around px-2 py-3">
                    {bottomTabs.map((tab) => {
                        const isActive = tab.link ? isActiveTab(tab.link) : false;
                        const isMore = tab.id === 'more';

                        return (
                            <button
                                key={tab.id}
                                onClick={() => {
                                    playClick();
                                    if (tab.action) tab.action();
                                    else if (tab.link) router.push(tab.link);
                                }}
                                className="relative flex flex-col items-center gap-1 min-w-[60px]"
                            >
                                <div className={`p-2 rounded-xl transition-all duration-300 ${isActive
                                    ? 'bg-gradient-to-br from-electric-cyan to-blue-700 shadow-lg shadow-electric-cyan/20'
                                    : isMore && menuOpen ? 'bg-white/10' : 'bg-transparent'
                                    }`}>
                                    <tab.icon
                                        size={20}
                                        className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-zinc-500'
                                            } ${isMore && menuOpen ? 'text-white' : ''}`}
                                    />
                                </div>
                                <span className={`text-[9px] font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-electric-cyan' : 'text-zinc-600'
                                    } ${isMore && menuOpen ? 'text-white' : ''}`}>
                                    {tab.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* EdIntel Full Screen Menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="lg:hidden fixed inset-0 z-40 bg-[#050505] overflow-y-auto"
                    >
                        {/* Menu Header */}
                        <div className="sticky top-0 bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 p-4 flex items-center justify-between z-50">
                            <div className="flex items-center gap-2">
                                <Shield className="text-sovereign-gold w-6 h-6" />
                                <span className="text-white font-black uppercase tracking-widest text-sm">EdIntel Menu</span>
                            </div>
                            <button
                                onClick={() => { playClick(); setMenuOpen(false); }}
                                className="p-2 rounded-full bg-white/5 text-zinc-400 hover:text-white"
                                aria-label="Close Menu"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* User Identity Card */}
                        <div className="p-6">
                            {user ? (
                                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-6">
                                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-electric-cyan via-sovereign-gold to-white opacity-50" />

                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sovereign-gold/20 to-amber-600/20 border border-sovereign-gold/30 flex items-center justify-center text-xl font-black text-sovereign-gold shadow-lg shadow-sovereign-gold/10">
                                            {user.name?.[0]?.toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="text-white font-black text-lg leading-tight uppercase tracking-tight">{user.name}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="px-2 py-0.5 rounded-full bg-sovereign-gold/10 border border-sovereign-gold/20 text-[9px] font-bold text-sovereign-gold uppercase tracking-wider">
                                                    {user.tier}
                                                </span>
                                                <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-500 uppercase tracking-wider">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                    Active
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <button onClick={() => handleNavigation('/profile')} className="p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-sovereign-gold/30 transition-all text-center group">
                                            <div className="text-2xl font-black text-white group-hover:text-sovereign-gold transition-colors">{user.usage_count || 0}</div>
                                            <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Operations</div>
                                        </button>
                                        <button className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
                                            <div className="text-2xl font-black text-white">PRO</div>
                                            <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Status</div>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12 rounded-3xl bg-zinc-900/50 border border-white/5">
                                    <h3 className="text-white font-black uppercase tracking-widest text-sm mb-6">Initialize Session</h3>
                                    <div className="flex flex-col gap-3 px-6">
                                        <Link href="/login" className="w-full">
                                            <button className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs">Login</button>
                                        </Link>
                                        <Link href="/signup" className="w-full">
                                            <button className="w-full py-4 rounded-xl bg-sovereign-gold text-black font-black uppercase tracking-widest text-xs">Activate Session</button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Navigation Links */}
                        <div className="px-6 space-y-3 pb-32">
                            {menuItems.map((item, index) => (
                                <Link key={index} href={item.link} onClick={() => setMenuOpen(false)}>
                                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2.5 rounded-xl bg-black border border-white/10 text-zinc-400 group-hover:text-sovereign-gold group-hover:border-sovereign-gold/30 transition-all">
                                                <item.icon size={20} />
                                            </div>
                                            <span className="text-sm font-bold text-zinc-300 group-hover:text-white uppercase tracking-wide">
                                                {item.label}
                                            </span>
                                        </div>
                                        <Globe size={16} className="text-zinc-700 -rotate-45" />
                                    </div>
                                </Link>
                            ))}

                            {user && (
                                <button
                                    onClick={() => { logout(); setMenuOpen(false); }}
                                    className="w-full mt-8 p-5 rounded-2xl border border-red-500/20 bg-red-500/5 text-red-500 font-black uppercase tracking-widest text-[10px] hover:bg-red-500/10 transition-all flex items-center justify-center gap-3"
                                >
                                    <LogOut size={16} />
                                    <span>Disconnect Terminal</span>
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom Spacer */}
            <div className="lg:hidden h-24" />
        </>
    );
}
