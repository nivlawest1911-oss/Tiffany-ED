'use client'

import { useEffect } from 'react'

// Minimal error page with NO external dependencies to prevent cascade failures
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log error to console for debugging
        console.error('[GlobalError] Critical error occurred:', error)
    }, [error])

    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
                <title>System Error | EdIntel</title>
                <style dangerouslySetInnerHTML={{ __html: `
                    * { box-sizing: border-box; margin: 0; padding: 0; }
                    html, body { 
                        height: 100%; 
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    }
                    body {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        min-height: 100svh;
                        background: #050505;
                        color: #f3f4f6;
                        padding: 1rem;
                        -webkit-font-smoothing: antialiased;
                    }
                    .container {
                        text-align: center;
                        width: 100%;
                        max-width: 400px;
                    }
                    .icon {
                        width: 4.5rem;
                        height: 4.5rem;
                        margin: 0 auto 1.5rem;
                    }
                    @media (min-width: 640px) {
                        .icon { width: 5.5rem; height: 5.5rem; margin-bottom: 2rem; }
                    }
                    h1 {
                        font-size: 1.5rem;
                        font-weight: 700;
                        color: #f59e0b;
                        margin-bottom: 0.75rem;
                        letter-spacing: -0.02em;
                    }
                    @media (min-width: 640px) {
                        h1 { font-size: 1.875rem; margin-bottom: 1rem; }
                    }
                    p {
                        color: #9ca3af;
                        font-size: 1rem;
                        line-height: 1.6;
                        margin-bottom: 2rem;
                    }
                    @media (min-width: 640px) {
                        p { font-size: 1.125rem; margin-bottom: 2.5rem; }
                    }
                    .buttons {
                        display: flex;
                        flex-direction: column;
                        gap: 0.75rem;
                    }
                    button, a {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.5rem;
                        width: 100%;
                        padding: 1rem 1.5rem;
                        border-radius: 0.75rem;
                        font-weight: 600;
                        font-size: 0.875rem;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        cursor: pointer;
                        transition: all 0.2s;
                        text-decoration: none;
                        -webkit-tap-highlight-color: transparent;
                        touch-action: manipulation;
                    }
                    .primary {
                        background: #2563eb;
                        color: white;
                        border: none;
                        box-shadow: 0 4px 14px rgba(37, 99, 235, 0.25);
                    }
                    .primary:hover { background: #3b82f6; }
                    .primary:active { transform: scale(0.98); background: #1d4ed8; }
                    .secondary {
                        background: rgba(17, 24, 39, 0.5);
                        color: #f3f4f6;
                        border: 1px solid #374151;
                    }
                    .secondary:hover { background: #1f2937; }
                    .secondary:active { transform: scale(0.98); }
                    .error-id {
                        margin-top: 2rem;
                        font-size: 0.75rem;
                        color: #4b5563;
                        font-family: monospace;
                    }
                `}} />
            </head>
            <body>
                <div className="container">
                    {/* Warning Triangle SVG */}
                    <svg className="icon" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2L1 21h22L12 2z" fill="#FACC15" stroke="#EAB308" strokeWidth="0.5"/>
                        <circle cx="12" cy="17" r="1" fill="#1a1a1a"/>
                        <rect x="11" y="9" width="2" height="5" rx="1" fill="#1a1a1a"/>
                    </svg>
                    
                    <h1>Critical Systems Failure</h1>
                    
                    <p>
                        An unexpected error has occurred in the EdIntel core. Our engineering team has been notified and the institutional state is being preserved.
                    </p>
                    
                    <div className="buttons">
                        <button onClick={() => reset()} className="primary">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/>
                                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                            </svg>
                            Reboot Terminal
                        </button>
                        <button onClick={() => window.location.href = '/'} className="secondary">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
                            </svg>
                            Emergency Exit
                        </button>
                    </div>
                    
                    {error.digest && (
                        <p className="error-id">Error ID: {error.digest}</p>
                    )}
                </div>
            </body>
        </html>
    )
}
