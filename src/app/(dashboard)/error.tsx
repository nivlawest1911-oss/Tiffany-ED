'use client'

import { useEffect } from 'react'
import { captureException } from '@/lib/error-handler'
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react'

export default function DashboardError({
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
        <div className="min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center px-4 py-8">
            <div className="bg-gray-900/80 border border-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-10 max-w-md w-full text-center relative overflow-hidden">
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 w-full h-1 sm:h-1.5 bg-red-500" />
                
                {/* Icon container */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-red-500">
                    <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                
                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-2 text-balance">
                    Protocol Error
                </h2>
                
                {/* Error message */}
                <p className="text-gray-400 mb-6 sm:mb-8 line-clamp-3 italic text-sm sm:text-base leading-relaxed">
                    &ldquo;{error.message || 'Institutional uplink interrupted.'}&rdquo;
                </p>
                
                {/* Action buttons - optimized for touch */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => reset()}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 sm:py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl font-semibold uppercase tracking-wider transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] touch-manipulation text-sm"
                    >
                        <RefreshCcw className="w-4 h-4" />
                        Retry Protocol
                    </button>
                    <a
                        href="/dashboard"
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 sm:py-3.5 border border-gray-700 bg-gray-800/50 hover:bg-gray-800 active:bg-gray-900 text-gray-100 rounded-xl font-semibold uppercase tracking-wider transition-all active:scale-[0.98] touch-manipulation text-sm"
                    >
                        <Home className="w-4 h-4" />
                        Command Center
                    </a>
                </div>
                
                {/* Error digest for debugging */}
                {error.digest && (
                    <p className="mt-6 text-xs text-gray-600 font-mono">
                        Error ID: {error.digest}
                    </p>
                )}
            </div>
        </div>
    )
}
