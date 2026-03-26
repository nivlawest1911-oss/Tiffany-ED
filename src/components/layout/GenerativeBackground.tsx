"use client";

import React, { useEffect, useState } from 'react';

/**
 * Lightweight GenerativeBackground
 * Uses pure CSS animations instead of framer-motion to avoid 
 * blocking LCP/FCP with heavy JS bundle on every page.
 */
const GenerativeBackground: React.FC = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Defer rendering decorative elements until after hydration
        // Polyfill/Fallback for requestIdleCallback (missing in older mobile Safari)
        const ric = typeof window !== 'undefined' && (window as any).requestIdleCallback 
            ? (window as any).requestIdleCallback 
            : (cb: any) => setTimeout(cb, 1);
            
        const cic = typeof window !== 'undefined' && (window as any).cancelIdleCallback 
            ? (window as any).cancelIdleCallback 
            : (id: any) => clearTimeout(id);

        const id = ric(() => setMounted(true));
        return () => cic(id);
    }, []);

    if (!mounted) {
        // Render minimal static background during SSR/initial paint
        return <div className="fixed inset-0 -z-10 bg-gray-50" />;
    }

    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-gray-50">
            {/* CSS-only animated gradients — no JS animation library needed */}
            <div
                className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-primary-500/10 to-secondary-500/10 blur-[100px] animate-[drift1_20s_linear_infinite]"
            />
            <div
                className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-gradient-to-tr from-secondary-500/10 to-primary-500/10 blur-[120px] animate-[drift2_25s_linear_infinite]"
            />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)`,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.02)_100%)]" />
        </div>
    );
};

export default GenerativeBackground;
