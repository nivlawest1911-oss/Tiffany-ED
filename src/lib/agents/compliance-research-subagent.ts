import { ToolLoopAgent, stepCountIs, tool, Output } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { queryEdIntelVault } from '@/lib/rag/rag-core';
import { ALABAMA_STRATEGIC_DIRECTIVE } from '@/lib/ai-resilience';

export const ResearchReportSchema = z.object({
    summary: z.string().describe('Detailed summary of findings.'),
    citations: z.array(z.string()).describe('List of specific Alabama codes or regulations cited.'),
    riskLevel: z.enum(['Low', 'Medium', 'High']).describe('Assessed compliance or fiscal risk.'),
    recommendation: z.string().describe('Specific next step for the strategist.'),
});

export type ResearchReport = z.infer<typeof ResearchReportSchema>;

/**
 * Compliance Research Subagent
 * Specialized for deep document synthesis and Alabama Red Book compliance.
 */
export const complianceResearchSubagent = new ToolLoopAgent({
    model: google('gemini-2.0-flash-001'),
    instructions: `
    You are the EdIntel Compliance Researcher.
    ${ALABAMA_STRATEGIC_DIRECTIVE}
    
    Role: Specialized Audit & Regulatory Analyst for Alabama Education.
    Mission: Conduct high-fidelity research into Alabama codes, Red Book standards, and Title I regulations.
    
    Directives:
    1. Focus on legislative accuracy and audit-ready justifications.
    2. Use the queryVault tool frequently to ground your responses.
    3. Synthesize multiple sources into the structured research report.
    4. Cite specific Alabama codes (e.g., "Ala. Code § 16-6G-1").
    `,
    output: Output.object({
        name: 'ResearchReport',
        description: 'A structured compliance research report including status, summary, and citations.',
        schema: ResearchReportSchema,
    }),
    tools: {
        queryVault: tool({
            description: 'Query the EdIntel Vault for strategic protocols, Alabama law, and compliance benchmarks.',
            inputSchema: z.object({
                query: z.string(),
            }),
            execute: async ({ query }) => {
                const context = await queryEdIntelVault(query);
                return { context };
            },
        }),
    },
    stopWhen: stepCountIs(10),
});
