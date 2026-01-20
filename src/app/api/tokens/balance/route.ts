/**
 * EdIntel Professional - Token Balance API
 * Check balance and deduct tokens for AI usage
 * 
 * GET /api/tokens/balance?userId=xxx
 * POST /api/tokens/balance (deduct tokens)
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

/**
 * GET - Check user's token balance
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            );
        }

        // Get balance from user_balances table (real-time state)
        const { rows } = await sql`
      SELECT 
        ub.current_tokens,
        ub.lifetime_tokens_purchased,
        ub.lifetime_tokens_used,
        ub.updated_at,
        u.subscription_tier,
        u.subscription_status
      FROM user_balances ub
      JOIN users u ON ub.user_id = u.id
      WHERE ub.user_id = ${userId}
    `;

        if (rows.length === 0) {
            // User exists but no balance record yet - initialize
            await sql`
        INSERT INTO user_balances (user_id, current_tokens)
        VALUES (${userId}, 0)
        ON CONFLICT (user_id) DO NOTHING
      `;

            return NextResponse.json({
                currentTokens: 0,
                lifetimePurchased: 0,
                lifetimeUsed: 0,
                canUseAI: false,
                subscriptionTier: 'free',
                subscriptionStatus: 'inactive',
            });
        }

        const balance = rows[0];

        return NextResponse.json({
            currentTokens: balance.current_tokens,
            lifetimePurchased: balance.lifetime_tokens_purchased,
            lifetimeUsed: balance.lifetime_tokens_used,
            canUseAI: balance.current_tokens > 0,
            subscriptionTier: balance.subscription_tier,
            subscriptionStatus: balance.subscription_status,
            updatedAt: balance.updated_at,
        });
    } catch (error: any) {
        console.error('Error fetching balance:', error);
        return NextResponse.json(
            { error: 'Failed to fetch token balance' },
            { status: 500 }
        );
    }
}

/**
 * POST - Deduct tokens for AI usage
 */
export async function POST(request: NextRequest) {
    try {
        const {
            userId,
            amount = 1,
            transactionType,
            transactionSubtype,
            description,
            generationId,
            sessionId,
            metadata = {},
        } = await request.json();

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            );
        }

        if (!transactionType) {
            return NextResponse.json(
                { error: 'Transaction type is required' },
                { status: 400 }
            );
        }

        // Use the stored procedure to deduct tokens
        // This ensures atomic operation and prevents race conditions
        const { rows } = await sql`
      SELECT deduct_tokens_from_ledger(
        ${userId},
        ${amount},
        ${transactionType},
        ${transactionSubtype || null},
        ${description || null},
        ${generationId || null},
        ${sessionId || null},
        ${JSON.stringify(metadata)}::jsonb
      ) as success
    `;

        const success = rows[0].success;

        if (!success) {
            return NextResponse.json(
                {
                    error: 'Insufficient tokens',
                    message: 'Please purchase more tokens to continue using AI features',
                    needsRecharge: true,
                },
                { status: 402 } // Payment Required
            );
        }

        // Get updated balance
        const { rows: balanceRows } = await sql`
      SELECT current_tokens
      FROM user_balances
      WHERE user_id = ${userId}
    `;

        return NextResponse.json({
            success: true,
            tokensDeducted: amount,
            remainingTokens: balanceRows[0].current_tokens,
            transactionType,
        });
    } catch (error: any) {
        console.error('Error deducting tokens:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to deduct tokens' },
            { status: 500 }
        );
    }
}

/**
 * PATCH - Add tokens (for admin or bonus credits)
 */
export async function PATCH(request: NextRequest) {
    try {
        const {
            userId,
            amount,
            transactionType = 'ADMIN_CREDIT',
            description = 'Admin credit',
            metadata = {},
        } = await request.json();

        if (!userId || !amount) {
            return NextResponse.json(
                { error: 'User ID and amount are required' },
                { status: 400 }
            );
        }

        // Use the stored procedure to add tokens
        const { rows } = await sql`
      SELECT add_tokens_to_ledger(
        ${userId},
        ${amount},
        ${transactionType},
        ${description},
        NULL,
        ${JSON.stringify(metadata)}::jsonb
      ) as ledger_id
    `;

        // Get updated balance
        const { rows: balanceRows } = await sql`
      SELECT current_tokens
      FROM user_balances
      WHERE user_id = ${userId}
    `;

        return NextResponse.json({
            success: true,
            tokensAdded: amount,
            remainingTokens: balanceRows[0].current_tokens,
            ledgerId: rows[0].ledger_id,
        });
    } catch (error: any) {
        console.error('Error adding tokens:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to add tokens' },
            { status: 500 }
        );
    }
}
