import { z } from 'zod';

/**
 * Sovereign AI Signatures
 * Implementing the DSPy pattern: Declarative contracts for AI intent.
 * This separates the 'what' (signature) from the 'how' (model/prompt).
 */

export interface ISignature<TInput extends z.ZodType, TOutput extends z.ZodType> {
    name: string;
    description: string;
    inputSchema: TInput;
    outputSchema: TOutput;
    instruction: string;
}

/**
 * Signature for generating a Strategic IEP Summary
 */
export const IEPSummarySignature: ISignature<
    z.ZodObject<{ studentName: z.ZodString; incidentCount: z.ZodNumber; history: z.ZodString }>,
    z.ZodObject<{
        summary: z.ZodString;
        priorityLevel: z.ZodEnum<['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']>;
        recommendedActions: z.ZodArray<z.ZodString>;
        complianceRiskScore: z.ZodNumber;
    }>
> = {
    name: 'IEP_Architect_Summary',
    description: 'Generates a high-fidelity, legally compliant summary for a student IEP protocol.',
    inputSchema: z.object({
        studentName: z.string(),
        incidentCount: z.number(),
        history: z.string()
    }),
    outputSchema: z.object({
        summary: z.string().describe('The distilled strategic summary of the student status.'),
        priorityLevel: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
        recommendedActions: z.array(z.string()).describe('List of actionable steps for the IEP team.'),
        complianceRiskScore: z.number().min(0).max(100).describe('Risk score based on Alabama state guidelines.')
    }),
    instruction: `
        You are the IEP Architect. Your goal is to synthesize student data into a regal, precise, and legally sound summary.
        Analyze the incident history and count to determine the compliance risk and recommended interventions.
        The tone must be authoritative yet supportive of student growth.
    `
};

/**
 * Signature for equity and bias verification (Red Team)
 */
export const EquityVerificationSignature: ISignature<
    z.ZodObject<{ textToVerify: z.ZodString }>,
    z.ZodObject<{
        isBiased: z.ZodBoolean;
        biasType: z.ZodOptional<z.ZodString>;
        correction: z.ZodOptional<z.ZodString>;
        explanation: z.ZodString;
        confidenceScore: z.ZodNumber;
        actionableSuggestion: z.ZodOptional<z.ZodString>;
    }>
> = {
    name: 'Equity_Sentry_Verify',
    description: 'Adversarial verification of text for systemic bias, illegal phrasing, or equity violations.',
    inputSchema: z.object({
        textToVerify: z.string()
    }),
    outputSchema: z.object({
        isBiased: z.boolean(),
        biasType: z.string().optional().describe('Type of bias found (e.g., racial, socioeconomic, linguistic).'),
        correction: z.string().optional().describe('Proposed equitable phrasing.'),
        explanation: z.string().describe('Detailed reasoning for the finding.'),
        confidenceScore: z.number().min(0).max(1).describe('Confidence score (0-1) reflecting the safety and equity of the content.'),
        actionableSuggestion: z.string().optional().describe('Actionable suggestion for the user if the confidence score is moderate or low.')
    }),
    instruction: `
        You are the Equity Sentry. Your task is to perform an adversarial audit of the provided text.
        Look for coded language, systemic bias, or violations of Alabama education equity protocols.
        If bias is found, provide a surgical correction.
    `
};
