import { jwtVerify, createRemoteJWKSet, decodeJwt } from "jose";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export interface LTIClaims {
  iss: string;
  aud: string;
  sub: string;
  exp: number;
  iat: number;
  nonce: string;
  "https://purl.imsglobal.org/spec/lti/claim/message_type": string;
  "https://purl.imsglobal.org/spec/lti/claim/version": string;
  "https://purl.imsglobal.org/spec/lti/claim/deployment_id": string;
  "https://purl.imsglobal.org/spec/lti/claim/target_link_uri": string;
  "https://purl.imsglobal.org/spec/lti/claim/roles": string[];
  "https://purl.imsglobal.org/spec/lti/claim/context"?: {
    id: string;
    title?: string;
  };
  "https://purl.imsglobal.org/spec/lti/claim/resource_link"?: {
    id: string;
    title?: string;
  };
  internalRole?: string;
  email?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
}

/**
 * Validates an LTI 1.3 Launch request.
 * Resolves the platform dynamically from the database based on the 'iss' claim,
 * loads the platform's JWKS, verifies the signature, and maps LTI roles.
 */
export async function validateLTI13Launch(request: NextRequest): Promise<{
  valid: boolean;
  claims?: LTIClaims;
  error?: string;
}> {
  try {
    const formData = await request.formData();
    const idToken = formData.get("id_token") as string;
    const state = formData.get("state") as string;

    if (!idToken) {
      return { valid: false, error: "Missing id_token" };
    }

    if (!state) {
      return { valid: false, error: "Missing state parameter" };
    }

    // Decode the token payload unverified first to get the issuer (iss)
    let decodedHeader: any;
    let decodedPayload: any;
    try {
      decodedPayload = decodeJwt(idToken);
      const headerB64 = idToken.split(".")[0];
      decodedHeader = JSON.parse(Buffer.from(headerB64, "base64").toString());
    } catch (e) {
      return { valid: false, error: "Invalid JWT structure" };
    }

    const iss = decodedPayload?.iss;
    if (!iss) {
      return { valid: false, error: "Missing issuer (iss) claim" };
    }

    // Dynamic Lookup: Find the LtiPlatform configuration in the database
    const platform = await prisma.ltiPlatform.findUnique({
      where: { issuer: iss },
    });

    if (!platform) {
      return { valid: false, error: `Issuer '${iss}' is not registered with EdIntel.` };
    }

    if (!platform.isActive) {
      return { valid: false, error: `Platform registration for issuer '${iss}' is inactive.` };
    }

    const kid = decodedHeader?.kid;
    if (!kid) {
      return { valid: false, error: "Missing kid in token header" };
    }

    // Retrieve JWKS from the platform's JWKS endpoint
    const JWKS = createRemoteJWKSet(new URL(platform.jwksUrl));

    // Full Cryptographic Signature and Claim Verification
    const { payload } = await jwtVerify(idToken, JWKS, {
      algorithms: ["RS256"],
      issuer: platform.issuer,
      audience: platform.clientId,
    });

    const claims = payload as unknown as LTIClaims;

    // Verify LTI 1.3 message type constraints
    if (
      claims["https://purl.imsglobal.org/spec/lti/claim/message_type"] !==
      "LtiResourceLinkRequest"
    ) {
      return { valid: false, error: "Unsupported LTI message type" };
    }

    // Role-based Access Control (RBAC) Mapping
    const roles = claims["https://purl.imsglobal.org/spec/lti/claim/roles"] || [];
    const isTeacher = roles.some((r) => r.includes("Instructor"));
    const isAdmin = roles.some((r) => r.includes("Administrator"));

    console.log("[LTI] Cryptographically validated launch for:", claims.sub, "Issuer:", claims.iss);

    return {
      valid: true,
      claims: {
        ...claims,
        internalRole: isAdmin ? "ADMIN" : isTeacher ? "TEACHER" : "STUDENT",
      },
    };
  } catch (error: any) {
    console.error("[LTI] Dynamic validation failed:", error.message || error);
    return { valid: false, error: error.message || "LTI launch validation failed" };
  }
}
