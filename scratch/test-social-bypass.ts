import dotenv from "dotenv";
// Load environment variables
dotenv.config();
(process.env as any).NODE_ENV = "development";

import { hashPassword } from "@better-auth/utils/password";
import { randomUUID } from "crypto";
import { prisma } from "../src/lib/prisma";

async function testBypass() {
    console.log("Starting Social Login Bypass Test...");
    console.log("DATABASE_URL in process.env:", process.env.DATABASE_URL);

    const { auth } = await import("../src/lib/auth");
    const { UserRole } = await import("../src/generated/prisma");

    console.log("Better Auth Database Option:", auth.options.database ? "Prisma Adapter Configured" : "UNDEFINED / In-Memory Fallback");
    const demoEmail = "demo.google.educator@edintel.ai";
    const demoName = "Dr. Terry Google (Demo)";
    const demoPassword = "DemoSovereignPassword2026!";
    const provider = "google";

    // 1. Run direct DB upsert
    console.log("\n[1] Running direct database upsert...");
    let user;
    try {
        const hashedPassword = await hashPassword(demoPassword);
        user = await prisma.user.upsert({
            where: { email: demoEmail },
            update: {
                password: hashedPassword,
                updated_at: new Date()
            },
            create: {
                id: randomUUID(),
                email: demoEmail,
                password: hashedPassword,
                name: demoName,
                role: UserRole.SUPERINTENDENT,
                school_site: "Sovereign Demonstration Academy",
                position: "Demo Superintendent",
                subscription_tier: "enterprise",
                subscription_status: "active",
                is_active: true,
                updated_at: new Date()
            }
        });
        console.log("✅ DB User Upsert successful. User record:", user);

        // Better Auth credentials provider requires a corresponding account record with providerId: 'credential'
        const accountId = demoEmail; // Better Auth uses email or userId as accountId
        const account = await prisma.account.upsert({
            where: { id: `demo-account-${provider === 'google' ? 'google' : 'facebook'}` },
            update: {
                providerId: "credential",
                accountId: accountId,
                password: hashedPassword,
                updatedAt: new Date()
            },
            create: {
                id: `demo-account-${provider === 'google' ? 'google' : 'facebook'}`,
                userId: user.id,
                accountId: accountId,
                providerId: "credential",
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });
        console.log("✅ DB Account Upsert successful. Account record:", account);

    } catch (err) {
        console.error("❌ DB Upsert failed:", err);
        throw err;
    }

    // 2. Run Better Auth sign-in
    console.log("\n[2] Running Better Auth sign-in...");
    try {
        // Create mock headers like next/headers headers() would return
        const mockHeaders = new Headers();
        mockHeaders.set("host", "localhost:3000");
        mockHeaders.set("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)");

        const response = await auth.api.signInEmail({
            headers: mockHeaders,
            body: {
                email: demoEmail,
                password: demoPassword,
            }
        });
        console.log("✅ Better Auth Sign-In successful. Response:", response);
    } catch (err) {
        console.error("❌ Better Auth Sign-In failed:", err);
        throw err;
    }

    console.log("\nBypass Flow Verified Successfully.");
}

testBypass()
    .catch(err => {
        console.error("\nTest execution failed:", err);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
