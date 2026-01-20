const HEYGEN_API_URL = 'https://api.heygen.com/v2';
const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY;

export async function createHeyGenVideo(avatarId: string, text: string) {
    if (!HEYGEN_API_KEY) {
        throw new Error('HEYGEN_API_KEY is not configured');
    }

    const response = await fetch(`${HEYGEN_API_URL}/video/generate`, {
        method: 'POST',
        headers: {
            'X-Api-Key': HEYGEN_API_KEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: 'EdIntel Professional Synthesis',
            video_inputs: [
                {
                    character: {
                        type: 'avatar',
                        avatar_id: avatarId,
                        avatar_style: 'normal',
                    },
                    voice: {
                        type: 'text',
                        input_text: text,
                        voice_id: 'en-US-ChristopherNeural', // Default high-authority voice
                    },
                },
            ],
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create HeyGen video');
    }

    const data = await response.json();
    return data.data.video_id;
}

export async function getHeyGenVideoStatus(videoId: string) {
    if (!HEYGEN_API_KEY) {
        throw new Error('HEYGEN_API_KEY is not configured');
    }

    const response = await fetch(`${HEYGEN_API_URL}/video/${videoId}`, {
        method: 'GET',
        headers: {
            'X-Api-Key': HEYGEN_API_KEY,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch HeyGen video status');
    }

    const data = await response.json();
    return data.data;
}
