export interface FleetNode {
    id: string;
    name: string;
    location: string;
    status: 'operational' | 'syncing' | 'alert' | 'offline';
    intelligenceLoad: number;
    activeUsers: number;
    lastSync: string;
    vaultCompliance: number;
    vaultDocumentCount: number;
}

export interface RegionalMetrics {
    totalActiveNodes: number;
    averageIntelligenceLoad: number;
    regionalComplianceScore: number;
    activeDirectives: number;
    intelligence?: {
        vigor: {
            score: number;
            avgStress: number;
            avgHrv: number;
            totalResilienceProtocols: number;
            trend: string;
        };
        momentum: {
            totalLessons: number;
            totalEngagement: number;
            totalTimeSaved: number;
            momentumScore: number;
            trend: string;
        };
    };
}

export class FleetOrchestrator {
    private static instance: FleetOrchestrator;

    private constructor() { }

    public static getInstance(): FleetOrchestrator {
        if (!FleetOrchestrator.instance) {
            FleetOrchestrator.instance = new FleetOrchestrator();
        }
        return FleetOrchestrator.instance;
    }

    public async getFleetNodes(): Promise<FleetNode[]> {
        try {
            const response = await fetch('/api/fleet');
            const data = await response.json();
            return data.nodes || [];
        } catch (error) {
            console.error('[FleetOrchestrator] Failed to fetch fleet nodes:', error);
            return [];
        }
    }

    public async getRegionalMetrics(): Promise<RegionalMetrics> {
        try {
            const response = await fetch('/api/fleet');
            const data = await response.json();
            return data.metrics || {
                totalActiveNodes: 0,
                averageIntelligenceLoad: 0,
                regionalComplianceScore: 0,
                activeDirectives: 0
            };
        } catch (error) {
            console.error('[FleetOrchestrator] Failed to fetch regional metrics:', error);
            return {
                totalActiveNodes: 0,
                averageIntelligenceLoad: 0,
                regionalComplianceScore: 0,
                activeDirectives: 0
            };
        }
    }

    public async broadcastDirective(nodeName: string, directive: string): Promise<{ success: boolean; hash: string }> {
        const hash = `0x${Math.random().toString(16).substring(2, 10).toUpperCase()}`;
        console.log(`[FleetOrchestrator] Broadcasting directive to ${nodeName}: ${directive}`);
        
        try {
            await fetch('/api/fleet/directive', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodeName, directive, hash, action: 'BROADCAST' })
            });
            
            return { success: true, hash };
        } catch (error) {
            console.error('[FleetOrchestrator] Directive broadcast failed:', error);
            return { success: false, hash };
        }
    }
}
