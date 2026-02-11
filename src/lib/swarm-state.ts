/**
 * EdIntel SWARM STATE SCHEMA (2026)
 * Graph-Based Memory Architecture for Long-Horizon Autonomy
 */

export interface EdIntelSystemState {
    // 1. SEMANTIC MEMORY (Immutable Facts)
    // The "World Model" of Mobile County
    semanticGrid: {
        districts: {
            [id: string]: {
                name: string; // e.g., "Whistler"
                policyKeywords: string[]; // ["Title I", "FERPA", "Usage Tokens"]
                keyPersonnel: { role: string, name: string }[];
            }
        };
        EdIntelRules: string[]; // ["Always balance metrics with wellness", "Use authoritative tone"]
    };

    // 2. EPISODIC MEMORY (Experienced Events)
    // The "Autobiography" of the Agent's actions
    episodicLog: {
        timestamp: number;
        user: string;
        goal: string;
        outcome: "SUCCESS" | "FAILURE" | "CRITIC_REJECTED";
        reflection: string; // "I failed to check the token balance first."
    }[];

    // 3. ACTIVE SWARM MESH (Running Processes)
    // State of the Multi-Agent System
    swarmMesh: {
        supervisor: {
            currentGoal: string | null;
            decomposition: string[]; // Sub-tasks
        };
        workers: {
            [agentId: string]: {
                role: "ANALYST" | "COMMUNICATOR" | "ARCHITECT";
                status: "IDLE" | "THINKING" | "ACTING" | "CRITIC_REVIEW";
                currentTool: string | null;
            }
        };
        critic: {
            lastAuditId: string | null;
            flagsRaised: number;
        }
    };
}

/**
 * INITIAL STATE FACTORY
 */
export const initializeEdIntelState = (): EdIntelSystemState => ({
    semanticGrid: {
        districts: {
            "mobile_county": {
                name: "Mobile County Public Schools",
                policyKeywords: ["Alabama Literacy Act", "Device 1:1", "EdIntel Data"],
                keyPersonnel: [{ role: "Director", name: "Dr. Alvin West" }]
            }
        },
        EdIntelRules: [
            "Data Identity is non-negotiable.",
            "Proactivity > Reactivity.",
            "Every interaction must reinforce professional authority."
        ]
    },
    episodicLog: [],
    swarmMesh: {
        supervisor: { currentGoal: null, decomposition: [] },
        workers: {},
        critic: { lastAuditId: null, flagsRaised: 0 }
    }
});
