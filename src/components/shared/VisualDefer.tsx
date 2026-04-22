'use client';

import React, { useState, useEffect, useRef } from 'react';

interface VisualDeferProps {
    children: React.ReactNode;
    rootMargin?: string;
    threshold?: number;
    placeholder?: React.ReactNode;
    className?: string;
    height?: string;
}

/**
 * VisualDefer component that only renders its children when they enter the viewport.
 * Useful for performance optimization of heavy components below the fold.
 */
export default function VisualDefer({
    children,
    rootMargin = '200px',
    threshold = 0.01,
    placeholder = <div className="w-full h-full bg-zinc-900/50 animate-pulse rounded-3xl" />,
    className = "",
    height
}: VisualDeferProps) {
    const [isVisible, setIsVisible] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { rootMargin, threshold }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [rootMargin, threshold]);

    return (
        <div 
            ref={containerRef} 
            className={`min-w-full ${className}`}
            style={{ minHeight: height || 'auto' }}
        >
            {isVisible ? children : placeholder}
        </div>
    );
}
