/**
 * Hugging Face Integration Client
 * Provides access to state-of-the-art AI models
 */

import { HfInference } from '@huggingface/inference';

// Initialize Hugging Face client
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

/**
 * Model Registry - Best models for each task
 */
export const MODELS = {
    // Text Generation
    TEXT_GENERATION: 'meta-llama/Llama-2-70b-chat-hf',
    INSTRUCTION_FOLLOWING: 'mistralai/Mixtral-8x7B-Instruct-v0.1',

    // Text Analysis
    SENTIMENT: 'distilbert-base-uncased-finetuned-sst-2-english',
    EMOTION: 'j-hartmann/emotion-english-distilroberta-base',
    TOXICITY: 'unitary/toxic-bert',

    // Summarization
    SUMMARIZATION: 'facebook/bart-large-cnn',
    ABSTRACTIVE_SUMMARY: 'google/pegasus-xsum',

    // Question Answering
    QA: 'deepset/roberta-base-squad2',

    // Translation
    TRANSLATION: 'facebook/mbart-large-50-many-to-many-mmt',

    // Image Generation
    IMAGE_GEN: 'stabilityai/stable-diffusion-xl-base-1.0',
    IMAGE_GEN_FAST: 'runwayml/stable-diffusion-v1-5',

    // Image Analysis
    IMAGE_CLASSIFICATION: 'google/vit-base-patch16-224',
    OBJECT_DETECTION: 'facebook/detr-resnet-50',
    IMAGE_CAPTIONING: 'Salesforce/blip-image-captioning-large',

    // Speech
    SPEECH_TO_TEXT: 'openai/whisper-large-v3',
    TEXT_TO_SPEECH: 'facebook/fastspeech2-en-ljspeech',

    // Embeddings
    EMBEDDINGS: 'sentence-transformers/all-MiniLM-L6-v2',
    SEMANTIC_SEARCH: 'sentence-transformers/all-mpnet-base-v2',

    // Code
    CODE_GENERATION: 'bigcode/starcoder',

    // Educational Specific
    READING_COMPREHENSION: 'deepset/roberta-base-squad2',
    GRAMMAR_CHECK: 'textattack/roberta-base-CoLA',
} as const;

export { hf };
