/**
 * HeyGen API Client
 * Comprehensive integration for HeyGen's avatar and video generation services
 */

export interface HeyGenConfig {
    apiKey: string;
    baseUrl?: string;
}

export interface HeyGenAvatar {
    avatar_id: string;
    avatar_name: string;
    preview_image_url?: string;
    preview_video_url?: string;
    gender?: 'male' | 'female';
    is_public?: boolean;
}

export interface HeyGenVoice {
    voice_id: string;
    language: string;
    gender: 'male' | 'female';
    name: string;
    preview_audio?: string;
    emotion_support?: boolean;
}

export interface VideoGenerationRequest {
    video_inputs: Array<{
        character: {
            type: 'avatar' | 'photo_avatar';
            avatar_id?: string;
            avatar_style?: 'normal' | 'circle' | 'square';
            scale?: number;
            offset?: { x: number; y: number };
        };
        voice: {
            type: 'text';
            input_text: string;
            voice_id: string;
            speed?: number;
            pitch?: number;
        };
        background?: {
            type: 'color' | 'image' | 'video';
            value: string;
        };
    }>;
    dimension?: {
        width: number;
        height: number;
    };
    aspect_ratio?: '16:9' | '9:16' | '1:1' | '4:3';
    test?: boolean;
    title?: string;
}

export interface VideoGenerationResponse {
    video_id: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    video_url?: string;
    thumbnail_url?: string;
    error?: string;
}

export interface StreamingAvatarConfig {
    quality: 'low' | 'medium' | 'high';
    avatar_name: string;
    voice: {
        voice_id: string;
        rate?: number;
        emotion?: string;
    };
    language?: string;
    version?: string;
}

export interface TemplateVariable {
    name: string;
    type: 'text' | 'image' | 'video';
    properties?: Record<string, any>;
}

export interface Template {
    template_id: string;
    template_name: string;
    thumbnail_url?: string;
    variables?: TemplateVariable[];
}

export class HeyGenClient {
    private apiKey: string;
    private baseUrl: string;

    constructor(config: HeyGenConfig) {
        this.apiKey = config.apiKey;
        this.baseUrl = config.baseUrl || 'https://api.heygen.com';
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        const response = await fetch(url, {
            ...options,
            headers: {
                'X-Api-Key': this.apiKey,
                'Content-Type': 'application/json',
                ...options.headers,
            },
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(
                `HeyGen API Error: ${response.status} - ${error.message || response.statusText}`
            );
        }

        return response.json();
    }

    // ============================================
    // AVATAR MANAGEMENT
    // ============================================

    /**
     * List all available avatars
     */
    async listAvatars(): Promise<{ avatars: HeyGenAvatar[] }> {
        return this.request('/v2/avatars');
    }

    /**
     * Get specific avatar details
     */
    async getAvatar(avatarId: string): Promise<HeyGenAvatar> {
        return this.request(`/v2/avatars/${avatarId}`);
    }

    // ============================================
    // VOICE MANAGEMENT
    // ============================================

    /**
     * List all available voices
     */
    async listVoices(): Promise<{ voices: HeyGenVoice[] }> {
        return this.request('/v2/voices');
    }

    /**
     * Get voices by language
     */
    async getVoicesByLanguage(language: string): Promise<{ voices: HeyGenVoice[] }> {
        const allVoices = await this.listVoices();
        return {
            voices: allVoices.voices.filter(v => v.language === language)
        };
    }

    // ============================================
    // VIDEO GENERATION
    // ============================================

    /**
     * Generate a video with avatar
     */
    async generateVideo(request: VideoGenerationRequest): Promise<VideoGenerationResponse> {
        return this.request('/v2/video/generate', {
            method: 'POST',
            body: JSON.stringify(request),
        });
    }

    /**
     * Check video generation status
     */
    async getVideoStatus(videoId: string): Promise<VideoGenerationResponse> {
        return this.request(`/v1/video_status.get?video_id=${videoId}`);
    }

    /**
     * Poll for video completion
     */
    async waitForVideo(
        videoId: string,
        options: {
            maxAttempts?: number;
            intervalMs?: number;
            onProgress?: (status: VideoGenerationResponse) => void;
        } = {}
    ): Promise<VideoGenerationResponse> {
        const { maxAttempts = 60, intervalMs = 5000, onProgress } = options;

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            const status = await this.getVideoStatus(videoId);

            if (onProgress) {
                onProgress(status);
            }

            if (status.status === 'completed') {
                return status;
            }

            if (status.status === 'failed') {
                throw new Error(`Video generation failed: ${status.error}`);
            }

            await new Promise(resolve => setTimeout(resolve, intervalMs));
        }

        throw new Error('Video generation timeout');
    }

    // ============================================
    // TEMPLATE API
    // ============================================

    /**
     * List all templates
     */
    async listTemplates(): Promise<{ templates: Template[] }> {
        return this.request('/v2/templates');
    }

    /**
     * Generate video from template
     */
    async generateFromTemplate(
        templateId: string,
        variables: Record<string, any>,
        options?: {
            title?: string;
            test?: boolean;
        }
    ): Promise<VideoGenerationResponse> {
        return this.request('/v2/template/generate', {
            method: 'POST',
            body: JSON.stringify({
                template_id: templateId,
                variables,
                title: options?.title,
                test: options?.test || false,
            }),
        });
    }

    // ============================================
    // PHOTO AVATAR
    // ============================================

    /**
     * Create a talking photo avatar
     */
    async createPhotoAvatar(
        imageUrl: string,
        script: string,
        voiceId: string,
        options?: {
            title?: string;
            test?: boolean;
        }
    ): Promise<VideoGenerationResponse> {
        return this.request('/v2/video/generate', {
            method: 'POST',
            body: JSON.stringify({
                video_inputs: [{
                    character: {
                        type: 'photo_avatar',
                        avatar_id: imageUrl,
                        avatar_style: 'normal',
                    },
                    voice: {
                        type: 'text',
                        input_text: script,
                        voice_id: voiceId,
                    },
                }],
                test: options?.test || false,
                title: options?.title,
            }),
        });
    }

    // ============================================
    // VIDEO TRANSLATION
    // ============================================

    /**
     * Translate a video to another language
     */
    async translateVideo(
        videoUrl: string,
        targetLanguage: string,
        options?: {
            title?: string;
            translate_audio_only?: boolean;
        }
    ): Promise<{ translate_id: string }> {
        return this.request('/v2/video_translate', {
            method: 'POST',
            body: JSON.stringify({
                video_url: videoUrl,
                target_language: targetLanguage,
                title: options?.title,
                translate_audio_only: options?.translate_audio_only || false,
            }),
        });
    }

    /**
     * Get video translation status
     */
    async getTranslationStatus(translateId: string): Promise<{
        status: 'pending' | 'processing' | 'completed' | 'failed';
        translated_video_url?: string;
        error?: string;
    }> {
        return this.request(`/v2/video_translate/${translateId}`);
    }

    // ============================================
    // STREAMING AVATAR (WebRTC)
    // ============================================

    /**
     * Create a streaming session token
     * Note: Actual streaming uses @heygen/streaming-avatar SDK
     */
    async createStreamingToken(config?: StreamingAvatarConfig): Promise<{
        token: string;
        url: string;
        expires_at: number;
    }> {
        return this.request('/v1/streaming.create_token', {
            method: 'POST',
            body: JSON.stringify(config || {}),
        });
    }

    // ============================================
    // WEBHOOKS
    // ============================================

    /**
     * Verify webhook signature
     */
    verifyWebhookSignature(
        payload: string,
        signature: string,
        secret: string
    ): boolean {
        // Implement HMAC verification
        // This is a placeholder - actual implementation depends on HeyGen's webhook signing method
        return true;
    }
}

// ============================================
// SINGLETON INSTANCE
// ============================================

let heygenClient: HeyGenClient | null = null;

export function getHeyGenClient(): HeyGenClient {
    if (!heygenClient) {
        const apiKey = process.env.HEYGEN_API_KEY;

        if (!apiKey) {
            throw new Error('HEYGEN_API_KEY is not configured');
        }

        heygenClient = new HeyGenClient({ apiKey });
    }

    return heygenClient;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Generate a simple talking avatar video
 */
export async function generateTalkingAvatar(
    avatarId: string,
    voiceId: string,
    script: string,
    options?: {
        title?: string;
        background?: string;
        aspectRatio?: '16:9' | '9:16' | '1:1';
    }
): Promise<VideoGenerationResponse> {
    const client = getHeyGenClient();

    const request: VideoGenerationRequest = {
        video_inputs: [{
            character: {
                type: 'avatar',
                avatar_id: avatarId,
                avatar_style: 'normal',
            },
            voice: {
                type: 'text',
                input_text: script,
                voice_id: voiceId,
            },
            background: options?.background ? {
                type: 'color',
                value: options.background,
            } : undefined,
        }],
        aspect_ratio: options?.aspectRatio || '16:9',
        title: options?.title,
    };

    return client.generateVideo(request);
}

/**
 * Quick video generation with polling
 */
export async function generateAndWaitForVideo(
    request: VideoGenerationRequest,
    onProgress?: (status: VideoGenerationResponse) => void
): Promise<VideoGenerationResponse> {
    const client = getHeyGenClient();

    const { video_id } = await client.generateVideo(request);

    return client.waitForVideo(video_id, {
        onProgress,
        maxAttempts: 120, // 10 minutes max
        intervalMs: 5000,
    });
}
