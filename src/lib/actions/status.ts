'use server';

import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function getSovereignStatus() {
  try {
    const session = await getSession();
    if (!session?.user?.id) {
      return null; // Return null instead of throwing to avoid 500s in dashboard client components
    }

    const userId = session.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        schoolRelation: true,
        tokenWallet: true,
      },
    });

    if (!user) {
      return null;
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
  } catch (error) {
    console.error('[STATUS_ACTION] Sovereign Status Protocol Failed:', error);
    return null;
  }
}
