import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const callbackURL =
    req.nextUrl.searchParams.get("callbackURL") || "/dashboard";

  try {
    const result = await auth.api.signInSocial({
      body: {
        provider: "google",
        callbackURL,
      },
    });

    // better-auth typically returns { url } for the OAuth provider
    const url =
      (result as any)?.url ||
      (result as any)?.data?.url ||
      null;

    if (url && typeof url === "string") {
      return NextResponse.redirect(url);
    }

    return NextResponse.json(
      { error: "No OAuth URL returned", result },
      { status: 500 }
    );
  } catch (err: any) {
    console.error("[auth/google]", err);
    return NextResponse.json(
      { error: err?.message || "Google sign-in failed" },
      { status: 500 }
    );
  }
}
