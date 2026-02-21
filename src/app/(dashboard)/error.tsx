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
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="bg-card border border-border rounded-3xl shadow-2xl p-10 max-w-md w-full text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-red-500" />
                <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
                    <AlertTriangle className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Protocol Error</h2>
                <p className="text-muted-foreground mb-8 line-clamp-3 italic">
                    "{error.message || 'Institutional uplink interrupted.'}"
                </p>
                <div className="space-y-3">
                    <button
                        onClick={() => reset()}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20"
                    >
                        <RefreshCcw className="w-4 h-4" />
                        Retry Protocol
                    </button>
                    <a
                        href="/dashboard"
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-border bg-card hover:bg-muted text-foreground rounded-xl font-bold uppercase tracking-widest transition-all"
                    >
                        <Home className="w-4 h-4" />
                        Command Center
                    </a>
                </div>
            </div>
        </div>
    )
}
