import { professionalAudio } from '@/utils/audio-engine';

export default function useProfessionalSounds() {
    return {
        playHover: () => professionalAudio.playHover(),
        playClick: () => professionalAudio.playClick(),
        playSuccess: () => professionalAudio.playSuccess(),
        playAmbient: () => professionalAudio.toggleAmbient(true),
        stopAmbient: () => professionalAudio.toggleAmbient(false),
        playMusic: (src: string, loop?: boolean) => professionalAudio.playMusic(src, loop),
        stopMusic: () => professionalAudio.stopMusic()
    };
}
