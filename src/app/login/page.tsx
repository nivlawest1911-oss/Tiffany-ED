import { redirect } from "next/navigation";
import { LoginCard } from "@/components/auth/login-card";
import { auth } from "@/lib/auth"; // Better Auth server instance
import { headers } from "next/headers";

export default async function LoginPage() {
  let session = null;
  try {
    session = await auth.api.getSession({
      headers: await headers()
    });
  } catch (error) {
    console.error("[LOGIN_PAGE] Failed to retrieve auth session:", error);
  }

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <LoginCard />
    </div>
  );
}
