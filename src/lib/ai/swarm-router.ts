
import { AIDispatcher, TaskComplexity } from './dispatcher';

export interface AgentResponse {
    agent: string;
    analysis: any;
    error?: string;
}

export class SwarmRouter {
    /**
     * Identify required agents based on executive intent.
     * Uses optimized keyword matching for hyper-fast routing.
     */
    private static identifyAgents(query: string): string[] {
        const agents = new Set<string>();
        const q = query.toLowerCase();

        // 1. Literacy Agent Triggers (Instructional Focus)
        if (q.includes('read') || q.includes('literacy') || q.includes('phonics') || q.includes('writing') || q.includes('book') || q.includes('lesson')) {
            agents.add('literacy');
        }

        // 2. Wellness Agent Triggers (Social-Emotional Focus)
        if (q.includes('anxiety') || q.includes('emotion') || q.includes('calm') || q.includes('behavior') || q.includes('wellness') || q.includes('health') || q.includes('mental')) {
            agents.add('wellness');
        }

        // 3. Policy Agent Triggers (Compliance & Strategy)
        if (q.includes('policy') || q.includes('compliance') || q.includes('standard') || q.includes('district') || q.includes('iep') || q.includes('legal') || q.includes('contract')) {
            agents.add('policy');
        }

        // 4. Operational/Data Agent (New)
        if (q.includes('data') || q.includes('stats') || q.includes('metric') || q.includes('roster') || q.includes('schedule') || q.includes('finance')) {
            agents.add('policy'); // Policy handles data strategy for now
        }

        // Default to literacy + policy for general executive queries
        if (agents.size === 0) {
            agents.add('policy');
            agents.add('literacy');
        }

        return Array.from(agents);
    }

    /**
     * Dispatch sub-tasks to specialized AI roles in PARALLEL.
     * This ensures the user gets multi-perspective executive intelligence.
     */
    static async routeRequest(query: string, context: any = {}): Promise<{
        synthesis: string;
        agent_responses: AgentResponse[];
    }> {
        const agents = this.identifyAgents(query);
        console.log(`[SwarmRouter] Orchestrating Cognitive Swarm: ${agents.join(', ')}`);

        // 1. Parallel Execution
        const agentPromises = agents.map(async (agentName) => {
            try {
                // Define the personality and goal for each agent
                const rolePrompts: Record<string, string> = {
                    literacy: "You are the EdIntel Literacy Architect. Analyze the following request for instructional gaps, phonics alignment (Heggerty/SoR), and literacy outcomes.",
                    wellness: "You are the EdIntel Wellness Guardian. Analyze the following request for trauma-informed approaches, emotional regulation needs, and staff/student well-being.",
                    policy: "You are the EdIntel Policy Sentinel. Analyze the following request for district compliance, IEP standards, and institutional risk."
                };

                const result = await AIDispatcher.generate({
                    provider: 'google',
                    complexity: TaskComplexity.ANALYSIS,
                    system: rolePrompts[agentName] || "You are a specialized EdIntel Agent.",
                    messages: [
                        { role: 'user', content: `Analyze this context: ${query}. Contextual Data: ${JSON.stringify(context)}` }
                    ]
                });

                return {
                    agent: agentName,
                    analysis: result.text || "Analysis incomplete."
                };

            } catch (error: any) {
                console.error(`[Cognitive Swarm] Blockage in ${agentName}:`, error);
                return {
                    agent: agentName,
                    analysis: null,
                    error: "Node connection interrupted."
                };
            }
        });

        const responses = await Promise.all(agentPromises);

        // 2. Sovereign Synthesis
        // The Router combines specialized insights into a single strategic directive.

        const synthesisPrompt = `
            You are the EdIntel Sovereign Router.
            Original Executive Query: "${query}"

            The following specialized agents have provided deep-analysis:
            ${responses.map(r => `[Agent: ${r.agent}] ${r.analysis}`).join('\n\n')}

            Synthesize these Findings into a unified 'Sovereign Directive'. 
            - Use a commanding, professional, and strategic tone.
            - Ensure the synthesis is actionable and high-fidelity.
            - Focus on the intersection of these domains.
        `;

        const synthesisRef = await AIDispatcher.generate({
            provider: 'google',
            model: 'gemini-1.5-pro',
            complexity: TaskComplexity.EXECUTIVE,
            messages: [{ role: 'user', content: synthesisPrompt }]
        });

        return {
            synthesis: synthesisRef.text || "Strategic synthesis failed.",
            agent_responses: responses
        };
    }
}
