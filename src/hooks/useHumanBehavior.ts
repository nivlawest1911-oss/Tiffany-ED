import { useState, useEffect } from 'react';

/**
 * A hook that simulates subtle, human-like idle movements.
 * Returns animation values for rotation, scale, and position.
 */
export function useHumanBehavior(isActive: boolean = true) {
    const [headTilt, setHeadTilt] = useState(0);
    const [breathingScale, setBreathingScale] = useState(1);
    const [eyeX, setEyeX] = useState(0);
    const [eyeY, setEyeY] = useState(0);
    const [blink, setBlink] = useState(false);

    useEffect(() => {
        if (!isActive) return;

        // 1. Subtle Head Tilt (Drift)
        // Humans rarely adjust head rotation rapidly when idle, it's slow.
        const tiltInterval = setInterval(() => {
            // Random tilt between -1.5deg and 1.5deg
            const target = (Math.random() * 3) - 1.5;
            setHeadTilt(target);
        }, 4000);

        // 2. Breathing (Rhythmic Scale)
        // ~12-15 breaths per min => ~4-5s per breath
        const breathInterval = setInterval(() => {
            // Inhale (scale up slightly), Exhale (scale down)
            // We'll toggle between 1.0 and 1.02
            setBreathingScale(prev => prev === 1 ? 1.015 : 1);
        }, 2500);

        // 3. Micro-Saccades (Eye Movement simulation via Image Shift)
        // Humans shift focus 3-4 times a second, but for a 2D avatar, 
        // we simulate "looking around" every few seconds.
        const lookInterval = setInterval(() => {
            if (Math.random() > 0.6) {
                // Look slightly somewhere else
                setEyeX((Math.random() * 4) - 2); // +/- 2px
                setEyeY((Math.random() * 2) - 1); // +/- 1px
            } else {
                // Return to center
                setEyeX(0);
                setEyeY(0);
            }
        }, 1500 + Math.random() * 2000);

        // 4. Blinking (Random intervals)
        const blinkLoop = () => {
            setBlink(true);
            setTimeout(() => setBlink(false), 150); // Blink duration

            // Next blink in 2-6 seconds
            const nextBlink = 2000 + Math.random() * 4000;
            setTimeout(blinkLoop, nextBlink);
        };
        const blinkTimer = setTimeout(blinkLoop, 3000);

        return () => {
            clearInterval(tiltInterval);
            clearInterval(breathInterval);
            clearInterval(lookInterval);
            clearTimeout(blinkTimer);
        };
    }, [isActive]);

    return {
        style: {
            transform: `rotate(${headTilt}deg) scale(${breathingScale}) translate(${eyeX}px, ${eyeY}px)`,
            transition: 'transform 2.5s cubic-bezier(0.4, 0, 0.2, 1)', // Smooth natural transition
        },
        behaviorStyles: {
            rotate: headTilt,
            scale: breathingScale,
            x: eyeX,
            y: eyeY
        },
        isBlinking: blink
    };
}
