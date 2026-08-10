import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { standard, focus, tiers } = await req.json();

    if (!tiers || !Array.isArray(tiers)) {
      return NextResponse.json({ error: "Invalid tiers data" }, { status: 400 });
    }

    // Here you would integrate with your AI provider (e.g. OpenAI or Gemini)
    // For now, we return a mock payload that fits the UI structure.

    const generateMockTier = (tierData: any, label: string, durationMinutes: number) => {
      const isTier1 = tierData.tier.includes("1");
      const isTier2 = tierData.tier.includes("2");
      return {
        tier: tierData.tier,
        label,
        studentCount: tierData.studentCount,
        focus: tierData.focus,
        objectives: [
          `Master ${standard || "core"} concepts`,
          `Apply ${focus || "skills"} in context`,
        ],
        activities: [
          isTier1 ? "Independent inquiry project" : isTier2 ? "Guided practice with manipulatives" : "Direct explicit instruction",
          "Peer review and discussion",
        ],
        checksForUnderstanding: [
          "Exit ticket",
          "Verbal reasoning check",
        ],
        materials: ["Whiteboards", "Text excerpts"],
        durationMinutes,
        teacherMoves: ["Monitor progress", "Provide feedback"],
      };
    };

    const tier1Data = tiers.find((t: any) => t.tier === "Tier 1") || { tier: "Tier 1", studentCount: 0, focus: "Enrichment" };
    const tier2Data = tiers.find((t: any) => t.tier === "Tier 2") || { tier: "Tier 2", studentCount: 0, focus: "Targeted" };
    const tier3Data = tiers.find((t: any) => t.tier === "Tier 3") || { tier: "Tier 3", studentCount: 0, focus: "Intensive" };

    const tier1 = generateMockTier(tier1Data, "Advanced / On Track", 30);
    const tier2 = generateMockTier(tier2Data, "Targeted Support", 20);
    const tier3 = generateMockTier(tier3Data, "Intensive Intervention", 40);

    const markdown = `# Tier Lesson Pack
Standard: ${standard}
Focus: ${focus}

## Tier 1 (${tier1.studentCount} students)
${tier1.activities.map((a: string) => `- ${a}`).join("\n")}

## Tier 2 (${tier2.studentCount} students)
${tier2.activities.map((a: string) => `- ${a}`).join("\n")}

## Tier 3 (${tier3.studentCount} students)
${tier3.activities.map((a: string) => `- ${a}`).join("\n")}
`;

    return NextResponse.json({
      pack: {
        standard: standard || "Standard not provided",
        focus: focus || "General Focus",
        generatedAt: new Date().toISOString(),
        tier1,
        tier2,
        tier3,
        markdown,
      },
    });
  } catch (error) {
    console.error("Failed to generate lesson pack:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
