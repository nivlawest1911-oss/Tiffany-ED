import { NextResponse } from "next/server";
import { getJWKSPublicKeys } from "@/lib/lti/jwks";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const jwks = await getJWKSPublicKeys();
    return NextResponse.json(jwks, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error: any) {
    console.error("[JWKS Endpoint] Error generating keys:", error);
    return NextResponse.json(
      { error: "Internal key resolution failure" },
      { status: 500 }
    );
  }
}
