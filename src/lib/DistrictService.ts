import { prisma } from './prisma';
import { NodeStatus, GlobalHealth, DistrictData } from './UnityOrchestrator';

export class DistrictService {
    static async getDistricts(): Promise<DistrictData[]> {
        const districts = await prisma.district.findMany({
            include: { nodes: true }
        });

        return districts.map((d: any) => ({
            name: d.name,
            id: d.id,
            nodes: d.nodes.map((n: any) => ({
                id: n.id,
                name: n.name,
                status: n.status as NodeStatus['status'],
                health: n.health,
                activeSwarms: n.activeSwarms,
                lastPulse: n.lastPulse.toISOString()
            })),
            health: {
                score: d.health,
                activeNodes: d.nodes.length,
                totalSwarms: d.nodes.reduce((acc: number, n: any) => acc + n.activeSwarms, 0),
                systemLoad: Math.round(d.nodes.reduce((acc: number, n: any) => acc + (n.activeSwarms || 0), 0) * 4.2),
                equilibrium: d.health > 90 ? 'stable' : 'fluctuating'
            }
        }));
    }

    static async ingestDistrict(name: string, defaultNodes: string[]): Promise<string> {
        const district = await prisma.district.create({
            data: {
                name,
                health: 98,
                nodes: {
                    create: defaultNodes.map(nodeName => ({
                        name: nodeName,
                        status: 'optimal',
                        health: 95 + Math.random() * 5,
                        activeSwarms: Math.floor(Math.random() * 3),
                        lastPulse: new Date()
                    }))
                }
            }
        });

        return district.id;
    }

    static async updateNodeTelemetry(nodeId: string, health: number, swarms: number) {
        return await prisma.districtNode.update({
            where: { id: nodeId },
            data: {
                health,
                activeSwarms: swarms,
                status: health > 90 ? 'optimal' : health > 70 ? 'stressed' : 'critical',
                lastPulse: new Date()
            }
        });
    }

    static async getGlobalHealth(districtId: string): Promise<GlobalHealth | null> {
        const district = await prisma.district.findUnique({
            where: { id: districtId },
            include: { nodes: true }
        });

        if (!district) return null;

        const totalHealth = district.nodes.reduce((acc: number, n: any) => acc + n.health, 0);
        const avgHealth = district.nodes.length > 0 ? totalHealth / district.nodes.length : 98;
        const totalSwarms = district.nodes.reduce((acc: number, n: any) => acc + n.activeSwarms, 0);

        return {
            score: Math.round(avgHealth),
            activeNodes: district.nodes.length,
            totalSwarms,
            systemLoad: Math.round(totalSwarms * 4.2),
            equilibrium: avgHealth > 90 ? 'stable' : 'fluctuating'
        };
    }

    static async getAllNodesAcrossDistricts(): Promise<any[]> {
        const nodes = await prisma.districtNode.findMany({
            include: { district: true }
        });

        return nodes.map((n: any) => ({
            id: n.id,
            name: n.name,
            location: n.district?.name || 'Unknown Region',
            status: n.status === 'optimal' ? 'operational' : n.status === 'stressed' ? 'syncing' : n.status === 'critical' ? 'alert' : 'offline',
            intelligenceLoad: Math.round(n.health),
            vaultCompliance: n.vaultCompliance,
            vaultDocumentCount: n.vaultDocumentCount,
            activeUsers: Math.floor(n.health * 10),
            lastSync: n.lastPulse.toISOString()
        }));
    }
}
