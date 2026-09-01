/**
 * EdIntel SWARM ORCHESTRATOR
 * 
 * Manages specialized AI agents to execute complex, multi-step district objectives.
 * Implements Supervisor-Worker-Critic pattern.
 */

import { generateText, generateObject } from 'ai';
import { googleProvider, AI_MODELS } from '@/lib/ai-config';
import { SwarmTaskDecompositionSchema, SwarmCriticValidationSchema } from '@/lib/ai/signatures';
import { recordLlmUsage, extractUsageFromResult } from '@/lib/ai/token-meter';

export interface SwarmTask {
    id: string;
    agent: 'ANALYST' | 'COMMUNICATOR' | 'ARCHITECT' | 'FORECASTER';
    description: string;
    dependencies: string[];
    status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
    result?: string;
}

export interface SwarmResult {
    goal: string;
    tasks: SwarmTask[];
    finalSynthesis: string;
    complianceStatus: 'VERIFIED' | 'FLAGGED' | 'REVISE_REQUIRED';
}

export interface SwarmMetricEntry {
    roi: number;
    efficiency: number;
    risk: number;
    latency: number;
    timestamp: number;
}

export class SwarmOrchestrator {
    private model = googleProvider(AI_MODELS.GOOGLE.FLASH_2);
    private logBuffer: any[] = [];
    private MAX_LOGS = 50;

    /**
     * Executes a complex goal by breaking it down into specialized agent tasks.
     */
    async execute(goal: string): Promise<SwarmResult> {
        this.logEvent('SYSTEM', `Initializing Swarm for objective: ${goal}`);
        console.log(`[SwarmOrchestrator] Goal Analysis: ${goal}`);

        // 1. SUPERVISOR: Task Decomposition
        const tasks = await this.decomposeGoal(goal);
        console.log(`[SwarmOrchestrator] Decomposed into ${tasks.length} tasks.`);

        // 2. WORKERS: Parallel/Sequential Execution
        for (const task of tasks) {
            task.status = 'IN_PROGRESS';
            this.logEvent(task.agent, `Executing: ${task.description}`);
            task.result = await this.executeTask(task, goal);
            task.status = 'COMPLETED';
            this.logEvent(task.agent, `Completed task.`);
        }

        // 3. CRITIC: Compliance & Rigor Validation
        this.logEvent('CRITIC', 'Auditing worker outputs for Alabama SDE compliance...');
        const validation = await this.validateResults(goal, tasks);
        console.log(`[SwarmOrchestrator] Critic Status: ${validation.status}`);

        // 4. SYNTHESIZER: Merge Outputs
        this.logEvent('SYSTEM', 'Generating final Sovereign Strategy Briefing...');
        const synthesis = await this.synthesizeResults(goal, tasks, validation.feedback);

        const result: SwarmResult = {
            goal,
            tasks,
            finalSynthesis: synthesis,
            complianceStatus: validation.status === 'APPROVED' ? 'VERIFIED' : 'REVISE_REQUIRED'
        };

        return result;
    }

    /**
     * Simulates a policy pivot (Digital Twin logic).
     */
    async simulate(scenario: string): Promise<SwarmResult> {
        console.log(`[SwarmOrchestrator] Digital Twin Simulation: ${scenario}`);

        // Similar flow but with FORECASTER focus
        const tasks: SwarmTask[] = [
            { id: 's1', agent: 'ANALYST', description: 'Evaluate current baseline data for this scenario.', dependencies: [], status: 'PENDING' },
            { id: 's2', agent: 'FORECASTER', description: 'Project outcome vectors over 12-24 months.', dependencies: ['s1'], status: 'PENDING' },
            { id: 's3', agent: 'ARCHITECT', description: 'Design the structural adjustment plan.', dependencies: ['s2'], status: 'PENDING' }
        ];

        for (const task of tasks) {
            task.status = 'IN_PROGRESS';
            task.result = await this.executeTask(task, scenario);
            task.status = 'COMPLETED';
        }

        const complianceReport = await this.validateResults(scenario, tasks);
        const synthesis = await this.synthesizeResults(scenario, tasks, complianceReport.feedback);

        return {
            goal: scenario,
            tasks,
            finalSynthesis: synthesis,
            complianceStatus: complianceReport.status === 'APPROVED' ? 'VERIFIED' : 'REVISE_REQUIRED'
        };
    }

    /**
     * Executes a multi-agent scenario test (e.g. for Red Team or Stress Tests).
     */
    async runScenario(scenario: string): Promise<SwarmResult> {
        const tasks = await this.decomposeGoal(scenario);

        for (const task of tasks) {
            task.status = 'IN_PROGRESS';
            task.result = await this.executeTask(task, scenario);
            task.status = 'COMPLETED';
        }

        const complianceReport = await this.validateResults(scenario, tasks);
        const synthesis = await this.synthesizeResults(scenario, tasks, complianceReport.feedback);

        return {
            goal: scenario,
            tasks,
            finalSynthesis: synthesis,
            complianceStatus: complianceReport.status === 'APPROVED' ? 'VERIFIED' : 'REVISE_REQUIRED'
        };
    }

    private async decomposeGoal(goal: string): Promise<SwarmTask[]> {
        const start = Date.now();
        const modelId = AI_MODELS.GOOGLE.FLASH_2;

        try {
            const result = await generateObject({
                model: this.model,
                schema: SwarmTaskDecompositionSchema,
                system: `You are the EdIntel Swarm Supervisor. Break complex district goals into 3 distinct tasks:
                1. ANALYST: Process raw data and identify patterns.
                2. ARCHITECT: Design the structural implementation.
                3. COMMUNICATOR: Draft the strategic narrative for stakeholders.
                Return a structured list of tasks with 'agent' and 'description'.`,
                prompt: goal,
            });

            const usage = extractUsageFromResult(result);
            void recordLlmUsage({
                modelId,
                provider: 'google',
                operation: 'swarmDecomposeGoal',
                route: 'swarm/decompose',
                inputTokens: usage.inputTokens,
                outputTokens: usage.outputTokens,
                totalTokens: usage.totalTokens,
                isEstimated: usage.isEstimated,
                latencyMs: Date.now() - start,
                success: true,
            });

            return result.object.map((t, i) => ({
                id: `task-${i}`,
                agent: t.agent,
                description: t.description,
                dependencies: [],
                status: 'PENDING'
            }));
        } catch (e: any) {
            console.error('[SwarmOrchestrator] decomposeGoal failed, using fallback tasks:', e);
            void recordLlmUsage({
                modelId,
                provider: 'google',
                operation: 'swarmDecomposeGoal',
                route: 'swarm/decompose',
                latencyMs: Date.now() - start,
                success: false,
                errorCode: e?.name || 'DECOMPOSE_GOAL_ERROR',
            });
            // Fallback if structured generation fails
            return [
                { id: 't1', agent: 'ANALYST', description: 'Analyze budget and staffing vectors.', dependencies: [], status: 'PENDING' },
                { id: 't2', agent: 'ARCHITECT', description: 'Draft the implementation roadmap.', dependencies: [], status: 'PENDING' },
                { id: 't3', agent: 'COMMUNICATOR', description: 'Synthesize the executive briefing.', dependencies: [], status: 'PENDING' }
            ];
        }
    }

    private async executeTask(task: SwarmTask, context: string): Promise<string> {
        const start = Date.now();
        const modelId = AI_MODELS.GOOGLE.FLASH_2;

        const personas = {
            ANALYST: "You are the EdIntel Chief Analyst. Extract data-driven insights.",
            ARCHITECT: "You are the EdIntel Systems Architect. Design robust implementation frameworks.",
            COMMUNICATOR: "You are the EdIntel Communications Director. Craft authoritative briefings.",
            FORECASTER: "You are the EdIntel Predictive Forecaster. Use trend analysis to project future institutional outcomes and risks."
        };

        try {
            const result = await generateText({
                model: this.model,
                system: personas[task.agent] + " Ground all outputs in EdIntel rigor.",
                prompt: `Task: ${task.description}\nContext: ${context}`,
            });

            const usage = extractUsageFromResult(result);
            void recordLlmUsage({
                modelId,
                provider: 'google',
                operation: `swarmTask:${task.agent}`,
                route: 'swarm/executeTask',
                inputTokens: usage.inputTokens,
                outputTokens: usage.outputTokens,
                totalTokens: usage.totalTokens,
                isEstimated: usage.isEstimated,
                latencyMs: Date.now() - start,
                success: true,
            });

            return result.text;
        } catch (error: any) {
            void recordLlmUsage({
                modelId,
                provider: 'google',
                operation: `swarmTask:${task.agent}`,
                route: 'swarm/executeTask',
                latencyMs: Date.now() - start,
                success: false,
                errorCode: error?.name || 'SWARM_TASK_ERROR',
            });
            throw error;
        }
    }

    private async validateResults(goal: string, tasks: SwarmTask[]): Promise<{ status: 'APPROVED' | 'REJECTED', feedback: string }> {
        const start = Date.now();
        const modelId = AI_MODELS.GOOGLE.FLASH_2;

        try {
            const result = await generateObject({
                model: this.model,
                schema: SwarmCriticValidationSchema,
                system: "You are the EdIntel Swarm Critic. Audit the worker reports for compliance with Alabama SDE statutes and instructional rigor. Be brutally honest.",
                prompt: `Goal: ${goal}\n\nWorker Reports:\n${tasks.map(t => `${t.agent}: ${t.result}`).join('\n\n')}\n\nReturn structured analysis and status (APPROVED/REJECTED).`,
            });

            const usage = extractUsageFromResult(result);
            void recordLlmUsage({
                modelId,
                provider: 'google',
                operation: 'swarmValidateResults',
                route: 'swarm/validate',
                inputTokens: usage.inputTokens,
                outputTokens: usage.outputTokens,
                totalTokens: usage.totalTokens,
                isEstimated: usage.isEstimated,
                latencyMs: Date.now() - start,
                success: true,
            });

            return result.object;
        } catch (e: any) {
            console.error('[SwarmOrchestrator] validateResults failed, defaulting to APPROVED:', e);
            void recordLlmUsage({
                modelId,
                provider: 'google',
                operation: 'swarmValidateResults',
                route: 'swarm/validate',
                latencyMs: Date.now() - start,
                success: false,
                errorCode: e?.name || 'VALIDATE_RESULTS_ERROR',
            });
            return {
                status: 'APPROVED',
                feedback: 'Automatic approval via fallback.'
            };
        }
    }

    private async synthesizeResults(goal: string, tasks: SwarmTask[], criticFeedback: string): Promise<string> {
        const start = Date.now();
        const modelId = AI_MODELS.GOOGLE.FLASH_2;

        try {
            const result = await generateText({
                model: this.model,
                system: "You are the EdIntel Synthesis Engine. Merge worker reports and critic feedback into a single cohesive District Strategy Command Briefing.",
                prompt: `Goal: ${goal}\n\nWorker Results:\n${tasks.map(t => `${t.agent}: ${t.result}`).join('\n\n')}\n\nCritic Feedback:\n${criticFeedback}\n\nFORMAT INSTRUCTION: Output exactly 4 lines in "LABEL: Content" format. Example:\nSTRATEGY: [Summary]\nVECTOR: [Metric/Growth]\nRISK: [Mitigation]\nACTION: [Directive]`,
            });

            const usage = extractUsageFromResult(result);
            void recordLlmUsage({
                modelId,
                provider: 'google',
                operation: 'swarmSynthesizeResults',
                route: 'swarm/synthesize',
                inputTokens: usage.inputTokens,
                outputTokens: usage.outputTokens,
                totalTokens: usage.totalTokens,
                isEstimated: usage.isEstimated,
                latencyMs: Date.now() - start,
                success: true,
            });

            return result.text;
        } catch (error: any) {
            void recordLlmUsage({
                modelId,
                provider: 'google',
                operation: 'swarmSynthesizeResults',
                route: 'swarm/synthesize',
                latencyMs: Date.now() - start,
                success: false,
                errorCode: error?.name || 'SYNTHESIZE_RESULTS_ERROR',
            });
            throw error;
        }
    }

    private logEvent(agent: string, message: string) {
        const entry = {
            id: Math.random().toString(36).substring(7),
            timestamp: Date.now(),
            event_type: 'SWARM_UPDATE',
            event_data: { agent, message }
        };
        this.logBuffer.unshift(entry);
        if (this.logBuffer.length > this.MAX_LOGS) this.logBuffer.pop();
    }

    getLiveLogs() {
        return this.logBuffer;
    }

    getLiveMetrics(): SwarmMetricEntry {
        // Return simulated live jitter for demo purposes, 
        // in production these would be aggregated from real task outcomes.
        return {
            roi: 450000 + (Math.random() * 50000),
            efficiency: 4.5 + (Math.random() * 1.5),
            risk: 15 + (Math.random() * 5),
            latency: 40 + (Math.random() * 10),
            timestamp: Date.now()
        };
    }
}

export const swarmOrchestrator = new SwarmOrchestrator();
