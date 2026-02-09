'use client';

import React from 'react';

interface GlassModuleProps {
    title?: string;
    children: React.ReactNode;
    actionText?: string;
    onAction?: () => void;
}

/**
 * SYSTEM 3: The Glass Module
 * 
 * Reusable component for EVERY box in the app.
 * Guarantees they never overlap with strict flexbox physics.
 */
const GlassModule = ({ title, children, actionText, onAction }: GlassModuleProps) => {
    return (
        <div className="glass-module-card">
            {/* Header */}
            {title && <div className="module-header">{title}</div>}

            {/* Scrollable Content */}
            <div className="module-content">
                {children}
            </div>

            {/* Locked Action Bar */}
            {actionText && (
                <div
                    className="module-command-deck"
                    onClick={onAction}
                    role={onAction ? "button" : undefined}
                    tabIndex={onAction ? 0 : undefined}
                >
                    {actionText}
                </div>
            )}
        </div>
    );
};

export default GlassModule;
