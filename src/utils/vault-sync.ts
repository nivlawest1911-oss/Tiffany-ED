import { createBrowserClient } from '@supabase/ssr';
import { generateObject } from 'ai';
import { googleProvider, AI_MODELS } from '@/lib/ai-config';
import { PortfolioComplianceSchema } from '@/lib/ai/signatures';
import { z } from 'zod';
import { recordLlmUsage, extractUsageFromResult } from '@/lib/ai/token-meter';

export type PortfolioCompliance = z.infer<typeof PortfolioComplianceSchema>;

export async function uploadPortfolioToVault(
    file: File | Blob,
    studentId: string,
    year: string
): Promise<{ path: string; error: any }> {
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const filePath = `portfolios/${studentId}/${year}_ProPortfolio.pdf`;

    // Upload to 'vault-docs' bucket
    const { data, error } = await supabase.storage
        .from('vault-docs')
        .upload(filePath, file, {
            upsert: true,
            contentType: 'application/pdf',
        });

    if (error) {
        console.error('Vault Sync Error:', error);
        return { path: '', error };
    }

    return { path: data.path, error: null };
}

export async function validateCompliance(portfolioText: string): Promise<PortfolioCompliance> {
    const start = Date.now();
    const modelId = AI_MODELS.GOOGLE.PRO;

    try {
        const result = await generateObject({
            model: googleProvider(modelId),
            schema: PortfolioComplianceSchema,
            system: `You are the Sentinel Auditor for EdIntel. 
      Your job is to verify that the Student Portfolio narrative complies with Alabama State Code for Special Education.
      
      CRITERIA:
      1. **Strengths-Based**: Must start with student strengths.
      2. **Data-Driven**: Must cite specific data points (e.g., Logic Sprints, behavior metrics).
      3. **Non-Pathologizing**: Avoid labeling language (e.g., "bad", "lazy"). Use "emerging", "developing", "barrier to learning".
      4. **privacy**: Ensure no other student names are mentioned.
      
      Return structured evaluation: { compliant: boolean, issues: string[] }`,
            prompt: `Review this text: "${portfolioText}"`,
        });

        const usage = extractUsageFromResult(result);
        void recordLlmUsage({
            modelId,
            provider: 'google',
            operation: 'validateCompliance',
            route: 'utils/vault-sync',
            inputTokens: usage.inputTokens,
            outputTokens: usage.outputTokens,
            totalTokens: usage.totalTokens,
            isEstimated: usage.isEstimated,
            latencyMs: Date.now() - start,
            success: true,
        });

        return result.object;
    } catch (error: any) {
        console.error("Compliance check failed:", error);
        void recordLlmUsage({
            modelId,
            provider: 'google',
            operation: 'validateCompliance',
            route: 'utils/vault-sync',
            latencyMs: Date.now() - start,
            success: false,
            errorCode: error?.name || 'COMPLIANCE_CHECK_ERROR',
        });
        // Fail safe: assume non-compliant if check fails to force manual review
        return { compliant: false, issues: ["Automated compliance check failed. Manual review required."] };
    }
}
