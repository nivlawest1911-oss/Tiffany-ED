import { NextRequest, NextResponse } from "next/server";
import { validateLTI13Launch } from "@/lib/lti/validate-launch";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
import { UserRole } from "@/generated/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const userAgent = request.headers.get("user-agent") || "unknown";
    const ipAddress = request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";

    const launchResult = await validateLTI13Launch(request);

    if (!launchResult.valid || !launchResult.claims) {
      console.error("[LTI Launch] Cryptographic validation failed:", launchResult.error);
      return new NextResponse(
        `<html>
          <body style="background-color: #060A16; color: #f87171; font-family: sans-serif; padding: 40px; text-align: center;">
            <div style="max-width: 500px; margin: 0 auto; border: 1px solid rgba(239, 68, 68, 0.2); background: rgba(239, 68, 68, 0.05); padding: 30px; border-radius: 20px; backdrop-filter: blur(10px);">
              <h2 style="font-size: 24px; margin-bottom: 10px;">LTI Handshake Failed</h2>
              <p style="color: rgba(255,255,255,0.7); line-height: 1.6; font-size: 14px;">${launchResult.error || "Launch token is invalid or platform public keystore could not be resolved."}</p>
              <div style="margin-top: 20px;"><a href="/login" style="color: #f59e0b; text-decoration: none; font-weight: bold; font-size: 14px;">Return to Login</a></div>
            </div>
          </body>
        </html>`,
        {
          status: 400,
          headers: { "Content-Type": "text/html" },
        }
      );
    }

    const { claims } = launchResult;
    const resourceLinkId = launchResult.resourceLinkId;
    const deploymentId = launchResult.deploymentId;
    
    // Resolve email, name, and role from claims
    const email = (claims.email || `${claims.sub}@lti.platform.com`).toLowerCase().trim();
    const name = claims.name || "LTI User";
    
    // Map internalRole to UserRole enum
    let role: UserRole = UserRole.TEACHER;
    if (claims.internalRole === "ADMIN") {
      role = UserRole.ADMIN;
    } else if (claims.internalRole === "STUDENT") {
      role = UserRole.STUDENT;
    }

    // Dynamic User Upsert: Resolve or Register Educator/Student
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Register new user
      const newUserId = randomUUID();
      user = await prisma.user.create({
        data: {
          id: newUserId,
          email,
          name,
          role,
          subscription_tier: role === UserRole.STUDENT ? "free" : "enterprise", // Grant enterprise tier to educators launching via LTI
          subscription_status: "active",
          is_active: true,
          updated_at: new Date(),
          created_at: new Date(),
          trial_started_at: new Date(),
        },
      });
      
      // Also register corresponding account record with providerId: 'lti'
      await prisma.account.create({
        data: {
          id: `lti-account-${newUserId}`,
          userId: newUserId,
          accountId: claims.sub,
          providerId: "lti",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      });
      
      console.log(`[LTI Launch] Provisioned new User (${email}) and linked LTI account.`);
    } else {
      // Update existing user properties if needed
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: user.name || name, // keep existing name or use incoming
          role: user.role === UserRole.TEACHER && role === UserRole.ADMIN ? UserRole.ADMIN : user.role, // Upgrade to admin if necessary
          updated_at: new Date(),
        },
      });
    }

    // Programmatically Establish Better Auth Session in the DB
    const sessionId = randomUUID();
    const sessionToken = randomUUID().replace(/-/g, "") + randomUUID().replace(/-/g, ""); // 64-char hex token
    const maxAge = 60 * 60 * 24 * 7; // 7 days
    const expiresAt = new Date(Date.now() + maxAge * 1000);

    await prisma.session.create({
      data: {
        id: sessionId,
        userId: user.id,
        token: sessionToken,
        expiresAt,
        createdAt: new Date(),
        updatedAt: new Date(),
        ipAddress,
        userAgent,
      },
    });

    // Construct Redirect Response
    const targetUrl = new URL("/the-room", request.url);
    const response = NextResponse.redirect(targetUrl);

    // Set Better Auth Cookie Attributes
    const isProd = process.env.NODE_ENV === "production";
    const cookieOptions = {
      httpOnly: true,
      secure: isProd,
      path: "/",
      sameSite: "lax" as const,
      maxAge,
    };

    // Set both regular and secure token cookies to guarantee middleware detection
    response.cookies.set("better-auth.session_token", sessionToken, cookieOptions);
    if (isProd) {
      response.cookies.set("__Secure-better-auth.session_token", sessionToken, {
        ...cookieOptions,
        secure: true,
      });
    }

    console.log(`[LTI Launch] Handshake completed successfully. Established session for ${email}`);
    return response;
  } catch (error: any) {
    console.error("[LTI Launch] Handshake Error:", error);
    return new NextResponse(
      `<html>
        <body style="background-color: #060A16; color: #f87171; font-family: sans-serif; padding: 40px; text-align: center;">
          <div style="max-width: 500px; margin: 0 auto; border: 1px solid rgba(239, 68, 68, 0.2); background: rgba(239, 68, 68, 0.05); padding: 30px; border-radius: 20px; backdrop-filter: blur(10px);">
            <h2 style="font-size: 24px; margin-bottom: 10px;">Internal Server Error</h2>
            <p style="color: rgba(255,255,255,0.7); line-height: 1.6; font-size: 14px;">${error.message || "An unexpected error occurred during LTI validation."}</p>
            <div style="margin-top: 20px;"><a href="/login" style="color: #f59e0b; text-decoration: none; font-weight: bold; font-size: 14px;">Return to Login</a></div>
          </div>
        </body>
      </html>`,
      {
        status: 500,
        headers: { "Content-Type": "text/html" },
      }
    );
  }
}
