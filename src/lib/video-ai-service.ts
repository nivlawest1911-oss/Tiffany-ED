/**
 * Unified Video AI Service
 * Orchestrates HeyGen, Captions.ai, and InVideo AI
 */

import { getHeyGenClient, generateTalkingAvatar } from './heygen/client';
import { getCaptionsClient, quickCaption, enhanceVideo } from './captions/client';
import { getInVideoClient, quickCreateVideo } from './invideo/client';

export interface VideoCreationWorkflow {
    type: 'avatar' | 'ai-generated' | 'edited';
    input: {
        script?: string;
        prompt?: string;
        videoUrl?: string;
    };
    options?: {
        avatarId?: string;
        voiceId?: string;
        style?: 'professional' | 'casual' | 'educational';
        addCaptions?: boolean;
        aspectRatio?: '16:9' | '9:16' | '1:1';
    };
}

export interface VideoCreationResult {
    videoUrl: string;
    thumbnailUrl?: string;
    duration?: number;
    metadata: {
        platform: 'heygen' | 'captions' | 'invideo';
        processingTime: number;
        cost?: number;
    };
}

/**
 * Unified Video AI Service
 * Provides high-level orchestration of all video AI platforms
 */
export class VideoAIService {
    private heygenClient = getHeyGenClient();
    private captionsClient = getCaptionsClient();
    private invideoClient = getInVideoClient();

    /**
     * Create a complete educational video workflow
     * 1. Generate video with InVideo AI or HeyGen
     * 2. Add captions with Captions.ai
     * 3. Return final polished video
     */
    async createEducationalVideo(
        topic: string,
        options: {
            useAvatar?: boolean;
            avatarId?: string;
            voiceId?: string;
            duration?: number;
            style?: 'professional' | 'casual' | 'educational';
        } = {},
        signal?: AbortSignal
    ): Promise<VideoCreationResult> {
        const startTime = Date.now();

        try {
            let baseVideoUrl: string;
            let platform: 'heygen' | 'invideo';

            // Step 1: Generate base video
            if (options.useAvatar) {
                // Use HeyGen for avatar video
                console.log('Generating avatar video with HeyGen...');
                const videoResponse = await generateTalkingAvatar(
                    options.avatarId || 'default',
                    options.voiceId || 'en-US-JennyNeural',
                    topic,
                    { aspectRatio: '16:9' },
                    signal
                );
                // Wait for video completion
                const client = getHeyGenClient();
                const completed = await client.waitForVideo(videoResponse.video_id, { signal });
                if (!completed.video_url) {
                    throw new Error('Video URL not available');
                }
                baseVideoUrl = completed.video_url;
                platform = 'heygen';
            } else {
                // Use InVideo AI for full video generation
                console.log('Generating video with InVideo AI...');
                baseVideoUrl = await quickCreateVideo(topic, {
                    style: options.style || 'educational',
                    aspectRatio: '16:9',
                    duration: options.duration || 60,
                }, signal);
                platform = 'invideo';
            }

            // Step 2: Add captions with Captions.ai
            console.log('Adding captions with Captions.ai...');
            const finalVideoUrl = await quickCaption(baseVideoUrl, {
                font_family: 'Inter',
                font_size: 48,
                font_color: '#FFFFFF',
                background_color: '#000000',
                position: 'bottom',
                animation: 'fade',
                highlight_color: '#FFD700',
            }, signal);

            const processingTime = Date.now() - startTime;

            return {
                videoUrl: finalVideoUrl,
                metadata: {
                    platform,
                    processingTime,
                },
            };
        } catch (error) {
            console.error('Error in educational video workflow:', error);
            throw error;
        }
    }

    /**
     * Enhance existing video with AI
     */
    async enhanceExistingVideo(
        videoUrl: string,
        enhancements: {
            addCaptions?: boolean;
            improveAudio?: boolean;
            addTransitions?: boolean;
            removeFillerWords?: boolean;
            style?: 'professional' | 'casual' | 'cinematic';
        } = {},
        signal?: AbortSignal
    ): Promise<VideoCreationResult> {
        const startTime = Date.now();

        try {
            const currentVideoUrl = videoUrl;

            // Build enhancement prompt
            const enhancementTasks: string[] = [];
            if (enhancements.addCaptions) enhancementTasks.push('add professional captions');
            if (enhancements.improveAudio) enhancementTasks.push('enhance audio quality');
            if (enhancements.addTransitions) enhancementTasks.push('add smooth transitions');
            if (enhancements.removeFillerWords) enhancementTasks.push('remove filler words and silence');

            const prompt = enhancementTasks.join(', ');

            // Enhance with Captions.ai
            console.log('Enhancing video with Captions.ai...');
            const enhancedVideoUrl = await enhanceVideo(currentVideoUrl, prompt, {
                addCaptions: enhancements.addCaptions ?? true,
                style: enhancements.style || 'professional',
            }, signal);

            const processingTime = Date.now() - startTime;

            return {
                videoUrl: enhancedVideoUrl,
                metadata: {
                    platform: 'captions',
                    processingTime,
                },
            };
        } catch (error) {
            console.error('Error enhancing video:', error);
            throw error;
        }
    }

    /**
     * Create avatar presentation from slides/script
     */
    async createAvatarPresentation(
        script: string,
        options: {
            avatarId?: string;
            voiceId?: string;
            background?: string;
        } = {},
        signal?: AbortSignal
    ): Promise<VideoCreationResult> {
        const startTime = Date.now();

        try {
            console.log('Creating avatar presentation...');

            const videoResponse = await generateTalkingAvatar(
                options.avatarId || 'professional_female',
                options.voiceId || 'en-US-JennyNeural',
                script,
                {
                    background: options.background || '#1a1a2e',
                    aspectRatio: '16:9',
                },
                signal
            );

            // Wait for video completion
            const client = getHeyGenClient();
            const completed = await client.waitForVideo(videoResponse.video_id, { signal });
            if (!completed.video_url) {
                throw new Error('Video URL not available');
            }

            const processingTime = Date.now() - startTime;

            return {
                videoUrl: completed.video_url,
                metadata: {
                    platform: 'heygen',
                    processingTime,
                },
            };
        } catch (error) {
            console.error('Error creating avatar presentation:', error);
            throw error;
        }
    }

    /**
     * Generate video from text prompt (fastest method)
     */
    async quickGenerate(
        prompt: string,
        options: {
            style?: 'professional' | 'casual' | 'educational';
            duration?: number;
        } = {},
        signal?: AbortSignal
    ): Promise<VideoCreationResult> {
        const startTime = Date.now();

        try {
            console.log('Quick generating video with InVideo AI...');

            const videoUrl = await quickCreateVideo(prompt, {
                style: options.style || 'educational',
                aspectRatio: '16:9',
                duration: options.duration || 60,
            }, signal);

            const processingTime = Date.now() - startTime;

            return {
                videoUrl,
                metadata: {
                    platform: 'invideo',
                    processingTime,
                },
            };
        } catch (error) {
            console.error('Error in quick generate:', error);
            throw error;
        }
    }

    /**
     * Translate video to another language
     */
    async translateVideo(
        videoUrl: string,
        targetLanguage: string,
        signal?: AbortSignal
    ): Promise<VideoCreationResult> {
        const startTime = Date.now();

        try {
            console.log(`Translating video to ${targetLanguage}...`);

            const result = await this.heygenClient.translateVideo(videoUrl, targetLanguage, { signal });

            // Poll for completion
            let attempts = 0;
            while (attempts < 60) {
                const status = await this.heygenClient.getTranslationStatus(result.translate_id);

                if (status.status === 'completed' && status.translated_video_url) {
                    const processingTime = Date.now() - startTime;

                    return {
                        videoUrl: status.translated_video_url,
                        metadata: {
                            platform: 'heygen',
                            processingTime,
                        },
                    };
                }

                if (status.status === 'failed') {
                    throw new Error('Translation failed');
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

            throw new Error('Translation timeout');
        } catch (error) {
            console.error('Error translating video:', error);
            throw error;
        }
    }

    /**
     * Get available avatars from HeyGen
     */
    async getAvailableAvatars() {
        return this.heygenClient.listAvatars();
    }

    /**
     * Get available voices from HeyGen
     */
    async getAvailableVoices() {
        return this.heygenClient.listVoices();
    }

    /**
     * Get available voices from InVideo
     */
    async getInVideoVoices(language?: string) {
        return this.invideoClient.listVoices(language);
    }
}

// Singleton instance
let videoAIService: VideoAIService | null = null;

export function getVideoAIService(): VideoAIService {
    if (!videoAIService) {
        videoAIService = new VideoAIService();
    }
    return videoAIService;
}

// Convenience exports
export {
    getHeyGenClient,
    getCaptionsClient,
    getInVideoClient,
    generateTalkingAvatar,
    quickCaption,
    enhanceVideo,
    quickCreateVideo,
};
