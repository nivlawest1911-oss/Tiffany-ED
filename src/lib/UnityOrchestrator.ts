"use client";

export interface NodeStatus {
    id: string;
    name: string;
    status: 'optimal' | 'stressed' | 'critical' | 'offline';
    health: number; // 0-100
    activeSwarms: number;
    lastPulse: string;
}

export interface GlobalHealth {
    score: number;
    activeNodes: number;
    totalSwarms: number;
    systemLoad: number;
    equilibrium: 'stable' | 'fluctuating' | 'destabilizing';
}

export interface DistrictData {
    name: string;
    id: string;
    nodes: NodeStatus[];
    health: GlobalHealth;
}

class UnityOrchestrator {
    private districts: DistrictData[] = [];
    private defaultNodes: string[] = [
        'Fiscal', 'Roster', 'Oracle', 'Vault', 'Gym',
        'Transit', 'Medical', 'Legal', 'Curriculum',
        'Safety', 'Crisis', 'Community'
    ];

    async fetchDistricts(): Promise<DistrictData[]> {
        try {
            const res = await fetch('/api/districts');
            if (!res.ok) throw new Error('Failed to fetch districts');
            this.districts = await res.json();
            return this.districts;
        } catch (error) {
            console.error('[UnityOrchestrator] Error fetching districts:', error);
            return [];
        }
    }

    async ingestNewDistrict(name: string, nodes?: string[]): Promise<string | null> {
        try {
            const res = await fetch('/api/districts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, nodes: nodes || this.defaultNodes })
            });
            if (!res.ok) throw new Error('Failed to ingest district');
            const data = await res.json();
            await this.fetchDistricts();
            return data.id;
        } catch (error) {
            console.error('[UnityOrchestrator] Error ingesting district:', error);
            return null;
        }
    }

    getDistricts(): DistrictData[] {
        return this.districts;
    }

    getNodeStatuses(districtId: string): NodeStatus[] {
        const district = this.districts.find(d => d.id === districtId);
        if (!district) return [];

        // Simulate minor drift on client for visual feedback, 
        // while server remains source of truth on next fetch.
        return district.nodes.map(node => {
            const healthDrift = (Math.random() - 0.5) * 2;
            const newHealth = Math.min(100, Math.max(0, node.health + healthDrift));
            return {
                ...node,
                health: Math.round(newHealth),
                status: newHealth > 90 ? 'optimal' : newHealth > 70 ? 'stressed' : 'critical'
            };
        });
    }

    getGlobalHealth(districtId?: string): GlobalHealth {
        const district = districtId ? this.districts.find(d => d.id === districtId) : null;
        if (!district) {
            return {
                score: 98.2, // Default aggregate score
                activeNodes: 13,
                totalSwarms: 42,
                systemLoad: 12,
                equilibrium: 'stable'
            };
        }
        return district.health;
    }

    async resolveCrossNodeTriggers(districtId: string): Promise<boolean> {
        try {
            const res = await fetch('/api/districts/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ districtId })
            });
            return res.ok;
        } catch (error) {
            console.error('[UnityOrchestrator] Error during cross-node sync:', error);
            return false;
        }
    }
}

export const unityOrchestrator = new UnityOrchestrator();
