/**
 * FiscalEngine.ts
 * Core logic for autonomous budget optimization and resource allocation.
 */

export type ResourceType = 'CAPITAL' | 'COMPUTE' | 'STAFF' | 'FACILITY';

export interface FiscalNode {
    id: string;
    name: string;
    type: ResourceType;
    allocation: number; // Percentage or absolute value
    utilization: number;
    drift: number; // Difference between planned and actual
}

export interface FiscalAction {
    id: string;
    type: 'REALLOCATION' | 'PROCUREMENT' | 'LIQUIDATION';
    sourceNodeId?: string;
    targetNodeId: string;
    amount: number;
    reason: string;
    timestamp: Date;
    status: 'PENDING' | 'EXECUTED';
}

export class FiscalEngine {
    private static instance: FiscalEngine;
    private nodes: FiscalNode[] = [];
    private history: FiscalAction[] = [];

    private constructor() {
        // Seed initial fiscal nodes
        this.nodes = [
            { id: 'node_cap_01', name: 'General Instructional Fund', type: 'CAPITAL', allocation: 4500000, utilization: 82, drift: -2 },
            { id: 'node_comp_01', name: 'Neural Processing Cluster', type: 'COMPUTE', allocation: 800, utilization: 94, drift: 5 },
            { id: 'node_staff_01', name: 'Elite Educator Pool', type: 'STAFF', allocation: 120, utilization: 98, drift: 2 },
            { id: 'node_fac_01', name: 'Sovereign Learning Centers', type: 'FACILITY', allocation: 12, utilization: 65, drift: -10 }
        ];
    }

    public static getInstance(): FiscalEngine {
        if (!FiscalEngine.instance) {
            FiscalEngine.instance = new FiscalEngine();
        }
        return FiscalEngine.instance;
    }

    public getLiveMetrics(): FiscalNode[] {
        // Simulate minor fluctuations
        return this.nodes.map(node => ({
            ...node,
            utilization: Math.min(100, Math.max(0, node.utilization + (Math.random() * 2 - 1))),
            drift: node.drift + (Math.random() * 0.4 - 0.2)
        }));
    }

    public executeReallocation(sourceId: string, targetId: string, amount: number, reason: string): FiscalAction {
        const action: FiscalAction = {
            id: `fiscal_${Date.now()}`,
            type: 'REALLOCATION',
            sourceNodeId: sourceId,
            targetNodeId: targetId,
            amount,
            reason,
            timestamp: new Date(),
            status: 'EXECUTED'
        };

        this.history.push(action);
        return action;
    }

    public getMarketLiquidity(): number {
        const totalUtilization = this.nodes.reduce((acc, n) => acc + n.utilization, 0);
        const avgUtilization = totalUtilization / this.nodes.length;
        return 100 - avgUtilization;
    }

    public getOptimizationScore(): number {
        const totalDrift = this.nodes.reduce((acc, n) => acc + Math.abs(n.drift), 0);
        return Math.max(0, 100 - (totalDrift * 5));
    }
}
