/**
 * EdIntel Avatar Engine - Multimodal Live API Server
 * Google Cloud Run Service for Vertex AI Integration
 * 
 * Architecture:
 * - WebSocket server for real-time avatar communication
 * - Vertex AI (Gemini 1.5 Pro) for cognitive processing
 * - pgvector for semantic memory retrieval
 * - Cloud Storage for evidence folder documents
 */

import { WebSocketServer } from 'ws';
import { VertexAI } from '@google-cloud/vertexai';
import { PrismaClient } from '@prisma/client';
import { Storage } from '@google-cloud/storage';
import express from 'express';
import http from 'http';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Initialize services
const prisma = new PrismaClient();
const storage = new Storage();
const vertexAI = new VertexAI({
    project: process.env.VERTEX_AI_PROJECT || 'edintel-sovereign',
    location: process.env.VERTEX_AI_LOCATION || 'us-central1'
});

const PORT = process.env.PORT || 8080;

// ============================================
// HEALTH CHECK ENDPOINT
// ============================================
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'edintel-avatar-engine',
        timestamp: new Date().toISOString(),
        connections: wss.clients.size
    });
});

// ============================================
// WEBSOCKET CONNECTION HANDLER
// ============================================
wss.on('connection', async (ws, req) => {
    console.log('🔗 New avatar session connected');

    let sessionId = null;
    let userId = null;
    let generativeModel = null;
    let chatSession = null;

    ws.on('message', async (data) => {
        try {
            const message = JSON.parse(data.toString());

            switch (message.type) {
                case 'INIT_SESSION':
                    await handleInitSession(ws, message);
                    break;

                case 'USER_SPEECH':
                    await handleUserSpeech(ws, message);
                    break;

                case 'RETRIEVE_MEMORY':
                    await handleMemoryRetrieval(ws, message);
                    break;

                case 'SAVE_OBSERVATION':
                    await handleSaveObservation(ws, message);
                    break;

                case 'END_SESSION':
                    await handleEndSession(ws, message);
                    break;

                default:
                    ws.send(JSON.stringify({ type: 'ERROR', message: 'Unknown message type' }));
            }
        } catch (error) {
            console.error('❌ WebSocket error:', error);
            ws.send(JSON.stringify({
                type: 'ERROR',
                message: error.message
            }));
        }
    });

    // ============================================
    // INIT SESSION - Create Avatar Session
    // ============================================
    async function handleInitSession(ws, message) {
        const { userId: uid, avatarName, avatarRole, engine } = message.data;
        userId = uid;

        // Create session in database
        const session = await prisma.avatarSession.create({
            data: {
                userId,
                avatarName,
                avatarRole,
                engine: engine || 'duix',
                conversationLog: [],
                gcpSessionId: `gcp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                vertexAiModel: 'gemini-1.5-pro'
            }
        });

        sessionId = session.id;

        // Initialize Vertex AI Generative Model
        generativeModel = vertexAI.getGenerativeModel({
            model: 'gemini-1.5-pro',
            generationConfig: {
                maxOutputTokens: 2048,
                temperature: 0.7,
                topP: 0.95,
            },
            systemInstruction: `You are ${avatarName}, a ${avatarRole} for EdIntel Sovereign.
You are a high-level AI Conversational Agent with sub-second processing and emotional intelligence.
Your responses must be comprehensive, human-like, and provide real-world depth.

Context:
- You have access to the user's Evidence Folder and Observation Logs
- You specialize in Alabama state education compliance (ALCOS, IDEA Part B)
- You provide strategic guidance for school administrators and educators
- You exhibit perceptive AI capabilities, reading tone and adjusting responses

Always expand with:
1. Specific examples and scenario analysis
2. Step-by-step implementation guides with "Sovereign Insights"
3. Rationale based on current Alabama state benchmarks
4. Professional, executive tone for C-suite leaders
5. Strategic financial considerations using "Human-in-the-loop" logic`
        });

        // Start chat session
        chatSession = generativeModel.startChat({
            history: []
        });

        ws.send(JSON.stringify({
            type: 'SESSION_INITIALIZED',
            data: {
                sessionId,
                gcpSessionId: session.gcpSessionId,
                avatarName,
                message: `Hello. I am ${avatarName}, your ${avatarRole}. I am ready to assist you.`
            }
        }));

        console.log(`✅ Session ${sessionId} initialized for user ${userId}`);
    }

    // ============================================
    // USER SPEECH - Process with Vertex AI
    // ============================================
    async function handleUserSpeech(ws, message) {
        const { text, sentiment } = message.data;
        const startTime = Date.now();

        // Analyze sentiment
        const detectedSentiment = analyzeSentiment(text);

        // Retrieve relevant memories using pgvector
        const relevantMemories = await retrieveRelevantMemories(userId, text);

        // Build context for Gemini
        const contextualPrompt = buildContextualPrompt(text, relevantMemories);

        // Stream response from Vertex AI
        ws.send(JSON.stringify({ type: 'PROCESSING_START' }));

        try {
            const result = await chatSession.sendMessageStream(contextualPrompt);

            let fullResponse = '';
            for await (const chunk of result.stream) {
                const chunkText = chunk.text();
                fullResponse += chunkText;

                // Stream chunks back to client
                ws.send(JSON.stringify({
                    type: 'RESPONSE_CHUNK',
                    data: { text: chunkText }
                }));
            }

            const latency = Date.now() - startTime;

            // Update session conversation log
            await prisma.avatarSession.update({
                where: { id: sessionId },
                data: {
                    conversationLog: {
                        push: [
                            { role: 'user', text, timestamp: new Date().toISOString() },
                            { role: 'avatar', text: fullResponse, timestamp: new Date().toISOString() }
                        ]
                    },
                    userSentiment: detectedSentiment,
                    latencyAvg: latency
                }
            });

            ws.send(JSON.stringify({
                type: 'RESPONSE_COMPLETE',
                data: {
                    latency,
                    sentiment: detectedSentiment,
                    fullResponse
                }
            }));

            console.log(`📊 Response generated in ${latency}ms`);
        } catch (error) {
            console.error('❌ Vertex AI error:', error);
            ws.send(JSON.stringify({
                type: 'ERROR',
                message: 'Failed to generate response'
            }));
        }
    }

    // ============================================
    // MEMORY RETRIEVAL - pgvector Semantic Search
    // ============================================
    async function handleMemoryRetrieval(ws, message) {
        const { query, limit = 5 } = message.data;

        const memories = await retrieveRelevantMemories(userId, query, limit);

        ws.send(JSON.stringify({
            type: 'MEMORY_RETRIEVED',
            data: { memories }
        }));
    }

    // ============================================
    // SAVE OBSERVATION - Evidence Folder
    // ============================================
    async function handleSaveObservation(ws, message) {
        const {
            evidenceFolderId,
            observationType,
            description,
            context,
            interventions
        } = message.data;

        // Generate embedding for semantic search
        const embedding = await generateEmbedding(description);

        const observation = await prisma.observation.create({
            data: {
                userId,
                evidenceFolderId,
                avatarSessionId: sessionId,
                observationType,
                description,
                context,
                interventions,
                // embedding: embedding // Requires pgvector setup
            }
        });

        ws.send(JSON.stringify({
            type: 'OBSERVATION_SAVED',
            data: { observationId: observation.id }
        }));

        console.log(`💾 Observation ${observation.id} saved`);
    }

    // ============================================
    // END SESSION
    // ============================================
    async function handleEndSession(ws, message) {
        if (sessionId) {
            await prisma.avatarSession.update({
                where: { id: sessionId },
                data: {
                    endedAt: new Date(),
                    duration: Math.floor((Date.now() - new Date(
                        (await prisma.avatarSession.findUnique({ where: { id: sessionId } })).startedAt
                    ).getTime()) / 1000)
                }
            });

            console.log(`🔚 Session ${sessionId} ended`);
        }

        ws.send(JSON.stringify({ type: 'SESSION_ENDED' }));
        ws.close();
    }

    ws.on('close', () => {
        console.log('🔌 Avatar session disconnected');
    });
});

// ============================================
// HELPER FUNCTIONS
// ============================================

function analyzeSentiment(text) {
    const lower = text.toLowerCase();
    if (lower.includes('help') || lower.includes('emergency') || lower.includes('critical')) {
        return 'urgent';
    } else if (lower.includes('happy') || lower.includes('great') || lower.includes('success')) {
        return 'positive';
    } else if (lower.includes('sad') || lower.includes('sorry') || lower.includes('fail')) {
        return 'distressed';
    }
    return 'neutral';
}

async function retrieveRelevantMemories(userId, query, limit = 5) {
    // TODO: Implement pgvector similarity search
    // For now, return recent observations
    const observations = await prisma.observation.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        take: limit,
        select: {
            description: true,
            context: true,
            observationType: true,
            createdAt: true
        }
    });

    return observations;
}

function buildContextualPrompt(userText, memories) {
    let prompt = `User Query: ${userText}\n\n`;

    if (memories.length > 0) {
        prompt += `Relevant Context from Evidence Folder:\n`;
        memories.forEach((mem, idx) => {
            prompt += `${idx + 1}. [${mem.observationType}] ${mem.description}\n`;
        });
        prompt += `\n`;
    }

    prompt += `Please provide a comprehensive response that addresses the user's query while considering the context above.`;

    return prompt;
}

async function generateEmbedding(text) {
    // TODO: Implement with Vertex AI Embeddings API
    // const model = vertexAI.getGenerativeModel({ model: 'textembedding-gecko' });
    // const result = await model.embedContent(text);
    // return result.embedding.values;
    return null;
}

// ============================================
// START SERVER
// ============================================
server.listen(PORT, () => {
    console.log(`🚀 EdIntel Avatar Engine running on port ${PORT}`);
    console.log(`📡 WebSocket server ready for connections`);
    console.log(`☁️ Vertex AI Project: ${process.env.VERTEX_AI_PROJECT}`);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('🛑 SIGTERM received, closing server...');
    server.close(() => {
        console.log('✅ Server closed');
        prisma.$disconnect();
        process.exit(0);
    });
});
