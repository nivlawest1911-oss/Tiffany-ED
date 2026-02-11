'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ReactNode } from 'react';

interface EdIntelNodeProps {
    children: ReactNode;
    videoSrc?: string;
    fallbackImage?: string;
    title?: string;
    actionText?: string;
    onAction?: () => void;
    delay?: number; // For staggered entrance animations
}

/**
 * EdIntelNode - Cinematic card wrapper with video background
 * 
 * Z-Index Layering:
 * 0: Video background
 * 1: Gradient overlay
 * 2: Content
 * 3: Action bar
 */
export default function EdIntelNode({
    children,
    videoSrc,
    fallbackImage,
    title,
    actionText,
    onAction,
    delay = 0,
}: EdIntelNodeProps) {
    return (
        <motion.div
            className="EdIntel-node"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay, ease: 'easeOut' }}
            whileHover={{ scale: 1.02 }}
        >
            {/* LAYER 0: Video Background */}
            {videoSrc && (
                <div className="node-video-layer">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="node-bg-video"
                        poster={fallbackImage}
                    >
                        <source src={videoSrc} type="video/mp4" />
                        {fallbackImage && (
                            <Image src={fallbackImage} alt="Video fallback" fill className="node-bg-video object-cover" />
                        )}
                    </video>
                </div>
            )}

            {/* LAYER 1: Gradient Overlay */}
            <div className="node-gradient-overlay" />

            {/* LAYER 2: Content */}
            <div className="node-content-layer">
                {title && <div className="node-header">{title}</div>}
                <div className="node-body">{children}</div>
            </div>

            {/* LAYER 3: Action Bar */}
            {actionText && (
                <motion.div
                    className="node-action-bar"
                    onClick={onAction}
                    role={onAction ? 'button' : undefined}
                    tabIndex={onAction ? 0 : undefined}
                    whileHover={{ backgroundColor: '#3b82f6' }}
                    transition={{ duration: 0.3 }}
                >
                    {actionText}
                </motion.div>
            )}
        </motion.div>
    );
}
