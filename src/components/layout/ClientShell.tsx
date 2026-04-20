'use client';

import dynamic from 'next/dynamic';

// Lazy-load decorative/non-critical components after hydration
const GenerativeBackground = dynamic(() => import('@/components/layout/GenerativeBackground'), { ssr: false });
const PWAInstall = dynamic(() => import('@/components/PWAInstall'), { ssr: false });

/**
 * Client-side shell for non-critical components.
 * Lazy-loads GenerativeBackground and PWAInstall to improve FCP/LCP.
 */
export default function ClientShell() {
    return (
        <>
            <PWAInstall />
            <GenerativeBackground />
        </>
    );
}
