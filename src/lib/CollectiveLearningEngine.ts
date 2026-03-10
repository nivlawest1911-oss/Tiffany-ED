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
}
