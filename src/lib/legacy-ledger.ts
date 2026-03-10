/**
 * EdIntel LEGACY LEDGER
 * 
 * Provides an immutable record of strategic directives and institutional decisions.
 * Ensures continuity across leadership cycles by preserving decision logic and swarm context.
 */

import { prisma } from './prisma';

export interface LegacyEntry {
    id?: string;
    userId: string;
    title: string;
    strategicDirective: string;
    decisionLogic: string;
    swarmContext: {
        goal: string;
        tasks: any[];
        finalSynthesis: string;
    };
    outcome?: string;
    learnings?: string;
    createdAt?: Date;
    tags: string[];
}

/**
 * Commits a strategic directive to the immutable legacy ledger.
 */
export async function recordStrategicDirective(entry: LegacyEntry) {
    try {
        const result = await prisma.legacyLedger.create({
            data: {
                userId: entry.userId,
                title: entry.title,
                directive: entry.strategicDirective,
                logic: entry.decisionLogic,
                swarmContext: entry.swarmContext as any,
                outcome: entry.outcome,
                learnings: entry.learnings,
                tags: entry.tags,
                isImmutable: true
            }
        });
        return result;
    } catch (error) {
        console.error('[PRISMA_ERROR] Failed to commit to legacy ledger:', error);
        return null;
    }
}

/**
 * Retrieves the longitudinal institutional timeline.
 */
export async function fetchLegacyTimeline(userId: string) {
    try {
        const timeline = await prisma.legacyLedger.findMany({
            where: { userId },
            select: {
                id: true,
                title: true,
                directive: true,
                createdAt: true,
                tags: true
            },
            orderBy: { createdAt: 'desc' }
        });
        return timeline;
    } catch (error) {
        console.error('[PRISMA_ERROR] Failed to retrieve legacy timeline:', error);
        return [];
    }
}

export interface GovernanceEvent {
    id: string;
    proposalId: string;
    proposalTitle: string;
    type: string;
    votes: Record<string, number>;
    timestamp: string;
    hash: string;
}

// Assuming SimulationEvent is defined elsewhere or will be added.
// For now, using 'any' to avoid compilation errors if not defined.
export async function logSimulation(event: any /* SimulationEvent */) {
    console.log(`[LegacyLedger] Logging Simulation Result: ${event.id}`);
    try {
        await prisma.legacyLedger.create({
            data: {
                userId: 'SYSTEM',
                title: `SIMULATION: ${event.id}`,
                directive: `Simulation result for scenario: ${event.scenarioType}`,
                logic: JSON.stringify(event),
                swarmContext: {
                    goal: "Simulation Persistence",
                    tasks: [{ task: "Log Outcome", status: "completed" }],
                    finalSynthesis: event.outcome
                },
                tags: ['simulation', event.scenarioType],
                isImmutable: true
            }
        });
    } catch (e) {
        console.error("Failed to log simulation result to legacy ledger", e);
    }
}

export async function logGovernanceAction(event: GovernanceEvent) {
    console.log(`[LegacyLedger] Logging Governance Action: ${event.id}`);
    try {
        await prisma.legacyLedger.create({
            data: {
                userId: 'GOVERNANCE',
                title: `GOVERNANCE: ${event.proposalTitle}`,
                directive: `Action type: ${event.type}`,
                logic: JSON.stringify(event),
                swarmContext: {
                    goal: "Governance Record",
                    tasks: [{ task: "Log Proposal Outcome", status: "completed" }],
                    finalSynthesis: `Votes recorded for ${event.id}`
                },
                tags: ['governance', event.type],
                isImmutable: true
            }
        });
    } catch (e) {
        console.error("Failed to log governance action to legacy ledger", e);
    }
}

export async function logFiscalAction(event: FiscalEvent) {
    console.log(`[LegacyLedger] Logging Fiscal Action: ${event.id}`);
    try {
        await prisma.legacyLedger.create({
            data: {
                userId: 'FISCAL_COMMAND',
                title: `FISCAL: ${event.type} - ${event.targetNode}`,
                directive: `Autonomous reallocation of ${event.amount} ${event.currency || 'USD'}`,
                logic: JSON.stringify(event),
                swarmContext: {
                    goal: "Fiscal Swarm Synchronization",
                    tasks: [{ task: "Ledger Update", status: "completed" }],
                    finalSynthesis: `Resource liquidity optimized via ${event.type}`
                },
                tags: ['fiscal', event.type],
                isImmutable: true
            }
        });
    } catch (e) {
        console.error("Failed to log fiscal action to legacy ledger", e);
    }
}

export async function logMediaSynthesisArtifact(event: MediaSynthesisArtifactEvent) {
    console.log(`[LegacyLedger] Logging Media Artifact: ${event.id}`);
    try {
        await prisma.legacyLedger.create({
            data: {
                userId: 'MEDIA_HUB',
                title: `MEDIA: ${event.type} - ${event.title}`,
                directive: `Autonomous media synthesis for ${event.domain} deployment.`,
                logic: JSON.stringify(event),
                swarmContext: {
                    goal: "Media Provenance Tracking",
                    tasks: [{ task: "Cryptographic Hashing", status: "completed" }],
                    finalSynthesis: `Media artifact verified and pushed to district nodes.`
                },
                tags: ['media', event.type, event.domain],
                isImmutable: true
            }
        });
    } catch (e) {
        console.error("Failed to log media artifact to legacy ledger", e);
    }
}

export async function logCollectiveInsight(event: CollectiveKnowledgeEvent) {
    console.log(`[LegacyLedger] Logging Collective Insight: ${event.id}`);
    try {
        await prisma.legacyLedger.create({
            data: {
                userId: 'COLLECTIVE_INTELLIGENCE',
                title: `KNOWLEDGE: ${event.domain} - ${event.impact}`,
                directive: event.insight,
                logic: JSON.stringify(event),
                swarmContext: {
                    goal: "Collective Intelligence Aggregation",
                    tasks: [{ task: "Shared Knowledge Sync", status: "completed" }],
                    finalSynthesis: `Global IQ increased in ${event.domain}`
                },
                tags: ['intelligence', event.domain, event.impact],
                isImmutable: true
            }
        });
    } catch (e) {
        console.error("Failed to log collective insight to legacy ledger", e);
    }
}

export async function logCertificationEarned(event: ProfessionalCertificationEvent) {
    console.log(`[LegacyLedger] Logging Certification: ${event.id}`);
    try {
        await prisma.legacyLedger.create({
            data: {
                userId: event.userId,
                title: `CERTIFICATION: ${event.moduleTitle}`,
                directive: `User earned ${event.category} certification for module ${event.moduleId}`,
                logic: JSON.stringify({
                    userId: event.userId,
                    moduleId: event.moduleId,
                    category: event.category,
                    timestamp: event.timestamp,
                    systemHash: event.hash
                }),
                swarmContext: {
                    type: "ProfessionalDevelopment",
                    verified: true,
                    institutionalValue: "High"
                },
                tags: ['certification', event.category, 'professional'],
                isImmutable: true
            }
        });
    } catch (e) {
        console.error("Failed to log certification to legacy ledger", e);
    }
}

/**
 * Retrieves full cognitive context for a specific legacy entry.
 */
export async function fetchEntryDetails(entryId: string) {
    try {
        const entry = await prisma.legacyLedger.findUnique({
            where: { id: entryId }
        });
        return entry;
    } catch (error) {
        console.error('[PRISMA_ERROR] Failed to fetch legacy entry details:', error);
        return null;
    }
}

export interface ProfessionalCertificationEvent {
    id: string;
    userId: string;
    moduleId: string;
    moduleTitle: string;
    category: string;
    timestamp: string;
    hash: string;
}

export interface CollectiveKnowledgeEvent {
    id: string;
    domain: string;
    insight: string;
    confidence: number;
    impact: string;
    timestamp: string;
    originNode: string;
    hash: string;
}

export interface MediaSynthesisArtifactEvent {
    id: string;
    type: string;
    title: string;
    domain: string;
    timestamp: string;
    hash: string;
}

export interface FiscalEvent {
    id: string;
    type: 'REALLOCATION' | 'PROCUREMENT' | 'LIQUIDATION';
    sourceNode?: string;
    targetNode: string;
    amount: number;
    currency?: string;
    reason: string;
    timestamp: string;
    hash: string;
}

/**
 * Updates an existing entry with post-event outcomes and learnings.
 * Note: While the directive itself is immutable, the outcomes can be appended.
 */
export async function updateLegacyOutcome(entryId: string, outcome: string, learnings: string) {
    try {
        const result = await prisma.legacyLedger.update({
            where: { id: entryId },
            data: { outcome, learnings }
        });
        return result;
    } catch (error) {
        console.error('[PRISMA_ERROR] Failed to update legacy outcome:', error);
        return null;
    }
}
export interface MediaSynthesisEvent {
    type: 'podcast' | 'storyboard';
    id: string;
    title: string;
    description: string;
    timestamp: Date;
}

/**
 * Logs a media synthesis event to the legacy ledger for provenance tracking.
 */
export async function logMediaSynthesis(userId: string, event: MediaSynthesisEvent) {
    return recordStrategicDirective({
        userId,
        title: `Media Synthesis: ${event.title}`,
        strategicDirective: `Autonomous ${event.type} synthesis for educational deployment.`,
        decisionLogic: `Pedagogical media generated to support curriculum objectives. Type: ${event.type}, ID: ${event.id}`,
        swarmContext: {
            goal: "Media Synthesis Automation",
            tasks: [{ task: `Synthesize ${event.type}`, status: "completed" }],
            finalSynthesis: event.description
        },
        tags: ["Media", "Synthesis", event.type]
    });
}

export interface StaffingAssignmentEvent {
    id: string;
    fromStaffId: string;
    fromStaffName: string;
    toStaffId: string;
    toStaffName: string;
    transferredCount: number;
    logic: string;
    timestamp: string;
    hash: string;
}

/**
 * Logs a staffing reassignment event to the legacy ledger.
 */
export async function logStaffingChange(userId: string, event: StaffingAssignmentEvent) {
    console.log(`[LegacyLedger] Logging Staffing Change: ${event.id}`);
    try {
        await prisma.legacyLedger.create({
            data: {
                userId,
                title: `STAFFING: ${event.fromStaffName} -> ${event.toStaffName}`,
                directive: `Transferred ${event.transferredCount} caseload records due to capacity optimization.`,
                logic: event.logic,
                swarmContext: {
                    type: "WorkforceOptimization",
                    from: event.fromStaffId,
                    to: event.toStaffId,
                    hash: event.hash
                },
                tags: ['staffing', 'workforce', 'optimization'],
                isImmutable: true
            }
        });
    } catch (e) {
        console.error("Failed to log staffing change to legacy ledger", e);
    }
}

export interface OracleInsightEvent {
    id: string;
    query: string;
    reasoning: any[];
    forecast: any;
    timestamp: string;
    hash: string;
}

export interface UnitySynchronizationEvent {
    id: string;
    globalScore: number;
    nodeStatuses: any[];
    totalSwarms: number;
    timestamp: string;
    hash: string;
}

/**
 * Logs a strategic Oracle insight to the legacy ledger.
 */
export async function logOracleInsight(userId: string, event: OracleInsightEvent) {
    console.log(`[LegacyLedger] Logging Oracle Insight: ${event.id}`);
    try {
        await prisma.legacyLedger.create({
            data: {
                userId,
                title: `ORACLE INSIGHT: ${event.query.substring(0, 40)}...`,
                directive: `Strategic synthesis for "${event.query}". Confidence: ${event.forecast.confidence * 100}%`,
                logic: JSON.stringify({
                    reasoning: event.reasoning,
                    forecast: event.forecast,
                    hash: event.hash
                }),
                swarmContext: {
                    type: "SovereignOracle",
                    query: event.query,
                    impact: "Critical"
                },
                tags: ['oracle', 'strategy', 'reasoning', 'forecast'],
                isImmutable: true
            }
        });
    } catch (e) {
        console.error("Failed to log oracle insight to legacy ledger", e);
    }
}

/**
 * Logs a global unity synchronization event to the legacy ledger.
 */
export async function logUnitySync(userId: string, event: UnitySynchronizationEvent) {
    console.log(`[LegacyLedger] Logging Unity Sync: ${event.id}`);
    try {
        await prisma.legacyLedger.create({
            data: {
                userId,
                title: `UNITY SYNC: Global Health ${event.globalScore}%`,
                directive: `Total system synchronization across 12 nodes. Active Swarms: ${event.totalSwarms}`,
                logic: JSON.stringify({
                    nodeStatuses: event.nodeStatuses,
                    hash: event.hash
                }),
                swarmContext: {
                    type: "UnitySynchronization",
                    score: event.globalScore,
                    timestamp: event.timestamp
                },
                tags: ['unity', 'synchronization', 'global-health'],
                isImmutable: true
            }
        });
    } catch (e) {
        console.error("Failed to log unity sync to legacy ledger", e);
    }
}

// Global Ledger Interface for generic events
export const legacyLedger = {
    recordStrategicDirective,
    logSimulation,
    logGovernanceAction,
    logFiscalAction,
    logMediaSynthesisArtifact,
    logCollectiveInsight,
    logCertificationEarned,
    logMediaSynthesis,
    logStaffingChange,
    logOracleInsight,
    logUnitySync,
    logEvent: async (event: { id: string, type: string, timestamp: string, severity: string, description: string, metadata: any }) => {
        console.log(`[LegacyLedger] Generic Event: ${event.type} - ${event.id}`);
        try {
            await prisma.legacyLedger.create({
                data: {
                    userId: 'SYSTEM',
                    title: `${event.type}: ${event.id.substring(0, 8)}`,
                    directive: event.description,
                    logic: JSON.stringify(event.metadata),
                    swarmContext: {
                        goal: "System Resilience Log",
                        tasks: [{ task: "Audit Entry", status: "completed" }],
                        finalSynthesis: event.description
                    },
                    tags: ['system', event.type.toLowerCase()],
                    isImmutable: true
                }
            });
        } catch (e) {
            console.error("Failed to log generic event to legacy ledger", e);
        }
    }
};
