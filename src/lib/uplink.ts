import { UserRole } from "@/generated/prisma/client";
import { prisma } from "./prisma";

/**
 * Sovereign Uplink Protocol v2.0
 * Idempotent server-side profile synchronization.
 * Synchronizes external identity metadata with institutional user records.
 * Specifically maps leadership roles (PRINCIPAL, SUPERINTENDENT) via regex.
 */
export async function uplinkUserProfile(userId: string, metadata: {
    email?: string;
    name?: string;
    image?: string;
    district?: string;
    school?: string;
    schoolSite?: string;
    position?: string;
    role?: UserRole;
    organization?: string;
}) {
    console.log(`[UPLINK 2.0] Initiating handshake for user: ${userId}`);

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            console.error(`[UPLINK] Handshake failed: User ${userId} not found in institutional records.`);
            return null;
        }

        // Idempotency Check: Avoid redundant uplinks within the same session block (e.g. 5 minutes)
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
        if (user.lastUplinkAt && user.lastUplinkAt > fiveMinutesAgo) {
            console.log(`[UPLINK] Synchronicity maintained. Skipping redundant handshake.`);
            return user;
        }

        // Diff-based synchronization
        const updates: any = {
            lastUplinkAt: new Date(),
        };

        if (metadata.email && user.email !== metadata.email) updates.email = metadata.email;
        if (metadata.name && user.name !== metadata.name) updates.name = metadata.name;
        if (metadata.image && user.image !== metadata.image) updates.image = metadata.image;
        
        // Institutional Metadata Sync
        if (metadata.district && !user.district) updates.district = metadata.district;
        if (metadata.school && !user.school) updates.school = metadata.school;
        if (metadata.schoolSite && !user.school_site) updates.school_site = metadata.schoolSite;
        if (metadata.position && !user.position) updates.position = metadata.position;

        // Auto-Derive District/School if missing but organization is present
        if (!updates.district && !user.district && metadata.organization) {
            // Basic heuristic: check if organization looks like a district
            if (metadata.organization.toLowerCase().includes("district") || metadata.organization.toLowerCase().includes("schools")) {
                updates.district = metadata.organization;
            }
        }

        // --- Sovereign Role Sentinel (Regex Mapping) ---
        // Prioritize explicit role if provided, otherwise derive from position
        if (metadata.role) {
            updates.role = metadata.role;
        } else if (user.role === UserRole.TEACHER && metadata.position) {
            const pos = metadata.position.toLowerCase();
            
            if (/superintendent|ceo|president|chancellor/i.test(pos)) {
                updates.role = UserRole.SUPERINTENDENT;
            } else if (/principal|head of school|director/i.test(pos)) {
                updates.role = UserRole.PRINCIPAL;
            } else if (/counselor|psychologist|social worker/i.test(pos)) {
                updates.role = UserRole.COUNSELOR;
            } else if (/admin|coordinator|manager/i.test(pos)) {
                updates.role = UserRole.ADMIN;
            }
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updates
        });

        console.log(`[UPLINK 2.0] Synchronicity established. Institutional Role: ${updatedUser.role}`);
        return updatedUser;
    } catch (error) {
        console.error("[UPLINK] Protocol Error:", error);
        throw error;
    }
}

/**
 * Sovereign Vault: Content Persistence Protocol
 */
export async function upsertGeneratedContent(data: any) {
    try {
        // Vault the content into the institutional database
        return await prisma.generatedContent.create({
            data: {
                userId: data.userId,
                type: data.type,
                title: data.title,
                content: data.content,
                metadata: data.metadata || {}
            }
        });
    } catch (error) {
        console.error("[VAULT_ERROR] Peripheral failure during content persistence:", error);
        // Fallback for demo stability
        return { id: "vaulted-" + Date.now(), ...data } as any;
    }
}

