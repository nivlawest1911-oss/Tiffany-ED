'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RefreshCcw, LogOut } from 'lucide-react'
import { captureException } from '@/lib/error-handler'

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        captureException(error)
    }, [error])

    return (
        <html lang="en" className="dark">
            <body className="flex items-center justify-center min-h-svh bg-[#050505] text-gray-100 font-sans antialiased px-4 py-8 sm:px-6">
                <div className="text-center w-full max-w-md mx-auto">
                    {/* Warning Icon - properly sized for mobile */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 sm:mb-8 flex items-center justify-center">
                        <div className="relative">
                            {/* Yellow warning triangle background */}
                            <div className="w-16 h-16 sm:w-20 sm:h-20">
                                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                                    <path 
                                        d="M12 2L1 21h22L12 2z" 
                                        fill="#FACC15" 
                                        stroke="#EAB308" 
                                        strokeWidth="0.5"
                                    />
                                    <circle cx="12" cy="17" r="1" fill="#1a1a1a"/>
                                    <rect x="11" y="9" width="2" height="5" rx="1" fill="#1a1a1a"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    
                    {/* Title - responsive sizing */}
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 sm:mb-4 text-amber-500 text-balance">
                        Critical Systems Failure
                    </h1>
                    
                    {/* Description - better line height and spacing for mobile */}
                    <p className="text-gray-400 mb-8 sm:mb-10 text-base sm:text-lg leading-relaxed text-pretty px-2 sm:px-0">
                        An unexpected error has occurred in the EdIntel core. Our engineering team has been notified and the institutional state is being preserved.
                    </p>
                    
                    {/* Buttons - full width on mobile, better touch targets */}
                    <div className="flex flex-col gap-3 sm:gap-4 w-full">
                        <button
                            onClick={() => reset()}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 sm:py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl font-semibold uppercase tracking-wider transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98] touch-manipulation text-sm sm:text-base"
                        >
                            <RefreshCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                            Reboot Terminal
                        </button>
                        <Link
                            href="/"
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 sm:py-3.5 border border-gray-700 bg-gray-900/50 hover:bg-gray-800 active:bg-gray-900 text-gray-100 rounded-xl font-semibold uppercase tracking-wider transition-all active:scale-[0.98] touch-manipulation text-sm sm:text-base"
                        >
                            <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                            Emergency Exit
                        </Link>
                    </div>
                    
                    {/* Optional: Error digest for debugging (small text) */}
                    {error.digest && (
                        <p className="mt-8 text-xs text-gray-600 font-mono">
                            Error ID: {error.digest}
                        </p>
                    )}
                </div>
            </body>
        </html>
    )
}
