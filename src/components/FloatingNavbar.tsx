'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import EdIntelLogo from './EdIntelLogo';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';
import { useIntelligence } from '@/context/IntelligenceContext';

export default function FloatingNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const { playHover } = useProfessionalSounds();
    const { generateBriefing } = useIntelligence();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Professional Center', href: '/professional', badge: 'NEW' },
        { name: 'The Room', href: '/the-room' },
        { name: 'Features', href: '/#features', scroll: true },
        {
            name: 'AI Hub',
            href: '#',
            submenu: [
                { name: 'Gemini Workspace', href: '/gemini-workspace', badge: 'NEW' },
                { name: 'Hugging Face Studio', href: '/huggingface', badge: 'AI' },
                { name: 'AI Phone Center', href: '/phone', badge: 'LIVE' },
                { name: 'Video Studio', href: '/video-studio', badge: 'PRO' },
                { name: 'SOVEREIGN Core', href: '/sovereign', badge: 'FX' },
            ]
        },
        { name: 'Pricing', href: '/#pricing', scroll: true },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

    const pathname = usePathname();

    // Smooth scroll handler for anchor links
    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith('/#')) {
            // Only intercept if we are already on the home page
            if (pathname === '/') {
                e.preventDefault();
                const id = href.replace('/#', '');
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setMobileMenuOpen(false);
                }
            }
            // If not on home page, let the default Link behavior handle navigation to '/'
        }
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className={`relative rounded-[2rem] transition-all duration-500 overflow-hidden ${scrolled
                        ? 'bg-noble-black/80 backdrop-blur-3xl border border-white/10 shadow-2xl p-4'
                        : 'bg-transparent p-0'
                        }`}
                >
                    {/* Kente Navbar Top Border */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-kente-yellow via-kente-green to-kente-red z-[110]" />

                    <div className="flex items-center justify-between px-2">
                        {/* Logo */}
                        <Link href="/" className="relative z-50 flex items-center gap-4" onMouseEnter={() => playHover()}>
                            <EdIntelLogo />
                            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-noble-gold/10 border border-noble-gold/20 text-[9px] font-black text-noble-gold tracking-widest uppercase animate-pulse">
                                <div className="w-1.5 h-1.5 rounded-full bg-noble-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
                                Professional Center
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <div key={link.name} className="relative group">
                                    {link.submenu ? (
                                        <>
                                            <Link
                                                href="/ai-hub"
                                                className="text-xs font-bold text-zinc-400 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-1.5 py-2"
                                                onMouseEnter={() => playHover()}
                                            >
                                                {link.name}
                                                <motion.span
                                                    animate={{ rotate: [0, 180] }}
                                                    transition={{ duration: 0.3 }}
                                                    className="group-hover:rotate-180 transition-transform text-[8px]"
                                                >
                                                    ▼
                                                </motion.span>
                                            </Link>
                                            {/* Dropdown Menu */}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[200]">
                                                <div className="bg-noble-black/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-2 shadow-2xl min-w-[240px] overflow-hidden">
                                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-noble-gold to-transparent opacity-50" />
                                                    <div className="flex flex-col gap-1">
                                                        {link.submenu.map((sublink) => (
                                                            <Link
                                                                key={sublink.name}
                                                                href={sublink.href}
                                                                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 transition-all group/item"
                                                                onMouseEnter={() => playHover()}
                                                            >
                                                                <span className="text-sm font-medium text-zinc-300 group-hover/item:text-white transition-colors">
                                                                    {sublink.name}
                                                                </span>
                                                                {sublink.badge && (
                                                                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${sublink.badge === 'NEW' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                                        sublink.badge === 'AI' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                                                                            'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                                        }`}>
                                                                        {sublink.badge}
                                                                    </span>
                                                                )}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className="text-xs font-bold text-zinc-400 hover:text-white uppercase tracking-widest transition-colors py-2 block"
                                            onMouseEnter={() => playHover()}
                                            onClick={(e) => (link as any).scroll ? handleSmoothScroll(e, link.href) : undefined}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* CTA / User Profile */}
                        <div className="hidden md:flex items-center gap-4">
                            {/* Enterprise Link */}
                            <Link href="/enterprise">
                                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-noble-gold/5 border border-noble-gold/20 text-[10px] font-black text-noble-gold hover:bg-noble-gold/10 transition-all uppercase tracking-wider" onMouseEnter={() => playHover()}>
                                    <Globe size={12} />
                                    <span>Enterprise</span>
                                </button>
                            </Link>

                            {user ? (
                                <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                                    <Link href="/dashboard" className="group flex items-center gap-3">
                                        <div className="text-right hidden lg:block">
                                            <p className="text-[10px] font-black text-white uppercase tracking-tighter">{user.name}</p>
                                            <div className="flex items-center justify-end gap-1 text-[8px] font-bold text-emerald-400 uppercase tracking-wider">
                                                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                                Online
                                            </div>
                                        </div>
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-zinc-800 to-black border border-white/10 flex items-center justify-center font-black text-white text-xs shadow-inner group-hover:border-noble-gold/50 transition-colors">
                                            {user.name?.[0]?.toUpperCase()}
                                        </div>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                                    <Link href="/login" className="text-[10px] font-black text-zinc-400 hover:text-white uppercase tracking-widest transition-colors" onMouseEnter={() => playHover()}>
                                        Log In
                                    </Link>
                                    <Link href="/signup">
                                        <button className="px-5 py-2.5 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-[0.15em] hover:bg-noble-gold transition-colors shadow-lg active:scale-95" onMouseEnter={() => playHover()}>
                                            Start
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-white"
                            onMouseEnter={() => playHover()}
                        >
                            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="md:hidden absolute top-full left-0 right-0 px-4 mt-4"
                    >
                        <div className="bg-noble-black/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-kente-yellow via-kente-green to-kente-red" />

                            <div className="flex flex-col gap-6">
                                {navLinks.map((link) => (
                                    <div key={link.name}>
                                        {link.submenu ? (
                                            <div className="flex flex-col gap-3">
                                                <div className="text-xl font-black text-noble-gold uppercase tracking-tighter">
                                                    {link.name}
                                                </div>
                                                <div className="flex flex-col gap-3 pl-4 border-l-2 border-white/10">
                                                    {link.submenu.map((sublink) => (
                                                        <Link
                                                            key={sublink.name}
                                                            href={sublink.href}
                                                            onClick={() => setMobileMenuOpen(false)}
                                                            className="flex items-center justify-between text-lg font-bold text-zinc-300 hover:text-white transition-colors"
                                                            onMouseEnter={() => playHover()}
                                                        >
                                                            <span>{sublink.name}</span>
                                                            {sublink.badge && (
                                                                <span className={`text-[8px] font-black px-2 py-1 rounded-full ${sublink.badge === 'NEW' ? 'bg-emerald-500/20 text-emerald-400' :
                                                                    sublink.badge === 'AI' ? 'bg-purple-500/20 text-purple-400' :
                                                                        'bg-red-500/20 text-red-400'
                                                                    }`}>
                                                                    {sublink.badge}
                                                                </span>
                                                            )}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="text-xl font-black text-zinc-300 hover:text-noble-gold uppercase tracking-tighter transition-colors"
                                                onMouseEnter={() => playHover()}
                                            >
                                                {link.name}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                                <div className="h-px w-full bg-white/5 my-2" />
                                {user ? (
                                    <button
                                        onClick={() => { logout(); setMobileMenuOpen(false); }}
                                        className="text-left text-xl font-black text-kente-red uppercase tracking-tighter"
                                        onMouseEnter={() => playHover()}
                                    >
                                        Exit Protocol
                                    </button>
                                ) : (
                                    <>
                                        <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-xl font-black text-white uppercase tracking-tighter" onMouseEnter={() => playHover()}>
                                            Sign In
                                        </Link>
                                        <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                                            <button className="w-full py-5 rounded-[1.5rem] bg-noble-gold text-black font-black uppercase tracking-widest text-sm" onMouseEnter={() => playHover()}>
                                                Initialize Center
                                            </button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
