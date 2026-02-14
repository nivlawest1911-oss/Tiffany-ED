import { prisma } from '@/lib/prisma';

/**
 * Sovereign Web: GraphRAG Implementation
 * Enables relational intelligence by traversing nodes and edges.
 */

export class SovereignGraph {
    /**
     * Finds related entities based on a starting node and a depth.
     * This is the 'Digital Twin' traversal logic.
     */
    static async getContext(nodeName: string, depth: number = 2) {
        console.log(`[Sovereign-Web] Traversing Graph for: ${nodeName} (Depth: ${depth})`);

        // 1. Find the starting node (hybrid search: exact name or semantic could be used)
        const rootNode = await prisma.graphNode.findFirst({
            where: {
                name: {
                    contains: nodeName,
                    mode: 'insensitive'
                }
            }
        });

        if (!rootNode) return null;

        // 2. Perform BFS/DFS style traversal (implemented via recursive Prisma queries for now)
        // In production, this would be a raw SQL CTE or a dedicated graph DB query.
        const relationships = await this.traverse(rootNode.id, depth);

        return {
            root: rootNode,
            relationships
        };
    }

    private static async traverse(nodeId: string, depth: number) {
        if (depth <= 0) return [];

        const edges = await prisma.graphEdge.findMany({
            where: {
                OR: [
                    { sourceId: nodeId },
                    { targetId: nodeId }
                ]
            },
            include: {
                source: true,
                target: true
            }
        });

        const results: any[] = edges.map((edge: any) => ({
            type: edge.type,
            target: edge.sourceId === nodeId ? edge.target : edge.source
        }));

        // Recursive step for deeper hops
        if (depth > 1) {
            for (const res of results) {
                const subContext = await this.traverse(res.target.id, depth - 1);
                res.subContext = subContext;
            }
        }

        return results;
    }

    /**
     * Synthesizes the graph context into a readable transcript for LLM grounding.
     */
    static summarizeContext(context: any): string {
        if (!context) return "No relational evidence found.";

        const summaryLines = [`Relational Context for ${context.root.name} (${context.root.label}):`];

        context.relationships.forEach((rel: any) => {
            summaryLines.push(`- ${rel.type} -> ${rel.target.name} (${rel.target.label})`);
            if (rel.subContext) {
                rel.subContext.forEach((sub: any) => {
                    summaryLines.push(`  - [Secondary] ${sub.type} -> ${sub.target.name}`);
                });
            }
        });

        return summaryLines.join('\n');
    }
}
