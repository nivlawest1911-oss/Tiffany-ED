import { createBrowserClient } from '@supabase/ssr';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';

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

export async function validateCompliance(portfolioText: string): Promise<{ compliant: boolean; issues: string[] }> {
    try {
        const { text } = await generateText({
            model: google('gemini-1.5-pro'),
            system: `You are the Sentinel Auditor for EdIntel. 
      Your job is to verify that the Student Portfolio narrative complies with Alabama State Code for Special Education.
      
      CRITERIA:
      1. **Strengths-Based**: Must start with student strengths.
      2. **Data-Driven**: Must cite specific data points (e.g., Logic Sprints, behavior metrics).
      3. **Non-Pathologizing**: Avoid labeling language (e.g., "bad", "lazy"). Use "emerging", "developing", "barrier to learning".
      4. **privacy**: Ensure no other student names are mentioned.
      
      Return a JSON object: { "compliant": boolean, "issues": string[] }`,
            prompt: `Review this text: "${portfolioText}"`,
        });

        const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(cleaned);
    } catch (error) {
        console.error("Compliance check failed:", error);
        // Fail safe: assume non-compliant if check fails to force manual review
        return { compliant: false, issues: ["Automated compliance check failed. Manual review required."] };
    }
}
