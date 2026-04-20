'use server';

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export type IepGenerationResult = 
  | { success: true; newBalance: number }
  | { success: false; error: 'UNAUTHORIZED' | 'LOW_TOKENS' | 'TRANSACTION_FAILED'; message: string };

/**
 * generateIEPWithToken
 * 
 * Securely deducts 1 Neural Token and records the intent to generate an IEP.
 * Performs all operations within a Prisma transaction to ensure integrity.
 */
export async function generateIEPWithToken(studentName: string) {
  const session = await getSession();
  if (!session?.user?.id) {
    return { success: false, error: 'UNAUTHORIZED', message: 'Authentication required.' };
  }

  const userId = session.user.id;

  try {
    const result = await prisma.$transaction(async (tx: any) => {
      // 1. Locate and Lock the TokenWallet
      const wallet = await tx.tokenWallet.findUnique({
        where: { userId },
      });

      if (!wallet || wallet.balance <= 0) {
        return { success: false, error: 'LOW_TOKENS', message: 'Neural Token balance depleted.' };
      }

      // 2. Deduct 1 Token
      const updatedWallet = await tx.tokenWallet.update({
        where: { id: wallet.id },
        data: {
          balance: { decrement: 1 },
          tokensUsedToday: { increment: 1 },
          tokensUsedThisMonth: { increment: 1 },
        },
      });

      // 3. Record in TokenLedger
      await tx.tokenLedger.create({
        data: {
          userId,
          walletId: wallet.id,
          amount: -1,
          type: 'DEBIT',
          description: `IEP Generation for ${studentName}`,
        },
      });

      // 4. Archive in DocumentVault (VaultDocument)
      await tx.vaultDocument.create({
        data: {
          userId,
          fileName: `IEP_Record_${studentName.replace(/\s+/g, '_')}_${Date.now()}.json`,
          fileSize: 0, // Metadata only for now
          fileType: 'application/json',
          storagePath: 'internal://generation-ref',
          securityLevel: 'confidential',
          tags: ['IEP', 'AI_GENERATED'],
        },
      });

      return { success: true, newBalance: updatedWallet.balance };
    });

    if (result.success) {
      // 5. Instantly refresh the Dashboard Status
      revalidatePath('/dashboard');
    }

    return result as IepGenerationResult;

  } catch (error: any) {
    console.error('IEP Token Transaction Failed:', error);
    return { 
      success: false, 
      error: 'TRANSACTION_FAILED', 
      message: 'Neural link interrupted during transaction.' 
    };
  }
}
