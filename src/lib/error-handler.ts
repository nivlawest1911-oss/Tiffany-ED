import * as Sentry from '@sentry/nextjs'

// Initialize Sentry is usually handled in sentry.server.config.ts / sentry.client.config.ts
// but we provide a convenience wrapper for specific captures.

export function captureException(error: Error, context?: Record<string, any>) {
    console.error('[EDINTEL_SYSTEM_ERROR]', error)

    Sentry.captureException(error, {
        extra: context,
    })

    // Also log to our institutional vault for audit trails
    if (typeof window !== 'undefined') {
        fetch('/api/logging/error', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: error.message,
                stack: error.stack,
                context: {
                    ...context,
                    url: window.location.href,
                    userAgent: navigator.userAgent,
                },
                timestamp: new Date().toISOString(),
            }),
        }).catch(err => console.error('[AUDIT_LOG_FAILED]', err))
    }
}

export class APIError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public code?: string
    ) {
        super(message)
        this.name = 'APIError'
    }
}
