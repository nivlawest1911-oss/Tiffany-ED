'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import HumanAvatar from '@/components/ui/HumanAvatar'

export default function SuccessPage() {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-[#000b18] overflow-hidden">
            {/* Liquid Mesh Background */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="liquid-mesh w-full h-full animate-pulse" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 w-full max-w-2xl p-12 glass-morphism rounded-[32px] border border-[#d4af37]/20 text-center mx-4"
            >
                {/* Hyper-Realistic EdIntel Representation - Dr. Alvin West */}
                <div className="mx-auto w-32 h-32 rounded-full border-2 border-[#d4af37] mb-6 overflow-hidden shadow-[0_0_30px_rgba(212,175,55,0.4)] bg-zinc-900 relative">
                    <HumanAvatar
                        src="/images/avatars/Dr._alvin_west.png"
                        alt="Dr. Alvin West - EdIntel Architect"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000b18]/60 to-transparent pointer-events-none" />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-[#d4af37] mb-4 tracking-tight">
                    Welcome, EdIntel
                </h1>

                <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-md mx-auto">
                    Identity Verified. Your 30-day trial is now active. The EdIntel agents are mapping your district data.
                </p>

                <div className="flex flex-col gap-4 items-center">
                    <Link href="/dashboard">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(212,175,55,0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-3 bg-[#d4af37] text-[#000b18] px-10 py-5 rounded-full font-bold text-lg shadow-xl"
                        >
                            Enter Command Deck <ArrowRight size={22} />
                        </motion.button>
                    </Link>

                    <span className="text-xs text-[#d4af37]/60 font-mono uppercase tracking-[0.2em]">
                        Autonomous Systems Online • Mobile County Node Active
                    </span>
                </div>
            </motion.div>
        </div>
    )
}
