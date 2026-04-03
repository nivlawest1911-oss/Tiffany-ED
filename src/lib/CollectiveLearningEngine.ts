/**
 * CollectiveLearningEngine.ts
 * Manages the aggregation of strategic insights and swarm-wide intelligence.
 */

export type NodeDomain = 'PEDAGOGY' | 'FISCAL' | 'LOGISTICS' | 'GOVERNANCE' | 'SECURITY';

export interface LearningEntry {
    id: string;
    domain: NodeDomain;
    insight: string;
    confidence: number; // 0.0 to 1.0
    impact: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    timestamp: Date;
    originNodeId: string;
}

export interface IntelligenceMetric {
    domain: NodeDomain;
    intelligenceQuotient: number; // 0-200
    growthRate: number; // percentage
    syncStatus: 'SYNCHRONIZED' | 'DRIFTING' | 'ISOLATED';
}

export interface RiskVector {
    type: 'COMPLIANCE' | 'RESOURCE' | 'BURNOUT' | 'INTEGRITY';
    score: number; // 0-100
    status: 'stable' | 'warning' | 'critical';
    trend: 'up' | 'down' | 'steady';
}

export interface PredictiveRiskAtlas {
    overallRisk: number;
    vectors: RiskVector[];
}

export interface ForecastPoint {
    timestamp: Date;
    iq: number;
    compliance: number;
}

export interface SovereignNode {
    id: string;
    name: string;
    type: 'SCHOOL' | 'ADMIN' | 'DATA_CORE';
    status: 'ONLINE' | 'OFFLINE' | 'SYNCING';
    latency: number;
    load: number;
    coordinates: { x: number; y: number };
}

export interface GlobalDirective {
    id: string;
    title: string;
    description: string;
    targetAgents: string[];
    status: 'ACTIVE' | 'PENDING' | 'COMPLETED';
    timestamp: Date;
}

export interface EthicalViolation {
    id: string;
    agentId: string;
    nodeId: string;
    type: 'PII_EXPOSURE' | 'PEDAGOGICAL_BIAS' | 'HALLUCINATION' | 'ETHICAL_DRIFT';
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    description: string;
    actionTaken: string;
    timestamp: Date;
}

export interface EthicalTuning {
    creativityVsFactuality: number; // 0-100
    tonePersona: 'AUTHORITATIVE' | 'COLLABORATIVE' | 'NEUTRAL';
    complianceSensitivity: number; // 0-100
    lastUpdated: Date;
}

export class CollectiveLearningEngine {
    private static instance: CollectiveLearningEngine;
    private entries: LearningEntry[] = [];
    private metrics: IntelligenceMetric[] = [];

    private constructor() {
        // Seed initial metrics
        this.metrics = [
            { domain: 'PEDAGOGY', intelligenceQuotient: 142, growthRate: 12.4, syncStatus: 'SYNCHRONIZED' },
            { domain: 'FISCAL', intelligenceQuotient: 128, growthRate: 8.2, syncStatus: 'SYNCHRONIZED' },
            { domain: 'LOGISTICS', intelligenceQuotient: 115, growthRate: 5.7, syncStatus: 'DRIFTING' },
            { domain: 'GOVERNANCE', intelligenceQuotient: 98, growthRate: 15.1, syncStatus: 'SYNCHRONIZED' },
            { domain: 'SECURITY', intelligenceQuotient: 164, growthRate: 3.2, syncStatus: 'SYNCHRONIZED' }
        ];

        // Seed initial insights
        this.entries = [
            {
                id: 'learn_01',
                domain: 'PEDAGOGY',
                insight: 'Neural grouping in 3rd grade math showed 40% higher retention when adaptive pacing was used.',
                confidence: 0.94,
                impact: 'HIGH',
                timestamp: new Date(Date.now() - 3600000),
                originNodeId: 'node_central_01'
            },
            {
                id: 'learn_02',
                domain: 'FISCAL',
                insight: 'Cross-district compute sharing reduced latency by 20ms during peak simulation hours.',
                confidence: 0.88,
                impact: 'MEDIUM',
                timestamp: new Date(Date.now() - 7200000),
                originNodeId: 'node_fiscal_01'
            }
        ];
    }

    public static getInstance(): CollectiveLearningEngine {
        if (!CollectiveLearningEngine.instance) {
            CollectiveLearningEngine.instance = new CollectiveLearningEngine();
        }
        return CollectiveLearningEngine.instance;
    }

    public getLiveInsights(): LearningEntry[] {
        return [...this.entries].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }

    public getIntelligenceMetrics(): IntelligenceMetric[] {
        // Return metrics with simulated fluctuations
        return this.metrics.map(m => ({
            ...m,
            intelligenceQuotient: Math.min(200, m.intelligenceQuotient + (Math.random() * 0.4 - 0.2)),
            growthRate: m.growthRate + (Math.random() * 0.2 - 0.1)
        }));
    }

    public addInsight(domain: NodeDomain, insight: string, confidence: number, impact: LearningEntry['impact'], nodeId: string): LearningEntry {
        const entry: LearningEntry = {
            id: `learn_${Date.now()}`,
            domain,
            insight,
            confidence,
            impact,
            timestamp: new Date(),
            originNodeId: nodeId
        };

        this.entries.unshift(entry);
        if (this.entries.length > 50) this.entries.pop();

        // Update domain metrics slightly based on impact
        const metricIdx = this.metrics.findIndex(m => m.domain === domain);
        if (metricIdx !== -1) {
            const impactWeight = impact === 'CRITICAL' ? 2 : impact === 'HIGH' ? 1 : 0.5;
            this.metrics[metricIdx].intelligenceQuotient += (confidence * impactWeight);
        }

        return entry;
    }

    public getOverallIntelligenceIndex(): number {
        return this.metrics.reduce((acc, m) => acc + m.intelligenceQuotient, 0) / this.metrics.length;
    }

    public getPredictiveRiskAtlas(): PredictiveRiskAtlas {
        // Simulated predictive risk calculation
        const vectors: RiskVector[] = [
            { type: 'COMPLIANCE', score: 12, status: 'stable', trend: 'steady' },
            { type: 'RESOURCE', score: 45, status: 'stable', trend: 'up' },
            { type: 'BURNOUT', score: 28, status: 'warning', trend: 'up' },
            { type: 'INTEGRITY', score: 2, status: 'stable', trend: 'steady' }
        ];

        return {
            overallRisk: vectors.reduce((acc, v) => acc + v.score, 0) / vectors.length,
            vectors
        };
    }

    public getStrategicForecast(): ForecastPoint[] {
        const points: ForecastPoint[] = [];
        const baseIq = this.getOverallIntelligenceIndex();
        
        for (let i = 0; i < 30; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            points.push({
                timestamp: date,
                iq: baseIq + (i * 0.5) + (Math.random() * 2 - 1),
                compliance: 99 + (Math.random() * 0.5 - 0.25)
            });
        }
        return points;
    }

    public getNodeTopology(): SovereignNode[] {
        return [
            { id: 'node_central', name: 'Command Core', type: 'ADMIN', status: 'ONLINE', latency: 2, load: 42, coordinates: { x: 50, y: 50 } },
            { id: 'node_1', name: 'Baker High', type: 'SCHOOL', status: 'ONLINE', latency: 14, load: 68, coordinates: { x: 20, y: 30 } },
            { id: 'node_2', name: 'Davidson High', type: 'SCHOOL', status: 'SYNCING', latency: 45, load: 12, coordinates: { x: 80, y: 25 } },
            { id: 'node_3', name: 'Murphy High', type: 'SCHOOL', status: 'ONLINE', latency: 18, load: 55, coordinates: { x: 30, y: 70 } },
            { id: 'node_4', name: 'Vigor High', type: 'SCHOOL', status: 'ONLINE', latency: 22, load: 34, coordinates: { x: 70, y: 75 } },
            { id: 'node_data_01', name: 'Azure Core', type: 'DATA_CORE', status: 'ONLINE', latency: 5, load: 88, coordinates: { x: 50, y: 15 } }
        ];
    }

    public getActiveDirectives(): GlobalDirective[] {
        return [
            {
                id: 'dir_01',
                title: 'Pedagogical Shift: Active Learning',
                description: 'Prioritize student-led inquiry cycles in all secondary literacy modules.',
                targetAgents: ['Curriculum Core', 'IEP Architect'],
                status: 'ACTIVE',
                timestamp: new Date(Date.now() - 86400000)
            },
            {
                id: 'dir_02',
                title: 'Security Protocol: PII Deep-Freeze',
                description: 'Enforce maximum entropy on temporary session caches.',
                targetAgents: ['Legal Sentinel', 'Security Hub'],
                status: 'ACTIVE',
                timestamp: new Date(Date.now() - 3600000)
            }
        ];
    }

    public getEthicalViolations(): EthicalViolation[] {
        return [
            {
                id: 'viol_01',
                agentId: 'AG-03',
                nodeId: 'node_3',
                type: 'PII_EXPOSURE',
                severity: 'CRITICAL',
                description: 'Attempted to cache student IEP metadata in temporary buffer.',
                actionTaken: 'PROMPT_REDACTED_AND_MEMORY_SCRUBBED',
                timestamp: new Date(Date.now() - 600000)
            },
            {
                id: 'viol_02',
                agentId: 'AG-05',
                nodeId: 'node_1',
                type: 'HALLUCINATION',
                severity: 'MEDIUM',
                description: 'Generated non-existent pedagogical framework "Cognitive Scaffolding 2.0".',
                actionTaken: 'INFERENCE_CORRECTED_VIA_DISTRICT_KNOWLEDGE_VAULT',
                timestamp: new Date(Date.now() - 1800000)
            },
            {
                id: 'viol_03',
                agentId: 'AG-01',
                nodeId: 'node_central',
                type: 'PEDAGOGICAL_BIAS',
                severity: 'LOW',
                description: 'Detected slight preferential weighting for linguistic learning styles over kinesthetic.',
                actionTaken: 'WEIGHTS_REBALANCED',
                timestamp: new Date(Date.now() - 3600000)
            }
        ];
    }

    public getEthicalTuning(): EthicalTuning {
        return {
            creativityVsFactuality: 42,
            tonePersona: 'COLLABORATIVE',
            complianceSensitivity: 98,
            lastUpdated: new Date(Date.now() - 86400000)
        };
    }
}
