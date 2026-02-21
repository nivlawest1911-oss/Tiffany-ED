'use client'

import { useEffect, useState } from 'react'
import { Download, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PWAInstall() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
    const [showPrompt, setShowPrompt] = useState(false)

    useEffect(() => {
        const handler = (e: any) => {
            e.preventDefault()
            setDeferredPrompt(e)
            setShowPrompt(true)
        }

        window.addEventListener('beforeinstallprompt', handler)
        return () => window.removeEventListener('beforeinstallprompt', handler)
    }, [])

    const handleInstall = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt()
            const { outcome } = await deferredPrompt.userChoice
            if (outcome === 'accepted') {
                setShowPrompt(false)
            }
            setDeferredPrompt(null)
        }
    }

    return (
        <AnimatePresence>
            {showPrompt && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-card border border-border rounded-2xl shadow-2xl p-4 z-[100] overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600" />
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                            <Download className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <p className="font-bold text-foreground">Install EdIntel App</p>
                                <button
                                    onClick={() => setShowPrompt(false)}
                                    className="p-1 hover:bg-muted rounded-full transition-colors"
                                    aria-label="Close installation prompt"
                                >
                                    <X className="w-4 h-4 text-muted-foreground" />
                                </button>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4 leading-snug">
                                Access your AI delegates faster with offline support and institutional notifications.
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={handleInstall}
                                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-xs uppercase tracking-widest transition-all"
                                >
                                    Install Now
                                </button>
                                <button
                                    onClick={() => setShowPrompt(false)}
                                    className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg font-bold text-xs uppercase tracking-widest transition-all"
                                >
                                    Later
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
