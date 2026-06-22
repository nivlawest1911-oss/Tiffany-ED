/**
 * DistrictService
 */

import crypto from 'crypto';
import { NodeStatus, GlobalHealth, DistrictData } from './UnityOrchestrator';

/**
 * DistrictService
 * 
 * Handles institutional node orchestration and telemetry aggregation.
 * Refactored with dynamic imports to prevent client-side bundle contamination.
 */
export class DistrictService {
    static async getDistricts(): Promise<DistrictData[]> {
        const { prisma } = await import('./prisma');
        const districts = await prisma.districts.findMany({
            include: { district_nodes: true }
        });

        return districts.map((d: any) => ({
            name: d.name,
            id: d.id,
            nodes: d.district_nodes.map((n: any) => ({
                id: n.id,
                name: n.name,
                status: n.status as NodeStatus['status'],
                health: n.health,
                activeSwarms: n.active_swarms,
                lastPulse: n.last_pulse.toISOString()
            })),
            health: {
                score: d.health,
                activeNodes: d.district_nodes.length,
                totalSwarms: d.district_nodes.reduce((acc: number, n: any) => acc + n.active_swarms, 0),
                systemLoad: Math.round(d.district_nodes.reduce((acc: number, n: any) => acc + (n.active_swarms || 0), 0) * 4.2),
                equilibrium: d.health > 90 ? 'stable' : 'fluctuating'
            }
        }));
    }

    static async ingestDistrict(name: string, defaultNodes: string[]): Promise<string> {
        const { prisma } = await import('./prisma');
        const district = await prisma.districts.create({
            data: {
                id: crypto.randomUUID(),
                name,
                health: 98,
                updated_at: new Date(),
                district_nodes: {
                    create: defaultNodes.map(nodeName => ({
                        id: crypto.randomUUID(),
                        name: nodeName,
                        status: 'optimal',
                        health: 95 + Math.random() * 5,
                        active_swarms: Math.floor(Math.random() * 3),
                        last_pulse: new Date(),
                        updated_at: new Date()
                    }))
                }
            }
        });

        return district.id;
    }

    static async updateNodeTelemetry(nodeId: string, health: number, swarms: number) {
        const { prisma } = await import('./prisma');
        return await prisma.district_nodes.update({
            where: { id: nodeId },
            data: {
                health,
                active_swarms: swarms,
                status: health > 90 ? 'optimal' : health > 70 ? 'stressed' : 'critical',
                last_pulse: new Date(),
                updated_at: new Date()
            }
        });
    }

    static async getGlobalHealth(districtId: string): Promise<GlobalHealth | null> {
        const { prisma } = await import('./prisma');
        const district = await prisma.districts.findUnique({
            where: { id: districtId },
            include: { district_nodes: true }
        });

        if (!district) return null;

        const totalHealth = district.district_nodes.reduce((acc: number, n: any) => acc + n.health, 0);
        const avgHealth = district.district_nodes.length > 0 ? totalHealth / district.district_nodes.length : 98;
        const totalSwarms = district.district_nodes.reduce((acc: number, n: any) => acc + n.active_swarms, 0);

        return {
            score: Math.round(avgHealth),
            activeNodes: district.district_nodes.length,
            totalSwarms,
            systemLoad: Math.round(totalSwarms * 4.2),
            equilibrium: avgHealth > 90 ? 'stable' : 'fluctuating'
        };
    }

    static async getAllNodesAcrossDistricts(): Promise<any[]> {
        if (!process.env.DATABASE_URL && !process.env.POSTGRES_PRISMA_URL && !process.env.POSTGRES_URL) {
            return [
                { id: '1', name: 'Zion Alpha', location: 'Southern Region', status: 'operational', intelligenceLoad: 88, vaultCompliance: 99, lastSync: new Date().toISOString() },
                { id: '2', name: 'Zion Beta', location: 'Northern Region', status: 'operational', intelligenceLoad: 92, vaultCompliance: 98, lastSync: new Date().toISOString() }
            ];
        }
        const { prisma } = await import('./prisma');
        const nodes = await prisma.district_nodes.findMany({
            include: { districts: true }
        });

        return nodes.map((n: any) => ({
            id: n.id,
            name: n.name,
            location: n.districts?.name || 'Unknown Region',
            status: n.status === 'optimal' ? 'operational' : n.status === 'stressed' ? 'syncing' : n.status === 'critical' ? 'alert' : 'offline',
            intelligenceLoad: Math.round(n.health),
            vaultCompliance: n.vaultCompliance,
            vaultDocumentCount: n.vaultDocumentCount,
            activeUsers: Math.floor(n.health * 10),
            lastSync: n.last_pulse.toISOString()
        }));
    }

    static async getFleetIntelligence(schoolId?: string, days: number = 7) {
        if (!process.env.DATABASE_URL && !process.env.POSTGRES_PRISMA_URL && !process.env.POSTGRES_URL) {
            return {
                vigor: { score: 92, avgStress: 22, avgHrv: 78, totalResilienceProtocols: 412, trend: 'improving' },
                momentum: { totalLessons: 1250, totalEngagement: 45000, totalTimeSaved: 840, momentumScore: 95, trend: 'accelerating' }
            };
        }
        const { prisma } = await import('./prisma');
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        // Aggregate Institutional Vigor (Wellness)
        // Note: Wellness protocols in generated_content_hub don't have a school_id directly, 
        // they link to users who have school_ids.
        const wellnessRecords = await prisma.generated_content_hub.findMany({
            where: { 
                type: 'WELLNESS_RESET',
                created_at: { gte: startDate },
                ...(schoolId ? { users: { school_id: schoolId } } : {})
            },
            select: { content: true }
        });

        let totalStress = 0;
        let totalHrv = 0;
        let wellnessCount = 0;

        wellnessRecords.forEach((r: any) => {
            const bio = r.content && typeof r.content === 'object' ? (r.content as any).biometrics : null;
            if (bio) {
                if (typeof bio.stress === 'number') totalStress += bio.stress;
                if (typeof bio.hrv === 'number') totalHrv += bio.hrv;
                wellnessCount++;
            }
        });

        const avgStress = wellnessCount > 0 ? totalStress / wellnessCount : 35;
        const avgHrv = wellnessCount > 0 ? totalHrv / wellnessCount : 72;
        const vigorScore = Math.round(100 - avgStress + (avgHrv / 10));

        // Aggregate Instructional Momentum (Academic)
        const academicInsights = await prisma.analytics_insights.findMany({
            where: {
                date: { gte: startDate },
                ...(schoolId ? { school_id: schoolId } : {})
            },
            select: { lessons_created: true, students_engaged: true, time_saved_hours: true }
        });

        const totalLessons = academicInsights.reduce((sum: number, i: any) => sum + (i.lessons_created || 0), 0);
        const totalEngagement = academicInsights.reduce((sum: number, i: any) => sum + (i.students_engaged || 0), 0);
        const totalTimeSaved = academicInsights.reduce((sum: number, i: any) => sum + Number(i.time_saved_hours || 0), 0);

        return {
            vigor: {
                score: Math.min(100, vigorScore),
                avgStress: Math.round(avgStress),
                avgHrv: Math.round(avgHrv),
                totalResilienceProtocols: wellnessCount,
                trend: 'improving',
                period: `${days}d`
            },
            momentum: {
                totalLessons,
                totalEngagement,
                totalTimeSaved,
                momentumScore: Math.min(100, Math.round((totalLessons / 100) + (totalEngagement / 1000))),
                trend: 'accelerating',
                period: `${days}d`
            }
        };
    }
}
