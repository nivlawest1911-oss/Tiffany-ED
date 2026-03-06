'use client'

import { useEffect } from 'react'
import Link from 'next/link'
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
        <html>
            <body className="flex items-center justify-center min-h-screen bg-background text-foreground font-sans antialiased">
                <div className="text-center p-8 max-w-lg">
                    <div className="text-8xl mb-8 animate-bounce">⚠️</div>
                    <h1 className="text-4xl font-bold tracking-tight mb-4">
                        Critical Systems Failure
                    </h1>
                    <p className="text-muted-foreground mb-8 text-lg">
                        An unexpected error has occurred in the EdIntel core. Our engineering team has been notified and the institutional state is being preserved.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => reset()}
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                        >
                            Reboot Terminal
                        </button>
                        <Link
                            href="/"
                            className="px-8 py-3 border border-border bg-card hover:bg-muted text-foreground rounded-xl font-bold uppercase tracking-widest transition-all active:scale-95"
                        >
                            Emergency Exit
                        </Link>
                    </div>
                </div>
            </body>
        </html>
    )
}
