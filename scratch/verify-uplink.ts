
import { uplinkUserProfile } from "../src/lib/uplink";
import { prisma } from "../src/lib/prisma";
import { UserRole } from "../src/generated/prisma/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function testUplinkHardening() {
    console.log("Starting Sovereign Uplink Hardening Verification...");

    // 1. Create/Find a test user
    const testEmail = "sentinel-test@edintel.io";
    let user = await prisma.user.findUnique({ where: { email: testEmail } });
    
    if (!user) {
        user = await prisma.user.create({
            data: {
                id: "test-user-id-123",
                email: testEmail,
                name: "Test Sentinel",
                role: UserRole.TEACHER,
            }
        });
        console.log("Created test user.");
    }

    // 2. Simulate Uplink with metadata change
    console.log("\n[TEST] Simulating Uplink with Position Change (Teacher -> Principal)...");
    const updatedUser = await uplinkUserProfile(user.id, {
        email: testEmail,
        position: "Elementary School Principal",
        schoolSite: "Sovereign Academy",
        district: "EdIntel Central"
    });

    if (updatedUser && updatedUser.role === UserRole.PRINCIPAL) {
        console.log("✅ [PASS] Role auto-escalated to PRINCIPAL.");
    } else {
        console.error("❌ [FAIL] Role did not escalate. Current role:", updatedUser?.role);
    }

    if (updatedUser && updatedUser.school_site === "Sovereign Academy") {
        console.log("✅ [PASS] School Site synchronized.");
    } else {
        console.error("❌ [FAIL] School Site mismatch.");
    }

    // 3. Test Idempotency (should skip if no changes)
    console.log("\n[TEST] Testing Idempotency (Subsequent call with same metadata)...");
    const startTime = Date.now();
    await uplinkUserProfile(user.id, {
        email: testEmail,
        position: "Elementary School Principal",
        schoolSite: "Sovereign Academy",
        district: "EdIntel Central"
    });
    const duration = Date.now() - startTime;
    console.log(`Call completed in ${duration}ms (Expect short duration if skipped).`);

    console.log("\nVerification Complete.");
}

testUplinkHardening()
    .catch(err => {
        console.error("Verification failed:", err);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
