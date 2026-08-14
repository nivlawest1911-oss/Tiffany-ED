import { redirect } from "next/navigation";
import { LoginCard } from "@/components/auth/login-card";
import { auth } from "@/lib/auth"; // Better Auth server instance
import { headers } from "next/headers";

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <LoginCard />
    </div>
  );
}
