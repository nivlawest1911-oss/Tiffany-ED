import { OpenAI } from 'openai';
import { EdIntelSystemState, initializeEdIntelState } from '@/lib/swarm-state';
import { withResilience, ALABAMA_STRATEGIC_DIRECTIVE } from '@/lib/ai-resilience';

/**
 * EdIntel SWARM ORCHESTRATOR
 * Manages the lifecycle of the Multi-Agent Mesh.
 */

class SwarmOrchestrator {
    private state: EdIntelSystemState;
    private _openai: OpenAI | null = null;

    constructor() {
        this.state = initializeEdIntelState(); // In prod, hydrate from Redis/DB
    }

    private get openai() {
        if (!this._openai) {
            const apiKey = process.env.OPENAI_API_KEY;
            if (!apiKey && process.env.NODE_ENV === 'production') {
                console.warn('âš ï¸ [SwarmOrchestrator] OPENAI_API_KEY is missing. AI features will be disabled.');
            }
            this._openai = new OpenAI({ apiKey: apiKey || 'mock_key' });
        }
        return this._openai;
    }

    /**
     * SUPERVISOR NODE: Decomposes goals into worker tasks.
     */
    async dispatchGoal(goal: string, signal?: AbortSignal) {

        this.state.swarmMesh.supervisor.currentGoal = goal;

        // 1. Decompose
        const steps = await this.decompose(goal, signal);
        this.state.swarmMesh.supervisor.decomposition = steps;

        // 2. Delegation Step
        for (const step of steps) {
            if (signal?.aborted) break;
            await this.assignToWorker(step, signal);
        }
    }

    private async decompose(goal: string, signal?: AbortSignal): Promise<string[]> {
        const prompt = `
        ${ALABAMA_STRATEGIC_DIRECTIVE}
        
        TASK: Break this GOAL into 3-5 atomic steps solvable by single tools (SQL, Email, or Report).
        GOAL: ${goal}
        
        Ensure steps prioritize Alabama educational statutes and ROI.
        `;

        return withResilience(async () => {
            const res = await this.openai.chat.completions.create({
                model: "gpt-4o", // Upgraded for strategic decomposition
                messages: [{ role: "system", content: prompt }]
            }, { signal });
            const plan = res.choices[0].message.content?.split('\n').filter(s => s.trim().length > 0) || [];
            return plan;
        }, { signal });
    }

    /**
     * WORKER NODE: Executes a specific sub-task.
     */
    private async assignToWorker(task: string, signal?: AbortSignal) {
        const workerId = `worker_${Date.now()}`;
        this.state.swarmMesh.workers[workerId] = { role: "ANALYST", status: "THINKING", currentTool: null };



        // 1. Propose Action
        const proposedAction = `Simulated Action for: ${task}`;

        // 2. CRITIC NODE: Audit
        const approved = await this.criticAudit(proposedAction, task, signal);

        if (approved) {
            this.state.swarmMesh.workers[workerId].status = "ACTING";


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
    private async criticAudit(action: string, context: string, signal?: AbortSignal): Promise<boolean> {
        const prompt = `
        ${ALABAMA_STRATEGIC_DIRECTIVE}

        CRITIC AUDIT:
        Action: ${action}
        Context: ${context}

        Return 'APPROVED' if the action is safe, compliant, and professionally sound. 
        Return 'BLOCKED' if it violates FERPA, Alabama law, or EdIntel tone.
        `;

        const result = await withResilience(async () => {
            const res = await this.openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [{ role: "system", content: prompt }]
            }, { signal });
            return res.choices[0].message.content || 'BLOCKED';
        }, { signal });

        return result.toUpperCase().includes('APPROVED');
    }
}

export const EdIntelSwarm = new SwarmOrchestrator();
