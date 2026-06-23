import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { headers } from "next/headers";

export interface LogEducatorAIParams {
  interactionType: string;
  prompt: string;
  aiResponse: string;
  standardsAligned?: string[];
  rubricCriteria?: any;
  studentId?: string;
  classId?: string;
  modelUsed?: string;
  tokensUsed?: number;
  sessionId?: string;
  teacherId?: string;
}

/**
 * Audit Logger for K-12 educator AI interaction workflows.
 * Captures standard-aligned curriculum metadata and outputs under the teacher's profile.
 */
export async function logEducatorAIInteraction(params: LogEducatorAIParams) {
  let resolvedTeacherId = params.teacherId;

  if (!resolvedTeacherId) {
    try {
      const session = await getSession({
        headers: await headers(),
      });
      resolvedTeacherId = session?.user?.id;
    } catch (e) {
      console.warn("[logEducatorAIInteraction] Failed to retrieve session from headers:", e);
    }
  }

  if (!resolvedTeacherId) {
    console.warn("[logEducatorAIInteraction] No teacher ID found. Skipping interaction log.");
    return null;
  }

  try {
    return await prisma.educatorAIInteraction.create({
      data: {
        teacherId: resolvedTeacherId,
        interactionType: params.interactionType,
        prompt: params.prompt,
        aiResponse: params.aiResponse,
        standardsAligned: params.standardsAligned || [],
        rubricCriteria: params.rubricCriteria || undefined,
        studentId: params.studentId || null,
        classId: params.classId || null,
        modelUsed: params.modelUsed || null,
        tokensUsed: params.tokensUsed || null,
        sessionId: params.sessionId || null,
      },
    });
  } catch (error) {
    console.error("[logEducatorAIInteraction] Failed to write to database:", error);
    return null;
  }
}
