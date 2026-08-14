"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SocialAuthButtons } from "@/components/auth/social-auth-buttons";
import { CredentialsForm } from "@/components/auth/credentials-form";
import { AuthStateOverlays } from "@/components/auth/auth-state-overlays";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";

function LoginCardContent() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [detectedCurrency, setDetectedCurrency] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const inviteParam = searchParams.get("invite");
  
  useEffect(() => {
    try {
      const currency = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' })
        .resolvedOptions().currency || "USD";
      setDetectedCurrency(currency);
    } catch {
      setDetectedCurrency("USD");
    }
  }, []);
  
  // Use session to proactively redirect if logged in client-side as well
  const { data: session } = authClient.useSession();
  
  if (session) {
    // Optionally handle redirect here or let server side handle it
  }

  const errorMessage = 
    errorParam === "OAuthCallback" || errorParam === "state_mismatch"
    ? "Authentication session expired or was interrupted. Please sign in again." 
    : errorParam === "AccessDenied"
    ? "Sign-in was canceled or denied by the identity provider."
    : errorParam === "session_expired"
    ? "Your session has expired for security reasons. Please re-authenticate."
    : errorParam === "429" || errorParam === "rate_limit"
    ? "Too many authentication attempts. Please wait a moment before retrying."
    : errorParam 
    ? "An unknown authentication error occurred."
    : null;

  return (
    <Card className="w-full max-w-md bg-slate-900/80 backdrop-blur-md border border-slate-800 shadow-xl relative overflow-hidden">
      <AuthStateOverlays isLoading={!!isLoading} error={errorMessage} invite={inviteParam} currency={detectedCurrency} />
      <CardHeader className="text-center space-y-2 mt-4">
        <CardTitle className="text-2xl font-bold tracking-tight text-slate-100">
          Sign In to EdIntel Sovereign
        </CardTitle>
        <CardDescription className="text-slate-400">
          Enter your credentials or use a social provider to access your dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <SocialAuthButtons isLoading={isLoading} setIsLoading={setIsLoading} />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-900 px-2 text-slate-400">Or continue with</span>
          </div>
        </div>
        <CredentialsForm isLoading={isLoading} setIsLoading={setIsLoading} />
      </CardContent>
    </Card>
  );
}

export function LoginCard() {
  return (
    <Suspense fallback={<Card className="w-full max-w-md bg-slate-900/80 backdrop-blur-md border border-slate-800 shadow-xl h-[400px] animate-pulse" />}>
      <LoginCardContent />
    </Suspense>
  );
}
