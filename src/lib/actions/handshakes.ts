"use server";

import { headers } from 'next/headers';

/**
 * executeSocialUplink
 * 
 * Cleanly isolated server action for social authentication 
 * to prevent top-level module leakage.
 */
import { verifyTurnstileToken } from '@/lib/turnstile';
import { logAuditEvent, AuditCategory, AuditAction } from '@/lib/audit';

/**
 * executeSocialUplink
 * 
 * Cleanly isolated server action for social authentication 
 * to prevent top-level module leakage.
 */
export async function executeSocialUplink(provider: 'google' | 'facebook', turnstileToken?: string) {
    // 0. Check if the provider is configured
    const providerEnvCheck = {
        google: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
        facebook: !!(process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET),
    };
    
    if (!providerEnvCheck[provider]) {
        return { 
            success: false, 
            error: `${provider.charAt(0).toUpperCase() + provider.slice(1)} authentication is not configured. Please contact your administrator.` 
        };
    }

    // 1. Mandatory Human Residency Check
    if (!turnstileToken) {
        return { success: false, error: "Human verification (Turnstile) is required." };
    }
    
    const isVerified = await verifyTurnstileToken(turnstileToken);
    if (!isVerified) {
        return { success: false, error: "Security Protocol: Human verification failed." };
    }

    const { auth } = await import('@/lib/auth');
    try {
        const result = await auth.api.signInSocial({
            headers: await headers(),
            body: {
                provider,
                callbackURL: '/dashboard',
            }
        });
        
        return { 
            success: true, 
            url: result.url 
        };
    } catch (error: any) {
        console.error('[Handshake] Social Uplink Failed:', error);
        return { success: false, error: error.message || "Neural handshake interrupted." };
    }
}

/**
 * executeEmailUplink
 * 
 * Cleanly isolated server action for email authentication.
 */
export async function executeEmailUplink(data: { email: string; password?: string; name?: string; type: 'signIn' | 'signUp'; turnstileToken?: string }) {
    const { auth } = await import('@/lib/auth');
    try {
        const headerList = await headers();

        // 1. Mandatory Human Residency Check
        if (!data.turnstileToken) {
            return { success: false, error: "Human verification (Turnstile) is required." };
        }
        
        const isVerified = await verifyTurnstileToken(data.turnstileToken);
        if (!isVerified) {
            return { success: false, error: "Security Protocol: Human verification failed." };
        }
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
            // 2. Institutional Audit Logging
            await logAuditEvent({
                userId: result.user.id,
                category: AuditCategory.AUTHENTICATION,
                action: data.type === 'signIn' ? AuditAction.SIGN_IN : AuditAction.SIGN_UP,
                label: `Email Uplink: ${data.email}`,
                ipAddress: headerList.get('x-forwarded-for')?.split(',')[0] || undefined,
                userAgent: headerList.get('user-agent') || undefined,
                metadata: {
                    type: data.type,
                    provider: 'email'
                }
            });

            // Trigger profile synchronization
            if (data.type === 'signUp') {
                try {
                    const { uplinkUserProfile } = await import('@/lib/uplink');
                    await uplinkUserProfile(result.user.id, {
                        email: result.user.email,
                        name: result.user.name,
                    });
                } catch (e) {
                    console.error('[Handshake] Profile sync deferred:', e);
                }
            }
            return { success: true };
        }

        return { success: false, error: "Authentication signature invalid." };
    } catch (error: any) {
        console.error('[Handshake] Email Uplink Failed:', error);
        return { success: false, error: error.message || "Manual uplink failed." };
    }
}

/**
 * onboardOrganization
 * 
 * Handles enterprise-grade organization onboarding in a single transaction.
 */
export async function onboardOrganization(data: {
  organizationName: string;
  adminEmail: string;
  adminName: string;
  password?: string;
  districtId?: string;
  initialTokenBalance?: number;
}) {
  const { prisma } = await import('@/lib/prisma');
  const { UserRole } = await import('@/generated/prisma');
  const bcrypt = await import('bcryptjs');
  
  const { organizationName, adminEmail, adminName, password, districtId, initialTokenBalance = 50 } = data;

  let hashedPassword = null;
  if (password) {
    hashedPassword = await bcrypt.default.hash(password, 10);
  }

  try {
    const transactionResult = await prisma.$transaction(async (tx: any) => {
      // 1. Create the School (Organization)
      const school = await tx.school.create({
        data: {
          name: organizationName,
          ...(districtId && { districtName: districtId }),
        },
      });

      // 2. Calculate Trial Expiration
      const now = new Date();
      const trialEndsAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

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
          stripeSubscriptionId: `trial_${school.id}`,
          stripePriceId: 'trial_free',
          currentPeriodStart: now,
          currentPeriodEnd: trialEndsAt,
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

    return transactionResult;

  } catch (error: any) {
    console.error('[Handshake] Onboarding Failed:', error);
    return { 
        success: false, 
        error: error.message || 'The sovereign node could not be initialized.' 
    };
  }
}
