'use client'

import { useEffect } from 'react'

export default function DashboardError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error('[DashboardError] Error occurred:', error)
    }, [error])

    return (
        <div className="min-h-[60svh] sm:min-h-[70svh] flex items-center justify-center px-4 py-8">
            <div className="bg-gray-900/80 border border-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-10 max-w-md w-full text-center relative overflow-hidden">
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 w-full h-1 sm:h-1.5 bg-red-500" />
                
                {/* Icon container */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-red-500">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                </div>
                
                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-bold text-gray-100 mb-2">
                    Protocol Error
                </h2>
                
                {/* Error message */}
                <p className="text-gray-400 mb-6 sm:mb-8 line-clamp-3 italic text-sm sm:text-base leading-relaxed">
                    {`"${error.message || 'Institutional uplink interrupted.'}"`}
                </p>
                
                {/* Action buttons - optimized for touch */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => reset()}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 sm:py-3.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-xl font-semibold uppercase tracking-wider transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] text-sm"
                        style={{ touchAction: 'manipulation' }}
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
                            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                        </svg>
                        Retry Protocol
                    </button>
                    <a
                        href="/"
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 sm:py-3.5 border border-gray-700 bg-gray-800/50 hover:bg-gray-800 active:bg-gray-900 text-gray-100 rounded-xl font-semibold uppercase tracking-wider transition-all active:scale-[0.98] text-sm"
                        style={{ touchAction: 'manipulation' }}
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                        </svg>
                        Return Home
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
