import { useEffect } from 'react';
import { professionalAudio } from '@/utils/audio-engine';

export default function useProfessionalSounds() {
    useEffect(() => {
        // Pre-initialize the audio engine in the background to prevent
        // INP (Interaction to Next Paint) spikes on the first click.
        if (typeof window !== 'undefined') {
            try {
                // Accessing the 'instance' getter inside a timeout ensures it
                // won't block the initial render or the first interaction.
                setTimeout(() => {
                    const _ = professionalAudio.instance;
                }, 1000);
            } catch (e) {
                console.warn('Audio pre-initialization failed:', e);
            }
        }
    }, []);

    return {
        playHover: () => professionalAudio.playHover(),
        playClick: () => professionalAudio.playClick(),
        playSuccess: () => professionalAudio.playSuccess(),
        playAmbient: () => professionalAudio.toggleAmbient(true),
        stopAmbient: () => professionalAudio.toggleAmbient(false),
        playMusic: (src: string, loop?: boolean) => professionalAudio.playMusic(src, loop),
        stopMusic: () => professionalAudio.stopMusic(),
        playVoice: (src: string, onEnded?: () => void) => professionalAudio.playVoice(src, onEnded),
        stopVoice: () => professionalAudio.stopVoice()
    };
}

