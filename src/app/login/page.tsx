import { redirect } from "next/navigation";
import { LoginCard } from "@/components/auth/login-card";
import { getCachedSession } from "@/lib/request-cache";

export default async function LoginPage() {
  let session = null;
  try {
    session = await getCachedSession();
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
