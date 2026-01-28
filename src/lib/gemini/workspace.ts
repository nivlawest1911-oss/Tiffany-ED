/**
 * EdIntel Professional - Gemini Workspace Integration
 * Sync and manage content from Google Gemini workspace
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const getGenAI = () => {
    const apiKey = process.env.GOOGLE_GENAI_API_KEY;
    if (!apiKey) {
        // During build time, return a mock or throw only when called
        return {
            getGenerativeModel: () => ({
                generateContent: async () => ({ response: { text: () => "{}" } })
            })
        } as any;
    }
    return new GoogleGenerativeAI(apiKey);
};

const genAI = getGenAI();

/**
 * Gemini Workspace Content Types
 */
export interface GeminiContent {
    id: string;
    type: 'conversation' | 'image' | 'document' | 'prompt' | 'workflow';
    title: string;
    content: string;
    metadata: {
        created: Date;
        modified: Date;
        tags: string[];
        category: string;
    };
    aiGenerated?: boolean;
    relatedTo?: string[]; // Related EdIntel features
}

export interface GeminiWorkspace {
    conversations: GeminiContent[];
    images: GeminiContent[];
    documents: GeminiContent[];
    prompts: GeminiContent[];
    workflows: GeminiContent[];
}

/**
 * Gemini Workspace Service
 */
export class GeminiWorkspaceService {
    /**
     * Import content from Gemini workspace
     */
    static async importContent(
        content: string,
        type: GeminiContent['type'],
        metadata?: Partial<GeminiContent['metadata']>
    ): Promise<GeminiContent> {
        const id = `gemini_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Use AI to analyze and categorize the content
        const analysis = await this.analyzeContent(content);

        return {
            id,
            type,
            title: analysis.title,
            content,
            metadata: {
                created: new Date(),
                modified: new Date(),
                tags: analysis.tags,
                category: analysis.category,
                ...metadata,
            },
            aiGenerated: true,
            relatedTo: analysis.relatedFeatures,
        };
    }

    /**
     * Analyze content using AI
     */
    private static async analyzeContent(content: string): Promise<{
        title: string;
        tags: string[];
        category: string;
        relatedFeatures: string[];
    }> {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

        const prompt = `Analyze this content for EdIntel Professional (an educational AI platform for Alabama schools):

Content: "${content.substring(0, 1000)}"

Return JSON with:
{
  "title": "Brief descriptive title (max 60 chars)",
  "tags": ["relevant", "tags"],
  "category": "IEP" | "Lesson Planning" | "Student Data" | "Professional Development" | "Communication" | "Assessment" | "General",
  "relatedFeatures": ["feature names that could use this content"]
}`;

        const result = await model.generateContent(prompt);
        const response = result.response.text();

        // Parse JSON from response
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        // Fallback
        return {
            title: 'Imported Content',
            tags: ['imported'],
            category: 'General',
            relatedFeatures: [],
        };
    }

    /**
     * Convert Gemini conversation to EdIntel workflow
     */
    static async convertToWorkflow(conversation: string): Promise<{
        name: string;
        steps: Array<{ action: string; description: string }>;
        aiPrompts: string[];
    }> {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

        const prompt = `Convert this Gemini conversation into an EdIntel workflow:

Conversation: "${conversation}"

Return JSON with:
{
  "name": "Workflow name",
  "steps": [
    { "action": "Step action", "description": "What to do" }
  ],
  "aiPrompts": ["AI prompts used in workflow"]
}`;

        const result = await model.generateContent(prompt);
        const response = result.response.text();

        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        return {
            name: 'Imported Workflow',
            steps: [],
            aiPrompts: [],
        };
    }

    /**
     * Extract educational content from Gemini media
     */
    static async extractEducationalContent(imageUrl: string): Promise<{
        type: 'lesson_plan' | 'iep_goal' | 'assessment' | 'visual_aid' | 'other';
        content: string;
        suggestions: string[];
    }> {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

        const prompt = `Analyze this educational image and extract key content:

Image URL: ${imageUrl}

Return JSON with:
{
  "type": "lesson_plan" | "iep_goal" | "assessment" | "visual_aid" | "other",
  "content": "Extracted text and key information",
  "suggestions": ["How to use this in EdIntel"]
}`;

        const result = await model.generateContent(prompt);
        const response = result.response.text();

        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        return {
            type: 'other',
            content: '',
            suggestions: [],
        };
    }

    /**
     * Sync prompts from Gemini to EdIntel generators
     */
    static async syncPromptsToGenerators(prompts: string[]): Promise<{
        synced: number;
        generators: Array<{ name: string; prompt: string }>;
    }> {
        const generators: Array<{ name: string; prompt: string }> = [];

        for (const prompt of prompts) {
            const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

            const analysisPrompt = `Analyze this prompt and determine which EdIntel generator it belongs to:

Prompt: "${prompt}"

Return JSON with:
{
  "generator": "IEP Generator" | "Lesson Planner" | "Assessment Builder" | "Communication Helper" | "Other",
  "optimizedPrompt": "Optimized version for EdIntel"
}`;

            const result = await model.generateContent(analysisPrompt);
            const response = result.response.text();

            const jsonMatch = response.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const data = JSON.parse(jsonMatch[0]);
                generators.push({
                    name: data.generator,
                    prompt: data.optimizedPrompt,
                });
            }
        }

        return {
            synced: generators.length,
            generators,
        };
    }

    /**
     * Create EdIntel content library from Gemini workspace
     */
    static async createContentLibrary(workspace: GeminiWorkspace): Promise<{
        categories: Record<string, GeminiContent[]>;
        totalItems: number;
        recommendations: string[];
    }> {
        const categories: Record<string, GeminiContent[]> = {
            'IEP': [],
            'Lesson Planning': [],
            'Student Data': [],
            'Professional Development': [],
            'Communication': [],
            'Assessment': [],
            'General': [],
        };

        const allContent = [
            ...workspace.conversations,
            ...workspace.images,
            ...workspace.documents,
            ...workspace.prompts,
            ...workspace.workflows,
        ];

        // Categorize content
        for (const item of allContent) {
            const category = item.metadata.category || 'General';
            if (categories[category]) {
                categories[category].push(item);
            } else {
                categories['General'].push(item);
            }
        }

        // Generate recommendations
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
        const prompt = `Based on this content library, suggest how to best use it in EdIntel:

Categories: ${Object.keys(categories).map(cat => `${cat}: ${categories[cat].length} items`).join(', ')}

Return JSON array of recommendations:
["recommendation 1", "recommendation 2", ...]`;

        const result = await model.generateContent(prompt);
        const response = result.response.text();

        const jsonMatch = response.match(/\[[\s\S]*\]/);
        const recommendations = jsonMatch ? JSON.parse(jsonMatch[0]) : [];

        return {
            categories,
            totalItems: allContent.length,
            recommendations,
        };
    }

    /**
     * Auto-tag content with AI
     */
    static async autoTagContent(content: string): Promise<string[]> {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

        const prompt = `Generate relevant tags for this educational content:

"${content.substring(0, 500)}"

Return JSON array of 5-10 relevant tags:
["tag1", "tag2", ...]`;

        const result = await model.generateContent(prompt);
        const response = result.response.text();

        const jsonMatch = response.match(/\[[\s\S]*\]/);
        return jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    }

    /**
     * Search workspace content
     */
    static async searchContent(
        workspace: GeminiWorkspace,
        query: string
    ): Promise<GeminiContent[]> {
        const allContent = [
            ...workspace.conversations,
            ...workspace.images,
            ...workspace.documents,
            ...workspace.prompts,
            ...workspace.workflows,
        ];

        // Use AI for semantic search
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

        const prompt = `Find content matching this query: "${query}"

Content titles: ${allContent.map(c => c.title).join(', ')}

Return JSON array of matching content IDs (by relevance):
["id1", "id2", ...]`;

        const result = await model.generateContent(prompt);
        const response = result.response.text();

        const jsonMatch = response.match(/\[[\s\S]*\]/);
        const matchingIds = jsonMatch ? JSON.parse(jsonMatch[0]) : [];

        return allContent.filter(c => matchingIds.includes(c.id));
    }
}

/**
 * Gemini Media Manager
 */
export class GeminiMediaManager {
    /**
     * Upload media to EdIntel from Gemini
     */
    static async uploadMedia(
        file: File,
        metadata?: {
            title?: string;
            description?: string;
            tags?: string[];
        }
    ): Promise<{
        url: string;
        id: string;
        analysis: any;
    }> {
        // Upload to Vercel Blob
        const formData = new FormData();
        formData.append('file', file);
        if (metadata) {
            formData.append('metadata', JSON.stringify(metadata));
        }

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        // Analyze with AI
        const analysis = await this.analyzeMedia(data.url);

        return {
            url: data.url,
            id: data.id,
            analysis,
        };
    }

    /**
     * Analyze media with AI
     */
    private static async analyzeMedia(url: string): Promise<{
        type: string;
        content: string;
        educationalValue: string;
        suggestedUse: string[];
    }> {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

        const prompt = `Analyze this educational media:

URL: ${url}

Return JSON with:
{
  "type": "image" | "document" | "video" | "other",
  "content": "What this media shows",
  "educationalValue": "How valuable for education (1-10)",
  "suggestedUse": ["Where to use in EdIntel"]
}`;

        const result = await model.generateContent(prompt);
        const response = result.response.text();

        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        return {
            type: 'other',
            content: '',
            educationalValue: '5',
            suggestedUse: [],
        };
    }

    /**
     * Batch import from Gemini
     */
    static async batchImport(files: File[]): Promise<{
        imported: number;
        failed: number;
        items: Array<{ url: string; title: string }>;
    }> {
        const items: Array<{ url: string; title: string }> = [];
        let failed = 0;

        for (const file of files) {
            try {
                const result = await this.uploadMedia(file);
                items.push({
                    url: result.url,
                    title: file.name,
                });
            } catch (error) {
                console.error(`Failed to import ${file.name}:`, error);
                failed++;
            }
        }

        return {
            imported: items.length,
            failed,
            items,
        };
    }
}
