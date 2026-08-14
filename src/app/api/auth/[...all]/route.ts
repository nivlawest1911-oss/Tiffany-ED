import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const nextJsHandler = toNextJsHandler(auth);

export async function GET(req: NextRequest) {
    // Intercept GET /sign-in/social because Better Auth strictly expects POST.
    // Returning undefined from a Next.js handler causes ERR_INVALID_RESPONSE.
    if (req.nextUrl.pathname === "/api/auth/sign-in/social") {
        const provider = req.nextUrl.searchParams.get("provider") as any;
        const callbackURL = req.nextUrl.searchParams.get("callbackURL") || "/dashboard";
        
        if (provider) {
            try {
                const result = await auth.api.signInSocial({
                    body: { provider, callbackURL },
                    headers: req.headers
                });
                
                const url = (result as any)?.url || (result as any)?.data?.url;
                if (url && typeof url === "string") {
                    return NextResponse.redirect(url);
                }
            } catch (err) {
                console.error("[auth] Social GET intercept failed:", err);
                return new NextResponse("Internal Server Error", { status: 500 });
            }
        }
    }
    
    // Fallback to standard Better Auth handler.
    // If it returns undefined (unmatched route), we return 404 to prevent ERR_INVALID_RESPONSE.
    const res = await nextJsHandler.GET(req);
    return res || new NextResponse("Not Found", { status: 404 });
}

export const POST = nextJsHandler.POST;