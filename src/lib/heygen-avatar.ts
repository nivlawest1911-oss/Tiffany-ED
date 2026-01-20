/**
 * HeyGen Avatar Integration
 * Realistic human avatar with lip-sync and natural movements
 */

'use server';

const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY;
const HEYGEN_API_URL = 'https://api.heygen.com/v2';

export interface AvatarConfig {
    avatarId: string;
    voiceId: string;
    text: string;
    background?: string;
    ratio?: '16:9' | '9:16' | '1:1';
    quality?: 'low' | 'medium' | 'high';
}

/**
 * Create realistic talking avatar video
 */
export async function createAvatarVideo(config: AvatarConfig) {
    if (!HEYGEN_API_KEY) {
        console.warn('HeyGen API key not configured');
        return null;
    }

    try {
        const response = await fetch(`${HEYGEN_API_URL}/video/generate`, {
            method: 'POST',
            headers: {
                'X-Api-Key': HEYGEN_API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                video_inputs: [
                    {
                        character: {
                            type: 'avatar',
                            avatar_id: config.avatarId,
                            avatar_style: 'normal',
                        },
                        voice: {
                            type: 'text',
                            input_text: config.text,
                            voice_id: config.voiceId,
                        },
                        background: {
                            type: 'color',
                            value: config.background || '#0a0a0f',
                        },
                    },
                ],
                dimension: {
                    width: config.ratio === '9:16' ? 1080 : 1920,
                    height: config.ratio === '9:16' ? 1920 : 1080,
                },
                aspect_ratio: config.ratio || '16:9',
                test: false,
            }),
        });

        if (!response.ok) {
            throw new Error(`HeyGen API error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Avatar video generation error:', error);
        return null;
    }
}

/**
 * Check video generation status
 */
export async function getVideoStatus(videoId: string) {
    if (!HEYGEN_API_KEY) {
        return null;
    }

    try {
        const response = await fetch(`${HEYGEN_API_URL}/video_status.get?video_id=${videoId}`, {
            headers: {
                'X-Api-Key': HEYGEN_API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to get video status: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error checking video status:', error);
        return null;
    }
}

/**
 * Get available avatars
 */
export async function getAvatars() {
    if (!HEYGEN_API_KEY) {
        return [];
    }

    try {
        const response = await fetch(`${HEYGEN_API_URL}/avatars`, {
            headers: {
                'X-Api-Key': HEYGEN_API_KEY,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch avatars: ${response.statusText}`);
        }

        const data = await response.json();
        return data.avatars || [];
    } catch (error) {
        console.error('Error fetching avatars:', error);
        return [];
    }
}

/**
 * Create streaming avatar session (real-time)
 */
export async function createStreamingSession(avatarId: string) {
    if (!HEYGEN_API_KEY) {
        return null;
    }

    try {
        const response = await fetch(`${HEYGEN_API_URL}/streaming.new`, {
            method: 'POST',
            headers: {
                'X-Api-Key': HEYGEN_API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatar_id: avatarId,
                quality: 'high',
                voice: {
                    voice_id: 'en-US-JennyNeural',
                },
            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to create streaming session: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating streaming session:', error);
        return null;
    }
}
