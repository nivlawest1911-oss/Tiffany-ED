/**
 * Meta AI (Llama) Client
 * Integration for Meta's Llama models via various providers
 */

import { withResilience, ALABAMA_STRATEGIC_DIRECTIVE } from '../ai-resilience';

export interface MetaAIConfig {
    apiKey?: string;
    provider?: 'together' | 'replicate' | 'huggingface' | 'openrouter';
    model?: string;
}

export interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export interface ChatCompletionRequest {
    messages: ChatMessage[];
    model?: string;
    temperature?: number;
    max_tokens?: number;
    top_p?: number;
    stream?: boolean;
}

export interface ChatCompletionResponse {
    id: string;
    choices: Array<{
        message: ChatMessage;
        finish_reason: string;
    }>;
    usage?: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

export interface ImageGenerationRequest {
    prompt: string;
    model?: string;
    num_outputs?: number;
    width?: number;
    height?: number;
}

export interface CodeGenerationRequest {
    prompt: string;
    language?: string;
    max_tokens?: number;
}

/**
 * Meta AI Client
 * Supports multiple providers for Llama models
 */
export class MetaAIClient {
    private apiKey: string;
    private provider: 'together' | 'replicate' | 'huggingface' | 'openrouter';
    private baseUrl: string;
    private model: string;

    constructor(config: MetaAIConfig = {}) {
        this.provider = config.provider || 'together';
        this.apiKey = config.apiKey || this.getDefaultApiKey();
        this.baseUrl = this.getBaseUrl();
        this.model = config.model || this.getDefaultModel();
    }

    private getDefaultApiKey(): string {
        switch (this.provider) {
            case 'together':
                return process.env.TOGETHER_API_KEY || '';
            case 'replicate':
                return process.env.REPLICATE_API_TOKEN || '';
            case 'huggingface':
                return process.env.HUGGINGFACE_API_KEY || '';
            case 'openrouter':
                return process.env.OPENROUTER_API_KEY || '';
            default:
                return '';
        }
    }

    private getBaseUrl(): string {
        switch (this.provider) {
            case 'together':
                return 'https://api.together.xyz/v1';
            case 'replicate':
                return 'https://api.replicate.com/v1';
            case 'huggingface':
                return 'https://api-inference.huggingface.co/models';
            case 'openrouter':
                return 'https://openrouter.ai/api/v1';
            default:
                return '';
        }
    }

    private getDefaultModel(): string {
        switch (this.provider) {
            case 'together':
                return 'meta-llama/Llama-3.3-70B-Instruct-Turbo';
            case 'replicate':
                return 'meta/llama-2-70b-chat';
            case 'huggingface':
                return 'meta-llama/Meta-Llama-3-70B-Instruct';
            case 'openrouter':
                return 'meta-llama/llama-3.1-405b-instruct';
            default:
                return 'meta-llama/Llama-3.3-70B-Instruct-Turbo';
        }
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        return withResilience(async () => {
            const url = `${this.baseUrl}${endpoint}`;

            const headers: Record<string, string> = {
                'Content-Type': 'application/json',
                ...options.headers as Record<string, string>,
            };

            if (this.provider === 'together' || this.provider === 'openrouter') {
                headers['Authorization'] = `Bearer ${this.apiKey}`;
            } else if (this.provider === 'replicate') {
                headers['Authorization'] = `Token ${this.apiKey}`;
            } else if (this.provider === 'huggingface') {
                headers['Authorization'] = `Bearer ${this.apiKey}`;
            }

            const response = await fetch(url, {
                ...options,
                headers,
            });

            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                const err = new Error(`Meta AI API Error: ${response.status} - ${error.message || response.statusText}`) as any;
                err.status = response.status;
                throw err;
            }

            return response.json();
        });
    }

    // ============================================
    // CHAT COMPLETION
    // ============================================

    /**
     * Generate chat completion with Llama
     */
    async chat(request: ChatCompletionRequest): Promise<ChatCompletionResponse> {
        if (this.provider === 'replicate') {
            return this.chatReplicate(request);
        }

        return this.request('/chat/completions', {
            method: 'POST',
            body: JSON.stringify({
                model: request.model || this.model,
                messages: request.messages,
                temperature: request.temperature || 0.7,
                max_tokens: request.max_tokens || 2048,
                top_p: request.top_p || 0.9,
                stream: request.stream || false,
            }),
        });
    }

    /**
     * Chat completion for Replicate
     */
    private async chatReplicate(request: ChatCompletionRequest): Promise<ChatCompletionResponse> {
        // Format messages for Replicate
        const prompt = request.messages
            .map(m => `${m.role}: ${m.content}`)
            .join('\n\n');

        const response = await this.request('/predictions', {
            method: 'POST',
            body: JSON.stringify({
                version: this.model,
                input: {
                    prompt,
                    max_tokens: request.max_tokens || 2048,
                    temperature: request.temperature || 0.7,
                },
            }),
        });

        // Poll for completion
        const prediction: any = response;
        let attempts = 0;
        while (attempts < 60 && prediction.status !== 'succeeded') {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const status = await this.request(`/predictions/${prediction.id}`, {});
            Object.assign(prediction, status);
            attempts++;
        }

        return {
            id: prediction.id,
            choices: [{
                message: {
                    role: 'assistant',
                    content: prediction.output?.join('') || '',
                },
                finish_reason: 'stop',
            }],
        };
    }

    /**
     * Stream chat completion
     */
    async *chatStream(request: ChatCompletionRequest): AsyncGenerator<string> {
        const response = await fetch(`${this.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...request,
                stream: true,
            }),
        });

        if (!response.body) {
            throw new Error('No response body');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n').filter(line => line.trim() !== '');

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]') return;

                    try {
                        const parsed = JSON.parse(data);
                        const content = parsed.choices[0]?.delta?.content;
                        if (content) {
                            yield content;
                        }
                    } catch (e) {
                        // Skip invalid JSON
                    }
                }
            }
        }
    }

    // ============================================
    // TEXT GENERATION
    // ============================================

    /**
     * Simple text completion
     */
    async complete(prompt: string, options?: {
        max_tokens?: number;
        temperature?: number;
        systemMessage?: string;
    }): Promise<string> {
        const messages: ChatMessage[] = [];

        if (options?.systemMessage) {
            messages.push({ role: 'system', content: options.systemMessage });
        }

        messages.push({ role: 'user', content: prompt });

        const response = await this.chat({
            messages,
            max_tokens: options?.max_tokens,
            temperature: options?.temperature,
        });

        return response.choices[0]?.message.content || '';
    }

    /**
     * Generate educational content
     */
    async generateEducationalContent(
        topic: string,
        gradeLevel: string,
        options?: {
            format?: 'lesson' | 'quiz' | 'summary' | 'explanation';
            length?: 'short' | 'medium' | 'long';
        }
    ): Promise<string> {
        const format = options?.format || 'explanation';
        const length = options?.length || 'medium';

        const prompt = `Create a ${format} about ${topic} for ${gradeLevel} students. 
Length: ${length}. 
Make it engaging, clear, and age-appropriate.`;

        return this.complete(prompt, {
            max_tokens: length === 'short' ? 500 : length === 'medium' ? 1000 : 2000,
        });
    }

    /**
     * Generate code
     */
    async generateCode(request: CodeGenerationRequest): Promise<string> {
        const prompt = `Generate ${request.language || 'code'} for: ${request.prompt}
Provide clean, well-commented code.`;

        return this.complete(prompt, {
            max_tokens: request.max_tokens || 1500,
        });
    }

    // ============================================
    // ANALYSIS
    // ============================================

    /**
     * Analyze student work
     */
    async analyzeStudentWork(
        work: string,
        rubric?: string
    ): Promise<{
        score: number;
        feedback: string;
        strengths: string[];
        improvements: string[];
    }> {
        const prompt = `Analyze this student work:
${work}

${rubric ? `Using this rubric:\n${rubric}\n` : ''}

Provide:
1. Overall score (0-100)
2. Detailed feedback
3. Key strengths
4. Areas for improvement

Format as JSON.`;

        const response = await this.complete(prompt);

        try {
            return JSON.parse(response);
        } catch {
            // Fallback if not valid JSON
            return {
                score: 0,
                feedback: response,
                strengths: [],
                improvements: [],
            };
        }
    }

    /**
     * Generate quiz questions with Sovereign OS: Quiz Synthesis Directive
     */
    async generateQuiz(
        topic: string,
        numQuestions: number = 5,
        questionType: 'multiple-choice' | 'short-answer' | 'essay' = 'multiple-choice'
    ): Promise<any[]> {
        const systemMessage = `
            ${ALABAMA_STRATEGIC_DIRECTIVE}
            
            SOVEREIGN OS: QUIZ SYNTHESIS SPECIFIC
            Target: ${topic}
            Count: ${numQuestions} questions
            Type: ${questionType}

            Format: Return ONLY a JSON array of objects with the following schema:
            {
              "question": "string",
              "options": ["string"] (required for multiple-choice),
              "answer": "string",
              "explanation": "string (Reasoning Logic block)",
              "standard": "Alabama Math 5.x citation",
              "realWorldContext": "string"
            }
        `;

        const userPrompt = `Generate ${numQuestions} ${questionType} questions about ${topic} following the Sovereign OS Directive. Ensure high-fidelity compliance.`;

        const response = await this.complete(userPrompt, {
            max_tokens: 3000,
            systemMessage
        });

        try {
            // Clean up Llama 3.3 potential markdown formatting
            const jsonStr = response.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(jsonStr);
        } catch (error) {
            console.error("[Synthesis Failure] Parsing error:", error);
            return [];
        }
    }

    // ============================================
    // EMBEDDINGS
    // ============================================

    /**
     * Generate embeddings (if supported by provider)
     */
    async generateEmbedding(text: string): Promise<number[]> {
        if (this.provider !== 'together') {
            throw new Error('Embeddings only supported with Together AI');
        }

        const response = await this.request<{ data: Array<{ embedding: number[] }> }>('/embeddings', {
            method: 'POST',
            body: JSON.stringify({
                model: 'togethercomputer/m2-bert-80M-8k-retrieval',
                input: text,
            }),
        });

        return response.data[0]?.embedding || [];
    }
}

// ============================================
// SINGLETON INSTANCE
// ============================================

let metaAIClient: MetaAIClient | null = null;

export function getMetaAIClient(provider?: 'together' | 'replicate' | 'huggingface' | 'openrouter'): MetaAIClient {
    if (!metaAIClient || (provider && metaAIClient['provider'] !== provider)) {
        metaAIClient = new MetaAIClient({ provider });
    }
    return metaAIClient;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Quick chat with Llama
 */
export async function quickChat(
    message: string,
    systemPrompt?: string
): Promise<string> {
    const client = getMetaAIClient();

    const messages: ChatMessage[] = [];
    if (systemPrompt) {
        messages.push({ role: 'system', content: systemPrompt });
    }
    messages.push({ role: 'user', content: message });

    const response = await client.chat({ messages });
    return response.choices[0]?.message.content || '';
}

/**
 * Generate educational content quickly
 */
export async function quickEducationalContent(
    topic: string,
    gradeLevel: string
): Promise<string> {
    const client = getMetaAIClient();
    return client.generateEducationalContent(topic, gradeLevel);
}
