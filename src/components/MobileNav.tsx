'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, MessageSquare, BookOpen, Library, Settings, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_ITEMS = [
    { icon: Home, label: 'Home', href: '/dashboard' },
    { icon: MessageSquare, label: 'Chat', href: '/conversation' },
    { icon: BookOpen, label: 'Lessons', href: '/generators' },
    { icon: Library, label: 'Library', href: '/vault' },
    { icon: Settings, label: 'Settings', href: '/settings' },
]

export default function MobileNav() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* 📱 Bottom Navigation for Mobile */}
            <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border md:hidden z-50 px-2 pb-safe-area-inset-bottom">
                <div className="flex justify-around items-center h-16">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex-1 flex flex-col items-center justify-center gap-1 transition-all duration-300 ${isActive
                                    ? 'text-blue-500 scale-110'
                                    : 'text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                <div className={`p-1.5 rounded-xl transition-colors ${isActive ? 'bg-blue-500/10' : ''}`}>
                                    <item.icon className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
                            </Link>
                        )
                    })}
                </div>
            </nav>

            {/* ☰ Mobile Hamburger for Drawer */}
            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden fixed top-4 right-4 z-[60] p-2.5 bg-card/50 backdrop-blur-md border border-border rounded-xl shadow-lg active:scale-90 transition-transform"
                aria-label="Open navigation menu"
            >
                <Menu className="w-6 h-6 text-foreground" />
            </button>

            {/* 🛸 Mobile Menu Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] md:hidden">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-background/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 bottom-0 w-80 bg-card border-l border-border shadow-2xl p-6 flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold italic">E</div>
                                    <span className="font-bold text-lg tracking-tight">EdIntel Command</span>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-muted rounded-full transition-colors"
                                    aria-label="Close navigation menu"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-2 flex-1">
                                {NAV_ITEMS.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${pathname === item.href
                                            ? 'bg-blue-500/10 text-blue-500 font-bold'
                                            : 'hover:bg-muted text-foreground/80'
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span className="text-sm uppercase tracking-widest font-medium">{item.label}</span>
                                    </Link>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-border">
                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest text-center">
                                    EdIntel Sovereign v1.0.0
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
