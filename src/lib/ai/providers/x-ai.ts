/**
 * X.AI (Grok) Provider Integration
 * Powered by Vercel AI SDK
 */

import { xai } from '@ai-sdk/xai';

export const xaiProvider = {
    chatModel: xai('grok-1'),
    visionModel: xai('grok-vision-beta'),
};

/**
 * Convenience helper for X.AI generation
 */
export const grok = xai;
