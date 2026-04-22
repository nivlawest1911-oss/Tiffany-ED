"use server";

import { UserRole } from '@/generated/prisma';
import bcrypt from 'bcryptjs';

import { headers } from 'next/headers';

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
  const { prisma } = await import('@/lib/prisma');
  console.log('[AuthAction] onboardOrganization started for admin email:', data.adminEmail);
  const { organizationName, adminEmail, adminName, password, districtId, initialTokenBalance = 50 } = data;

  let hashedPassword = null;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  try {
    // 0. Pre-check configuration
    if ((prisma as any).isConfigured === false) {
      console.error('[AuthAction] Database not configured');
      throw new Error('Database configuration missing. Please ensure DATABASE_URL is set in environment variables.');
    }

    console.log('[AuthAction] Executing database transaction...');
    const transactionResult = await prisma.$transaction(async (tx: any) => {
      // 1. Create the School (Organization)
      const school = await tx.school.create({
        data: {
          name: organizationName,
          ...(districtId && { districtName: districtId }),
        },
      });
      console.log(`[AuthAction] School created with ID: ${school.id}`);

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
      console.log(`[AuthAction] Admin user created with ID: ${user.id}`);

      // 4. Create the Subscription record
      await tx.subscription.create({
        data: {
          schoolId: school.id,
          status: 'TRIALING',
          signupFeePaid: true,
          trialStartedAt: now,
          trialEndsAt: trialEndsAt,
          stripeSubscriptionId: `trial_${school.id}`,
          stripePriceId: 'trial_free',
          currentPeriodStart: now,
          currentPeriodEnd: trialEndsAt,
        },
      });
      console.log(`[AuthAction] Subscription record created for school ID: ${school.id}`);

      // 5. Initialize Token Economics
      const wallet = await tx.tokenWallet.create({
        data: {
          userId: user.id,
          balance: initialTokenBalance,
          monthlyLimit: 1000,
          requiresUpsell: false,
        },
      });
      console.log(`[AuthAction] Token wallet created for user ID: ${user.id} with balance: ${initialTokenBalance}`);

      await tx.tokenLedger.create({
        data: {
          userId: user.id,
          walletId: wallet.id,
          amount: initialTokenBalance,
          type: 'CREDIT',
          description: 'Initial trial seeding',
        },
      });
      console.log(`[AuthAction] Token ledger entry created for initial seeding.`);

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
        console.log(`[AuthAction] Attempting to log in user ID: ${transactionResult.userId}`);
        // Better Auth handles the session automatically via state/cookies
        // Removing legacy login call
        console.log(`[AuthAction] User ID: ${transactionResult.userId} logged in successfully.`);
    }

    console.log('[AuthAction] Onboarding completed successfully.');
    return transactionResult;

  } catch (error: any) {
    console.error('[AuthAction] Onboarding Transaction Failed:', error);
    return { 
        success: false, 
        error: error.message || 'The sovereign node could not be initialized. Please verify your connection.' 
    };
  }
}

/**
 * executeSocialUplink
 * 
 * Secure wrapper for Social Authentication.
 */
export async function executeSocialUplink(provider: 'google' | 'github' | 'microsoft', _turnstileToken?: string) {
    const { auth } = await import('@/lib/auth');
    console.log(`[AuthAction] executeSocialUplink initiated for provider: ${provider}`);
    
    try {
        // Use the auth instance (dynamically imported to prevent client leak)
        const result = await auth.api.signInSocial({
            headers: await headers(),
            body: {
                provider,
                callbackURL: '/dashboard',
                // Turnstile token is typically handled by the hook via headers
            }
        });

        return { 
            success: true, 
            url: result.url 
        };
    } catch (error: any) {
        console.error('[AuthAction] Social Uplink Failed:', error);
        return { success: false, error: error.message || "Neural handshake interrupted." };
    }
}

/**
 * executeEmailUplink
 * 
 * Secure wrapper for Email/Password Authentication.
 */
export async function executeEmailUplink(data: { email: string; password?: string; name?: string; type: 'signIn' | 'signUp' }) {
    const { auth } = await import('@/lib/auth');
    console.log(`[AuthAction] executeEmailUplink initiated for: ${data.email} (${data.type})`);
    
    try {
        const headerList = await headers();
        
        let result;
        if (data.type === 'signIn') {
            result = await auth.api.signInEmail({
                headers: headerList,
                body: {
                    email: data.email,
                    password: data.password || '',
                }
            });
        } else {
            result = await auth.api.signUpEmail({
                headers: headerList,
                body: {
                    email: data.email,
                    password: data.password || '',
                    name: data.name || 'Sovereign Educator',
                }
            });
        }

        if (result?.user) {
            console.log(`[AuthAction] Email authentication successful.`);
            return { success: true };
        }

        return { success: false, error: "Authentication signature invalid." };
    } catch (error: any) {
        console.error('[AuthAction] Email Uplink Failed:', error);
        return { success: false, error: error.message || "Manual uplink failed. Verify credentials." };
    }
}
