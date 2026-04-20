'use server';

import { generateClinicalSynthesisAction } from "@/lib/gemini-service";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function executeCognitiveSynthesis(data: {
    context: string;
    nodes: string[];
    priority: 'low' | 'medium' | 'high' | 'critical';
}) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            return { success: false, error: "Authorization Sentinel: Access Denied." };
        }

        const user = session.user as any;

        // Apply institutional context to the synthesis if available
        const enhancedContext = `
            USER_ROLE: ${user.role || 'EDUCATOR'}
            DISTRICT: ${user.district || 'UNKNOWN'}
            SCHOOL: ${user.school || 'UNKNOWN'}
            USER_CONTEXT: ${data.context}
        `.trim();

        const synthesis = await generateClinicalSynthesisAction({
            context: enhancedContext,
            nodes: data.nodes,
            priority: data.priority,
            protocolContext: {
                role: user.role,
                district: user.district,
                school: user.school
            }
        });

        revalidatePath("/dashboard/cognitive");
        
        return { 
            success: true, 
            synthesis,
            timestamp: new Date().toISOString(),
            nodeCount: data.nodes.length
        };
    } catch (error: any) {
        console.error("Cognitive Synthesis Engine Failure:", error);
        return { 
            success: false, 
            error: error.message || "Synthesis Engine Interrupted. Establishing local containment." 
        };
    }
}
