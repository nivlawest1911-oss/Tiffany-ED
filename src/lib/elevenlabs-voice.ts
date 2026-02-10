/**
 * ElevenLabs Voice Integration
 * Professional voice synthesis with Dr. Alvin West's voice characteristics
 */

'use server';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID || 'pNInz6obpgDQGcFmaJgB'; // Adam voice (deep, authoritative)

export async function generateVoice(text: string, voiceSettings?: {
    stability?: number;
    similarity_boost?: number;
    style?: number;
    use_speaker_boost?: boolean;
}, signal?: AbortSignal) {
    if (!ELEVENLABS_API_KEY) {
        console.warn('ElevenLabs API key not configured');
        return null;
    }

    try {
        const response = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}/stream`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'audio/mpeg',
                    'Content-Type': 'application/json',
                    'xi-api-key': ELEVENLABS_API_KEY,
                },
                body: JSON.stringify({
                    text,
                    model_id: 'eleven_turbo_v2_5', // Latest, fastest model
                    voice_settings: {
                        stability: voiceSettings?.stability || 0.75,
                        similarity_boost: voiceSettings?.similarity_boost || 0.85,
                        style: voiceSettings?.style || 0.5,
                        use_speaker_boost: voiceSettings?.use_speaker_boost ?? true,
                    },
                }),
                signal
            }
        );

        if (!response.ok) {
            throw new Error(`ElevenLabs API error: ${response.statusText}`);
        }

        const audioBuffer = await response.arrayBuffer();
        return Buffer.from(audioBuffer);
    } catch (error) {
        console.error('Voice generation error:', error);
        return null;
    }
}

/**
 * Clone Dr. Alvin West's voice (requires voice samples)
 */
export async function cloneVoice(name: string, audioFiles: File[], signal?: AbortSignal) {
    if (!ELEVENLABS_API_KEY) {
        throw new Error('ElevenLabs API key not configured');
    }

    const formData = new FormData();
    formData.append('name', name);
    audioFiles.forEach((file, _index) => {
        formData.append(`files`, file);
    });

    const response = await fetch('https://api.elevenlabs.io/v1/voices/add', {
        method: 'POST',
        headers: {
            'xi-api-key': ELEVENLABS_API_KEY,
        },
        body: formData,
        signal
    });

    if (!response.ok) {
        throw new Error(`Voice cloning failed: ${response.statusText}`);
    }

    return await response.json();
}

/**
 * Get available voices
 */
export async function getVoices(signal?: AbortSignal) {
    if (!ELEVENLABS_API_KEY) {
        return [];
    }

    try {
        const response = await fetch('https://api.elevenlabs.io/v1/voices', {
            headers: {
                'xi-api-key': ELEVENLABS_API_KEY,
            },
            signal
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch voices: ${response.statusText}`);
        }

        const data = await response.json();
        return data.voices;
    } catch (error) {
        console.error('Error fetching voices:', error);
        return [];
    }
}
