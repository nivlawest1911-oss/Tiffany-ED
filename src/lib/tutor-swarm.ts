import { AGENT_REGISTRY, Agent } from './agents';

export interface SwarmSignal {
    senderId: string;
    receiverId: string;
    type: 'CROSS_AGENT_HANDOVER' | 'URGENT_ESCALATION' | 'INSIGHT_SHARING';
    data: any;
    priority: number;
}

export interface SwarmSession {
    sessionId: string;
    activeAgents: Agent[];
    primaryAgentId: string;
    studentProfile: {
        districtName: string;
        frustrationLevel: number; // 0-1
        cognitiveLoad: number; // 0-1
    };
}

export class TutorSwarm {
    private activeSession: SwarmSession | null = null;

    constructor() { }

    public initializeSwarm(primaryAgent: Agent, districtName: string): SwarmSession {
        // Selection of supporting agents based on the cluster of the primary agent
        const supportingAgents = this.deriveSupportingAgents(primaryAgent);

        this.activeSession = {
            sessionId: `swarm-${Date.now()}`,
            activeAgents: [primaryAgent, ...supportingAgents],
            primaryAgentId: primaryAgent.id,
            studentProfile: {
                districtName,
                frustrationLevel: 0,
                cognitiveLoad: 0.1
            }
        };

        return this.activeSession;
    }

    public async processInteraction(input: string): Promise<string> {
        if (!this.activeSession) return "No active swarm session found.";

        // Logic for "Swarm Handover" or specialized responses
        if (input.toLowerCase().includes('help') || input.toLowerCase().includes('stuck')) {
            this.activeSession.studentProfile.frustrationLevel += 0.2;
        }

        if (this.activeSession.studentProfile.frustrationLevel > 0.6) {
            return this.triggerEscalation();
        }

        return `Active session moderated by ${this.activeSession.primaryAgentId}. Swarm load at ${Math.round(this.activeSession.studentProfile.cognitiveLoad * 100)}%.`;
    }

    private triggerEscalation(): string {
        const wellnessGuardian = AGENT_REGISTRY.WELLNESS_GUARDIAN;
        return `${wellnessGuardian.name} activated: "High frustration detected. Engaging Burnout Shield. Deep Breathing Protocol initiated."`;
    }

    private deriveSupportingAgents(primary: Agent): Agent[] {
        const swarm: Agent[] = [];
        if (primary.cluster === 'Academic') {
            swarm.push(AGENT_REGISTRY.REFORM_GENERAL); // Strategic oversight
            swarm.push(AGENT_REGISTRY.DATA_SCIENTIST); // Performance tracking
        } else if (primary.cluster === 'Administrative') {
            swarm.push(AGENT_REGISTRY.BUDGET_ORACLE); // Support for fiscal tasks
        }

        // Always include Wellness Guardian for psychological safety in the swarm
        swarm.push(AGENT_REGISTRY.WELLNESS_GUARDIAN);

        return swarm;
    }

    public getActiveSession(): SwarmSession | null {
        return this.activeSession;
    }
}
