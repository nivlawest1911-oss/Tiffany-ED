import { useState, useEffect, useCallback } from 'react';

type AvatarState = 'idle' | 'thinking' | 'speaking' | 'listening' | 'alert';

interface BehaviorOptions {
    state?: AvatarState;
    mousePos?: { x: number; y: number };
}

/**
 * Neural Expression Engine (NXE)
 * Simulates high-fidelity human biological behaviors for EdIntel Avatars.
 * Surpasses standard loops with state-aware reactive kinematics.
 */
export function useHumanBehavior(isActive: boolean = true, options: BehaviorOptions = {}) {
    const { state = 'idle', mousePos = { x: 0, y: 0 } } = options;

    const [headTilt, setHeadTilt] = useState(0);
    const [headRotate, setHeadRotate] = useState(0);
    const [breathingScale, setBreathingScale] = useState(1);
    const [eyeX, setEyeX] = useState(0);
    const [eyeY, setEyeY] = useState(0);
    const [blink, setBlink] = useState(false);
    const [shoulderShift, setShoulderShift] = useState(0);
    const [leanIn, setLeanIn] = useState(1);
    const [browLift, setBrowLift] = useState(0);
    const [vibrancy, setVibrancy] = useState(0); // For "thinking" jitter

    // 1. Biological Gaze Tracking (Head follows attention)
    useEffect(() => {
        if (!isActive || state === 'thinking') return;

        // Calculate influence area - eyes/head follow but with weight
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const dx = (mousePos.x - centerX) / centerX;
        const dy = (mousePos.y - centerY) / centerY;

        // headRotate follows X, headTilt follows Y lightly
        setHeadRotate(dx * 8); // Max 8 degree rotation
        setHeadTilt(dy * 3);   // Max 3 degree tilt
    }, [mousePos, isActive, state]);

    // 2. Behavioral State Control Loop
    useEffect(() => {
        if (!isActive) return;

        // Tonal Drift (Idle movement)
        const driftInterval = setInterval(() => {
            if (state === 'idle') {
                setHeadTilt(prev => prev + (Math.random() * 2 - 1));
            }
        }, 4000);

        // Breathing (Always on, but deepens when listening)
        const breathRate = state === 'listening' ? 3000 : 4000;
        const breathInterval = setInterval(() => {
            const depth = state === 'listening' ? 1.02 : 1.01;
            setBreathingScale(prev => prev === 1 ? depth : 1);
        }, breathRate);

        // Thinking Jitter (Micro-movements during computation)
        let jitterInterval: any;
        if (state === 'thinking') {
            jitterInterval = setInterval(() => {
                setVibrancy((Math.random() * 0.4) - 0.2);
            }, 60);
        } else {
            setVibrancy(0);
        }

        return () => {
            clearInterval(driftInterval);
            clearInterval(breathInterval);
            if (jitterInterval) clearInterval(jitterInterval);
        };
    }, [isActive, state]);

    // 3. Autonomous Biological Cycles
    useEffect(() => {
        if (!isActive) return;

        // Blinking (Biological randomness)
        const blinkLoop = () => {
            if (state !== 'thinking') { // Don't blink while "calculating" deeply
                setBlink(true);
                setTimeout(() => setBlink(false), 120);
            }
            const nextBlink = 3000 + Math.random() * 7000;
            setTimeout(blinkLoop, nextBlink);
        };
        const blinkTimer = setTimeout(blinkLoop, 2000);

        // Shoulder Adjustments
        const shiftInterval = setInterval(() => {
            if (state !== 'speaking') {
                setShoulderShift((Math.random() * 6) - 3);
            }
        }, 5000);

        return () => {
            clearTimeout(blinkTimer);
            clearInterval(shiftInterval);
        };
    }, [isActive, state]);

    return {
        // STYLE: Liquid Smooth Cinema Grade Interpolation
        style: {
            transform: `
                perspective(1000px) 
                rotateY(${headRotate}deg) 
                rotateX(${headTilt * -1}deg) 
                scale(${breathingScale * leanIn}) 
                translate(${eyeX + vibrancy}px, ${eyeY + shoulderShift + vibrancy}px) 
                translateY(${browLift}px)
            `,
            transition: state === 'thinking' ? 'none' : 'all 3.5s cubic-bezier(0.23, 1, 0.32, 1)',
        },
        behaviorStyles: {
            rotateY: headRotate,
            rotateX: headTilt,
            scale: breathingScale * leanIn,
            x: eyeX + vibrancy,
            y: eyeY + shoulderShift + vibrancy,
            brow: browLift
        },
        isBlinking: blink,
        headRotate,
        headTilt
    };
}

