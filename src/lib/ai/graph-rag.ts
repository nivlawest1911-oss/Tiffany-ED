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
        const rootNode = await prisma.graph_nodes.findFirst({
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

        const edges = await prisma.graph_edges.findMany({
            where: {
                OR: [
                    { sourceId: nodeId },
                    { targetId: nodeId }
                ]
            },
            include: {
                graph_nodes_graph_edges_sourceIdTograph_nodes: true,
                graph_nodes_graph_edges_targetIdTograph_nodes: true
            }
        });

        const results: any[] = edges.map((edge: any) => ({
            type: edge.type,
            target: edge.sourceId === nodeId 
                ? edge.graph_nodes_graph_edges_targetIdTograph_nodes 
                : edge.graph_nodes_graph_edges_sourceIdTograph_nodes
        }));

        // Recursive step for deeper hops
        if (depth > 1) {
            for (const res of results) {
                if (res.target && res.target.id) {
                    const subContext = await this.traverse(res.target.id, depth - 1);
                    res.subContext = subContext;
                }
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
            if (rel.target) {
                summaryLines.push(`- ${rel.type} -> ${rel.target.name} (${rel.target.label})`);
                if (rel.subContext) {
                    rel.subContext.forEach((sub: any) => {
                        if (sub.target) {
                            summaryLines.push(`  - [Secondary] ${sub.type} -> ${sub.target.name}`);
                        }
                    });
                }
            }
        });

        return summaryLines.join('\n');
    }
}
