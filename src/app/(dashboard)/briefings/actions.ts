'use server';

import { cookies } from 'next/headers';
import { TokenService } from '@/lib/services/token-service';
import { sql } from '@/lib/db';
import { revalidatePath } from 'next/cache';

/**
 * Checks if a user has already unlocked a specific briefing's deep dive.
 */
export async function isBriefingUnlocked(userId: string, slug: string): Promise<boolean> {
    try {
        const { rows } = await sql`
            SELECT id FROM token_ledger 
            WHERE user_id = ${userId} 
            AND transaction_type = 'DEBIT'
            AND description = ${`Unlock Intelligence Briefing Data: ${slug}`}
            LIMIT 1
        `;
        return rows.length > 0;
    } catch (error) {
        console.error('[BriefingActions] Failed to check unlock state:', error);
        return false;
    }
}

/**
 * Deducts 1 token to unlock a briefing's deep dive report.
 */
export async function unlockBriefingData(slug: string) {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session');
    
    if (!sessionCookie) {
        return { success: false, error: 'Authentication Required' };
    }

    try {
        // Simple mock of getting user ID from session. 
        // In this app, the /api/auth/me usually provides the user.
        // We'll fetch the user from the database based on the session or email if possible.
        // For now, we'll use the API approach or a direct DB lookup if we had the session mapping.
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/me`, {
            headers: { Cookie: `session=${sessionCookie.value}` }
        });
        const { user } = await res.json();

        if (!user || !user.id) {
            return { success: false, error: 'Invalid Session' };
        }

        // Check if already unlocked
        const alreadyUnlocked = await isBriefingUnlocked(user.id, slug);
        if (alreadyUnlocked) {
            return { success: true, alreadyUnlocked: true };
        }

        // Deduct 1 token
        const success = await TokenService.deductTokens(user.id, 1, {
            transactionType: 'DEBIT',
            description: `Unlock Intelligence Briefing Data: ${slug}`
        }, user.tier);

        if (!success) {
            return { success: false, error: 'Insufficient Usage Tokens' };
        }

        revalidatePath(`/briefings/${slug}`);
        revalidatePath(`/briefings/${slug}/data`);
        
        return { success: true };
    } catch (error: any) {
        console.error('[BriefingActions] Unlock failed:', error);
        return { success: false, error: error.message || 'Briefing Linkage Failed' };
    }
}
