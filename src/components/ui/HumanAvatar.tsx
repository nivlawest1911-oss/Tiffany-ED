'use client';

import { motion } from 'framer-motion';
import { useHumanBehavior } from '@/hooks/useHumanBehavior';

interface HumanAvatarProps {
    src: string;
    alt: string;
    className?: string;
    onClick?: () => void;
    onError?: (e: any) => void;
}

export default function HumanAvatar({ src, alt, className, onClick, onError, animate, isActive = true, ...props }: HumanAvatarProps & React.ComponentProps<typeof motion.img> & { isActive?: boolean }) {
    const { behaviorStyles } = useHumanBehavior(isActive);

    const mergedAnimate = {
        ...behaviorStyles,
        ...(typeof animate === 'object' ? animate : {}),
    };

    return (
        <motion.img
            src={src}
            alt={alt}
            className={className}
            animate={mergedAnimate}
            transition={{ duration: 3.5, ease: [0.23, 1, 0.32, 1] }}
            onClick={onClick}
            onError={onError}
            {...props}
        />
    );
}
