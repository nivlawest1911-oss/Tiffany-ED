
'use client';

import useSound from 'use-sound';

export default function useSovereignSounds() {
    const [playHover] = useSound('/sounds/click_engage.mp3', { volume: 0.2 });
    const [playClick] = useSound('/sounds/click_engage.mp3', { volume: 0.5 });
    const [playSuccess] = useSound('/sounds/success_chime.mp3', { volume: 0.4 });
    const [playAmbient, { stop: stopAmbient }] = useSound('/sounds/ambient_hum.mp3', {
        volume: 0.05,
        loop: true,
        interrupt: false
    });

    return {
        playHover: () => {
            // Random pitch modulation for natural feel
            playHover({ playbackRate: 0.9 + Math.random() * 0.2 });
        },
        playClick: () => playClick(),
        playSuccess: () => playSuccess(),
        playAmbient: () => playAmbient(),
        stopAmbient: () => stopAmbient()
    };
}
