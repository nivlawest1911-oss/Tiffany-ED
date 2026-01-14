import { sovereignAudio } from '@/utils/audio-engine';

export default function useSovereignSounds() {
    return {
        playHover: () => sovereignAudio.playHover(),
        playClick: () => sovereignAudio.playClick(),
        playSuccess: () => sovereignAudio.playSuccess(),
        playAmbient: () => sovereignAudio.toggleAmbient(true),
        stopAmbient: () => sovereignAudio.toggleAmbient(false)
    };
}
