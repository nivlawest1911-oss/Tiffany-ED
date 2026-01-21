/**
 * Hugging Face AI Services
 * High-level API for AI capabilities
 */

import { hf, MODELS } from './client';

/**
 * Text Analysis Services
 */
export class TextAnalysisService {
    /**
     * Analyze sentiment of text (positive, negative, neutral)
     */
    static async analyzeSentiment(text: string) {
        try {
            const result = await hf.textClassification({
                model: MODELS.SENTIMENT,
                inputs: text,
            });

            return {
                sentiment: result[0].label.toLowerCase(),
                confidence: result[0].score,
                raw: result,
            };
        } catch (error) {
            console.error('Sentiment analysis error:', error);
            throw error;
        }
    }

    /**
     * Detect emotions in text
     */
    static async detectEmotions(text: string) {
        try {
            const result = await hf.textClassification({
                model: MODELS.EMOTION,
                inputs: text,
            });

            return result.map(emotion => ({
                emotion: emotion.label,
                confidence: emotion.score,
            }));
        } catch (error) {
            console.error('Emotion detection error:', error);
            throw error;
        }
    }

    /**
     * Check for toxic/inappropriate content
     */
    static async checkToxicity(text: string) {
        try {
            const result = await hf.textClassification({
                model: MODELS.TOXICITY,
                inputs: text,
            });

            return {
                isToxic: result[0].label === 'toxic',
                confidence: result[0].score,
                details: result,
            };
        } catch (error) {
            console.error('Toxicity check error:', error);
            throw error;
        }
    }

    /**
     * Summarize long text
     */
    static async summarize(text: string, maxLength = 150) {
        try {
            const result = await hf.summarization({
                model: MODELS.SUMMARIZATION,
                inputs: text,
                parameters: {
                    max_length: maxLength,
                    min_length: 30,
                },
            });

            return result.summary_text;
        } catch (error) {
            console.error('Summarization error:', error);
            throw error;
        }
    }

    /**
     * Answer questions based on context
     */
    static async answerQuestion(question: string, context: string) {
        try {
            const result = await hf.questionAnswering({
                model: MODELS.QA,
                inputs: {
                    question,
                    context,
                },
            });

            return {
                answer: result.answer,
                confidence: result.score,
                start: result.start,
                end: result.end,
            };
        } catch (error) {
            console.error('Question answering error:', error);
            throw error;
        }
    }
}

/**
 * Image Generation Services
 */
export class ImageGenerationService {
    /**
     * Generate educational images from text prompts
     */
    static async generateImage(prompt: string, options?: {
        negativePrompt?: string;
        width?: number;
        height?: number;
        numInferenceSteps?: number;
    }) {
        try {
            const result = await hf.textToImage({
                model: MODELS.IMAGE_GEN,
                inputs: prompt,
                parameters: {
                    negative_prompt: options?.negativePrompt,
                    width: options?.width || 512,
                    height: options?.height || 512,
                    num_inference_steps: options?.numInferenceSteps || 50,
                },
            });

            return result;
        } catch (error) {
            console.error('Image generation error:', error);
            throw error;
        }
    }

    /**
     * Generate classroom visuals quickly
     */
    static async generateClassroomVisual(description: string) {
        const educationalPrompt = `Professional educational illustration: ${description}, clean, modern, suitable for classroom use, high quality`;
        const negativePrompt = 'blurry, distorted, inappropriate, violent, scary';

        return this.generateImage(educationalPrompt, {
            negativePrompt,
            width: 768,
            height: 512,
        });
    }
}

/**
 * Image Analysis Services
 */
export class ImageAnalysisService {
    /**
     * Classify images
     */
    static async classifyImage(imageBlob: Blob) {
        try {
            const result = await hf.imageClassification({
                model: MODELS.IMAGE_CLASSIFICATION,
                data: imageBlob,
            });

            return result.map(item => ({
                label: item.label,
                confidence: item.score,
            }));
        } catch (error) {
            console.error('Image classification error:', error);
            throw error;
        }
    }

    /**
     * Detect objects in classroom photos
     */
    static async detectObjects(imageBlob: Blob) {
        try {
            const result = await hf.objectDetection({
                model: MODELS.OBJECT_DETECTION,
                data: imageBlob,
            });

            return result.map(detection => ({
                label: detection.label,
                confidence: detection.score,
                box: detection.box,
            }));
        } catch (error) {
            console.error('Object detection error:', error);
            throw error;
        }
    }

    /**
     * Generate captions for classroom images
     */
    static async captionImage(imageBlob: Blob) {
        try {
            const result = await hf.imageToText({
                model: MODELS.IMAGE_CAPTIONING,
                data: imageBlob,
            });

            return result.generated_text;
        } catch (error) {
            console.error('Image captioning error:', error);
            throw error;
        }
    }

    /**
     * Analyze classroom engagement from photo
     */
    static async analyzeClassroomEngagement(imageBlob: Blob) {
        try {
            // Detect objects (students, teacher, materials)
            const objects = await this.detectObjects(imageBlob);

            // Generate caption for context
            const caption = await this.captionImage(imageBlob);

            // Count students and analyze setup
            const studentCount = objects.filter(obj =>
                obj.label.toLowerCase().includes('person')
            ).length;

            return {
                caption,
                studentCount,
                objects: objects.slice(0, 10), // Top 10 objects
                engagementScore: this.calculateEngagementScore(objects, caption),
            };
        } catch (error) {
            console.error('Classroom analysis error:', error);
            throw error;
        }
    }

    private static calculateEngagementScore(objects: any[], caption: string): number {
        // Simple heuristic - can be enhanced with ML
        let score = 50; // Base score

        // More students = higher potential engagement
        const people = objects.filter(o => o.label.toLowerCase().includes('person'));
        score += Math.min(people.length * 5, 30);

        // Positive indicators in caption
        const positiveWords = ['engaged', 'active', 'participating', 'focused', 'attentive'];
        const hasPositive = positiveWords.some(word => caption.toLowerCase().includes(word));
        if (hasPositive) score += 20;

        return Math.min(Math.max(score, 0), 100);
    }
}

/**
 * Speech Services
 */
export class SpeechService {
    /**
     * Transcribe audio to text (classroom recordings)
     */
    static async transcribeAudio(audioBlob: Blob) {
        try {
            const result = await hf.automaticSpeechRecognition({
                model: MODELS.SPEECH_TO_TEXT,
                data: audioBlob,
            });

            return result.text;
        } catch (error) {
            console.error('Speech transcription error:', error);
            throw error;
        }
    }

    /**
     * Generate speech from text
     */
    static async textToSpeech(text: string) {
        try {
            const result = await hf.textToSpeech({
                model: MODELS.TEXT_TO_SPEECH,
                inputs: text,
            });

            return result;
        } catch (error) {
            console.error('Text-to-speech error:', error);
            throw error;
        }
    }
}

/**
 * Semantic Search Services
 */
export class SemanticSearchService {
    /**
     * Generate embeddings for text
     */
    static async generateEmbedding(text: string) {
        try {
            const result = await hf.featureExtraction({
                model: MODELS.EMBEDDINGS,
                inputs: text,
            });

            return result;
        } catch (error) {
            console.error('Embedding generation error:', error);
            throw error;
        }
    }

    /**
     * Calculate similarity between two texts
     */
    static async calculateSimilarity(text1: string, text2: string) {
        try {
            const [embedding1, embedding2] = await Promise.all([
                this.generateEmbedding(text1),
                this.generateEmbedding(text2),
            ]);

            // Cosine similarity
            const similarity = this.cosineSimilarity(
                embedding1 as number[],
                embedding2 as number[]
            );

            return similarity;
        } catch (error) {
            console.error('Similarity calculation error:', error);
            throw error;
        }
    }

    private static cosineSimilarity(a: number[], b: number[]): number {
        const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
        const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
        const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
        return dotProduct / (magnitudeA * magnitudeB);
    }

    /**
     * Find most similar documents
     */
    static async findSimilarDocuments(
        query: string,
        documents: string[],
        topK = 5
    ) {
        try {
            const queryEmbedding = await this.generateEmbedding(query);

            const similarities = await Promise.all(
                documents.map(async (doc, index) => {
                    const docEmbedding = await this.generateEmbedding(doc);
                    const similarity = this.cosineSimilarity(
                        queryEmbedding as number[],
                        docEmbedding as number[]
                    );
                    return { index, document: doc, similarity };
                })
            );

            return similarities
                .sort((a, b) => b.similarity - a.similarity)
                .slice(0, topK);
        } catch (error) {
            console.error('Document search error:', error);
            throw error;
        }
    }
}

/**
 * Educational AI Services
 */
export class EducationalAIService {
    /**
     * Analyze student writing for comprehension
     */
    static async analyzeStudentWriting(text: string) {
        try {
            const [sentiment, emotions, summary] = await Promise.all([
                TextAnalysisService.analyzeSentiment(text),
                TextAnalysisService.detectEmotions(text),
                TextAnalysisService.summarize(text, 100),
            ]);

            return {
                sentiment,
                emotions,
                summary,
                wordCount: text.split(/\s+/).length,
                readingLevel: this.estimateReadingLevel(text),
            };
        } catch (error) {
            console.error('Writing analysis error:', error);
            throw error;
        }
    }

    /**
     * Generate educational content
     */
    static async generateLessonMaterial(topic: string, gradeLevel: string) {
        const prompt = `Create a ${gradeLevel} lesson plan about ${topic}. Include objectives, activities, and assessment.`;

        try {
            const result = await hf.textGeneration({
                model: MODELS.INSTRUCTION_FOLLOWING,
                inputs: prompt,
                parameters: {
                    max_new_tokens: 500,
                    temperature: 0.7,
                    top_p: 0.9,
                },
            });

            return result.generated_text;
        } catch (error) {
            console.error('Content generation error:', error);
            throw error;
        }
    }

    private static estimateReadingLevel(text: string): string {
        // Flesch-Kincaid Grade Level approximation
        const sentences = text.split(/[.!?]+/).length;
        const words = text.split(/\s+/).length;
        const syllables = this.countSyllables(text);

        const grade = 0.39 * (words / sentences) + 11.8 * (syllables / words) - 15.59;

        if (grade < 6) return 'Elementary';
        if (grade < 9) return 'Middle School';
        if (grade < 13) return 'High School';
        return 'College';
    }

    private static countSyllables(text: string): number {
        // Simple syllable counter
        return text.toLowerCase()
            .replace(/[^a-z]/g, '')
            .replace(/[^aeiouy]+/g, ' ')
            .trim()
            .split(/\s+/).length;
    }
}
