'use client';

import { useEffect, useState, RefObject } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

interface ParallaxOptions {
    speed?: number;
    offset?: number;
}

export function useParallax(
    ref?: RefObject<HTMLElement>,
    options: ParallaxOptions = {}
): MotionValue<number> {
    const { speed = 0.5, offset = 0 } = options;
    const { scrollY } = useScroll(ref ? { target: ref } : undefined);

    return useTransform(scrollY, [0, 1000], [offset, offset + (1000 * speed)]);
}

export function useScrollReveal(threshold = 0.1) {
    const [isVisible, setIsVisible] = useState(false);
    const [ref, setRef] = useState<HTMLElement | null>(null);

    useEffect(() => {
        if (!ref) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold }
        );

        observer.observe(ref);

        return () => {
            if (ref) observer.unobserve(ref);
        };
    }, [ref, threshold]);

    return { ref: setRef, isVisible };
}

export function useMouseFollow() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return mousePosition;
}
