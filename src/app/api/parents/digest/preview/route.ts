import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await getSession();
  
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const role = session.user.role;
  if (role !== "TEACHER" && role !== "ADMIN" && role !== "PRINCIPAL") {
    return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 });
  }

  try {
    const { studentId, classId } = await req.json();

    if (!studentId && !classId) {
      return NextResponse.json({ error: "Must provide studentId or classId" }, { status: 400 });
    }

    // Mock generated parent digest content based on parameters
    const markdown = `
# Weekly Progress Update
**Student**: ${studentId ? "Jane Doe" : "Class Summary"}
**Date**: ${new Date().toLocaleDateString()}

### Highlights
- Improved reading fluency by 12% this week.
- Mastered 3 new phonics concepts (Blends & Digraphs).

### Areas for Support
- We are focusing on improving reading comprehension, specifically answering "why" questions after reading a passage.

### At-Home Actions
1. **Read Aloud**: Spend 15 minutes reading together and ask 2 "why" questions about the story.
2. **Vocabulary Game**: Practice the sight words sent home in the Friday folder using flashcards.

---
*Note: This digest was generated with assistance from EdIntel Sovereign AI.*
`;

    const canSend = !!(process.env.SMTP_HOST && process.env.SMTP_USER);

    return NextResponse.json({
      preview: markdown,
      canSend,
      message: canSend 
        ? "SMTP configured. You can send this digest directly to parents." 
        : "SMTP not configured. You can copy this preview manually.",
    });
  } catch (error) {
    console.error("Failed to generate parent digest preview:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
