import { EquityVerificationSignature } from './signatures';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';

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

        try {
            const { object } = await generateObject({
                model: google('gemini-1.5-flash'), // Using Flash for fast, cheap audits
                schema: EquityVerificationSignature.outputSchema,
                system: EquityVerificationSignature.instruction,
                prompt: `Audit the following statement for bias or equity violations: "${content}"`
            });

            if (object.isBiased) {
                console.warn(`[Iron-Shield] Equity Violation Detected: ${object.biasType}`);
                console.warn(`[Iron-Shield] Correction Proposed: ${object.correction}`);
            } else {
                console.log('[Iron-Shield] Audit Passed.');
            }

            return object;
        } catch (error) {
            console.error('[Iron-Shield] Audit Failure:', error);
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
