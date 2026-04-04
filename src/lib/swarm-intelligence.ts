import { INTELLIGENCE_MAP, DeepIntelligence } from './intelligence-engine';

export interface SwarmTask {
    id: string;
    description: string;
    assignedAgentId: string;
    status: 'pending' | 'in-progress' | 'completed' | 'failed';
}

export class SwarmIntelligence {
    private static instance: SwarmIntelligence;
    private tasks: SwarmTask[] = [];

    private constructor() {}

    static getInstance() {
        if (!SwarmIntelligence.instance) {
            SwarmIntelligence.instance = new SwarmIntelligence();
        }
        return SwarmIntelligence.instance;
    }

    /**
     * Identifies the best agent for a given query.
     */
    delegateTask(query: string): string {
        const lowerQuery = query.toLowerCase();
        
        if (lowerQuery.includes('iep') || lowerQuery.includes('compliance')) {
            return 'IEP Architect';
        }
        if (lowerQuery.includes('lesson') || lowerQuery.includes('curriculum')) {
            return 'Lesson Wizard';
        }
        if (lowerQuery.includes('data') || lowerQuery.includes('budget') || lowerQuery.includes('fiscal')) {
            return 'Data Intelligence';
        }
        if (lowerQuery.includes('burnout') || lowerQuery.includes('stress') || lowerQuery.includes('wellness')) {
            return 'Wellness Architect';
        }
        if (lowerQuery.includes('identity') || lowerQuery.includes('avatar')) {
            return 'EdIntel Core';
        }
        
        return 'Legacy Profile'; // Default to Dr. West
    }

    getActiveTasks() {
        return this.tasks;
    }

    addTask(task: Omit<SwarmTask, 'status' | 'id'>) {
        const newTask: SwarmTask = {
            ...task,
            id: Math.random().toString(36).substr(2, 9),
            status: 'pending'
        };
        this.tasks.push(newTask);
        return newTask;
    }
}

export const swarm = SwarmIntelligence.getInstance();
