/**
 * Tier 1/2/3 lesson pack builder — structured materials without requiring an LLM.
 * Locale-ready: keep strings in templates so i18n can wrap later.
 */

export type TierInput = {
  tier: string;
  focus: string;
  studentCount: number;
};

export type TierMaterials = {
  tier: "Tier 1" | "Tier 2" | "Tier 3";
  label: string;
  studentCount: number;
  focus: string;
  objectives: string[];
  activities: string[];
  checksForUnderstanding: string[];
  materials: string[];
  durationMinutes: number;
  teacherMoves: string[];
};

export type LessonPackResult = {
  standard: string;
  focus: string;
  generatedAt: string;
  tier1: TierMaterials;
  tier2: TierMaterials;
  tier3: TierMaterials;
  markdown: string;
};

function normalizeTier(raw: string): "Tier 1" | "Tier 2" | "Tier 3" {
  const t = raw.toLowerCase().replace(/\s+/g, "");
  if (t.includes("3") || t.includes("intensive")) return "Tier 3";
  if (t.includes("2") || t.includes("target")) return "Tier 2";
  return "Tier 1";
}

function buildTierMaterials(
  tierKey: "Tier 1" | "Tier 2" | "Tier 3",
  focus: string,
  standard: string,
  studentCount: number,
  specificFocus?: string
): TierMaterials {
  const area = specificFocus || focus;

  if (tierKey === "Tier 1") {
    return {
      tier: "Tier 1",
      label: "Core instruction (all learners)",
      studentCount,
      focus: area,
      durationMinutes: 25,
      objectives: [
        `Students will demonstrate grade-level understanding of ${area} aligned to ${standard}.`,
        `Students will apply ${area} strategies independently with ≥80% accuracy on exit checks.`,
      ],
      activities: [
        `Whole-group mini-lesson (8 min): model think-aloud for ${area} using a grade-level text.`,
        `Partner practice (10 min): collaborative application with accountable talk stems.`,
        `Independent application (7 min): complete 2–3 items targeting ${area}; teacher circulates.`,
      ],
      checksForUnderstanding: [
        "Exit ticket: 2 items on the focus skill (cold independent).",
        "Cold-call / equity sticks: 3 students restate the strategy in their own words.",
        "Thumbs / fist-to-five pulse check mid-lesson.",
      ],
      materials: [
        "Grade-level anchor text or passage set",
        "Whiteboard / visual anchor chart for strategy steps",
        "Exit ticket (paper or digital)",
      ],
      teacherMoves: [
        "Explicit I-do → We-do → You-do sequencing",
        "High-quality questioning (DOK 2–3)",
        "Celebrate precise academic language",
      ],
    };
  }

  if (tierKey === "Tier 2") {
    return {
      tier: "Tier 2",
      label: "Targeted small-group support",
      studentCount,
      focus: area,
      durationMinutes: 20,
      objectives: [
        `Students will use scaffolds to apply ${area} with guided practice and corrective feedback.`,
        `Students will close the gap toward grade-level performance on ${standard} focus skills.`,
      ],
      activities: [
        `Warm-up (3 min): quick retrieval on prerequisite skills for ${area}.`,
        `Guided practice (12 min): teacher-led small group with sentence frames and worked examples.`,
        `Release (5 min): pair work with a partially completed graphic organizer.`,
      ],
      checksForUnderstanding: [
        "Error analysis: student corrects one intentional mistake with a partner.",
        "One-on-one probe: restate the first two steps of the strategy.",
        "Progress monitor: 3-item mini-check scored against a simple rubric.",
      ],
      materials: [
        "Scaffolded graphic organizer",
        "Decodable or instructional-level passage supporting the skill",
        "Sound/word cards or manipulative set as needed",
      ],
      teacherMoves: [
        "Immediate corrective feedback (prompt → cue → model)",
        "Reduce cognitive load; one new step at a time",
        "Log progress for MTSS documentation",
      ],
    };
  }

  return {
    tier: "Tier 3",
    label: "Intensive intervention",
    studentCount,
    focus: area,
    durationMinutes: 25,
    objectives: [
      `Students will master foundational components underlying ${area} with high-dosage practice.`,
      `Students will show measurable growth on a short-cycle probe aligned to ${standard}.`,
    ],
    activities: [
      `Precision teaching (8 min): 1:1 or 1:2 explicit instruction on the lowest-missing skill for ${area}.`,
      `Massed practice (10 min): repeated trials with immediate feedback (accuracy → fluency).`,
      `Cumulative review (7 min): mix prior skills with today’s target; celebrate small wins.`,
    ],
    checksForUnderstanding: [
      "Daily 1-minute probe (correct responses / errors) — chart trend.",
      "Student self-rate: “I can teach this step to a peer” (yes/almost/not yet).",
      "Teacher fidelity checklist: modeling, opportunities to respond, corrective feedback rate.",
    ],
    materials: [
      "Highly controlled practice set (decodables / skill drills)",
      "Progress-monitoring probe form",
      "Visual schedule / behavior support if needed",
    ],
    teacherMoves: [
      "Highest dosage: more OTRs (opportunities to respond)",
      "Scripted corrective routine; avoid ambiguous feedback",
      "Coordinate with SPED / interventionist if dual-served",
    ],
  };
}

function toMarkdown(pack: Omit<LessonPackResult, "markdown">): string {
  const sections = [pack.tier1, pack.tier2, pack.tier3];
  let md = `# Tier Lesson Pack\n\n**Standard:** ${pack.standard}\n**Focus:** ${pack.focus}\n**Generated:** ${pack.generatedAt}\n\n`;
  for (const t of sections) {
    md += `## ${t.tier} — ${t.label}\n`;
    md += `Students: ${t.studentCount} · Focus: ${t.focus} · ~${t.durationMinutes} min\n\n`;
    md += `### Objectives\n${t.objectives.map((o) => `- ${o}`).join("\n")}\n\n`;
    md += `### Activities\n${t.activities.map((o) => `- ${o}`).join("\n")}\n\n`;
    md += `### Checks for Understanding\n${t.checksForUnderstanding.map((o) => `- ${o}`).join("\n")}\n\n`;
    md += `### Materials\n${t.materials.map((o) => `- ${o}`).join("\n")}\n\n`;
    md += `### Teacher Moves\n${t.teacherMoves.map((o) => `- ${o}`).join("\n")}\n\n---\n\n`;
  }
  return md;
}

export function buildLessonPack(input: {
  standard?: string;
  focus?: string;
  tiers: TierInput[];
}): LessonPackResult {
  const standard = input.standard?.trim() || "ALCOS.ELA — Reading Foundational Skills";
  const focus = input.focus?.trim() || "Science of Reading — core literacy skills";
  const generatedAt = new Date().toISOString();

  const byTier: Partial<Record<"Tier 1" | "Tier 2" | "Tier 3", TierInput>> = {};
  for (const t of input.tiers) {
    byTier[normalizeTier(t.tier)] = t;
  }

  // Defaults if a tier was omitted
  const defaults: Record<"Tier 1" | "Tier 2" | "Tier 3", TierInput> = {
    "Tier 1": { tier: "Tier 1", focus, studentCount: 12 },
    "Tier 2": { tier: "Tier 2", focus, studentCount: 6 },
    "Tier 3": { tier: "Tier 3", focus, studentCount: 3 },
  };

  const t1 = byTier["Tier 1"] || defaults["Tier 1"];
  const t2 = byTier["Tier 2"] || defaults["Tier 2"];
  const t3 = byTier["Tier 3"] || defaults["Tier 3"];

  const packBase = {
    standard,
    focus,
    generatedAt,
    tier1: buildTierMaterials("Tier 1", focus, standard, t1.studentCount, t1.focus),
    tier2: buildTierMaterials("Tier 2", focus, standard, t2.studentCount, t2.focus),
    tier3: buildTierMaterials("Tier 3", focus, standard, t3.studentCount, t3.focus),
  };

  return {
    ...packBase,
    markdown: toMarkdown(packBase),
  };
}
