'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { RefreshCcw, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application Error:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-[#050507] text-white flex flex-col items-center justify-center p-6 text-center">
            <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20 mb-6 animate-pulse">
                <AlertTriangle className="w-12 h-12 text-red-500" />
            </div>

            <h2 className="text-3xl font-black mb-4 tracking-tight">SYSTEM UPLINK INTERRUPTED</h2>
            <p className="text-zinc-400 max-w-md mb-8">
                A neural synchronization error has occurred in the strategic matrix.
                Diagnostics have been logged.
            </p>

            <div className="flex gap-4">
                <button
                    onClick={() => reset()}
                    className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm uppercase tracking-widest transition-all flex items-center gap-2"
                >
                    <RefreshCcw className="w-4 h-4" />
                    Reboot System
                </button>
                <Link
                    href="/"
                    className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm uppercase tracking-widest transition-all"
                >
                    Return Home
                </Link>
            </div>

            {/* DEBUG: Always show error details temporarily for diagnosing the crash */}
            <div className="mt-12 p-4 bg-black rounded-lg border border-white/10 max-w-2xl text-left overflow-auto max-h-64 scrollbar-thin">
                <p className="text-red-400 font-mono text-xs">{error.message}</p>
                {error.digest && <p className="text-zinc-500 font-mono text-[10px] mt-1">Digest: {error.digest}</p>}
                {process.env.NODE_ENV === 'development' && error.stack && (
                    <pre className="text-zinc-500 font-mono text-[10px] mt-2">{error.stack}</pre>
                )}
            </div>
        </div>
    );
}
