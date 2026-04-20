"use server";

import { headers } from "next/headers";
import { UserRole } from "@/generated/prisma/client";
import { revalidatePath } from "next/cache";

export async function getInstitutionalNodes() {
    const { prisma } = await import("@/lib/prisma");
    try {
        const districts = await prisma.districts.findMany({
            select: { id: true, name: true }
        });

        const schools = await prisma.schools.findMany({
            select: { id: true, name: true, district_name: true }
        });

        return { success: true, districts, schools };
    } catch (error) {
        console.error("Institutional node fetch failed:", error);
        return { success: false, error: "Failed to query Sovereign directory." };
    }
}

export async function updateInstitutionalProfile(data: {
    role: UserRole;
    district?: string;
    school?: string;
    position?: string;
}) {
    const { auth } = await import("@/lib/auth");
    const { prisma } = await import("@/lib/prisma");
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            return { success: false, error: "Authentication required." };
        }

        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                role: data.role,
                district: data.district,
                school: data.school,
                position: data.position,
                lastUplinkAt: new Date(),
            }
        });

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Profile update failed:", error);
        return { success: false, error: "Failed to synchronize institutional identity." };
    }
}
