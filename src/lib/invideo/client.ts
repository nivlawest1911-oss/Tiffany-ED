/**
 * InVideo AI API Client
 * AI-powered video creation from text prompts
 */

export interface InVideoConfig {
    apiKey?: string;
    baseUrl?: string;
}

export interface VideoCreationRequest {
    prompt: string;
    duration?: number;
    aspect_ratio?: '16:9' | '9:16' | '1:1' | '4:5';
    voice?: {
        type: 'male' | 'female' | 'neutral';
        accent?: string;
    };
    music?: {
        genre?: string;
        mood?: string;
    };
    style?: 'professional' | 'casual' | 'educational' | 'marketing' | 'social';
    language?: string;
}

export interface VideoProject {
    id: string;
    status: 'queued' | 'processing' | 'completed' | 'failed';
    progress?: number;
    video_url?: string;
    thumbnail_url?: string;
    duration?: number;
    error?: string;
    created_at: string;
}

export interface EditRequest {
    project_id: string;
    instructions: string;
    regenerate_scenes?: number[];
    change_voice?: boolean;
    change_music?: boolean;
}

export interface ScriptToVideoRequest {
    script: string;
    scenes?: Array<{
        text: string;
        duration?: number;
        visual_description?: string;
    }>;
    voice_id?: string;
    background_music?: boolean;
}

export class InVideoClient {
    private apiKey: string;
    private baseUrl: string;

    constructor(config: InVideoConfig = {}) {
        this.apiKey = config.apiKey || process.env.INVIDEO_API_KEY || '';
        this.baseUrl = config.baseUrl || 'https://api.invideo.io';
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string>),
        };

        if (this.apiKey) {
            headers['Authorization'] = `Bearer ${this.apiKey}`;
        }

        const response = await fetch(url, {
            ...options,
            headers,
            signal: options.signal, // Explicitly pass the signal for maximum robustness
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(
                `InVideo API Error: ${response.status} - ${error.message || response.statusText}`
            );
        }

        return response.json();
    }

    // ============================================
    // VIDEO CREATION
    // ============================================

    /**
     * Create video from text prompt
     */
    async createFromPrompt(request: VideoCreationRequest, signal?: AbortSignal): Promise<VideoProject> {
        return this.request('/v2/videos/create', {
            method: 'POST',
            body: JSON.stringify(request),
            signal,
        });
    }

    /**
     * Create video from script
     */
    async createFromScript(request: ScriptToVideoRequest, signal?: AbortSignal): Promise<VideoProject> {
        return this.request('/v2/videos/script', {
            method: 'POST',
            body: JSON.stringify(request),
            signal,
        });
    }

    /**
     * Get video project status
     */
    async getProject(projectId: string, signal?: AbortSignal): Promise<VideoProject> {
        return this.request(`/v2/videos/${projectId}`, { signal });
    }

    /**
     * List all projects
     */
    async listProjects(options?: {
        limit?: number;
        offset?: number;
        status?: string;
    }, signal?: AbortSignal): Promise<{ projects: VideoProject[]; total: number }> {
        const params = new URLSearchParams();
        if (options?.limit) params.append('limit', options.limit.toString());
        if (options?.offset) params.append('offset', options.offset.toString());
        if (options?.status) params.append('status', options.status);

        return this.request(`/v2/videos?${params.toString()}`, { signal });
    }

    // ============================================
    // VIDEO EDITING
    // ============================================

    /**
     * Edit existing video with AI
     */
    async editVideo(request: EditRequest, signal?: AbortSignal): Promise<VideoProject> {
        return this.request(`/v2/videos/${request.project_id}/edit`, {
            method: 'POST',
            body: JSON.stringify(request),
            signal,
        });
    }

    /**
     * Regenerate specific scenes
     */
    async regenerateScenes(
        projectId: string,
        sceneIndices: number[],
        instructions?: string,
        signal?: AbortSignal
    ): Promise<VideoProject> {
        return this.request(`/v2/videos/${projectId}/regenerate`, {
            method: 'POST',
            body: JSON.stringify({
                scenes: sceneIndices,
                instructions,
            }),
            signal,
        });
    }

    /**
     * Change video voice
     */
    async changeVoice(
        projectId: string,
        voiceId: string,
        signal?: AbortSignal
    ): Promise<VideoProject> {
        return this.request(`/v2/videos/${projectId}/voice`, {
            method: 'PUT',
            body: JSON.stringify({ voice_id: voiceId }),
            signal,
        });
    }

    /**
     * Change background music
     */
    async changeMusic(
        projectId: string,
        options: {
            genre?: string;
            mood?: string;
            music_url?: string;
        },
        signal?: AbortSignal
    ): Promise<VideoProject> {
        return this.request(`/v2/videos/${projectId}/music`, {
            method: 'PUT',
            body: JSON.stringify(options),
            signal,
        });
    }

    // ============================================
    // EXPORT & DOWNLOAD
    // ============================================

    /**
     * Export video in specific format
     */
    async exportVideo(
        projectId: string,
        options?: {
            quality?: '720p' | '1080p' | '4k';
            format?: 'mp4' | 'mov' | 'webm';
            watermark?: boolean;
        },
        signal?: AbortSignal
    ): Promise<{
        export_id: string;
        status: string;
    }> {
        return this.request(`/v2/videos/${projectId}/export`, {
            method: 'POST',
            body: JSON.stringify(options),
            signal,
        });
    }

    /**
     * Get export status
     */
    async getExportStatus(exportId: string, signal?: AbortSignal): Promise<{
        status: 'processing' | 'completed' | 'failed';
        download_url?: string;
        error?: string;
    }> {
        return this.request(`/v2/exports/${exportId}`, { signal });
    }

    /**
     * Poll for video completion
     */
    async waitForVideo(
        projectId: string,
        options: {
            maxAttempts?: number;
            intervalMs?: number;
            onProgress?: (progress: number) => void;
            signal?: AbortSignal;
        } = {}
    ): Promise<VideoProject> {
        const { maxAttempts = 120, intervalMs = 5000, onProgress, signal } = options;

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            if (signal?.aborted) {
                throw new DOMException('Aborted', 'AbortError');
            }

            const project = await this.getProject(projectId, signal);

            if (onProgress && project.progress) {
                onProgress(project.progress);
            }

            if (project.status === 'completed') {
                return project;
            }

            if (project.status === 'failed') {
                throw new Error(`Video creation failed: ${project.error}`);
            }

            // Cancellable delay
            await new Promise((resolve, reject) => {
                const timeout = setTimeout(resolve, intervalMs);
                if (signal) {
                    signal.addEventListener('abort', () => {
                        clearTimeout(timeout);
                        reject(new DOMException('Aborted', 'AbortError'));
                    }, { once: true });
                }
            });
        }

        throw new Error('Video creation timeout');
    }

    // ============================================
    // TEMPLATES
    // ============================================

    /**
     * List available templates
     */
    async listTemplates(category?: string, signal?: AbortSignal): Promise<{
        templates: Array<{
            id: string;
            name: string;
            category: string;
            thumbnail_url: string;
            duration: number;
        }>;
    }> {
        const params = category ? `?category=${category}` : '';
        return this.request(`/v2/templates${params}`, { signal });
    }

    /**
     * Create video from template
     */
    async createFromTemplate(
        templateId: string,
        customizations: {
            text_replacements?: Record<string, string>;
            media_replacements?: Record<string, string>;
            voice_id?: string;
        },
        signal?: AbortSignal
    ): Promise<VideoProject> {
        return this.request('/v2/videos/template', {
            method: 'POST',
            body: JSON.stringify({
                template_id: templateId,
                ...customizations,
            }),
            signal,
        });
    }

    // ============================================
    // STOCK MEDIA
    // ============================================

    /**
     * Search stock footage
     */
    async searchStockFootage(query: string, options?: {
        limit?: number;
        orientation?: 'landscape' | 'portrait' | 'square';
    }, signal?: AbortSignal): Promise<{
        results: Array<{
            id: string;
            url: string;
            thumbnail_url: string;
            duration: number;
            source: string;
        }>;
    }> {
        return this.request('/v2/stock/search', {
            method: 'POST',
            body: JSON.stringify({
                query,
                type: 'video',
                ...options,
            }),
            signal,
        });
    }

    // ============================================
    // VOICE & AUDIO
    // ============================================

    /**
     * List available voices
     */
    async listVoices(language?: string, signal?: AbortSignal): Promise<{
        voices: Array<{
            id: string;
            name: string;
            language: string;
            gender: 'male' | 'female' | 'neutral';
            preview_url?: string;
        }>;
    }> {
        const params = language ? `?language=${language}` : '';
        return this.request(`/v2/voices${params}`, { signal });
    }

    /**
     * Generate voiceover
     */
    async generateVoiceover(
        text: string,
        voiceId: string,
        signal?: AbortSignal
    ): Promise<{
        audio_url: string;
        duration: number;
    }> {
        return this.request('/v2/voiceover/generate', {
            method: 'POST',
            body: JSON.stringify({
                text,
                voice_id: voiceId,
            }),
            signal,
        });
    }
}

// ============================================
// SINGLETON INSTANCE
// ============================================

let inVideoClient: InVideoClient | null = null;

export function getInVideoClient(): InVideoClient {
    if (!inVideoClient) {
        inVideoClient = new InVideoClient();
    }
    return inVideoClient;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Quick video creation from prompt
 */
export async function quickCreateVideo(
    prompt: string,
    options?: {
        style?: 'professional' | 'casual' | 'educational';
        aspectRatio?: '16:9' | '9:16' | '1:1';
        duration?: number;
    },
    signal?: AbortSignal
): Promise<string> {
    const client = getInVideoClient();

    const project = await client.createFromPrompt({
        prompt,
        style: options?.style || 'professional',
        aspect_ratio: options?.aspectRatio || '16:9',
        duration: options?.duration,
    }, signal);

    const completed = await client.waitForVideo(project.id, { signal });

    if (!completed.video_url) {
        throw new Error('Video URL not available');
    }

    return completed.video_url;
}

/**
 * Create educational video with script
 */
export async function createEducationalVideo(
    script: string,
    options?: {
        voiceType?: 'male' | 'female';
        includeMusic?: boolean;
    },
    signal?: AbortSignal
): Promise<VideoProject> {
    const client = getInVideoClient();

    return client.createFromScript({
        script,
        background_music: options?.includeMusic ?? true,
    }, signal);
}
