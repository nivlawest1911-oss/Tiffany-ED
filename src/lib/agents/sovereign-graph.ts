import { TaskComplexity } from '../ai/dispatcher';
import { queryEdIntelVault } from '../rag/rag-core';

export class EdIntelGraph {
    // Strategic Orchestration Layer
    // Defines the Nodes and Edges of conversation flow and grounds agents in Vault context.

    static async route(intent: string, _context: unknown) {
        console.log(`[EdIntelGraph] Routing Intent: ${intent}`);

        // 1. Semantic Retrieval (Grounding)
        const vaultContext = await queryEdIntelVault(intent);

        // 2. Intent Classification & Delegation
        if (intent.includes('IEP') || intent.includes('Special Ed')) {
            return this.delegateTo('NarrativeArchitect', intent, vaultContext, TaskComplexity.EXECUTIVE);
        }
        if (intent.includes('Lesson') || intent.includes('Plan')) {
            return this.delegateTo('LessonArchitect', intent, vaultContext, TaskComplexity.ANALYSIS);
        }
        if (intent.includes('Behavior') || intent.includes('Discipline')) {
            return this.delegateTo('ReformGeneral', intent, vaultContext, TaskComplexity.ANALYSIS);
        }

        // Default to Executive
        return this.delegateTo('ExecutiveBriefing', intent, vaultContext, TaskComplexity.EXECUTIVE);
    }

    private static async delegateTo(agentId: string, task: string, vaultContext: string, complexity: TaskComplexity) {
        console.log(`[EdIntelGraph] Delegated to ${agentId} with ${complexity} complexity.`);

        // Decision Fatigue Mitigation: Actionable Confidence Scores
        // In a real flow, we'd use AIDispatcher to generate this.
        const confidenceScore = agentId === 'NarrativeArchitect' ? 0.94 : 0.88;

        return {
            agent: agentId,
            status: 'success',
            grounded: !!vaultContext,
            confidence: confidenceScore,
            protocol: `EdIntel-${agentId.toUpperCase()}-v2`,
            message: `EdIntel Protocol ${agentId} activated. Output grounded in ${vaultContext ? 'Sovereign Vault' : 'General Context'}.`
        };
    }
}
