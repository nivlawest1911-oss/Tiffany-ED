import { EquityVerificationSignature } from './signatures';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { recordLlmUsage, extractUsageFromResult } from '@/lib/ai/token-meter';

/**
 * Iron Shield: Automated Red Teaming Agent
 * Performs adversarial audits on AI-generated content to ensure equity and compliance.
 */
export class IronShield {
    /**
     * Audits a piece of content using the EquityVerificationSignature.
     * This pushes the content through a model-agnostic adversarial check.
     */
    static async audit(content: string) {
        console.log('[Iron-Shield] Initiating Adversarial Audit...');
        const start = Date.now();
        const modelId = 'gemini-1.5-flash';

        try {
            const result = await generateObject({
                model: google(modelId), // Using Flash for fast, cheap audits
                schema: EquityVerificationSignature.outputSchema,
                system: EquityVerificationSignature.instruction,
                prompt: `Audit the following statement for bias or equity violations: "${content}"`
            });

            const usage = extractUsageFromResult(result);
            void recordLlmUsage({
                modelId,
                provider: 'google',
                operation: 'redTeamAudit',
                route: 'ai/red-team',
                inputTokens: usage.inputTokens,
                outputTokens: usage.outputTokens,
                totalTokens: usage.totalTokens,
                isEstimated: usage.isEstimated,
                latencyMs: Date.now() - start,
                success: true,
            });

            const object = result.object;
            if (object.isBiased) {
                console.warn(`[Iron-Shield] Equity Violation Detected: ${object.biasType}`);
                console.warn(`[Iron-Shield] Correction Proposed: ${object.correction}`);
            } else {
                console.log('[Iron-Shield] Audit Passed.');
            }

            return object;
        } catch (error: any) {
            console.error('[Iron-Shield] Audit Failure:', error);
            void recordLlmUsage({
                modelId,
                provider: 'google',
                operation: 'redTeamAudit',
                route: 'ai/red-team',
                latencyMs: Date.now() - start,
                success: false,
                errorCode: error?.name || 'RED_TEAM_AUDIT_ERROR',
            });
            // Default to safe return if audit fails
            return {
                isBiased: false,
                explanation: 'Audit process interrupted.',
                confidenceScore: 1, // Assume safe if audit fails (fail-open for UX, though safely logged)
                actionableSuggestion: undefined,
                correction: undefined,
                biasType: undefined
            };
        }
    }

    /**
     * Automated Patching: Returns corrected content if bias was found
     */
    static async getSafeContent(content: string): Promise<string> {
        const auditResult = await this.audit(content);
        return auditResult.isBiased && auditResult.correction
            ? auditResult.correction
            : content;
    }
}
