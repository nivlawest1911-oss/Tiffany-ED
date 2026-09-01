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
import { recordLlmUsage, extractUsageFromResult } from '@/lib/ai/token-meter';

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
    userId?: string;
    orgId?: string;
    districtId?: string;
    route?: string;
    operation?: string;
}

export class AIDispatcher {
    /**
     * Resolve the requested model string and provider instance
     */
    private static resolveModelInfo(provider: AIProvider, modelName?: string, complexity?: TaskComplexity) {
        let resolvedModelId = modelName;
        if (!resolvedModelId) {
            switch (complexity) {
                case TaskComplexity.ROUTINE:
                    resolvedModelId = AI_MODELS.GOOGLE.FLASH;
                    break;
                case TaskComplexity.EXECUTIVE:
                    resolvedModelId = AI_MODELS.ANTHROPIC.SONNET;
                    break;
                case TaskComplexity.ANALYSIS:
                default:
                    resolvedModelId = AI_MODELS.GOOGLE.PRO;
                    break;
            }
        }

        let modelInstance: any;
        switch (provider) {
            case 'google':
                modelInstance = googleProvider(resolvedModelId);
                break;
            case 'xai':
                modelInstance = xaiProvider(resolvedModelId);
                break;
            case 'anthropic':
                modelInstance = anthropicProvider(resolvedModelId);
                break;
            case 'openai':
                modelInstance = openaiProvider(resolvedModelId);
                break;
            default:
                modelInstance = googleProvider(resolvedModelId);
                break;
        }

        return { modelId: resolvedModelId, modelInstance };
    }

    /**
     * Stream AI response
     */
    static async stream(options: DispatchOptions) {
        const { 
            provider = 'google', 
            model, 
            complexity, 
            system, 
            messages, 
            temperature = 0.7, 
            maxTokens,
            userId,
            orgId,
            districtId,
            route = 'ai/dispatcher',
            operation = 'stream'
        } = options;

        const start = Date.now();
        const { modelId, modelInstance } = this.resolveModelInfo(provider, model, complexity);

        return streamText({
            model: modelInstance,
            system,
            messages,
            temperature,
            maxTokens,
            onFinish: (event: any) => {
                const usage = extractUsageFromResult(event);
                void recordLlmUsage({
                    modelId,
                    provider,
                    operation,
                    route,
                    inputTokens: usage.inputTokens,
                    outputTokens: usage.outputTokens,
                    totalTokens: usage.totalTokens,
                    isEstimated: usage.isEstimated,
                    latencyMs: Date.now() - start,
                    success: true,
                    userId,
                    orgId,
                    districtId,
                });
            },
        } as any);
    }

    /**
     * Generate static AI response
     */
    static async generate(options: DispatchOptions) {
        const { 
            provider = 'google', 
            model, 
            complexity, 
            system, 
            messages, 
            temperature = 0.7, 
            maxTokens,
            userId,
            orgId,
            districtId,
            route = 'ai/dispatcher',
            operation = 'generate'
        } = options;

        const start = Date.now();
        const { modelId, modelInstance } = this.resolveModelInfo(provider, model, complexity);

        try {
            const result = await generateText({
                model: modelInstance,
                system,
                messages,
                temperature,
                maxTokens,
            } as any);

            const usage = extractUsageFromResult(result);
            void recordLlmUsage({
                modelId,
                provider,
                operation,
                route,
                inputTokens: usage.inputTokens,
                outputTokens: usage.outputTokens,
                totalTokens: usage.totalTokens,
                isEstimated: usage.isEstimated,
                latencyMs: Date.now() - start,
                success: true,
                userId,
                orgId,
                districtId,
            });

            return result;
        } catch (error: any) {
            void recordLlmUsage({
                modelId,
                provider,
                operation,
                route,
                latencyMs: Date.now() - start,
                success: false,
                errorCode: error?.name || 'DISPATCHER_GENERATE_ERROR',
                userId,
                orgId,
                districtId,
            });
            throw error;
        }
    }
}
