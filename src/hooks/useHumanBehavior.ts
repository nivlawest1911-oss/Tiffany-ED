import { useState, useEffect } from 'react';

type AvatarState = 'idle' | 'thinking' | 'speaking' | 'listening' | 'alert';

interface BehaviorOptions {
    state?: AvatarState;
    mousePos?: { x: number; y: number };
    subtle?: boolean;
    load?: number; // 0-100 intelligence/system load
    isFocused?: boolean; // When the user is directly interacting/inspecting
}

/**
 * Neural Expression Engine (NXE)
 * Simulates high-fidelity human biological behaviors for EdIntel Avatars.
 * Surpasses standard loops with state-aware reactive kinematics.
 */
export function useHumanBehavior(isActive: boolean = true, options: BehaviorOptions = {}) {
    const { state = 'idle', mousePos = { x: 0, y: 0 }, subtle = false, load = 50, isFocused = false } = options;

    const [headTilt, setHeadTilt] = useState(0);
    const [headRotate, setHeadRotate] = useState(0);
    const [breathingScale, setBreathingScale] = useState(1);
    const [eyeX, _setEyeX] = useState(0);
    const [eyeY, _setEyeY] = useState(0);
    const [blink, setBlink] = useState(false);
    const [shoulderShift, setShoulderShift] = useState(0);
    const [leanIn, setLeanIn] = useState(1);
    const [browLift, _setBrowLift] = useState(0);
    const [vibrancy, setVibrancy] = useState(0); // For "thinking" jitter

    // 1. Biological Gaze Tracking (Head follows attention)
    useEffect(() => {
        if (!isActive || state === 'thinking') return;

        // Calculate influence area - eyes/head follow but with weight
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const dx = (mousePos.x - centerX) / centerX;
        const dy = (mousePos.y - centerY) / centerY;

        // Scale down influence in subtle mode
        const multiplier = subtle ? 0.3 : 1;

        // headRotate follows X, headTilt follows Y lightly
        setHeadRotate(dx * 8 * multiplier); // Max 8 degree rotation
        setHeadTilt(dy * 3 * multiplier);   // Max 3 degree tilt
    }, [mousePos, isActive, state, subtle]);

    // 2. Behavioral State Control Loop
    useEffect(() => {
        if (!isActive) return;

        // Tonal Drift (Idle movement)
        const driftInterval = setInterval(() => {
            if (state === 'idle') {
                const range = subtle ? 0.5 : 2;
                setHeadTilt(prev => prev + (Math.random() * range - range / 2));
            }
        }, subtle ? 8000 : 4000);

        // Breathing (Always on, but deepens when listening or under high load)
        // High load (>80) increases breath frequency
        const loadFactor = load > 80 ? 0.7 : 1; 
        const breathRate = (state === 'listening' ? 3000 : 4000) * loadFactor;
        
        const breathInterval = setInterval(() => {
            const depth = state === 'listening' ? 1.02 : (subtle ? 1.005 : 1.01);
            setBreathingScale(prev => prev === 1 ? depth : 1);
        }, breathRate);

        // Thinking Jitter (Micro-movements during computation)
        let jitterInterval: ReturnType<typeof setInterval> | undefined;
        if (state === 'thinking' || load > 75) {
            jitterInterval = setInterval(() => {
                // Load increases jitter intensity
                const loadIntensity = load > 85 ? 0.6 : 0.3;
                const baseIntensity = state === 'thinking' ? (subtle ? 0.1 : 0.4) : 0.1;
                const intensity = Math.max(loadIntensity, baseIntensity);
                
                setVibrancy((Math.random() * intensity) - intensity / 2);
            }, load > 90 ? 40 : 60);
        } else {
            setVibrancy(0);
        }

        return () => {
            clearInterval(driftInterval);
            clearInterval(breathInterval);
            if (jitterInterval) clearInterval(jitterInterval);
        };
    }, [isActive, state, subtle, load]);

    // 2.5 Focus Dynamics (Leaning in when inspected)
    useEffect(() => {
        if (!isActive) return;
        const targetLean = isFocused ? 1.08 : 1;
        setLeanIn(targetLean);
    }, [isFocused, isActive]);

    // 3. Autonomous Biological Cycles
    useEffect(() => {
        if (!isActive) return;

        // Blinking (Biological randomness)
        const blinkLoop = () => {
            if (state !== 'thinking') { // Don't blink while "calculating" deeply
                setBlink(true);
                setTimeout(() => setBlink(false), 120);
            }
            const nextBlink = (subtle ? 6000 : 3000) + Math.random() * 7000;
            setTimeout(blinkLoop, nextBlink);
        };
        const blinkTimer = setTimeout(blinkLoop, 2000);

        // Shoulder Adjustments
        const shiftInterval = setInterval(() => {
            if (state !== 'speaking') {
                const range = subtle ? 2 : 6;
                setShoulderShift((Math.random() * range) - range / 2);
            }
        }, 5000);

        return () => {
            clearTimeout(blinkTimer);
            clearInterval(shiftInterval);
        };
    }, [isActive, state, subtle]);

    // Calculate transition speed based on load and focus
    // Under heavy load or focus, transitions are tighter/faster
    const transitionDuration = isFocused ? '1.5s' : load > 85 ? '2s' : load > 60 ? '3s' : '4s';

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
            transformOrigin: 'center center',
            transition: state === 'thinking' ? 'none' : (subtle ? `all 5s cubic-bezier(0.23, 1, 0.32, 1)` : `all ${transitionDuration} cubic-bezier(0.23, 1, 0.32, 1)`),
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
