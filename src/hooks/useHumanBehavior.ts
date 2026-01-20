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
    const [shoulderShift, setShoulderShift] = useState(0);
    const [leanIn, setLeanIn] = useState(1); // For dramatic focus
    const [browLift, setBrowLift] = useState(0); // Subtle expression

    useEffect(() => {
        if (!isActive) return;

        // 1. Subtle Head Tilt (Drift)
        const tiltInterval = setInterval(() => {
            const target = (Math.random() * 5) - 2.5;
            setHeadTilt(target);
        }, 3200);

        // 2. Breathing (Deep Rhythmic Scale)
        const breathInterval = setInterval(() => {
            setBreathingScale(prev => prev === 1 ? 1.015 : 1);
        }, 3500);

        // 3. Body/Shoulder Shift
        const shoulderInterval = setInterval(() => {
            setShoulderShift((Math.random() * 8) - 4);
        }, 4500);

        // 4. Lean In (Dramatic Engagement)
        const leanInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                setLeanIn(1.03); // Lean towards the camera
                setTimeout(() => setLeanIn(1), 2000);
            }
        }, 8000);

        // 5. Brow Micro-Lift (Expression)
        const browInterval = setInterval(() => {
            if (Math.random() > 0.6) {
                setBrowLift(-2); // Lift brows slightly
                setTimeout(() => setBrowLift(0), 400);
            }
        }, 6000);

        // 6. Micro-Saccades (Eye Movement - More frequent but smaller)
        const lookInterval = setInterval(() => {
            if (Math.random() > 0.4) {
                setEyeX((Math.random() * 6) - 3);
                setEyeY((Math.random() * 3) - 1.5);
                setTimeout(() => {
                    setEyeX(0);
                    setEyeY(0);
                }, 400);
            }
        }, 2500);

        // 7. Blinking (Biological randomness)
        const blinkLoop = () => {
            setBlink(true);
            setTimeout(() => setBlink(false), 150);
            const nextBlink = 2000 + Math.random() * 6000;
            setTimeout(blinkLoop, nextBlink);
        };
        const blinkTimer = setTimeout(blinkLoop, 3000);

        return () => {
            clearInterval(tiltInterval);
            clearInterval(breathInterval);
            clearInterval(shoulderInterval);
            clearInterval(leanInterval);
            clearInterval(browInterval);
            clearInterval(lookInterval);
            clearTimeout(blinkTimer);
        };
    }, [isActive]);

    return {
        style: {
            transform: `rotate(${headTilt}deg) scale(${breathingScale * leanIn}) translate(${eyeX}px, ${eyeY + shoulderShift}px) translateY(${browLift}px)`,
            transition: 'all 3.5s cubic-bezier(0.23, 1, 0.32, 1)', // Liquid smooth movement
        },
        behaviorStyles: {
            rotate: headTilt,
            scale: breathingScale * leanIn,
            x: eyeX,
            y: eyeY + shoulderShift,
            brow: browLift
        },
        isBlinking: blink
    };
}
