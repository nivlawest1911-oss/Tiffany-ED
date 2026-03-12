'use server';

import { prisma } from '@/lib/prisma';
import { UserRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { login } from '@/lib/auth';

interface OnboardingData {
  organizationName: string;
  adminEmail: string;
  adminName: string;
  password?: string;
  districtId?: string;
  initialTokenBalance?: number;
}

/**
 * onboardOrganization
 * 
 * Handles enterprise-grade organization onboarding in a single transaction.
 * 1. Creates a School/District record with signup fee status.
 * 2. Creates the Admin User account.
 * 3. Enforces a strict 30-day trial period.
 * 4. Initializes the Token Wallet with a starting balance.
 * 5. Automatically logs the user in.
 */
export async function onboardOrganization(data: OnboardingData) {
  const { organizationName, adminEmail, adminName, password, districtId, initialTokenBalance = 50 } = data;

  let hashedPassword = null;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  try {
    const transactionResult = await prisma.$transaction(async (tx) => {
      // 1. Create the School (Organization)
      const school = await tx.school.create({
        data: {
          name: organizationName,
          ...(districtId && { districtName: districtId }),
        },
      });

      // 2. Calculate Trial Expiration (Exactly 30 days from now)
      const now = new Date();
      const trialDurationDays = 30;
      const trialEndsAt = new Date(now.getTime() + trialDurationDays * 24 * 60 * 60 * 1000);

      // 3. Create the Admin User
      const user = await tx.user.create({
        data: {
          email: adminEmail,
          name: adminName,
          password: hashedPassword,
          role: UserRole.ADMIN,
          schoolId: school.id,
          trialStartedAt: now,
          trialEndsAt: trialEndsAt,
          isTrialConverted: false,
        },
      });

      // 4. Create the Subscription record
      await tx.subscription.create({
        data: {
          schoolId: school.id,
          status: 'TRIALING',
          signupFeePaid: true,
          trialStartedAt: now,
          trialEndsAt: trialEndsAt,
        },
      });

      // 5. Initialize Token Economics
      const wallet = await tx.tokenWallet.create({
        data: {
          userId: user.id,
          balance: initialTokenBalance,
          monthlyLimit: 1000,
          requiresUpsell: false,
        },
      });

      await tx.tokenLedger.create({
        data: {
          userId: user.id,
          walletId: wallet.id,
          amount: initialTokenBalance,
          type: 'CREDIT',
          description: 'Initial trial seeding',
        },
      });

      return {
        success: true,
        schoolId: school.id,
        userId: user.id,
        userEmail: user.email,
        userName: user.name || 'Admin',
        trialEndsAt,
      };
    });

    // 6. Automatic Login
    if (transactionResult.success) {
        await login({
            id: transactionResult.userId,
            email: transactionResult.userEmail,
            name: transactionResult.userName,
            tier: 'Director Pack' // Admin gets high tier status by default
        });
    }

    return transactionResult;

  } catch (error: any) {
    console.error('Onboarding Transaction Failed:', error);
    throw new Error(`Onboarding failed: ${error.message}`);
  }
}
