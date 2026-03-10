/**
 * GovernanceEngine.ts
 * Core logic for Quadratic Voting and Proposal Management.
 */

export type ProposalType = 'FISCAL' | 'PEDAGOGICAL' | 'OPERATIONAL' | 'CONSTITUTIONAL';

export interface GovernanceProposal {
    id: string;
    title: string;
    description: string;
    type: ProposalType;
    options: string[];
    expiry: Date;
    status: 'ACTIVE' | 'PASSED' | 'FAILED' | 'VOID';
}

export interface VoteRecord {
    voterId: string;
    proposalId: string;
    choices: Record<string, number>; // optionId -> credits spent
    timestamp: Date;
}

export class GovernanceEngine {
    private static instance: GovernanceEngine;
    private proposals: GovernanceProposal[] = [];
    private votes: VoteRecord[] = [];

    private constructor() {
        // Seed some initial proposals
        this.proposals = [
            {
                id: 'prop_001',
                title: 'Meta-Curriculum Sovereignty Act',
                description: 'Enable 100% autonomous course-ware synthesis for Title I schools.',
                type: 'CONSTITUTIONAL',
                options: ['Approve', 'Reject', 'Amend'],
                expiry: new Date(Date.now() + 86400000 * 7),
                status: 'ACTIVE'
            },
            {
                id: 'prop_002',
                title: 'Swarm Resource Reallocation',
                description: 'Redirect 15% of compute power from administrative overhead to student tutoring.',
                type: 'FISCAL',
                options: ['Agree', 'Disagree', 'Wait'],
                expiry: new Date(Date.now() + 86400000 * 3),
                status: 'ACTIVE'
            }
        ];
    }

    public static getInstance(): GovernanceEngine {
        if (!GovernanceEngine.instance) {
            GovernanceEngine.instance = new GovernanceEngine();
        }
        return GovernanceEngine.instance;
    }

    public getActiveProposals(): GovernanceProposal[] {
        return this.proposals.filter(p => p.status === 'ACTIVE');
    }

    /**
     * Quadratic Voting Logic:
     * Cost = (Votes)^2
     * Votes = sqrt(Credits)
     */
    public calculateVoteWeight(credits: number): number {
        return Math.floor(Math.sqrt(Math.abs(credits)));
    }

    public castVote(record: VoteRecord): boolean {
        const proposal = this.proposals.find(p => p.id === record.proposalId);
        if (!proposal || proposal.status !== 'ACTIVE') return false;

        this.votes.push(record);
        return true;
    }

    public getParticipationStats(proposalId: string) {
        const relevantVotes = this.votes.filter(v => v.proposalId === proposalId);
        const totalCredits = relevantVotes.reduce((acc, v) =>
            acc + Object.values(v.choices).reduce((sum, c) => sum + c, 0), 0
        );

        const results: Record<string, number> = {};
        relevantVotes.forEach(v => {
            Object.entries(v.choices).forEach(([option, credits]) => {
                results[option] = (results[option] || 0) + this.calculateVoteWeight(credits);
            });
        });

        return {
            totalCredits,
            totalVotes: relevantVotes.length,
            weightedResults: results
        };
    }
}
