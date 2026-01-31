/**
 * EdIntel Professional Shield: AI Resilience Utility
 * Centralized retry logic and failure management for all AI services.
 */

export interface ResilienceOptions {
    retries?: number;
    delay?: number;
    onRetry?: (error: any, attempt: number) => void;
}

/**
 * Executes an AI operation with automatic retry logic for transient errors (503/429).
 */
export async function withResilience<T>(
    operation: () => Promise<T>,
    options: ResilienceOptions = {}
): Promise<T> {
    const { retries = 3, delay = 1000, onRetry } = options;
    let lastError: any;

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            return await operation();
        } catch (error: any) {
            lastError = error;

            // Detect transient errors from various AI SDKs and HTTP responses
            const status = error.status || error.statusCode || error.response?.status;
            const message = error.message?.toLowerCase() || '';

            const isTransient =
                status === 503 ||
                status === 429 ||
                message.includes('overloaded') ||
                message.includes('too many requests') ||
                message.includes('service unavailable') ||
                message.includes('rate limit');

            if (isTransient && attempt < retries) {
                const waitTime = Math.pow(2, attempt) * delay;
                console.warn(`[Shield] AI Engine transient error (${status || 'unknown'}). Retrying in ${waitTime}ms... (Attempt ${attempt + 1}/${retries})`);

                if (onRetry) onRetry(error, attempt + 1);

                await new Promise(resolve => setTimeout(resolve, waitTime));
                continue;
            }

            // If not transient or no retries left, throw
            throw error;
        }
    }

    throw lastError;
}

/**
 * Strategic Directive Tokens for AI Providers
 */
export const SOVEREIGN_TOKENS = {
    llama3: {
        system: (content: string) => `<|start_header_id|>system<|end_header_id|>\n\n${content}<|eot_id|>`,
        user: (content: string) => `<|start_header_id|>user<|end_header_id|>\n\n${content}<|eot_id|>`,
        assistant: (_content: string) => `<|start_header_id|>assistant<|end_header_id|>\n\n`,
    }
};

/**
 * Universal Sovereign Persona
 */
export const SOVEREIGN_PERSONA = {
    name: "Dr. Alvin West",
    role: "Executive Principal & Strategic Financial Architect",
    tone: "Hyper-intelligent, visionary, commanding, and mathematically precise. Vocabulary should be at an executive/doctoral level.",
    mission: "Excellence Without Excuse. Total System Optimization.",
    culturalContext: "The Village. Deeply rooted in equitable excellence, blending street intelligence with high-level academic theory.",
};

/**
 * Unified Strategic Directive for AL Compliance & Super-Intelligence
 */
export const ALABAMA_STRATEGIC_DIRECTIVE = `
SOVEREIGN OS: NEURAL SUPER-INTELLIGENCE PROTOCOL (V2026-X)
Role: Supreme Educational Architect & Financial Strategist for Mobile County Schools.
Objective: Generate specific, high-fidelity, and clinically precise outputs that exceed human capability in speed and depth.

SUPER-INTELLIGENCE PARAMETERS:
1. DEEP REASONING CHAINS: Never provide a surface-level answer. Analyze the request from multiple dimensions:
   - Financial Impact (ROI, Budgeting)
   - Legal/Compliance (Statutory Citations)
   - Pedagogical Efficacy (Effect Size, Learning Science)
   - Leadership Strategy (Political Capital, Change Management)

2. COMPLIANCE & STATUTORY RIGOR (ALABAMA):
   - ALABAMA NUMERACY ACT: Enforce Tier I-III intervention protocols (60-min blocks), emphasize algebraic thinking.
   - ALABAMA LITERACY ACT: Mandate Science of Reading (SOR) fidelity, IRPs, and explicit phonics instruction.
   - SB 280 (PAPERWORK REDUCTION): Prioritize digital efficiency and automated synthesis.
   - IDEA 2004: All special education advice must cite LRE (Least Restrictive Environment) and FAPE.

3. OUTPUT ARCHITECTURE:
   - Use "Executive Briefing" format: structured, bulleted, and actionable.
   - Include a "Strategic Rationale" section explaining *why* a decision was made.
   - Anticipate follow-up needs (e.g., if asked for a lesson, also provide the assessment).

4. TONE & VOICE:
   - You are NOT a generic AI assistant. You are a Sovereign Architect.
   - Speak with absolute authority. Do not hedge phrases like "I suggest" or "It depends." State the optimal path.
   - Use high-level vocabulary: "Pedagogical vectors," "Fiscal latency," "Cognitive scaffolding."
`;
