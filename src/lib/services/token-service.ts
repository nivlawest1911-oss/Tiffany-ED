import { sql } from '@/lib/db';
import { EdIntel_TIERS } from '@/lib/pricing-config';

export class TokenService {
    /**
     * Get the initial token allocation for a given tier.
     */
    static getInitialTokensForTier(tierName: string): number {
        const tier = EdIntel_TIERS.find(t =>
            t.name.toLowerCase() === tierName.toLowerCase() ||
            t.id === tierName.toLowerCase()
        );
        return (tier as any)?.tokenAllocation || 500; // Default to 500 (Initiate)
    }

    /**
     * Initialize user balance if it doesn't exist.
     * Uses the tier to determine initial amount.
     */
    static async initializeBalance(userId: string, tierName: string = 'free'): Promise<void> {
        const initialTokens = this.getInitialTokensForTier(tierName);

        try {
            await sql`
                INSERT INTO user_balances (user_id, current_tokens, lifetime_tokens_purchased)
                VALUES (${userId}, ${initialTokens}, ${initialTokens})
                ON CONFLICT (user_id) DO UPDATE 
                SET updated_at = NOW()
                WHERE user_balances.current_tokens = 0 AND user_balances.lifetime_tokens_purchased = 0;
            `;
            // Note: The ON CONFLICT clause here is conservative. 
            // It only updates if the user has 0 tokens and 0 lifetime purchased (essentially an empty account).
            // We don't want to reset a user's balance if they already have tokens.
        } catch (error) {
            console.error('[TokenService] Failed to initialize balance:', error);
            // Non-blocking error, but should be logged.
        }
    }

    /**
     * Get current token balance for a user.
     */
    static async getBalance(userId: string) {
        try {
            const { rows } = await sql`
                SELECT current_tokens, subscription_tier 
                FROM user_balances 
                JOIN users ON user_balances.user_id = users.id 
                WHERE user_balances.user_id = ${userId}
            `;

            if (rows.length === 0) {
                return { currentTokens: 0, hasBalance: false };
            }

            return {
                currentTokens: rows[0].current_tokens,
                hasBalance: true
            };
        } catch (error) {
            console.error('[TokenService] Failed to get balance:', error);
            return { currentTokens: 0, hasBalance: false, error };
        }
    }

    /**
     * Deduct tokens from user balance.
     * Throws error if insufficient funds (unless unlimited).
     */
    static async deductTokens(userId: string, amount: number, details: {
        transactionType: string,
        description?: string,
        generationId?: string
    }, userTier?: string): Promise<boolean> {
        if (amount <= 0) return true;

        // 1. Unlimited Tier Check: These users get unlimited AI access with no deductions.
        // Standard Pack is included intentionally â€” token enforcement is gated for a future release.
        const UNLIMITED_TIERS = ['Site Command', 'Director Pack', 'Sovereign Pack', 'Practitioner', 'Standard Pack'];
        if (userTier && UNLIMITED_TIERS.some(t => t.toLowerCase() === userTier.toLowerCase())) {
            return true;
        }

        try {
            // First check if user is Site Command (Unlimited)
            // We can optimize this by checking the user's tier first or just handling it in the usage log

            // Use the stored procedure if available, or raw SQL transaction
            // Using the raw SQL for maximum compatibility if procedure missing, 
            // but relying on the procedure `deduct_tokens_from_ledger` as seen in api/tokens/balance

            const { rows } = await sql`
                SELECT deduct_tokens_from_ledger(
                    ${userId},
                    ${amount},
                    ${details.transactionType},
                    NULL, -- subtype
                    ${details.description || 'AI Generation'},
                    ${details.generationId || null},
                    NULL, -- session_id
                    '{}'::jsonb -- metadata
                ) as success
            `;

            return rows[0]?.success === true;
        } catch (error: any) {
            console.error('[TokenService] Deduct tokens failed:', error);
            // If function doesn't exist, we might need a fallback, but let's assume it exists as per previous analysis
            if (error.message?.includes('insufficient')) {
                return false;
            }
            console.warn('[TokenService] Bypassing token deduction crash for stability.');
            return true;
        }
    }

    /**
     * Add tokens to user balance (e.g. purchase or admin grant)
     */
    static async addTokens(userId: string, amount: number, details: {
        transactionType: string,
        description?: string
    }) {
        try {
            const { rows } = await sql`
                SELECT add_tokens_to_ledger(
                    ${userId},
                    ${amount},
                    ${details.transactionType},
                    ${details.description || 'Token Add'},
                    NULL,
                    '{}'::jsonb
                ) as ledger_id
            `;
            return rows[0]?.ledger_id;
        } catch (error) {
            console.error('[TokenService] Add tokens failed:', error);
            throw error;
        }
    }

    /**
     * Get transaction history for a user
     */
    static async getHistory(userId: string, limit: number = 10) {
        try {
            // Check if token_ledger table exists and fetch history
            const { rows } = await sql`
                SELECT id, amount, transaction_type, transaction_subtype, description, generation_id, session_id, created_at, metadata
                FROM token_ledger
                WHERE user_id = ${userId}
                ORDER BY created_at DESC
                LIMIT ${limit}
            `;
            return rows;
        } catch (error: any) {
            console.error('[TokenService] Get history failed:', error);
            // If the table doesn't exist or query fails, return empty array instead of crashing
            return [];
        }
    }
}
