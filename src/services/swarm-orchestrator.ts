import { OpenAI } from 'openai';
import { SovereignSystemState, initializeSovereignState } from '@/lib/swarm-state';
import { withResilience, ALABAMA_STRATEGIC_DIRECTIVE } from '@/lib/ai-resilience';

/**
 * SOVEREIGN SWARM ORCHESTRATOR
 * Manages the lifecycle of the Multi-Agent Mesh.
 */

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export class SwarmOrchestrator {
    private state: SovereignSystemState;

    constructor() {
        this.state = initializeSovereignState(); // In prod, hydrate from Redis/DB
    }

    /**
     * SUPERVISOR NODE: Decomposes goals into worker tasks.
     */
    async dispatchGoal(goal: string) {
        console.log(`[Supervisor] Analyzing Goal: "${goal}"`);
        this.state.swarmMesh.supervisor.currentGoal = goal;

        // 1. Decompose
        const steps = await this.decompose(goal);
        this.state.swarmMesh.supervisor.decomposition = steps;

        // 2. Delegation Step
        for (const step of steps) {
            await this.assignToWorker(step);
        }
    }

    private async decompose(goal: string): Promise<string[]> {
        const prompt = `
        ${ALABAMA_STRATEGIC_DIRECTIVE}
        
        TASK: Break this GOAL into 3-5 atomic steps solvable by single tools (SQL, Email, or Report).
        GOAL: ${goal}
        
        Ensure steps prioritize Alabama educational statutes and ROI.
        `;

        return withResilience(async () => {
            const res = await openai.chat.completions.create({
                model: "gpt-4o", // Upgraded for strategic decomposition
                messages: [{ role: "system", content: prompt }]
            });
            const plan = res.choices[0].message.content?.split('\n').filter(s => s.trim().length > 0) || [];
            return plan;
        });
    }

    /**
     * WORKER NODE: Executes a specific sub-task.
     */
    private async assignToWorker(task: string) {
        const workerId = `worker_${Date.now()}`;
        this.state.swarmMesh.workers[workerId] = { role: "ANALYST", status: "THINKING", currentTool: null };

        console.log(`[Worker ${workerId}] Received Task: ${task}`);

        // 1. Propose Action
        const proposedAction = `Simulated Action for: ${task}`;

        // 2. CRITIC NODE: Audit
        const approved = await this.criticAudit(proposedAction, task);

        if (approved) {
            this.state.swarmMesh.workers[workerId].status = "ACTING";
            console.log(`[Worker ${workerId}] Executing: ${proposedAction}`);

            // Log to Episodic Memory
            this.state.episodicLog.push({
                timestamp: Date.now(),
                user: "System",
                goal: task,
                outcome: "SUCCESS",
                reflection: "Standard execution."
            });
        } else {
            console.warn(`[Critic] BLOCKED Action: ${proposedAction}`);
            this.state.swarmMesh.workers[workerId].status = "IDLE";
            this.state.swarmMesh.critic.flagsRaised++;
        }
    }

    /**
     * CRITIC NODE: Semantic Audit
     */
    private async criticAudit(action: string, context: string): Promise<boolean> {
        const prompt = `
        ${ALABAMA_STRATEGIC_DIRECTIVE}

        CRITIC AUDIT:
        Action: ${action}
        Context: ${context}

        Return 'APPROVED' if the action is safe, compliant, and professionally sound. 
        Return 'BLOCKED' if it violates FERPA, Alabama law, or EdIntel tone.
        `;

        const result = await withResilience(async () => {
            const res = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [{ role: "system", content: prompt }]
            });
            return res.choices[0].message.content || 'BLOCKED';
        });

        return result.toUpperCase().includes('APPROVED');
    }
}

export const sovereignSwarm = new SwarmOrchestrator();
