/**
 * RoleplayEngine.ts
 * Core logic for generating and managing branching conflict simulations.
 */

export type ScenarioType = 'BUDGET_CRISIS' | 'SECURITY_BREACH' | 'COMMUNITY_POLARIZATION' | 'PEDAGOGICAL_SHIFT';

export interface SimulationChoice {
    id: string;
    text: string;
    impact: {
        diplomacy: number;
        decisiveness: number;
        resources: number;
        sentiment: number;
    };
    consequence: string;
}

export interface SimulationStep {
    id: string;
    description: string;
    choices: SimulationChoice[];
}

export interface SimulationState {
    scenarioId: string;
    type: ScenarioType;
    currentStepId: string;
    metrics: {
        diplomacy: number;
        decisiveness: number;
        resources: number;
        sentiment: number;
    };
    history: string[];
    isCompleted: boolean;
}

const SCENARIOS: Record<ScenarioType, { title: string; steps: SimulationStep[] }> = {
    BUDGET_CRISIS: {
        title: 'The Q3 Shortfall',
        steps: [
            {
                id: 'start',
                description: 'A surprise $1.2M audit discrepancy has materialized. Neighboring districts are watching. The union is requesting an immediate briefing.',
                choices: [
                    {
                        id: 'transparency',
                        text: 'Full Public Disclosure',
                        impact: { diplomacy: 15, decisiveness: 10, resources: -5, sentiment: 20 },
                        consequence: 'The community appreciates the honesty, but the board is nervous about the optics.'
                    },
                    {
                        id: 'internal',
                        text: 'Internal Audit & Containment',
                        impact: { diplomacy: -10, decisiveness: 15, resources: 5, sentiment: -10 },
                        consequence: 'Stable for now, but rumors are starting to swirl among the staff.'
                    }
                ]
            }
        ]
    },
    SECURITY_BREACH: {
        title: 'Neural Data Leak',
        steps: [
            {
                id: 'start',
                description: 'A vulnerability in the Sovereign Gatekeeper was exploited. Student behavioral profiles are circling the dark web.',
                choices: [
                    {
                        id: 'lockdown',
                        text: 'Total System Lockdown',
                        impact: { diplomacy: -5, decisiveness: 20, resources: -10, sentiment: 5 },
                        consequence: 'System is safe, but learning is halted across the entire district.'
                    },
                    {
                        id: 'trace',
                        text: 'Silent Trace & Counter-Swarm',
                        impact: { diplomacy: 5, decisiveness: 10, resources: -15, sentiment: 10 },
                        consequence: 'The attacker is identified, but some data persists in unauthorized caches.'
                    }
                ]
            }
        ]
    },
    COMMUNITY_POLARIZATION: {
        title: 'The Curriculum Rift',
        steps: [
            {
                id: 'start',
                description: 'Tensions over the Sovereign Meta-Curriculum have reached a boiling point. Protests are forming at the District Office.',
                choices: [
                    {
                        id: 'dialogue',
                        text: 'Town Hall Dialogue',
                        impact: { diplomacy: 20, decisiveness: -5, resources: -2, sentiment: 15 },
                        consequence: 'The rift is exposed, but a path toward reconciliation is established.'
                    },
                    {
                        id: 'mandate',
                        text: 'Institutional Mandate',
                        impact: { diplomacy: -15, decisiveness: 20, resources: 0, sentiment: -20 },
                        consequence: 'Order is maintained, but the underlying resentment remains.'
                    }
                ]
            }
        ]
    },
    PEDAGOGICAL_SHIFT: {
        title: 'AI-First Transition',
        steps: [
            {
                id: 'start',
                description: 'The proposal to replace 40% of standard instructional time with Autonomous Swarm Tutoring is on the table.',
                choices: [
                    {
                        id: 'aggressive',
                        text: 'Aggressive Rollout',
                        impact: { diplomacy: -10, decisiveness: 25, resources: 15, sentiment: -5 },
                        consequence: 'Efficiency sky-rockets, but veteran teachers feel sidelined.'
                    },
                    {
                        id: 'hybrid',
                        text: 'Teacher-in-the-Loop Hybrid',
                        impact: { diplomacy: 15, decisiveness: 5, resources: -10, sentiment: 15 },
                        consequence: 'Higher teacher morale, but slowing down the predicted ROI.'
                    }
                ]
            }
        ]
    }
};

export class RoleplayEngine {
    private static instance: RoleplayEngine;

    private constructor() { }

    public static getInstance(): RoleplayEngine {
        if (!RoleplayEngine.instance) {
            RoleplayEngine.instance = new RoleplayEngine();
        }
        return RoleplayEngine.instance;
    }

    public startSimulation(type: ScenarioType): SimulationState {
        return {
            scenarioId: `sim_${Date.now()}`,
            type,
            currentStepId: 'start',
            metrics: {
                diplomacy: 50,
                decisiveness: 50,
                resources: 50,
                sentiment: 50
            },
            history: [],
            isCompleted: false
        };
    }

    public getStep(type: ScenarioType, stepId: string): SimulationStep | undefined {
        return SCENARIOS[type].steps.find(s => s.id === stepId);
    }

    public makeChoice(state: SimulationState, choiceId: string): SimulationState {
        const step = this.getStep(state.type, state.currentStepId);
        const choice = step?.choices.find(c => c.id === choiceId);

        if (!choice) return state;

        return {
            ...state,
            metrics: {
                diplomacy: Math.min(100, Math.max(0, state.metrics.diplomacy + choice.impact.diplomacy)),
                decisiveness: Math.min(100, Math.max(0, state.metrics.decisiveness + choice.impact.decisiveness)),
                resources: Math.min(100, Math.max(0, state.metrics.resources + choice.impact.resources)),
                sentiment: Math.min(100, Math.max(0, state.metrics.sentiment + choice.impact.sentiment))
            },
            history: [...state.history, choice.id],
            isCompleted: true // Simplified for now
        };
    }

    public getScenarioTitle(type: ScenarioType): string {
        return SCENARIOS[type].title;
    }
}
