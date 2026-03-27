'use server';

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function getSovereignStatus() {
  const session = await getSession();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const userId = session.user.id;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      district: true,
      trialEndsAt: true,
      schoolRelation: {
        select: { name: true }
      },
      tokenWallet: {
        select: { balance: true }
      }
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  const now = new Date();
  const trialEndsAt = user.trialEndsAt ? new Date(user.trialEndsAt) : null;
  let daysRemaining = 0;

  if (trialEndsAt && trialEndsAt > now) {
    const diffMs = trialEndsAt.getTime() - now.getTime();
    daysRemaining = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
  }

  return {
    userName: user.name || 'Executive',
    organizationName: user.schoolRelation?.name || user.district || 'Unassigned Node',
    trialDaysRemaining: daysRemaining,
    tokenBalance: user.tokenWallet?.balance || 0,
  };
}
