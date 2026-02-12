export class ProfessionalAudioEngine {
    private context: AudioContext | null = null;
    private masterGain: GainNode | null = null;

    constructor() {
        if (typeof window !== 'undefined') {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContextClass) {
                this.context = new AudioContextClass();
                this.masterGain = this.context.createGain();
                this.masterGain.connect(this.context.destination);
                this.masterGain.gain.value = 0.3; // Default volume
            }
        }
    }

    private ensureContext() {
        if (this.context?.state === 'suspended') {
            this.context.resume();
        }
    }

    // High-tech interaction click (Professional Engage)
    // A crisp, mechanical "digital shutter" sound
    playClick() {
        if (!this.context || !this.masterGain) return;
        this.ensureContext();
        const t = this.context.currentTime;

        // Layer 1: The "Thud" / Click body
        const osc1 = this.context.createOscillator();
        const gain1 = this.context.createGain();
        osc1.frequency.setValueAtTime(150, t);
        osc1.frequency.exponentialRampToValueAtTime(0.01, t + 0.1);
        gain1.gain.setValueAtTime(0.5, t);
        gain1.gain.exponentialRampToValueAtTime(0.01, t + 0.1);

        osc1.connect(gain1);
        gain1.connect(this.masterGain);
        osc1.start(t);
        osc1.stop(t + 0.1);

        // Layer 2: The "Tech" / High frequency chirp
        const osc2 = this.context.createOscillator();
        const gain2 = this.context.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(2000, t);
        osc2.frequency.exponentialRampToValueAtTime(1000, t + 0.05);
        gain2.gain.setValueAtTime(0.1, t);
        gain2.gain.exponentialRampToValueAtTime(0.01, t + 0.05);

        osc2.connect(gain2);
        gain2.connect(this.masterGain);
        osc2.start(t);
        osc2.stop(t + 0.05);
    }

    // High-tech hover (Scanning)
    // A very short, high-pitched tick
    playHover() {
        if (!this.context || !this.masterGain) return;
        this.ensureContext();
        const t = this.context.currentTime;

        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        // Randomize slightly for organic feel
        const pitch = 800 + Math.random() * 200;

        osc.frequency.setValueAtTime(pitch, t);
        osc.frequency.exponentialRampToValueAtTime(pitch + 100, t + 0.03);

        gain.gain.setValueAtTime(0.05, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t);
        osc.stop(t + 0.03);
    }

    // Success / Completion Chime
    // A majestic, glassy chord
    playSuccess() {
        if (!this.context || !this.masterGain) return;
        this.ensureContext();
        const t = this.context.currentTime;

        // A Major 7th chord structure for positivity (A4, C#5, E5, G#5)
        const frequencies = [440.00, 554.37, 659.25, 830.61];

        frequencies.forEach((freq, i) => {
            const osc = this.context!.createOscillator();
            const gain = this.context!.createGain();

            osc.type = 'sine';
            osc.frequency.value = freq;

            // Stagger start slightly
            const startTime = t + (i * 0.05);
            const duration = 1.5;

            // Envelope
            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(0.1, startTime + 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

            osc.connect(gain);
            gain.connect(this.masterGain!);

            osc.start(startTime);
            osc.stop(startTime + duration);
        });
    }

    // Ambient Hum (Professional Presence)
    // Needs to be loopable and managed carefully
    private ambientOsc: OscillatorNode | null = null;
    private ambientGain: GainNode | null = null;
    private musicElement: HTMLAudioElement | null = null;
    private voiceElement: HTMLAudioElement | null = null;

    toggleAmbient(play: boolean) {
        if (!this.context || !this.masterGain) return;

        if (play) {
            if (this.ambientOsc) return; // Already playing
            this.ensureContext();

            this.ambientOsc = this.context.createOscillator();
            this.ambientGain = this.context.createGain();

            this.ambientOsc.type = 'sine';
            this.ambientOsc.frequency.value = 60; // Low hum

            // LFO for throbbing effect
            const lfo = this.context.createOscillator();
            lfo.frequency.value = 0.5; // Slow throb
            const lfoGain = this.context.createGain();
            lfoGain.gain.value = 50; // Depth of modulation

            lfo.connect(this.ambientGain.gain);

            this.ambientGain.gain.setValueAtTime(0.01, this.context.currentTime); // Very quiet

            this.ambientOsc.connect(this.ambientGain);
            this.ambientGain.connect(this.masterGain);

            this.ambientOsc.start();
        } else {
            if (this.ambientOsc) {
                const t = this.context.currentTime;
                this.ambientGain?.gain.setTargetAtTime(0, t, 0.5);
                this.ambientOsc.stop(t + 0.5);
                this.ambientOsc = null;
                this.ambientGain = null;
            }
        }
    }

    playMusic(src: string, loop: boolean = true) {
        if (typeof window === 'undefined') return;

        if (this.musicElement) {
            this.musicElement.pause();
            this.musicElement.src = src;
        } else {
            this.musicElement = new Audio(src);
        }

        this.musicElement.loop = loop;
        this.musicElement.volume = 0.2; // Keep it subtle
        this.musicElement.play().catch(e => console.warn("Music play failed", e));
    }

    stopMusic() {
        if (this.musicElement) {
            this.musicElement.pause();
            this.musicElement.currentTime = 0;
        }
    }

    playVoice(src: string, onEnded?: () => void) {
        if (typeof window === 'undefined') return;

        if (this.voiceElement) {
            this.voiceElement.pause();
            this.voiceElement.src = src;
        } else {
            this.voiceElement = new Audio(src);
        }

        if (onEnded) {
            this.voiceElement.onended = onEnded;
        }

        this.voiceElement.volume = 1.0;
        this.voiceElement.play().catch(e => console.warn("Voice play failed", e));
    }

    stopVoice() {
        if (this.voiceElement) {
            this.voiceElement.pause();
            this.voiceElement.currentTime = 0;
        }
    }
}

// Lazy singleton instance - only created when first accessed
let _professionalAudio: ProfessionalAudioEngine | null = null;

export const professionalAudio = {
    get instance(): ProfessionalAudioEngine {
        if (!_professionalAudio) {
            _professionalAudio = new ProfessionalAudioEngine();
        }
        return _professionalAudio;
    },
    playHover: () => professionalAudio.instance.playHover(),
    playClick: () => professionalAudio.instance.playClick(),
    playSuccess: () => professionalAudio.instance.playSuccess(),
    toggleAmbient: (play: boolean) => professionalAudio.instance.toggleAmbient(play),
    playMusic: (src: string, loop?: boolean) => professionalAudio.instance.playMusic(src, loop),
    stopMusic: () => professionalAudio.instance.stopMusic(),
    playVoice: (src: string, onEnded?: () => void) => professionalAudio.instance.playVoice(src, onEnded),
    stopVoice: () => professionalAudio.instance.stopVoice()
};
