/**
 * EdIntel Sovereign Dispatcher
 * Central orchestration layer for all AI tool calls
 */

import { streamText, generateText } from 'ai';
import { 
    googleProvider, 
    xaiProvider, 
    anthropicProvider, 
    openaiProvider,
    AI_MODELS 
} from '@/lib/ai-config';

export type AIProvider = 'google' | 'xai' | 'anthropic' | 'openai';

export enum TaskComplexity {
    ROUTINE = 'routine',     // Flash/Mini models for speed and cost
    ANALYSIS = 'analysis',   // Mid-tier models for standard reasoning
    EXECUTIVE = 'executive', // Premium models for high-stakes/compliance
}

export interface DispatchOptions {
    provider?: AIProvider;
    model?: string;
    complexity?: TaskComplexity;
    system?: string;
    messages: any[];
    temperature?: number;
    maxTokens?: number;
}

export class AIDispatcher {
    /**
     * Resolve the requested model based on provider and complexity
     */
    private static getModel(provider: AIProvider, modelName?: string, complexity?: TaskComplexity) {
        // If an explicit model name is provided, use it
        if (modelName) {
            switch (provider) {
                case 'google': return googleProvider(modelName);
                case 'xai': return xaiProvider(modelName);
                case 'anthropic': return anthropicProvider(modelName);
                case 'openai': return openaiProvider(modelName);
                default: return googleProvider(modelName);
            }
        }

        // Otherwise, resolve via complexity tiers
        switch (complexity) {
            case TaskComplexity.ROUTINE:
                return googleProvider(AI_MODELS.GOOGLE.FLASH);
            case TaskComplexity.EXECUTIVE:
                return anthropicProvider(AI_MODELS.ANTHROPIC.SONNET); // Premium reasoning
            case TaskComplexity.ANALYSIS:
            default:
                return googleProvider(AI_MODELS.GOOGLE.PRO); // Standard high-quality
        }
    }

    /**
     * Stream AI response
     */
    static async stream(options: DispatchOptions) {
        const { provider = 'google', model, complexity, system, messages, temperature = 0.7, maxTokens } = options;

        return streamText({
            model: this.getModel(provider, model, complexity),
            system,
            messages,
            temperature,
            maxTokens,
        } as any);
    }

    /**
     * Generate static AI response
     */
    static async generate(options: DispatchOptions) {
        const { provider = 'google', model, complexity, system, messages, temperature = 0.7, maxTokens } = options;

        return generateText({
            model: this.getModel(provider, model, complexity),
            system,
            messages,
            temperature,
            maxTokens,
        } as any);
    }
}
