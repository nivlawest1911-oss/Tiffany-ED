'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Globe } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import EdIntelLogo from './EdIntelLogo';
import useProfessionalSounds from '@/hooks/useProfessionalSounds';

export default function FloatingNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const { playHover } = useProfessionalSounds();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'The Room', href: '/the-room' },
        { name: 'Features', href: '/#features' },
        {
            name: 'AI Hub',
            href: '#',
            submenu: [
                { name: 'Gemini Workspace', href: '/gemini-workspace', badge: 'NEW' },
                { name: 'Hugging Face Studio', href: '/huggingface', badge: 'AI' },
                { name: 'AI Phone Center', href: '/phone', badge: 'LIVE' },
            ]
        },
        { name: 'Pricing', href: '/#pricing' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' },
    ];

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
                        <div className="hidden md:flex items-center gap-10">
                            {navLinks.map((link) => (
                                <div key={link.name} className="relative group">
                                    {link.submenu ? (
                                        <>
                                            <button
                                                className="text-xs font-black text-zinc-400 hover:text-noble-gold uppercase tracking-widest transition-all flex items-center gap-2"
                                                onMouseEnter={() => playHover()}
                                            >
                                                {link.name}
                                                <motion.span
                                                    animate={{ rotate: [0, 180] }}
                                                    transition={{ duration: 0.3 }}
                                                    className="group-hover:rotate-180 transition-transform"
                                                >
                                                    ▼
                                                </motion.span>
                                            </button>
                                            {/* Dropdown Menu */}
                                            <div className="absolute top-full left-0 mt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[200]">
                                                <div className="bg-noble-black/95 backdrop-blur-3xl border border-white/10 rounded-2xl p-4 shadow-2xl min-w-[280px]">
                                                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-kente-yellow via-kente-green to-kente-red rounded-t-2xl" />
                                                    <div className="flex flex-col gap-2 mt-2">
                                                        {link.submenu.map((sublink) => (
                                                            <Link
                                                                key={sublink.name}
                                                                href={sublink.href}
                                                                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 transition-all group/item"
                                                                onMouseEnter={() => playHover()}
                                                            >
                                                                <span className="text-sm font-bold text-zinc-300 group-hover/item:text-white">
                                                                    {sublink.name}
                                                                </span>
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
                                            </div>
                                        </>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className="text-xs font-black text-zinc-400 hover:text-noble-gold uppercase tracking-widest transition-all"
                                            onMouseEnter={() => playHover()}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* CTA / User Profile */}
                        <div className="hidden md:flex items-center gap-6">
                            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black text-zinc-400 hover:text-white hover:border-kente-green/50 transition-all group">
                                <Globe size={14} className="group-hover:text-kente-green" />
                                <span>PROTOCOL: INT</span>
                            </button>

                            {user ? (
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-3">
                                        <div className="text-right">
                                            <p className="text-[10px] font-black text-white uppercase tracking-tighter leading-none">{user.name}</p>
                                            <p className="text-[8px] font-black text-noble-gold uppercase tracking-[0.2em] mt-1">{user.tier}</p>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-noble-gold/20 to-indigo-500/20 border border-noble-gold/30 flex items-center justify-center font-black text-noble-gold text-xs shadow-lg">
                                            {user.name?.[0].toUpperCase()}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => logout()}
                                        className="text-[10px] font-black text-zinc-500 hover:text-kente-red uppercase tracking-widest transition-colors"
                                        onMouseEnter={() => playHover()}
                                    >
                                        Exit
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-6">
                                    <Link href="/login" className="text-[10px] font-black text-zinc-400 hover:text-white uppercase tracking-widest transition-colors" onMouseEnter={() => playHover()}>
                                        Sign In
                                    </Link>
                                    <Link href="/signup">
                                        <button className="px-6 py-3 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:bg-noble-gold shadow-xl shadow-noble-gold/20 active:scale-95" onMouseEnter={() => playHover()}>
                                            Initialize
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
