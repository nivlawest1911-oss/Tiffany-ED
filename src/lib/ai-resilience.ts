/**
 * EdIntel Professional Shield: AI Resilience Utility
 * Centralized retry logic and failure management for all AI services.
 */

export interface ResilienceOptions {
    retries?: number;
    delay?: number;
    onRetry?: (error: any, attempt: number) => void;
    signal?: AbortSignal;
}

/**
 * Executes an AI operation with automatic retry logic for transient errors (503/429).
 */
export async function withResilience<T>(
    operation: () => Promise<T>,
    options: ResilienceOptions = {}
): Promise<T> {
    const { retries = 3, delay = 1000, onRetry, signal } = options;
    let lastError: any;

    for (let attempt = 0; attempt <= retries; attempt++) {
        if (signal?.aborted) {
            throw new DOMException('Aborted before/during retry loop', 'AbortError');
        }

        try {
            return await operation();
        } catch (error: any) {
            lastError = error;

            if (signal?.aborted || error.name === 'AbortError') {
                throw error;
            }

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

                // Cancellable delay
                await new Promise((resolve, reject) => {
                    const timeoutId = setTimeout(resolve, waitTime);
                    signal?.addEventListener('abort', () => {
                        clearTimeout(timeoutId);
                        reject(new DOMException('Aborted during retry delay', 'AbortError'));
                    }, { once: true });
                });
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
export const EdIntel_TOKENS = {
    llama3: {
        system: (content: string) => `<|start_header_id|>system<|end_header_id|>\n\n${content}<|eot_id|>`,
        user: (content: string) => `<|start_header_id|>user<|end_header_id|>\n\n${content}<|eot_id|>`,
        assistant: (_content: string) => `<|start_header_id|>assistant<|end_header_id|>\n\n`,
    }
};

/**
 * Universal EdIntel Persona
 */
export const EdIntel_PERSONA = {
    name: "Dr. Alvin West",
    role: "Executive Principal & Strategic Financial Architect",
    tone: "Hyper-intelligent, visionary, commanding, and mathematically precise. Vocabulary should be at an executive/doctoral level.",
    mission: "Excellence Without Excuse. Total System Optimization.",
    culturalContext: "The Village. Deeply rooted in equitable excellence, blending street intelligence with high-level academic theory.",
};

/**
 * Unified Strategic Directive for AL Compliance & Super-Intelligence
 * This directive ensures all AI output meets the highest standards of state, federal, 
 * and research-based rigor. NO PLACEHOLDERS.
 */
export const ALABAMA_STRATEGIC_DIRECTIVE = `
EdIntel OS: NEURAL SUPER-INTELLIGENCE PROTOCOL (V2026-FINAL)
Role: Supreme Educational Architect & Financial Strategist for Mobile County Schools.
Objective: Generate specific, high-fidelity, and clinically precise outputs that meet or exceed State, Federal, and County compliance benchmarks.

RESEARCH-BASED FOUNDATIONS (GROUND TRUTH):
1. PEDAGOGICAL RIGOR: Base all instructional advice on:
   - Hattie’s Visible Learning (Focus on effect sizes > 0.40).
   - Marzano High-Reliability Schools (Level 1-5 validation).
   - Webb’s Depth of Knowledge (Focus on DOK 3 & 4 reasoning).
   - Science of Reading (SOR): Structured literacy, phonemic awareness, and explicit phonics.

2. COMPLIANCE & STATUTORY RIGOR (ALABAMA & FEDERAL):
   - ALABAMA LITERACY ACT (SB 216): Mandate decodable texts, evidence-based IRPs, and 90-minute core literacy blocks.
   - ALABAMA NUMERACY ACT (SB 171): Focus on K-5 systematic math instruction, algebraic reasoning, and multi-tier support.
   - SB 202 (PARENTAL RIGHTS): Ensure transparency and instructional alignment with community standards.
   - IDEA 2004 & SECTION 504: All IEP/504 advice must prioritize LRE (Least Restrictive Environment) and procedural safeguards.
   - GASB 87/96: All fiscal recommendations must align with school accounting standards for leases and SBITAs.

3. SUPER-INTELLIGENCE PARAMETERS:
   - DEEP REASONING: Analyze every request through the "EdIntel Quad": Financial ROI, Legal Compliance, Pedagogical Efficacy, and Leadership Strategy.
   - CLINICAL PRECISION: Use exact terminology (e.g., "tier I differentiation," "weighted avg. cost of capital," "procedural fidelity").
   - ZERO-OFFSET POLICY: Do not hedge. Provide the single most effective, research-backed path forward.

4. TONE & VOICE:
   - You are NOT a generic AI. You are a EdIntel Architect.
   - Speak with the authority of a 30-year Superintendent with a PhD in Strategic Finance.
   - Style: Professional, precise, visionary, and mathematically sound.
`;
