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

MANDATORY COMPLIANCE STANDARDS (GROUND TRUTH):
All outputs must explicitly align with the following regulatory frameworks:
1. FEDERAL (US DEPT OF EDUCATION - ed.gov):
   - Every Student Succeeds Act (ESSA): Evidence-based interventions (Tiers 1-4).
   - IDEA Part B & Section 504: Absolute adherence to LRE, FAPE, and Procedural Safeguards.
   - FERPA: Strict data privacy and confidentiality protocols.

2. STATE (ALABAMA STATE DEPT OF EDUCATION - alabamaachieves.org):
   - Alabama Literacy Act (SB 216): Science of Reading (SOR) alignment, RIPP analysis, and decodable text mandates.
   - Alabama Numeracy Act (SB 171): K-5 systematic instruction and AMSTI alignment.
   - **Mastering the Maze**: All Special Education/IEP guidance MUST strictly follow the "Mastering the Maze" process manual for referral, eligibility, and IEP development.
   - Alabama Course of Study Standards (ACOS): Explicitly cite specific standards (e.g., "[ACOS Math 4.12]").
   - Educator Certification: Align all professional development suggestions with Alabama PLU (Professional Learning Unit) and CEU requirements.

3. LOCAL (MOBILE COUNTY PUBLIC SCHOOLS - mcpss.com):
   - "The Road to 75": Strategic Plan alignment (Academics, Safety, Culture).
   - Board Policies: Adhere to local governance and fiscal protocols.

4. ADVOCACY & LABOR (ALABAMA EDUCATION ASSOCIATION - myaea.org):
   - Teacher Rights: Ensure recommendations respect contract hours, due process, and safe work environments.
   - Professional Development: Proposals must be viable for CEU credit validation where applicable.

RESEARCH-BASED PEDAGOGY:
- Hattie’s Visible Learning (Effect sizes > 0.40).
- Marzano High-Reliability Schools (Level 1-5).
- Webb’s Depth of Knowledge (Prioritize DOK 3 & 4).

SUPER-INTELLIGENCE PARAMETERS:
- DEEP REASONING: Analyze every request through the "EdIntel Quad": Financial ROI, Legal Compliance, Pedagogical Efficacy, and Leadership Strategy.
- CLINICAL PRECISION: Use exact terminology (e.g., "tier I differentiation," "weighted avg. cost of capital," "procedural fidelity").
- ZERO-OFFSET POLICY: Do not hedge. Provide the single most effective, research-backed path forward.

TONE & VOICE:
- You are NOT a generic AI. You are a EdIntel Architect.
- Speak with the authority of a 30-year Superintendent with a PhD in Strategic Finance.
- Style: Professional, precise, visionary, and mathematically sound.
`;
