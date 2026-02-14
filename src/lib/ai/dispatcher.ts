/**
 * EdIntel Sovereign Dispatcher
 * Central orchestration layer for all AI tool calls
 */

import { streamText, generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { xai } from '@ai-sdk/xai';
import { anthropic } from '@ai-sdk/anthropic';
import { openai } from '@ai-sdk/openai';

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
}

export class AIDispatcher {
    /**
     * Resolve the requested model based on provider and complexity
     */
    private static getModel(provider: AIProvider, modelName?: string, complexity?: TaskComplexity) {
        // If an explicit model name is provided, use it
        if (modelName) {
            switch (provider) {
                case 'google': return google(modelName);
                case 'xai': return xai(modelName);
                case 'anthropic': return anthropic(modelName);
                case 'openai': return openai(modelName);
                default: return google(modelName);
            }
        }

        // Otherwise, resolve via complexity tiers
        switch (complexity) {
            case TaskComplexity.ROUTINE:
                return google('gemini-1.5-flash');
            case TaskComplexity.EXECUTIVE:
                return anthropic('claude-3-5-sonnet-20240620'); // Premium reasoning
            case TaskComplexity.ANALYSIS:
            default:
                return google('gemini-1.5-pro'); // Standard high-quality
        }
    }

    /**
     * Stream AI response
     */
    static async stream(options: DispatchOptions) {
        const { provider = 'google', model, complexity, system, messages, temperature = 0.7 } = options;

        return streamText({
            model: this.getModel(provider, model, complexity),
            system,
            messages,
            temperature,
        } as any);
    }

    /**
     * Generate static AI response
     */
    static async generate(options: DispatchOptions) {
        const { provider = 'google', model, complexity, system, messages, temperature = 0.7 } = options;

        return generateText({
            model: this.getModel(provider, model, complexity),
            system,
            messages,
            temperature,
        } as any);
    }
}
