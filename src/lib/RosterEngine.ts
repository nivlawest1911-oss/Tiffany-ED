/**
 * EdIntel ROSTER LOGISTICS ENGINE
 * 
 * Orchestrates workforce optimization, manages personnel capacity telemetry,
 * and handles autonomous caseload rebalancing recommendations.
 */

export interface StaffMember {
    id: string;
    name: string;
    role: string;
    caseloadCount: number;
    maxCapacity: number;
    efficiencyScore: number; // 0-100
    specialization: string[];
}

export interface CaseloadOptimization {
    staffId: string;
    staffName: string;
    currentLoad: number;
    status: 'OPTIMAL' | 'STRESSED' | 'CRITICAL' | 'UNDERUTILIZED';
    recommendation?: string;
}

class RosterEngine {
    private staff: StaffMember[] = [
        {
            id: 'staff-001',
            name: 'Dr. Aris Thorne',
            role: 'Lead Psychologist',
            caseloadCount: 42,
            maxCapacity: 45,
            efficiencyScore: 88,
            specialization: ['Behavioral Analysis', 'Cognitive Assessment']
        },
        {
            id: 'staff-002',
            name: 'Sarah Jenkins',
            role: 'Case Manager',
            caseloadCount: 58,
            maxCapacity: 50,
            efficiencyScore: 92,
            specialization: ['IEP Compliance', 'Resource Allocation']
        },
        {
            id: 'staff-003',
            name: 'Marcus Vane',
            role: 'Intervention Specialist',
            caseloadCount: 28,
            maxCapacity: 40,
            efficiencyScore: 75,
            specialization: ['Crisis Intervention', 'Social-Emotional Learning']
        }
    ];

    public getWorkforceAnalytics() {
        return this.staff.map(member => {
            const loadRatio = member.caseloadCount / member.maxCapacity;
            let status: CaseloadOptimization['status'] = 'OPTIMAL';

            if (loadRatio > 1.1) status = 'CRITICAL';
            else if (loadRatio > 0.9) status = 'STRESSED';
            else if (loadRatio < 0.6) status = 'UNDERUTILIZED';

            return {
                ...member,
                status,
                loadRatio
            };
        });
    }

    public getOptimizationSwarm() {
        const stressed = this.staff.find(s => s.caseloadCount > s.maxCapacity);
        const under = this.staff.find(s => s.caseloadCount < s.maxCapacity * 0.7);

        if (stressed && under) {
            return {
                type: 'REBALANCE',
                fromId: stressed.id,
                toId: under.id,
                suggestedMove: 5,
                logic: `Redistribute 5 records from ${stressed.name} (Stressed) to ${under.name} (Available Capacity).`
            };
        }

        return null;
    }

    public performRebalance(fromId: string, toId: string, amount: number) {
        const fromStaff = this.staff.find(s => s.id === fromId);
        const toStaff = this.staff.find(s => s.id === toId);

        if (fromStaff && toStaff) {
            fromStaff.caseloadCount -= amount;
            toStaff.caseloadCount += amount;

            return {
                timestamp: new Date().toISOString(),
                hash: `STAFF-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                fromName: fromStaff.name,
                toName: toStaff.name,
                transferred: amount
            };
        }
        return null;
    }
}

export const rosterEngine = new RosterEngine();
