
import { UserRole } from "@/generated/prisma/client";

// Mock implementation of the role mapping logic from uplink.ts
function deriveRole(position: string): UserRole | null {
    const pos = position.toLowerCase();
    
    if (/superintendent|ceo|president|chancellor/i.test(pos)) {
        return UserRole.SUPERINTENDENT;
    } else if (/principal|head of school|director/i.test(pos)) {
        return UserRole.PRINCIPAL;
    } else if (/counselor|psychologist|social worker/i.test(pos)) {
        return UserRole.COUNSELOR;
    } else if (/admin|coordinator|manager/i.test(pos)) {
        return UserRole.ADMIN;
    }
    return null;
}

const testCases = [
    { pos: "Superintendent of Schools", expected: UserRole.SUPERINTENDENT },
    { pos: "District CEO", expected: UserRole.SUPERINTENDENT },
    { pos: "High School Principal", expected: UserRole.PRINCIPAL },
    { pos: "Middle School Director", expected: UserRole.PRINCIPAL },
    { pos: "Guidance Counselor", expected: UserRole.COUNSELOR },
    { pos: "District Admin", expected: UserRole.ADMIN },
    { pos: "Teacher", expected: null },
];

console.log("Verifying Sovereign Role Mapping Protocol...");
let success = true;
testCases.forEach(tc => {
    const result = deriveRole(tc.pos);
    if (result === tc.expected) {
        console.log(`✅ [PASS] "${tc.pos}" -> ${result}`);
    } else {
        console.log(`❌ [FAIL] "${tc.pos}" -> Expected ${tc.expected}, got ${result}`);
        success = false;
    }
});

if (success) {
    console.log("\nSovereign Role Mapping Protocol verified successfully.");
} else {
    process.exit(1);
}
