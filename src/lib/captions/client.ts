/**
 * Captions.ai API Client
 * AI-powered video editing, captioning, and enhancement
 */

export interface CaptionsConfig {
    apiKey?: string;
    baseUrl?: string;
}

export interface VideoProject {
    id: string;
    name: string;
    status: 'draft' | 'processing' | 'completed' | 'failed';
    duration?: number;
    thumbnail_url?: string;
    video_url?: string;
    created_at: string;
    updated_at: string;
}

export interface CaptionStyle {
    font_family?: string;
    font_size?: number;
    font_color?: string;
    background_color?: string;
    position?: 'top' | 'center' | 'bottom';
    animation?: 'none' | 'fade' | 'slide' | 'bounce';
    highlight_color?: string;
}

export interface VideoEditRequest {
    video_url?: string;
    video_file?: File;
    operations: Array<{
        type: 'caption' | 'trim' | 'crop' | 'filter' | 'transition' | 'audio' | 'ai_edit';
        params: Record<string, any>;
    }>;
    output_format?: 'mp4' | 'mov' | 'webm';
    quality?: 'low' | 'medium' | 'high' | '4k';
}

export interface AIEditRequest {
    video_url: string;
    prompt: string;
    style?: 'professional' | 'casual' | 'cinematic' | 'social';
    duration_target?: number;
    include_captions?: boolean;
    include_music?: boolean;
}

export interface TranscriptionResult {
    text: string;
    segments: Array<{
        start: number;
        end: number;
        text: string;
        confidence?: number;
    }>;
    language: string;
    duration: number;
}

export class CaptionsClient {
    private apiKey: string;
    private baseUrl: string;

    constructor(config: CaptionsConfig = {}) {
        this.apiKey = config.apiKey || process.env.CAPTIONS_API_KEY || '';
        this.baseUrl = config.baseUrl || 'https://api.captions.ai';
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const url = `${this.baseUrl}${endpoint}`;

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...options.headers as Record<string, string>,
        };

        if (this.apiKey) {
            headers['Authorization'] = `Bearer ${this.apiKey}`;
        }

        const response = await fetch(url, {
            ...options,
            headers,
            signal: options.signal,
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(
                `Captions API Error: ${response.status} - ${error.message || response.statusText}`
            );
        }

        return response.json();
    }

    // ============================================
    // PROJECT MANAGEMENT
    // ============================================

    /**
     * Create a new video project
     */
    async createProject(name: string, videoUrl?: string, signal?: AbortSignal): Promise<VideoProject> {
        return this.request('/v1/projects', {
            method: 'POST',
            body: JSON.stringify({ name, video_url: videoUrl }),
            signal,
        });
    }

    /**
     * Get project details
     */
    async getProject(projectId: string, signal?: AbortSignal): Promise<VideoProject> {
        return this.request(`/v1/projects/${projectId}`, { signal });
    }

    /**
     * List all projects
     */
    async listProjects(signal?: AbortSignal): Promise<{ projects: VideoProject[] }> {
        return this.request('/v1/projects', { signal });
    }

    /**
     * Delete a project
     */
    async deleteProject(projectId: string): Promise<void> {
        await this.request(`/v1/projects/${projectId}`, {
            method: 'DELETE',
        });
    }

    // ============================================
    // CAPTIONING
    // ============================================

    /**
     * Generate automatic captions for a video
     */
    async generateCaptions(
        videoUrl: string,
        options?: {
            language?: string;
            style?: CaptionStyle;
            auto_highlight?: boolean;
        },
        signal?: AbortSignal
    ): Promise<{
        project_id: string;
        status: string;
    }> {
        return this.request('/v1/captions/generate', {
            method: 'POST',
            body: JSON.stringify({
                video_url: videoUrl,
                language: options?.language || 'en',
                style: options?.style,
                auto_highlight: options?.auto_highlight ?? true,
            }),
            signal,
        });
    }

    /**
     * Get transcription from video
     */
    async transcribeVideo(
        videoUrl: string,
        language: string = 'en'
    ): Promise<TranscriptionResult> {
        return this.request('/v1/transcribe', {
            method: 'POST',
            body: JSON.stringify({
                video_url: videoUrl,
                language,
            }),
        });
    }

    /**
     * Apply custom caption style
     */
    async applyCaptionStyle(
        projectId: string,
        style: CaptionStyle
    ): Promise<VideoProject> {
        return this.request(`/v1/projects/${projectId}/captions/style`, {
            method: 'PUT',
            body: JSON.stringify({ style }),
        });
    }

    // ============================================
    // AI VIDEO EDITING
    // ============================================

    /**
     * AI-powered video editing with natural language
     */
    async aiEdit(request: AIEditRequest, signal?: AbortSignal): Promise<{
        project_id: string;
        status: string;
        estimated_time?: number;
    }> {
        return this.request('/v1/ai/edit', {
            method: 'POST',
            body: JSON.stringify(request),
            signal,
        });
    }

    /**
     * Smart video trimming (remove silence, filler words)
     */
    async smartTrim(
        videoUrl: string,
        options?: {
            remove_silence?: boolean;
            remove_filler_words?: boolean;
            target_duration?: number;
        }
    ): Promise<{
        project_id: string;
        status: string;
    }> {
        return this.request('/v1/ai/smart-trim', {
            method: 'POST',
            body: JSON.stringify({
                video_url: videoUrl,
                ...options,
            }),
        });
    }

    /**
     * Auto-generate B-roll suggestions
     */
    async generateBRoll(
        videoUrl: string,
        transcript?: string
    ): Promise<{
        suggestions: Array<{
            timestamp: number;
            duration: number;
            query: string;
            relevance_score: number;
        }>;
    }> {
        return this.request('/v1/ai/b-roll', {
            method: 'POST',
            body: JSON.stringify({
                video_url: videoUrl,
                transcript,
            }),
        });
    }

    // ============================================
    // VIDEO EFFECTS
    // ============================================

    /**
     * Apply video filters and effects
     */
    async applyEffects(
        projectId: string,
        effects: Array<{
            type: 'filter' | 'transition' | 'overlay' | 'animation';
            name: string;
            params?: Record<string, any>;
            start_time?: number;
            end_time?: number;
        }>
    ): Promise<VideoProject> {
        return this.request(`/v1/projects/${projectId}/effects`, {
            method: 'POST',
            body: JSON.stringify({ effects }),
        });
    }

    /**
     * Add background music
     */
    async addMusic(
        projectId: string,
        options: {
            music_url?: string;
            genre?: string;
            mood?: string;
            volume?: number;
            fade_in?: boolean;
            fade_out?: boolean;
        }
    ): Promise<VideoProject> {
        return this.request(`/v1/projects/${projectId}/audio/music`, {
            method: 'POST',
            body: JSON.stringify(options),
        });
    }

    // ============================================
    // EXPORT & RENDERING
    // ============================================

    /**
     * Export/render the final video
     */
    async exportVideo(
        projectId: string,
        options?: {
            format?: 'mp4' | 'mov' | 'webm';
            quality?: 'low' | 'medium' | 'high' | '4k';
            resolution?: '720p' | '1080p' | '4k';
            fps?: 24 | 30 | 60;
        }
    ): Promise<{
        export_id: string;
        status: 'queued' | 'processing' | 'completed' | 'failed';
    }> {
        return this.request(`/v1/projects/${projectId}/export`, {
            method: 'POST',
            body: JSON.stringify(options),
        });
    }

    /**
     * Get export status
     */
    async getExportStatus(exportId: string, signal?: AbortSignal): Promise<{
        status: 'queued' | 'processing' | 'completed' | 'failed';
        progress?: number;
        video_url?: string;
        error?: string;
    }> {
        return this.request(`/v1/exports/${exportId}`, { signal });
    }

    /**
     * Poll for export completion
     */
    async waitForExport(
        exportId: string,
        options: {
            maxAttempts?: number;
            intervalMs?: number;
            onProgress?: (progress: number) => void;
            signal?: AbortSignal;
        } = {}
    ): Promise<string> {
        const { maxAttempts = 120, intervalMs = 5000, onProgress } = options;

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            const status = await this.getExportStatus(exportId);

            if (onProgress && status.progress) {
                onProgress(status.progress);
            }

            if (status.status === 'completed' && status.video_url) {
                return status.video_url;
            }

            if (status.status === 'failed') {
                throw new Error(`Export failed: ${status.error}`);
            }

            // Cancellable delay
            await new Promise((resolve, reject) => {
                const timeout = setTimeout(resolve, intervalMs);
                if (options.signal) {
                    options.signal.addEventListener('abort', () => {
                        clearTimeout(timeout);
                        reject(new DOMException('Aborted', 'AbortError'));
                    }, { once: true });
                }
            });
        }

        throw new Error('Export timeout');
    }

    // ============================================
    // TEMPLATES
    // ============================================

    /**
     * Apply a video template
     */
    async applyTemplate(
        projectId: string,
        templateId: string,
        variables?: Record<string, any>
    ): Promise<VideoProject> {
        return this.request(`/v1/projects/${projectId}/template`, {
            method: 'POST',
            body: JSON.stringify({
                template_id: templateId,
                variables,
            }),
        });
    }
}

// ============================================
// SINGLETON INSTANCE
// ============================================

let captionsClient: CaptionsClient | null = null;

export function getCaptionsClient(): CaptionsClient {
    if (!captionsClient) {
        captionsClient = new CaptionsClient();
    }
    return captionsClient;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Quick caption generation with styling
 */
export async function quickCaption(
    videoUrl: string,
    style?: CaptionStyle,
    signal?: AbortSignal
): Promise<string> {
    const client = getCaptionsClient();

    const { project_id } = await client.generateCaptions(videoUrl, { style }, signal);

    // Wait for processing
    return client.waitForExport(project_id, { signal }); // Reusing waitForExport logic or similar
}

/**
 * AI-powered video enhancement
 */
export async function enhanceVideo(
    videoUrl: string,
    prompt: string,
    options?: {
        addCaptions?: boolean;
        addMusic?: boolean;
        style?: 'professional' | 'casual' | 'cinematic';
    },
    signal?: AbortSignal
): Promise<string> {
    const client = getCaptionsClient();

    const { project_id } = await client.aiEdit({
        video_url: videoUrl,
        prompt,
        style: options?.style || 'professional',
        include_captions: options?.addCaptions ?? true,
        include_music: options?.addMusic ?? false,
    }, signal);

    // Wait for processing
    let attempts = 0;
    while (attempts < 120) {
        const project = await client.getProject(project_id, signal);

        if (project.status === 'completed' && project.video_url) {
            return project.video_url;
        }

        if (project.status === 'failed') {
            throw new Error('Video enhancement failed');
        }

        // Cancellable delay
        await new Promise((resolve, reject) => {
            const timeout = setTimeout(resolve, 5000);
            if (signal) {
                signal.addEventListener('abort', () => {
                    clearTimeout(timeout);
                    reject(new DOMException('Aborted', 'AbortError'));
                }, { once: true });
            }
        });
        attempts++;
    }

    throw new Error('Video enhancement timeout');
}
