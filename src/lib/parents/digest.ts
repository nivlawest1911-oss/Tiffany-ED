/**
 * Parent weekly digest templates (English v1).
 * Structure is locale-ready: swap `locale` later without rewriting call sites.
 */

export type DigestStudent = {
  id?: string;
  /** Display first name only preferred for FERPA-conscious digests */
  firstName: string;
  grade?: string;
  masteryHighlight?: string;
  growthNote?: string;
  interventionNote?: string;
};

export type DigestInput = {
  className?: string;
  teacherName?: string;
  weekOf?: string;
  students?: DigestStudent[];
  locale?: "en";
};

export type DigestResult = {
  locale: "en";
  subject: string;
  markdown: string;
  html: string;
  highlights: string[];
  interventionNotes: string[];
  atHomeActions: string[];
  previewOnlyHint?: string;
};

const AT_HOME_ACTIONS_EN = [
  "Read together for 15 minutes and ask your child to retell the main idea in their own words.",
  "Practice 5 high-frequency or phonics words on sticky notes around the house this week.",
];

function weekLabel(weekOf?: string): string {
  if (weekOf) return weekOf;
  const d = new Date();
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function defaultStudents(): DigestStudent[] {
  return [
    {
      firstName: "Jordan",
      grade: "4",
      masteryHighlight: "Strong growth in reading fluency (+12% this window).",
      growthNote: "Consistently completing independent reading goals.",
      interventionNote: "Extra phonics warm-ups twice this week supported decoding accuracy.",
    },
    {
      firstName: "Alex",
      grade: "4",
      masteryHighlight: "Vocabulary check-outs improved from 68% to 81%.",
      growthNote: "Partner talk routines are boosting comprehension confidence.",
      interventionNote: "Small-group decoding practice continues 3× weekly.",
    },
  ];
}

export function buildParentDigest(input: DigestInput = {}): DigestResult {
  const locale = input.locale || "en";
  const className = input.className || "Homeroom Literacy";
  const teacherName = input.teacherName || "Your teacher";
  const week = weekLabel(input.weekOf);
  const students = input.students?.length ? input.students : defaultStudents();

  const highlights = students.slice(0, 4).map((s) => {
    const mastery = s.masteryHighlight || "Steady progress on core reading skills this week.";
    return `${s.firstName}${s.grade ? ` (Gr. ${s.grade})` : ""}: ${mastery}`;
  });

  const interventionNotes = students
    .map((s) => s.interventionNote)
    .filter((n): n is string => Boolean(n))
    .slice(0, 2);

  if (interventionNotes.length === 0) {
    interventionNotes.push(
      "Targeted small-group support continued for students needing extra decoding practice.",
      "Progress was monitored with short weekly checks; next steps adjust to each learner."
    );
  }

  const atHomeActions = AT_HOME_ACTIONS_EN;

  const subject = `Weekly Learning Digest — ${className} (week of ${week})`;

  const markdown = [
    `# Weekly Learning Digest`,
    ``,
    `**Class:** ${className}  `,
    `**From:** ${teacherName}  `,
    `**Week of:** ${week}`,
    ``,
    `## Mastery & progress highlights`,
    ...highlights.map((h) => `- ${h}`),
    ``,
    `## Intervention notes`,
    ...interventionNotes.map((n) => `- ${n}`),
    ``,
    `## Try these at home`,
    ...atHomeActions.map((a, i) => `${i + 1}. ${a}`),
    ``,
    `---`,
    `_This digest does not include full student records. Contact the school for official report cards or IEP details._`,
  ].join("\n");

  const html = `
<div style="font-family: system-ui, sans-serif; max-width: 640px; margin: 0 auto; color: #1a1a1a; line-height: 1.5;">
  <h1 style="font-size: 22px; margin-bottom: 4px;">Weekly Learning Digest</h1>
  <p style="color: #555; margin-top: 0;">
    <strong>Class:</strong> ${escapeHtml(className)} ·
    <strong>From:</strong> ${escapeHtml(teacherName)} ·
    <strong>Week of:</strong> ${escapeHtml(week)}
  </p>
  <h2 style="font-size: 16px; color: #0A0F1C;">Mastery &amp; progress highlights</h2>
  <ul>${highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}</ul>
  <h2 style="font-size: 16px; color: #0A0F1C;">Intervention notes</h2>
  <ul>${interventionNotes.map((n) => `<li>${escapeHtml(n)}</li>`).join("")}</ul>
  <h2 style="font-size: 16px; color: #0A0F1C;">Try these at home</h2>
  <ol>${atHomeActions.map((a) => `<li>${escapeHtml(a)}</li>`).join("")}</ol>
  <p style="font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 12px; margin-top: 24px;">
    This digest does not include full student records. Contact the school for official report cards or IEP details.
  </p>
</div>`.trim();

  return {
    locale,
    subject,
    markdown,
    html,
    highlights,
    interventionNotes,
    atHomeActions,
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function isSmtpConfigured(): boolean {
  return !!(
    process.env.SMTP_HOST?.trim() &&
    process.env.SMTP_USER?.trim() &&
    process.env.SMTP_PASS?.trim()
  );
}
