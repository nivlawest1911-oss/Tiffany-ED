'use client';

import { motion } from 'framer-motion';
import { useHumanBehavior } from '@/hooks/useHumanBehavior';
import Image from 'next/image';

const MotionImage = motion.create(Image);

interface HumanAvatarProps {
    src: string;
    alt: string;
    isActive?: boolean;
    state?: 'idle' | 'thinking' | 'speaking' | 'listening' | 'alert';
    subtle?: boolean;
    className?: string;
    load?: number;
    onClick?: () => void;
    onError?: (e: any) => void;
    priority?: boolean;
    animate?: any;
    isFocused?: boolean;
}

export default function HumanAvatar({ 
    src, 
    alt, 
    isActive = true, 
    state = 'idle',
    subtle = false,
    className = "",
    load = 50,
    onClick,
    onError,
    priority = false,
    animate,
    isFocused = false,
    ...props
}: HumanAvatarProps) {
    const { behaviorStyles } = useHumanBehavior(isActive, { 
        state, 
        subtle,
        load,
        isFocused
    });

    const mergedAnimate = {
        ...behaviorStyles,
        ...(typeof animate === 'object' ? animate : {}),
    };

    return (
        <MotionImage
            src={src}
            alt={alt}
            width={400}
            height={400}
            className={`${className} transition-all duration-700 aspect-square object-cover ${isFocused ? 'brightness-[1.1] drop-shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-[1.02]' : ''}`}
            animate={mergedAnimate}
            transition={{ duration: 3.5, ease: [0.23, 1, 0.32, 1] }}
            onClick={onClick}
            onError={onError}
            priority={priority}
            {...props as any}
        />
    );
}
