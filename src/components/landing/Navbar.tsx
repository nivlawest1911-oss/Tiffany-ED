'use client';

import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10"
        >
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="text-white font-black text-sm">E</span>
                        </div>
                        <span className="text-xl font-black tracking-tight">EDINTEL</span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Features
                        </a>
                        <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            Pricing
                        </a>
                        <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                            About
                        </a>
                        <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-bold text-sm hover:shadow-[0_0_20px_rgba(112,0,255,0.4)] transition-all">
                            Sign In
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Nav */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden mt-4 pt-4 border-t border-white/10"
                    >
                        <div className="flex flex-col gap-4">
                            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                Features
                            </a>
                            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                Pricing
                            </a>
                            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                                About
                            </a>
                            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-bold text-sm">
                                Sign In
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
}
