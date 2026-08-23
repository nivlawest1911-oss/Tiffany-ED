import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createXai } from '@ai-sdk/xai';

/**
 * EdIntel Canonical AI Configuration & Provider Registry
 * 
 * Centralizes environment variable lookup across multiple legacy aliases,
 * standardizes model constants, and provides alias-aware AI SDK providers.
 */

/**
 * Resolves the Google/Gemini API key using canonical precedence:
 * 1. GOOGLE_GENERATIVE_AI_API_KEY (Primary official AI SDK env var)
 * 2. GOOGLE_GENAI_API_KEY (Google Gen AI SDK alternative)
 * 3. GOOGLE_GEMINI_API_KEY (Project legacy alias)
 * 4. GEMINI_API_KEY (Direct Gemini shorthand)
 * 5. GOOGLE_API_KEY (Generic alias)
 * 6. GOOGLE_CLOUD_API_KEY (GCP legacy alias)
 */
export function getGoogleAIKey(): string {
    return (
        process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
        process.env.GOOGLE_GENAI_API_KEY ||
        process.env.GOOGLE_GEMINI_API_KEY ||
        process.env.GEMINI_API_KEY ||
        process.env.GOOGLE_API_KEY ||
        process.env.GOOGLE_CLOUD_API_KEY ||
        ''
    ).trim();
}

export function getOpenAIKey(): string {
    return (process.env.OPENAI_API_KEY || '').trim();
}

export function getAnthropicKey(): string {
    return (process.env.ANTHROPIC_API_KEY || '').trim();
}

export function getXAIKey(): string {
    return (process.env.XAI_API_KEY || '').trim();
}

export function getTogetherKey(): string {
    return (process.env.TOGETHER_API_KEY || '').trim();
}

/**
 * Canonical Model Registry
 * Preserves stable production models and eliminates deprecated/experimental strings.
 */
export const AI_MODELS = {
    GOOGLE: {
        FLASH: 'gemini-1.5-flash',
        FLASH_2: 'gemini-2.0-flash',
        PRO: 'gemini-1.5-pro',
        EMBEDDING: 'text-embedding-004',
    },
    OPENAI: {
        PRIMARY: 'gpt-4o',
        ROUTINE: 'gpt-4o-mini',
    },
    ANTHROPIC: {
        SONNET: 'claude-3-5-sonnet-20241022',
        SONNET_LEGACY: 'claude-3-5-sonnet-20240620',
    },
    XAI: {
        GROK: 'grok-2-1212',
    },
} as const;

/**
 * Pre-configured, alias-aware Vercel AI SDK Providers
 */
export const googleProvider = createGoogleGenerativeAI({
    apiKey: getGoogleAIKey(),
});

export const openaiProvider = createOpenAI({
    apiKey: getOpenAIKey(),
});

export const anthropicProvider = createAnthropic({
    apiKey: getAnthropicKey(),
});

export const xaiProvider = createXai({
    apiKey: getXAIKey(),
});
