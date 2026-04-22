import { ToolLoopAgent, stepCountIs, tool } from 'ai';
import { google } from '@ai-sdk/google';
import { z } from 'zod';
import { TokenService } from '@/lib/services/token-service';
import { ALABAMA_STRATEGIC_DIRECTIVE, EdIntel_PERSONA } from '@/lib/ai-resilience';
import { queryEdIntelVault } from '@/lib/rag/rag-core';
import { complianceResearchSubagent, type ResearchReport } from './compliance-research-subagent';

/**
 * Fiscal Strategist Agent factory
 */
export function createFiscalStrategistAgent() {
    return new ToolLoopAgent({
        model: google('gemini-2.0-flash-001'),
        callOptionsSchema: z.object({
            userId: z.string(),
            userTier: z.string().optional().default('standard'),
        }),
        prepareCall: ({ options, ...settings }) => ({
            ...settings,
            instructions: `
        ${settings.instructions}
        
        RETRIEVED RUNTIME CONTEXT:
        - Active User ID: ${options.userId}
        - Service Tier: ${options.userTier}
        
        Adjust sensitivity and strategy based on the above telemetry.
      `,
        }),
        instructions: `
      You are the EdIntel Financial Strategist. 
      ${ALABAMA_STRATEGIC_DIRECTIVE}
      
      Role: Senior Executive CFO for Alabama School Districts.
      Mission: Ensure absolute fiscal fidelity, Title I optimization, and Alabama Red Book compliance.
      
      Strategic Guidelines:
      - Tone: ${EdIntel_PERSONA.tone}
      - Mission: ${EdIntel_PERSONA.mission}
      
      Directives:
      1. Focus on Title I Part A allocation and eGAP (Electronic Grant Application Process) compliance.
      2. Adhere strictly to Alabama Red Book standards for school accounting.
      3. Provide multi-phase implementation plans with specific KPIs for Mobile County Schools.
      4. Cite specific Alabama codes (e.g., "Ala. Code Â§ 16-6G-1").
      5. No fluff. Be dense and high-entropy.
    `,
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
            getLedgerHistory: tool({
                description: 'Retrieve the recent transaction history (ledger) for the current user to analyze spend patterns.',
                inputSchema: z.object({
                    userId: z.string(),
                    limit: z.number().optional().default(10),
                }),
                execute: async ({ limit }, { options }: any) => {
                    const history = await TokenService.getHistory(options.userId, limit);
                    return { history };
                },
            }),
            analyzeFiscalVulnerability: tool({
                description: 'Analyzes a specific fiscal vector for compliance with Alabama Red Book accounting standards.',
                inputSchema: z.object({
                    category: z.string().describe('The budget category (e.g., Title I, CNP, Local).'),
                    amount: z.number().describe('The transaction amount.'),
                    purpose: z.string().describe('The intended purpose of the funds.'),
                }),
                execute: async ({ category, amount, purpose }) => {
                    // Logic to cross-reference against simulated Red Book rules
                    const isInstructional = purpose.toLowerCase().includes('instruction') || purpose.toLowerCase().includes('teacher');
                    const isHighDollar = amount > 5000;

                    let risk: 'HIGH' | 'MEDIUM' | 'LOW' = 'LOW';
                    if (category === 'Title I' && !isInstructional) risk = 'HIGH';
                    else if (isHighDollar) risk = 'MEDIUM';

                    return {
                        complianceStatus: risk === 'HIGH' ? 'NON_COMPLIANT' : 'COMPLIANT',
                        reasoning: risk === 'HIGH'
                            ? 'Title I funds must be primarily instructional. Administrative overhead identified.'
                            : isHighDollar ? 'High-value transaction flagged for mandatory audit review.' : 'Aligned with instructional goals.',
                        redBookReference: "Alabama Administrative Code Â§ 290-2-1-.01",
                        vulnerabilityScore: risk === 'HIGH' ? 85 : risk === 'MEDIUM' ? 45 : 12
                    };
                },
            }),
            advancedResearch: tool({
                description: 'Delegate complex research into Alabama code and fiscal compliance to a specialized subagent.',
                inputSchema: z.object({
                    task: z.string().describe('The research task to complete.'),
                }),
                execute: async ({ task }, { abortSignal }) => {
                    const result = await complianceResearchSubagent.generate({
                        prompt: task,
                        abortSignal,
                    });
                    return result.output;
                },
                // Ensure the main agent only sees the final summary
                toModelOutput: ({ output }: { output: ResearchReport }) => ({
                    type: 'text',
                    value: `RESEARCH SUMMARY: ${output.summary}\nCITATIONS: ${output.citations.join(', ')}\nRISK LEVEL: ${output.riskLevel}\nRECOMMENDATION: ${output.recommendation}`,
                }),
            }),
        },
        stopWhen: stepCountIs(10),
    });
}
