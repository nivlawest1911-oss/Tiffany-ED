'use client';

import React from 'react';
import { useAide } from '@/context/AideMessagingContext';

interface SmartHoverProps {
    children: React.ReactNode;
    message: string;
    source?: string;
    delay?: number;
}

/**
 * SmartHover wraps any component and triggers the Sovereign Aide message on hover.
 */
export function SmartHover({ children, message, source = 'Sovereign Aide', delay = 0 }: SmartHoverProps) {
    const { setMessage } = useAide();
    const timerRef = React.useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            setMessage({ text: message, source });
        }, delay);
    };

    const handleMouseLeave = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setMessage(null);
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="contents" // Ensure it doesn't break layout
        >
            {children}
        </div>
    );
}
