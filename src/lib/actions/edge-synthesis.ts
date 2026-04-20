"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { aiResilience, executeWithResilience } from "@/lib/ai-resilience";
import { upsertGeneratedContent } from "@/lib/uplink";
import { getCurrentBiometrics } from "@/lib/wearable-service";

const EdgeSynthesisSchema = z.object({
  gradeLevel: z.string(),
  topic: z.string(),
  subject: z.string().default("General"),
  duration: z.number().default(45),
  userId: z.string().optional(), // Made optional for payload merging
});

export async function executeEdgeSynthesis(input: z.infer<typeof EdgeSynthesisSchema>) {
  const session = await auth.api.getSession({
      headers: await headers(),
  });
  if (!session?.user) redirect("/auth/signin");

  const userId = session.user.id;
  const validated = EdgeSynthesisSchema.parse({ ...input, userId });

  // Pull real-time biometrics
  const biometrics = await getCurrentBiometrics(userId);
  const stressLevel = biometrics.currentStressIndex || 50;

  console.log("ðŸ”— NEURAL HANDSHAKE INITIATED â€” Tiffany-ED + AndrÃ© Patterson");

  try {
    const result = await executeWithResilience(async () => {
      // Leverage updated intelligence engine with dual-persona synthesis
      return await aiResilience.synthesizeEdgeLesson({
        topic: validated.topic,
        gradeLevel: validated.gradeLevel,
        stressLevel,
        biometrics
      });
    });

    // Persist with biometric snapshot
    const persisted = await upsertGeneratedContent({
      userId,
      type: "edge_synthesis_lesson",
      title: `${validated.topic} â€” Bio-Adaptive Lesson`,
      content: result.content,
      metadata: {
        personas: ["tiffany-ed", "andre-patterson"],
        biometricSnapshot: biometrics,
        stressLevel,
        clinicalSafetyTriggered: stressLevel > 70,
        timestamp: new Date().toISOString(),
        provider: result.provider,
        model: result.model
      },
    });

    console.log("âœ… EDGE SYNTHESIS COMPLETE â€” Bio-Adaptive lesson vaulted");

    return {
      success: true,
      lesson: result.content,
      persistedId: persisted.id,
      clinicalSafetyTriggered: stressLevel > 70,
      biometrics: {
        stressLevel,
        hr: biometrics.currentHR,
        hrv: biometrics.currentHRV
      }
    };
  } catch (error) {
    console.error("âš ï¸ EDGE SYNTHESIS PARTIAL:", error);
    throw new Error("Bio-adaptive synthesis unavailable. Please check connection.");
  }
}
