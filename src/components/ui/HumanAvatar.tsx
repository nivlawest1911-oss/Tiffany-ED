'use client';

import { motion } from 'framer-motion';
import { useHumanBehavior } from '@/hooks/useHumanBehavior';
import Image from 'next/image';

const MotionImage = motion.create(Image);

interface HumanAvatarProps {
    src: string;
    alt: string;
    className?: string;
    onClick?: () => void;
    onError?: (e: any) => void;
}

export default function HumanAvatar({ src, alt, className, onClick, onError, animate, isActive = true, priority = false, ...props }: HumanAvatarProps & React.ComponentProps<typeof motion.img> & { isActive?: boolean; priority?: boolean }) {
    const { behaviorStyles } = useHumanBehavior(isActive);

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
            className={className}
            animate={mergedAnimate}
            transition={{ duration: 3.5, ease: [0.23, 1, 0.32, 1] }}
            onClick={onClick}
            onError={onError}
            priority={priority}
            {...props as any}
        />
    );
}
