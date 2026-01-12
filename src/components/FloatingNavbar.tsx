'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

export default function FloatingNavbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Features', href: '/#features' },
        { name: 'Pricing', href: '/#pricing' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact-command' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className={`relative rounded-2xl transition-all duration-300 ${scrolled
                        ? 'bg-zinc-950/80 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20 p-4'
                        : 'bg-transparent p-0'
                        }`}
                >
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <div className="relative w-8 h-8">
                                <Image
                                    src="/webrenew-icon-xl.png"
                                    alt="EdIntel Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">EdIntel</span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="hidden md:flex items-center gap-4">
                            {user ? (
                                <div className="flex items-center gap-4">
                                    <div className="text-sm font-medium text-white/80">
                                        {user.name && user.name.split(' ')[0]}
                                        <span className="ml-2 text-xs text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider">{user.tier}</span>
                                    </div>
                                    <button
                                        onClick={() => logout()}
                                        className="text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Link href="/login" className="text-sm font-medium text-white hover:text-indigo-400 transition-colors">
                                        Sign In
                                    </Link>
                                    <Link href="/signup">
                                        <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-indigo-500/20">
                                            Get Started
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-white"
                        >
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden absolute top-full left-0 right-0 px-4 mt-2"
                    >
                        <div className="bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl">
                            <div className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-base font-medium text-zinc-300 hover:text-white"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <hr className="border-white/10" />
                                <Link href="/login" className="text-center text-white py-2">
                                    Sign In
                                </Link>
                                <Link href="/signup">
                                    <button className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold">
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
